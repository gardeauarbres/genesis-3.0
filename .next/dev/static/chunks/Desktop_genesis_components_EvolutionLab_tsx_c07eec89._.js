(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/genesis/components/EvolutionLab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/groqService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/memory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/sfx.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const CodeDiffView = ({ original, modified })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-4 h-full font-mono text-[10px] md:text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-950/20 border border-red-500/20 rounded-xl p-4 overflow-y-auto custom-scrollbar relative group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2 text-red-500 font-bold uppercase text-[8px] bg-red-950/50 px-2 py-1 rounded",
                        children: "Original"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 24,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-red-200/70 whitespace-pre-wrap",
                        children: original
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-green-950/20 border border-green-500/20 rounded-xl p-4 overflow-y-auto custom-scrollbar relative group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2 text-green-500 font-bold uppercase text-[8px] bg-green-950/50 px-2 py-1 rounded",
                        children: "Mutation (Proposée)"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-green-200/90 whitespace-pre-wrap",
                        children: modified
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CodeDiffView;
const EvolutionLab = ({ autoTrigger, onConsumed })=>{
    _s();
    const [evoState, setEvoState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        generation: 3.0,
        iqScore: 200,
        history: []
    });
    const [activeCode, setActiveCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(`// NOYAU GENESIS V3.0
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
    const [proposedCode, setProposedCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mutationDetails, setMutationDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [optimizing, setOptimizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [executing, setExecuting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastExecution, setLastExecution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const hasAutoTriggered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // LPU Telemetry State
    const [telemetry, setTelemetry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        complexity: "...",
        securityScore: 0,
        type: "ANALYZING..."
    });
    const [lpuActive, setLpuActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Charger l'historique
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EvolutionLab.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memory"].getByType('evolution').then({
                "EvolutionLab.useEffect": (fragments)=>{
                    if (fragments.length > 0) {
                        const history = fragments.map({
                            "EvolutionLab.useEffect.history": (f)=>{
                                const meta = f.metadata || {};
                                return {
                                    generation: 1.0,
                                    timestamp: new Date(f.timestamp).toLocaleTimeString(),
                                    content: JSON.stringify(meta),
                                    iqAtTime: meta.iq_increment ? 200 + meta.iq_increment : 200,
                                    merkleHash: meta.merkle_root || 'HASH',
                                    validationProof: meta.security_proof || 'PROOF'
                                };
                            }
                        }["EvolutionLab.useEffect.history"]);
                        const lastPatch = fragments[0].metadata;
                        if (lastPatch?.mutated_code) setActiveCode(lastPatch.mutated_code);
                        setEvoState({
                            "EvolutionLab.useEffect": (prev)=>({
                                    ...prev,
                                    history,
                                    generation: Math.max(3.0, 3.0 + fragments.length * 0.1)
                                })
                        }["EvolutionLab.useEffect"]);
                    }
                }
            }["EvolutionLab.useEffect"]);
        }
    }["EvolutionLab.useEffect"], []);
    // Live Telemetry Effect (GROQ)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EvolutionLab.useEffect": ()=>{
            const timer = setTimeout({
                "EvolutionLab.useEffect.timer": async ()=>{
                    setLpuActive(true);
                    const metrics = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$groqService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groqService"].analyzeCodeTelemetry(activeCode);
                    setTelemetry(metrics);
                    setLpuActive(false);
                }
            }["EvolutionLab.useEffect.timer"], 800); // Debounce
            return ({
                "EvolutionLab.useEffect": ()=>clearTimeout(timer)
            })["EvolutionLab.useEffect"];
        }
    }["EvolutionLab.useEffect"], [
        activeCode
    ]);
    const runSimulation = async (codeToRun)=>{
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        } catch (e) {
            setLastExecution({
                success: false,
                output: e.toString(),
                executionTime: 0,
                memoryUsage: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playAlert();
        } finally{
            setExecuting(false);
        }
    };
    const triggerMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EvolutionLab.useCallback[triggerMutation]": async ()=>{
            if (optimizing) return;
            setOptimizing(true);
            setProposedCode(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playData();
            try {
                const historyContext = evoState.history.slice(0, 3).map({
                    "EvolutionLab.useCallback[triggerMutation].historyContext": (p)=>`v${p.generation}`
                }["EvolutionLab.useCallback[triggerMutation].historyContext"]);
                const janusResult = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geminiService"].performSelfOptimization(activeCode, historyContext);
                if (janusResult && janusResult.mutated_code) {
                    setProposedCode(janusResult.mutated_code);
                    setMutationDetails(janusResult);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
                }
            } catch (e) {
                console.error(e);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playAlert();
            } finally{
                setOptimizing(false);
            }
        }
    }["EvolutionLab.useCallback[triggerMutation]"], [
        activeCode,
        evoState.history,
        optimizing
    ]);
    const mergeMutation = async ()=>{
        if (!proposedCode || !mutationDetails) return;
        setActiveCode(proposedCode);
        const newGen = Math.round((evoState.generation + 0.1) * 10) / 10;
        const newIq = evoState.iqScore + (mutationDetails.iq_increment || 5);
        const patch = {
            generation: newGen,
            timestamp: new Date().toLocaleTimeString(),
            content: JSON.stringify(mutationDetails),
            iqAtTime: newIq,
            merkleHash: mutationDetails.merkle_root,
            validationProof: mutationDetails.security_proof
        };
        setEvoState((prev)=>({
                generation: newGen,
                iqScore: newIq,
                history: [
                    patch,
                    ...prev.history
                ]
            }));
        // Reset
        setProposedCode(null);
        setMutationDetails(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        window.dispatchEvent(new CustomEvent('genesis-security-event', {
            detail: {
                message: `Mutation v${newGen} Intégrée au Noyau.`,
                type: 'evolution'
            }
        }));
    };
    const rejectMutation = ()=>{
        setProposedCode(null);
        setMutationDetails(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sfx"].playBlip();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EvolutionLab.useEffect": ()=>{
            if (autoTrigger && !optimizing && !hasAutoTriggered.current) {
                hasAutoTriggered.current = true;
                triggerMutation();
                onConsumed?.();
            }
        }
    }["EvolutionLab.useEffect"], [
        autoTrigger,
        onConsumed,
        triggerMutation,
        optimizing
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 md:space-y-8 h-full flex flex-col animate-fadeIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-bold font-heading bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent italic",
                                children: "Moteur d'Évolution"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `h-2 w-2 rounded-full ${optimizing ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-mono text-gray-400",
                                        children: optimizing ? 'RECHERCHE DE MUTATION (THINKING MODE)' : 'NOYAU STABLE'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-gray-500 uppercase font-bold tracking-widest",
                                        children: "Génération"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl md:text-3xl font-mono text-blue-400",
                                        children: [
                                            "v",
                                            evoState.generation.toFixed(1)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 206,
                                columnNumber: 12
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-gray-500 uppercase font-bold tracking-widest",
                                        children: "QI Synthétique"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl md:text-3xl font-mono text-purple-400",
                                        children: evoState.iqScore
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 210,
                                columnNumber: 12
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-8 glass p-4 md:p-8 rounded-[2rem] flex flex-col bg-black/60 shadow-2xl relative min-h-[500px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[8px] md:text-[9px] text-blue-300 font-bold bg-black px-2 py-0.5 rounded border border-blue-900",
                                                children: "RUNTIME JS"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 223,
                                                columnNumber: 18
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            lastExecution && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[9px] font-mono ${lastExecution.success ? 'text-green-500' : 'text-red-500'}`,
                                                children: [
                                                    "Dernière exec: ",
                                                    lastExecution.executionTime.toFixed(2),
                                                    "ms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 225,
                                                columnNumber: 22
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 222,
                                        columnNumber: 14
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>runSimulation(activeCode),
                                                disabled: executing || optimizing,
                                                className: "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-gray-800 hover:bg-gray-700 text-white transition-all",
                                                children: "Test Actuel"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 231,
                                                columnNumber: 18
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            proposedCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>runSimulation(proposedCode),
                                                className: "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-green-900/50 hover:bg-green-800 text-green-300 border border-green-500/30 transition-all",
                                                children: "Test Mutation"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 235,
                                                columnNumber: 22
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 230,
                                        columnNumber: 14
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col gap-4 min-h-0 relative",
                                children: [
                                    proposedCode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeDiffView, {
                                        original: activeCode,
                                        modified: proposedCode
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: activeCode,
                                        onChange: (e)=>setActiveCode(e.target.value),
                                        disabled: optimizing,
                                        className: `flex-1 w-full bg-[#080808] border border-white/10 rounded-xl p-4 md:p-5 font-mono text-xs md:text-sm text-blue-200/80 transition-all focus:border-blue-500/50 outline-none resize-none custom-scrollbar ${optimizing ? 'opacity-50 cursor-not-allowed' : ''}`,
                                        spellCheck: false
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 247,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    optimizing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 259,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-amber-400 font-mono text-xs uppercase tracking-widest animate-pulse",
                                                children: "Analyse structurelle en cours..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 260,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-[10px] mt-2",
                                                children: "Gemini Thinking Mode Active"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 261,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex gap-4",
                                children: proposedCode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 bg-black/40 rounded-xl border border-white/10 p-4 flex flex-col justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-gray-400 uppercase font-bold mb-1",
                                                    children: "Résumé de l'Optimisation"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-white font-mono",
                                                    children: mutationDetails?.diff_summary
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-blue-400 font-mono mt-1",
                                                    children: mutationDetails?.audit_log
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                            lineNumber: 270,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2 justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: mergeMutation,
                                                    className: "px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest rounded-xl text-xs shadow-lg shadow-green-900/50 transition-all",
                                                    children: "FUSIONNER"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: rejectMutation,
                                                    className: "px-8 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-bold uppercase tracking-widest rounded-xl text-[10px] border border-red-500/30 transition-all",
                                                    children: "REJETER"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                            lineNumber: 275,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: triggerMutation,
                                    disabled: optimizing,
                                    className: `flex-1 py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 flex items-center justify-center gap-2 ${optimizing ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]'}`,
                                    children: optimizing ? 'RÉFLEXION NEURALE PROFONDE...' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "LANCER AUTO-OPTIMISATION JANUS"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 286,
                                        columnNumber: 69
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-4 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4 md:p-6 rounded-[2rem] border-orange-500/20 bg-orange-950/5 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `w-2 h-2 rounded-full ${lpuActive ? 'bg-orange-500 animate-ping' : 'bg-orange-900'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "LPU REAL-TIME TELEMETRY"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 297,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] text-orange-500/50 font-mono",
                                                children: "GROQ-Llama-3.3"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 301,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 296,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-[9px] uppercase font-bold text-gray-500 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Score Sécurité"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 307,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: telemetry.securityScore > 80 ? 'text-green-400' : 'text-red-400',
                                                                children: [
                                                                    telemetry.securityScore,
                                                                    "/100"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 308,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-1 bg-gray-800 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `h-full transition-all duration-500 ${telemetry.securityScore > 80 ? 'bg-green-500' : 'bg-red-500'}`,
                                                            style: {
                                                                width: `${telemetry.securityScore}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 305,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-black/40 p-3 rounded-xl border border-orange-500/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[8px] text-gray-600 uppercase mb-1",
                                                                children: "Complexité"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-mono text-orange-200",
                                                                children: telemetry.complexity
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-black/40 p-3 rounded-xl border border-orange-500/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[8px] text-gray-600 uppercase mb-1",
                                                                children: "Classification"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 321,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-mono text-orange-200 truncate",
                                                                children: telemetry.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 315,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4 md:p-6 rounded-[2rem] overflow-hidden flex flex-col border-white/5 min-h-[300px] flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 bg-purple-500 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 330,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Journal des Mutations"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 329,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-y-auto custom-scrollbar flex-1 pr-2 space-y-3 md:space-y-4",
                                        children: [
                                            evoState.history.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 md:p-4 bg-[#0a0a0a] rounded-lg border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-blue-400 font-mono group-hover:text-blue-300",
                                                                    children: [
                                                                        "PATCH v",
                                                                        p.generation.toFixed(1)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[9px] text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full font-mono",
                                                                    children: [
                                                                        "+",
                                                                        p.iqAtTime - (evoState.history[i + 1]?.iqAtTime || 200),
                                                                        " IQ"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                    lineNumber: 338,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full bg-gray-900 h-1 rounded-full overflow-hidden mb-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-blue-500 h-full shadow-[0_0_10px_#3b82f6]",
                                                                style: {
                                                                    width: `${p.iqAtTime / 300 * 100}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-[8px] font-mono text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: p.timestamp
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-purple-500/70",
                                                                    children: [
                                                                        p.merkleHash.slice(0, 8),
                                                                        "..."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))),
                                            evoState.history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-[10px] text-gray-700 uppercase font-mono py-10",
                                                children: "Aucune mutation active"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                                lineNumber: 349,
                                                columnNumber: 55
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                        lineNumber: 333,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/EvolutionLab.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(EvolutionLab, "2MzkoYvbZPDKr6Qbr2v3E0rzsEI=");
_c1 = EvolutionLab;
const __TURBOPACK__default__export__ = EvolutionLab;
var _c, _c1;
__turbopack_context__.k.register(_c, "CodeDiffView");
__turbopack_context__.k.register(_c1, "EvolutionLab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_genesis_components_EvolutionLab_tsx_c07eec89._.js.map