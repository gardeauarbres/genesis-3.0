
import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { sfx } from '../services/sfx';

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [config, setConfig] = useState(adminService.getConfig());
    const [unsaved, setUnsaved] = useState(false);
    const [appwriteStatus, setAppwriteStatus] = useState<'CONNECTÉ' | 'NON CONNECTÉ' | 'VÉRIFICATION...'>('NON CONNECTÉ');

    useEffect(() => {
        // Sound effect on mount
        sfx.playConfirm();
        checkAppwriteConnection();
    }, []);

    const checkAppwriteConnection = async () => {
        setAppwriteStatus('VÉRIFICATION...');
        try {
            // Force re-init with current config
            const current = adminService.getConfig().appwrite;
            if (current.isActive && current.projectId) {
                // On tente une connexion simple (ex: list documents ou verifyConnection)
                const { appwriteService } = await import('../services/appwriteService'); // Import dynamique pour éviter les cycles
                appwriteService.init(current.projectId, current.endpoint);
                const result = await appwriteService.verifyConnection();
                setAppwriteStatus(result.success ? 'CONNECTÉ' : 'NON CONNECTÉ');
            } else {
                setAppwriteStatus('NON CONNECTÉ');
            }
        } catch (e) {
            setAppwriteStatus('NON CONNECTÉ');
        }
    };

    const handleChange = (section: 'gemini' | 'groq' | 'appwrite' | 'vertex', field: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        setUnsaved(true);
        sfx.playBlip();
    };

    const handleSave = async () => {
        adminService.saveConfig(config);
        setUnsaved(false);
        sfx.playConfirm();
        await checkAppwriteConnection();
        alert("CONFIGURATION GLOBALE MISE À JOUR. Les modules se reconnectent...");
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black text-white font-mono flex flex-col animate-fadeIn">
            {/* Header */}
            <div className="bg-red-900/20 border-b border-red-500/50 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.2em] text-red-500">Panneau Administration Maître</h1>
                        <p className="text-xs text-red-300">NIVEAU D'ACCRÉDITATION : OMEGA // CONTRÔLE CENTRALISÉ DES API</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="px-6 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded uppercase font-bold text-xs transition-colors"
                >
                    Déconnexion Sécurisée
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 custom-scrollbar">

                {/* GEMINI */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            NOYAU GEMINI
                        </h2>
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-3 text-xs font-bold uppercase text-gray-500">État Global</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={config.gemini.isActive} onChange={(e) => handleChange('gemini', 'isActive', e.target.checked)} />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${config.gemini.isActive ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${config.gemini.isActive ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Clé API Maître (Google AI Studio)</label>
                            <input
                                type="password"
                                value={config.gemini.key}
                                onChange={(e) => handleChange('gemini', 'key', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-blue-100 font-mono"
                                placeholder="Insérer la clé centrale..."
                            />
                        </div>
                        <p className="text-[10px] text-gray-500">Si activé, tous les utilisateurs utiliseront cette clé. Sinon, ils devront fournir la leur.</p>
                    </div>
                </div>

                {/* GROQ */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-orange-400 flex items-center gap-2">
                            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                            PROCESSEUR LPU (GROQ)
                        </h2>
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-3 text-xs font-bold uppercase text-gray-500">État Global</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={config.groq.isActive} onChange={(e) => handleChange('groq', 'isActive', e.target.checked)} />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${config.groq.isActive ? 'bg-orange-600' : 'bg-gray-700'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${config.groq.isActive ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Clé API Maître (Groq Cloud)</label>
                            <input
                                type="password"
                                value={config.groq.key}
                                onChange={(e) => handleChange('groq', 'key', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-orange-500 outline-none text-orange-100 font-mono"
                                placeholder="gsk_..."
                            />
                        </div>
                    </div>
                </div>

                {/* VERTEX AI */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            INFRASTRUCTURE GOOGLE CLOUD (VERTEX AI)
                        </h2>
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-3 text-xs font-bold uppercase text-gray-500">État Global</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={config.vertex.isActive} onChange={(e) => handleChange('vertex', 'isActive', e.target.checked)} />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${config.vertex.isActive ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${config.vertex.isActive ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Google Cloud Project ID</label>
                            <input
                                type="text"
                                value={config.vertex.projectId}
                                onChange={(e) => handleChange('vertex', 'projectId', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-purple-500 outline-none text-purple-100 font-mono"
                                placeholder="ex: genesis-core-v1"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Region (Location)</label>
                            <input
                                type="text"
                                value={config.vertex.location}
                                onChange={(e) => handleChange('vertex', 'location', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-purple-500 outline-none text-purple-100 font-mono"
                                placeholder="ex: us-central1"
                            />
                        </div>
                    </div>
                </div>

                {/* APPWRITE */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2">
                            <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                            MÉMOIRE DISTRIBUÉE (APPWRITE)
                        </h2>
                        <div className={`text-[10px] font-bold px-2 py-1 rounded border ${appwriteStatus === 'CONNECTÉ' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                            {appwriteStatus}
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-3 text-xs font-bold uppercase text-gray-500">État Global</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={config.appwrite.isActive} onChange={(e) => handleChange('appwrite', 'isActive', e.target.checked)} />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${config.appwrite.isActive ? 'bg-pink-600' : 'bg-gray-700'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${config.appwrite.isActive ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Endpoint API</label>
                            <input
                                type="text"
                                value={config.appwrite.endpoint}
                                onChange={(e) => handleChange('appwrite', 'endpoint', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-pink-500 outline-none text-pink-100 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Project ID</label>
                            <input
                                type="text"
                                value={config.appwrite.projectId}
                                onChange={(e) => handleChange('appwrite', 'projectId', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-pink-500 outline-none text-pink-100 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Database ID</label>
                            <input
                                type="text"
                                value={config.appwrite.databaseId}
                                onChange={(e) => handleChange('appwrite', 'databaseId', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-pink-500 outline-none text-pink-100 font-mono"
                                placeholder="genesis_core"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Collection ID</label>
                            <input
                                type="text"
                                value={config.appwrite.collectionId}
                                onChange={(e) => handleChange('appwrite', 'collectionId', e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-pink-500 outline-none text-pink-100 font-mono"
                                placeholder="fragments"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-black border-t border-white/10 p-6 flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-xl border border-white/20 text-gray-400 hover:text-white uppercase font-bold text-xs"
                >
                    Annuler
                </button>
                <button
                    onClick={handleSave}
                    disabled={!unsaved}
                    className={`px-8 py-3 rounded-xl font-bold uppercase text-xs shadow-lg transition-all ${unsaved ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/50' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                    {unsaved ? 'Sauvegarder Configuration' : 'Système à jour'}
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
