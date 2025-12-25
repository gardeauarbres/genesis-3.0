module.exports = [
"[project]/Desktop/genesis/components/GlobalMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/geminiService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/services/sfx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/genesis/node_modules/leaflet/dist/leaflet-src.js [app-ssr] (ecmascript)");
;
;
;
;
;
// Grille Hexagonale "Honeycomb"
const TacticalGrid = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "absolute inset-0 w-full h-full pointer-events-none z-10 opacity-20",
        width: "100%",
        height: "100%",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                    id: "hex-grid",
                    width: "40",
                    height: "68",
                    patternUnits: "userSpaceOnUse",
                    patternTransform: "scale(1.5)",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M20 0 L40 17 L40 51 L20 68 L0 51 L0 17 Z",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "0.5",
                        className: "text-blue-500/60"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                    lineNumber: 52,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 51,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "100%",
                height: "100%",
                fill: "url(#hex-grid)"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 56,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 40 0 V 40 H 0",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                className: "text-blue-400",
                transform: "translate(40, 40)"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 0 0 V 40 H -40",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                className: "text-blue-400",
                transform: "translate(calc(100% - 40px), 40)"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 40 0 V -40 H 0",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                className: "text-blue-400",
                transform: "translate(40, calc(100% - 40px))"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 0 0 V -40 H -40",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                className: "text-blue-400",
                transform: "translate(calc(100% - 40px), calc(100% - 40px))"
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 62,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// Effet Radar/Sonar Rotatif
const RadarSweep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[150vmax] h-[150vmax] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(59,130,246,0.1)_360deg)] animate-[radar_4s_linear_infinite] rounded-full opacity-50"
        }, void 0, false, {
            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
            lineNumber: 69,
            columnNumber: 6
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const GlobalMap = ({ initialQuery, externalConfig, activeTrajectory, onConsumed })=>{
    // États
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Infrastructures PQC Critiques');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [markers, setMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [analysisZones, setAnalysisZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentZoom, setCurrentZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3);
    const [activeLayer, setActiveLayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('lattice');
    // États V2
    const [activeFilters, setActiveFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        'server',
        'relay',
        'quantum'
    ]);
    const [inspectorOpen, setInspectorOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // États Utilisateur & Ghost Mode
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ghostMode, setGhostMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMarker, setSelectedMarker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Menu Contextuel
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        lat: 0,
        lng: 0,
        visible: false
    });
    // Refs
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const layersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialisation Query
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialQuery) {
            setQuery(initialQuery);
            handleSearch(initialQuery);
            onConsumed?.();
        }
    }, [
        initialQuery
    ]);
    // --- REACTION AUX COMMANDES VOCALES EXTERNES ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (externalConfig) {
            if (externalConfig.layer && externalConfig.layer !== activeLayer) {
                setActiveLayer(externalConfig.layer);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
            }
            if (externalConfig.ghostMode !== undefined && externalConfig.ghostMode !== ghostMode) {
                setGhostMode(externalConfig.ghostMode);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playBlip();
            }
            if (externalConfig.filters) {
                setActiveFilters(externalConfig.filters);
            }
        }
    }, [
        externalConfig
    ]);
    // --- GESTION DES TRAJECTOIRES MENACES ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (activeTrajectory && layersRef.current && mapRef.current) {
            const { threats } = layersRef.current;
            threats.clearLayers();
            const latlngs = activeTrajectory.coordinates;
            const path = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].polyline(latlngs, {
                color: '#ef4444',
                weight: 3,
                className: 'threat-line',
                opacity: 0.8
            }).addTo(threats);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].circleMarker(latlngs[0], {
                radius: 6,
                color: '#ef4444',
                fillColor: '#000',
                fillOpacity: 1
            }).addTo(threats).bindPopup(`ORIGINE: ${activeTrajectory.originLabel}`);
            const endPoint = latlngs[latlngs.length - 1];
            const pulseIcon = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].divIcon({
                className: 'bg-transparent',
                html: `<div class="w-8 h-8 rounded-full border-2 border-red-500 bg-red-500/20 animate-ping"></div>`,
                iconSize: [
                    32,
                    32
                ],
                iconAnchor: [
                    16,
                    16
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].marker(endPoint, {
                icon: pulseIcon
            }).addTo(threats);
            mapRef.current.fitBounds(path.getBounds(), {
                padding: [
                    50,
                    50
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playAlert();
        }
    }, [
        activeTrajectory
    ]);
    // Géolocalisation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!navigator.geolocation) return;
        const watchId = navigator.geolocation.watchPosition((position)=>{
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }, (error)=>console.warn("Erreur GPS:", error), {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
        return ()=>navigator.geolocation.clearWatch(watchId);
    }, []);
    // --- MAP SETUP ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapContainerRef.current) return;
        if (!mapRef.current) {
            const map = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].map(mapContainerRef.current, {
                center: [
                    46.2276,
                    2.2137
                ],
                zoom: 3,
                minZoom: 2,
                maxZoom: 18,
                zoomControl: false,
                attributionControl: false,
                renderer: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].canvas()
            });
            mapRef.current = map;
            const latticeTiles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                opacity: 1,
                attribution: '&copy; CARTO'
            });
            const satelliteTiles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 18,
                opacity: 1,
                attribution: 'Tiles &copy; Esri'
            });
            const thermalTiles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                opacity: 1,
                attribution: '&copy; CARTO',
                className: 'thermal-tiles'
            });
            latticeTiles.addTo(map);
            layersRef.current = {
                base: latticeTiles,
                satellite: satelliteTiles,
                thermal: thermalTiles,
                analysis: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map),
                connections: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map),
                markers: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map),
                user: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map),
                threats: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map)
            };
            map.on('zoomend', ()=>setCurrentZoom(map.getZoom()));
            map.on('contextmenu', (e)=>{
                setContextMenu({
                    x: e.containerPoint.x,
                    y: e.containerPoint.y,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    visible: true
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playBlip();
            });
            map.on('click', ()=>{
                setContextMenu((prev)=>({
                        ...prev,
                        visible: false
                    }));
            });
            if (!initialQuery) simulateInitialNetwork();
        }
    }, []);
    // --- LAYER SWITCHING LOGIC ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapRef.current || !layersRef.current) return;
        const { base, satellite, thermal, connections } = layersRef.current;
        mapRef.current.removeLayer(base);
        mapRef.current.removeLayer(satellite);
        mapRef.current.removeLayer(thermal);
        if (activeLayer === 'optical') {
            mapRef.current.addLayer(satellite);
            connections.clearLayers();
        } else if (activeLayer === 'thermal') {
            mapRef.current.addLayer(thermal);
            if (analysisZones.length === 0) handleAnalyzeSector();
        } else {
            mapRef.current.addLayer(base);
        }
    }, [
        activeLayer
    ]);
    // --- RENDU UTILISATEUR & GHOST MODE ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!layersRef.current || !mapRef.current) return;
        const { user: userLayer } = layersRef.current;
        userLayer.clearLayers();
        if (userLocation && !ghostMode) {
            const userIcon = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].divIcon({
                className: 'bg-transparent',
                html: `
          <div class="relative w-full h-full flex items-center justify-center">
            <div class="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping"></div>
            <div class="w-4 h-4 bg-cyan-400 border-2 border-white rounded-full shadow-[0_0_20px_#22d3ee]"></div>
          </div>
        `,
                iconSize: [
                    40,
                    40
                ],
                iconAnchor: [
                    20,
                    20
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].marker([
                userLocation.lat,
                userLocation.lng
            ], {
                icon: userIcon,
                zIndexOffset: 1000
            }).addTo(userLayer);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].circle([
                userLocation.lat,
                userLocation.lng
            ], {
                radius: 1000000,
                color: '#22d3ee',
                weight: 1,
                fillOpacity: 0.05,
                dashArray: '10, 10'
            }).addTo(userLayer);
        }
    }, [
        userLocation,
        ghostMode
    ]);
    // --- RENDU MARQUEURS & CONNEXIONS ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!layersRef.current || !mapRef.current) return;
        const { markers: markerLayer, connections: connectionLayer } = layersRef.current;
        markerLayer.clearLayers();
        connectionLayer.clearLayers();
        const filteredMarkers = markers.filter((m)=>activeFilters.includes(m.type));
        const showConnections = activeLayer === 'lattice';
        const isThermal = activeLayer === 'thermal';
        if (showConnections && filteredMarkers.length > 0) {
            filteredMarkers.forEach((m1)=>{
                const nearest = filteredMarkers.filter((m2)=>m2.id !== m1.id).map((m2)=>({
                        m: m2,
                        dist: Math.sqrt(Math.pow(m1.lat - m2.lat, 2) + Math.pow(m1.lng - m2.lng, 2))
                    })).sort((a, b)=>a.dist - b.dist).slice(0, 2);
                nearest.forEach((n)=>{
                    const line = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].polyline([
                        [
                            m1.lat,
                            m1.lng
                        ],
                        [
                            n.m.lat,
                            n.m.lng
                        ]
                    ], {
                        color: m1.type === 'quantum' || n.m.type === 'quantum' ? '#a855f7' : '#3b82f6',
                        weight: 1.5,
                        opacity: 0.6,
                        dashArray: '5, 10',
                        className: 'data-stream-line'
                    });
                    line.addTo(connectionLayer);
                });
            });
        }
        filteredMarkers.forEach((marker)=>{
            let colorClass = '';
            let shadowClass = '';
            let markerHtml = '';
            if (isThermal) {
                const heatColor = marker.traffic > 5 ? 'bg-red-500' : marker.traffic > 2 ? 'bg-orange-500' : 'bg-yellow-500';
                const heatShadow = marker.traffic > 5 ? 'shadow-[0_0_20px_#ef4444]' : 'shadow-[0_0_15px_#f97316]';
                markerHtml = `
            <div class="relative w-full h-full flex items-center justify-center group cursor-pointer hover:scale-150 transition-transform duration-200">
               <div class="absolute inset-0 ${heatColor} blur-md opacity-80 animate-pulse"></div>
               <div class="w-2 h-2 ${heatColor} rounded-full border border-white ${heatShadow}"></div>
               <div class="absolute -top-6 bg-black/90 text-red-500 font-bold border border-red-500/50 text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                  ${marker.traffic} GB/s
               </div>
            </div>
         `;
            } else {
                const isQuantum = marker.type === 'quantum';
                colorClass = isQuantum ? 'bg-purple-500' : marker.type === 'server' ? 'bg-green-500' : 'bg-blue-500';
                shadowClass = isQuantum ? 'shadow-[0_0_15px_#a855f7]' : marker.type === 'server' ? 'shadow-[0_0_15px_#22c55e]' : 'shadow-[0_0_15px_#3b82f6]';
                markerHtml = `
            <div class="relative w-full h-full flex items-center justify-center group cursor-pointer hover:scale-125 transition-transform duration-300">
               <div class="absolute inset-0 ${colorClass}/30 rounded-full animate-pulse"></div>
               <div class="w-3 h-3 ${colorClass} border border-white rotate-45 ${shadowClass} group-hover:rotate-90 transition-transform"></div>
               <div class="absolute -top-6 bg-black/80 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 whitespace-nowrap z-50 pointer-events-none">
                  ${marker.name}
               </div>
            </div>
         `;
            }
            const icon = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].divIcon({
                className: 'bg-transparent',
                html: markerHtml,
                iconSize: [
                    24,
                    24
                ],
                iconAnchor: [
                    12,
                    12
                ]
            });
            const m = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].marker([
                marker.lat,
                marker.lng
            ], {
                icon
            });
            m.on('click', ()=>{
                setSelectedMarker(marker);
                setInspectorOpen(true);
                mapRef.current?.flyTo([
                    marker.lat,
                    marker.lng
                ], 13, {
                    animate: true,
                    duration: 1.5
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
                window.dispatchEvent(new CustomEvent('genesis-interaction', {
                    detail: 'LOCK TARGET: ' + marker.name
                }));
            });
            m.addTo(markerLayer);
        });
    }, [
        markers,
        activeLayer,
        activeFilters
    ]);
    const handleAnalyzeSector = async ()=>{
        if (!mapRef.current) return;
        setLoading(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
        const bounds = mapRef.current.getBounds();
        try {
            const zones = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].analyzeGeospatialSector({
                north: bounds.getNorth(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                west: bounds.getWest()
            }, query);
            setAnalysisZones(zones);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        } catch (e) {
            console.error(e);
        } finally{
            setLoading(false);
        }
    };
    const simulateInitialNetwork = ()=>{
        const nodes = Array.from({
            length: 12
        }).map((_, i)=>({
                id: `sim-${i}`,
                name: `Noeud ${[
                    'Alpha',
                    'Beta',
                    'Gamma',
                    'Delta'
                ][i % 4]}-${i}`,
                lat: 40 + (Math.random() * 30 - 15),
                lng: 2 + (Math.random() * 40 - 20),
                type: Math.random() > 0.8 ? 'quantum' : Math.random() > 0.5 ? 'server' : 'relay',
                integrity: Math.floor(80 + Math.random() * 20),
                latency: Math.floor(10 + Math.random() * 50),
                traffic: parseFloat((Math.random() * 10).toFixed(2))
            }));
        setMarkers(nodes);
    };
    const handleSearch = async (overrideQuery)=>{
        const activeQuery = overrideQuery || query;
        if (!activeQuery.trim()) return;
        setLoading(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].getMapGrounding(activeQuery);
            const locations = result.sources.filter((s)=>s.maps?.title).map((s)=>s.maps.title);
            let finalMarkers = [];
            if (locations.length > 0) {
                const coords = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].geocodeLocations(locations);
                finalMarkers = coords.map((c, i)=>({
                        id: `gen-real-${i}`,
                        name: c.name,
                        lat: c.lat,
                        lng: c.lng,
                        type: 'server',
                        integrity: 100,
                        latency: 15,
                        traffic: 2.5
                    }));
            } else {
                const simulatedCoords = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$geminiService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geminiService"].generateSimulatedLocations(activeQuery);
                finalMarkers = simulatedCoords.map((c, i)=>({
                        id: `gen-sim-${i}`,
                        name: c.name,
                        lat: c.lat,
                        lng: c.lng,
                        type: Math.random() > 0.5 ? 'quantum' : 'relay',
                        integrity: 95,
                        latency: 24,
                        traffic: 5.1
                    }));
            }
            setMarkers(finalMarkers);
            if (finalMarkers.length > 0 && mapRef.current) {
                const bounds = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].latLngBounds(finalMarkers.map((m)=>[
                        m.lat,
                        m.lng
                    ]));
                mapRef.current.fitBounds(bounds, {
                    padding: [
                        100,
                        100
                    ],
                    maxZoom: 10
                });
            }
            if (activeLayer === 'thermal') handleAnalyzeSector();
        } catch (e) {
            console.error(e);
        } finally{
            setLoading(false);
        }
    };
    const toggleGhostMode = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playConfirm();
        setGhostMode((prev)=>!prev);
    };
    const handleContextAction = (action)=>{
        setContextMenu((prev)=>({
                ...prev,
                visible: false
            }));
        if (action === 'scan') {
            mapRef.current?.setView([
                contextMenu.lat,
                contextMenu.lng
            ], 10, {
                animate: true
            });
            handleAnalyzeSector();
        } else if (action === 'marker') {
            setMarkers((prev)=>[
                    ...prev,
                    {
                        id: `user-${Date.now()}`,
                        name: 'Cible Tactique',
                        lat: contextMenu.lat,
                        lng: contextMenu.lng,
                        type: 'relay',
                        integrity: 100,
                        latency: 0,
                        traffic: 0
                    }
                ]);
        }
    };
    const handlePing = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playBlip();
        if (selectedMarker) {
            window.dispatchEvent(new CustomEvent('genesis-interaction', {
                detail: `PING_SEQUENCE -> ${selectedMarker.id} [${selectedMarker.latency}ms]`
            }));
            const updatedMarkers = markers.map((m)=>m.id === selectedMarker.id ? {
                    ...m,
                    latency: Math.max(1, m.latency - 2)
                } : m);
            setMarkers(updatedMarkers);
        }
    };
    const handleTrace = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$services$2f$sfx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sfx"].playData();
        if (selectedMarker && mapRef.current) {
            window.dispatchEvent(new CustomEvent('genesis-interaction', {
                detail: `TRACEROUTE -> ${selectedMarker.lat.toFixed(4)},${selectedMarker.lng.toFixed(4)}`
            }));
            const center = mapRef.current.getCenter();
            const traceLine = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].polyline([
                center,
                [
                    selectedMarker.lat,
                    selectedMarker.lng
                ]
            ], {
                color: '#ef4444',
                dashArray: '5, 10',
                weight: 2,
                opacity: 0.8
            }).addTo(layersRef.current.connections);
            setTimeout(()=>traceLine.remove(), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col relative overflow-hidden animate-fadeIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 p-4 z-0 pointer-events-none opacity-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t-2 border-r-2 border-blue-500/30 w-16 h-16 rounded-tr-3xl"
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                    lineNumber: 484,
                    columnNumber: 10
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 483,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 p-4 z-0 pointer-events-none opacity-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b-2 border-l-2 border-blue-500/30 w-16 h-16 rounded-bl-3xl"
                }, void 0, false, {
                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                    lineNumber: 487,
                    columnNumber: 10
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-end relative z-20 mb-4 px-2 gap-4 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl md:text-3xl font-bold font-heading mb-1 text-white flex items-center gap-3 drop-shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `w-3 h-3 rounded-sm ${loading ? 'bg-amber-500 animate-spin' : activeLayer === 'thermal' ? 'bg-red-500' : 'bg-blue-600'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 494,
                                        columnNumber: 14
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Genesis Earth Engine"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 text-xs font-mono bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 w-fit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-400",
                                        children: [
                                            "LAYER: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `uppercase font-bold ${activeLayer === 'optical' ? 'text-green-400' : activeLayer === 'thermal' ? 'text-red-500' : 'text-blue-400'}`,
                                                children: activeLayer
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                lineNumber: 498,
                                                columnNumber: 53
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 498,
                                        columnNumber: 14
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-400",
                                        children: [
                                            "NODES: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-400 uppercase font-bold",
                                                children: markers.length
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                lineNumber: 499,
                                                columnNumber: 53
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 499,
                                        columnNumber: 14
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 497,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-4 items-start md:items-end w-full md:w-auto pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleGhostMode,
                                className: `px-4 py-2 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 ${ghostMode ? 'bg-emerald-900/80 text-emerald-400 border-emerald-500/50 hover:bg-emerald-900' : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-400'}`,
                                children: ghostMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 512,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " GHOST ACTIVE"
                                    ]
                                }, void 0, true) : 'GHOST: OFF'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex bg-black/80 rounded-xl border border-white/10 p-1 backdrop-blur shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveLayer('lattice'),
                                        className: `px-4 py-2 rounded-lg text-[10px] uppercase font-bold transition-all ${activeLayer === 'lattice' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-gray-500 hover:text-white'}`,
                                        children: "Lattice"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 516,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveLayer('optical'),
                                        className: `px-4 py-2 rounded-lg text-[10px] uppercase font-bold transition-all ${activeLayer === 'optical' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'text-gray-500 hover:text-white'}`,
                                        children: "Optical"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 517,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveLayer('thermal'),
                                        className: `px-4 py-2 rounded-lg text-[10px] uppercase font-bold transition-all ${activeLayer === 'thermal' ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' : 'text-gray-500 hover:text-white'}`,
                                        children: "Thermal"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 518,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 515,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 bg-black/80 p-1.5 rounded-xl border border-white/10 shadow-xl w-full md:w-auto backdrop-blur",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: query,
                                        onChange: (e)=>setQuery(e.target.value),
                                        onKeyDown: (e)=>e.key === 'Enter' && handleSearch(),
                                        className: "bg-transparent border-none outline-none text-sm font-mono text-blue-100 w-full md:w-48 placeholder-gray-600",
                                        placeholder: "SCAN COORDONNÉES..."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 522,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSearch(),
                                        disabled: loading,
                                        className: "px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase rounded-lg shadow-lg",
                                        children: "SCAN"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 523,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 521,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                        lineNumber: 503,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex gap-6 min-h-0 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute z-30 glass border-white/10 bg-black/90 backdrop-blur-xl transition-all duration-500 shadow-2xl flex flex-col overflow-hidden
             /* Mobile: Bottom Sheet */
             inset-x-0 bottom-0 h-[60vh] rounded-t-3xl border-t
             ${selectedMarker && inspectorOpen ? 'translate-y-0' : 'translate-y-[120%]'}
             
             /* Desktop: Side Panel (Override Mobile styles) */
             md:inset-x-auto md:inset-y-4 md:right-4 md:w-80 md:h-auto md:rounded-3xl md:border md:translate-y-0
             ${selectedMarker && inspectorOpen ? 'md:translate-x-0' : 'md:translate-x-[150%]'}
         `,
                        children: selectedMarker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-transparent",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-white uppercase font-heading",
                                                    children: selectedMarker.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setInspectorOpen(false),
                                                    className: "text-gray-500 hover:text-white",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-5 h-5",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M6 18L18 6M6 6l12 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 545,
                                                            columnNumber: 199
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 120
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 543,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-[9px] px-2 py-0.5 rounded font-bold uppercase ${selectedMarker.type === 'quantum' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`,
                                                    children: [
                                                        selectedMarker.type,
                                                        " NODE"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 30
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] px-2 py-0.5 rounded font-bold uppercase bg-gray-700 text-gray-300",
                                                    children: "ONLINE"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 30
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 547,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                    lineNumber: 542,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-[10px] text-gray-400 uppercase font-bold mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Intégrité Chiffrement"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                                    lineNumber: 557,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-400",
                                                                    children: [
                                                                        selectedMarker.integrity,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                                    lineNumber: 558,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-1 bg-gray-800 rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-green-500 shadow-[0_0_10px_#22c55e]",
                                                                style: {
                                                                    width: `${selectedMarker.integrity}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 555,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-[10px] text-gray-400 uppercase font-bold mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Latence Réseau"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                                    lineNumber: 566,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-blue-400",
                                                                    children: [
                                                                        selectedMarker.latency,
                                                                        "ms"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                                    lineNumber: 567,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-1 bg-gray-800 rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-blue-500",
                                                                style: {
                                                                    width: `${Math.min(100, selectedMarker.latency / 100 * 100)}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                                lineNumber: 570,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 554,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-black/40 rounded-xl border border-white/5 p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[9px] text-gray-500 uppercase font-bold mb-2",
                                                    children: "Flux de Données"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[10px] text-blue-300 space-y-1 opacity-70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ">> ACK_SYN packet received"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 578,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ">> PQC_Handshake_Complete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 579,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: [
                                                                ">> Traffic: ",
                                                                selectedMarker.traffic,
                                                                " GB/s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 580,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "animate-pulse",
                                                            children: ">> Listening..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 575,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white/5 p-2 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[8px] text-gray-500 uppercase",
                                                            children: "Latitude"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 34
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-mono text-white",
                                                            children: selectedMarker.lat.toFixed(4)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 588,
                                                            columnNumber: 34
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 30
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white/5 p-2 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[8px] text-gray-500 uppercase",
                                                            children: "Longitude"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 591,
                                                            columnNumber: 34
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-mono text-white",
                                                            children: selectedMarker.lng.toFixed(4)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 34
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 30
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 585,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                    lineNumber: 553,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border-t border-white/10 bg-black/20 grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handlePing,
                                            className: "py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                                            children: "PING"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 598,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleTrace,
                                            className: "py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                                            children: "TRACE"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 599,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                    lineNumber: 597,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                        lineNumber: 531,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 rounded-3xl relative overflow-hidden border border-white/10 bg-gray-900 shadow-2xl group",
                        children: [
                            activeLayer !== 'optical' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TacticalGrid, {}, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 609,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadarSweep, {}, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 610,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true),
                            activeLayer !== 'optical' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 615,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: mapContainerRef,
                                className: "w-full h-full z-0 outline-none"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 618,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0)),
                            contextMenu.visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute z-[100] bg-black/90 border border-blue-500/30 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] p-1 min-w-[160px] animate-fadeIn backdrop-blur-md",
                                style: {
                                    left: contextMenu.x,
                                    top: contextMenu.y
                                },
                                onMouseLeave: ()=>setContextMenu((prev)=>({
                                            ...prev,
                                            visible: false
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleContextAction('scan'),
                                        className: "w-full text-left px-3 py-2 text-[10px] text-blue-300 hover:bg-blue-600/20 hover:text-white rounded flex items-center gap-2 uppercase font-bold tracking-wider",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-3 h-3",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 104
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                lineNumber: 628,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Scanner Secteur"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 627,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleContextAction('marker'),
                                        className: "w-full text-left px-3 py-2 text-[10px] text-green-300 hover:bg-green-600/20 hover:text-white rounded flex items-center gap-2 uppercase font-bold tracking-wider",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-3 h-3",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 104
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                                lineNumber: 632,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Marquer Cible"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 631,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px bg-white/10 my-1"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 635,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1 text-[8px] font-mono text-gray-500 text-center",
                                        children: [
                                            contextMenu.lat.toFixed(4),
                                            ", ",
                                            contextMenu.lng.toFixed(4)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                        lineNumber: 636,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 622,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_#3b82f6]"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 645,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-blue-400 font-mono text-xs uppercase tracking-widest animate-pulse",
                                            children: "Triangulation Satellite..."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                            lineNumber: 646,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                    lineNumber: 644,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                                lineNumber: 643,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                        lineNumber: 606,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 529,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$genesis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .leaflet-container { background: #0a0a0a !important; font-family: 'Space Grotesk', sans-serif !important; }
        .leaflet-div-icon { background: transparent; border: none; }
        .data-stream-line {
            stroke-dasharray: 5, 10;
            animation: dash 1s linear infinite;
        }
        .threat-line {
            stroke-dasharray: 10, 20;
            animation: dash 0.5s linear infinite;
            filter: drop-shadow(0 0 5px #ef4444);
        }
        .thermal-tiles {
            filter: contrast(120%) brightness(80%) saturate(150%) hue-rotate(320deg);
        }
        @keyframes dash {
            to { stroke-dashoffset: -30; }
        }
        @keyframes radar {
           0% { transform: rotate(0deg); }
           100% { transform: rotate(360deg); }
        }
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
                lineNumber: 653,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/genesis/components/GlobalMap.tsx",
        lineNumber: 481,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GlobalMap;
}),
];

//# sourceMappingURL=Desktop_genesis_components_GlobalMap_tsx_af6e5953._.js.map