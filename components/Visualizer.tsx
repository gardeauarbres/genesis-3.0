
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { geminiService } from '../services/geminiService';

interface VisualizerProps {
  initialParams?: { prompt: string; type: 'image' | 'video' } | null;
  onConsumed?: () => void;
}

const Visualizer: React.FC<VisualizerProps> = ({ initialParams, onConsumed }) => {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'pro'>('image');
  const [proSize, setProSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [videoDuration, setVideoDuration] = useState<5 | 8>(5);
  const [showCamera, setShowCamera] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', aspectRatio: 16/9 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err);
      alert("Impossible d'accéder à la caméra.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditedImage(null);
        setVideoUrl(null);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = useCallback(async (p?: string, t?: 'image' | 'video' | 'pro') => {
    const activePrompt = p || prompt;
    const activeType = t || activeTab;

    if (!activePrompt.trim()) return;
    setLoading(true);
    try {
      if (activeType === 'image') {
        if (image) {
          const base64 = image.split(',')[1];
          const result = await geminiService.editImage(base64, activePrompt);
          setEditedImage(result);
        } else {
          alert("Image de référence requise.");
        }
      } else if (activeType === 'pro') {
        const result = await geminiService.generateHighQualityImage(activePrompt, proSize);
        setEditedImage(result);
      } else if (activeType === 'video') {
        const base64 = image?.split(',')[1];
        // Passage de la durée sélectionnée au service
        const result = await geminiService.generateVeoVideo(activePrompt, base64, videoDuration);
        setVideoUrl(result);
      }
    } catch (error: any) {
      console.error(error);
      alert("Échec de la synthèse.");
    } finally {
      setLoading(false);
    }
  }, [prompt, activeTab, image, proSize, videoDuration]);

  useEffect(() => {
    if (initialParams) {
      setPrompt(initialParams.prompt);
      const type = initialParams.type === 'image' ? 'image' : 'video';
      setActiveTab(type);
      handleAction(initialParams.prompt, type);
      onConsumed?.();
    }
  }, [initialParams, handleAction, onConsumed]);

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn h-full flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading italic">Synthèse Visuelle</h2>
          <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mt-2">Manifeste Visuel & Mutation Architecturale</p>
        </div>
        
        {/* Sélecteur de résolution pour Pro */}
        {activeTab === 'pro' && (
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 self-start md:self-auto">
            {(['1K', '2K', '4K'] as const).map(size => (
              <button key={size} onClick={() => setProSize(size)} className={`px-4 py-1 text-[10px] font-bold rounded transition-colors ${proSize === size ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}>{size}</button>
            ))}
          </div>
        )}

        {/* Sélecteur de durée pour Veo */}
        {activeTab === 'video' && (
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 self-start md:self-auto items-center gap-2 px-2">
            <span className="text-[9px] font-bold text-gray-500 uppercase mr-1">Durée:</span>
            {[5, 8].map(duration => (
              <button 
                key={duration} 
                onClick={() => setVideoDuration(duration as 5 | 8)} 
                className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${videoDuration === duration ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {duration}s
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-wrap gap-2 md:gap-4">
        <button onClick={() => { setActiveTab('image'); stopCamera(); }} className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${activeTab === 'image' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}>Édition</button>
        <button onClick={() => { setActiveTab('pro'); stopCamera(); }} className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${activeTab === 'pro' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}>Gen Pro</button>
        <button onClick={() => { setActiveTab('video'); stopCamera(); }} className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${activeTab === 'video' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}>Anim Veo</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 flex-1 min-h-0">
        <div className="space-y-4 flex flex-col min-h-0">
          {activeTab !== 'pro' && (
            <div className="aspect-video glass rounded-[2rem] flex items-center justify-center overflow-hidden border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-all group relative shrink-0">
              {showCamera ? (
                <div className="w-full h-full relative">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                  <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4 z-20">
                    <button onClick={captureImage} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase shadow-2xl">Capturer</button>
                    <button onClick={stopCamera} className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-[10px] uppercase shadow-2xl">Fermer</button>
                  </div>
                </div>
              ) : image ? (
                <img src={image} alt="Original" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8 opacity-20">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">Matrice Vide</p>
                </div>
              )}
              
              {!showCamera && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all gap-4 backdrop-blur-sm p-4">
                  <button onClick={() => fileInputRef.current?.click()} className="bg-white text-black px-6 py-2 rounded-lg font-bold text-[10px] w-full max-w-[160px] uppercase tracking-widest">Fichier Local</button>
                  <button onClick={startCamera} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-[10px] w-full max-w-[160px] uppercase tracking-widest shadow-lg shadow-blue-500/30">Caméra</button>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          <div className="glass p-6 md:p-8 rounded-[2rem] bg-black/40 border border-white/5 space-y-4 flex-1 flex flex-col">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Description de la mutation visuelle..." className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 md:p-6 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none flex-1 min-h-[100px] font-mono text-xs text-blue-100/80 shadow-inner" />
            <button onClick={() => handleAction()} disabled={loading || (activeTab === 'image' && !image)} className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(37,99,235,0.2)]">
              {loading ? 'Traitement en cours...' : 'Exécuter Synthèse'}
            </button>
          </div>
        </div>

        <div className="aspect-video lg:aspect-auto glass rounded-[2.5rem] flex items-center justify-center overflow-hidden relative bg-black/80 border border-white/5 shadow-2xl min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center gap-6">
               <div className="animate-spin w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full" />
               <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest animate-pulse">Synthèse en cours...</p>
            </div>
          ) : editedImage ? (
            <img src={editedImage} className="w-full h-full object-contain" />
          ) : videoUrl ? (
            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
          ) : (
            <div className="text-center opacity-10 flex flex-col items-center">
              <svg className="w-24 h-24 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <p className="text-gray-600 font-mono text-xs uppercase tracking-[0.4em]">Signal Alpha Absent</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
