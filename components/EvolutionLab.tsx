
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { groqService } from '../services/groqService';
import { EvolutionPatch, ExecutionResult } from '../types';
import { memory } from '../services/memory';
import { sfx } from '../services/sfx';

interface EvolutionState {
  generation: number;
  iqScore: number;
  history: EvolutionPatch[];
}

interface EvolutionLabProps {
  autoTrigger?: boolean;
  onConsumed?: () => void;
}

const CodeDiffView: React.FC<{ original: string, modified: string }> = ({ original, modified }) => {
  return (
    <div className="grid grid-cols-2 gap-4 h-full font-mono text-[10px] md:text-xs">
        <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4 overflow-y-auto custom-scrollbar relative group">
            <div className="absolute top-2 right-2 text-red-500 font-bold uppercase text-[8px] bg-red-950/50 px-2 py-1 rounded">Original</div>
            <pre className="text-red-200/70 whitespace-pre-wrap">{original}</pre>
        </div>
        <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-4 overflow-y-auto custom-scrollbar relative group">
            <div className="absolute top-2 right-2 text-green-500 font-bold uppercase text-[8px] bg-green-950/50 px-2 py-1 rounded">Mutation (Proposée)</div>
            <pre className="text-green-200/90 whitespace-pre-wrap">{modified}</pre>
            <div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none"></div>
        </div>
    </div>
  );
};

