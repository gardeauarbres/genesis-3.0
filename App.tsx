
import React, { useState, useEffect, Suspense } from 'react';
import Layout from './components/Layout';
import ArchitectureViewer from './components/ArchitectureViewer';
import BootSequence from './components/BootSequence';
import LoginScreen from './components/LoginScreen';
import { AppView, ThreatTrajectory } from './types';
import { appwriteService } from './services/appwriteService';

// Lazy Loading des composants lourds ou non-critiques au démarrage
const Visualizer = React.lazy(() => import('./components/Visualizer'));
const SearchPortal = React.lazy(() => import('./components/SearchPortal'));
const KillSwitch = React.lazy(() => import('./components/KillSwitch'));
const DebuggingAssistant = React.lazy(() => import('./components/DebuggingAssistant'));
const ConsciousnessStream = React.lazy(() => import('./components/ConsciousnessStream'));
const GlobalMap = React.lazy(() => import('./components/GlobalMap'));
const PostQuantumVault = React.lazy(() => import('./components/PostQuantumVault'));
const ThreatMonitor = React.lazy(() => import('./components/ThreatMonitor'));
const EvolutionLab = React.lazy(() => import('./components/EvolutionLab'));
const MultiAgentFusion = React.lazy(() => import('./components/MultiAgentFusion'));
const LiveSession = React.lazy(() => import('./components/LiveSession'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const UserDashboard = React.lazy(() => import('./components/UserDashboard'));

// Composant de chargement simple pour les transitions
const ViewLoader = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs text-blue-400 font-mono animate-pulse">LOADING MODULE...</span>
    </div>
  </div>
);

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
      case 'system_control': {
        const { action } = payload;
        if (action === 'reboot') window.location.reload();
        if (action === 'shutdown') setShutdown(true);
        if (action === 'logout') handleLogout();
        if (action === 'open_admin') setIsAdminMode(true);
        break;
      }
      case 'threat_defense': {
        // Broadcast defense mode to map/threats via globalAction
        setMapConfig(prev => ({ ...prev, layer: 'thermal', ghostMode: true }));
        if (activeView !== 'threats') setActiveView('threats');
        break;
      }
      case 'update_vis_config': {
        setPendingVisual({ prompt: "AUDIO REACTIVE CORE", type: 'image' }); // Helper to ensure vis loads with something
        if (activeView !== 'visualizer') setActiveView('visualizer');
        break;
      }
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
      case 'dashboard': return <UserDashboard identity={agentIdentity} onNavigate={setActiveView} />;
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
      <React.Fragment>
        {/* LoginScreen est eager, pas besoin de suspense ici si c'est le seul rendu */}
        <LoginScreen
          onLoginSuccess={(name, admin) => {
            setIsLoggedIn(true);
            setAgentIdentity(name);
            if (admin) setIsAdminMode(true);
          }}
        />
      </React.Fragment>
    );
  }

  if (isAdminMode) {
    return (
      <Suspense fallback={<div className="fixed inset-0 bg-black/90 flex items-center justify-center text-red-500 font-mono">INITIALIZING ADMIN CORE...</div>}>
        <AdminDashboard onClose={() => { setIsAdminMode(false); }} />
      </Suspense>
    );
  }

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      <Suspense fallback={<ViewLoader />}>
        {renderView()}
      </Suspense>

      {/* Mobile Logout Button */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <button onClick={handleLogout} className="text-[10px] text-red-500 bg-black/50 px-2 py-1 rounded border border-red-500/20">LOGOUT</button>
      </div>
    </Layout>
  );
};
export default App;
