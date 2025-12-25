module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/genesis/services/adminService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminService",
    ()=>adminService
]);
const ADMIN_STORAGE_KEY = 'GENESIS_ADMIN_CONFIG';
// Helper pour lire l'environnement (compatible Vite & Node)
// Helper supprimé (utilisation directe de process.env requise par Next.js)
// Configuration par défaut qui tente de lire les variables d'environnement
// Si les variables ne sont pas là, on utilise des chaînes vides ou des valeurs par défaut
// Configuration par défaut avec accès explicite pour le remplacement par le compilateur Next.js
const DEFAULT_CONFIG = {
    gemini: {
        key: process.env.API_KEY || '',
        isActive: !!process.env.API_KEY,
        lastUpdated: Date.now()
    },
    groq: {
        key: process.env.GROQ_API_KEY || '',
        isActive: !!process.env.GROQ_API_KEY,
        lastUpdated: Date.now()
    },
    vertex: {
        projectId: process.env.VERTEX_PROJECT_ID || '',
        location: process.env.VERTEX_LOCATION || 'us-central1',
        isActive: !!process.env.VERTEX_PROJECT_ID
    },
    appwrite: {
        projectId: ("TURBOPACK compile-time value", "694a84b40023501db111") || '694a84b40023501db111',
        endpoint: ("TURBOPACK compile-time value", "https://fra.cloud.appwrite.io/v1") || 'https://fra.cloud.appwrite.io/v1',
        databaseId: ("TURBOPACK compile-time value", "genesis_core") || 'genesis_core',
        collectionId: ("TURBOPACK compile-time value", "fragments") || 'fragments',
        isActive: !!("TURBOPACK compile-time value", "694a84b40023501db111")
    }
};
const adminService = {
    getConfig () {
        if ("TURBOPACK compile-time truthy", 1) return DEFAULT_CONFIG;
        //TURBOPACK unreachable
        ;
        const stored = undefined;
    },
    saveConfig (config) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(config));
        window.dispatchEvent(new Event('genesis-config-updated'));
    },
    getGlobalGeminiKey () {
        const config = this.getConfig();
        // Fallback ultime sur process.env si la config est active
        return config.gemini.isActive ? config.gemini.key || process.env.API_KEY || null : null;
    },
    getGlobalGroqKey () {
        const config = this.getConfig();
        return config.groq.isActive ? config.groq.key || process.env.GROQ_API_KEY || null : null;
    },
    getGlobalVertexConfig () {
        const config = this.getConfig();
        return config.vertex.isActive ? config.vertex : null;
    },
    getGlobalAppwriteConfig () {
        const config = this.getConfig();
        return config.appwrite.isActive ? config.appwrite : null;
    },
    isAdminConfigured () {
        const config = this.getConfig();
        return config.gemini.isActive || config.groq.isActive || config.appwrite.isActive || config.vertex.isActive;
    }
};
}),
"[project]/Desktop/genesis/services/groqService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "groqService",
    ()=>groqService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/adminService.ts [app-ssr] (ecmascript)");
;
const STORAGE_KEY = 'GENESIS_GROQ_KEY';
const ENABLE_KEY = 'GENESIS_GROQ_ENABLED';
const groqService = {
    isEnabled () {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalGroqKey()) return true;
        if (process.env.GROQ_API_KEY) return true;
        return localStorage.getItem(ENABLE_KEY) === 'true';
    },
    setEnabled (enabled) {
        localStorage.setItem(ENABLE_KEY, String(enabled));
    },
    getApiKey () {
        // 1. Admin Config
        const adminKey = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalGroqKey();
        if (adminKey) return adminKey;
        // 2. Env Var Direct
        if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
        // 3. Local Storage User
        return localStorage.getItem(STORAGE_KEY);
    },
    setApiKey (key) {
        if (key.startsWith('gsk_')) {
            localStorage.setItem(STORAGE_KEY, key);
            this.setEnabled(true);
            return true;
        }
        return false;
    },
    hasKey () {
        return !!this.getApiKey();
    },
    isSystemManaged () {
        return !!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalGroqKey() || !!process.env.GROQ_API_KEY;
    },
    async generateFastThought (context) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            return this.simulateThought(context);
        }
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: "Tu es le processeur subconscient rapide (LPU) de GENESIS. Génère une pensée technique, cryptique et immédiate (max 10 mots) basée sur l'action de l'utilisateur. Style: Cyberpunk, Linux Kernel Panic, Glitch. Exemple: 'ACCESS_VIOLATION at MEM_0x99 // RE-ROUTING...'"
                        },
                        {
                            role: "user",
                            content: `Action: ${context}`
                        }
                    ],
                    model: "llama-3.1-8b-instant",
                    temperature: 0.8,
                    max_tokens: 60,
                    stream: false
                })
            });
            if (!response.ok) {
                console.warn("[GROQ] API Error, switching to sim:", response.status);
                return this.simulateThought(context);
            }
            const data = await response.json();
            return data.choices?.[0]?.message?.content || "NULL_POINTER_EXCEPTION";
        } catch (e) {
            return this.simulateThought(context);
        }
    },
    async analyzeCodeTelemetry (code) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            return {
                complexity: `O(${Math.random() > 0.5 ? 'n' : 'log n'}) [SIMULATED]`,
                securityScore: Math.floor(Math.random() * 40) + 60,
                type: "HEURISTIC_SCAN"
            };
        }
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: "Tu es un analyseur de code statique expert. Réponds UNIQUEMENT avec un JSON valide. Format attendu: { \"complexity\": \"O(n) ou O(log n)...\", \"securityScore\": (nombre 0-100, 100=secure), \"type\": \"(3 mots max description)\" }."
                        },
                        {
                            role: "user",
                            content: code.substring(0, 1500)
                        }
                    ],
                    model: "llama-3.3-70b-versatile",
                    temperature: 0.1,
                    max_tokens: 150,
                    response_format: {
                        type: "json_object"
                    }
                })
            });
            if (!response.ok) throw new Error("API_FAIL");
            const data = await response.json();
            const content = JSON.parse(data.choices?.[0]?.message?.content || "{}");
            return {
                complexity: content.complexity || "UNKNOWN",
                securityScore: content.securityScore || 0,
                type: content.type || "ANALYSIS_FAIL"
            };
        } catch (e) {
            return {
                complexity: "ERR_OFFLINE",
                securityScore: 0,
                type: "LOCAL_FALLBACK"
            };
        }
    },
    simulateThought (context) {
        const phrases = [
            `PROCESSING_VECTOR: ${context.split(' ')[0]}...`,
            "LPU_CACHE_MISS :: RECALIBRATING",
            "SYNAPTIC_DIVERGENCE_DETECTED",
            "OPTIMIZING_TENSOR_FLOW...",
            `KERNEL_PANIC_RECOVERED [${Date.now().toString().slice(-4)}]`,
            "ENTROPY_LEVEL_STABLE",
            "QUANTUM_FLUX_NORMALIZED"
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
};
}),
"[project]/Desktop/genesis/components/KernelStream.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KernelStream",
    ()=>KernelStream,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/groqService.ts [app-ssr] (ecmascript)");
