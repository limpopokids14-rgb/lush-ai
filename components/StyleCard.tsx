
import React from 'react';
import { StyleTemplate } from '../types';

interface StyleCardProps {
  style: StyleTemplate;
  onClick: () => void;
  className?: string;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, onClick, className = "" }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative flex-shrink-0 w-64 h-36 rounded-[28px] overflow-hidden cursor-pointer active:scale-[0.98] transition-all group shadow-xl ${className}`}
      style={{ background: style.mood }}
    >
      {/* 1. Background layer */}
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      
      {/* 2. Silhouette layer with white outline */}
      <img 
        src={style.imageUrl} 
        className="absolute bottom-0 -right-2 h-[120%] w-auto object-contain transition-transform duration-700 group-hover:scale-110 z-10 outline-img pointer-events-none" 
        alt={style.name} 
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600&h=800`;
        }}
      />

      {/* 3. Text Overlay - Topmost layer (z-20) */}
      <div className="relative h-full flex flex-col justify-center p-6 z-20 pointer-events-none">
        <h3 className="text-2xl font-black italic tracking-tighter leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {style.name}
        </h3>
        <p className="text-[10px] font-bold text-white/90 mt-1 uppercase tracking-widest drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {style.description}
        </p>
      </div>
      
      {/* 4. Glossy highlights */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 opacity-70 pointer-events-none"></div>
    </div>
  );
};
