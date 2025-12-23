
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { appwriteService } from '../services/appwriteService';

const DebuggingAssistant: React.FC = () => {
  const [logs, setLogs] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<'IDLE' | 'TESTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [dbMessage, setDbMessage] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogs(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!logs.trim()) return;
    setLoading(true);
    setAnalysis('');
    try {
      const result = await geminiService.analyzeLogs(logs, fileName || 'Saisie Manuelle');
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis("Erreur lors de l'analyse. Vérifiez la connexion au Noyau.");
    } finally {
      setLoading(false);
    }
  };

  const testDbConnection = async () => {
      setDbStatus('TESTING');
      setDbMessage("Ping Database...");
      try {
          const result = await appwriteService.verifyConnection();
          if (result.success) {
              setDbStatus('SUCCESS');
              setDbMessage(result.message);
          } else {
              setDbStatus('ERROR');
              setDbMessage(result.message);
          }
      } catch (e: any) {
          setDbStatus('ERROR');
          setDbMessage(e.message || "Erreur Critique");
      }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-bold mb-2 font-heading">Assistant de Débogage IA</h2>
            <p className="text-gray-400">Processeur neural de diagnostic pour l'analyse des logs et la maintenance SGBD.</p>
        </div>
        
        {/* APPWRITE STATUS PANEL */}
        <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">État Mémoire Externe</span>
            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-xl border border-white/10">
                <div className={`w-3 h-3 rounded-full ${dbStatus === 'SUCCESS' ? 'bg-green-500' : dbStatus === 'ERROR' ? 'bg-red-500' : dbStatus === 'TESTING' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}></div>
                <span className={`text-[10px] font-mono ${dbStatus === 'SUCCESS' ? 'text-green-400' : dbStatus === 'ERROR' ? 'text-red-400' : 'text-gray-400'}`}>
                    {dbStatus === 'IDLE' ? 'EN ATTENTE' : dbStatus}
                </span>
                <button 
                    onClick={testDbConnection}
                    disabled={dbStatus === 'TESTING'}
                    className="ml-2 px-3 py-1 bg-white/5 hover:bg-white/10 text-[9px] font-bold uppercase rounded border border-white/5 transition-all"
                >
                    TESTER CONNEXION
                </button>
            </div>
            {dbMessage && <p className="text-[9px] font-mono text-gray-400 max-w-[250px] text-right truncate">{dbMessage}</p>}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex-1 glass rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold">Entrée Données</label>
                {fileName && <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 truncate max-w-[150px]">{fileName}</span>}
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] text-blue-400 hover:text-white transition-colors bg-blue-500/10 px-3 py-1 rounded border border-blue-500/20"
                >
                  CHARGER LOG
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".txt,.log,.json,.js,.ts,.tsx,.css" />
                <button 
                  onClick={() => { setLogs(''); setFileName(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="text-[10px] text-gray-500 hover:text-white transition-colors"
                >
                  EFFACER
                </button>
              </div>
            </div>
            <textarea
              value={logs}
              onChange={(e) => setLogs(e.target.value)}
              placeholder="Collez ici les logs système, stack traces, ou chargez un fichier..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none custom-scrollbar text-blue-100"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading || !logs.trim()}
            className="py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 uppercase"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyse Contextuelle...
              </>
            ) : (
              'Synthétiser le Correctif'
            )}
          </button>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col h-full relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 relative z-10">
             <label className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold">Rapport d'Ingénierie</label>
             <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-[10px] text-blue-400 font-mono uppercase">Janus Pro Active</span>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar prose prose-invert prose-sm max-w-none text-gray-300 relative z-10">
            {analysis ? (
              <div className="animate-slideIn">
                <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/```([\s\S]*?)```/g, '<div class="bg-black/50 p-4 rounded-lg my-2 border border-white/10 font-mono text-xs">$1</div>') }} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="font-mono text-xs uppercase tracking-widest">En attente de données brutes...</p>
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="h-full w-full bg-[linear-gradient(0deg,transparent_0%,rgba(59,130,246,0.1)_50%,transparent_100%)] bg-[length:100%_20px] animate-[scan_10s_linear_infinite]"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          from { background-position: 0 0; }
          to { background-position: 0 1000px; }
        }
      `}</style>
    </div>
  );
};

export default DebuggingAssistant;
