
import React, { useState, useEffect } from 'react';
import { sfx } from '../services/sfx';
import { appwriteService } from '../services/appwriteService';

interface LoginScreenProps {
    onLoginSuccess: (agentName: string, isAdmin?: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Config States
    const [showConfig, setShowConfig] = useState(false);
    const [configEndpoint, setConfigEndpoint] = useState('https://fra.cloud.appwrite.io/v1');
    const [configProject, setConfigProject] = useState('694a84b40023501db111');

    // UI States
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [currentHost, setCurrentHost] = useState('');
    const [scanProgress, setScanProgress] = useState(0);
    const [introDone, setIntroDone] = useState(false);
    const [skipIntro, setSkipIntro] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentHost(window.location.hostname);

            // Charger la config actuelle ou les defaults
            const storedEp = localStorage.getItem('GENESIS_APPWRITE_ENDPOINT');
            const storedPr = localStorage.getItem('GENESIS_APPWRITE_PROJECT');

            // Priorité aux variables d'environnement si pas de localStorage
            if (storedEp) setConfigEndpoint(storedEp);
            else {
                const envEp = import.meta.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_APPWRITE_ENDPOINT);
                if (envEp) setConfigEndpoint(envEp);
            }

            if (storedPr) setConfigProject(storedPr);
            else {
                const envPr = import.meta.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_APPWRITE_PROJECT_ID);
                if (envPr) setConfigProject(envPr);
            }
        }
    }, []);

    // Séquence d'intro "Retinal Scan" (Stylistique)
    useEffect(() => {
        if (skipIntro) {
            setIntroDone(true);
            return;
        }

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIntroDone(true), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [skipIntro]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target.value);
        sfx.playData();
    };

    const handleModeSwitch = (newMode: 'login' | 'register') => {
        sfx.playBlip();
        setErrorMsg('');
        setIsNetworkError(false);
        setMode(newMode);
    };

    const handleSkip = () => {
        setSkipIntro(true);
        sfx.playConfirm();
    };

    const saveConfig = () => {
        appwriteService.init(configProject, configEndpoint);
        localStorage.setItem('GENESIS_APPWRITE_ENDPOINT', configEndpoint);
        localStorage.setItem('GENESIS_APPWRITE_PROJECT', configProject);
        setShowConfig(false);
        sfx.playConfirm();
        setErrorMsg('');
        setIsNetworkError(false);
    };

    const copyHostname = () => {
        navigator.clipboard.writeText(currentHost);
        sfx.playConfirm();
        alert("Domaine copié ! Ajoutez-le dans Appwrite > Overview > Platforms > Add Web App");
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setIsNetworkError(false);

        if (!email || !password || (mode === 'register' && !name)) {
            setErrorMsg("CHAMPS REQUIS MANQUANTS.");
            sfx.playAlert();
            return;
        }

        setLoading(true);
        sfx.playConfirm();

        // Assurer que le service est initialisé avec la config actuelle
        appwriteService.init(configProject, configEndpoint);

        try {
            let user;

            // AUTHENTIFICATION APPWRITE STANDARD
            if (mode === 'register') {
                await appwriteService.register(email, password, name);
                user = await appwriteService.getCurrentUser();
            } else {
                await appwriteService.login(email, password);
                user = await appwriteService.getCurrentUser();
            }

            if (user) {
                await appwriteService.recordAccessLog(user.name, true);
                onLoginSuccess(user.name, false);
            } else {
                throw new Error("Échec récupération session.");
            }

        } catch (error: any) {
            console.error("Login Process Error:", error);
            sfx.playAlert();

            let msg = "ERREUR D'AUTHENTIFICATION.";
            const errString = error.message || String(error);

            // Détection d'erreur CORS / Réseau
            if (errString.includes('Failed to fetch') || errString.includes('Network request failed') || errString.includes('CORS') || errString.includes('NetworkError') || errString.includes('Impossible de joindre')) {
                msg = "ACCÈS REJETÉ PAR LE SERVEUR (CORS).";
                setIsNetworkError(true);
            }
            else if (errString.includes('Invalid credentials')) msg = "IDENTIFIANTS INCORRECTS.";
            else if (errString.includes('already exists')) msg = "CET EMAIL EST DÉJÀ ENREGISTRÉ.";
            else if (errString.includes('short')) msg = "MOT DE PASSE TROP COURT (8+ CARACTÈRES).";
            else if (errString.includes('Rate limit')) msg = "TROP DE TENTATIVES. PATIENTEZ.";
            else msg = errString;

            setErrorMsg(msg.toUpperCase());

            if (!isNetworkError && !errString.includes('Failed to fetch')) {
                await appwriteService.recordAccessLog(email, false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center overflow-hidden font-mono select-none">
            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* CONFIG MODAL */}
            {showConfig && (
                <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                    <div className="w-full max-w-md bg-[#0a0a0a] border border-white/20 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-white font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Configuration Appwrite
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">API Endpoint</label>
                                <input type="text" value={configEndpoint} onChange={e => setConfigEndpoint(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs text-blue-200 font-mono focus:border-blue-500 outline-none" />
                                <p className="text-[9px] text-gray-600 mt-1">Défaut: https://fra.cloud.appwrite.io/v1</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Project ID</label>
                                <input type="text" value={configProject} onChange={e => setConfigProject(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs text-blue-200 font-mono focus:border-blue-500 outline-none" />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button onClick={() => setShowConfig(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 text-xs font-bold uppercase hover:bg-white/5">Annuler</button>
                                <button onClick={saveConfig} className="flex-1 py-3 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-500">Sauvegarder</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SCAN SEQUENCE (INTRO) */}
            {!introDone && (
                <div className="flex flex-col items-center gap-8 animate-fadeIn relative z-10">
                    <div className="relative w-64 h-64 border border-blue-900/50 rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        <div className="w-56 h-56 bg-blue-900/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <div className="text-4xl text-blue-500 animate-pulse">👁</div>
                        </div>
                    </div>
                    <div className="w-64 space-y-2">
                        <div className="flex justify-between text-[10px] text-blue-400 uppercase tracking-widest">
                            <span>Synchronisation Cloud</span>
                            <span>{Math.round(scanProgress)}%</span>
                        </div>
                        <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 transition-all duration-100" style={{ width: `${scanProgress}%` }}></div>
                        </div>
                    </div>
                    <button onClick={handleSkip} className="mt-4 px-4 py-2 border border-white/10 rounded hover:bg-white/5 text-[9px] text-gray-500 uppercase tracking-widest transition-colors">
                        Passer l'initialisation
                    </button>
                </div>
            )}

            {/* LOGIN FORM */}
            {introDone && (
                <div className="relative z-10 w-full max-w-md p-8 animate-slideIn">
                    <div className={`absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl border rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.15)] transition-colors duration-500 ${isNetworkError ? 'border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.2)]' : 'border-blue-500/30'}`}></div>

                    <div className="relative z-20 flex flex-col gap-6">
                        {/* Header & Config Button */}
                        <div className="flex justify-between items-start">
                            <div className="text-left space-y-2">
                                <h1 className="text-2xl font-bold font-heading text-white tracking-widest uppercase">Genesis ID</h1>
                                <p className="text-[10px] text-blue-400 uppercase tracking-[0.4em]">Portail d'Accès Sécurisé</p>
                            </div>
                            <button onClick={() => setShowConfig(true)} className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors" title="Configuration Serveur">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </button>
                        </div>

                        {/* NETWORK ERROR HELPER - DISPLAYED PROMINENTLY */}
                        {isNetworkError && (
                            <div className="bg-red-950/40 border border-red-500/50 p-5 rounded-2xl space-y-4 animate-slideIn shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                                <h4 className="text-red-400 text-sm font-bold uppercase flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    CONNEXION REFUSÉE (CORS)
                                </h4>
                                <p className="text-[11px] text-gray-300 leading-relaxed">
                                    Le serveur Appwrite a bloqué la requête car le domaine actuel n'est pas autorisé.
                                </p>
                                <div className="bg-black/60 p-4 rounded-xl border border-red-500/30">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">SOLUTION REQUISE :</p>
                                    <ol className="text-[11px] text-gray-300 list-decimal pl-4 space-y-1 mb-3">
                                        <li>Allez dans <strong>Appwrite Console</strong> &gt; <strong>Overview</strong></li>
                                        <li>Section <strong>Platforms</strong> &gt; <strong>Add Platform</strong> (Web App)</li>
                                        <li>Ajoutez ce domaine exact :</li>
                                    </ol>
                                    <div
                                        onClick={copyHostname}
                                        className="bg-red-500/10 p-3 rounded border border-red-500/30 text-red-200 font-mono text-xs text-center cursor-pointer hover:bg-red-500/20 hover:text-white transition-all flex items-center justify-center gap-2 group"
                                        title="Cliquer pour copier"
                                    >
                                        {currentHost}
                                        <svg className="w-3 h-3 text-red-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsNetworkError(false)} className="w-full py-2 bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-bold uppercase rounded-lg transition-colors">
                                        Réessayer
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TABS */}
                        <div className="flex bg-black/40 rounded-xl p-1 border border-white/5">
                            <button onClick={() => handleModeSwitch('login')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${mode === 'login' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Connexion</button>
                            <button onClick={() => handleModeSwitch('register')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${mode === 'register' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Inscription</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && (
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nom de l'Agent</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                                        <input type="text" value={name} onChange={(e) => handleInput(e, setName)} className="w-full bg-black/50 border border-white/10 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-white font-bold outline-none transition-all focus:bg-white/5 placeholder-gray-700 text-sm" placeholder="EX: AGENT SMITH" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg></div>
                                    <input type="email" value={email} onChange={(e) => handleInput(e, setEmail)} className="w-full bg-black/50 border border-white/10 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-white font-mono outline-none transition-all focus:bg-white/5 placeholder-gray-700 text-sm" placeholder="agent@genesis.core" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>
                                    <input type="password" value={password} onChange={(e) => handleInput(e, setPassword)} className="w-full bg-black/50 border border-white/10 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-white font-mono outline-none transition-all focus:bg-white/5 placeholder-gray-700 text-sm" placeholder="••••••••••••" />
                                </div>
                            </div>

                            {errorMsg && !isNetworkError && (
                                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-center animate-shake flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">{errorMsg}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group mt-4 ${loading
                                    ? 'bg-blue-900/50 text-blue-300 cursor-wait'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:scale-[1.02]'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="text-xs">Authentification...</span>
                                    </div>
                                ) : (
                                    <span className="relative z-10">{mode === 'login' ? 'ACCÉDER AU SYSTÈME' : 'INITIALISER L\'AGENT'}</span>
                                )}
                            </button>
                        </form>

                        <div className="text-center pt-4 border-t border-white/5 flex flex-col gap-2">
                            <p className="text-[8px] text-gray-600">
                                PROJET ID: <span className="text-gray-500 font-mono">{configProject}</span>
                            </p>
                            <p className="text-[8px] text-gray-700">
                                <span className="text-blue-900">SECURE PQC LINK ESTABLISHED</span> • v1.0.6
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
        </div>
    );
};

export default LoginScreen;
