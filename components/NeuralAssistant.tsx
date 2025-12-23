
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Type, Tool } from '@google/genai';
import { decode, decodeAudioData, createPcmBlob } from '../utils/audio';
import { TranscriptionEntry, AppView } from '../types';
import { memory } from '../services/memory';
import { sfx } from '../services/sfx';
import { geminiService } from '../services/geminiService';

// --- VISUALISEUR NEURAL ---
const NeuralCoreVisualizer = memo(({ analyser, isActive, isTalking }: { analyser: AnalyserNode | null, isActive: boolean, isTalking: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Si pas d'analyseur, on dessine juste un cercle "en veille"
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;
    
    // Buffer pour les données de fréquence
    let dataArray: Uint8Array;
    if (analyser) {
        dataArray = new Uint8Array(analyser.frequencyBinCount);
    }

    const draw = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      const centerX = WIDTH / 2;
      const centerY = HEIGHT / 2;

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      let average = 0;
      if (analyser && isActive) {
          try {
            analyser.getByteFrequencyData(dataArray);
            average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          } catch(e) {
              // Ignore visualization errors if context is closed
          }
      }
      
      rotation += 0.005 + (average / 2000);

      if (isActive) {
          // CERCLE EXTERNE (Pulsation)
          ctx.beginPath();
          ctx.arc(centerX, centerY, 60 + (average / 2), 0, 2 * Math.PI);
          ctx.strokeStyle = isTalking ? 'rgba(59, 130, 246, 0.6)' : 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 2 + (average / 50);
          ctx.shadowBlur = 15;
          ctx.shadowColor = isTalking ? '#3b82f6' : '#10b981';
          ctx.stroke();
          ctx.shadowBlur = 0;

          // FORME DYNAMIQUE INTERNE
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(rotation);
          
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
              const angle = (Math.PI * 2 * i) / 6;
              // Modification du rayon basée sur les fréquences
              const val = dataArray ? dataArray[i * 10] : 0;
              const r = 40 + (val / 3); 
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = isTalking ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)';
          ctx.strokeStyle = isTalking ? '#3b82f6' : '#10b981';
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();
          
          // Lignes connectées au centre
          ctx.beginPath();
          ctx.moveTo(0,0);
          ctx.lineTo(Math.cos(rotation * 2) * 20, Math.sin(rotation * 2) * 20);
          ctx.stroke();

          ctx.restore();
      } else {
          // IDLE STATE (Cercle simple)
          ctx.beginPath();
          ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [analyser, isActive, isTalking]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
});

interface NeuralAssistantProps {
  onNavigate: (view: AppView) => void;
  onVoiceSearch: (query: string) => void;
  onVoiceVisualize: (prompt: string, type: 'image' | 'video') => void;
  onMapQuery: (query: string) => void;
  onAction?: (action: string, params?: any) => void;
  isLabView: boolean;
  transcriptions: TranscriptionEntry[];
  setTranscriptions: React.Dispatch<React.SetStateAction<TranscriptionEntry[]>>;
}

const TOOLS: Tool[] = [
  { googleSearch: {} },
  {
    functionDeclarations: [
      {
        name: 'change_view',
        description: 'Navigation globale du système. Bascule l\'affichage.',
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
        description: 'Délègue une tâche à un agent spécialisé (Nexus).',
        parameters: {
          type: Type.OBJECT,
          properties: {
            agentId: { type: Type.STRING, enum: ['mnemosyne', 'athena', 'argus', 'atlas'] },
            query: { type: Type.STRING }
          },
          required: ['agentId', 'query']
        }
      },
      {
        name: 'configure_map',
        description: 'Configure l\'affichage de la carte (Ghost Mode, Calques).',
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
        description: 'Recherche un lieu sur la Carte Globale.',
        parameters: {
          type: Type.OBJECT,
          properties: { query: { type: Type.STRING } },
          required: ['query'],
        },
      },
      {
        name: 'open_search_portal',
        description: 'Recherche web avancée.',
        parameters: {
          type: Type.OBJECT,
          properties: { query: { type: Type.STRING } },
          required: ['query'],
        },
      },
      {
        name: 'get_user_location',
        description: 'Obtient la position GPS.',
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: 'trigger_evolution',
        description: 'Initie un cycle de mutation.',
        parameters: { type: Type.OBJECT, properties: {} },
      },
      {
        name: 'generate_visual',
        description: 'Crée une image ou vidéo.',
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
        name: 'security_override',
        description: 'Accès sécurité/menaces.',
        parameters: { 
            type: Type.OBJECT, 
            properties: { action: { type: Type.STRING, enum: ['purge', 'monitor', 'killswitch'] } },
            required: ['action']
        },
      }
    ]
  }
];

const NeuralAssistant: React.FC<NeuralAssistantProps> = ({ 
  onNavigate, onVoiceSearch, onVoiceVisualize, onMapQuery, onAction, isLabView, transcriptions, setTranscriptions 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [executingTask, setExecutingTask] = useState<string | null>(null);
  const [analyserLevel, setAnalyserLevel] = useState(0);
  const [isTalking, setIsTalking] = useState(false);
  const [activeAnalyser, setActiveAnalyser] = useState<AnalyserNode | null>(null);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Cleanup refs
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [transcriptions]);

  const getUserLocation = async (): Promise<string> => {
    return new Promise((resolve) => {
       if (!navigator.geolocation) resolve("GPS Indisponible.");
       navigator.geolocation.getCurrentPosition(
         (pos) => resolve(`Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`),
         () => resolve("Signal GPS perdu.")
       );
    });
  };

  const stopSession = useCallback(() => {
    // 1. Fermer la session Gemini
    if (sessionRef.current) { 
        try { sessionRef.current.close(); } catch(e) { console.warn("Session close err:", e); }
        sessionRef.current = null; 
    }
    
    // 2. Arrêter l'animation et processeurs
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (processorRef.current) { processorRef.current.disconnect(); processorRef.current = null; }
    if (sourceRef.current) { sourceRef.current.disconnect(); sourceRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
    
    // 3. Fermer les contextes audio pour libérer le matériel
    if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch(e) {}
        audioContextRef.current = null;
    }
    if (outContextRef.current) {
        try { outContextRef.current.close(); } catch(e) {}
        outContextRef.current = null;
    }

    setActiveAnalyser(null);
    setIsActive(false);
    setIsConnecting(false);
    setExecutingTask(null);
    setIsTalking(false);
    
    if (isActive) sfx.playAlert();
  }, [isActive]);

  const startSession = async () => {
    if (isConnecting || isActive) return;

    const apiKey = geminiService.getApiKey();
    if (!apiKey) {
      alert("Clé API Gemini non configurée.");
      return;
    }

    // --- CRÉATION SYNCHRONE DU CONTEXTE AUDIO ---
    // Doit être fait dans le gestionnaire d'événement
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const inputCtx = new AudioContextClass({ sampleRate: 16000 });
        const outputCtx = new AudioContextClass({ sampleRate: 24000 });
        
        // Tentative de reprise immédiate si suspendu
        if (inputCtx.state === 'suspended') await inputCtx.resume();
        if (outputCtx.state === 'suspended') await outputCtx.resume();

        audioContextRef.current = inputCtx;
        outContextRef.current = outputCtx;
    } catch (e) {
        console.error("AudioContext Init Error:", e);
        alert("Impossible d'initialiser l'audio. Vérifiez vos permissions.");
        return;
    }

    sfx.playConfirm();
    setIsConnecting(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      streamRef.current = stream;
      
      if (!audioContextRef.current) throw new Error("Context Audio perdu.");

      // Setup Analyser
      const sourceNode = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current = sourceNode;
      
      const newAnalyser = audioContextRef.current.createAnalyser();
      newAnalyser.fftSize = 512;
      sourceNode.connect(newAnalyser);
      
      setActiveAnalyser(newAnalyser);

      // Animation barres (pour le bouton flottant)
      const updateLevel = () => {
        if (!newAnalyser) return;
        const data = new Uint8Array(newAnalyser.frequencyBinCount);
        newAnalyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b) / data.length;
        setAnalyserLevel(avg);
        rafRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO], // GEMINI SEUL GÈRE L'AUDIO SORTANT
          inputAudioTranscription: {}, // Transcription automatique de l'audio entrant
          outputAudioTranscription: {}, // Transcription automatique de l'audio sortant
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: `Tu es le CERVEAU SUPRÊME (GENESIS CORE).
          Tu es l'UNIQUE interface vocale de ce système. Tu contrôles tous les modules (Carte, Nexus, Labo).
          Tu es persistant et tu ne te déconnectes JAMAIS lors d'un changement de vue.
          Si l'utilisateur demande de changer de vue, tu exécutes l'action 'change_view' ET tu continues la conversation.
          Sois concis, technique et proactif.`,
          tools: TOOLS,
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            sfx.playConfirm();
            
            // Audio Streaming
            if (audioContextRef.current) {
                const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
                processorRef.current = processor;
                
                processor.onaudioprocess = (e) => {
                  const input = e.inputBuffer.getChannelData(0);
                  sessionPromise.then(s => s.sendRealtimeInput({ media: createPcmBlob(input) }));
                };
                sourceNode.connect(processor);
                processor.connect(audioContextRef.current.destination);
            }
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Gestion des Outils
            if (msg.toolCall) {
              for (const fc of msg.toolCall.functionCalls) {
                setExecutingTask(fc.name);
                sfx.playData();
                let result = "OK";
                
                switch(fc.name) {
                  case 'change_view': 
                      onNavigate(fc.args.view as AppView); 
                      result = `Navigation vers ${fc.args.view} effectuée. Je reste à l'écoute.`; 
                      break;
                  case 'nexus_interaction': onAction?.('nexus_interaction', fc.args); result = "Nexus contacté"; break;
                  case 'configure_map': onAction?.('update_map_config', fc.args); result = "Map Configurée"; break;
                  case 'scan_map_sector': onMapQuery(fc.args.query as string); result="Map Scanning"; break;
                  case 'open_search_portal': onVoiceSearch(fc.args.query as string); break;
                  case 'get_user_location': result = await getUserLocation(); break;
                  case 'trigger_evolution': onAction?.('trigger_mutation'); break;
                  case 'generate_visual': onVoiceVisualize(fc.args.prompt as string, fc.args.type as any); break;
                  case 'security_override': 
                     if (fc.args.action === 'killswitch') onNavigate('killswitch');
                     else onNavigate('threats');
                     break;
                }
                
                sessionPromise.then(s => s.sendToolResponse({
                  functionResponses: { id: fc.id, name: fc.name, response: { result } }
                }));
                setTimeout(() => setExecutingTask(null), 2000);
              }
            }

            // Gestion Audio Sortant (Voix IA)
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outContextRef.current) {
              setIsTalking(true);
              const ctx = outContextRef.current;
              if (ctx.state === 'suspended') await ctx.resume();
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              source.onended = () => setIsTalking(false);
            }

            // Transcriptions
            if (msg.serverContent?.inputTranscription?.text) {
               setTranscriptions(prev => [...prev, { role: 'user', text: msg.serverContent!.inputTranscription!.text }]);
            }
            if (msg.serverContent?.outputTranscription?.text) {
               setTranscriptions(prev => [...prev, { role: 'model', text: msg.serverContent!.outputTranscription!.text }]);
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => { console.error(e); stopSession(); },
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      stopSession();
    }
  };

  useEffect(() => { return () => stopSession(); }, [stopSession]);

  // --- RENDU ADAPTATIF ---

  if (isLabView) {
      // MODE "LABORATOIRE" : Interface Plein Écran
      return (
        <div className="absolute inset-0 z-[100] flex flex-col h-full animate-fadeIn p-4 md:p-8 lg:p-12 bg-[#050505]/95 backdrop-blur-xl">
            <header className="flex justify-between items-center mb-6 shrink-0 z-20">
                <div>
                <h2 className="text-3xl font-bold font-heading italic text-blue-400 flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${isActive ? 'bg-green-500 animate-pulse text-green-500' : 'bg-red-500 text-red-500'}`}></span>
                    LABORATOIRE VOCAL (PERSISTANT)
                </h2>
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">
                    Cerveau Suprême - Interface d'Orchestration
                </p>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 relative z-10">
                {/* Visualiseur Central */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex-1 glass rounded-[2.5rem] bg-black/80 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl group">
                        <div className="absolute inset-0 z-0">
                            {/* Passage de l'état actif de l'analyseur */}
                            <NeuralCoreVisualizer analyser={activeAnalyser} isActive={isActive} isTalking={isTalking} />
                        </div>
                        <button
                            onClick={isActive ? stopSession : startSession}
                            className={`relative z-20 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 border-4 backdrop-blur-md group-hover:scale-105 ${
                                isActive 
                                ? 'bg-red-500/10 border-red-500 shadow-[0_0_60px_rgba(220,38,38,0.5)]' 
                                : 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)]'
                            }`}
                        >
                            <svg className={`w-12 h-12 transition-colors ${isActive ? 'text-red-500' : 'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isActive 
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                }
                            </svg>
                        </button>
                        {executingTask && (
                             <div className="absolute bottom-10 z-30 px-6 py-2 bg-blue-600/80 rounded-full text-white text-xs font-bold uppercase tracking-widest animate-bounce border border-blue-400">
                                 {executingTask}...
                             </div>
                        )}
                    </div>
                </div>

                {/* Logs Transcriptions */}
                <div className="lg:col-span-5 glass rounded-[2.5rem] bg-black/40 border border-white/10 flex flex-col overflow-hidden relative">
                    <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Journal de Commandement</span>
                        <button onClick={() => setTranscriptions([])} className="text-[9px] text-red-400 hover:text-white uppercase font-bold">Effacer</button>
                    </div>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                        {transcriptions.map((t, i) => (
                            <div key={i} className={`flex flex-col gap-2 ${t.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
                                    {t.role === 'user' ? 'ADMIN' : 'GENESIS'}
                                </span>
                                <div className={`p-4 rounded-2xl max-w-[90%] text-xs font-mono leading-relaxed shadow-lg border ${
                                    t.role === 'user' 
                                    ? 'bg-blue-900/20 border-blue-500/30 text-blue-100 rounded-tr-none' 
                                    : 'bg-[#1a1a1a] border-white/10 text-gray-300 rounded-tl-none'
                                }`}>
                                    {t.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      );
  }

  // MODE "ASSISTANT FLOTTANT" (Affichage par défaut)
  return (
    <>
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isActive ? 'scale-100' : 'scale-90 opacity-60 hover:opacity-100'}`}>
        <button 
          onClick={isActive ? stopSession : startSession}
          onMouseEnter={() => sfx.playBlip()}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isActive ? 'bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.6)]' : 'bg-white/10 hover:bg-white/20 border border-white/20'
          }`}
        >
          {isActive ? (
            <div className="relative">
               <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" style={{ transform: `scale(${1 + analyserLevel / 20})` }}></div>
               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>
            </div>
          ) : isConnecting ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>
          )}
          {executingTask && (
            <div className="absolute -top-12 right-0 bg-blue-600 text-white px-3 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest whitespace-nowrap animate-bounce shadow-xl border border-blue-400">
              {executingTask}
            </div>
          )}
        </button>
      </div>
      {isActive && (
        <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[100] overflow-hidden">
          <div 
            className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] transition-all duration-75"
            style={{ width: `${Math.min(analyserLevel * 4, 100)}%` }}
          />
        </div>
      )}
    </>
  );
};

export default memo(NeuralAssistant);
