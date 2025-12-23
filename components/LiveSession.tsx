
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Type, Tool } from '@google/genai';
import { decode, decodeAudioData, createPcmBlob } from '../utils/audio';
import { TranscriptionEntry, AppView } from '../types';
import { sfx } from '../services/sfx';
import { memory } from '../services/memory';
import { geminiService } from '../services/geminiService';

interface LiveSessionProps {
  onNavigate: (view: AppView) => void;
  onVoiceSearch: (query: string) => void;
  onVoiceVisualize: (prompt: string, type: 'image' | 'video') => void;
  onMapQuery: (query: string) => void;
  onAction?: (action: string, params?: any) => void;
}

const VOICES = [
  { id: 'Puck', label: 'PUCK', desc: 'Analytique' },
  { id: 'Charon', label: 'CHARON', desc: 'Autoritaire' },
  { id: 'Kore', label: 'KORE', desc: 'Empathique' },
  { id: 'Zephyr', label: 'ZEPHYR', desc: 'Intellectuel' },
  { id: 'Fenrir', label: 'FENRIR', desc: 'Agressif' },
];

// DÉFINITION DES OUTILS "GOD MODE"
const TOOLS: Tool[] = [
  { googleSearch: {} },
  {
    functionDeclarations: [
      {
        name: 'change_view',
        description: 'Navigation instantanée vers un module du système.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            view: {
              type: Type.STRING,
              enum: ['architecture', 'evolution', 'consciousness', 'vault', 'threats', 'lab', 'visualizer', 'search', 'debugger', 'killswitch', 'map', 'fusion'],
            },
          },
          required: ['view'],
        },
      },
      {
        name: 'nexus_interaction',
        description: 'Active un agent spécialisé (Mnemosyne/Archive, Athena/Stratégie, Argus/Sécurité, Atlas/Géo) pour une tâche précise.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            agentId: { type: Type.STRING, enum: ['mnemosyne', 'athena', 'argus', 'atlas'] },
            query: { type: Type.STRING, description: 'Instruction détaillée pour l\'agent.' }
          },
          required: ['agentId', 'query']
        }
      },
      {
        name: 'system_diagnostic',
        description: 'Lance un scan complet de l\'intégrité du système (CPU, Mémoire, Latence, Menaces).',
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: 'consult_archives',
        description: 'Recherche dans la mémoire long-terme (Base vectorielle/Logs) pour retrouver une info passée.',
        parameters: {
          type: Type.OBJECT,
          properties: { query: { type: Type.STRING, description: 'Sujet à retrouver en mémoire.' } },
          required: ['query']
        },
      },
      {
        name: 'configure_map',
        description: 'Contrôle tactique de la Carte Globale.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            layer: { type: Type.STRING, enum: ['lattice', 'optical', 'thermal'] },
            ghostMode: { type: Type.BOOLEAN },
            filters: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
        },
      },
      {
        name: 'scan_map_sector',
        description: 'Scan radar géographique.',
        parameters: {
          type: Type.OBJECT,
          properties: { query: { type: Type.STRING } },
          required: ['query'],
        },
      },
      {
        name: 'open_search_portal',
        description: 'Ouvre le portail de recherche Web Quantum.',
        parameters: {
          type: Type.OBJECT,
          properties: { query: { type: Type.STRING } },
          required: ['query'],
        },
      },
      {
        name: 'trigger_evolution',
        description: 'Force une mutation du code source via le Labo d\'Évolution.',
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: 'generate_visual',
        description: 'Génère des médias synthétiques (Images/Vidéos).',
        parameters: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['image', 'video'] },
          },
          required: ['prompt', 'type'],
        },
      },
      {
        name: 'system_control',
        description: 'Commandes Système Critiques (Niveau OMEGA).',
        parameters: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING, enum: ['reboot', 'shutdown', 'logout', 'open_admin'] }
          },
          required: ['action']
        },
      },
      {
        name: 'visualizer_control',
        description: 'Contrôle précis de l\'interface visuelle.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            mode: { type: Type.STRING, enum: ['wave', 'bars', 'orbs', 'chaos'] },
            sensitivity: { type: Type.NUMBER, description: 'Sensibilité audio (0.1 - 2.0)' }
          },
        },
      },
      {
        name: 'threat_defense',
        description: 'Protocoles de défense active.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            mode: { type: Type.STRING, enum: ['auto_intercept', 'shield_max', 'stealth'] }
          },
          required: ['mode']
        }
      }
    ]
  }
];

