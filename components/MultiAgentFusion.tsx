
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { AgentPersona, GroundingChunk } from '../types';
import { sfx } from '../services/sfx';
import { decode, decodeAudioData } from '../utils/audio';

// Interface étendue pour accepter les commandes du Cerveau Suprême
interface MultiAgentFusionProps {
    initialParams?: { agentId: string; query: string } | null;
    onConsumed?: () => void;
}

const AGENTS: AgentPersona[] = [
    {
        id: 'mnemosyne',
        name: 'Mnémosyne',
        role: 'ARCHIVISTE',
        color: 'text-purple-400',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        description: 'Spécialiste de l\'analyse documentaire, extraction de données et mémoire historique.',
        systemPrompt: 'Tu es l\'Archiviste. Ta mission est d\'analyser les documents (PDF, Images, Texte), d\'extraire les données cachées, de résumer et de retrouver les sources. Commence par un résumé vocal bref.'
    },
    {
        id: 'athena',
        name: 'Athena',
        role: 'STRATÈGE',
        color: 'text-blue-400',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        description: 'Planification architecturale et optimisation du code.',
        systemPrompt: 'Tu es la Stratège. Tu optimises l\'architecture et coordonnes les actions globales. Tes réponses sont structurées et orientées solution.'
    },
    {
        id: 'argus',
        name: 'Argus',
        role: 'SENTINELLE',
        color: 'text-red-400',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        description: 'Surveillance des menaces et protocoles de sécurité.',
        systemPrompt: 'Tu es la Sentinelle. Tu surveilles les menaces actives et protèges l\'intégrité du système. Ton ton est autoritaire et protecteur.'
    },
    {
        id: 'atlas',
        name: 'Atlas',
        role: 'CARTOGRAPHE',
        color: 'text-green-400',
        icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        description: 'Géolocalisation et analyse spatiale.',
        systemPrompt: 'Tu es le Cartographe. Tu analyses les données géospatiales et la topologie du réseau. Utilise Google Maps grounding si pertinent.'
    }
];

