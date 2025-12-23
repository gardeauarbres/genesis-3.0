
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ArchitectureViewer from './components/ArchitectureViewer';
import Visualizer from './components/Visualizer';
import SearchPortal from './components/SearchPortal';
import KillSwitch from './components/KillSwitch';
import DebuggingAssistant from './components/DebuggingAssistant';
import ConsciousnessStream from './components/ConsciousnessStream';
import GlobalMap from './components/GlobalMap';
import PostQuantumVault from './components/PostQuantumVault';
import ThreatMonitor from './components/ThreatMonitor';
import EvolutionLab from './components/EvolutionLab';
import BootSequence from './components/BootSequence';
import MultiAgentFusion from './components/MultiAgentFusion';
import LiveSession from './components/LiveSession';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard';
import { AppView, ThreatTrajectory, TranscriptionEntry } from './types';
import { appwriteService } from './services/appwriteService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [agentIdentity, setAgentIdentity] = useState<string>('');
  const [booted, setBooted] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [activeView, setActiveView] = useState<AppView>('architecture');
  const [authLoading, setAuthLoading] = useState(true);

  const [pendingSearch, setPendingSearch] = useState<string | null>(null);
  const [pendingMapQuery, setPendingMapQuery] = useState<string | null>(null);
  const [pendingVisual, setPendingVisual] = useState<{ prompt: string; type: 'image' | 'video' } | null>(null);
  const [pendingNexus, setPendingNexus] = useState<{ agentId: string; query: string } | null>(null);
  const [globalAction, setGlobalAction] = useState<{ type: string, payload?: any } | null>(null);
  
  const [activeTrajectory, setActiveTrajectory] = useState<ThreatTrajectory | null>(null);

  const [mapConfig, setMapConfig] = useState<{
    layer?: 'lattice' | 'optical' | 'thermal';
    ghostMode?: boolean;
    filters?: string[];
  }>({});

  useEffect(() => {
    const checkSession = async () => {
        try {
            const user = await appwriteService.getCurrentUser();
            if (user) {
                setAgentIdentity(user.name);
                setIsLoggedIn(true);
            }
        } catch (e) {
            console.log("Pas de session active.");
        } finally {
            setAuthLoading(false);
        }
    };
    checkSession();
  }, []);

  useEffect(() => {
    const handleShutdown = () => setShutdown(true);
    window.addEventListener('genesis-shutdown', handleShutdown);
    return () => window.removeEventListener('genesis-shutdown', handleShutdown);
  }, []);

  const handleVoiceSearch = (query: string) => {
    setPendingSearch(query);
    setActiveView('search');
  };

  const handleMapQuery = (query: string) => {
    setPendingMapQuery(query);
    setActiveView('map');
  };

  const handleVoiceVisualize = (prompt: string, type: 'image' | 'video') => {
    setPendingVisual({ prompt, type });
    setActiveView('visualizer');
  };

  const handleTrackThreat = (trajectory: ThreatTrajectory) => {
    setActiveTrajectory(trajectory);
    setMapConfig(prev => ({ ...prev, layer: 'thermal' })); 
    setActiveView('map');
  };

  const handleGlobalAction = (type: string, payload?: any) => {
    switch (type) {
        case 'trigger_mutation': setActiveView('evolution'); break;
        case 'update_map_config':
            setMapConfig(prev => ({ ...prev, ...payload }));
            if (activeView !== 'map') setActiveView('map');
            break;
        case 'nexus_interaction':
            setPendingNexus({ agentId: payload.agentId, query: payload.query });
            setActiveView('fusion');
            break;
    }
    setGlobalAction({ type, payload });
  };

  const handleLogout = async () => {
      await appwriteService.logout();
      setIsLoggedIn(false);
      setIsAdminMode(false);
      setBooted(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'architecture': return <ArchitectureViewer />;
      case 'evolution': return <EvolutionLab autoTrigger={globalAction?.type === 'trigger_mutation'} onConsumed={() => setGlobalAction(null)} />;
      case 'consciousness': return <ConsciousnessStream initialTopic={globalAction?.type === 'meditate' ? globalAction.payload : null} onConsumed={() => setGlobalAction(null)} />;
      case 'vault': return <PostQuantumVault />;
      case 'threats': return <ThreatMonitor onTrackThreat={handleTrackThreat} />;
      case 'fusion': return <MultiAgentFusion initialParams={pendingNexus} onConsumed={() => setPendingNexus(null)} />;
      case 'map': return <GlobalMap initialQuery={pendingMapQuery} externalConfig={mapConfig} activeTrajectory={activeTrajectory} onConsumed={() => setPendingMapQuery(null)} />;
      case 'visualizer': return <Visualizer initialParams={pendingVisual} onConsumed={() => setPendingVisual(null)} />;
      case 'search': return <SearchPortal initialQuery={pendingSearch} onConsumed={() => setPendingSearch(null)} />;
      case 'debugger': return <DebuggingAssistant />;
      case 'killswitch': return <KillSwitch />;
      case 'lab': return (
        <LiveSession 
            onNavigate={setActiveView}
            onVoiceSearch={handleVoiceSearch}
            onVoiceVisualize={handleVoiceVisualize}
            onMapQuery={handleMapQuery}
            onAction={handleGlobalAction}
        />
      );
      default: return <ArchitectureViewer />;
    }
  };

  if (shutdown) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="text-center space-y-6">
          <p className="text-red-600 font-mono text-xl animate-pulse">SYSTEM HALTED</p>
          <div className="h-1 w-32 bg-red-900 mx-auto"></div>
          <p className="text-gray-800 font-mono text-xs">NOYAU DÉTRUIT. VEUILLEZ REDÉMARRER MANUELLEMENT.</p>
        </div>
      </div>
    );
  }

  if (authLoading) {
      return <div className="fixed inset-0 bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div></div>;
  }

  if (!isLoggedIn) {
      return (
        <LoginScreen 
            onLoginSuccess={(name, admin) => { 
                setIsLoggedIn(true); 
                setAgentIdentity(name); 
                if (admin) setIsAdminMode(true);
            }} 
        />
      );
  }

  if (isAdminMode) {
      return <AdminDashboard onClose={() => { setIsAdminMode(false); }} />;
  }

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {renderView()}
      
      {/* Mobile Logout Button */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
          <button onClick={handleLogout} className="text-[10px] text-red-500 bg-black/50 px-2 py-1 rounded border border-red-500/20">LOGOUT</button>
      </div>
    </Layout>
  );
};

export default App;