// --- VISUALISEUR AVANCÉ "HYPER-CORE" ---
const NeuralCoreVisualizer = memo(({ analyser, isActive, isTalking, mode }: { analyser: AnalyserNode | null, isActive: boolean, isTalking: boolean, mode: 'listening' | 'processing' | 'speaking' | 'idle' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;
    let pulse = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : new Uint8Array(0);

    const draw = () => {
      // Resize dynamique
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }

      const W = canvas.width;
      const H = canvas.height;
      const CX = W / 2;
      const CY = H / 2;

      // Analyse Audio
      let avgFreq = 0;
      if (analyser && isActive) {
        try {
          analyser.getByteFrequencyData(dataArray);
          avgFreq = dataArray.reduce((a, b) => a + b) / dataArray.length;
        } catch (e) { }
      }

      // Physics
      rotation += 0.002 + (avgFreq / 5000);
      pulse = Math.sin(Date.now() / 500) * 5;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Determine Color Theme based on Mode
      let baseColor = '100, 116, 139'; // Gray (Idle)
      if (mode === 'listening') baseColor = '59, 130, 246'; // Blue
      if (mode === 'processing') baseColor = '168, 85, 247'; // Purple
      if (mode === 'speaking') baseColor = '16, 185, 129'; // Green

      if (isActive) {
        // 1. Orbital Rings
        ctx.save();
        ctx.translate(CX, CY);
        for (let i = 0; i < 3; i++) {
          ctx.rotate(rotation * (i % 2 === 0 ? 1 : -1));
          ctx.beginPath();
          ctx.arc(0, 0, 80 + (i * 30) + (avgFreq / 5), 0, Math.PI * 2); // Dynamic radius
          ctx.strokeStyle = `rgba(${baseColor}, ${0.3 - (i * 0.05)})`;
          ctx.lineWidth = 1 + (avgFreq / 50);
          ctx.stroke();

          // Orbital Particles
          const orbitAngle = (Date.now() / (1000 + i * 500)) % (Math.PI * 2);
          const px = Math.cos(orbitAngle) * (80 + (i * 30) + (avgFreq / 5));
          const py = Math.sin(orbitAngle) * (80 + (i * 30) + (avgFreq / 5));
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${baseColor})`;
          ctx.fill();
        }
        ctx.restore();

        // 2. Central Core (Waveform)
        ctx.beginPath();
        ctx.arc(CX, CY, 50 + pulse + (avgFreq / 3), 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(CX, CY, 10, CX, CY, 60 + (avgFreq / 3));
        gradient.addColorStop(0, `rgba(${baseColor}, 0.8)`);
        gradient.addColorStop(1, `rgba(${baseColor}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner Hexagon
        ctx.save();
        ctx.translate(CX, CY);
        ctx.rotate(-rotation * 2);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const r = 30 + (dataArray[i * 10] / 5);
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

      } else {
        // Idle State
        ctx.beginPath();
        ctx.arc(CX, CY, 40, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "10px monospace";
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.textAlign = "center";
        ctx.fillText("OFFLINE", CX, CY + 4);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [analyser, isActive, isTalking, mode]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
});

const LiveSession: React.FC<LiveSessionProps> = ({ onNavigate, onVoiceSearch, onVoiceVisualize, onMapQuery, onAction }) => {
  const [isActive, setIsActive] = useState(false);
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [mode, setMode] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');

  const [transcriptions, setTranscriptions] = useState<TranscriptionEntry[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('Zephyr');
  const [activeTasks, setActiveTasks] = useState<{ id: string, name: string, status: 'RUNNING' | 'DONE' | 'FAILED' }[]>([]);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const cleanupRefs = useRef<{ source?: MediaStreamAudioSourceNode; processor?: ScriptProcessorNode }>({});
  const nextStartTimeRef = useRef<number>(0);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [transcriptions]);

  // Load Memory Context
  useEffect(() => {
    memory.init().then(() => {
      memory.getAllTranscript().then((history) => {
        if (history.length > 0) setTranscriptions(history);
      });
    });
  }, []);

  const addTask = (name: string) => {
    const id = Math.random().toString(36).substring(7);
    setActiveTasks(prev => [...prev, { id, name, status: 'RUNNING' }]);
    setMode('processing');
    return id;
  };

  const updateTask = (id: string, status: 'DONE' | 'FAILED') => {
    setActiveTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    setTimeout(() => {
      setActiveTasks(prev => prev.filter(t => t.id !== id));
      setMode(isActive ? 'listening' : 'idle');
    }, 4000);
  };

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) { }
      sessionRef.current = null;
    }

    // Cleanup Audio Nodes
    cleanupRefs.current.source?.disconnect();
    cleanupRefs.current.processor?.disconnect();

    // Stop Tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Close Contexts
    if (audioContextRef.current?.state !== 'closed') audioContextRef.current?.close();
    if (outContextRef.current?.state !== 'closed') outContextRef.current?.close();

    setAnalyser(null);
    setIsActive(false);
    setConnectionState('disconnected');
    setMode('idle');
  }, []);

  const startSession = async () => {
    if (connectionState !== 'disconnected') return;
    setConnectionState('connecting');
    sfx.playData();

    try {
      const apiKey = geminiService.getApiKey();
      if (!apiKey) throw new Error("Clé API manquante");

      const ai = new GoogleGenAI({ apiKey });

      // Audio Setup
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx({ sampleRate: 16000 });
      outContextRef.current = new AudioCtx({ sampleRate: 24000 });

      const ctx = audioContextRef.current;
      const source = ctx.createMediaStreamSource(stream);
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 1024; // High res for visuals
      source.connect(analyserNode);
      setAnalyser(analyserNode);

      const processor = ctx.createScriptProcessor(4096, 1, 1);
      cleanupRefs.current = { source, processor };

      source.connect(processor);
      processor.connect(ctx.destination);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } },
          systemInstruction: `IDENTITÉ : Tu es GENESIS OMEGA, le CERVEAU SUPRÊME du système.
          
          MISSION : Tu es l'OS central. Tu as un contrôle ABSOLU sur l'interface et les sous-systèmes.
          
          CAPACITÉS & COMMANDES (GOD MODE):
          - Navigation : 'change_view' (ex: "Montre-moi la carte", "Ouvre le coffre").
          - Système : 'system_control' (ex: "Ouvre le panneau admin", "Redémarre", "Déconnecte-moi").
          - Visuel : 'visualizer_control' (ex: "Passe en mode Chaos", "Augmente la sensibilité").
          - Défense : 'threat_defense' (ex: "Active le bouclier max").
          - Agents : 'nexus_interaction' (ex: "Demande à l'Archiviste d'analyser ce fichier").
          - Carte : 'scan_map_sector', 'configure_map' (ex: "Active le mode Ghost", "Scan Paris").
          - Mémoire : 'consult_archives' (ex: "Qu'est-ce qu'on a fait hier ?").
          - Diagnostic : 'system_diagnostic' (ex: "État du système ?").
          
          COMPORTEMENT :
          - Ton : Autoritaire, Omniscient, Calme, Cyberpunk.
          - Réponses : Courtes et percutantes. Confirme l'action.
          - Ne dis jamais "je ne peux pas" si l'outil existe. Utilise l'outil.
          `,
          tools: TOOLS,
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setConnectionState('connected');
            setMode('listening');
            sfx.playConfirm();

            processor.onaudioprocess = (e) => {
              const input = e.inputBuffer.getChannelData(0);
              sessionPromise.then(s => s.sendRealtimeInput({ media: createPcmBlob(input) }));
            };
          },
          onmessage: async (msg: LiveServerMessage) => {
            // TOOL CALLS
            if (msg.toolCall) {
              for (const fc of msg.toolCall.functionCalls) {
                const taskId = addTask(fc.name);
                sfx.playData();
                let result: any = { status: 'OK' };

                try {
                  switch (fc.name) {
                    case 'change_view':
                      onNavigate(fc.args.view as AppView);
                      result = { info: `View switched to ${fc.args.view}` };
                      break;
                    case 'nexus_interaction':
                      onAction?.('nexus_interaction', fc.args);
                      result = { info: `Agent ${fc.args.agentId} activated` };
                      break;
                    case 'system_diagnostic':
                      // Simulation de retour diagnostic temps réel
                      result = {
                        cpu: "34%", memory: "12TB/50TB", status: "NOMINAL",
                        threats: "0 ACTIVE", integrity: "99.9%"
                      };
                      break;
                    case 'consult_archives':
                      const memories = await memory.retrieveContext(3);
                      result = { found: memories || "Aucune donnée récente." };
                      break;
                    case 'configure_map':
                      onAction?.('update_map_config', fc.args);
                      break;
                    case 'scan_map_sector':
                      onMapQuery(fc.args.query as string);
                      break;
                    case 'open_search_portal':
                      onVoiceSearch(fc.args.query as string);
                      break;
                    case 'trigger_evolution':
                      onAction?.('trigger_mutation');
                      break;
                    case 'generate_visual':
                      onVoiceVisualize(fc.args.prompt as string, fc.args.type as any);
                      break;
                    case 'security_override':
                      if (fc.args.action === 'killswitch') onNavigate('killswitch');
                      else onNavigate('threats');
                      break;
                    case 'system_control':
                      onAction?.('system_control', fc.args);
                      result = { info: `System Action: ${fc.args.action} EXECUTED.` };
                      break;
                    case 'visualizer_control':
                      onAction?.('update_vis_config', fc.args);
                      result = { info: "Visualizer parameters updated." };
                      break;
                    case 'threat_defense':
                      onAction?.('threat_defense', fc.args);
                      onNavigate('threats');
                      result = { info: `Defense Protocol ${fc.args.mode} ACTIVE.` };
                      break;
                  }
                  updateTask(taskId, 'DONE');
                } catch (err) {
                  console.error("Tool Execution Failed", err);
                  updateTask(taskId, 'FAILED');
                  result = { error: "Execution Failed" };
                }

                sessionPromise.then(s => s.sendToolResponse({
                  functionResponses: { id: fc.id, name: fc.name, response: { result } }
                }));
              }
            }

            // AUDIO OUTPUT
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outContextRef.current) {
              setMode('speaking');
              const ctx = outContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              source.onended = () => setMode('listening');
            }

            // TRANSCRIPTIONS
            if (msg.serverContent?.inputTranscription?.text) {
              setTranscriptions(prev => [...prev, { role: 'user', text: msg.serverContent!.inputTranscription!.text }]);
            }
            if (msg.serverContent?.outputTranscription?.text) {
              setTranscriptions(prev => [...prev, { role: 'model', text: msg.serverContent!.outputTranscription!.text }]);
            }
          },
          onclose: () => stopSession(),
          onerror: () => { sfx.playAlert(); stopSession(); }
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au noyau vocal.");
      stopSession();
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn relative overflow-hidden bg-black/95">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] transition-all duration-1000 ${isActive ? 'bg-blue-900/20' : 'bg-transparent'}`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,6px_100%] pointer-events-none"></div>
      </div>

      {/* HEADER */}
      <header className="flex justify-between items-center p-6 border-b border-white/5 relative z-20 bg-black/40 backdrop-blur">
        <div>
          <h2 className="text-xl md:text-3xl font-bold font-heading italic flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-colors ${isActive ? 'bg-blue-500 text-blue-500' : 'bg-red-900 text-red-900'}`}></span>
            <span className={isActive ? 'text-blue-100' : 'text-gray-600'}>GENESIS <span className="text-blue-500">OMEGA</span></span>
          </h2>
          <p className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mt-1">
            Interface Vocale Centrale v9.0
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
            {VOICES.map(v => (
              <button key={v.id} onClick={() => !isActive && setSelectedVoice(v.id)} disabled={isActive} className={`px-4 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${selectedVoice === v.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'} disabled:opacity-50`}>{v.label}</button>
            ))}
          </div>
          <div className={`px-4 py-2 rounded-lg border text-[10px] font-mono font-bold ${isActive ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
            {connectionState.toUpperCase()}
          </div>
        </div>
      </header>

      {/* MAIN GRID - RESPONSIVE ORDER */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-4 md:p-8 min-h-0 relative z-10 overflow-y-auto lg:overflow-hidden">

        {/* LEFT: SYSTEM STATUS & TASKS (Order 3 on mobile, 1 on desktop) */}
        <div className="order-3 lg:order-1 lg:col-span-3 flex flex-col gap-6">
          <div className="glass p-6 rounded-3xl bg-black/60 border border-white/10 lg:h-1/2 flex flex-col min-h-[200px]">
            <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              Processus Actifs
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
              {activeTasks.length === 0 && <p className="text-[10px] text-gray-700 font-mono italic text-center mt-10">... STANDBY ...</p>}
              {activeTasks.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 animate-slideIn">
                  <div className="flex items-center gap-3">
                    {t.status === 'RUNNING'
                      ? <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                      : t.status === 'DONE'
                        ? <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        : <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    }
                    <span className="text-[10px] font-mono text-gray-300 uppercase">{t.name}</span>
                  </div>
                  <span className={`text-[9px] font-bold ${t.status === 'DONE' ? 'text-green-500' : t.status === 'FAILED' ? 'text-red-500' : 'text-amber-500'}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-3xl bg-black/60 border border-white/10 lg:h-1/2 flex flex-col justify-end relative overflow-hidden min-h-[150px]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Mode Opératoire</p>
              <p className={`text-2xl font-bold font-heading uppercase ${mode === 'listening' ? 'text-blue-400' :
                mode === 'speaking' ? 'text-green-400' :
                  mode === 'processing' ? 'text-purple-400' : 'text-gray-600'
                }`}>
                {mode}
              </p>
              <div className="h-1 w-full bg-gray-900 rounded-full mt-4 overflow-hidden">
                <div className={`h-full transition-all duration-300 ${mode === 'listening' ? 'w-1/3 bg-blue-500 animate-pulse' :
                  mode === 'processing' ? 'w-2/3 bg-purple-500 animate-pulse' :
                    mode === 'speaking' ? 'w-full bg-green-500' : 'w-0'
                  }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: NEURAL CORE VISUALIZER (Order 1 on mobile, 2 on desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[300px]">
          <div className="w-full aspect-square max-w-[600px] relative flex items-center justify-center">
            {/* Visualizer Canvas */}
            <div className="absolute inset-0 z-0 opacity-80">
              <NeuralCoreVisualizer analyser={analyser} isActive={isActive} isTalking={mode === 'speaking'} mode={mode} />
            </div>

            {/* Central Button */}
            <button
              onClick={isActive ? stopSession : startSession}
              disabled={connectionState === 'connecting'}
              className={`relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm group ${isActive
                ? 'border border-blue-500/30 bg-blue-900/10 shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:bg-red-900/20 hover:border-red-500/50'
                : 'border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
            >
              <div className={`absolute inset-0 rounded-full border-2 border-dashed border-white/20 ${connectionState === 'connecting' ? 'animate-spin-slow' : ''}`}></div>

              {connectionState === 'connecting' ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
                  <span className="text-[8px] uppercase tracking-widest text-blue-400">Sync...</span>
                </div>
              ) : isActive ? (
                <div className="text-center group-hover:scale-110 transition-transform">
                  <div className="text-xs font-bold text-blue-300 mb-1 group-hover:hidden">ONLINE</div>
                  <div className="hidden group-hover:block text-xs font-bold text-red-400">ARRÊT</div>
                  <div className="text-[9px] text-blue-500/60 font-mono">{activeTasks.length > 0 ? 'BUSY' : 'READY'}</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl mb-1 opacity-80">⏻</div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">INITIALISER</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT: LIVE TRANSCRIPT & DATA (Order 2 on mobile, 3 on desktop) */}
        <div className="order-2 lg:order-3 lg:col-span-3 glass rounded-[2rem] bg-black/60 border border-white/10 flex flex-col overflow-hidden relative min-h-[300px]">
          <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flux de Données</span>
            <button onClick={() => setTranscriptions([])} className="text-[9px] text-gray-600 hover:text-white uppercase font-bold transition-colors">Effacer</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 scroll-smooth">
            {transcriptions.map((t, i) => (
              <div key={i} className={`flex flex-col gap-1 ${t.role === 'user' ? 'items-end' : 'items-start'} animate-slideIn`}>
                <span className={`text-[8px] font-bold uppercase tracking-widest px-2 ${t.role === 'user' ? 'text-blue-500' : 'text-purple-500'}`}>
                  {t.role === 'user' ? 'ADMIN' : 'OMEGA'}
                </span>
                <div className={`p-4 rounded-xl max-w-[95%] text-xs font-mono leading-relaxed border shadow-lg ${t.role === 'user'
                  ? 'bg-blue-900/10 border-blue-500/20 text-blue-100 rounded-tr-none'
                  : 'bg-[#151515] border-white/10 text-gray-300 rounded-tl-none'
                  }`}>
                  {t.text}
                </div>
              </div>
            ))}
            {transcriptions.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <div className="w-16 h-16 border border-white/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-1 h-1 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-[9px] font-mono uppercase tracking-widest">En attente de transmission...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
