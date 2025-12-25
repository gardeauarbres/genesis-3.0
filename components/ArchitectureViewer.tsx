
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { geminiService } from '../services/geminiService';

interface HistoryPoint {
  time: string;
  replicationRate: number;
  quantumEntropy: number;
  greyGooRisk: number;
  latticeStress: number;
}

const LatticeSimulation: React.FC<{ stress: number }> = ({ stress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize handling
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: any[] = [];
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (stress / 10),
        vy: (Math.random() - 0.5) * (stress / 10),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = stress > 70 ? 'rgba(245, 158, 11, 0.4)' : stress > 15 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)';
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx * (stress / 20);
        p.y += p.vy * (stress / 20);

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [stress]);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60" />;
};

const ArchitectureViewer: React.FC = () => {
  const [metrics, setMetrics] = useState({
    replicationRate: 0.012,
    quantumEntropy: 98.4,
    latticeStress: 12,
    batteryLevel: 100,
    latency: 0,
    cores: 0
  });

  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isConstituting, setIsConstituting] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState<string | null>(null);

  // Hook pour les métriques réelles (identique)
  useEffect(() => {
    const updateRealMetrics = async () => {
      let batt = 100;
      try {
        if ((navigator as any).getBattery) {
          const battery = await (navigator as any).getBattery();
          batt = battery.level * 100;
        }
      } catch (e) { }
      const cores = navigator.hardwareConcurrency || 4;
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const rtt = connection ? connection.rtt : 50;
      const perf = performance as any;
      let memStress = 20;
      if (perf && perf.memory) {
        const ratio = perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit;
        memStress = Math.floor(ratio * 100);
      }
      setMetrics(prev => {
        const baseRate = 0.01;
        const loadFactor = (100 - batt) / 10000;
        const newRepRate = baseRate + loadFactor + (Math.random() * 0.002);
        const entropyLoss = Math.min(rtt / 100, 5);
        const newEntropy = +(99.9 - entropyLoss + (Math.random() * 0.5 - 0.25)).toFixed(1);
        const newStress = memStress + (rtt > 100 ? 10 : 0);
        const risk = +((newRepRate * 5000) + (100 - newEntropy) * 2 + (newStress * 0.5)).toFixed(2);
        const newPoint: HistoryPoint = {
          time: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
          replicationRate: +(newRepRate * 100).toFixed(2),
          quantumEntropy: newEntropy,
          greyGooRisk: Math.min(risk, 100),
          latticeStress: Math.max(0, Math.min(newStress, 100))
        };
        setHistory(currentHistory => [...currentHistory, newPoint].slice(-30));
        return { replicationRate: newRepRate, quantumEntropy: newEntropy, latticeStress: Math.max(0, Math.min(newStress, 100)), batteryLevel: Math.round(batt), latency: rtt, cores: cores };
      });
    };
    const interval = setInterval(() => { if (!isConstituting) updateRealMetrics(); }, 2000);
    updateRealMetrics();
    return () => clearInterval(interval);
  }, [isConstituting]);

  const handleDiagnostic = async () => {
    setIsAnalyzing(true);
    try {
      const report = await geminiService.performGlobalDiagnostic(metrics);
      setDiagnosticReport(report);
    } catch (e) { console.error(e); } finally { setIsAnalyzing(false); }
  };

  const handleConfinement = async () => {
    setIsConstituting(true);
    try {
      const report = await geminiService.initiateConfinementProtocol(metrics.latticeStress);
      setDiagnosticReport(report);
      for (let i = metrics.latticeStress; i >= 0; i -= 5) {
        setMetrics(m => ({ ...m, latticeStress: i, replicationRate: 0.005 }));
        await new Promise(r => setTimeout(r, 100));
      }
      window.dispatchEvent(new CustomEvent('genesis-security-event', { detail: { message: "CONFINEMENT RÉUSSI", type: 'critical' } }));
    } catch (e) { console.error(e); } finally { setIsConstituting(false); }
  };

  const isDanger = metrics.replicationRate >= 0.02 || metrics.latticeStress > 80;

  return (
    <div className={`space-y-4 md:space-y-8 animate-fadeIn transition-all duration-1000 ${isDanger ? 'bg-red-950/5 p-6 rounded-[2.5rem] ring-2 ring-red-500/20' : ''}`}>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="relative">
          {isDanger && <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-red-600 animate-pulse rounded-full shadow-[0_0_15px_#dc2626]"></div>}
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-heading tracking-tight flex items-center gap-3">
            <span className={isDanger ? 'text-red-500 animate-pulse' : 'text-blue-500'}>Ω</span>
            Architecture de Défense
          </h2>
          <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-widest">Interface de Contrôle Tactique v5.1</p>
        </div>
        <div className="flex gap-6 md:gap-10 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] mb-1">Stress Lattice</p>
            <p className={`text-2xl md:text-3xl font-mono ${metrics.latticeStress > 70 ? 'text-amber-500 animate-pulse' : metrics.latticeStress > 40 ? 'text-blue-300' : 'text-green-500'}`}>{metrics.latticeStress}%</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] mb-1">Énergie</p>
            <p className={`text-2xl md:text-3xl font-mono ${metrics.batteryLevel < 20 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>{metrics.batteryLevel}%</p>
          </div>
        </div>
      </header>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1 min-h-0">

        {/* ROW 1: METRIC CARDS */}
        <div className="glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10">Stress Lattice</p>
          <div className="flex items-end justify-between mt-2 relative z-10">
            <span className={`text-2xl font-mono font-bold ${metrics.latticeStress > 70 ? 'text-amber-500 animate-pulse' : 'text-blue-400'}`}>
              {metrics.latticeStress}%
            </span>
            <div className={`w-2 h-2 rounded-full ${metrics.latticeStress > 50 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
          </div>
        </div>

        <div className="glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-600/5 group-hover:bg-purple-600/10 transition-colors"></div>
          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10">Entropie Bell</p>
          <div className="flex items-end justify-between mt-2 relative z-10">
            <span className="text-2xl font-mono font-bold text-purple-400">{metrics.quantumEntropy}%</span>
            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
        </div>

        <div className="glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-green-600/5 group-hover:bg-green-600/10 transition-colors"></div>
          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10">Énergie Noyau</p>
          <div className="flex items-end justify-between mt-2 relative z-10">
            <span className="text-2xl font-mono font-bold text-green-400">{metrics.batteryLevel}%</span>
            <div className="h-1.5 w-12 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${metrics.batteryLevel}%` }}></div>
            </div>
          </div>
        </div>

        <div className="glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors"></div>
          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10">Réplication</p>
          <div className="flex items-end justify-between mt-2 relative z-10">
            <span className={`text-2xl font-mono font-bold ${metrics.replicationRate > 0.02 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
              {(metrics.replicationRate * 100).toFixed(2)}x
            </span>
            <span className="text-[9px] text-gray-600 font-mono">/CYCLE</span>
          </div>
        </div>

        {/* ROW 2: MAIN CHART (Span 3 on LG) */}
        <div className="md:col-span-2 lg:col-span-3 glass p-0 rounded-[2rem] relative overflow-hidden flex flex-col min-h-[400px] border-white/5 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-40">
            <LatticeSimulation stress={metrics.latticeStress} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]"></div>
          </div>

          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-6 rounded-full shadow-lg ${isDanger ? 'bg-red-600 animate-pulse' : 'bg-blue-500'}`}></div>
                <div>
                  <h3 className="text-lg font-bold font-heading uppercase tracking-widest text-white">Oscillation Quantique</h3>
                  <p className="text-[9px] text-gray-500 font-mono">FLUX TEMPOREL RÉEL</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-black/50 border border-white/10 rounded-lg text-[9px] font-mono text-blue-300">
                  LATENCE: {metrics.latency}ms
                </div>
              </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ background: '#050505', border: '1px solid #333', borderRadius: '8px', fontSize: '10px', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="greyGooRisk" stroke={isDanger ? "#dc2626" : "#3b82f6"} fill={isDanger ? "url(#dangerGradient)" : "url(#safeGradient)"} strokeWidth={2} isAnimationActive={false} />
                  <defs>
                    <linearGradient id="safeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="dangerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ROW 2: COMMAND & CONTROL (Span 1 on LG) */}
        <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4">
          {/* CORE STATUS CARD */}
          <div className={`glass p-6 rounded-[2rem] flex-1 border-t-4 transition-all duration-500 relative overflow-hidden ${isDanger ? 'border-red-500 bg-red-900/10' : 'border-blue-500 bg-blue-900/5'}`}>
            <h3 className="text-sm font-bold font-heading uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Intégrité Système
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                  <span>Synchronisation</span>
                  <span className="text-white">{(100 - metrics.latency / 5).toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${Math.max(0, 100 - metrics.latency / 5)}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                  <span>Protection PQC</span>
                  <span className="text-green-400">ACTIF</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `100%` }}></div>
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5 mt-4">
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">
                  {isConstituting ? ">> INITIALIZING CONTAINMENT..." : isDanger ? ">> CRITICAL ERROR DETECTED." : ">> SYSTEM OPTIMAL. MONITORING."}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleConfinement}
              disabled={isConstituting || isAnalyzing}
              className={`py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] border transition-all ${isDanger ? 'bg-red-600 border-red-500 text-white animate-pulse' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
            >
              {isConstituting ? '...' : 'PURGE'}
            </button>
            <button
              onClick={handleDiagnostic}
              disabled={isConstituting || isAnalyzing}
              className="py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] border border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 transition-all"
            >
              SCAN
            </button>
          </div>
        </div>

      </div>

      {diagnosticReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setDiagnosticReport(null)}></div>
          <div className="glass w-full max-w-4xl max-h-[80vh] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative z-10 border-blue-500/30 border-2 flex flex-col shadow-[0_0_100px_rgba(59,130,246,0.2)]">
            <header className="flex justify-between items-center mb-6 md:mb-10 pb-6 border-b border-white/10">
              <h3 className="text-xl md:text-2xl font-bold font-heading text-blue-400 flex items-center gap-4 uppercase tracking-tighter">
                Rapport de Diagnostic
              </h3>
              <button onClick={() => setDiagnosticReport(null)} className="p-2 md:p-3 bg-white/5 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 md:pr-6 font-mono text-xs md:text-sm leading-relaxed text-blue-100 whitespace-pre-wrap">
              {diagnosticReport}
            </div>
            <footer className="mt-4 md:mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-mono">
              <span className="uppercase tracking-[0.2em] hidden md:inline">Signature d'Audit: GENESIS_KERNEL_FINAL_Ω</span>
              <button onClick={() => setDiagnosticReport(null)} className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">Fermer le Terminal</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureViewer;
