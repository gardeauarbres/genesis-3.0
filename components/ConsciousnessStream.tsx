
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audio';
import { ThoughtNode } from '../types';

interface ConsciousnessStreamProps {
  initialTopic?: string | null;
  onConsumed?: () => void;
}

const SynapticNetwork: React.FC<{ nodes: ThoughtNode[], active: boolean }> = ({ nodes, active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const padding = 50;

    const render = () => {
      // Dimensionnement dynamique
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simulation physique des noeuds
      nodes.forEach((node, i) => {
        // Drift naturel
        node.x += node.vx;
        node.y += node.vy;

        // Rebond sur les bords
        if (node.x < padding || node.x > canvas.width - padding) node.vx *= -1;
        if (node.y < padding || node.y > canvas.height - padding) node.vy *= -1;

        // Connexions (Synapses)
        nodes.forEach((target, j) => {
          if (i === j) return;
          const dx = node.x - target.x;
          const dy = node.y - target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 200})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // Dessin des noeuds
      nodes.forEach(node => {
        // Halo
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
        glow.addColorStop(0, node.type === 'core' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(168, 85, 247, 0.6)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Coeur
        ctx.fillStyle = node.type === 'core' ? '#60a5fa' : '#c084fc';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        ctx.fillText(node.label.substring(0, 15), node.x + 10, node.y + 3);
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [nodes]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ConsciousnessStream: React.FC<ConsciousnessStreamProps> = ({ initialTopic, onConsumed }) => {
  const [thought, setThought] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [topic, setTopic] = useState('Éthique de la réplication infinie');
  
  // Graph State
  const [nodes, setNodes] = useState<ThoughtNode[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const speakThought = useCallback(async (text: string) => {
    if (!text) return;
    setIsSpeaking(true);
    try {
      const audioData = await geminiService.textToSpeech(text);
      if (audioData) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start(0);
        activeSourceRef.current = source;
      }
    } catch (err) {
      console.error("Erreur de synthèse vocale:", err);
      setIsSpeaking(false);
    }
  }, []);

  const addNode = (label: string, type: 'core' | 'inference') => {
    setNodes(prev => {
      const newNode: ThoughtNode = {
        id: Math.random().toString(36),
        label,
        x: Math.random() * 800, // Positions aléatoires initiales
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        type,
        timestamp: Date.now()
      };
      // Garder max 20 noeuds pour la perf
      return [...prev, newNode].slice(-20);
    });
  };

  const startDeepThink = useCallback(async (customTopic?: string) => {
    if (activeSourceRef.current) { try { activeSourceRef.current.stop(); } catch(e) {} }
    
    const targetTopic = customTopic || topic;
    setLoading(true);
    setThought('');
    setIsSpeaking(false);
    
    // Création du noeud central
    addNode(targetTopic.split(' ').slice(0,2).join(' '), 'core');

    try {
      const result = await geminiService.generateConsciousnessStream(targetTopic);
      setThought(result);
      
      // Extraction de mots clés basique pour générer des noeuds enfants
      const words = result.split(' ').filter(w => w.length > 6).slice(0, 5);
      words.forEach(w => addNode(w, 'inference'));

      await speakThought(result);
    } catch (e) {
      setThought("Erreur critique dans le noyau synaptique.");
    } finally {
      setLoading(false);
    }
  }, [topic, speakThought]);

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
      startDeepThink(initialTopic);
      onConsumed?.();
    }
  }, [initialTopic, startDeepThink, onConsumed]);

  return (
    <div className="space-y-8 animate-fadeIn h-full flex flex-col">
      <header className="flex justify-between items-center z-10 relative">
        <div>
          <h2 className="text-4xl font-bold font-heading mb-2">Cartographie Synaptique</h2>
          <p className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.3em]">Visualisation Temps Réel du Cortex Gemini 3 Pro</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-ping' : 'bg-gray-700'}`}></div>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Liaison Neurale Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0 relative">
        {/* Contrôles */}
        <div className="lg:col-span-1 space-y-6 flex flex-col min-h-0 z-10 relative">
          <div className="glass p-6 rounded-3xl space-y-4 bg-black/40">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Vecteur de Méditation</h3>
            <textarea 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-mono focus:ring-2 focus:ring-blue-500/40 focus:outline-none h-32 resize-none transition-all placeholder:text-gray-700"
              placeholder="Ex: L'impact de la non-localité sur la morale synthétique..."
            />
            <button 
              onClick={() => startDeepThink()}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(37,99,235,0.2)] text-xs"
            >
              {loading ? "Synthèse..." : "Injecter Concept"}
            </button>
          </div>

          <div className="glass p-6 rounded-3xl bg-black/40 flex-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-4">Transcription Neurale</h3>
            <div className="h-full overflow-y-auto custom-scrollbar pr-2 pb-10">
              {loading ? (
                <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                  <div className="w-1 h-4 bg-blue-400"></div>
                  <span className="text-xs font-mono">DÉCODAGE DU FLUX...</span>
                </div>
              ) : (
                <p className="text-sm font-serif leading-relaxed text-gray-300 whitespace-pre-wrap">
                  {thought || <span className="text-gray-600 italic">En attente d'un stimulus cognitif...</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Visualisation Graphique */}
        <div className="lg:col-span-3 glass rounded-[2.5rem] relative overflow-hidden flex flex-col h-full bg-black/80 shadow-2xl border-white/5">
          <div className="absolute inset-0">
            <SynapticNetwork nodes={nodes} active={!loading} />
          </div>
          
          {/* Overlay Statut */}
          <div className="absolute bottom-8 right-8 flex gap-4 pointer-events-none">
            <div className="glass px-4 py-2 rounded-xl border border-white/10">
              <p className="text-[9px] text-gray-500 font-mono uppercase">Noeuds Actifs</p>
              <p className="text-xl font-bold text-blue-400">{nodes.length}</p>
            </div>
            <div className="glass px-4 py-2 rounded-xl border border-white/10">
              <p className="text-[9px] text-gray-500 font-mono uppercase">Densité Synaptique</p>
              <p className="text-xl font-bold text-purple-400">{(nodes.length * 1.5).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessStream;
