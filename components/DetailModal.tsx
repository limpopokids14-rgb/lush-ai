
import React, { useState } from 'react';
import { GeneratedItem } from '../types';
import { Icons, STYLE_TEMPLATES, SHARE_ICONS } from '../constants';

interface DetailModalProps {
  items: GeneratedItem[];
  initialIndex: number;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [editPrompt, setEditPrompt] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const item = items[currentIndex];

  const handleShare = () => {
    setShowShareMenu(true);
  };

  const nextItem = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowShareMenu(false);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowShareMenu(false);
    }
  };

  const style = STYLE_TEMPLATES.find(s => s.id === item.styleId);

  return (
    <div className="absolute inset-0 z-[100] bg-black flex flex-col animate-in fade-in slide-in-from-bottom duration-500 overflow-hidden">
      <div className="relative flex-1">
        {/* Main Content Area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {item.type === 'image' ? (
            <img 
              src={item.url} 
              className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" 
              alt="AI Result" 
              key={item.id}
            />
          ) : (
            <video 
              src={item.url} 
              className="w-full h-full object-cover" 
              autoPlay loop muted 
              key={item.id}
            />
          )}
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 left-0 w-1/4 z-40 cursor-w-resize" onClick={prevItem} />
        <div className="absolute inset-y-0 right-0 w-1/4 z-40 cursor-e-resize" onClick={nextItem} />

        {/* Share Menu Overlay */}
        {showShareMenu && (
          <div 
            className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in zoom-in duration-300"
            onClick={() => setShowShareMenu(false)}
          >
            <div 
              className="w-56 h-56 lush-glass rounded-[40px] p-8 flex flex-col items-center justify-center shadow-2xl border border-white/20 animate-in zoom-in duration-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-2 gap-6 w-full h-full">
                {SHARE_ICONS.map((url, i) => (
                  <button 
                    key={i} 
                    onClick={() => setShowShareMenu(false)}
                    className="flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 group"
                  >
                    <img src={url} className="w-12 h-12 object-contain drop-shadow-xl group-hover:brightness-125 transition-all" alt="Social" />
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Share aesthetic</p>
            </div>
          </div>
        )}

        {/* Top Controls Overlay */}
        <div className="absolute top-14 left-0 right-0 px-6 flex justify-between items-center z-50">
          <button 
            onClick={onClose} 
            className="w-10 h-10 lush-glass rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all rotate-45"
          >
            <Icons.Plus />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={handleShare} 
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${showShareMenu ? 'bg-white text-black' : 'lush-glass text-white'}`}
            >
              <Icons.Share />
            </button>
            <a 
              href={item.url} 
              download 
              className="w-10 h-10 lush-card-gradient rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
            >
              <Icons.Download />
            </a>
          </div>
        </div>

        {/* Gradient and Footer Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 z-50">
          <div className="mb-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{style?.name || 'Custom'} Style</span>
             <p className="text-sm font-medium text-white/60 italic line-clamp-2 pr-4">"{item.prompt}"</p>
          </div>

          <div className="lush-glass rounded-full p-1.5 pr-2 flex items-center gap-2 shadow-2xl border border-white/10 pointer-events-auto">
            <input 
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="Refine this look..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium px-4 py-2 placeholder:text-white/20 outline-none"
            />
            <button 
              className="w-11 h-11 rounded-full lush-card-gradient flex items-center justify-center active:scale-90 transition-all"
            >
              <Icons.Sparkles />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-1.5 mt-6">
            {items.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-orange-500' : 'w-1 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