const EvolutionLab: React.FC<EvolutionLabProps> = ({ autoTrigger, onConsumed }) => {
  const [evoState, setEvoState] = useState<EvolutionState>({
    generation: 3.0,
    iqScore: 200,
    history: []
  });
  
  const [activeCode, setActiveCode] = useState(`// NOYAU GENESIS V3.0
// Initialisation des vecteurs de base...

function processNeuralNetwork(inputs) {
  // Simulation de traitement O(n^2)
  let results = [];
  for (let i = 0; i < inputs.length; i++) {
    let sum = 0;
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[i] * inputs[j] * Math.random();
    }
    results.push(Math.tanh(sum));
  }
  return results;
}

const data = new Float32Array(500).fill(0.5);
return processNeuralNetwork(data);`);

  const [proposedCode, setProposedCode] = useState<string | null>(null);
  const [mutationDetails, setMutationDetails] = useState<any | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [lastExecution, setLastExecution] = useState<ExecutionResult | null>(null);
  const hasAutoTriggered = useRef(false);

  // LPU Telemetry State
  const [telemetry, setTelemetry] = useState({ complexity: "...", securityScore: 0, type: "ANALYZING..." });
  const [lpuActive, setLpuActive] = useState(false);

  // Charger l'historique
  useEffect(() => {
    memory.getByType('evolution').then((fragments) => {
        if (fragments.length > 0) {
            const history = fragments.map(f => {
                const meta = f.metadata || {};
                return {
                    generation: 1.0, 
                    timestamp: new Date(f.timestamp).toLocaleTimeString(),
                    content: JSON.stringify(meta),
                    iqAtTime: meta.iq_increment ? 200 + meta.iq_increment : 200,
                    merkleHash: meta.merkle_root || 'HASH',
                    validationProof: meta.security_proof || 'PROOF'
                } as EvolutionPatch;
            });
            const lastPatch = fragments[0].metadata;
            if (lastPatch?.mutated_code) setActiveCode(lastPatch.mutated_code);
            setEvoState(prev => ({ ...prev, history, generation: Math.max(3.0, 3.0 + (fragments.length * 0.1)) }));
        }
    });
  }, []);

  // Live Telemetry Effect (GROQ)
  useEffect(() => {
      const timer = setTimeout(async () => {
          setLpuActive(true);
          const metrics = await groqService.analyzeCodeTelemetry(activeCode);
          setTelemetry(metrics);
          setLpuActive(false);
      }, 800); // Debounce
      return () => clearTimeout(timer);
  }, [activeCode]);

  const runSimulation = async (codeToRun: string) => {
    setExecuting(true);
    try {
      const startTime = performance.now();
      const userFunction = new Function(codeToRun);
      const result = userFunction();
      const endTime = performance.now();
      
      setLastExecution({
        success: true,
        output: Array.isArray(result) ? `Array[${result.length}]` : String(result),
        executionTime: endTime - startTime,
        memoryUsage: Math.random() * 20
      });
      sfx.playConfirm();
    } catch (e: any) {
      setLastExecution({ success: false, output: e.toString(), executionTime: 0, memoryUsage: 0 });
      sfx.playAlert();
    } finally {
      setExecuting(false);
    }
  };

  const triggerMutation = useCallback(async () => {
    if (optimizing) return;
    setOptimizing(true);
    setProposedCode(null);
    sfx.playData();

    try {
      const historyContext = evoState.history.slice(0, 3).map(p => `v${p.generation}`);
      const janusResult = await geminiService.performSelfOptimization(activeCode, historyContext);
      
      if (janusResult && janusResult.mutated_code) {
        setProposedCode(janusResult.mutated_code);
        setMutationDetails(janusResult);
        sfx.playConfirm();
      }
    } catch (e: any) {
      console.error(e);
      sfx.playAlert();
    } finally {
      setOptimizing(false);
    }
  }, [activeCode, evoState.history, optimizing]);

  const mergeMutation = async () => {
      if (!proposedCode || !mutationDetails) return;
      
      setActiveCode(proposedCode);
      const newGen = Math.round((evoState.generation + 0.1) * 10) / 10;
      const newIq = evoState.iqScore + (mutationDetails.iq_increment || 5);
      
      const patch: EvolutionPatch = {
        generation: newGen,
        timestamp: new Date().toLocaleTimeString(),
        content: JSON.stringify(mutationDetails),
        iqAtTime: newIq,
        merkleHash: mutationDetails.merkle_root,
        validationProof: mutationDetails.security_proof
      };

      setEvoState(prev => ({
          generation: newGen,
          iqScore: newIq,
          history: [patch, ...prev.history]
      }));

      // Reset
      setProposedCode(null);
      setMutationDetails(null);
      sfx.playConfirm();
      window.dispatchEvent(new CustomEvent('genesis-security-event', { detail: { message: `Mutation v${newGen} Intégrée au Noyau.`, type: 'evolution' } }));
  };

  const rejectMutation = () => {
      setProposedCode(null);
      setMutationDetails(null);
      sfx.playBlip();
  };

  useEffect(() => {
    if (autoTrigger && !optimizing && !hasAutoTriggered.current) {
      hasAutoTriggered.current = true;
      triggerMutation();
      onConsumed?.();
    }
  }, [autoTrigger, onConsumed, triggerMutation, optimizing]);

  return (
    <div className="space-y-6 md:space-y-8 h-full flex flex-col animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-4 gap-4">
        <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent italic">Moteur d'Évolution</h2>
            <div className="flex items-center gap-2 mt-2">
                <div className={`h-2 w-2 rounded-full ${optimizing ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="text-xs font-mono text-gray-400">{optimizing ? 'RECHERCHE DE MUTATION (THINKING MODE)' : 'NOYAU STABLE'}</span>
            </div>
        </div>
        <div className="flex gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end">
           <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Génération</p>
              <p className="text-2xl md:text-3xl font-mono text-blue-400">v{evoState.generation.toFixed(1)}</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">QI Synthétique</p>
              <p className="text-2xl md:text-3xl font-mono text-purple-400">{evoState.iqScore}</p>
           </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-1 min-h-0">
        <div className="lg:col-span-8 glass p-4 md:p-8 rounded-[2rem] flex flex-col bg-black/60 shadow-2xl relative min-h-[500px]">
          
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-4">
             <div className="flex gap-2 items-center">
                 <div className="text-[8px] md:text-[9px] text-blue-300 font-bold bg-black px-2 py-0.5 rounded border border-blue-900">RUNTIME JS</div>
                 {lastExecution && (
                     <span className={`text-[9px] font-mono ${lastExecution.success ? 'text-green-500' : 'text-red-500'}`}>
                         Dernière exec: {lastExecution.executionTime.toFixed(2)}ms
                     </span>
                 )}
             </div>
             <div className="flex gap-2">
                 <button onClick={() => runSimulation(activeCode)} disabled={executing || optimizing} className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-gray-800 hover:bg-gray-700 text-white transition-all">
                   Test Actuel
                 </button>
                 {proposedCode && (
                     <button onClick={() => runSimulation(proposedCode)} className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-green-900/50 hover:bg-green-800 text-green-300 border border-green-500/30 transition-all">
                       Test Mutation
                     </button>
                 )}
             </div>
          </div>
          
          {/* Main Code Area */}
          <div className="flex-1 flex flex-col gap-4 min-h-0 relative">
            {proposedCode ? (
                <CodeDiffView original={activeCode} modified={proposedCode} />
            ) : (
                <textarea 
                    value={activeCode} 
                    onChange={(e) => setActiveCode(e.target.value)} 
                    disabled={optimizing} 
                    className={`flex-1 w-full bg-[#080808] border border-white/10 rounded-xl p-4 md:p-5 font-mono text-xs md:text-sm text-blue-200/80 transition-all focus:border-blue-500/50 outline-none resize-none custom-scrollbar ${optimizing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    spellCheck={false} 
                />
            )}
            
            {/* Thinking Overlay */}
            {optimizing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-amber-400 font-mono text-xs uppercase tracking-widest animate-pulse">Analyse structurelle en cours...</p>
                    <p className="text-gray-500 text-[10px] mt-2">Gemini Thinking Mode Active</p>
                </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="mt-6 flex gap-4">
             {proposedCode ? (
                 <>
                    <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4 flex flex-col justify-center">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Résumé de l'Optimisation</p>
                        <p className="text-xs text-white font-mono">{mutationDetails?.diff_summary}</p>
                        <p className="text-[10px] text-blue-400 font-mono mt-1">{mutationDetails?.audit_log}</p>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <button onClick={mergeMutation} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest rounded-xl text-xs shadow-lg shadow-green-900/50 transition-all">
                            FUSIONNER
                        </button>
                        <button onClick={rejectMutation} className="px-8 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-bold uppercase tracking-widest rounded-xl text-[10px] border border-red-500/30 transition-all">
                            REJETER
                        </button>
                    </div>
                 </>
             ) : (
                <button onClick={triggerMutation} disabled={optimizing} className={`flex-1 py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 flex items-center justify-center gap-2 ${optimizing ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]'}`}>
                    {optimizing ? 'RÉFLEXION NEURALE PROFONDE...' : <span>LANCER AUTO-OPTIMISATION JANUS</span>}
                </button>
             )}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* LPU TELEMETRY MODULE */}
            <div className="glass p-4 md:p-6 rounded-[2rem] border-orange-500/20 bg-orange-950/5 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${lpuActive ? 'bg-orange-500 animate-ping' : 'bg-orange-900'}`}></span>
                        LPU REAL-TIME TELEMETRY
                    </h3>
                    <span className="text-[8px] text-orange-500/50 font-mono">GROQ-Llama-3.3</span>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[9px] uppercase font-bold text-gray-500 mb-1">
                            <span>Score Sécurité</span>
                            <span className={telemetry.securityScore > 80 ? 'text-green-400' : 'text-red-400'}>{telemetry.securityScore}/100</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-500 ${telemetry.securityScore > 80 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${telemetry.securityScore}%` }}></div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black/40 p-3 rounded-xl border border-orange-500/10">
                            <p className="text-[8px] text-gray-600 uppercase mb-1">Complexité</p>
                            <p className="text-xs font-mono text-orange-200">{telemetry.complexity}</p>
                        </div>
                        <div className="bg-black/40 p-3 rounded-xl border border-orange-500/10">
                            <p className="text-[8px] text-gray-600 uppercase mb-1">Classification</p>
                            <p className="text-xs font-mono text-orange-200 truncate">{telemetry.type}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass p-4 md:p-6 rounded-[2rem] overflow-hidden flex flex-col border-white/5 min-h-[300px] flex-1">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Journal des Mutations
                </h3>
                <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 space-y-3 md:space-y-4">
                    {evoState.history.map((p, i) => (
                        <div key={i} className="p-3 md:p-4 bg-[#0a0a0a] rounded-lg border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-blue-400 font-mono group-hover:text-blue-300">PATCH v{p.generation.toFixed(1)}</span>
                            <span className="text-[9px] text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full font-mono">+{p.iqAtTime - (evoState.history[i+1]?.iqAtTime || 200)} IQ</span>
                        </div>
                        <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden mb-2">
                            <div className="bg-blue-500 h-full shadow-[0_0_10px_#3b82f6]" style={{ width: `${(p.iqAtTime / 300) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] font-mono text-gray-600">
                            <span>{p.timestamp}</span>
                            <span className="text-purple-500/70">{p.merkleHash.slice(0, 8)}...</span>
                        </div>
                        </div>
                    ))}
                    {evoState.history.length === 0 && <p className="text-center text-[10px] text-gray-700 uppercase font-mono py-10">Aucune mutation active</p>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionLab;
