
import React from 'react';
import { GeneratedItem } from '../types';
import { Icons } from '../constants';

interface DetailModalProps {
  item: GeneratedItem;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lush AI Creation',
          text: `Check out this AI-generated ${item.type} I made with Lush!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed');
      }
    } else {
      alert('Sharing not supported on this browser. Link copied to clipboard!');
      navigator.clipboard.writeText(item.url);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col animate-in fade-in slide-in-from-bottom-full duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="w-10 h-10 lush-glass rounded-full flex items-center justify-center rotate-45">
            <Icons.Plus />
          </button>
          <div className="flex gap-3">
            <button onClick={handleShare} className="w-10 h-10 lush-glass rounded-full flex items-center justify-center">
              <Icons.Share />
            </button>
            <a href={item.url} download className="w-10 h-10 lush-gradient rounded-full flex items-center justify-center">
              <Icons.Download />
            </a>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className={`relative w-full lush-glass rounded-[40px] overflow-hidden shadow-2xl ${item.format === '9:16' ? 'aspect-[9/16] max-h-[60vh]' : 'aspect-square max-h-[50vh]'}`}>
            {item.type === 'image' ? (
              <img src={item.url} className="w-full h-full object-contain" alt="Preview" />
            ) : (
              <video src={item.url} className="w-full h-full object-contain" autoPlay loop controls />
            )}
          </div>

          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Prompt / Style</span>
              <p className="text-sm font-medium text-white/80 line-clamp-3 italic leading-relaxed">
                "{item.prompt}"
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl lush-glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                <div className="w-4 h-4 rounded-sm bg-blue-500"></div> Telegram
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl lush-glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                <div className="w-4 h-4 rounded-sm bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"></div> Instagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
