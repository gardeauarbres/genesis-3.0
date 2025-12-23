import React, { useState, useEffect } from 'react';
import { sfx } from '../services/sfx';
import { AppView } from '../types';

interface UserDashboardProps {
    identity: string;
    onNavigate: (view: AppView) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ identity, onNavigate }) => {
    const [notes, setNotes] = useState(localStorage.getItem('user_notes') || '');
    const [xp, setXp] = useState(parseInt(localStorage.getItem('user_xp') || '0'));

    // Simulate leveling
    const level = Math.floor(xp / 1000) + 1;
    const progress = (xp % 1000) / 10;

    useEffect(() => {
        sfx.playConfirm();
    }, []);

    const saveNotes = (val: string) => {
        setNotes(val);
        localStorage.setItem('user_notes', val);
    };

    const handleMission = () => {
        sfx.playData();
        const newXp = xp + 150;
        setXp(newXp);
        localStorage.setItem('user_xp', newXp.toString());
        alert("Mission Simulée Complétée ! +150 XP");
    };

    return (
        <div className="h-full p-6 animate-fadeIn overflow-y-auto custom-scrollbar">
            {/* Header / Identity Card */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 group">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-400 transition-all shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold font-heading text-blue-500">
                        {identity.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-500/50">
                        <div className="h-full bg-blue-400" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-heading font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                        {identity}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            Niveau {level}
                        </span>
                        <span className="px-3 py-1 text-xs font-bold uppercase rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Accréditation Beta
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Quick Nav */}
                <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Accès Rapide</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => onNavigate('lab')} className="p-4 bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/50 rounded-xl transition-all text-left group">
                            <div className="text-lg mb-1 group-hover:scale-110 transition-transform">🎤</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-blue-300">Omega Voice</div>
                        </button>
                        <button onClick={() => onNavigate('map')} className="p-4 bg-white/5 hover:bg-green-600/20 border border-white/5 hover:border-green-500/50 rounded-xl transition-all text-left group">
                            <div className="text-lg mb-1 group-hover:scale-110 transition-transform">🌍</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-green-300">Carte Globale</div>
                        </button>
                        <button onClick={() => onNavigate('vault')} className="p-4 bg-white/5 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/50 rounded-xl transition-all text-left group">
                            <div className="text-lg mb-1 group-hover:scale-110 transition-transform">🔐</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-purple-300">Coffre Fort</div>
                        </button>
                        <button onClick={() => onNavigate('visualizer')} className="p-4 bg-white/5 hover:bg-orange-600/20 border border-white/5 hover:border-orange-500/50 rounded-xl transition-all text-left group">
                            <div className="text-lg mb-1 group-hover:scale-110 transition-transform">👁️</div>
                            <div className="text-xs font-bold text-gray-300 group-hover:text-orange-300">Visualiseur</div>
                        </button>
                    </div>
                </div>

                {/* 2. Active Missions */}
                <div className="glass p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Missions Actives</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-white/10" onClick={handleMission}>
                            <div>
                                <div className="text-xs font-bold text-blue-300 mb-1">Introduction Système</div>
                                <div className="text-[10px] text-gray-500">Explorer 3 modules différents</div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-green-500 group-hover:bg-green-500/20 transition-all"></div>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between opacity-50">
                            <div>
                                <div className="text-xs font-bold text-gray-400 mb-1">Premier Contact</div>
                                <div className="text-[10px] text-gray-500">Parler à Omega (Verrouillé)</div>
                            </div>
                            <div className="text-[10px]">🔒</div>
                        </div>
                    </div>
                </div>

                {/* 3. Personal Notes */}
                <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col h-64 md:h-auto">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex justify-between">
                        <span>Notes Personnelles</span>
                        <span className="text-[9px] opacity-50 text-green-400">SYNC: LOCAL</span>
                    </h3>
                    <textarea
                        className="flex-1 bg-black/50 border border-white/10 rounded-lg p-3 text-xs font-mono text-gray-300 focus:border-blue-500/50 outline-none resize-none"
                        placeholder="Journal de bord agent..."
                        value={notes}
                        onChange={(e) => saveNotes(e.target.value)}
                    />
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
