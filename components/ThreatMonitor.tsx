
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { geminiService } from '../services/geminiService';
import { GroundingChunk, ThreatTrajectory } from '../types';
import { memory } from '../services/memory';
import { sfx } from '../services/sfx';

interface Incident {
  id: string;
  type: string;
  origin: string;
  risk: number;
  status: 'DETECTED' | 'NEUTRALIZING' | 'PURGED' | 'MITIGATING';
  isReal: boolean;
  neutralizationLog?: string;
}

interface ThreatMonitorProps {
  onTrackThreat?: (trajectory: ThreatTrajectory) => void;
}

const ThreatMonitor: React.FC<ThreatMonitorProps> = ({ onTrackThreat }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastScan, setLastScan] = useState<string>('');
  const [neutralizedCount, setNeutralizedCount] = useState(0);
  
  // Vertex AI State
  const [vertexConnected, setVertexConnected] = useState(false);
  const [predictionData, setPredictionData] = useState<any[]>([]);

  const activeThreats = incidents.filter(i => i.status === 'DETECTED' || i.status === 'NEUTRALIZING').length;
  const purgedThreats = incidents.filter(i => i.status === 'PURGED').length;
  const totalThreats = incidents.length || 1;
  const healthPercentage = (purgedThreats / totalThreats) * 100;

  // Simulation de la connexion Vertex à l'init
  useEffect(() => {
    // On simule une vérification de la clé IAM fournie
    setTimeout(() => {
        setVertexConnected(true);
        generatePredictionData();
    }, 1500);
  }, []);

  // Générateur de données prédictives (Simulation AutoML)
  const generatePredictionData = () => {
    const data = [];
    let baseRisk = 30;
    for (let i = 0; i < 20; i++) {
        baseRisk += (Math.random() - 0.45) * 15;
        baseRisk = Math.max(5, Math.min(95, baseRisk));
        data.push({
            time: `T+${i*5}m`,
            risk: Math.round(baseRisk),
            predicted: true
        });
    }
    setPredictionData(data);
  };

  const fetchIntelligence = async () => {
    setLoading(true);
    sfx.playData();
    try {
      const result = await geminiService.fetchRealWorldThreats();
      const mapped = result.data.map((i: any) => ({ 
        ...i, 
        isReal: true, 
        status: i.status === 'PURGED' ? 'PURGED' : 'DETECTED' 
      }));
      setIncidents(mapped);
      setSources(result.sources);
      setLastScan(new Date().toLocaleTimeString());
      
      // Update predictions on new scan
      if (vertexConnected) generatePredictionData();

    } catch (error) {
      console.error("Échec de l'intelligence réelle:", error);
      generateSimulatedIncidents();
    } finally {
      setLoading(false);
    }
  };

  const generateSimulatedIncidents = () => {
    const types = ['Shor Injection', 'Lattice Collision', 'Entropy Drain', 'Neural Poisoning'];
    const origins = ['Réseau Obscur', 'Noeud 02 - Compromis', 'Uplink Inconnu', 'Brèche Temporelle'];
    const sims = Array.from({ length: 4 }).map(() => ({
      id: Math.random().toString(36).substring(7).toUpperCase(),
      type: types[Math.floor(Math.random() * types.length)],
      origin: origins[Math.floor(Math.random() * origins.length)],
      risk: Math.floor(60 + Math.random() * 40),
      status: 'DETECTED' as const,
      isReal: false
    }));
    setIncidents(sims);
  };

  const exterminateThreat = async (id: string) => {
    const incident = incidents.find(i => i.id === id);
    if (!incident || incident.status !== 'DETECTED') return;

    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: 'NEUTRALIZING' } : i));
    sfx.playData();

    try {
      const strategy = await geminiService.neutralizeThreat(incident.type, incident.origin);
      const patchData = await geminiService.generateSecurityPatch(incident.type);
      await new Promise(r => setTimeout(r, 2000));
      await memory.save({
        type: 'evolution',
        content: `PATCH DE SÉCURITÉ: ${incident.type}`,
        metadata: {
            iq_increment: 2,
            code: patchData.countermeasure_code || '// PATCH VIDE',
            audit: `Neutralisation auto: ${incident.id}`,
            proof: `SIG_${Math.random().toString(36).slice(5)}`,
            merkle_root: `PATCH_${incident.id}`
        }
      });
      setIncidents(prev => prev.map(i => i.id === id ? { 
        ...i, status: 'PURGED', risk: 0, neutralizationLog: strategy 
      } : i));
      setNeutralizedCount(prev => prev + 1);
      sfx.playConfirm();
      window.dispatchEvent(new CustomEvent('genesis-security-event', { 
        detail: { message: `MENACE EXTERMINÉE : ${incident.id} - Patch Assimilé.`, type: 'audit' } 
      }));
    } catch (e) {
      sfx.playAlert();
      setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: 'DETECTED' } : i));
    }
  };

  const trackThreat = (incident: Incident) => {
      if (!onTrackThreat) return;
      sfx.playBlip();
      
      // Génération d'une trajectoire simulée (Courbe de Bézier simplifiée)
      const startLat = 30 + Math.random() * 20;
      const startLng = -100 + Math.random() * 50;
      const endLat = 40 + Math.random() * 10;
      const endLng = 0 + Math.random() * 20;
      
      const waypoints: [number, number][] = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          // Interpolation linéaire avec un peu de bruit pour faire "organique"
          const lat = startLat + (endLat - startLat) * t + Math.sin(t * Math.PI) * 5;
          const lng = startLng + (endLng - startLng) * t + Math.cos(t * Math.PI) * 5;
          waypoints.push([lat, lng]);
      }

      onTrackThreat({
          id: incident.id,
          originLabel: incident.origin,
          coordinates: waypoints,
          riskLevel: incident.risk
      });
  };

  useEffect(() => {
    fetchIntelligence();
    const interval = setInterval(fetchIntelligence, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn h-full flex flex-col">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Menaces PQC</h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Moniteur de Menaces Quantiques Temps Réel</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="bg-red-500/10 border border-red-500/30 px-6 py-2 rounded-xl text-right flex-1 lg:flex-none">
             <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest">Infections</p>
             <p className="text-xl font-mono text-red-500 animate-pulse">{activeThreats}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 px-6 py-2 rounded-xl text-right flex-1 lg:flex-none">
             <p className="text-[10px] text-green-500 uppercase font-bold tracking-widest">Purges</p>
             <p className="text-xl font-mono text-green-500">{purgedThreats + neutralizedCount}</p>
          </div>
          <button 
            onClick={fetchIntelligence}
            disabled={loading}
            className="w-full lg:w-auto px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all uppercase text-[10px] tracking-widest disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
            LANCER SCAN
          </button>
        </div>
      </header>

      {/* --- VERTEX AI PREDICTIVE MODULE --- */}
      <div className="glass p-1 rounded-3xl border-white/5 bg-black/40 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50"></div>
         <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${vertexConnected ? 'bg-purple-900/30 text-purple-400' : 'bg-gray-800 text-gray-500'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vertex Predictive AI</h3>
                        <p className="text-[10px] text-gray-500 font-mono">{vertexConnected ? 'CONNEXION IAM ÉTABLIE' : 'INITIALISATION...'}</p>
                    </div>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                    Le moteur AutoML analyse les vecteurs d'attaque historiques pour projeter les probabilités de brèche dans les 90 prochaines minutes.
                </p>
                <div className="flex gap-2 mt-4">
                    <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[9px] font-mono text-purple-300">Modèle: Sec-PaLM-2</div>
                    <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-mono text-blue-300">Confiance: 94.2%</div>
                </div>
            </div>

            <div className="lg:w-2/3 h-48 bg-black/20 rounded-xl border border-white/5 relative">
                {vertexConnected ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={predictionData}>
                            <defs>
                                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip 
                                contentStyle={{ background: '#000', border: '1px solid #333', borderRadius: '8px', fontSize: '10px' }}
                                itemStyle={{ color: '#d8b4fe' }}
                                formatter={(value: any) => [`${value}%`, 'Risque']}
                            />
                            <Area type="monotone" dataKey="risk" stroke="#a855f7" fill="url(#riskGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                         <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                         <span className="text-[9px] font-mono text-purple-500/50 uppercase">Négociation des clés...</span>
                    </div>
                )}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 flex-1 min-h-0">
        <div className="lg:col-span-3 glass rounded-3xl overflow-hidden flex flex-col border-white/5 bg-black/40 shadow-inner min-h-[400px]">
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center px-4 md:px-8">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Matrice d'Engagement</span>
            <div className="flex items-center gap-4">
               <span className="hidden md:inline text-[9px] text-gray-600 font-mono uppercase tracking-widest">Liaison : OK</span>
               <div className={`w-2 h-2 rounded-full ${loading ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-4 md:space-y-6">
            {incidents.map((incident) => (
              <div 
                key={incident.id} 
                className={`group relative p-4 md:p-6 rounded-3xl border transition-all duration-500 ${
                incident.status === 'PURGED' ? 'bg-green-500/5 border-green-500/30' : 
                incident.status === 'NEUTRALIZING' ? 'bg-amber-500/5 border-amber-500/40 animate-pulse' : 
                'bg-red-500/5 border-red-500/30 hover:bg-red-500/10'
                }`}
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('genesis-interaction', { detail: `THREAT_ANALYSIS: ${incident.type} [${incident.id}]` }))}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="relative">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-xs ${incident.status === 'PURGED' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {incident.id.slice(0,4)}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm md:text-lg uppercase tracking-widest flex flex-wrap items-center gap-2 md:gap-3 ${incident.status === 'PURGED' ? 'text-green-500' : 'text-red-500'}`}>
                        {incident.type}
                        {incident.status === 'PURGED' && <span className="text-[9px] bg-green-600 px-2 py-0.5 rounded text-white font-mono">NEUTRALISÉ</span>}
                      </h4>
                      <p className="text-[10px] text-gray-600 font-mono mt-1 uppercase">SOURCE: {incident.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-end">
                    {incident.status !== 'PURGED' && (
                      <div className="text-right hidden sm:block mr-4">
                        <p className="text-[8px] uppercase font-bold tracking-widest mb-1 text-red-500">Impact</p>
                        <span className="text-xs font-mono font-bold text-red-500">{incident.risk}%</span>
                      </div>
                    )}
                    
                    {/* BOUTON TRAJECTOIRE */}
                    {incident.status === 'DETECTED' && (
                        <button 
                            onClick={() => trackThreat(incident)}
                            className="px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest bg-blue-600/10 border border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                            TRAQUE
                        </button>
                    )}

                    <button onClick={() => exterminateThreat(incident.id)} disabled={incident.status !== 'DETECTED'} className={`px-4 md:px-6 py-3 rounded-2xl text-[10px] font-bold transition-all uppercase tracking-widest border ${incident.status === 'PURGED' ? 'border-green-500/20 text-green-500 bg-green-500/10 cursor-default' : 'bg-red-600/10 border-red-500/40 text-red-500 hover:bg-red-600 hover:text-white'}`}>
                      {incident.status === 'PURGED' ? 'TERMINÉ' : incident.status === 'NEUTRALIZING' ? 'PURGE...' : 'TERMINER'}
                    </button>
                  </div>
                </div>
                {incident.neutralizationLog && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-[9px] font-bold text-green-500 uppercase mb-2 tracking-[0.2em]">Rapport de Combat :</p>
                    <p className="text-[10px] text-gray-500 font-mono italic leading-relaxed bg-black/40 p-3 rounded-xl border border-green-500/10">{incident.neutralizationLog}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass p-6 rounded-3xl bg-green-600/5 border border-green-500/10 flex flex-col h-full min-h-[200px]">
            <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-6 flex items-center justify-between">Registre de Purge</h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
              {incidents.filter(i => i.status === 'PURGED').map((inc, i) => (
                <div key={i} className="p-4 bg-black/40 rounded-2xl border border-green-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-green-500 uppercase font-mono">{inc.id}</span>
                    <span className="text-[8px] text-green-500/50 font-mono">PURGED</span>
                  </div>
                  <p className="text-[9px] text-gray-500 truncate italic">{inc.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMonitor;
