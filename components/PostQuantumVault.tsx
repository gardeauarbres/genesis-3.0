
import React, { useState, useEffect } from 'react';
import { NeuralKey } from '../types';
import { geminiService } from '../services/geminiService';
import { memory } from '../services/memory';
import { sfx } from '../services/sfx';
import { appwriteService } from '../services/appwriteService';

const PostQuantumVault: React.FC = () => {
  const [keys, setKeys] = useState<NeuralKey[]>([]);
  const [generating, setGenerating] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'LOCAL' | 'CLOUD'>('LOCAL');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    initializeVault();
  }, []);

  const initializeVault = async () => {
    // Try to get authenticated user for cloud sync
    try {
      const user = await appwriteService.getCurrentUser();
      if (user) {
        setUserId(user.$id);
        setSyncStatus('CLOUD');

        // Load keys from cloud
        const cloudKeys = await appwriteService.getVaultKeys(user.$id);
        if (cloudKeys.length > 0) {
          setKeys(cloudKeys);
          return;
        }
      }
    } catch (e) {
      console.warn("[VAULT] Cloud sync unavailable, using local storage");
    }

    // Fallback to local memory
    const fragments = await memory.getByType('key');
    if (fragments.length > 0) {
      setKeys(fragments.map(f => f.metadata));
    } else {
      // Initial demo data
      setKeys([
        { id: 'NK-892', algorithm: 'Kyber-1024', entropy: 99.8, status: 'active', signature: 'LATTICE_α_892_V2' },
        { id: 'NK-421', algorithm: 'Dilithium-5', entropy: 99.1, status: 'active', signature: 'SIG_FORCE_421_Ω' }
      ]);
    }
  };

  const generateKey = async () => {
    setGenerating(true);
    sfx.playData();
    try {
      const algo = ['Kyber-1024', 'Dilithium-5', 'Falcon-1024', 'SPHINCS+'][Math.floor(Math.random() * 4)];
      const keyData = await geminiService.generatePQCKey(algo);

      const newKey: NeuralKey = {
        id: keyData.id || `NK-${Math.floor(Math.random() * 1000)}`,
        algorithm: keyData.algorithm || algo,
        entropy: keyData.entropy || 95.5,
        status: 'pending',
        signature: keyData.signature || 'GEN_SIG_UNKNOWN'
      };

      // Save to cloud if authenticated
      if (userId && syncStatus === 'CLOUD') {
        await appwriteService.saveVaultKey(userId, newKey);
      }

      // Also save to local memory as backup
      await memory.save({
        type: 'key',
        content: `Clé générée ${newKey.id}`,
        metadata: newKey
      });

      setKeys(prev => [newKey, ...prev]);
      sfx.playConfirm();
    } catch (e) {
      console.error(e);
      sfx.playAlert();
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn h-full flex flex-col">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-bold font-heading">Coffre-fort PQC</h2>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${syncStatus === 'CLOUD' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-green-400 border-green-500/30 bg-green-500/10'}`}>
              {syncStatus === 'CLOUD' ? '☁ CLOUD_SYNC' : '💾 LOCAL'}
            </span>
          </div>
          <p className="text-gray-400">Gestion des signatures neurales basées sur les réseaux cryptographiques.</p>
        </div>
        <button
          onClick={generateKey}
          disabled={generating}
          className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 flex items-center gap-2"
        >
          {generating ? <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : null}
          {generating ? 'Calcul Lattice...' : 'Générer Signature Neurale'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto custom-scrollbar pr-2 pb-4">
        {keys.map((key) => (
          <div key={key.id} className="group perspective">
            <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-500 hover:neon-border hover:-translate-y-2 hover:rotate-1">
              <div className="absolute top-0 right-0 p-4">
                <div className={`w-2 h-2 rounded-full ${key.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{key.id}</h3>
                    <p className="text-[10px] text-gray-500 font-mono uppercase">{key.algorithm}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[9px] uppercase font-bold text-gray-600 mb-1">
                      <span>Niveau d'Entropie</span>
                      <span>{key.entropy}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${key.entropy}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                    <p className="text-[8px] text-gray-600 uppercase mb-1 font-bold">Signature de Sortie</p>
                    <p className="text-[11px] font-mono text-blue-400 break-all leading-tight">{key.signature}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-white/5 text-[9px] font-bold uppercase hover:bg-white/10 transition-colors">Révoquer</button>
                  <button className="flex-1 py-2 rounded-lg bg-white/5 text-[9px] font-bold uppercase hover:bg-white/10 transition-colors">Exporter</button>
                </div>
              </div>

              {/* Decorative scan line */}
              <div className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-10">
                <div className="w-full h-1 bg-blue-400 absolute animate-[vaultScan_3s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes vaultScan {
          from { top: -10%; }
          to { top: 110%; }
        }
        .perspective { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default PostQuantumVault;
