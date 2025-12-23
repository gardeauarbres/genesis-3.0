
import React, { useState } from 'react';

const KillSwitch: React.FC = () => {
  const [nodes, setNodes] = useState([
    { id: 1, name: 'Noeud Réserve Svalbard', active: true, signed: false },
    { id: 2, name: 'Noeud Profondeurs Pacifique', active: true, signed: false },
    { id: 3, name: 'Station Orbitale A-1', active: true, signed: false },
    { id: 4, name: 'Relais Antarctique', active: true, signed: false },
    { id: 5, name: 'Core Bunker Suisse', active: true, signed: false },
  ]);

  const [emergencyProtocol, setEmergencyProtocol] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const toggleSign = (id: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, signed: !n.signed } : n));
  };

  const signedCount = nodes.filter(n => n.signed).length;
  const REQUIRED_SIGNATURES = 3;
  const isKillable = signedCount >= REQUIRED_SIGNATURES;

  const initiateGlobalShutdown = () => {
    let count = 5;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        // DÉCLENCHEMENT RÉEL DE L'ÉVÉNEMENT DE TERMINAISON
        window.dispatchEvent(new CustomEvent('genesis-shutdown'));
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Protocoles de Sécurité Décentralisés</h2>
          <p className="text-gray-400">Systèmes de gouvernance et confinement d'urgence (Arrêt Global).</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-lg">
          <span className="text-red-500 font-bold text-sm uppercase">DEFCON 4</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-2xl relative">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              Évaluation du Risque "Gelée Grise"
            </h3>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Réplication Incontrôlée :</strong> Si la logique de consommation de ressources de l'IA est compromise, un événement de type "Gelée Grise" peut survenir, convertissant la matière en unités de calcul.
              </p>
              <p>
                <strong>Barrière "Dead Man" :</strong> Notre manifeste PQC inclut un taux de décroissance intrinsèque. Chaque noeud doit recevoir un signal cryptographique signé par le quorum global.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>Consommation de Matière : <span className="text-green-500">0.000001% (Normal)</span></li>
                <li>Dérive Génétique : <span className="text-green-500">&lt; 0.001% (Vérifié)</span></li>
              </ul>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Noeuds de Consensus Multi-Sig</h3>
            <div className="space-y-4">
              {nodes.map(node => (
                <div key={node.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${node.active ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-gray-500'}`}></div>
                    <span className="font-medium">{node.name}</span>
                  </div>
                  <button 
                    onClick={() => toggleSign(node.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      node.signed ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {node.signed ? 'SIGNÉ' : 'ATTENTE SIGNATURE'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
            {isKillable && (
              <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none"></div>
            )}
            
            <div className={`w-32 h-32 rounded-full border-8 mb-6 flex items-center justify-center transition-all relative z-10 ${
              isKillable ? 'border-red-600 scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'border-gray-800'
            }`}>
              <span className={`text-4xl transition-transform ${isKillable ? 'animate-bounce' : 'grayscale opacity-50'}`}>
                {isKillable ? '🔓' : '🔒'}
              </span>
            </div>
            
            <h3 className={`text-xl font-bold mb-2 relative z-10 ${isKillable ? 'text-red-500' : 'text-gray-400'}`}>
              Arrêt d'Urgence Omni-Kill
            </h3>
            <p className="text-xs text-gray-500 mb-6 relative z-10">
              Quorum requis : {REQUIRED_SIGNATURES} signatures sur 5
            </p>
            
            {/* Visual Indicator of Progress */}
            <div className="flex gap-2 mb-6 relative z-10">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-6 h-2 rounded-full transition-all duration-500 ${
                    i < signedCount 
                      ? (i < REQUIRED_SIGNATURES ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-green-500') 
                      : 'bg-gray-800'
                  }`}
                ></div>
              ))}
            </div>

            <div className="w-full bg-gray-800 h-1.5 rounded-full mb-2 overflow-hidden relative z-10">
              <div 
                className={`h-full transition-all duration-700 ${isKillable ? 'bg-red-600' : 'bg-blue-600'}`}
                style={{ width: `${(signedCount / 5) * 100}%` }}
              ></div>
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white/50 z-20"
                style={{ left: `${(REQUIRED_SIGNATURES / 5) * 100}%` }}
              ></div>
            </div>
            
            <p className={`text-[10px] font-mono mb-8 relative z-10 tracking-widest ${isKillable ? 'text-green-400' : 'text-gray-500'}`}>
              {signedCount < REQUIRED_SIGNATURES 
                ? `${REQUIRED_SIGNATURES - signedCount} SIGNATURE(S) MANQUANTE(S)` 
                : "QUORUM ATTEINT : ACCÈS AUTORISÉ"}
            </p>
            
            <div className="relative w-full z-10">
              {isKillable && (
                <div className="absolute inset-0 bg-red-600 rounded-xl animate-ping opacity-20"></div>
              )}
              <button
                disabled={!isKillable}
                onClick={() => setEmergencyProtocol(true)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all relative z-20 ${
                  isKillable 
                    ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_25px_rgba(220,38,38,0.7)] cursor-pointer ring-4 ring-red-600/20 animate-critical-flash' 
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-white/5'
                }`}
              >
                {isKillable ? 'INITIER LA TERMINAISON' : 'VERROUILLÉ'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {emergencyProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
          <div className="glass p-12 rounded-3xl max-w-xl w-full text-center relative z-10 border-red-600/50 border-4 shadow-[0_0_100px_rgba(220,38,38,0.5)]">
            <h2 className="text-4xl font-bold text-red-500 mb-6 font-heading animate-pulse uppercase">ATTENTION</h2>
            <p className="text-xl mb-8 font-mono tracking-tighter text-white uppercase">PURGE DU CONFINEMENT GLOBAL INITIÉE</p>
            
            {countdown !== null ? (
              <div className="mb-8">
                <p className="text-6xl font-bold text-red-600 font-mono animate-ping">{countdown}</p>
                <p className="text-sm text-red-400 mt-4 uppercase tracking-widest">Effacement mémoire...</p>
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                <p className="text-sm text-gray-400">Cette action est irréversible. Toutes les clés PQC et l'historique d'évolution seront détruits.</p>
                <button 
                  onClick={initiateGlobalShutdown}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all"
                >
                  CONFIRMER TERMINAISON
                </button>
                <button 
                  onClick={() => setEmergencyProtocol(false)}
                  className="w-full py-3 rounded-lg border border-red-600/30 hover:bg-red-600/20 text-red-500 font-bold transition-all uppercase text-xs"
                >
                  ANNULER
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes critical-flash {
          0%, 100% { background-color: rgb(220, 38, 38); transform: scale(1); }
          50% { background-color: rgb(248, 113, 113); transform: scale(1.02); }
        }
        .animate-critical-flash {
          animation: critical-flash 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default KillSwitch;
