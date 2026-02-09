
import React from 'react';
import { STYLE_TEMPLATES, Icons, RANDOM_FACES } from '../constants';
import { StyleCard } from './StyleCard';

interface HomeProps {
  onStartGen: (styleId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartGen }) => {
  const users = ['Roxz', 'Wades', 'Ronald', 'Cody', 'Maya', 'Sia', 'Tobi', 'Elena', 'Kael', 'Luna', 'Vera', 'Jace', 'Mila', 'Finn', 'Zara'];
  
  // Use provided PNGs for the shorts if possible, or high quality faces
  const shortImages = RANDOM_FACES.slice(0, 15);
  const favImages = RANDOM_FACES.slice(15, 30);

  return (
    <div className="h-full pt-24 pb-4 overflow-y-auto hide-scrollbar animate-in fade-in duration-1000">
      {/* Stories Section (Ref 1: Names on icons) */}
      <section className="px-6 space-y-3">
        <h2 className="text-base font-black tracking-tight uppercase italic drop-shadow-md text-white/90">Zirka shorts</h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {users.map((name, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center">
              <div className="w-[84px] h-[84px] rounded-[24px] border-2 border-orange-500 p-0.5 lush-glass shadow-lg relative overflow-hidden group">
                <img src={shortImages[i % shortImages.length]} className="w-full h-full object-cover rounded-[20px]" alt={name} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-6 pb-1.5 flex justify-center items-end">
                   <span className="text-[11px] font-black text-white uppercase tracking-tighter drop-shadow-md">{name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Creators Section */}
      <section className="mt-6 space-y-3 overflow-hidden">
        <div className="px-6 flex items-center justify-between">
          <h2 className="text-base font-black tracking-tight uppercase italic drop-shadow-md text-white/90">Top creators</h2>
          <button className="text-[9px] text-white/30 font-black uppercase tracking-widest">See all</button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <div className="carousel-track">
              {[...STYLE_TEMPLATES.slice(0, 8), ...STYLE_TEMPLATES.slice(0, 8)].map((style, idx) => (
                <StyleCard 
                  key={`row1-${style.id}-${idx}`} 
                  style={style} 
                  onClick={() => onStartGen(style.id)} 
                  className="w-52 h-30"
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="carousel-track-reverse">
              {[...STYLE_TEMPLATES.slice(7, 15), ...STYLE_TEMPLATES.slice(7, 15)].map((style, idx) => (
                <StyleCard 
                  key={`row2-${style.id}-${idx}`} 
                  style={style} 
                  onClick={() => onStartGen(style.id)} 
                  className="w-52 h-30"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Favourites Section (Ref 2: Larger icons) */}
      <section className="mt-6 px-6 space-y-3 pb-8">
        <h2 className="text-base font-black tracking-tight uppercase italic drop-shadow-md text-white/90">Your favourites</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {favImages.map((url, id) => (
            <div key={id} className="relative flex-shrink-0">
              <div className="w-[72px] h-[72px] rounded-full border-[3px] border-white/10 overflow-hidden shadow-2xl bg-zinc-900">
                <img src={url} className="w-full h-full object-cover" alt="Fav" onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${id % 2 === 0 ? '1534528741775-53994a69daeb' : '1507003211169-0a1dd7228f2d'}?auto=format&fit=crop&q=80&w=200`;
                }} />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-600 rounded-full border-[2.5px] border-black flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                ✓
              </div>
            </div>
          ))}
          <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-white/20 flex-shrink-0 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all">
            <Icons.Plus size={20} />
          </div>
        </div>
      </section>
    </div>
  );
};
