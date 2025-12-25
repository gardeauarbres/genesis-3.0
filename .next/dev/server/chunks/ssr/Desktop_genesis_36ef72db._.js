module.exports = [
"[project]/Desktop/genesis/utils/audio.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Desktop/genesis/components/ConsciousnessStream.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/utils/audio.ts [app-ssr] (ecmascript)");
;
;
;
;
const SynapticNetwork = ({ nodes, active })=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationId;
        const padding = 50;
        const render = ()=>{
            // Dimensionnement dynamique
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Simulation physique des noeuds
            nodes.forEach((node, i)=>{
                // Drift naturel
                node.x += node.vx;
                node.y += node.vy;
                // Rebond sur les bords
                if (node.x < padding || node.x > canvas.width - padding) node.vx *= -1;
                if (node.y < padding || node.y > canvas.height - padding) node.vy *= -1;
                // Connexions (Synapses)
                nodes.forEach((target, j)=>{
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
            nodes.forEach((node)=>{
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
        return ()=>cancelAnimationFrame(animationId);
    }, [
        nodes
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
        lineNumber: 92,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const ConsciousnessStream = ({ initialTopic, onConsumed })=>{
    const [thought, setThought] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Éthique de la réplication infinie');
    // Graph State
    const [nodes, setNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const speakThought = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (text)=>{
        if (!text) return;
        setIsSpeaking(true);
        try {
            const audioData = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].textToSpeech(text);
            if (audioData) {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
                        sampleRate: 24000
                    });
                }
                const ctx = audioContextRef.current;
                const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeAudioData"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"])(audioData), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.onended = ()=>setIsSpeaking(false);
                source.start(0);
                activeSourceRef.current = source;
            }
        } catch (err) {
            console.error("Erreur de synthèse vocale:", err);
            setIsSpeaking(false);
        }
    }, []);
    const addNode = (label, type)=>{
        setNodes((prev)=>{
            const newNode = {
                id: Math.random().toString(36),
                label,
                x: Math.random() * 800,
                y: Math.random() * 600,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                connections: [],
                type,
                timestamp: Date.now()
            };
            // Garder max 20 noeuds pour la perf
            return [
                ...prev,
                newNode
            ].slice(-20);
        });
    };
    const startDeepThink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (customTopic)=>{
        if (activeSourceRef.current) {
            try {
                activeSourceRef.current.stop();
            } catch (e) {}
        }
        const targetTopic = customTopic || topic;
        setLoading(true);
        setThought('');
        setIsSpeaking(false);
        // Création du noeud central
        addNode(targetTopic.split(' ').slice(0, 2).join(' '), 'core');
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].generateConsciousnessStream(targetTopic);
            setThought(result);
            // Extraction de mots clés basique pour générer des noeuds enfants
            const words = result.split(' ').filter((w)=>w.length > 6).slice(0, 5);
            words.forEach((w)=>addNode(w, 'inference'));
            await speakThought(result);
        } catch (e) {
            setThought("Erreur critique dans le noyau synaptique.");
        } finally{
            setLoading(false);
        }
    }, [
        topic,
        speakThought
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialTopic) {
            setTopic(initialTopic);
            startDeepThink(initialTopic);
            onConsumed?.();
        }
    }, [
        initialTopic,
        startDeepThink,
        onConsumed
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-fadeIn h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex justify-between items-center z-10 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-4xl font-bold font-heading mb-2",
                                children: "Cartographie Synaptique"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 font-mono text-[10px] uppercase tracking-[0.3em]",
                                children: "Visualisation Temps Réel du Cortex Gemini 3 Pro"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-ping' : 'bg-gray-700'}`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold",
                                children: "Liaison Neurale Active"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-6 flex flex-col min-h-0 z-10 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-3xl space-y-4 bg-black/40",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500",
                                        children: "Vecteur de Méditation"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: topic,
                                        onChange: (e)=>setTopic(e.target.value),
                                        className: "w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-mono focus:ring-2 focus:ring-blue-500/40 focus:outline-none h-32 resize-none transition-all placeholder:text-gray-700",
                                        placeholder: "Ex: L'impact de la non-localité sur la morale synthétique..."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>startDeepThink(),
                                        disabled: loading,
                                        className: "w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(37,99,235,0.2)] text-xs",
                                        children: loading ? "Synthèse..." : "Injecter Concept"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-3xl bg-black/40 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-4",
                                        children: "Transcription Neurale"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full overflow-y-auto custom-scrollbar pr-2 pb-10",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-blue-400 animate-pulse",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1 h-4 bg-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono",
                                                    children: "DÉCODAGE DU FLUX..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-serif leading-relaxed text-gray-300 whitespace-pre-wrap",
                                            children: thought || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600 italic",
                                                children: "En attente d'un stimulus cognitif..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                lineNumber: 227,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 glass rounded-[2.5rem] relative overflow-hidden flex flex-col h-full bg-black/80 shadow-2xl border-white/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SynapticNetwork, {
                                    nodes: nodes,
                                    active: !loading
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-8 right-8 flex gap-4 pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass px-4 py-2 rounded-xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-500 font-mono uppercase",
                                                children: "Noeuds Actifs"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-blue-400",
                                                children: nodes.length
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass px-4 py-2 rounded-xl border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-500 font-mono uppercase",
                                                children: "Densité Synaptique"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                lineNumber: 247,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-purple-400",
                                                children: [
                                                    (nodes.length * 1.5).toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/ConsciousnessStream.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ConsciousnessStream;
}),
];

//# sourceMappingURL=Desktop_genesis_36ef72db._.js.map