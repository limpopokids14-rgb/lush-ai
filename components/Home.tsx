import React from 'react';
import { STYLE_TEMPLATES, Icons, RANDOM_FACES } from '../constants';
import { StyleCard } from './StyleCard';

interface HomeProps {
  onStartGen: (styleId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartGen }) => {
  const users = ['Roxz', 'Wades', 'Ronald', 'Cody', 'Maya', 'Sia', 'Tobi', 'Elena', 'Kael', 'Luna', 'Vera', 'Jace', 'Mila', 'Finn', 'Zara'];
  
  // Берем первые 15 лиц для сторис
  const shortImages = RANDOM_FACES.slice(0, 15);
  // Берем следующие 15 лиц для избранного, чтобы не было повторов
  const favImages = RANDOM_FACES.slice(15, 30);

  return (
    <div className="h-full pt-24 pb-12 overflow-y-auto hide-scrollbar animate-in fade-in duration-1000">
      {/* Stories Section */}
      <section className="px-6 space-y-4">
        <h2 className="text-base font-black tracking-tight uppercase italic drop-shadow-md text-white/90">LUSH shorts</h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {users.map((name, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center">
              <div className="w-[88px] h-[88px] rounded-[26px] border-2 border-orange-500 p-0.5 lush-glass shadow-lg relative overflow-hidden group">
                <img src={shortImages[i % shortImages.length]} className="w-full h-full object-cover rounded-[22px]" alt={name} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pt-8 pb-2 flex justify-center items-end">
                   <span className="text-[10px] font-black text-white uppercase tracking-tighter drop-shadow-md">{name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Creators Section */}
      <section className="mt-8 space-y-4 overflow-hidden">
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
                  className="w-56 h-32"
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
                  className="w-56 h-32"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Favourites Section (Exactly 15 unique icons) */}
      <section className="mt-8 px-6 space-y-4 pb-24">
        <h2 className="text-base font-black tracking-tight uppercase italic drop-shadow-md text-white/90">Your favourites</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {favImages.map((url, id) => (
            <div key={id} className="relative flex-shrink-0">
              <div className="w-[74px] h-[74px] rounded-full border-[3px] border-white/10 overflow-hidden shadow-2xl bg-zinc-900 ring-2 ring-black/30">
                <img src={url} className="w-full h-full object-cover" alt="Fav" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-600 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                ✓
              </div>
            </div>
          ))}
          <div className="w-[74px] h-[74px] rounded-full border-2 border-dashed border-white/20 flex-shrink-0 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all cursor-pointer">
            <Icons.Plus size={22} />
          </div>
        </div>
      </section>
    </div>
  );
};
