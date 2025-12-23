
import React, { useEffect, useState, useRef } from 'react';
import { sfx } from '../services/sfx';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  // On démarre immédiatement car l'AudioContext a été activé par le LoginScreen
  const [started, setStarted] = useState(true); 
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const bootSteps = [
    { text: "INITIALISATION DU NOYAU GENESIS v5.3...", delay: 200 },
    { text: "AUTHENTIFICATION AGENT... ACCÈS CONFIRMÉ.", delay: 400 },
    { text: "ALLOCATION MÉMOIRE HEAP [################----] 80%", delay: 600 },
    { text: "CHARGEMENT MODULES NEURAUX...", delay: 800 },
    { text: "> Cortex_Vision.sys ... OK", delay: 900 },
    { text: "> Audio_Bridge.dll ... OK", delay: 1000 },
    { text: "> PQC_Lattice_Guard.exe ... OK", delay: 1100 },
    { text: "VÉRIFICATION INTÉGRITÉ POST-QUANTIQUE...", delay: 1300 },
    { text: "GÉNÉRATION DES CLÉS ÉPHÉMÈRES...", delay: 1500 },
    { text: "SYNCHRONISATION AVEC LE NOYAU DISTANT (GEMINI 2.5 FLASH)...", delay: 1800 },
    { text: "ISOLATION DU PROCESSEUR LPU (GROQ)...", delay: 2000 },
    { text: "DÉPLOIEMENT DU PARE-FEU COGNITIF...", delay: 2200 },
    { text: "SYSTÈME PRÊT. BIENVENUE.", delay: 2500 },
  ];

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= bootSteps.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
        return;
      }

      const step = bootSteps[currentIndex];
      setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${step.text}`]);
      sfx.playData();
      
      // Auto scroll
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }

      // Update progress bar
      setProgress(((currentIndex + 1) / bootSteps.length) * 100);

      currentIndex++;
    }, 150);

    return () => clearInterval(interval);
  }, [started, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-xs p-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex justify-center mb-12">
           <div className="relative">
             <div className="w-24 h-24 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
             <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-500 text-2xl animate-pulse">Ω</div>
           </div>
        </div>

        <div 
          ref={containerRef}
          className="h-64 overflow-y-auto bg-gray-900/50 border border-gray-800 p-6 rounded-xl shadow-2xl font-mono text-green-400 space-y-2 custom-scrollbar"
        >
          {logs.map((log, i) => (
            <div key={i} className="whitespace-pre-wrap">{log}</div>
          ))}
          <div className="animate-pulse">_</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-gray-500 uppercase tracking-widest text-[10px]">
            <span>Séquence d'amorçage</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out shadow-[0_0_20px_#2563eb]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-8 text-gray-600 text-[10px] uppercase tracking-[0.5em]">
        QuantuMech Systems © 2025
      </div>
    </div>
  );
};

export default BootSequence;
