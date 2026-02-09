
import React from 'react';
import { GeneratedItem } from '../types';
import { Icons, STYLE_TEMPLATES } from '../constants';

interface LibraryProps {
  items: GeneratedItem[];
  onSelectItem: (item: GeneratedItem) => void;
}

export const Library: React.FC<LibraryProps> = ({ items, onSelectItem }) => {
  if (items.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-12 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20">
          <Icons.Library />
        </div>
        <h3 className="text-xl font-bold">Your library is empty</h3>
        <p className="text-sm text-white/40">Start creating stylish photos and videos to see them here.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase tracking-tighter">My Library</h2>
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{items.length} items</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.sort((a,b) => b.timestamp - a.timestamp).map((item) => {
          const style = STYLE_TEMPLATES.find(s => s.id === item.styleId);
          return (
            <div 
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="aspect-[4/5] rounded-2xl lush-glass overflow-hidden relative cursor-pointer group active:scale-[0.98] transition-all"
            >
              {item.type === 'image' ? (
                <img src={item.url} className="w-full h-full object-cover" alt="Item" />
              ) : (
                <video src={item.url} className="w-full h-full object-cover" muted loop onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} />
              )}
              
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/70">{style?.name || 'Custom'}</span>
                  {item.type === 'video' && <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
