
import React, { useState, useRef, useEffect } from 'react';
import { STYLE_TEMPLATES, Icons } from '../constants';
import { MediaFormat, MediaType, StyleTemplate, GeneratedItem } from '../types';
import { generateImageFromRef, editImageByPrompt, generateVideoFromRef } from '../services/geminiService';

interface GenerateProps {
  initialStyleId?: string;
  onItemGenerated: (item: GeneratedItem) => void;
  onApiError?: (msg: string) => void;
  onResultVisibilityChange?: (visible: boolean) => void;
  externalRefImage?: string;
}

export const Generate: React.FC<GenerateProps> = ({ 
  initialStyleId, 
  onItemGenerated, 
  onApiError, 
  onResultVisibilityChange,
  externalRefImage 
}) => {
  const [refImage, setRefImage] = useState<string | null>(externalRefImage || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resultItem, setResultItem] = useState<GeneratedItem | null>(null);
  const [ghostThumb, setGhostThumb] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (externalRefImage) setRefImage(externalRefImage);
  }, [externalRefImage]);

  // Notify parent when result screen is shown/hidden
  useEffect(() => {
    onResultVisibilityChange?.(!!resultItem);
  }, [resultItem, onResultVisibilityChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRefImage(reader.result as string);
        setResultItem(null); 
      };
      reader.readAsDataURL(file);
    }
  };

  const currentStyle = STYLE_TEMPLATES.find(s => s.id === initialStyleId) || STYLE_TEMPLATES[0];

  const handleGenerateMedia = async (type: MediaType) => {
    if (!refImage) return;
    setIsGenerating(true);
    try {
      let resultUrl = "";
      if (type === 'image') {
        resultUrl = await generateImageFromRef(refImage, currentStyle.promptPrefix, '9:16');
      } else {
        resultUrl = await generateVideoFromRef(refImage, currentStyle.promptPrefix, '9:16');
      }

      const newItem: GeneratedItem = {
        id: Math.random().toString(36).substr(2, 9),
        url: resultUrl,
        type: type,
        timestamp: Date.now(),
        prompt: currentStyle.promptPrefix,
        format: '9:16',
        styleId: currentStyle.id
      };
      setResultItem(newItem);
    } catch (error: any) {
      if (error.message === "API_KEY_RESET") onApiError?.("API_KEY_RESET");
      else alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = async () => {
    if (!resultItem || !editPrompt.trim()) return;
    setIsEditing(true);
    try {
      const editedUrl = await editImageByPrompt(resultItem.url, editPrompt);
      setResultItem({
        ...resultItem,
        url: editedUrl,
        prompt: `${resultItem.prompt} + ${editPrompt}`
      });
      setEditPrompt("");
    } catch (error: any) {
      alert(`Edit Error: ${error.message}`);
    } finally {
      setIsEditing(false);
    }
  };

  const saveToLibrary = () => {
    if (resultItem) {
      setGhostThumb(resultItem.url);
      onItemGenerated(resultItem);
      setTimeout(() => setGhostThumb(null), 850);
    }
  };

  // RESULT SCREEN - z-[200] to cover everything including Navbar
  if (resultItem) {
    return (
      <div className="absolute inset-0 z-[200] bg-black flex flex-col animate-in fade-in slide-in-from-bottom duration-500">
        <div className="relative flex-1 overflow-hidden">
          {resultItem.type === 'image' ? (
            <img src={resultItem.url} className="w-full h-full object-cover" alt="AI Result" />
          ) : (
            <video src={resultItem.url} className="w-full h-full object-cover" autoPlay loop muted />
          )}

          {ghostThumb && (
            <div className="absolute inset-0 z-[210] flex items-center justify-center pointer-events-none">
              <img src={ghostThumb} className="w-full h-full object-cover animate-fly" alt="Ghost" />
            </div>
          )}
          
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center z-[220]">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-orange-500 animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Refining style...</p>
            </div>
          )}
          
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-14 left-0 right-0 px-6 flex justify-between items-center z-[210]">
            <button 
              onClick={() => setResultItem(null)} 
              className="w-10 h-10 lush-glass rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all hover:bg-white/20"
            >
              <Icons.Close />
            </button>
            <button 
              onClick={saveToLibrary} 
              className="px-6 py-2.5 rounded-full bg-orange-600 text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-110 hover:bg-orange-500 active:scale-95 transition-all"
            >
              Save
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 pb-20 z-[210]">
          <div className="lush-glass rounded-full p-1.5 pr-2 flex items-center gap-2 shadow-2xl border border-white/10">
            <input 
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="Refine: 'add gold glow'..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium px-4 py-2 placeholder:text-white/20 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            />
            <button 
              onClick={handleEdit}
              disabled={!editPrompt.trim() || isEditing || resultItem.type === 'video'}
              className="w-11 h-11 rounded-full lush-card-gradient flex items-center justify-center disabled:opacity-30 disabled:grayscale hover:scale-110 active:scale-90 transition-all shadow-lg"
            >
              <Icons.Sparkles />
            </button>
          </div>
          <p className="text-[8px] text-white/20 font-bold uppercase tracking-[0.3em] text-center mt-6">LUSH AI STUDIO PREVIEW</p>
        </div>
      </div>
    );
  }

  // CHOICE SCREEN
  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
      <div className="absolute top-14 left-0 right-0 z-50 px-4 flex gap-1.5">
        <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
        <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
        <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
      </div>

      <div className="relative flex-1 group">
        <img src={currentStyle.imageUrl} className="w-full h-full object-cover transition-all duration-700" alt="Style Template" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md opacity-0 hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer">
          <div className="w-16 h-16 rounded-full lush-card-gradient flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <Icons.Plus size={24} />
          </div>
          <span className="mt-4 text-[10px] font-black uppercase tracking-[3px]">Select Reference</span>
        </div>

        <div className="absolute bottom-16 left-8 right-8 z-30 pointer-events-none">
          <div className="mb-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Current Style</span>
             <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white">{currentStyle.name}</h2>
          </div>
        </div>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      {refImage && !isGenerating && (
        <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-12 text-center space-y-5 animate-in zoom-in duration-300">
           <img src={refImage} className="w-32 h-32 rounded-3xl object-cover border-4 border-orange-500 shadow-2xl smooth-scale" />
           <div className="space-y-1">
             <h3 className="text-2xl font-black italic tracking-tighter uppercase">Generate Style</h3>
             <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Applying {currentStyle.name}</p>
           </div>
           
           <div className="w-full space-y-3 pt-2">
             <button 
               onClick={() => handleGenerateMedia('image')} 
               className="w-full py-5 rounded-3xl bg-white text-black text-sm font-black uppercase tracking-widest hover:scale-[1.05] hover:bg-gray-100 hover:shadow-2xl active:scale-[0.97] transition-all"
             >
               PHOTO
             </button>
             <button 
               onClick={() => handleGenerateMedia('video')} 
               className="w-full py-5 rounded-3xl lush-card-gradient text-white text-sm font-black uppercase tracking-widest hover:scale-[1.05] hover:brightness-110 hover:shadow-orange-500/30 active:scale-[0.97] transition-all"
             >
               VIDEO
             </button>
           </div>

           <button onClick={() => setRefImage(null)} className="text-[10px] font-black uppercase tracking-widest text-white/20 pt-4 hover:text-white/60 transition-colors">Change Photo</button>
        </div>
      )}

      {isGenerating && (
        <div className="absolute inset-0 z-[140] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-orange-500 animate-spin mb-6" />
          <h3 className="text-xl font-black italic uppercase tracking-widest animate-pulse">Generating Aesthetics...</h3>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-4">Creating your unique masterpiece</p>
        </div>
      )}
    </div>
  );
};
