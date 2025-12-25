import React, { useState, useEffect } from 'react';
import { sfx } from '../services/sfx';
import { AppView } from '../types';
import { appwriteService } from '../services/appwriteService';

interface UserDashboardProps {
    identity: string;
    onNavigate: (view: AppView) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ identity, onNavigate }) => {
    const [notes, setNotes] = useState(typeof window !== 'undefined' ? localStorage.getItem('user_notes') || '' : '');
    const [credits, setCredits] = useState(typeof window !== 'undefined' ? parseInt(localStorage.getItem('user_credits') || '0') : 0);
    const [userId, setUserId] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('user_id') : null);
    const [syncStatus, setSyncStatus] = useState<'LOCAL' | 'CLOUD'>('LOCAL');
    const [decryptedName, setDecryptedName] = useState(identity);

    // Simulate clearance level
    const clearance = Math.floor(credits / 1000) + 1;
    const progress = (credits % 1000) / 10;

    useEffect(() => {
        sfx.playConfirm();
        initializeSession();

        // Decryption Effect
        let iteration = 0;
        const interval = setInterval(() => {
            setDecryptedName(prev => {
                return identity.split("").map((letter, index) => {
                    if (index < iteration) return identity[index];
                    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"[Math.floor(Math.random() * 26)];
                }).join("");
            });
            if (iteration >= identity.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [identity]);

    const initializeSession = async () => {
        if (typeof window === 'undefined') return;

        let currentId = userId;
        // Try to get real user
        try {
            const user = await appwriteService.getCurrentUser();
            if (user) {
                currentId = user.$id;
                setUserId(currentId);
                localStorage.setItem('user_id', currentId);
                setSyncStatus('CLOUD');
            } else if (!currentId) {
                currentId = 'anon_' + Math.random().toString(36).substr(2, 9);
                setUserId(currentId);
                localStorage.setItem('user_id', currentId);
            }

            if (currentId && user) {
                const profile = await appwriteService.getUserProfile(currentId);
                if (profile) {
                    if (profile.credits) {
                        setCredits(profile.credits);
                        localStorage.setItem('user_credits', profile.credits.toString());
                    }
                    if (profile.notes) {
                        setNotes(profile.notes);
                        localStorage.setItem('user_notes', profile.notes);
                    }
                }
            }
        } catch (e) { }
    };

    const saveNotes = async (val: string) => {
        setNotes(val);
        if (typeof window !== 'undefined') localStorage.setItem('user_notes', val);
        if (userId && syncStatus === 'CLOUD') {
            await appwriteService.updateUserProfile(userId, { notes: val });
        }
    };

    const handleMission = async () => {
        sfx.playData();
        const newCredits = credits + 150;
        setCredits(newCredits);
        if (typeof window !== 'undefined') localStorage.setItem('user_credits', newCredits.toString());
        // Simple customized alert or toast would be better but keeping native for now
        // alert("Mission: SUCCÈS CONFIRMÉ..."); 

        if (userId && syncStatus === 'CLOUD') {
            await appwriteService.updateUserProfile(userId, { credits: newCredits });
        }
    };

    const handleNav = (view: AppView) => {
        sfx.playSelect();
        onNavigate(view);
    };

    return (
        <div className="h-full p-4 md:p-6 animate-fadeIn overflow-y-auto custom-scrollbar pb-24 lg:pb-6">
            {/* Header / Identity Card */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 group perspective-1000">
                <div className="relative w-full md:w-32 h-32 rounded-2xl overflow-hidden border border-blue-500/30 group-hover:border-blue-400 transition-all shadow-[0_0_30px_rgba(59,130,246,0.1)] bg-black/40 backdrop-blur-md">
                    <div className="absolute inset-0 bg-blue-500/5 hologram"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold font-heading text-blue-500 text-glow">
                        {identity.substring(0, 2).toUpperCase()}
                    </div>
                    {/* Scanning Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent h-1/2 w-full animate-[scanline_3s_linear_infinite]"></div>

                    <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-500/20">
                        <div className="h-full bg-blue-400 shadow-[0_0_10px_#60a5fa] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 opacity-90 tracking-tight">
                        {decryptedName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            Habilitation Niv.{clearance}
                        </div>
                        <div className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                            {credits} Crédits Ops
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Quick Nav */}
                <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-blue-500/30 transition-colors duration-500 group/panel">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Accès Rapide
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleNav('lab')} className="p-4 bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/50 rounded-xl transition-all text-left group overflow-hidden relative">
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">🎤</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-blue-300 relative z-10">Interface Vocale</div>
                        </button>
                        <button onClick={() => handleNav('map')} className="p-4 bg-white/5 hover:bg-green-600/20 border border-white/5 hover:border-green-500/50 rounded-xl transition-all text-left group overflow-hidden relative">
                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">🌍</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-green-300 relative z-10">Carte Globale</div>
                        </button>
                        <button onClick={() => handleNav('vault')} className="p-4 bg-white/5 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/50 rounded-xl transition-all text-left group overflow-hidden relative">
                            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">🔐</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-purple-300 relative z-10">Coffre Fort</div>
                        </button>
                        <button onClick={() => handleNav('visualizer')} className="p-4 bg-white/5 hover:bg-orange-600/20 border border-white/5 hover:border-orange-500/50 rounded-xl transition-all text-left group overflow-hidden relative">
                            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">👁️</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-orange-300 relative z-10">Visualiseur</div>
                        </button>
                    </div>
                </div>

                {/* 2. Active Missions */}
                <div className="glass-panel p-6 rounded-2xl hover:border-green-500/30 transition-colors duration-500">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        Missions Actives
                    </h3>
                    <div className="space-y-3">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/10 hover:border-green-500/30 transition-all" onClick={handleMission}>
                            <div>
                                <div className="text-xs font-bold text-blue-300 mb-1 group-hover:text-green-300 transition-colors">Introduction Système</div>
                                <div className="text-[10px] text-gray-500 font-mono">Objectif: Explorer 3 modules</div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-green-500 group-hover:bg-green-500/20 transition-all flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                            <div>
                                <div className="text-xs font-bold text-gray-400 mb-1">Premier Contact</div>
                                <div className="text-[10px] text-gray-500 font-mono">Status: Verrouillé par le Noyau</div>
                            </div>
                            <div className="text-xs">🔒</div>
                        </div>
                    </div>
                </div>

                {/* 3. Personal Notes */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col h-72 md:h-auto hover:border-purple-500/30 transition-colors duration-500">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex justify-between items-center">
                        <span className="flex items-center gap-2">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Notes Personnelles
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${syncStatus === 'CLOUD' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-green-400 border-green-500/30'}`}>
                            {syncStatus === 'CLOUD' ? 'CLOUD_SYNC' : 'LOCAL_ONLY'}
                        </span>
                    </h3>
                    <div className="relative flex-1">
                        <textarea
                            className="w-full h-full bg-black/50 border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-300 focus:border-blue-500/50 outline-none resize-none transition-colors selection:bg-blue-500/30"
                            placeholder="// Saisissez vos notes confidentielles..."
                            value={notes}
                            onChange={(e) => saveNotes(e.target.value)}
                        />
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            <span className="h-1 w-1 bg-white/20 rounded-full"></span>
                            <span className="h-1 w-1 bg-white/20 rounded-full"></span>
                            <span className="h-1 w-1 bg-white/20 rounded-full"></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