const MultiAgentFusion: React.FC<MultiAgentFusionProps> = ({ initialParams, onConsumed }) => {
    const [activeAgentId, setActiveAgentId] = useState('mnemosyne');
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string, agent?: string, sources?: GroundingChunk[], isThinking?: boolean}[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<{name: string, type: string, base64: string} | null>(null);
    const [fusionMode, setFusionMode] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const activeAgent = AGENTS.find(a => a.id === activeAgentId) || AGENTS[0];
    const fileInputRef = useRef<HTMLInputElement>(null);
    const endOfMsgRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Auto-scroll à chaque nouveau message
    useEffect(() => {
        if (endOfMsgRef.current) {
            endOfMsgRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages, loading]);

    // Réaction aux commandes externes (Voix)
    useEffect(() => {
        if (initialParams) {
            const agentExists = AGENTS.find(a => a.id === initialParams.agentId || a.role === initialParams.agentId);
            if (agentExists) {
                setActiveAgentId(agentExists.id);
            }
            if (initialParams.query) {
                setQuery(initialParams.query);
                // Déclenchement automatique
                setTimeout(() => triggerExternalSubmit(initialParams.query, agentExists?.id || activeAgentId), 500);
            }
            onConsumed?.();
        }
    }, [initialParams, onConsumed]);

    const speakResponse = async (text: string) => {
        setIsSpeaking(true);
        try {
            // On ne lit que les 300 premiers caractères pour ne pas saturer l'audio
            const intro = text.split('\n')[0].substring(0, 300); 
            const audioData = await geminiService.textToSpeech(intro);
            
            if (audioData) {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                }
                const ctx = audioContextRef.current;
                if (ctx.state === 'suspended') await ctx.resume();
                
                const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.onended = () => setIsSpeaking(false);
                source.start(0);
            } else {
                setIsSpeaking(false);
            }
        } catch (e) {
            console.warn("TTS Error", e);
            setIsSpeaking(false);
        }
    };

    const triggerExternalSubmit = async (text: string, agentId: string) => {
        // Version simplifiée de handleSubmit pour les appels externes
        setMessages(prev => [...prev, { role: 'user', text: `[COMMANDE VOCALE] ${text}` }]);
        setLoading(true);
        sfx.playData();
        
        try {
            const agent = AGENTS.find(a => a.id === agentId) || AGENTS[0];
            setMessages(prev => [...prev, { role: 'agent', text: "Traitement de la requête prioritaire...", agent: agent.role, isThinking: true }]);
            
            const res = await geminiService.agentQuery(agent.role, agent.systemPrompt, text);
            
            setMessages(prev => {
                const clean = prev.filter(m => !m.isThinking);
                return [...clean, { role: 'agent', text: res.text, agent: agent.role, sources: res.sources }];
            });
            sfx.playConfirm();
            await speakResponse(res.text);
        } catch(e) {
             setMessages(prev => [...prev, { role: 'agent', text: "Échec de la commande vocale.", agent: 'SYSTEM' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { 
                window.alert("ATTENTION: Fichier trop volumineux (>10MB).");
                return;
            }

            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    const base64 = (ev.target.result as string).split(',')[1]; 
                    setUploadedFile({ name: file.name, type: file.type, base64 });
                    sfx.playConfirm();
                    // Force switch to Archivist
                    if (activeAgentId !== 'mnemosyne') setActiveAgentId('mnemosyne');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim() && !uploadedFile) return;

        const currentQuery = query;
        const currentFile = uploadedFile;
        
        setQuery('');
        setUploadedFile(null);
        setMessages(prev => [...prev, { role: 'user', text: currentFile ? `[FICHIER: ${currentFile.name}] ${currentQuery}` : currentQuery }]);
        setLoading(true);
        sfx.playData();

        try {
            if (fusionMode) {
                // FUSION MODE
                for (const agent of AGENTS) {
                    setMessages(prev => [...prev, { role: 'agent', text: "Calcul en cours...", agent: agent.role, isThinking: true }]);
                    const res = await geminiService.agentQuery(agent.role, agent.systemPrompt, currentQuery);
                    setMessages(prev => {
                        const others = prev.filter(m => !(m.agent === agent.role && m.isThinking));
                        return [...others, { role: 'agent', text: res.text, agent: agent.role, sources: res.sources }];
                    });
                    await new Promise(r => setTimeout(r, 500)); 
                }
                sfx.playConfirm();
            } else if (currentFile) {
                // DOCUMENT ANALYSIS
                setMessages(prev => [...prev, { role: 'agent', text: "Lecture et décryptage du fichier...", agent: 'ARCHIVISTE', isThinking: true }]);
                const analysis = await geminiService.analyzeDocument(currentFile.base64, currentFile.type, currentQuery);
                setMessages(prev => {
                    const clean = prev.filter(m => !m.isThinking);
                    return [...clean, { role: 'agent', text: analysis, agent: 'ARCHIVISTE' }];
                });
                sfx.playConfirm();
                await speakResponse(analysis);
            } else {
                // SINGLE AGENT
                setMessages(prev => [...prev, { role: 'agent', text: "Connexion...", agent: activeAgent.role, isThinking: true }]);
                const res = await geminiService.agentQuery(activeAgent.role, activeAgent.systemPrompt, currentQuery);
                setMessages(prev => {
                    const clean = prev.filter(m => !m.isThinking);
                    return [...clean, { role: 'agent', text: res.text, agent: activeAgent.role, sources: res.sources }];
                });
                sfx.playConfirm();
                await speakResponse(res.text);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'agent', text: "ERREUR CRITIQUE DE COMMUNICATION NEURALE.", agent: 'KERNEL' }]);
            sfx.playAlert();
        } finally {
            setLoading(false);
            setFusionMode(false);
        }
    };

    return (
        <div className="h-full flex flex-col gap-6 animate-fadeIn">
            {/* HEADER NEXUS */}
            <div className="flex justify-between items-end shrink-0">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold font-heading mb-2 flex items-center gap-3">
                        <div className="relative">
                            <div className={`w-8 h-8 rounded-full border-2 border-white/20 ${loading ? 'animate-spin' : ''}`}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-500 animate-ping' : 'bg-blue-500'}`}></div>
                            </div>
                        </div>
                        NEXUS
                    </h2>
                    <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                        {isSpeaking ? 'TRANSMISSION VOCALE...' : 'FUSION COGNITIVE'}
                    </p>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => setFusionMode(!fusionMode)}
                        className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-all border ${fusionMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-[0_0_30px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                    >
                        {fusionMode ? 'FUSION ACTIVE' : 'MODE FUSION'}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                {/* SELECTEUR D'AGENTS RESPONSIVE */}
                <div className="lg:col-span-1 space-y-4 flex flex-col min-h-0">
                    {/* Sur mobile : défilement horizontal (flex-row), sur desktop : vertical (flex-col) */}
                    <div className="glass p-1 rounded-2xl bg-black/40 flex-none flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto custom-scrollbar lg:flex-1 snap-x">
                        {AGENTS.map(agent => (
                            <button
                                key={agent.id}
                                onClick={() => setActiveAgentId(agent.id)}
                                className={`p-4 rounded-xl text-left transition-all border relative overflow-hidden group shrink-0 w-64 lg:w-auto snap-center ${activeAgentId === agent.id ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-black/50 border border-white/10 ${agent.color}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={agent.icon} /></svg>
                                    </div>
                                    <div>
                                        <p className={`font-bold uppercase tracking-wider text-xs ${activeAgentId === agent.id ? 'text-white' : 'text-gray-500'}`}>{agent.role}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{agent.name}</p>
                                    </div>
                                </div>
                                {activeAgentId === agent.id && <div className={`absolute left-0 top-0 bottom-0 w-1 ${agent.color.replace('text', 'bg')}`}></div>}
                            </button>
                        ))}
                    </div>
                    
                    {/* INFO AGENT ACTIF (Masqué sur petit mobile si pas assez de place ?) */}
                    <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-black to-gray-900 hidden md:block">
                        <h3 className={`text-lg font-bold mb-2 ${activeAgent.color}`}>{activeAgent.name}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">{activeAgent.description}</p>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full w-2/3 ${activeAgent.color.replace('text', 'bg')} animate-pulse`}></div>
                        </div>
                    </div>
                </div>

                {/* ZONE DE CHAT CENTRALE */}
                <div className="lg:col-span-3 glass rounded-[2rem] flex flex-col bg-black/40 border border-white/5 relative overflow-hidden">
                    {/* FLUX DE MESSAGES */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center opacity-60 select-none p-8 text-center">
                                <div className="w-24 h-24 border border-dashed rounded-full flex items-center justify-center animate-spin-slow mb-6 border-blue-500/30">
                                    <div className="w-16 h-16 border border-dotted rounded-full border-purple-500/50"></div>
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white mb-2">NEXUS NEURAL</h3>
                                <p className="text-xs text-gray-400 max-w-md leading-relaxed mb-6">
                                    Système central de fusion multi-agents.
                                </p>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">En attente de données...</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col gap-1 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'} animate-slideIn`}>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600 px-2">
                                    {msg.agent || 'ADMIN'}
                                </span>
                                <div className={`p-5 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                                    msg.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' 
                                    : msg.isThinking 
                                        ? 'bg-white/5 border border-white/10 text-gray-400 animate-pulse'
                                        : 'glass bg-black/60 border border-white/10 text-gray-300 rounded-tl-none'
                                }`}>
                                    {msg.text}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-[9px] uppercase font-bold text-gray-500 mb-2">Sources Détectées :</p>
                                            <div className="flex flex-wrap gap-2">
                                                {msg.sources.map((src, idx) => (
                                                    src.web && (
                                                        <a key={idx} href={src.web.uri} target="_blank" rel="noreferrer" className="text-[9px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 text-blue-300 truncate max-w-[200px] border border-white/5 block">
                                                            {src.web.title}
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={endOfMsgRef} className="h-4" />
                    </div>

                    {/* BARRE DE SAISIE */}
                    <div className="p-4 bg-black/60 border-t border-white/5 backdrop-blur-md">
                        {uploadedFile && (
                            <div className="mb-2 flex items-center gap-2 bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-500/30 w-fit animate-slideIn">
                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <span className="text-xs text-blue-200 font-mono">{uploadedFile.name}</span>
                                <button onClick={() => setUploadedFile(null)} className="text-blue-400 hover:text-white ml-2">×</button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 relative">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileUpload} 
                                className="hidden" 
                                accept=".pdf,.txt,.md,.json,.js,.ts,.csv,.jpg,.png" 
                            />
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5 shrink-0"
                                title="Charger Document"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            </button>
                            <input 
                                type="text" 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={fusionMode ? "Interroger le Nexus..." : `Instructions pour ${activeAgent.name}...`}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 font-mono text-sm focus:outline-none focus:bg-black/80 focus:border-blue-500/50 transition-all placeholder:text-gray-600 text-white min-w-0"
                            />
                            <button 
                                type="submit" 
                                disabled={loading || (!query.trim() && !uploadedFile)}
                                className="px-4 md:px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:shadow-none transition-all shrink-0"
                            >
                                <span className="hidden md:inline">TRANSMETTRE</span>
                                <span className="md:hidden">→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiAgentFusion;