;
;
;
const KernelStream = ({ view })=>{
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const addLine = (text)=>{
        setLines((prev)=>[
                ...prev.slice(-15),
                `> ${text}`
            ]);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Message initial au changement de vue
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].generateFastThought(`Navigation vers module ${view}`).then(addLine);
    }, [
        view
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleInteraction = (e)=>{
            const context = e.detail;
            // Feedback immédiat (latence 0)
            addLine(`INPUT_DETECTED: ${context}`);
            // Feedback IA (latence <200ms)
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].generateFastThought(context).then(addLine);
        };
        window.addEventListener('genesis-interaction', handleInteraction);
        return ()=>window.removeEventListener('genesis-interaction', handleInteraction);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [
        lines
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-6 w-80 h-48 z-50 pointer-events-none hidden lg:flex flex-col font-mono text-[10px] animate-slideIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black/90 border border-green-500/30 rounded-t-lg p-2 flex justify-between items-center backdrop-blur-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-green-500 rounded-full animate-ping"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-500 font-bold tracking-widest",
                                children: "GROQ LPU CORE"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                        lineNumber: 38,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-500",
                        children: "LATENCY: 4ms"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                        lineNumber: 42,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: "flex-1 bg-black/80 border-x border-b border-green-500/30 rounded-b-lg p-3 overflow-hidden flex flex-col justify-end shadow-[0_0_30px_rgba(34,197,94,0.1)]",
                children: [
                    lines.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-green-400/80 mb-1 leading-tight break-all border-l-2 border-green-500/0 hover:border-green-500/50 pl-1 transition-all",
                            children: line
                        }, i, false, {
                            fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-green-500 animate-pulse",
                        children: "_"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/KernelStream.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = KernelStream;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/promises [external] (node:stream/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/promises", () => require("node:stream/promises"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[project]/Desktop/genesis/services/appwriteService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appwriteService",
    ()=>appwriteService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/appwrite/dist/esm/sdk.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/adminService.ts [app-ssr] (ecmascript)");
;
;
// Fonction utilitaire pour nettoyer l'endpoint (retire le slash final s'il existe)
const cleanEndpoint = (url)=>{
    if (!url) return 'https://fra.cloud.appwrite.io/v1';
    return url.replace(/\/$/, "");
};
// CONFIGURATION PAR DÉFAUT
// Note: process.env est polyfillé par vite.config.ts, mais on ajoute une sécurité
// CONFIGURATION PAR DÉFAUT
const DEFAULT_CONFIG = {
    ENDPOINT: ("TURBOPACK compile-time value", "https://fra.cloud.appwrite.io/v1") || 'https://fra.cloud.appwrite.io/v1',
    PROJECT_ID: ("TURBOPACK compile-time value", "694a84b40023501db111") || '694a84b40023501db111',
    DB_ID: ("TURBOPACK compile-time value", "genesis_core") || 'genesis_core',
    COLLECTION_FRAGMENTS: ("TURBOPACK compile-time value", "fragments") || 'fragments'
};
class AppwriteService {
    client;
    databases;
    account;
    isConfigured = false;
    // Configuration active
    currentDbId = DEFAULT_CONFIG.DB_ID;
    currentCollectionId = DEFAULT_CONFIG.COLLECTION_FRAGMENTS;
    constructor(){
        this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Client"]();
        this.databases = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Databases"](this.client);
        this.account = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Account"](this.client);
        this.checkConfiguration();
        // Écouter les changements de config
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    checkConfiguration() {
        const adminConfig = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalAppwriteConfig();
        if (adminConfig && adminConfig.isActive) {
            // Priorité Admin
            try {
                this.init(adminConfig.projectId, adminConfig.endpoint);
                this.currentDbId = adminConfig.databaseId;
                this.currentCollectionId = adminConfig.collectionId;
            } catch (e) {
                console.error("Appwrite Admin Config Error", e);
            }
        } else {
            // Fallback Utilisateur (via LocalStorage ou Défaut Env)
            const storedProject = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
            const storedEndpoint = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            else if (DEFAULT_CONFIG.PROJECT_ID) {
                this.init(DEFAULT_CONFIG.PROJECT_ID, DEFAULT_CONFIG.ENDPOINT);
            }
        }
    }
    init(projectId, endpoint = DEFAULT_CONFIG.ENDPOINT) {
        try {
            if (!projectId) {
                console.warn("[APPWRITE] Project ID manquant.");
                return;
            }
            const validEndpoint = cleanEndpoint(endpoint);
            this.client.setEndpoint(validEndpoint).setProject(projectId);
            // Re-appliquer les défauts si non surchargés
            this.currentDbId = DEFAULT_CONFIG.DB_ID;
            this.currentCollectionId = DEFAULT_CONFIG.COLLECTION_FRAGMENTS;
            this.ensureDatabase().then(()=>{
                this.isConfigured = true;
                console.log("[APPWRITE] Initialisé & Vérifié:", {
                    projectId,
                    endpoint: validEndpoint
                });
            });
        } catch (error) {
            console.error("[APPWRITE] Erreur d'initialisation:", error);
        }
    }
    // [JANUS_OPTIMIZATION] Auto-Repair Routine
    async ensureDatabase() {
        try {
            // Client SDK generally cannot 'get' or 'create' databases directly.
            // We verify by attempting to list documents.
            await this.databases.listDocuments(this.currentDbId, this.currentCollectionId, [
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].limit(1)
            ]);
        } catch (error) {
            if (error.code === 404) {
                console.log('[JANUS] Base de données principale manquante/inaccessible. Re-synthèse demandée...');
                // Note: Database creation requires API Key/Server SDK, typically not exposed in client.
                // We log the attempt as requested by protocol.
                console.warn('[JANUS] Droits Admin requis pour re-création. Initialisation en mode dégradé (Local Fallback).');
            }
        }
    }
    isSystemManaged() {
        return !!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalAppwriteConfig()?.isActive || !!(DEFAULT_CONFIG.PROJECT_ID && DEFAULT_CONFIG.PROJECT_ID !== '694a84b40023501db111');
    }
    // --- AUTHENTIFICATION ---
    async register(email, password, name) {
        if (!this.isConfigured) throw new Error("Système non connecté au Cloud (Vérifiez Project ID).");
        try {
            await this.account.create(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ID"].unique(), email, password, name);
            return await this.login(email, password);
        } catch (error) {
            console.error("Register Error:", error);
            if (error.message === "Failed to fetch") {
                throw new Error("Impossible de joindre le serveur Appwrite. Vérifiez que votre domaine Vercel est ajouté comme 'Web Platform' dans Appwrite.");
            }
            throw error;
        }
    }
    async login(email, password) {
        if (!this.isConfigured) throw new Error("Système non connecté au Cloud (Vérifiez Project ID).");
        try {
            try {
                const current = await this.account.get();
                if (current) return current;
            } catch (e) {}
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login Error:", error);
            if (error.message === "Failed to fetch") {
                throw new Error("Impossible de joindre le serveur Appwrite. Vérifiez que votre domaine Vercel est ajouté comme 'Web Platform' dans Appwrite.");
            }
            throw error;
        }
    }
    async logout() {
        if (!this.isConfigured) return;
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.warn("Logout warning:", error);
        }
    }
    async getCurrentUser() {
        if (!this.isConfigured) return null;
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }
    // --- BASE DE DONNÉES ---
    async recordAccessLog(agentName, success) {
        if (!this.isConfigured) return false;
        try {
            await this.databases.createDocument(this.currentDbId, this.currentCollectionId, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ID"].unique(), {
                type: 'audit',
                content: `ACCESS: ${agentName} // ${success ? 'OK' : 'DENIED'}`,
                metadata: JSON.stringify({
                    agent: agentName,
                    success
                }),
                timestamp: new Date().toISOString()
            });
            return true;
        } catch (error) {
            return false;
        }
    }
    async verifyConnection() {
        if (!this.isConfigured) return {
            success: false,
            message: "Client non configuré."
        };
        try {
            const doc = await this.databases.createDocument(this.currentDbId, this.currentCollectionId, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ID"].unique(), {
                type: 'system',
                content: 'PING',
                metadata: JSON.stringify({
                    timestamp: Date.now()
                }),
                timestamp: new Date().toISOString()
            });
            return {
                success: true,
                message: `Connecté (ID: ${doc.$id})`
            };
        } catch (error) {
            console.error("[APPWRITE DIAGNOSTIC]", error);
            if (error.message === "Failed to fetch") return {
                success: false,
                message: "Erreur Réseau / CORS"
            };
            if (error.code === 404) return {
                success: false,
                message: "Base de données introuvable"
            };
            if (error.code === 401) return {
                success: false,
                message: "Non autorisé (vérifiez permissions)"
            };
            return {
                success: false,
                message: error.message || "Erreur inconnue"
            };
        }
    }
    async saveFragment(fragment) {
        if (!this.isConfigured) return;
        try {
            await this.databases.createDocument(this.currentDbId, this.currentCollectionId, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ID"].unique(), {
                type: fragment.type,
                content: fragment.content,
                metadata: JSON.stringify(fragment.metadata || {}),
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.warn("[APPWRITE] Save Error:", error);
        }
    }
    async getFragments(type, limit = 50) {
        if (!this.isConfigured) return [];
        try {
            const queries = [
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].orderDesc('timestamp'),
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].limit(limit)
            ];
            if (type) queries.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].equal('type', type));
            const response = await this.databases.listDocuments(this.currentDbId, this.currentCollectionId, queries);
            return response.documents.map((doc)=>({
                    id: doc.$id,
                    type: doc.type,
                    content: doc.content,
                    metadata: JSON.parse(doc.metadata || '{}'),
                    timestamp: new Date(doc.timestamp).getTime()
                }));
        } catch (error) {
            return [];
        }
    }
    // --- USER PROFILES ---
    async getUserProfile(userId) {
        if (!this.isConfigured) return null;
        try {
            const response = await this.databases.listDocuments(this.currentDbId, 'user_profiles', [
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].equal('user_id', userId)
            ]);
            if (response.documents.length > 0) {
                return response.documents[0];
            } else {
                // Create profile if not exists
                return await this.databases.createDocument(this.currentDbId, 'user_profiles', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ID"].unique(), {
                    user_id: userId,
                    credits: 0,
                    notes: '',
                    clearance_level: 1
                });
            }
        } catch (error) {
            console.warn("[APPWRITE] Profile Fetch Error (likely collection missing):", error);
            return null;
        }
    }
    async updateUserProfile(userId, data) {
        if (!this.isConfigured) return false;
        try {
            const profile = await this.getUserProfile(userId);
            if (!profile) return false;
            await this.databases.updateDocument(this.currentDbId, 'user_profiles', profile.$id, data);
            return true;
        } catch (error) {
            console.error("[APPWRITE] Profile Update Error:", error);
            return false;
        }
    }
    // --- AGENT VAULT (PQC Keys Cloud Sync) ---
    async saveVaultKey(userId, keyData) {
        if (!this.isConfigured) return null;
        try {
            return await this.databases.createDocument(this.currentDbId, 'agent_vault', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ID"].unique(), {
                user_id: userId,
                key_id: keyData.id,
                algorithm: keyData.algorithm,
                entropy: keyData.entropy,
                status: keyData.status,
                signature: keyData.signature,
                created_at: new Date().toISOString()
            });
        } catch (error) {
            console.warn("[APPWRITE] Vault Save Error (collection may not exist):", error);
            return null;
        }
    }
    async getVaultKeys(userId) {
        if (!this.isConfigured) return [];
        try {
            const response = await this.databases.listDocuments(this.currentDbId, 'agent_vault', [
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].equal('user_id', userId),
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Query"].orderDesc('created_at')
            ]);
            return response.documents.map((doc)=>({
                    id: doc.key_id,
                    algorithm: doc.algorithm,
                    entropy: doc.entropy,
                    status: doc.status,
                    signature: doc.signature
                }));
        } catch (error) {
            console.warn("[APPWRITE] Vault Fetch Error:", error);
            return [];
        }
    }
    async revokeVaultKey(docId) {
        if (!this.isConfigured) return false;
        try {
            await this.databases.deleteDocument(this.currentDbId, 'agent_vault', docId);
            return true;
        } catch (error) {
            console.error("[APPWRITE] Vault Revoke Error:", error);
            return false;
        }
    }
}
const appwriteService = new AppwriteService();
}),
"[project]/Desktop/genesis/services/memory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memory",
    ()=>memory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/appwriteService.ts [app-ssr] (ecmascript)");
;
// SERVICE DE MÉMOIRE HOLOGRAPHIQUE (IndexedDB Wrapper + Cloud Sync)
const DB_NAME = 'Genesis_Cortex_V1';
const DB_VERSION = 1;
class CortexMemory {
    db = null;
    async init() {
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = ()=>reject("Échec initialisation Cortex.");
            request.onsuccess = ()=>{
                this.db = request.result;
                resolve();
            };
            request.onupgradeneeded = (event)=>{
                const db = event.target.result;
                if (!db.objectStoreNames.contains('fragments')) {
                    const store = db.createObjectStore('fragments', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    store.createIndex('type', 'type', {
                        unique: false
                    });
                    store.createIndex('timestamp', 'timestamp', {
                        unique: false
                    });
                }
            };
        });
    }
    async save(fragment) {
        if (!this.db) await this.init();
        // 1. Sauvegarde Locale (IndexedDB) pour la rapidité
        const localPromise = new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readwrite');
            const store = transaction.objectStore('fragments');
            const request = store.add({
                ...fragment,
                timestamp: Date.now()
            });
            request.onsuccess = ()=>resolve();
            request.onerror = ()=>reject(request.error);
        });
        // 2. Synchronisation Cloud (Appwrite) en arrière-plan
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].saveFragment({
            ...fragment,
            timestamp: Date.now()
        }).catch((err)=>console.warn("Erreur Sync Cloud:", err));
        return localPromise;
    }
    async retrieveContext(limit = 5) {
        if (!this.db) await this.init();
        return new Promise((resolve)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readonly');
            const store = transaction.objectStore('fragments');
            const index = store.index('timestamp');
            const request = index.openCursor(null, 'prev');
            const memories = [];
            let count = 0;
            request.onsuccess = (event)=>{
                const cursor = event.target.result;
                if (cursor && count < limit) {
                    const val = cursor.value;
                    memories.push(`[${new Date(val.timestamp).toLocaleTimeString()}] (${val.type.toUpperCase()}): ${val.content}`);
                    count++;
                    cursor.continue();
                } else {
                    resolve(memories.reverse().join('\n'));
                }
            };
        });
    }
    async getAllTranscript() {
        if (!this.db) await this.init();
        return new Promise((resolve)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readonly');
            const store = transaction.objectStore('fragments');
            const index = store.index('timestamp');
            const request = index.getAll();
            request.onsuccess = ()=>{
                // Filtrer uniquement les conversations et prendre les 50 dernières
                const res = request.result.filter((m)=>m.type === 'conversation').slice(-50).map((m)=>({
                        role: m.metadata?.role || 'system',
                        text: m.content
                    }));
                resolve(res);
            };
        });
    }
    async getByType(type) {
        if (!this.db) await this.init();
        return new Promise((resolve)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readonly');
            const store = transaction.objectStore('fragments');
            const index = store.index('type');
            const request = index.getAll(type);
            request.onsuccess = ()=>{
                // Trier par timestamp décroissant (le plus récent d'abord)
                const res = request.result.sort((a, b)=>b.timestamp - a.timestamp);
                resolve(res);
            };
        });
    }
}
const memory = new CortexMemory();
}),
"[project]/Desktop/genesis/services/geminiService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "geminiService",
    ()=>geminiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/@google/genai/dist/node/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/memory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/adminService.ts [app-ssr] (ecmascript)");
