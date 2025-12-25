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
"[project]/Desktop/genesis/components/LiveSession.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/@google/genai/dist/node/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/utils/audio.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/sfx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/memory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const VOICES = [
    {
        id: 'Puck',
        label: 'PUCK',
        desc: 'Analytique'
    },
    {
        id: 'Charon',
        label: 'CHARON',
        desc: 'Autoritaire'
    },
    {
        id: 'Kore',
        label: 'KORE',
        desc: 'Empathique'
    },
    {
        id: 'Zephyr',
        label: 'ZEPHYR',
        desc: 'Intellectuel'
    },
    {
        id: 'Fenrir',
        label: 'FENRIR',
        desc: 'Agressif'
    }
];
// DÉFINITION DES OUTILS "GOD MODE"
const TOOLS = [
    {
        googleSearch: {}
    },
    {
        functionDeclarations: [
            {
                name: 'change_view',
                description: 'Navigation instantanée vers un module du système.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        view: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'architecture',
                                'evolution',
                                'consciousness',
                                'vault',
                                'threats',
                                'lab',
                                'visualizer',
                                'search',
                                'debugger',
                                'killswitch',
                                'map',
                                'fusion'
                            ]
                        }
                    },
                    required: [
                        'view'
                    ]
                }
            },
            {
                name: 'nexus_interaction',
                description: 'Active un agent spécialisé (Mnemosyne/Archive, Athena/Stratégie, Argus/Sécurité, Atlas/Géo) pour une tâche précise.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        agentId: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'mnemosyne',
                                'athena',
                                'argus',
                                'atlas'
                            ]
                        },
                        query: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            description: 'Instruction détaillée pour l\'agent.'
                        }
                    },
                    required: [
                        'agentId',
                        'query'
                    ]
                }
            },
            {
                name: 'system_diagnostic',
                description: 'Lance un scan complet de l\'intégrité du système (CPU, Mémoire, Latence, Menaces).',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {}
                }
            },
            {
                name: 'consult_archives',
                description: 'Recherche dans la mémoire long-terme (Base vectorielle/Logs) pour retrouver une info passée.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        query: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            description: 'Sujet à retrouver en mémoire.'
                        }
                    },
                    required: [
                        'query'
                    ]
                }
            },
            {
                name: 'configure_map',
                description: 'Contrôle tactique de la Carte Globale.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        layer: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'lattice',
                                'optical',
                                'thermal'
                            ]
                        },
                        ghostMode: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].BOOLEAN
                        },
                        filters: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].ARRAY,
                            items: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                            }
                        }
                    }
                }
            },
            {
                name: 'scan_map_sector',
                description: 'Scan radar géographique.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        query: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                        }
                    },
                    required: [
                        'query'
                    ]
                }
            },
            {
                name: 'open_search_portal',
                description: 'Ouvre le portail de recherche Web Quantum.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        query: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                        }
                    },
                    required: [
                        'query'
                    ]
                }
            },
            {
                name: 'trigger_evolution',
                description: 'Force une mutation du code source via le Labo d\'Évolution.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {}
                }
            },
            {
                name: 'generate_visual',
                description: 'Génère des médias synthétiques (Images/Vidéos).',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        prompt: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING
                        },
                        type: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'image',
                                'video'
                            ]
                        }
                    },
                    required: [
                        'prompt',
                        'type'
                    ]
                }
            },
            {
                name: 'system_control',
                description: 'Commandes Système Critiques (Niveau OMEGA).',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        action: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'reboot',
                                'shutdown',
                                'logout',
                                'open_admin'
                            ]
                        }
                    },
                    required: [
                        'action'
                    ]
                }
            },
            {
                name: 'visualizer_control',
                description: 'Contrôle précis de l\'interface visuelle.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        mode: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'wave',
                                'bars',
                                'orbs',
                                'chaos'
                            ]
                        },
                        sensitivity: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                            description: 'Sensibilité audio (0.1 - 2.0)'
                        }
                    }
                }
            },
            {
                name: 'threat_defense',
                description: 'Protocoles de défense active.',
                parameters: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                    properties: {
                        mode: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Type"].STRING,
                            enum: [
                                'auto_intercept',
                                'shield_max',
                                'stealth'
                            ]
                        }
                    },
                    required: [
                        'mode'
                    ]
                }
            }
        ]
    }
];
// --- VISUALISEUR AVANCÉ "HYPER-CORE" ---
const NeuralCoreVisualizer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(({ analyser, isActive, isTalking, mode })=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationId;
        let rotation = 0;
        let pulse = 0;
        const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : new Uint8Array(0);
        const draw = ()=>{
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
                    avgFreq = dataArray.reduce((a, b)=>a + b) / dataArray.length;
                } catch (e) {}
            }
            // Physics
            rotation += 0.002 + avgFreq / 5000;
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
                for(let i = 0; i < 3; i++){
                    ctx.rotate(rotation * (i % 2 === 0 ? 1 : -1));
                    ctx.beginPath();
                    ctx.arc(0, 0, 80 + i * 30 + avgFreq / 5, 0, Math.PI * 2); // Dynamic radius
                    ctx.strokeStyle = `rgba(${baseColor}, ${0.3 - i * 0.05})`;
                    ctx.lineWidth = 1 + avgFreq / 50;
                    ctx.stroke();
                    // Orbital Particles
                    const orbitAngle = Date.now() / (1000 + i * 500) % (Math.PI * 2);
                    const px = Math.cos(orbitAngle) * (80 + i * 30 + avgFreq / 5);
                    const py = Math.sin(orbitAngle) * (80 + i * 30 + avgFreq / 5);
                    ctx.beginPath();
                    ctx.arc(px, py, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgb(${baseColor})`;
                    ctx.fill();
                }
                ctx.restore();
                // 2. Central Core (Waveform)
                ctx.beginPath();
                ctx.arc(CX, CY, 50 + pulse + avgFreq / 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(CX, CY, 10, CX, CY, 60 + avgFreq / 3);
                gradient.addColorStop(0, `rgba(${baseColor}, 0.8)`);
                gradient.addColorStop(1, `rgba(${baseColor}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fill();
                // Inner Hexagon
                ctx.save();
                ctx.translate(CX, CY);
                ctx.rotate(-rotation * 2);
                ctx.beginPath();
                for(let i = 0; i < 6; i++){
                    const angle = Math.PI / 3 * i;
                    const r = 30 + dataArray[i * 10] / 5;
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
        return ()=>cancelAnimationFrame(animationId);
    }, [
        analyser,
        isActive,
        isTalking,
        mode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
        lineNumber: 276,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
});
const LiveSession = ({ onNavigate, onVoiceSearch, onVoiceVisualize, onMapQuery, onAction })=>{
    const [isActive, setIsActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connectionState, setConnectionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [transcriptions, setTranscriptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedVoice, setSelectedVoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Zephyr');
    const [activeTasks, setActiveTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [analyser, setAnalyser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const outContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mediaStreamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cleanupRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const nextStartTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Auto-scroll logs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [
        transcriptions
    ]);
    // Load Memory Context
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].init().then(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].getAllTranscript().then((history)=>{
                if (history.length > 0) setTranscriptions(history);
            });
        });
    }, []);
    const addTask = (name)=>{
        const id = Math.random().toString(36).substring(7);
        setActiveTasks((prev)=>[
                ...prev,
                {
                    id,
                    name,
                    status: 'RUNNING'
                }
            ]);
        setMode('processing');
        return id;
    };
    const updateTask = (id, status)=>{
        setActiveTasks((prev)=>prev.map((t)=>t.id === id ? {
                    ...t,
                    status
                } : t));
        setTimeout(()=>{
            setActiveTasks((prev)=>prev.filter((t)=>t.id !== id));
            setMode(isActive ? 'listening' : 'idle');
        }, 4000);
    };
    const stopSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (sessionRef.current) {
            try {
                sessionRef.current.close();
            } catch (e) {}
            sessionRef.current = null;
        }
        // Cleanup Audio Nodes
        cleanupRefs.current.source?.disconnect();
        cleanupRefs.current.processor?.disconnect();
        // Stop Tracks
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track)=>track.stop());
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
    const startSession = async ()=>{
        if (connectionState !== 'disconnected') return;
        setConnectionState('connecting');
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
        try {
            const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].getApiKey();
            if (!apiKey) throw new Error("Clé API manquante");
            const ai = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
                apiKey
            });
            // Audio Setup
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            mediaStreamRef.current = stream;
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioCtx({
                sampleRate: 16000
            });
            outContextRef.current = new AudioCtx({
                sampleRate: 24000
            });
            const ctx = audioContextRef.current;
            const source = ctx.createMediaStreamSource(stream);
            const analyserNode = ctx.createAnalyser();
            analyserNode.fftSize = 1024; // High res for visuals
            source.connect(analyserNode);
            setAnalyser(analyserNode);
            const processor = ctx.createScriptProcessor(4096, 1, 1);
            cleanupRefs.current = {
                source,
                processor
            };
            source.connect(processor);
            processor.connect(ctx.destination);
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modality"].AUDIO
                    ],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: selectedVoice
                            }
                        }
                    },
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
                    tools: TOOLS
                },
                callbacks: {
                    onopen: ()=>{
                        setIsActive(true);
                        setConnectionState('connected');
                        setMode('listening');
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
                        processor.onaudioprocess = (e)=>{
                            const input = e.inputBuffer.getChannelData(0);
                            sessionPromise.then((s)=>s.sendRealtimeInput({
                                    media: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPcmBlob"])(input)
                                }));
                        };
                    },
                    onmessage: async (msg)=>{
                        // TOOL CALLS
                        if (msg.toolCall) {
                            for (const fc of msg.toolCall.functionCalls){
                                const taskId = addTask(fc.name);
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
                                let result = {
                                    status: 'OK'
                                };
                                try {
                                    switch(fc.name){
                                        case 'change_view':
                                            onNavigate(fc.args.view);
                                            result = {
                                                info: `View switched to ${fc.args.view}`
                                            };
                                            break;
                                        case 'nexus_interaction':
                                            onAction?.('nexus_interaction', fc.args);
                                            result = {
                                                info: `Agent ${fc.args.agentId} activated`
                                            };
                                            break;
                                        case 'system_diagnostic':
                                            // Simulation de retour diagnostic temps réel
                                            result = {
                                                cpu: "34%",
                                                memory: "12TB/50TB",
                                                status: "NOMINAL",
                                                threats: "0 ACTIVE",
                                                integrity: "99.9%"
                                            };
                                            break;
                                        case 'consult_archives':
                                            const memories = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$memory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memory"].retrieveContext(3);
                                            result = {
                                                found: memories || "Aucune donnée récente."
                                            };
                                            break;
                                        case 'configure_map':
                                            onAction?.('update_map_config', fc.args);
                                            break;
                                        case 'scan_map_sector':
                                            onMapQuery(fc.args.query);
                                            break;
                                        case 'open_search_portal':
                                            onVoiceSearch(fc.args.query);
                                            break;
                                        case 'trigger_evolution':
                                            onAction?.('trigger_mutation');
                                            break;
                                        case 'generate_visual':
                                            onVoiceVisualize(fc.args.prompt, fc.args.type);
                                            break;
                                        case 'security_override':
                                            if (fc.args.action === 'killswitch') onNavigate('killswitch');
                                            else onNavigate('threats');
                                            break;
                                        case 'system_control':
                                            onAction?.('system_control', fc.args);
                                            result = {
                                                info: `System Action: ${fc.args.action} EXECUTED.`
                                            };
                                            break;
                                        case 'visualizer_control':
                                            onAction?.('update_vis_config', fc.args);
                                            result = {
                                                info: "Visualizer parameters updated."
                                            };
                                            break;
                                        case 'threat_defense':
                                            onAction?.('threat_defense', fc.args);
                                            onNavigate('threats');
                                            result = {
                                                info: `Defense Protocol ${fc.args.mode} ACTIVE.`
                                            };
                                            break;
                                    }
                                    updateTask(taskId, 'DONE');
                                } catch (err) {
                                    console.error("Tool Execution Failed", err);
                                    updateTask(taskId, 'FAILED');
                                    result = {
                                        error: "Execution Failed"
                                    };
                                }
                                sessionPromise.then((s)=>s.sendToolResponse({
                                        functionResponses: {
                                            id: fc.id,
                                            name: fc.name,
                                            response: {
                                                result
                                            }
                                        }
                                    }));
                            }
                        }
                        // AUDIO OUTPUT
                        const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (audioData && outContextRef.current) {
                            setMode('speaking');
                            const ctx = outContextRef.current;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                            const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeAudioData"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$utils$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"])(audioData), ctx, 24000, 1);
                            const source = ctx.createBufferSource();
                            source.buffer = buffer;
                            source.connect(ctx.destination);
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += buffer.duration;
                            source.onended = ()=>setMode('listening');
                        }
                        // TRANSCRIPTIONS
                        if (msg.serverContent?.inputTranscription?.text) {
                            setTranscriptions((prev)=>[
                                    ...prev,
                                    {
                                        role: 'user',
                                        text: msg.serverContent.inputTranscription.text
                                    }
                                ]);
                        }
                        if (msg.serverContent?.outputTranscription?.text) {
                            setTranscriptions((prev)=>[
                                    ...prev,
                                    {
                                        role: 'model',
                                        text: msg.serverContent.outputTranscription.text
                                    }
                                ]);
                        }
                    },
                    onclose: ()=>stopSession(),
                    onerror: ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playAlert();
                        stopSession();
                    }
                }
            });
            sessionRef.current = await sessionPromise;
        } catch (err) {
            console.error(err);
            alert("Erreur de connexion au noyau vocal.");
            stopSession();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full animate-fadeIn relative overflow-hidden bg-black/95",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] transition-all duration-1000 ${isActive ? 'bg-blue-900/20' : 'bg-transparent'}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,6px_100%] pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 540,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex justify-between items-center p-6 border-b border-white/5 relative z-20 bg-black/40 backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl md:text-3xl font-bold font-heading italic flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-colors ${isActive ? 'bg-blue-500 text-blue-500' : 'bg-red-900 text-red-900'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: isActive ? 'text-blue-100' : 'text-gray-600',
                                        children: [
                                            "GENESIS ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-500",
                                                children: "OMEGA"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 548,
                                                columnNumber: 84
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mt-1",
                                children: "Interface Vocale Centrale v9.0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 550,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex gap-1 bg-black/60 p-1 rounded-xl border border-white/10",
                                children: VOICES.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>!isActive && setSelectedVoice(v.id),
                                        disabled: isActive,
                                        className: `px-4 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${selectedVoice === v.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'} disabled:opacity-50`,
                                        children: v.label
                                    }, v.id, false, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-4 py-2 rounded-lg border text-[10px] font-mono font-bold ${isActive ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`,
                                children: connectionState.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-4 md:p-8 min-h-0 relative z-10 overflow-y-auto lg:overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-3 lg:order-1 lg:col-span-3 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-3xl bg-black/60 border border-white/10 lg:h-1/2 flex flex-col min-h-[200px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 94
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 574,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Processus Actifs"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 573,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 overflow-y-auto custom-scrollbar space-y-2",
                                        children: [
                                            activeTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-700 font-mono italic text-center mt-10",
                                                children: "... STANDBY ..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 578,
                                                columnNumber: 44
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            activeTasks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 animate-slideIn",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                t.status === 'RUNNING' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-amber-500 rounded-full animate-ping"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                                    lineNumber: 583,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)) : t.status === 'DONE' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-green-500 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                                    lineNumber: 585,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-red-500 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                                    lineNumber: 586,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-mono text-gray-300 uppercase",
                                                                    children: t.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                                    lineNumber: 588,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[9px] font-bold ${t.status === 'DONE' ? 'text-green-500' : t.status === 'FAILED' ? 'text-red-500' : 'text-amber-500'}`,
                                                            children: t.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                            lineNumber: 590,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, t.id, true, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 577,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-6 rounded-3xl bg-black/60 border border-white/10 lg:h-1/2 flex flex-col justify-end relative overflow-hidden min-h-[150px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 597,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-500 uppercase tracking-widest mb-1",
                                                children: "Mode Opératoire"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 599,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-2xl font-bold font-heading uppercase ${mode === 'listening' ? 'text-blue-400' : mode === 'speaking' ? 'text-green-400' : mode === 'processing' ? 'text-purple-400' : 'text-gray-600'}`,
                                                children: mode
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 600,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1 w-full bg-gray-900 rounded-full mt-4 overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-full transition-all duration-300 ${mode === 'listening' ? 'w-1/3 bg-blue-500 animate-pulse' : mode === 'processing' ? 'w-2/3 bg-purple-500 animate-pulse' : mode === 'speaking' ? 'w-full bg-green-500' : 'w-0'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 607,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 606,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 598,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 596,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-1 lg:order-2 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[300px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full aspect-square max-w-[600px] relative flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-0 opacity-80",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralCoreVisualizer, {
                                        analyser: analyser,
                                        isActive: isActive,
                                        isTalking: mode === 'speaking',
                                        mode: mode
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 621,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                    lineNumber: 620,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: isActive ? stopSession : startSession,
                                    disabled: connectionState === 'connecting',
                                    className: `relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm group ${isActive ? 'border border-blue-500/30 bg-blue-900/10 shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:bg-red-900/20 hover:border-red-500/50' : 'border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `absolute inset-0 rounded-full border-2 border-dashed border-white/20 ${connectionState === 'connecting' ? 'animate-spin-slow' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                            lineNumber: 633,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        connectionState === 'connecting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 border-2 border-t-transparent border-blue-400 rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[8px] uppercase tracking-widest text-blue-400",
                                                    children: "Sync..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                            lineNumber: 636,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center group-hover:scale-110 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-bold text-blue-300 mb-1 group-hover:hidden",
                                                    children: "EN LIGNE"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 642,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden group-hover:block text-xs font-bold text-red-400",
                                                    children: "ARRÊT"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[9px] text-blue-500/60 font-mono",
                                                    children: activeTasks.length > 0 ? 'OCCUPÉ' : 'PRÊT'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 644,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                            lineNumber: 641,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl mb-1 opacity-80",
                                                    children: "⏻"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 648,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] font-bold text-gray-400 uppercase tracking-widest",
                                                    children: "INITIALISER"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 649,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                            lineNumber: 647,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                    lineNumber: 625,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                            lineNumber: 618,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-2 lg:order-3 lg:col-span-3 glass rounded-[2rem] bg-black/60 border border-white/10 flex flex-col overflow-hidden relative min-h-[300px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 border-b border-white/5 bg-white/5 flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest",
                                        children: "Flux de Données"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 659,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTranscriptions([]),
                                        className: "text-[9px] text-gray-600 hover:text-white uppercase font-bold transition-colors",
                                        children: "Effacer"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 660,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 658,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollRef,
                                className: "flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 scroll-smooth",
                                children: [
                                    transcriptions.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex flex-col gap-1 ${t.role === 'user' ? 'items-end' : 'items-start'} animate-slideIn`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-[8px] font-bold uppercase tracking-widest px-2 ${t.role === 'user' ? 'text-blue-500' : 'text-purple-500'}`,
                                                    children: t.role === 'user' ? 'ADMIN' : 'OMEGA'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `p-4 rounded-xl max-w-[95%] text-xs font-mono leading-relaxed border shadow-lg ${t.role === 'user' ? 'bg-blue-900/10 border-blue-500/20 text-blue-100 rounded-tr-none' : 'bg-[#151515] border-white/10 text-gray-300 rounded-tl-none'}`,
                                                    children: t.text
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                            lineNumber: 665,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    transcriptions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full flex flex-col items-center justify-center opacity-30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 border border-white/20 rounded-lg flex items-center justify-center mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-1 bg-white rounded-full mx-1 animate-bounce",
                                                        style: {
                                                            animationDelay: '0s'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                        lineNumber: 680,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-1 bg-white rounded-full mx-1 animate-bounce",
                                                        style: {
                                                            animationDelay: '0.1s'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                        lineNumber: 681,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1 h-1 bg-white rounded-full mx-1 animate-bounce",
                                                        style: {
                                                            animationDelay: '0.2s'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 679,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-mono uppercase tracking-widest",
                                                children: "En attente de transmission..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                                lineNumber: 684,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                        lineNumber: 678,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                        lineNumber: 657,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
                lineNumber: 568,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/LiveSession.tsx",
        lineNumber: 536,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LiveSession;
}),
];

//# sourceMappingURL=Desktop_genesis_82c53028._.js.map