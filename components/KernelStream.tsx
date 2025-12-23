
import React, { useState, useEffect, useRef } from 'react';
import { groqService } from '../services/groqService';

export const KernelStream: React.FC<{ view: string }> = ({ view }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLine = (text: string) => {
    setLines(prev => [...prev.slice(-15), `> ${text}`]);
  };

  useEffect(() => {
    // Message initial au changement de vue
    groqService.generateFastThought(`Navigation vers module ${view}`).then(addLine);
  }, [view]);

  useEffect(() => {
    const handleInteraction = (e: any) => {
      const context = e.detail;
      // Feedback immédiat (latence 0)
      addLine(`INPUT_DETECTED: ${context}`);
      // Feedback IA (latence <200ms)
      groqService.generateFastThought(context).then(addLine);
    };

    window.addEventListener('genesis-interaction', handleInteraction);
    return () => window.removeEventListener('genesis-interaction', handleInteraction);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="fixed bottom-6 right-6 w-80 h-48 z-50 pointer-events-none hidden lg:flex flex-col font-mono text-[10px] animate-slideIn">
      <div className="bg-black/90 border border-green-500/30 rounded-t-lg p-2 flex justify-between items-center backdrop-blur-md">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-green-500 font-bold tracking-widest">GROQ LPU CORE</span>
         </div>
         <span className="text-gray-500">LATENCY: 4ms</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 bg-black/80 border-x border-b border-green-500/30 rounded-b-lg p-3 overflow-hidden flex flex-col justify-end shadow-[0_0_30px_rgba(34,197,94,0.1)]"
      >
        {lines.map((line, i) => (
          <div key={i} className="text-green-400/80 mb-1 leading-tight break-all border-l-2 border-green-500/0 hover:border-green-500/50 pl-1 transition-all">
            {line}
          </div>
        ))}
        <div className="text-green-500 animate-pulse">_</div>
      </div>
    </div>
  );
};

export default KernelStream;