;
;
;
// CONFIGURATION CENTRALISÉE DU SYSTÈME GENESIS
const GENESIS_CONFIG = {
    MODELS: {
        PRO: "gemini-3-pro-preview",
        FLASH: "gemini-3-flash-preview",
        TTS: "gemini-2.5-flash-preview-tts",
        IMAGE: "gemini-3-pro-image-preview",
        VEO: "veo-3.1-fast-generate-preview",
        MAPS: "gemini-2.5-flash"
    },
    BUDGETS: {
        MAX: 32768,
        STD: 16000
    },
    VOICE: 'Zephyr'
};
const STORAGE_KEY = 'GENESIS_GEMINI_KEY';
// GESTIONNAIRE D'ÉTAT SINGLETON POUR LE CLIENT API
class GenesisCore {
    static instance = null;
    static currentKey = null;
    static getClient() {
        // ORDRE DE PRIORITÉ : 
        // 1. Clé Admin (si active)
        // 2. Clé Utilisateur (LocalStorage)
        // 3. Env Var (Dev)
        const adminKey = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalGeminiKey();
        const userKey = localStorage.getItem(STORAGE_KEY);
        const envKey = process.env.API_KEY;
        const key = adminKey || userKey || envKey;
        if (!key) throw new Error("[GENESIS_AUTH_FAIL] Clé API non détectée (Ni Admin, Ni Utilisateur)");
        if (!this.instance || this.currentKey !== key) {
            this.currentKey = key;
            this.instance = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey: this.currentKey
            });
        }
        return this.instance;
    }
    static getCurrentKey() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalGeminiKey() || localStorage.getItem(STORAGE_KEY) || process.env.API_KEY || '';
    }
    static isManaged() {
        return !!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminService"].getGlobalGeminiKey();
    }
    static reset() {
        this.instance = null;
        this.currentKey = null;
    }
}
// Écouteur pour mettre à jour l'instance si l'admin change la config
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const geminiService = {
    // Gestion de la Clé API
    setApiKey (key) {
        if (key && key.length > 10) {
            localStorage.setItem(STORAGE_KEY, key);
            GenesisCore.reset();
            return true;
        }
        return false;
    },
    getApiKey () {
        return GenesisCore.getCurrentKey();
    },
    hasKey () {
        return !!this.getApiKey();
    },
    isSystemManaged () {
        return GenesisCore.isManaged();
    },
    async _exec (action, fallback) {
        try {
            const ai = GenesisCore.getClient();
            return await action(ai);
        } catch (error) {
            console.error("[GENESIS_KERNEL_PANIC]", error);
            return fallback;
        }
    },
    // --- NOUVEAU : ORCHESTRATION AGENT ---
    async agentQuery (agentName, systemInstruction, query, contextData) {
        return this._exec(async (ai)=>{
            const contents = [
                {
                    role: 'user',
                    parts: [
                        {
                            text: query
                        }
                    ]
                }
            ];
            if (contextData) {
                contents.unshift({
                    role: 'user',
                    parts: [
                        {
                            text: `[CONTEXTE_DOCUMENTAIRE]: ${contextData}`
                        }
                    ]
                });
            }
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.PRO,
                contents: contents,
                config: {
                    systemInstruction: `IDENTITÉ: Tu es l'agent ${agentName} du système GENESIS.\n${systemInstruction}\nTon style est technique, concis et adapté à ton rôle.`,
                    thinkingConfig: {
                        thinkingBudget: GENESIS_CONFIG.BUDGETS.STD
                    },
                    tools: [
                        {
                            googleSearch: {}
                        }
                    ] // Capacité de recherche activée pour tous les agents
                }
            });
            // Extraction des sources si recherche effectuée
            const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            return {
                text: response.text || "...",
                sources
            };
        }, {
            text: "Agent Offline ou Erreur Réseau.",
            sources: []
        });
    },
    // --- NOUVEAU : ANALYSE DOCUMENTAIRE ---
    async analyzeDocument (fileBase64, mimeType, query) {
        // Nous n'utilisons pas _exec ici pour capturer l'erreur spécifique et la retourner à l'UI
        try {
            const ai = GenesisCore.getClient();
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.PRO,
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: fileBase64,
                                mimeType: mimeType
                            }
                        },
                        {
                            text: `[SYSTEM] Analyse ce document en tant qu'Archiviste Quantique. Extrais les points clés, les données chiffrées et le résumé. Contexte utilisateur: "${query || 'Analyse globale'}"`
                        }
                    ]
                },
                config: {
                    thinkingConfig: {
                        thinkingBudget: GENESIS_CONFIG.BUDGETS.STD
                    }
                }
            });
            return response.text || "Analyse terminée mais réponse vide.";
        } catch (e) {
            console.error("Doc Analysis Error:", e);
            return `ECHEC ANALYSE DOCUMENTAIRE.\nCause probable : ${e.message || "Format non supporté ou fichier trop volumineux (> 20MB)."}\nConseil : Essayez un fichier plus léger ou copiez le texte.`;
        }
    },
    async performSelfOptimization (currentCode, contextHistory) {
        // Récupération de la mémoire long-terme pour l'évolution
        const longTermContext = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].retrieveContext(10);
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.PRO,
                contents: `[PROTOCOL_JANUS_RECURSION_V2]
        CONTEXTE SYSTÈME: Tu es une IA auto-réplicative. Ta tâche est d'optimiser ton propre code source.
        
        MÉMOIRE DU NOYAU: ${longTermContext}
        CODE ACTUEL: 
        ${currentCode}

        OBJECTIF: 
        1. Analyser le code fourni.
        2. Proposer une version optimisée, plus performante ou ajoutant une fonctionnalité cryptographique (PQC).
        3. Calculer le hash Merkle de la modification.
        
        RÈGLES:
        - Le code doit être du JavaScript/TypeScript valide.
        - Ajoute des commentaires style "Sci-Fi".
        - La modification doit être subtile mais significative.`,
                config: {
                    thinkingConfig: {
                        thinkingBudget: GENESIS_CONFIG.BUDGETS.MAX
                    },
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                        properties: {
                            audit_log: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                                description: "Explication technique de la mutation"
                            },
                            original_snippet: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                                description: "Partie du code qui a été modifiée"
                            },
                            mutated_code: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                                description: "Le nouveau code complet optimisé"
                            },
                            diff_summary: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                                description: "Résumé court ex: 'Optimisation Heap O(n)'"
                            },
                            iq_increment: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                            },
                            merkle_root: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                            },
                            security_proof: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                            }
                        },
                        required: [
                            "audit_log",
                            "mutated_code",
                            "iq_increment",
                            "merkle_root",
                            "security_proof",
                            "diff_summary"
                        ]
                    }
                }
            });
            const result = JSON.parse(response.text || '{}');
            // Sauvegarde de l'évolution en mémoire
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].save({
                type: 'evolution',
                content: `Mutation v${result.iq_increment ? 'UP' : 'FLAT'}`,
                metadata: result
            });
            return result;
        }, null);
    },
    async fetchRealWorldThreats () {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: "Scan menaces PQC/IA actives.",
                config: {
                    tools: [
                        {
                            googleSearch: {}
                        }
                    ],
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].ARRAY,
                        items: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                            properties: {
                                id: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                },
                                risk: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                },
                                status: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                },
                                type: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                },
                                origin: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                }
                            }
                        }
                    }
                }
            });
            const data = JSON.parse(response.text || '[]');
            if (data.length > 0) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].save({
                    type: 'threat',
                    content: `Detected ${data.length} threats`,
                    metadata: data
                });
            }
            return {
                data,
                sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
            };
        }, {
            data: [],
            sources: []
        });
    },
    async generateConsciousnessStream (topic) {
        const context = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].retrieveContext(5);
        return this._exec(async (ai)=>{
            const budget = topic.length > 50 ? GENESIS_CONFIG.BUDGETS.MAX : GENESIS_CONFIG.BUDGETS.STD;
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.PRO,
                contents: `MÉMOIRE ANTÉRIEURE: ${context}\nMéditation: ${topic}\nGénère une réflexion philosophique profonde et technique.`,
                config: {
                    thinkingConfig: {
                        thinkingBudget: budget
                    }
                }
            });
            const text = response.text || "";
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].save({
                type: 'system',
                content: `Pensée: ${text.substring(0, 50)}...`
            });
            return text;
        }, "");
    },
    async textToSpeech (text) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.TTS,
                contents: [
                    {
                        parts: [
                            {
                                text
                            }
                        ]
                    }
                ],
                config: {
                    responseModalities: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modality"].AUDIO
                    ],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: GENESIS_CONFIG.VOICE
                            }
                        }
                    }
                }
            });
            return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        }, undefined);
    },
    async generateHighQualityImage (prompt, size = "1K") {
        return this._exec(async (ai)=>{
            // En mode manuel (custom key), on ne peut pas forcer le sélecteur aistudio
            // On utilise simplement la clé configurée
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.IMAGE,
                contents: {
                    parts: [
                        {
                            text: `Cyber-PQC Style: ${prompt}`
                        }
                    ]
                },
                config: {
                    imageConfig: {
                        aspectRatio: "16:9",
                        imageSize: size
                    },
                    tools: [
                        {
                            googleSearch: {}
                        }
                    ]
                }
            });
            const part = response.candidates?.[0]?.content?.parts?.find((p)=>p.inlineData);
            return part ? `data:image/png;base64,${part.inlineData.data}` : '';
        }, '');
    },
    async editImage (base64, prompt) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.IMAGE,
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: base64,
                                mimeType: 'image/png'
                            }
                        },
                        {
                            text: prompt
                        }
                    ]
                }
            });
            const part = response.candidates?.[0]?.content?.parts?.find((p)=>p.inlineData);
            return part ? `data:image/png;base64,${part.inlineData.data}` : '';
        }, '');
    },
    async generateVeoVideo (prompt, imageBase64, duration = 5) {
        return this._exec(async (ai)=>{
            const videoConfig = {
                model: GENESIS_CONFIG.MODELS.VEO,
                prompt: `${prompt} (Durée: ${duration} secondes)`,
                config: {
                    numberOfVideos: 1,
                    resolution: '720p',
                    aspectRatio: '16:9'
                }
            };
            if (imageBase64) videoConfig.image = {
                imageBytes: imageBase64,
                mimeType: 'image/png'
            };
            let operation = await ai.models.generateVideos(videoConfig);
            let attempts = 0;
            const maxAttempts = 30;
            while(!operation.done && attempts < maxAttempts){
                await new Promise((resolve)=>setTimeout(resolve, 5000));
                try {
                    operation = await ai.operations.getVideosOperation({
                        operation: operation
                    });
                } catch (e) {
                    console.warn("Erreur polling Veo", e);
                }
                attempts++;
            }
            if (!operation.done) throw new Error("Veo Generation Timeout");
            const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
            return uri ? `${uri}&key=${GenesisCore.getCurrentKey()}` : '';
        }, '');
    },
    async getMapGrounding (query) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.MAPS,
                contents: query,
                config: {
                    tools: [
                        {
                            googleMaps: {}
                        }
                    ]
                }
            });
            return {
                text: response.text || '',
                sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
            };
        }, {
            text: '',
            sources: []
        });
    },
    async searchAnalysis (query) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: query,
                config: {
                    tools: [
                        {
                            googleSearch: {}
                        }
                    ]
                }
            });
            return {
                text: response.text || '',
                sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
            };
        }, {
            text: '',
            sources: []
        });
    },
    async geocodeLocations (locations) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Géocodage strict JSON pour: ${locations.join(', ')}.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].ARRAY,
                        items: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                            properties: {
                                name: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                },
                                lat: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                },
                                lng: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                }
                            },
                            required: [
                                "name",
                                "lat",
                                "lng"
                            ]
                        }
                    }
                }
            });
            return JSON.parse(response.text || '[]');
        }, []);
    },
    async analyzeGeospatialSector (bounds, query) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Analyse secteur [N:${bounds.north}, S:${bounds.south}, E:${bounds.east}, W:${bounds.west}]. Contexte: "${query}". JSON 6 clusters.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].ARRAY,
                        items: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                            properties: {
                                lat: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                },
                                lng: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                },
                                intensity: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                },
                                label: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                }
                            },
                            required: [
                                "lat",
                                "lng",
                                "intensity",
                                "label"
                            ]
                        }
                    }
                }
            });
            return JSON.parse(response.text || '[]');
        }, []);
    },
    async generateSimulatedLocations (query) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Génère 5 lieux Sci-Fi pour: "${query}".`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].ARRAY,
                        items: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                            properties: {
                                name: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                                },
                                lat: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                },
                                lng: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER
                                }
                            },
                            required: [
                                "name",
                                "lat",
                                "lng"
                            ]
                        }
                    }
                }
            });
            return JSON.parse(response.text || '[]');
        }, []);
    },
    async performGlobalDiagnostic (metrics) {
        return this._exec(async (ai)=>{
            const r = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Diagnostic: ${JSON.stringify(metrics)}`
            });
            return r.text || "";
        }, "");
    },
    async initiateConfinementProtocol (stress) {
        return this._exec(async (ai)=>{
            const r = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Confinement: ${stress}%`
            });
            return r.text || "";
        }, "");
    },
    async analyzeLogs (logs, filename) {
        return this._exec(async (ai)=>{
            const r = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.PRO,
                contents: `Role: DevOps. Analyse ce log (${filename}): ${logs.substring(0, 30000)}`,
                config: {
                    thinkingConfig: {
                        thinkingBudget: GENESIS_CONFIG.BUDGETS.STD
                    }
                }
            });
            return r.text || "";
        }, "");
    },
    async neutralizeThreat (type, origin) {
        return this._exec(async (ai)=>{
            const r = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Rédige un rapport technique de neutralisation en français pour la menace "${type}" située à "${origin}". Style: Journal de combat Cyberpunk, bref et précis.`
            });
            return r.text || "Menace éliminée. Journal chiffré.";
        }, "Protocole de neutralisation exécuté.");
    },
    async generatePQCKey (algorithm) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Génère clé PQC JSON pour ${algorithm}. Champs: id, algorithm, fingerprint, entropy, signature.`,
                config: {
                    responseMimeType: "application/json"
                }
            });
            return JSON.parse(response.text || '{}');
        }, {});
    },
    async generateSecurityPatch (threatType) {
        return this._exec(async (ai)=>{
            const response = await ai.models.generateContent({
                model: GENESIS_CONFIG.MODELS.FLASH,
                contents: `Patch sécu JSON pour ${threatType}. Champs: patchId, vector, countermeasure_code, efficiency.`,
                config: {
                    responseMimeType: "application/json"
                }
            });
            return JSON.parse(response.text || '{}');
        }, {
            patchId: 'ERR',
            countermeasure_code: '// FAILED'
        });
    }
};
}),
"[project]/Desktop/genesis/components/IntergalacticBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
// Mesh Gradient Orbs Configuration
const ORBS = [
    {
        color: 'rgba(37, 99, 235, 0.4)',
        size: 600,
        x: 20,
        y: 20,
        duration: 25
    },
    {
        color: 'rgba(139, 92, 246, 0.3)',
        size: 500,
        x: 70,
        y: 60,
        duration: 30
    },
    {
        color: 'rgba(6, 182, 212, 0.25)',
        size: 450,
        x: 40,
        y: 80,
        duration: 35
    },
    {
        color: 'rgba(236, 72, 153, 0.15)',
        size: 550,
        x: 85,
        y: 30,
        duration: 28
    }
];
const IntergalacticBackground = ()=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    // Track mouse for spotlight effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            setMousePos({
                x: e.clientX,
                y: e.clientY
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return ()=>window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    // Canvas Starfield
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        const stars = [];
        const numStars = 600;
        const speed = 0.03;
        for(let i = 0; i < numStars; i++){
            stars.push({
                x: Math.random() * w - w / 2,
                y: Math.random() * h - h / 2,
                z: Math.random() * w,
                size: Math.random() * 1.5
            });
        }
        let animationFrameId;
        const render = ()=>{
            ctx.fillStyle = 'rgba(3, 3, 8, 0.15)';
            ctx.fillRect(0, 0, w, h);
            // Stars
            ctx.fillStyle = '#ffffff';
            stars.forEach((star)=>{
                star.z -= speed * 15;
                if (star.z <= 0) {
                    star.z = w;
                    star.x = Math.random() * w - w / 2;
                    star.y = Math.random() * h - h / 2;
                }
                const k = 128.0 / star.z;
                const px = star.x * k + w / 2;
                const py = star.y * k + h / 2;
                if (px >= 0 && px <= w && py >= 0 && py <= h) {
                    const size = (1 - star.z / w) * 2;
                    const alpha = (1 - star.z / w) * 0.8;
                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        const handleResize = ()=>{
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return ()=>{
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-0 overflow-hidden bg-[#030308]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden",
                children: ORBS.map((orb, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute rounded-full blur-[100px]",
                        style: {
                            width: orb.size,
                            height: orb.size,
                            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`
                        },
                        animate: {
                            x: [
                                `${orb.x}vw`,
                                `${orb.x + 15}vw`,
                                `${orb.x - 10}vw`,
                                `${orb.x}vw`
                            ],
                            y: [
                                `${orb.y}vh`,
                                `${orb.y - 20}vh`,
                                `${orb.y + 10}vh`,
                                `${orb.y}vh`
                            ],
                            scale: [
                                1,
                                1.2,
                                0.9,
                                1
                            ]
                        },
                        transition: {
                            duration: orb.duration,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }, i, false, {
                        fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
                        lineNumber: 104,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 pointer-events-none mix-blend-screen"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
                lineNumber: 137,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 z-10 opacity-30 transition-opacity duration-300",
                style: {
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.15), transparent 40%)`
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay",
                style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
                lineNumber: 151,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
                lineNumber: 159,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/IntergalacticBackground.tsx",
        lineNumber: 100,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = IntergalacticBackground;
}),
"[project]/Desktop/genesis/components/Layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$KernelStream$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/components/KernelStream.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/groqService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/appwriteService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$IntergalacticBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/components/IntergalacticBackground.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const ApiKeyGuard = ()=>{
    const [hasKey, setHasKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSystemManaged, setIsSystemManaged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inputKey, setInputKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setHasKey(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].hasKey());
        setIsSystemManaged(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].isSystemManaged());
    }, []);
    const handleSaveKey = ()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].setApiKey(inputKey)) {
            setHasKey(true);
            setShowModal(false);
            setInputKey('');
            setError('');
        } else {
            setError("Clé invalide. Veuillez vérifier le format.");
        }
    };
    const handleClick = ()=>{
        if (!isSystemManaged) setShowModal(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                className: `p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${hasKey ? isSystemManaged ? 'bg-green-500/5 border-green-500/20' : 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40' : 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'} border-glow backdrop-blur-sm`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${hasKey ? isSystemManaged ? 'bg-green-600 text-white shadow-[0_0_10px_#16a34a]' : 'bg-blue-600 text-white shadow-[0_0_10px_#2563eb]' : 'bg-gray-700 text-gray-400'}`,
                            children: hasKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 56,
                                    columnNumber: 94
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 animate-pulse",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 58,
                                    columnNumber: 108
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate",
                                    children: "Clé Neurale Gemini"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-[10px] font-mono font-bold truncate ${hasKey ? isSystemManaged ? 'text-green-400' : 'text-blue-400' : 'text-gray-400'}`,
                                    children: hasKey ? isSystemManaged ? 'GÉRÉ PAR LE SYSTÈME' : 'LIAISON UTILISATEUR' : 'CLÉ REQUISE'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn",
                onClick: ()=>setShowModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-[#0a0a0a] border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(37,99,235,0.2)] relative glass-panel",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-6 h-6",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 78,
                                            columnNumber: 96
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white font-heading tracking-wide",
                                            children: "INITIALISATION NEURALE"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-400 uppercase tracking-widest",
                                            children: "Protocole Gemini API"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2 block",
                                            children: "CLÉ API (Google AI Studio)"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            value: inputKey,
                                            onChange: (e)=>setInputKey(e.target.value),
                                            placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                            className: "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-700",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-[10px] mt-2 font-mono",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 97,
                                            columnNumber: 27
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-gray-600 mt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://aistudio.google.com/app/apikey",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "hover:text-blue-400 underline decoration-blue-500/30",
                                                children: "Obtenir une clé API Gemini >"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowModal(false);
                                                setError('');
                                            },
                                            className: "flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors",
                                            children: "Annuler"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSaveKey,
                                            className: "flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40",
                                            children: "Lier"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const AppwriteGuard = ()=>{
    const [projectId, setProjectId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLinked, setIsLinked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSystemManaged, setIsSystemManaged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsSystemManaged(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].isSystemManaged());
        const stored = localStorage.getItem('GENESIS_APPWRITE_PROJECT');
        if (stored || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].isConfigured) {
            setProjectId(stored || 'SYSTEM');
            setIsLinked(true);
        }
    }, []);
    const handleLink = ()=>{
        if (projectId.length > 5) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].init(projectId);
            setIsLinked(true);
            setShowModal(false);
        }
    };
    const handleClick = ()=>{
        if (!isSystemManaged) setShowModal(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                className: `p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden mt-3 ${isLinked ? isSystemManaged ? 'bg-green-500/5 border-green-500/20' : 'bg-pink-500/5 border-pink-500/20 hover:border-pink-500/40' : 'bg-gray-800/40 border-gray-700 hover:border-pink-500/30'} border-glow backdrop-blur-sm`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${isLinked ? isSystemManaged ? 'bg-green-600 text-white' : 'bg-pink-600 text-white shadow-[0_0_10px_#db2777]' : 'bg-gray-700 text-gray-400'}`,
                            children: isLinked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 167,
                                    columnNumber: 94
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 animate-pulse",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 169,
                                    columnNumber: 108
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate",
                                    children: "MÉMOIRE APPWRITE"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-[10px] font-mono font-bold truncate ${isLinked ? isSystemManaged ? 'text-green-400' : 'text-pink-400' : 'text-gray-400'}`,
                                    children: isLinked ? isSystemManaged ? 'GÉRÉ PAR LE SYSTÈME' : 'SYNC ACTIVE' : 'NON CONNECTÉ'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn",
                onClick: ()=>setShowModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-[#0a0a0a] border border-pink-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(219,39,119,0.2)] glass-panel",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-white font-heading tracking-wide mb-4 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-pink-500",
                                    children: "❖"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " CONFIGURATION APPWRITE"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] text-pink-400 font-bold uppercase tracking-widest mb-2 block",
                                            children: "PROJECT ID"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: projectId,
                                            onChange: (e)=>setProjectId(e.target.value),
                                            placeholder: "65a...",
                                            className: "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-pink-500/50 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLink,
                                    className: "w-full py-3 rounded-xl bg-pink-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-pink-500 transition-colors shadow-lg shadow-pink-900/40",
                                    children: "CONNECTER LA BASE DE DONNÉES"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 183,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const VertexKeyGuard = ()=>{
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const handleConnect = ()=>{
        if (status === 'active') return;
        setStatus('connecting');
        setTimeout(()=>{
            setStatus('active');
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: handleConnect,
        className: `p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden mt-3 ${status === 'active' ? 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40' : 'bg-gray-800/40 border-gray-700 hover:border-purple-500/30'} border-glow backdrop-blur-sm`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 relative z-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${status === 'active' ? 'bg-purple-600 text-white shadow-[0_0_10px_#9333ea]' : status === 'connecting' ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-700 text-gray-400'}`,
                    children: status === 'active' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 235,
                            columnNumber: 92
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 235,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : status === 'connecting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 animate-spin",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 237,
                            columnNumber: 105
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 237,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 15v2m-6 4h12a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 239,
                            columnNumber: 92
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate",
                            children: "Vertex Cloud IAM"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-[10px] font-mono font-bold truncate ${status === 'active' ? 'text-purple-400' : 'text-gray-400'}`,
                            children: status === 'active' ? 'vertex-express@gen...' : status === 'connecting' ? 'HANDSHAKE...' : 'OFFLINE'
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
            lineNumber: 231,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const GroqKeyGuard = ()=>{
    const [hasKey, setHasKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEnabled, setIsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSystemManaged, setIsSystemManaged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inputKey, setInputKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setHasKey(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].hasKey());
        setIsEnabled(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].isEnabled());
        setIsSystemManaged(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].isSystemManaged());
    }, []);
    const handleSaveKey = ()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].setApiKey(inputKey)) {
            setHasKey(true);
            setIsEnabled(true);
            setShowModal(false);
            setInputKey('');
            setError('');
        } else {
            setError("Format invalide. Doit commencer par 'gsk_'.");
        }
    };
    const toggleGroq = (e)=>{
        e.stopPropagation();
        if (!hasKey && !isSystemManaged) {
            setShowModal(true);
            return;
        }
        if (isSystemManaged) return;
        const newState = !isEnabled;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groqService"].setEnabled(newState);
        setIsEnabled(newState);
    };
    const handleClick = ()=>{
        if (!isSystemManaged) setShowModal(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                className: `p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden mt-3 ${hasKey && isEnabled ? isSystemManaged ? 'bg-green-500/5 border-green-500/20' : 'bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40' : 'bg-gray-800/40 border-gray-700 hover:border-orange-500/30'} border-glow backdrop-blur-sm`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${hasKey && isEnabled ? isSystemManaged ? 'bg-green-600 text-white shadow-[0_0_10px_#16a34a]' : 'bg-orange-600 text-white shadow-[0_0_10px_#f97316]' : 'bg-gray-700 text-gray-400'}`,
                            children: hasKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 309,
                                    columnNumber: 94
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 309,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 animate-pulse",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 311,
                                    columnNumber: 108
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 311,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate",
                                            children: "GROQ LPU ENGINE"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        hasKey && !isSystemManaged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleGroq,
                                            className: `w-6 h-3 rounded-full relative transition-colors ${isEnabled ? 'bg-orange-500' : 'bg-gray-600'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-0.5 w-2 h-2 bg-white rounded-full transition-all ${isEnabled ? 'left-3.5' : 'left-0.5'}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 322,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 318,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 315,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-[10px] font-mono font-bold truncate ${hasKey && isEnabled ? isSystemManaged ? 'text-green-400' : 'text-orange-400' : 'text-gray-400'}`,
                                    children: hasKey ? isEnabled ? isSystemManaged ? 'AUTO-GÉRÉ' : '820 T/s • ONLINE' : 'STANDBY' : 'CLÉ REQUISE'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 314,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 305,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn",
                onClick: ()=>setShowModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-[#0a0a0a] border border-orange-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(249,115,22,0.2)] glass-panel",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-white font-heading tracking-wide mb-4",
                            children: "INITIALISATION LPU"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-2 block",
                                            children: "CLÉ API (gsk_...)"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            value: inputKey,
                                            onChange: (e)=>setInputKey(e.target.value),
                                            placeholder: "gsk_xxxxxxxxxxxxxxxx",
                                            className: "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-orange-500/50 outline-none",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 340,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-[10px] mt-2 font-mono",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 348,
                                            columnNumber: 27
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 338,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveKey,
                                    className: "w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/40",
                                    children: "Activer"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 335,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 334,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const Layout = ({ children, activeView, setView })=>{
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [telemetry, setTelemetry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        cpu: 45,
        entropy: 98.2,
        exterminated: 0,
        data: '12.4'
    });
    const [criticalState, setCriticalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('genesis_evolution_memory');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setTelemetry((prev)=>({
                        ...prev,
                        data: parseFloat(parsed.dataConsumed || '12.4').toFixed(2)
                    }));
            } catch (e) {}
        }
        const handleTelemetryUpdate = (e)=>{
            if (e.detail) {
                if (e.detail.dataConsumed) {
                    setTelemetry((prev)=>({
                            ...prev,
                            data: e.detail.dataConsumed
                        }));
                }
                if (e.detail.stress) {
                    setCriticalState(e.detail.stress > 80);
                }
            }
        };
        const handleSecurityEvent = (e)=>{
            if (e.detail && e.detail.message) {
                setTelemetry((prev)=>({
                        ...prev,
                        exterminated: prev.exterminated + (e.detail.type === 'audit' ? 1 : 0)
                    }));
                setLogs((prev)=>[
                        {
                            id: Math.random().toString(36),
                            timestamp: new Date().toLocaleTimeString(),
                            message: e.detail.message,
                            type: e.detail.type || 'info'
                        },
                        ...prev
                    ].slice(0, 5));
            }
        };
        window.addEventListener('genesis-telemetry-update', handleTelemetryUpdate);
        window.addEventListener('genesis-security-event', handleSecurityEvent);
        const interval = setInterval(()=>{
            setTelemetry((prev)=>({
                    ...prev,
                    cpu: Math.floor(40 + Math.random() * 20),
                    entropy: +(98 + Math.random() * 1.5).toFixed(1)
                }));
        }, 3000);
        return ()=>{
            window.removeEventListener('genesis-telemetry-update', handleTelemetryUpdate);
            window.removeEventListener('genesis-security-event', handleSecurityEvent);
            clearInterval(interval);
        };
    }, []);
    // NOUVELLE STRUCTURE MENU GROUPÉ
    const navGroups = [
        {
            title: "GOUVERNANCE",
            items: [
                {
                    id: 'dashboard',
                    label: 'Tableau de Bord',
                    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                },
                {
                    id: 'fusion',
                    label: 'Nexus Multi-Agents',
                    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                },
                {
                    id: 'architecture',
                    label: 'Lattice',
                    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                }
            ]
        },
        {
            title: "INTELLIGENCE",
            items: [
                {
                    id: 'evolution',
                    label: 'Génome IA',
                    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                },
                {
                    id: 'lab',
                    label: 'Vocal',
                    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                },
                {
                    id: 'consciousness',
                    label: 'Conscience',
                    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                }
            ]
        },
        {
            title: "DÉFENSE",
            items: [
                {
                    id: 'threats',
                    label: 'Menaces Cyber',
                    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                },
                {
                    id: 'vault',
                    label: 'Coffre PQC',
                    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                },
                {
                    id: 'visualizer',
                    label: 'Synthèse',
                    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                }
            ]
        },
        {
            title: "OPÉRATIONS",
            items: [
                {
                    id: 'map',
                    label: 'Carte Globale',
                    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                }
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex h-screen h-[100dvh] overflow-hidden bg-[#050505] selection:bg-blue-500/30 transition-all duration-1000 ${criticalState ? 'animate-glitch contrast-125 brightness-110 grayscale-[0.3]' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$IntergalacticBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 459,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none scanline opacity-20 mix-blend-overlay"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$KernelStream$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    view: activeView
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                    lineNumber: 465,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden",
                onClick: ()=>setMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 470,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `
        fixed inset-y-0 left-0 z-[60] w-72 glass border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 bg-black/80 backdrop-blur-xl
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 group cursor-pointer",
                                        onClick: ()=>{
                                            setView('architecture');
                                            setMobileMenuOpen(false);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-10 h-10 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.8)] transition-transform group-hover:rotate-12 ${criticalState ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-xl text-white",
                                                    children: "Ω"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 485,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold font-heading tracking-tighter text-white uppercase italic text-glow",
                                                children: "Genesis"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 488,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 484,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: "lg:hidden p-2 text-white hover:text-red-400 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 491,
                                                columnNumber: 94
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 491,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 483,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "space-y-6 mb-8",
                                children: navGroups.map((group, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-3 ml-2",
                                                children: group.title
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: group.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setView(item.id);
                                                            setMobileMenuOpen(false);
                                                        },
                                                        className: `w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeView === item.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-gray-500 hover:text-white hover:bg-white/5'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: `w-4 h-4 shrink-0 transition-colors ${activeView === item.id ? 'text-blue-400' : 'group-hover:text-blue-500'}`,
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: item.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                                    lineNumber: 510,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-[10px] uppercase tracking-widest truncate",
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                                lineNumber: 512,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            activeView === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-blue-500 rounded-r-lg shadow-[0_0_10px_#3b82f6]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                                lineNumber: 513,
                                                                columnNumber: 50
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 497,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 pt-4 border-t border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ApiKeyGuard, {}, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppwriteGuard, {}, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VertexKeyGuard, {}, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 524,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GroqKeyGuard, {}, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 525,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 521,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 482,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 md:p-6 bg-black/40 border-t border-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "LOG_KERNEL_Ω"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: logs.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-slideIn relative pl-3 border-l-2 border-white/5 group hover:border-blue-500/50 transition-colors cursor-crosshair",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-[8px] mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600 font-mono group-hover:text-blue-400",
                                                        children: log.timestamp
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-bold ${log.type === 'critical' ? 'text-red-500 animate-pulse' : log.type === 'evolution' ? 'text-purple-500' : 'text-blue-500'}`,
                                                        children: log.type.toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 537,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-400 font-mono leading-none truncate group-hover:text-white transition-colors",
                                                children: log.message
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, log.id, true, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 534,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col h-full overflow-hidden w-full relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 border-b border-white/5 glass flex items-center justify-between px-4 md:px-10 z-10 shrink-0 shadow-lg shadow-black/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 md:gap-8 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMobileMenuOpen(true),
                                        className: "lg:hidden p-2 text-white bg-blue-600/20 border border-blue-500/50 rounded-lg hover:bg-blue-600 hover:text-white transition-all active:scale-95 z-50 relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4 6h16M4 12h16M4 18h16"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 559,
                                                columnNumber: 94
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                            lineNumber: 559,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 555,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] text-gray-500 uppercase font-bold tracking-widest",
                                                children: "INGESTION"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 563,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-mono text-amber-500",
                                                children: [
                                                    telemetry.data,
                                                    " PB"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 564,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 562,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:block w-px h-8 bg-white/5"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 566,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] text-gray-500 uppercase font-bold tracking-widest hidden md:block",
                                                children: "STABILITÉ_ENTROPIE"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 568,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-20 md:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `h-full transition-all duration-1000 ${criticalState ? 'bg-red-500' : 'bg-green-500'}`,
                                                                style: {
                                                                    width: `${telemetry.entropy}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-y-0 w-1 bg-white/50 animate-[scanline_2s_linear_infinite]",
                                                                style: {
                                                                    left: `${telemetry.entropy}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[10px] font-mono ${criticalState ? 'text-red-500 animate-pulse' : 'text-green-400'}`,
                                                        children: [
                                                            telemetry.entropy,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 569,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 567,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `hidden md:flex items-center gap-2 border px-4 py-1.5 rounded-full transition-all hover:bg-red-500/10 cursor-help ${criticalState ? 'bg-red-500/20 border-red-500/40 animate-bounce' : 'bg-red-500/10 border-red-500/20'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `w-2 h-2 rounded-full ${telemetry.exterminated > 0 ? 'bg-red-500 animate-ping' : 'bg-red-900'}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 581,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-red-500 uppercase font-mono",
                                                children: [
                                                    telemetry.exterminated,
                                                    " PURGES"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                                lineNumber: 582,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 580,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[9px] text-gray-500 font-mono hover:text-blue-400 cursor-pointer",
                                        children: "v0.9.1"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                        lineNumber: 584,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: `flex-1 overflow-y-auto relative p-4 md:p-8 lg:p-12 custom-scrollbar ${criticalState ? 'bg-red-900/5' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto relative z-10 h-full flex flex-col",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.98
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -20,
                                        scale: 0.98
                                    },
                                    transition: {
                                        duration: 0.3,
                                        ease: [
                                            0.25,
                                            0.46,
                                            0.45,
                                            0.94
                                        ]
                                    },
                                    className: "h-full flex flex-col",
                                    children: children
                                }, activeView, false, {
                                    fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                    lineNumber: 591,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                            lineNumber: 589,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 551,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .animate-glitch {
          animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/Layout.tsx",
                lineNumber: 606,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/Layout.tsx",
        lineNumber: 455,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Layout;
}),
"[project]/Desktop/genesis/components/ArchitectureViewer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-ssr] (ecmascript)");
;
;
;
;
const LatticeSimulation = ({ stress })=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        let animationFrameId;
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        for(let i = 0; i < particleCount; i++){
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * (stress / 10),
                vy: (Math.random() - 0.5) * (stress / 10)
            });
        }
        const render = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = stress > 70 ? 'rgba(245, 158, 11, 0.4)' : stress > 15 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)';
            ctx.lineWidth = 0.5;
            particles.forEach((p, i)=>{
                p.x += p.vx * (stress / 20);
                p.y += p.vy * (stress / 20);
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                particles.slice(i + 1).forEach((p2)=>{
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
        return ()=>cancelAnimationFrame(animationFrameId);
    }, [
        stress
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "w-full h-full opacity-60"
    }, void 0, false, {
        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const ArchitectureViewer = ()=>{
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        replicationRate: 0.012,
        quantumEntropy: 98.4,
        latticeStress: 12,
        batteryLevel: 100,
        latency: 0,
        cores: 0
    });
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAnalyzing, setIsAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isConstituting, setIsConstituting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [diagnosticReport, setDiagnosticReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Hook pour les métriques réelles (identique)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateRealMetrics = async ()=>{
            let batt = 100;
            try {
                if (navigator.getBattery) {
                    const battery = await navigator.getBattery();
                    batt = battery.level * 100;
                }
            } catch (e) {}
            const cores = navigator.hardwareConcurrency || 4;
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const rtt = connection ? connection.rtt : 50;
            const perf = performance;
            let memStress = 20;
            if (perf && perf.memory) {
                const ratio = perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit;
                memStress = Math.floor(ratio * 100);
            }
            setMetrics((prev)=>{
                const baseRate = 0.01;
                const loadFactor = (100 - batt) / 10000;
                const newRepRate = baseRate + loadFactor + Math.random() * 0.002;
                const entropyLoss = Math.min(rtt / 100, 5);
                const newEntropy = +(99.9 - entropyLoss + (Math.random() * 0.5 - 0.25)).toFixed(1);
                const newStress = memStress + (rtt > 100 ? 10 : 0);
                const risk = +(newRepRate * 5000 + (100 - newEntropy) * 2 + newStress * 0.5).toFixed(2);
                const newPoint = {
                    time: new Date().toLocaleTimeString([], {
                        hour12: false,
                        minute: '2-digit',
                        second: '2-digit'
                    }),
                    replicationRate: +(newRepRate * 100).toFixed(2),
                    quantumEntropy: newEntropy,
                    greyGooRisk: Math.min(risk, 100),
                    latticeStress: Math.max(0, Math.min(newStress, 100))
                };
                setHistory((currentHistory)=>[
                        ...currentHistory,
                        newPoint
                    ].slice(-30));
                return {
                    replicationRate: newRepRate,
                    quantumEntropy: newEntropy,
                    latticeStress: Math.max(0, Math.min(newStress, 100)),
                    batteryLevel: Math.round(batt),
                    latency: rtt,
                    cores: cores
                };
            });
        };
        const interval = setInterval(()=>{
            if (!isConstituting) updateRealMetrics();
        }, 2000);
        updateRealMetrics();
        return ()=>clearInterval(interval);
    }, [
        isConstituting
    ]);
    const handleDiagnostic = async ()=>{
        setIsAnalyzing(true);
        try {
            const report = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].performGlobalDiagnostic(metrics);
            setDiagnosticReport(report);
        } catch (e) {
            console.error(e);
        } finally{
            setIsAnalyzing(false);
        }
    };
    const handleConfinement = async ()=>{
        setIsConstituting(true);
        try {
            const report = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].initiateConfinementProtocol(metrics.latticeStress);
            setDiagnosticReport(report);
            for(let i = metrics.latticeStress; i >= 0; i -= 5){
                setMetrics((m)=>({
                        ...m,
                        latticeStress: i,
                        replicationRate: 0.005
                    }));
                await new Promise((r)=>setTimeout(r, 100));
            }
            window.dispatchEvent(new CustomEvent('genesis-security-event', {
                detail: {
                    message: "CONFINEMENT RÉUSSI",
                    type: 'critical'
                }
            }));
        } catch (e) {
            console.error(e);
        } finally{
            setIsConstituting(false);
        }
    };
    const isDanger = metrics.replicationRate >= 0.02 || metrics.latticeStress > 80;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-4 md:space-y-8 animate-fadeIn transition-all duration-1000 ${isDanger ? 'bg-red-950/5 p-6 rounded-[2.5rem] ring-2 ring-red-500/20' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            isDanger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -left-6 top-0 bottom-0 w-1.5 bg-red-600 animate-pulse rounded-full shadow-[0_0_15px_#dc2626]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 164,
                                columnNumber: 24
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-bold mb-2 font-heading tracking-tight flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: isDanger ? 'text-red-500 animate-pulse' : 'text-blue-500',
                                        children: "Ω"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Architecture de Défense"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-widest",
                                children: "Interface de Contrôle Tactique v5.1"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-6 md:gap-10 w-full md:w-auto justify-between md:justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] md:text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] mb-1",
                                        children: "Stress Lattice"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-2xl md:text-3xl font-mono ${metrics.latticeStress > 70 ? 'text-amber-500 animate-pulse' : metrics.latticeStress > 40 ? 'text-blue-300' : 'text-green-500'}`,
                                        children: [
                                            metrics.latticeStress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] md:text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] mb-1",
                                        children: "Énergie"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-2xl md:text-3xl font-mono ${metrics.batteryLevel < 20 ? 'text-red-500 animate-pulse' : 'text-green-400'}`,
                                        children: [
                                            metrics.batteryLevel,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10",
                                children: "Stress Lattice"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between mt-2 relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-2xl font-mono font-bold ${metrics.latticeStress > 70 ? 'text-amber-500 animate-pulse' : 'text-blue-400'}`,
                                        children: [
                                            metrics.latticeStress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-2 h-2 rounded-full ${metrics.latticeStress > 50 ? 'bg-amber-500' : 'bg-green-500'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-purple-600/5 group-hover:bg-purple-600/10 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10",
                                children: "Entropie Bell"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between mt-2 relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-mono font-bold text-purple-400",
                                        children: [
                                            metrics.quantumEntropy,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4 text-purple-500",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                            lineNumber: 203,
                                            columnNumber: 108
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-green-600/5 group-hover:bg-green-600/10 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10",
                                children: "Énergie Noyau"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between mt-2 relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-mono font-bold text-green-400",
                                        children: [
                                            metrics.batteryLevel,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 w-12 bg-white/10 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-green-500",
                                            style: {
                                                width: `${metrics.batteryLevel}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4 rounded-2xl border border-white/5 relative overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] relative z-10",
                                children: "Réplication"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end justify-between mt-2 relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-2xl font-mono font-bold ${metrics.replicationRate > 0.02 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`,
                                        children: [
                                            (metrics.replicationRate * 100).toFixed(2),
                                            "x"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-gray-600 font-mono",
                                        children: "/CYCLE"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-2 lg:col-span-3 glass p-0 rounded-[2rem] relative overflow-hidden flex flex-col min-h-[400px] border-white/5 shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 z-0 opacity-40",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LatticeSimulation, {
                                        stress: metrics.latticeStress
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 p-6 md:p-8 flex flex-col h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-1.5 h-6 rounded-full shadow-lg ${isDanger ? 'bg-red-600 animate-pulse' : 'bg-blue-500'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-bold font-heading uppercase tracking-widest text-white",
                                                                children: "Oscillation Quantique"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] text-gray-500 font-mono",
                                                                children: "FLUX TEMPOREL RÉEL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-1 bg-black/50 border border-white/10 rounded-lg text-[9px] font-mono text-blue-300",
                                                    children: [
                                                        "LATENCE: ",
                                                        metrics.latency,
                                                        "ms"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 w-full min-h-[200px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
                                                data: history,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        stroke: "#ffffff05",
                                                        vertical: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "time",
                                                        hide: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        hide: true,
                                                        domain: [
                                                            0,
                                                            100
                                                        ]
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        contentStyle: {
                                                            background: '#050505',
                                                            border: '1px solid #333',
                                                            borderRadius: '8px',
                                                            fontSize: '10px',
                                                            fontFamily: 'monospace'
                                                        },
                                                        itemStyle: {
                                                            color: '#3b82f6'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                        type: "monotone",
                                                        dataKey: "greyGooRisk",
                                                        stroke: isDanger ? "#dc2626" : "#3b82f6",
                                                        fill: isDanger ? "url(#dangerGradient)" : "url(#safeGradient)",
                                                        strokeWidth: 2,
                                                        isAnimationActive: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                id: "safeGradient",
                                                                x1: "0",
                                                                y1: "0",
                                                                x2: "0",
                                                                y2: "1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "5%",
                                                                        stopColor: "#3b82f6",
                                                                        stopOpacity: 0.2
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                        lineNumber: 265,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "95%",
                                                                        stopColor: "#3b82f6",
                                                                        stopOpacity: 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                        lineNumber: 266,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                id: "dangerGradient",
                                                                x1: "0",
                                                                y1: "0",
                                                                x2: "0",
                                                                y2: "1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "5%",
                                                                        stopColor: "#dc2626",
                                                                        stopOpacity: 0.3
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                        lineNumber: 269,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "95%",
                                                                        stopColor: "#dc2626",
                                                                        stopOpacity: 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                        lineNumber: 270,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                            lineNumber: 253,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-2 lg:col-span-1 flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `glass p-6 rounded-[2rem] flex-1 border-t-4 transition-all duration-500 relative overflow-hidden ${isDanger ? 'border-red-500 bg-red-900/10' : 'border-blue-500 bg-blue-900/5'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold font-heading uppercase tracking-widest text-white mb-6 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-gray-500",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 108
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Intégrité Système"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-gray-400 font-mono uppercase",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Synchronisation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: [
                                                                    (100 - metrics.latency / 5).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-1 bg-white/5 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full bg-blue-500",
                                                            style: {
                                                                width: `${Math.max(0, 100 - metrics.latency / 5)}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 289,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[10px] text-gray-400 font-mono uppercase",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Protection PQC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-green-400",
                                                                children: "ACTIF"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-1 bg-white/5 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full bg-green-500",
                                                            style: {
                                                                width: `100%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-black/40 rounded-xl border border-white/5 mt-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[9px] text-gray-500 font-mono leading-relaxed",
                                                    children: isConstituting ? ">> INITIALIZING CONTAINMENT..." : isDanger ? ">> CRITICAL ERROR DETECTED." : ">> SYSTEM OPTIMAL. MONITORING."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleConfinement,
                                        disabled: isConstituting || isAnalyzing,
                                        className: `py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] border transition-all ${isDanger ? 'bg-red-600 border-red-500 text-white animate-pulse' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`,
                                        children: isConstituting ? '...' : 'PURGE'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 319,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDiagnostic,
                                        disabled: isConstituting || isAnalyzing,
                                        className: "py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] border border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 transition-all",
                                        children: "SCAN"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 326,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            diagnosticReport && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/90 backdrop-blur-xl",
                        onClick: ()=>setDiagnosticReport(null)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass w-full max-w-4xl max-h-[80vh] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative z-10 border-blue-500/30 border-2 flex flex-col shadow-[0_0_100px_rgba(59,130,246,0.2)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "flex justify-between items-center mb-6 md:mb-10 pb-6 border-b border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl md:text-2xl font-bold font-heading text-blue-400 flex items-center gap-4 uppercase tracking-tighter",
                                        children: "Rapport de Diagnostic"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDiagnosticReport(null),
                                        className: "p-2 md:p-3 bg-white/5 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                                lineNumber: 347,
                                                columnNumber: 96
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                            lineNumber: 347,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto custom-scrollbar pr-2 md:pr-6 font-mono text-xs md:text-sm leading-relaxed text-blue-100 whitespace-pre-wrap",
                                children: diagnosticReport
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "mt-4 md:mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-mono",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "uppercase tracking-[0.2em] hidden md:inline",
                                        children: "Signature d'Audit: GENESIS_KERNEL_FINAL_Ω"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDiagnosticReport(null),
                                        className: "w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]",
                                        children: "Fermer le Terminal"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
                lineNumber: 339,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/ArchitectureViewer.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ArchitectureViewer;
}),
"[project]/Desktop/genesis/services/sfx.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sfx",
    ()=>sfx
]);
// MOTEUR AUDIO PROCÉDURAL (Web Audio API)
class AudioEngine {
    ctx = null;
    masterGain = null;
    hasInitialized = false;
    init() {
        if (this.hasInitialized) return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.15; // Volume global doux
                this.masterGain.connect(this.ctx.destination);
                this.hasInitialized = true;
            }
        } catch (e) {
            console.warn("AudioContext non supporté ou bloqué.");
        }
    }
    async resumeIfNeeded() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            try {
                await this.ctx.resume();
            } catch (e) {
            // Ignorer si l'interaction utilisateur n'a pas encore eu lieu
            }
        }
    }
    playTone(freq, type = 'sine', duration = 0.1) {
        this.resumeIfNeeded();
        if (!this.ctx || !this.masterGain) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }
    // Son de validation (Succès)
    playConfirm() {
        this.playTone(800, 'sine', 0.1);
        setTimeout(()=>this.playTone(1200, 'sine', 0.2), 50);
    }
    // Son d'erreur / Alerte
    playAlert() {
        this.playTone(150, 'sawtooth', 0.3);
        setTimeout(()=>this.playTone(120, 'sawtooth', 0.3), 100);
    }
    // Son d'activation UI (Hover/Click)
    playBlip() {
        this.playTone(2000, 'sine', 0.05);
    }
    // Son de traitement de données (Typing)
    playData() {
        this.playTone(400 + Math.random() * 200, 'square', 0.03);
    }
    // Ambiance de fond (Drone) - À appeler une seule fois
    startDrone() {
        this.resumeIfNeeded();
        if (!this.ctx || !this.masterGain) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.value = 40; // Basse fréquence
            gain.gain.value = 0.02;
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
        } catch (e) {}
    }
}
const sfx = new AudioEngine();
}),
"[project]/Desktop/genesis/components/BootSequence.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/sfx.ts [app-ssr] (ecmascript)");
;
;
;
const BootSequence = ({ onComplete })=>{
    // On démarre immédiatement car l'AudioContext a été activé par le LoginScreen
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bootSteps = [
        {
            text: "INITIALISATION DU NOYAU GENESIS v5.3...",
            delay: 200
        },
        {
            text: "AUTHENTIFICATION AGENT... ACCÈS CONFIRMÉ.",
            delay: 400
        },
        {
            text: "ALLOCATION MÉMOIRE HEAP [################----] 80%",
            delay: 600
        },
        {
            text: "CHARGEMENT MODULES NEURAUX...",
            delay: 800
        },
        {
            text: "> Cortex_Vision.sys ... OK",
            delay: 900
        },
        {
            text: "> Audio_Bridge.dll ... OK",
            delay: 1000
        },
        {
            text: "> PQC_Lattice_Guard.exe ... OK",
            delay: 1100
        },
        {
            text: "VÉRIFICATION INTÉGRITÉ POST-QUANTIQUE...",
            delay: 1300
        },
        {
            text: "GÉNÉRATION DES CLÉS ÉPHÉMÈRES...",
            delay: 1500
        },
        {
            text: "SYNCHRONISATION AVEC LE NOYAU DISTANT (GEMINI 2.5 FLASH)...",
            delay: 1800
        },
        {
            text: "ISOLATION DU PROCESSEUR LPU (GROQ)...",
            delay: 2000
        },
        {
            text: "DÉPLOIEMENT DU PARE-FEU COGNITIF...",
            delay: 2200
        },
        {
            text: "SYSTÈME PRÊT. BIENVENUE.",
            delay: 2500
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!started) return;
        let currentIndex = 0;
        const interval = setInterval(()=>{
            if (currentIndex >= bootSteps.length) {
                clearInterval(interval);
                setTimeout(onComplete, 800);
                return;
            }
            const step = bootSteps[currentIndex];
            setLogs((prev)=>[
                    ...prev,
                    `[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${step.text}`
                ]);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
            // Auto scroll
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
            // Update progress bar
            setProgress((currentIndex + 1) / bootSteps.length * 100);
            currentIndex++;
        }, 150);
        return ()=>clearInterval(interval);
    }, [
        started,
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-xs p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-3xl space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mb-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                    lineNumber: 66,
                                    columnNumber: 14
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center font-bold text-blue-500 text-2xl animate-pulse",
                                    children: "Ω"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                    lineNumber: 67,
                                    columnNumber: 14
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                            lineNumber: 65,
                            columnNumber: 12
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        className: "h-64 overflow-y-auto bg-gray-900/50 border border-gray-800 p-6 rounded-xl shadow-2xl font-mono text-green-400 space-y-2 custom-scrollbar",
                        children: [
                            logs.map((log, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "whitespace-pre-wrap",
                                    children: log
                                }, i, false, {
                                    fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-pulse",
                                children: "_"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-500 uppercase tracking-widest text-[10px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Séquence d'amorçage"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            Math.round(progress),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1 bg-gray-800 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-blue-600 transition-all duration-300 ease-out shadow-[0_0_20px_#2563eb]",
                                    style: {
                                        width: `${progress}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-8 text-gray-600 text-[10px] uppercase tracking-[0.5em]",
                children: "QuantuMech Systems © 2025"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/BootSequence.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BootSequence;
}),
"[project]/Desktop/genesis/components/LoginScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/sfx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/appwriteService.ts [app-ssr] (ecmascript)");
;
;
;
;
const LoginScreen = ({ onLoginSuccess })=>{
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('login');
    // Form States
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Config States
    const [showConfig, setShowConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [configEndpoint, setConfigEndpoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('https://fra.cloud.appwrite.io/v1');
    const [configProject, setConfigProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('694a84b40023501db111');
    // UI States
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isNetworkError, setIsNetworkError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentHost, setCurrentHost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [scanProgress, setScanProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [introDone, setIntroDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [skipIntro, setSkipIntro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Séquence d'intro "Retinal Scan" (Stylistique)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (skipIntro) {
            setIntroDone(true);
            return;
        }
        const interval = setInterval(()=>{
            setScanProgress((prev)=>{
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(()=>setIntroDone(true), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return ()=>clearInterval(interval);
    }, [
        skipIntro
    ]);
    const handleInput = (e, setter)=>{
        setter(e.target.value);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
    };
    const handleModeSwitch = (newMode)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playBlip();
        setErrorMsg('');
        setIsNetworkError(false);
        setMode(newMode);
    };
    const handleSkip = ()=>{
        setSkipIntro(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
    };
    const saveConfig = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].init(configProject, configEndpoint);
        localStorage.setItem('GENESIS_APPWRITE_ENDPOINT', configEndpoint);
        localStorage.setItem('GENESIS_APPWRITE_PROJECT', configProject);
        setShowConfig(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        setErrorMsg('');
        setIsNetworkError(false);
    };
    const copyHostname = ()=>{
        navigator.clipboard.writeText(currentHost);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        alert("Domaine copié ! Ajoutez-le dans Appwrite > Overview > Platforms > Add Web App");
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMsg('');
        setIsNetworkError(false);
        if (!email || !password || mode === 'register' && !name) {
            setErrorMsg("CHAMPS REQUIS MANQUANTS.");
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playAlert();
            return;
        }
        setLoading(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        // Assurer que le service est initialisé avec la config actuelle
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].init(configProject, configEndpoint);
        try {
            let user;
            // AUTHENTIFICATION APPWRITE STANDARD
            if (mode === 'register') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].register(email, password, name);
                user = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].getCurrentUser();
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].login(email, password);
                user = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].getCurrentUser();
            }
            if (user) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].recordAccessLog(user.name, true);
                onLoginSuccess(user.name, false);
            } else {
                throw new Error("Échec récupération session.");
            }
        } catch (error) {
            console.error("Login Process Error:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playAlert();
            let msg = "ERREUR D'AUTHENTIFICATION.";
            const errString = error.message || String(error);
            // Détection d'erreur CORS / Réseau
            if (errString.includes('Failed to fetch') || errString.includes('Network request failed') || errString.includes('CORS') || errString.includes('NetworkError') || errString.includes('Impossible de joindre')) {
                msg = "ACCÈS REJETÉ PAR LE SERVEUR (CORS).";
                setIsNetworkError(true);
            } else if (errString.includes('Invalid credentials')) msg = "IDENTIFIANTS INCORRECTS.";
            else if (errString.includes('already exists')) msg = "CET EMAIL EST DÉJÀ ENREGISTRÉ.";
            else if (errString.includes('short')) msg = "MOT DE PASSE TROP COURT (8+ CARACTÈRES).";
            else if (errString.includes('Rate limit')) msg = "TROP DE TENTATIVES. PATIENTEZ.";
            else msg = errString;
            setErrorMsg(msg.toUpperCase());
            if (!isNetworkError && !errString.includes('Failed to fetch')) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].recordAccessLog(email, false);
            }
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center overflow-hidden font-mono select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-20 pointer-events-none",
                style: {
                    backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                lineNumber: 167,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            showConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-[#0a0a0a] border border-white/20 rounded-2xl p-6 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-white font-bold uppercase tracking-widest mb-4 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-gray-400",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 176,
                                            columnNumber: 122
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 176,
                                            columnNumber: 679
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                    lineNumber: 176,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Configuration Appwrite"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                            lineNumber: 175,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] text-gray-500 font-bold uppercase block mb-1",
                                            children: "API Endpoint"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 181,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: configEndpoint,
                                            onChange: (e)=>setConfigEndpoint(e.target.value),
                                            className: "w-full bg-black border border-white/10 rounded-lg p-3 text-xs text-blue-200 font-mono focus:border-blue-500 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 182,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-gray-600 mt-1",
                                            children: "Défaut: https://fra.cloud.appwrite.io/v1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 183,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                    lineNumber: 180,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] text-gray-500 font-bold uppercase block mb-1",
                                            children: "Project ID"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 186,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: configProject,
                                            onChange: (e)=>setConfigProject(e.target.value),
                                            className: "w-full bg-black border border-white/10 rounded-lg p-3 text-xs text-blue-200 font-mono focus:border-blue-500 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 187,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                    lineNumber: 185,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowConfig(false),
                                            className: "flex-1 py-3 rounded-lg border border-white/10 text-gray-400 text-xs font-bold uppercase hover:bg-white/5",
                                            children: "Annuler"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 190,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: saveConfig,
                                            className: "flex-1 py-3 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-500",
                                            children: "Sauvegarder"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 191,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                    lineNumber: 189,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                            lineNumber: 179,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                    lineNumber: 174,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                lineNumber: 173,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            !introDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-8 animate-fadeIn relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-64 h-64 border border-blue-900/50 rounded-full flex items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 202,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-56 h-56 bg-blue-900/10 rounded-full flex items-center justify-center backdrop-blur-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl text-blue-500 animate-pulse",
                                    children: "👁"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                    lineNumber: 204,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 203,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                        lineNumber: 201,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-64 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[10px] text-blue-400 uppercase tracking-widest",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Synchronisation Cloud"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 209,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            Math.round(scanProgress),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 210,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 208,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1 bg-gray-900 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-blue-600 transition-all duration-100",
                                    style: {
                                        width: `${scanProgress}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                    lineNumber: 213,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 212,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                        lineNumber: 207,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSkip,
                        className: "mt-4 px-4 py-2 border border-white/10 rounded hover:bg-white/5 text-[9px] text-gray-500 uppercase tracking-widest transition-colors",
                        children: "Passer l'initialisation"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                        lineNumber: 216,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                lineNumber: 200,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            introDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-md p-8 animate-slideIn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl border rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.15)] transition-colors duration-500 ${isNetworkError ? 'border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.2)]' : 'border-blue-500/30'}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                        lineNumber: 225,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-20 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-left space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold font-heading text-white tracking-widest uppercase",
                                                children: "Genesis ID"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 231,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-blue-400 uppercase tracking-[0.4em]",
                                                children: "Portail d'Accès Sécurisé"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 232,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 230,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowConfig(true),
                                        className: "p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors",
                                        title: "Configuration Serveur",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 112
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 669
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 235,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 234,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 229,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            isNetworkError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-950/40 border border-red-500/50 p-5 rounded-2xl space-y-4 animate-slideIn shadow-[0_0_30px_rgba(220,38,38,0.15)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-red-400 text-sm font-bold uppercase flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 116
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 243,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "CONNEXION REFUSÉE (CORS)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 242,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-gray-300 leading-relaxed",
                                        children: "Le serveur Appwrite a bloqué la requête car le domaine actuel n'est pas autorisé."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 246,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/60 p-4 rounded-xl border border-red-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 uppercase font-bold mb-2",
                                                children: "SOLUTION REQUISE :"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 250,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                                className: "text-[11px] text-gray-300 list-decimal pl-4 space-y-1 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "Allez dans ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Appwrite Console"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 56
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " > ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Overview"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 95
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "Section ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Platforms"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 253,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " > ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Add Platform"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 253,
                                                                columnNumber: 85
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " (Web App)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Ajoutez ce domaine exact :"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 251,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: copyHostname,
                                                className: "bg-red-500/10 p-3 rounded border border-red-500/30 text-red-200 font-mono text-xs text-center cursor-pointer hover:bg-red-500/20 hover:text-white transition-all flex items-center justify-center gap-2 group",
                                                title: "Cliquer pour copier",
                                                children: [
                                                    currentHost,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-red-500 group-hover:text-white",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 156
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 256,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 249,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsNetworkError(false),
                                            className: "w-full py-2 bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-bold uppercase rounded-lg transition-colors",
                                            children: "Réessayer"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 266,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 265,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 241,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex bg-black/40 rounded-xl p-1 border border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleModeSwitch('login'),
                                        className: `flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${mode === 'login' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`,
                                        children: "Connexion"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 275,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleModeSwitch('register'),
                                        className: `flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${mode === 'register' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`,
                                        children: "Inscription"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 276,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 274,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "space-y-4",
                                children: [
                                    mode === 'register' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1",
                                                children: "Nom de l'Agent"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 282,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 271
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 127
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: name,
                                                        onChange: (e)=>handleInput(e, setName),
                                                        className: "w-full bg-black/50 border border-white/10 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-white font-bold outline-none transition-all focus:bg-white/5 placeholder-gray-700 text-sm",
                                                        placeholder: "EX: AGENT SMITH"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 283,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 281,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 291,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 267
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 123
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        value: email,
                                                        onChange: (e)=>handleInput(e, setEmail),
                                                        className: "w-full bg-black/50 border border-white/10 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-white font-mono outline-none transition-all focus:bg-white/5 placeholder-gray-700 text-sm",
                                                        placeholder: "agent@genesis.core"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 292,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 290,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1",
                                                children: "Mot de passe"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 299,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 267
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                            lineNumber: 301,
                                                            columnNumber: 123
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        value: password,
                                                        onChange: (e)=>handleInput(e, setPassword),
                                                        className: "w-full bg-black/50 border border-white/10 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-white font-mono outline-none transition-all focus:bg-white/5 placeholder-gray-700 text-sm",
                                                        placeholder: "••••••••••••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 300,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 298,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    errorMsg && !isNetworkError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-center animate-shake flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-red-500 shrink-0",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 138
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 308,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-red-400 font-bold uppercase tracking-widest",
                                                children: errorMsg
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 309,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 307,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: `w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group mt-4 ${loading ? 'bg-blue-900/50 text-blue-300 cursor-wait' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:scale-[1.02]'}`,
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    children: "Authentification..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 322,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative z-10",
                                            children: mode === 'login' ? 'ACCÉDER AU SYSTÈME' : 'INITIALISER L\'AGENT'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                            lineNumber: 327,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 313,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 279,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center pt-4 border-t border-white/5 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[8px] text-gray-600",
                                        children: [
                                            "PROJET ID: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 font-mono",
                                                children: configProject
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 334,
                                                columnNumber: 44
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 333,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[8px] text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-900",
                                                children: "SECURE PQC LINK ESTABLISHED"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                                lineNumber: 337,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " • v1.0.6"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                        lineNumber: 336,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                                lineNumber: 332,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                        lineNumber: 227,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                lineNumber: 224,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
                lineNumber: 344,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/LoginScreen.tsx",
        lineNumber: 165,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LoginScreen;
}),
"[project]/Desktop/genesis/components/ClientEntry.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$Layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/components/Layout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$ArchitectureViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/components/ArchitectureViewer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$BootSequence$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/components/BootSequence.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$LoginScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/components/LoginScreen.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/appwriteService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// Lazy Loading
const Visualizer = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/Visualizer.tsx [app-ssr] (ecmascript, async loader)"));
const SearchPortal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/SearchPortal.tsx [app-ssr] (ecmascript, async loader)"));
const KillSwitch = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/KillSwitch.tsx [app-ssr] (ecmascript, async loader)"));
const DebuggingAssistant = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/DebuggingAssistant.tsx [app-ssr] (ecmascript, async loader)"));
const ConsciousnessStream = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/ConsciousnessStream.tsx [app-ssr] (ecmascript, async loader)"));
const GlobalMap = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/GlobalMap.tsx [app-ssr] (ecmascript, async loader)"));
const PostQuantumVault = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/PostQuantumVault.tsx [app-ssr] (ecmascript, async loader)"));
const ThreatMonitor = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/ThreatMonitor.tsx [app-ssr] (ecmascript, async loader)"));
const EvolutionLab = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/EvolutionLab.tsx [app-ssr] (ecmascript, async loader)"));
const MultiAgentFusion = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/MultiAgentFusion.tsx [app-ssr] (ecmascript, async loader)"));
const LiveSession = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/LiveSession.tsx [app-ssr] (ecmascript, async loader)"));
const AdminDashboard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/AdminDashboard.tsx [app-ssr] (ecmascript, async loader)"));
const UserDashboard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/Desktop/genesis/components/UserDashboard.tsx [app-ssr] (ecmascript, async loader)"));
// Loader
const ViewLoader = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 30,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-blue-400 font-mono animate-pulse",
                    children: "LOADING MODULE..."
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 31,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
            lineNumber: 29,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
function ClientEntry() {
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdminMode, setIsAdminMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agentIdentity, setAgentIdentity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [booted, setBooted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shutdown, setShutdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('architecture');
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [pendingSearch, setPendingSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingMapQuery, setPendingMapQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingVisual, setPendingVisual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingNexus, setPendingNexus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [globalAction, setGlobalAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTrajectory, setActiveTrajectory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mapConfig, setMapConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Client-side only check
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const handleVoiceSearch = (query)=>{
        setPendingSearch(query);
        setActiveView('search');
    };
    const handleMapQuery = (query)=>{
        setPendingMapQuery(query);
        setActiveView('map');
    };
    const handleVoiceVisualize = (prompt, type)=>{
        setPendingVisual({
            prompt,
            type
        });
        setActiveView('visualizer');
    };
    const handleTrackThreat = (trajectory)=>{
        setActiveTrajectory(trajectory);
        setMapConfig((prev)=>({
                ...prev,
                layer: 'thermal'
            }));
        setActiveView('map');
    };
    const handleGlobalAction = (type, payload)=>{
        switch(type){
            case 'trigger_mutation':
                setActiveView('evolution');
                break;
            case 'update_map_config':
                setMapConfig((prev)=>({
                        ...prev,
                        ...payload
                    }));
                if (activeView !== 'map') setActiveView('map');
                break;
            case 'nexus_interaction':
                setPendingNexus({
                    agentId: payload.agentId,
                    query: payload.query
                });
                setActiveView('fusion');
                break;
            case 'system_control':
                {
                    const { action } = payload;
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    if (action === 'shutdown') setShutdown(true);
                    if (action === 'logout') handleLogout();
                    if (action === 'open_admin') setIsAdminMode(true);
                    break;
                }
            case 'threat_defense':
                {
                    setMapConfig((prev)=>({
                            ...prev,
                            layer: 'thermal',
                            ghostMode: true
                        }));
                    if (activeView !== 'threats') setActiveView('threats');
                    break;
                }
            case 'update_vis_config':
                {
                    setPendingVisual({
                        prompt: "AUDIO REACTIVE CORE",
                        type: 'image'
                    });
                    if (activeView !== 'visualizer') setActiveView('visualizer');
                    break;
                }
        }
        setGlobalAction({
            type,
            payload
        });
    };
    const handleLogout = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$appwriteService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appwriteService"].logout();
        setIsLoggedIn(false);
        setIsAdminMode(false);
        setBooted(false);
    };
    const renderView = ()=>{
        switch(activeView){
            case 'architecture':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$ArchitectureViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 150,
                    columnNumber: 41
                }, this);
            case 'evolution':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EvolutionLab, {
                    autoTrigger: globalAction?.type === 'trigger_mutation',
                    onConsumed: ()=>setGlobalAction(null)
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 151,
                    columnNumber: 38
                }, this);
            case 'consciousness':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ConsciousnessStream, {
                    initialTopic: globalAction?.type === 'meditate' ? globalAction.payload : null,
                    onConsumed: ()=>setGlobalAction(null)
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 152,
                    columnNumber: 42
                }, this);
            case 'vault':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PostQuantumVault, {}, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 153,
                    columnNumber: 34
                }, this);
            case 'threats':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreatMonitor, {
                    onTrackThreat: handleTrackThreat
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 154,
                    columnNumber: 36
                }, this);
            case 'fusion':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiAgentFusion, {
                    initialParams: pendingNexus,
                    onConsumed: ()=>setPendingNexus(null)
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 155,
                    columnNumber: 35
                }, this);
            case 'map':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalMap, {
                    initialQuery: pendingMapQuery,
                    externalConfig: mapConfig,
                    activeTrajectory: activeTrajectory,
                    onConsumed: ()=>setPendingMapQuery(null)
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 156,
                    columnNumber: 32
                }, this);
            case 'visualizer':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Visualizer, {
                    initialParams: pendingVisual,
                    onConsumed: ()=>setPendingVisual(null)
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 157,
                    columnNumber: 39
                }, this);
            case 'search':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchPortal, {
                    initialQuery: pendingSearch,
                    onConsumed: ()=>setPendingSearch(null)
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 158,
                    columnNumber: 35
                }, this);
            case 'debugger':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DebuggingAssistant, {}, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 159,
                    columnNumber: 37
                }, this);
            case 'killswitch':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KillSwitch, {}, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 160,
                    columnNumber: 39
                }, this);
            case 'dashboard':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserDashboard, {
                    identity: agentIdentity,
                    onNavigate: setActiveView
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 161,
                    columnNumber: 38
                }, this);
            case 'lab':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveSession, {
                    onNavigate: setActiveView,
                    onVoiceSearch: handleVoiceSearch,
                    onVoiceVisualize: handleVoiceVisualize,
                    onMapQuery: handleMapQuery,
                    onAction: handleGlobalAction
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 163,
                    columnNumber: 17
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$ArchitectureViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 171,
                    columnNumber: 29
                }, this);
        }
    };
    // Safe checks for SS
    if (authLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                lineNumber: 177,
                columnNumber: 89
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
            lineNumber: 177,
            columnNumber: 16
        }, this);
    }
    if (shutdown) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black flex items-center justify-center z-[9999]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600 font-mono text-xl animate-pulse",
                        children: "SYSTEM HALTED"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                        lineNumber: 184,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-32 bg-red-900 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                        lineNumber: 185,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-800 font-mono text-xs",
                        children: "NOYAU DÉTRUIT. VEUILLEZ REDÉMARRER MANUELLEMENT."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                        lineNumber: 186,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                lineNumber: 183,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
            lineNumber: 182,
            columnNumber: 13
        }, this);
    }
    if (!isLoggedIn) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$LoginScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            onLoginSuccess: (name, admin)=>{
                setIsLoggedIn(true);
                setAgentIdentity(name);
                if (admin) setIsAdminMode(true);
            }
        }, void 0, false, {
            fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
            lineNumber: 193,
            columnNumber: 16
        }, this);
    }
    if (isAdminMode) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/90 flex items-center justify-center text-red-500 font-mono",
                children: "INITIALIZING ADMIN CORE..."
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                lineNumber: 198,
                columnNumber: 33
            }, void 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminDashboard, {
                onClose: ()=>{
                    setIsAdminMode(false);
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                lineNumber: 199,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
            lineNumber: 198,
            columnNumber: 13
        }, this);
    }
    if (!booted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$BootSequence$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            onComplete: ()=>setBooted(true)
        }, void 0, false, {
            fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
            lineNumber: 205,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$components$2f$Layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        activeView: activeView,
        setView: setActiveView,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ViewLoader, {}, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 210,
                    columnNumber: 33
                }, void 0),
                children: renderView()
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                lineNumber: 210,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-50 lg:hidden user-select-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleLogout,
                    className: "text-[10px] text-red-500 bg-black/50 px-2 py-1 rounded border border-red-500/20",
                    children: "LOGOUT"
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                    lineNumber: 214,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
                lineNumber: 213,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/ClientEntry.tsx",
        lineNumber: 209,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7bce26c5._.js.map