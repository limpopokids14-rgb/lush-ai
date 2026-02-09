
import React, { useState, useRef, useEffect } from 'react';
import { STYLE_TEMPLATES, Icons } from '../constants';
import { MediaFormat, MediaType, StyleTemplate, GeneratedItem } from '../types';
import { generateImageFromRef } from '../services/geminiService';

interface GenerateProps {
  initialStyleId?: string;
  onItemGenerated: (item: GeneratedItem) => void;
  onApiError?: (msg: string) => void;
  externalRefImage?: string;
}

export const Generate: React.FC<GenerateProps> = ({ initialStyleId, onItemGenerated, onApiError, externalRefImage }) => {
  const [refImage, setRefImage] = useState<string | null>(externalRefImage || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (externalRefImage) setRefImage(externalRefImage);
  }, [externalRefImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRefImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const currentStyle = STYLE_TEMPLATES.find(s => s.id === initialStyleId) || STYLE_TEMPLATES[0];

  const handleGenerate = async () => {
    if (!refImage) return;
    setIsGenerating(true);
    try {
      const result = await generateImageFromRef(refImage, currentStyle.promptPrefix, '9:16');
      onItemGenerated({
        id: Math.random().toString(36).substr(2, 9),
        url: result,
        type: 'image',
        timestamp: Date.now(),
        prompt: currentStyle.promptPrefix,
        format: '9:16',
        styleId: currentStyle.id
      });
      alert("Style Applied!");
      setRefImage(null);
    } catch (error: any) {
      if (error.message === "API_KEY_RESET") onApiError?.("API_KEY_RESET");
      else alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
      <div className="absolute top-14 left-0 right-0 z-50 px-4 flex gap-1.5">
        <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
        <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
        <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
      </div>

      <div className="relative flex-1 group">
        <img 
          src={currentStyle.imageUrl} 
          className="w-full h-full object-cover transition-all duration-700" 
          alt="Style" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md opacity-0 hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer">
          <div className="w-16 h-16 rounded-full lush-card-gradient flex items-center justify-center shadow-2xl">
            <Icons.Plus size={24} />
          </div>
          <span className="mt-4 text-[10px] font-black uppercase tracking-[3px]">Add Ref Image</span>
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
        <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-12 text-center space-y-6">
           <img src={refImage} className="w-40 h-40 rounded-3xl object-cover border-4 border-orange-500 shadow-2xl" />
           <div className="space-y-1">
             <h3 className="text-2xl font-black italic tracking-tighter uppercase">Magic Style</h3>
             <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Applying {currentStyle.name}</p>
           </div>
           <button onClick={handleGenerate} className="w-full py-5 rounded-3xl lush-card-gradient text-sm font-black uppercase tracking-widest">Apply Now</button>
           <button onClick={() => setRefImage(null)} className="text-[10px] font-black uppercase tracking-widest text-white/20">Cancel</button>
        </div>
      )}

      {isGenerating && (
        <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-orange-500 animate-spin mb-6" />
          <h3 className="text-xl font-black italic uppercase tracking-widest animate-pulse">Styling...</h3>
        </div>
      )}
    </div>
  );
};
