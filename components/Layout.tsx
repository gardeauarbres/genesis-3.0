import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView, SecurityLog } from '../types';
import KernelStream from './KernelStream';
import { groqService } from '../services/groqService';
import { geminiService } from '../services/geminiService';
import { appwriteService } from '../services/appwriteService';
import IntergalacticBackground from './IntergalacticBackground';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
}

const ApiKeyGuard: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [isSystemManaged, setIsSystemManaged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setHasKey(geminiService.hasKey());
    setIsSystemManaged(geminiService.isSystemManaged());
  }, []);

  const handleSaveKey = () => {
    if (geminiService.setApiKey(inputKey)) {
      setHasKey(true);
      setShowModal(false);
      setInputKey('');
      setError('');
    } else {
      setError("Clé invalide. Veuillez vérifier le format.");
    }
  };

  const handleClick = () => {
    if (!isSystemManaged) setShowModal(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${hasKey
          ? (isSystemManaged ? 'bg-green-500/5 border-green-500/20' : 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40')
          : 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
          } border-glow backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${hasKey ? (isSystemManaged ? 'bg-green-600 text-white shadow-[0_0_10px_#16a34a]' : 'bg-blue-600 text-white shadow-[0_0_10px_#2563eb]') : 'bg-gray-700 text-gray-400'
            }`}>
            {hasKey ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">Clé Neurale Gemini</p>
            <p className={`text-[10px] font-mono font-bold truncate ${hasKey ? (isSystemManaged ? 'text-green-400' : 'text-blue-400') : 'text-gray-400'}`}>
              {hasKey ? (isSystemManaged ? 'GÉRÉ PAR LE SYSTÈME' : 'LIAISON UTILISATEUR') : 'CLÉ REQUISE'}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setShowModal(false)}>
          <div
            className="w-full max-w-md bg-[#0a0a0a] border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(37,99,235,0.2)] relative glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading tracking-wide">INITIALISATION NEURALE</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Protocole Gemini API</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2 block">CLÉ API (Google AI Studio)</label>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                  autoFocus
                />
                {error && <p className="text-red-500 text-[10px] mt-2 font-mono">{error}</p>}
                <p className="text-[9px] text-gray-600 mt-2">
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="hover:text-blue-400 underline decoration-blue-500/30">
                    Obtenir une clé API Gemini &gt;
                  </a>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowModal(false); setError(''); }}
                  className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveKey}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
                >
                  Lier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AppwriteGuard: React.FC = () => {
  const [projectId, setProjectId] = useState('');
  const [isLinked, setIsLinked] = useState(false);
  const [isSystemManaged, setIsSystemManaged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsSystemManaged(appwriteService.isSystemManaged());
    const stored = localStorage.getItem('GENESIS_APPWRITE_PROJECT');
    if (stored || appwriteService.isConfigured) {
      setProjectId(stored || 'SYSTEM');
      setIsLinked(true);
    }
  }, []);

  const handleLink = () => {
    if (projectId.length > 5) {
      appwriteService.init(projectId);
      setIsLinked(true);
      setShowModal(false);
    }
  };

  const handleClick = () => {
    if (!isSystemManaged) setShowModal(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden mt-3 ${isLinked
          ? (isSystemManaged ? 'bg-green-500/5 border-green-500/20' : 'bg-pink-500/5 border-pink-500/20 hover:border-pink-500/40')
          : 'bg-gray-800/40 border-gray-700 hover:border-pink-500/30'
          } border-glow backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${isLinked ? (isSystemManaged ? 'bg-green-600 text-white' : 'bg-pink-600 text-white shadow-[0_0_10px_#db2777]') : 'bg-gray-700 text-gray-400'
            }`}>
            {isLinked ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            ) : (
              <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">MÉMOIRE APPWRITE</p>
            <p className={`text-[10px] font-mono font-bold truncate ${isLinked ? (isSystemManaged ? 'text-green-400' : 'text-pink-400') : 'text-gray-400'}`}>
              {isLinked ? (isSystemManaged ? 'GÉRÉ PAR LE SYSTÈME' : 'SYNC ACTIVE') : 'NON CONNECTÉ'}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md bg-[#0a0a0a] border border-pink-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(219,39,119,0.2)] glass-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white font-heading tracking-wide mb-4 flex items-center gap-2">
              <span className="text-pink-500">❖</span> CONFIGURATION APPWRITE
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-pink-400 font-bold uppercase tracking-widest mb-2 block">PROJECT ID</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="65a..."
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-pink-500/50 outline-none"
                />
              </div>
              <button
                onClick={handleLink}
                className="w-full py-3 rounded-xl bg-pink-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-pink-500 transition-colors shadow-lg shadow-pink-900/40"
              >
                CONNECTER LA BASE DE DONNÉES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const VertexKeyGuard: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active'>('idle');

  const handleConnect = () => {
    if (status === 'active') return;
    setStatus('connecting');
    setTimeout(() => {
      setStatus('active');
    }, 2000);
  };

  return (
    <div
      onClick={handleConnect}
      className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden mt-3 ${status === 'active'
        ? 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40'
        : 'bg-gray-800/40 border-gray-700 hover:border-purple-500/30'
        } border-glow backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${status === 'active' ? 'bg-purple-600 text-white shadow-[0_0_10px_#9333ea]' : status === 'connecting' ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-700 text-gray-400'
          }`}>
          {status === 'active' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          ) : status === 'connecting' ? (
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">Vertex Cloud IAM</p>
          <p className={`text-[10px] font-mono font-bold truncate ${status === 'active' ? 'text-purple-400' : 'text-gray-400'}`}>
            {status === 'active' ? 'vertex-express@gen...' : status === 'connecting' ? 'HANDSHAKE...' : 'OFFLINE'}
          </p>
        </div>
      </div>
    </div>
  );
};

const GroqKeyGuard: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSystemManaged, setIsSystemManaged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setHasKey(groqService.hasKey());
    setIsEnabled(groqService.isEnabled());
    setIsSystemManaged(groqService.isSystemManaged());
  }, []);

  const handleSaveKey = () => {
    if (groqService.setApiKey(inputKey)) {
      setHasKey(true);
      setIsEnabled(true);
      setShowModal(false);
      setInputKey('');
      setError('');
    } else {
      setError("Format invalide. Doit commencer par 'gsk_'.");
    }
  };

  const toggleGroq = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasKey && !isSystemManaged) {
      setShowModal(true);
      return;
    }
    if (isSystemManaged) return;

    const newState = !isEnabled;
    groqService.setEnabled(newState);
    setIsEnabled(newState);
  };

  const handleClick = () => {
    if (!isSystemManaged) setShowModal(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden mt-3 ${hasKey && isEnabled
          ? (isSystemManaged ? 'bg-green-500/5 border-green-500/20' : 'bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40')
          : 'bg-gray-800/40 border-gray-700 hover:border-orange-500/30'
          } border-glow backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${hasKey && isEnabled ? (isSystemManaged ? 'bg-green-600 text-white shadow-[0_0_10px_#16a34a]' : 'bg-orange-600 text-white shadow-[0_0_10px_#f97316]') : 'bg-gray-700 text-gray-400'
            }`}>
            {hasKey ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            ) : (
              <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">GROQ LPU ENGINE</p>
              {hasKey && !isSystemManaged && (
                <button
                  onClick={toggleGroq}
                  className={`w-6 h-3 rounded-full relative transition-colors ${isEnabled ? 'bg-orange-500' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-0.5 w-2 h-2 bg-white rounded-full transition-all ${isEnabled ? 'left-3.5' : 'left-0.5'}`}></div>
                </button>
              )}
            </div>
            <p className={`text-[10px] font-mono font-bold truncate ${hasKey && isEnabled ? (isSystemManaged ? 'text-green-400' : 'text-orange-400') : 'text-gray-400'}`}>
              {hasKey ? (isEnabled ? (isSystemManaged ? 'AUTO-GÉRÉ' : '820 T/s • ONLINE') : 'STANDBY') : 'CLÉ REQUISE'}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md bg-[#0a0a0a] border border-orange-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(249,115,22,0.2)] glass-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white font-heading tracking-wide mb-4">INITIALISATION LPU</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-2 block">CLÉ API (gsk_...)</label>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="gsk_xxxxxxxxxxxxxxxx"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-orange-500/50 outline-none"
                  autoFocus
                />
                {error && <p className="text-red-500 text-[10px] mt-2 font-mono">{error}</p>}
              </div>
              <button
                onClick={handleSaveKey}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/40"
              >
                Activer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [telemetry, setTelemetry] = useState({ cpu: 45, entropy: 98.2, exterminated: 0, data: '12.4' });
  const [criticalState, setCriticalState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('genesis_evolution_memory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTelemetry(prev => ({ ...prev, data: parseFloat(parsed.dataConsumed || '12.4').toFixed(2) }));
      } catch (e) { }
    }

    const handleTelemetryUpdate = (e: any) => {
      if (e.detail) {
        if (e.detail.dataConsumed) {
          setTelemetry(prev => ({ ...prev, data: e.detail.dataConsumed }));
        }
        if (e.detail.stress) {
          setCriticalState(e.detail.stress > 80);
        }
      }
    };

    const handleSecurityEvent = (e: any) => {
      if (e.detail && e.detail.message) {
        setTelemetry(prev => ({ ...prev, exterminated: prev.exterminated + (e.detail.type === 'audit' ? 1 : 0) }));
        setLogs(prev => [{
          id: Math.random().toString(36),
          timestamp: new Date().toLocaleTimeString(),
          message: e.detail.message,
          type: e.detail.type || 'info'
        }, ...prev].slice(0, 5));
      }
    };

    window.addEventListener('genesis-telemetry-update', handleTelemetryUpdate);
    window.addEventListener('genesis-security-event', handleSecurityEvent);

    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        cpu: Math.floor(40 + Math.random() * 20),
        entropy: +(98 + Math.random() * 1.5).toFixed(1)
      }));
    }, 3000);

    return () => {
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
        { id: 'dashboard', label: 'Tableau de Bord', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'fusion', label: 'Nexus Multi-Agents', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: 'architecture', label: 'Lattice', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      ]
    },
    {
      title: "INTELLIGENCE",
      items: [
        { id: 'evolution', label: 'Génome IA', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { id: 'lab', label: 'Vocal', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
        { id: 'consciousness', label: 'Conscience', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
      ]
    },
    {
      title: "DÉFENSE",
      items: [
        { id: 'threats', label: 'Menaces Cyber', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { id: 'vault', label: 'Coffre PQC', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
        { id: 'visualizer', label: 'Synthèse', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
      ]
    },
    {
      title: "OPÉRATIONS",
      items: [
        { id: 'map', label: 'Carte Globale', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
      ]
    }
  ];

  return (
    <div className={`flex h-screen h-[100dvh] overflow-hidden bg-[#050505] selection:bg-blue-500/30 transition-all duration-1000 ${criticalState ? 'animate-glitch contrast-125 brightness-110 grayscale-[0.3]' : ''}`}>

      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <IntergalacticBackground />
        <div className="absolute inset-0 pointer-events-none scanline opacity-20 mix-blend-overlay"></div>
      </div>

      {/* HUD Overlay */}
      <div className="relative z-10 pointer-events-none">
        <KernelStream view={activeView} />
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 glass border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 bg-black/80 backdrop-blur-xl
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => { setView('architecture'); setMobileMenuOpen(false); }}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.8)] transition-transform group-hover:rotate-12 ${criticalState ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
                <span className="font-bold text-xl text-white">Ω</span>
              </div>
              <h1 className="text-2xl font-bold font-heading tracking-tighter text-white uppercase italic text-glow">Genesis</h1>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 text-white hover:text-red-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <nav className="space-y-6 mb-8">
            {navGroups.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-3 ml-2">{group.title}</h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setView(item.id as AppView); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeView === item.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <svg className={`w-4 h-4 shrink-0 transition-colors ${activeView === item.id ? 'text-blue-400' : 'group-hover:text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="font-bold text-[10px] uppercase tracking-widest truncate">{item.label}</span>
                      {activeView === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-blue-500 rounded-r-lg shadow-[0_0_10px_#3b82f6]"></div>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/5">
            <ApiKeyGuard />
            <AppwriteGuard />
            <VertexKeyGuard />
            <GroqKeyGuard />
          </div>
        </div>

        <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 backdrop-blur-md">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            LOG_KERNEL_Ω
          </h3>
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log.id} className="animate-slideIn relative pl-3 border-l-2 border-white/5 group hover:border-blue-500/50 transition-colors cursor-crosshair">
                <div className="flex justify-between text-[8px] mb-1">
                  <span className="text-gray-600 font-mono group-hover:text-blue-400">{log.timestamp}</span>
                  <span className={`font-bold ${log.type === 'critical' ? 'text-red-500 animate-pulse' : log.type === 'evolution' ? 'text-purple-500' : 'text-blue-500'}`}>
                    {log.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-[9px] text-gray-400 font-mono leading-none truncate group-hover:text-white transition-colors">{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative z-10">
        <header className="h-16 border-b border-white/5 glass flex items-center justify-between px-4 md:px-10 z-10 shrink-0 shadow-lg shadow-black/50">
          <div className="flex gap-4 md:gap-8 items-center">
            {/* Mobile Menu Trigger - High Z-Index & Contrast */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white bg-blue-600/20 border border-blue-500/50 rounded-lg hover:bg-blue-600 hover:text-white transition-all active:scale-95 z-50 relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            <div className="hidden md:flex flex-col">
              <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">INGESTION</span>
              <span className="text-[10px] font-mono text-amber-500">{telemetry.data} PB</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/5"></div>
            <div className="flex flex-col">
              <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest hidden md:block">STABILITÉ_ENTROPIE</span>
              <div className="flex items-center gap-3">
                <div className="w-20 md:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                  <div className={`h-full transition-all duration-1000 ${criticalState ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${telemetry.entropy}%` }}></div>
                  {/* Scanning line for bar */}
                  <div className="absolute inset-y-0 w-1 bg-white/50 animate-[scanline_2s_linear_infinite]" style={{ left: `${telemetry.entropy}%` }}></div>
                </div>
                <span className={`text-[10px] font-mono ${criticalState ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>{telemetry.entropy}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className={`hidden md:flex items-center gap-2 border px-4 py-1.5 rounded-full transition-all hover:bg-red-500/10 cursor-help ${criticalState ? 'bg-red-500/20 border-red-500/40 animate-bounce' : 'bg-red-500/10 border-red-500/20'}`}>
              <span className={`w-2 h-2 rounded-full ${telemetry.exterminated > 0 ? 'bg-red-500 animate-ping' : 'bg-red-900'}`}></span>
              <span className="text-[10px] font-bold text-red-500 uppercase font-mono">{telemetry.exterminated} PURGES</span>
            </div>
            <div className="text-[9px] text-gray-500 font-mono hover:text-blue-400 cursor-pointer">v0.9.1</div>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto relative p-4 md:p-8 lg:p-12 custom-scrollbar ${criticalState ? 'bg-red-900/5' : ''}`}>
          <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full flex flex-col"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default Layout;
