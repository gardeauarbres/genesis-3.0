(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/genesis/utils/audio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPcmBlob",
    ()=>createPcmBlob,
    "decode",
    ()=>decode,
    "decodeAudioData",
    ()=>decodeAudioData,
    "encode",
    ()=>encode
]);
function decode(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for(let i = 0; i < len; i++){
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
function encode(bytes) {
    let binary = '';
    const len = bytes.byteLength;
    for(let i = 0; i < len; i++){
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
async function decodeAudioData(data, ctx, sampleRate, numChannels) {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for(let channel = 0; channel < numChannels; channel++){
        const channelData = buffer.getChannelData(channel);
        for(let i = 0; i < frameCount; i++){
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}
function createPcmBlob(data) {
    const l = data.length;
    const int16 = new Int16Array(l);
    for(let i = 0; i < l; i++){
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000'
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/genesis/components/MultiAgentFusion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/sfx.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/utils/audio.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const AGENTS = [
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
const MultiAgentFusion = ({ initialParams, onConsumed })=>{
    _s();
    const [activeAgentId, setActiveAgentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mnemosyne');
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadedFile, setUploadedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fusionMode, setFusionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeAgent = AGENTS.find((a)=>a.id === activeAgentId) || AGENTS[0];
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const endOfMsgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll à chaque nouveau message
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MultiAgentFusion.useEffect": ()=>{
            if (endOfMsgRef.current) {
                endOfMsgRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
        }
    }["MultiAgentFusion.useEffect"], [
        messages,
        loading
    ]);
    // Réaction aux commandes externes (Voix)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MultiAgentFusion.useEffect": ()=>{
            if (initialParams) {
                const agentExists = AGENTS.find({
                    "MultiAgentFusion.useEffect.agentExists": (a)=>a.id === initialParams.agentId || a.role === initialParams.agentId
                }["MultiAgentFusion.useEffect.agentExists"]);
                if (agentExists) {
                    setActiveAgentId(agentExists.id);
                }
                if (initialParams.query) {
                    setQuery(initialParams.query);
                    // Déclenchement automatique
                    setTimeout({
                        "MultiAgentFusion.useEffect": ()=>triggerExternalSubmit(initialParams.query, agentExists?.id || activeAgentId)
                    }["MultiAgentFusion.useEffect"], 500);
                }
                onConsumed?.();
            }
        }
    }["MultiAgentFusion.useEffect"], [
        initialParams,
        onConsumed
    ]);
    const speakResponse = async (text)=>{
        setIsSpeaking(true);
        try {
            // On ne lit que les 300 premiers caractères pour ne pas saturer l'audio
            const intro = text.split('\n')[0].substring(0, 300);
            const audioData = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geminiService"].textToSpeech(intro);
            if (audioData) {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
                        sampleRate: 24000
                    });
                }
                const ctx = audioContextRef.current;
                if (ctx.state === 'suspended') await ctx.resume();
                const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAudioData"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"])(audioData), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.onended = ()=>setIsSpeaking(false);
                source.start(0);
            } else {
                setIsSpeaking(false);
            }
        } catch (e) {
            console.warn("TTS Error", e);
            setIsSpeaking(false);
        }
    };
    const triggerExternalSubmit = async (text, agentId)=>{
        // Version simplifiée de handleSubmit pour les appels externes
        setMessages((prev)=>[
                ...prev,
                {
                    role: 'user',
                    text: `[COMMANDE VOCALE] ${text}`
                }
            ]);
        setLoading(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playData();
        try {
            const agent = AGENTS.find((a)=>a.id === agentId) || AGENTS[0];
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: 'agent',
                        text: "Traitement de la requête prioritaire...",
                        agent: agent.role,
                        isThinking: true
                    }
                ]);
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geminiService"].agentQuery(agent.role, agent.systemPrompt, text);
            setMessages((prev)=>{
                const clean = prev.filter((m)=>!m.isThinking);
                return [
                    ...clean,
                    {
                        role: 'agent',
                        text: res.text,
                        agent: agent.role,
                        sources: res.sources
                    }
                ];
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
            await speakResponse(res.text);
        } catch (e) {
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: 'agent',
                        text: "Échec de la commande vocale.",
                        agent: 'SYSTEM'
                    }
                ]);
        } finally{
            setLoading(false);
        }
    };
    const handleFileUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                window.alert("ATTENTION: Fichier trop volumineux (>10MB).");
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev)=>{
                if (ev.target?.result) {
                    const base64 = ev.target.result.split(',')[1];
                    setUploadedFile({
                        name: file.name,
                        type: file.type,
                        base64
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
                    // Force switch to Archivist
                    if (activeAgentId !== 'mnemosyne') setActiveAgentId('mnemosyne');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!query.trim() && !uploadedFile) return;
        const currentQuery = query;
        const currentFile = uploadedFile;
        setQuery('');
        setUploadedFile(null);
        setMessages((prev)=>[
                ...prev,
                {
                    role: 'user',
                    text: currentFile ? `[FICHIER: ${currentFile.name}] ${currentQuery}` : currentQuery
                }
            ]);
        setLoading(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playData();
        try {
            if (fusionMode) {
                // FUSION MODE
                for (const agent of AGENTS){
                    setMessages((prev)=>[
                            ...prev,
                            {
                                role: 'agent',
                                text: "Calcul en cours...",
                                agent: agent.role,
                                isThinking: true
                            }
                        ]);
                    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geminiService"].agentQuery(agent.role, agent.systemPrompt, currentQuery);
                    setMessages((prev)=>{
                        const others = prev.filter((m)=>!(m.agent === agent.role && m.isThinking));
                        return [
                            ...others,
                            {
                                role: 'agent',
                                text: res.text,
                                agent: agent.role,
                                sources: res.sources
                            }
                        ];
                    });
                    await new Promise((r)=>setTimeout(r, 500));
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
            } else if (currentFile) {
                // DOCUMENT ANALYSIS
                setMessages((prev)=>[
                        ...prev,
                        {
                            role: 'agent',
                            text: "Lecture et décryptage du fichier...",
                            agent: 'ARCHIVISTE',
                            isThinking: true
                        }
                    ]);
                const analysis = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geminiService"].analyzeDocument(currentFile.base64, currentFile.type, currentQuery);
                setMessages((prev)=>{
                    const clean = prev.filter((m)=>!m.isThinking);
                    return [
                        ...clean,
                        {
                            role: 'agent',
                            text: analysis,
                            agent: 'ARCHIVISTE'
                        }
                    ];
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
                await speakResponse(analysis);
            } else {
                // SINGLE AGENT
                setMessages((prev)=>[
                        ...prev,
                        {
                            role: 'agent',
                            text: "Connexion...",
                            agent: activeAgent.role,
                            isThinking: true
                        }
                    ]);
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geminiService"].agentQuery(activeAgent.role, activeAgent.systemPrompt, currentQuery);
                setMessages((prev)=>{
                    const clean = prev.filter((m)=>!m.isThinking);
                    return [
                        ...clean,
                        {
                            role: 'agent',
                            text: res.text,
                            agent: activeAgent.role,
                            sources: res.sources
                        }
                    ];
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
                await speakResponse(res.text);
            }
        } catch (err) {
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: 'agent',
                        text: "ERREUR CRITIQUE DE COMMUNICATION NEURALE.",
                        agent: 'KERNEL'
                    }
                ]);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playAlert();
        } finally{
            setLoading(false);
            setFusionMode(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col gap-6 animate-fadeIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-end shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl md:text-4xl font-bold font-heading mb-2 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-8 h-8 rounded-full border-2 border-white/20 ${loading ? 'animate-spin' : ''}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 229,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-500 animate-ping' : 'bg-blue-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 230,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 228,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "NEXUS"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                lineNumber: 227,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]",
                                children: isSpeaking ? 'TRANSMISSION VOCALE...' : 'FUSION COGNITIVE'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                lineNumber: 236,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                        lineNumber: 226,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setFusionMode(!fusionMode),
                            className: `px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-all border ${fusionMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-[0_0_30px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`,
                            children: fusionMode ? 'FUSION ACTIVE' : 'MODE FUSION'
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                            lineNumber: 242,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                        lineNumber: 241,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                lineNumber: 225,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-4 flex flex-col min-h-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-1 rounded-2xl bg-black/40 flex-none flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto custom-scrollbar lg:flex-1 snap-x",
                                children: AGENTS.map((agent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveAgentId(agent.id),
                                        className: `p-4 rounded-xl text-left transition-all border relative overflow-hidden group shrink-0 w-64 lg:w-auto snap-center ${activeAgentId === agent.id ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 relative z-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-10 h-10 rounded-lg flex items-center justify-center bg-black/50 border border-white/10 ${agent.color}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-6 h-6",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 1.5,
                                                                d: agent.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 120
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-bold uppercase tracking-wider text-xs ${activeAgentId === agent.id ? 'text-white' : 'text-gray-500'}`,
                                                                children: agent.role
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                                lineNumber: 267,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-bold text-gray-400",
                                                                children: agent.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 262,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            activeAgentId === agent.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute left-0 top-0 bottom-0 w-1 ${agent.color.replace('text', 'bg')}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 271,
                                                columnNumber: 64
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, agent.id, true, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 257,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                lineNumber: 255,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-black to-gray-900 hidden md:block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: `text-lg font-bold mb-2 ${activeAgent.color}`,
                                        children: activeAgent.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 278,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 leading-relaxed mb-4",
                                        children: activeAgent.description
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 279,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1 w-full bg-gray-800 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-full w-2/3 ${activeAgent.color.replace('text', 'bg')} animate-pulse`
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                            lineNumber: 281,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 280,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                lineNumber: 277,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                        lineNumber: 253,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 glass rounded-[2rem] flex flex-col bg-black/40 border border-white/5 relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6",
                                children: [
                                    messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col items-center justify-center opacity-60 select-none p-8 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-24 h-24 border border-dashed rounded-full flex items-center justify-center animate-spin-slow mb-6 border-blue-500/30",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 border border-dotted rounded-full border-purple-500/50"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 292,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold font-heading text-white mb-2",
                                                children: "NEXUS NEURAL"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 295,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 max-w-md leading-relaxed mb-6",
                                                children: "Système central de fusion multi-agents."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 296,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600",
                                                children: "En attente de données..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 299,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 291,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex flex-col gap-1 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'} animate-slideIn`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[8px] font-bold uppercase tracking-widest text-gray-600 px-2",
                                                    children: msg.agent || 'ADMIN'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `p-5 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' : msg.isThinking ? 'bg-white/5 border border-white/10 text-gray-400 animate-pulse' : 'glass bg-black/60 border border-white/10 text-gray-300 rounded-tl-none'}`,
                                                    children: [
                                                        msg.text,
                                                        msg.sources && msg.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 pt-4 border-t border-white/10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[9px] uppercase font-bold text-gray-500 mb-2",
                                                                    children: "Sources Détectées :"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                                    lineNumber: 317,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-2",
                                                                    children: msg.sources.map((src, idx)=>src.web && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: src.web.uri,
                                                                            target: "_blank",
                                                                            rel: "noreferrer",
                                                                            className: "text-[9px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 text-blue-300 truncate max-w-[200px] border border-white/5 block",
                                                                            children: src.web.title
                                                                        }, idx, false, {
                                                                            fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                                            lineNumber: 321,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                            lineNumber: 303,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: endOfMsgRef,
                                        className: "h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 332,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                lineNumber: 289,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-black/60 border-t border-white/5 backdrop-blur-md",
                                children: [
                                    uploadedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 flex items-center gap-2 bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-500/30 w-fit animate-slideIn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-blue-400",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 126
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 339,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-blue-200 font-mono",
                                                children: uploadedFile.name
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 340,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setUploadedFile(null),
                                                className: "text-blue-400 hover:text-white ml-2",
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 341,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 338,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "flex gap-2 md:gap-3 relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                ref: fileInputRef,
                                                onChange: handleFileUpload,
                                                className: "hidden",
                                                accept: ".pdf,.txt,.md,.json,.js,.ts,.csv,.jpg,.png"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 345,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>fileInputRef.current?.click(),
                                                className: "p-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5 shrink-0",
                                                title: "Charger Document",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 112
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 352,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: query,
                                                onChange: (e)=>setQuery(e.target.value),
                                                placeholder: fusionMode ? "Interroger le Nexus..." : `Instructions pour ${activeAgent.name}...`,
                                                className: "flex-1 bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 font-mono text-sm focus:outline-none focus:bg-black/80 focus:border-blue-500/50 transition-all placeholder:text-gray-600 text-white min-w-0"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 360,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: loading || !query.trim() && !uploadedFile,
                                                className: "px-4 md:px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:shadow-none transition-all shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden md:inline",
                                                        children: "TRANSMETTRE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "md:hidden",
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                                lineNumber: 367,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                        lineNumber: 344,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                                lineNumber: 336,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                        lineNumber: 287,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
                lineNumber: 251,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/MultiAgentFusion.tsx",
        lineNumber: 223,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MultiAgentFusion, "jLNTU9isWiuGiRGK82HgeHlYQ44=");
_c = MultiAgentFusion;
const __TURBOPACK__default__export__ = MultiAgentFusion;
var _c;
__turbopack_context__.k.register(_c, "MultiAgentFusion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_genesis_67752aba._.js.map