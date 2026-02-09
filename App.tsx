import React, { useState, useEffect, useRef } from 'react';
import { AppTab, GeneratedItem } from './types';
import { Navbar, BottomNav, StatusBar } from './components/Layout';
import { Home } from './components/Home';
import { Generate } from './components/Generate';
import { Library } from './components/Library';
import { DetailModal } from './components/DetailModal';
import { STYLE_TEMPLATES, Icons, RANDOM_FACES } from './constants';

const StoryPreview: React.FC<{ 
  activeTab: AppTab; 
  setActiveTab: (tab: AppTab) => void;
  onReferenceSelected: (url: string) => void;
}> = ({ activeTab, setActiveTab, onReferenceSelected }) => {
  const [styleIndex, setStyleIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => {
        if (prev >= 2) {
          setStyleIndex((s) => (s + 1) % STYLE_TEMPLATES.length);
          return 0;
        }
        return prev + 1;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentStyle = STYLE_TEMPLATES[styleIndex];
  const imageUrl = RANDOM_FACES[(styleIndex * 3 + photoIndex) % RANDOM_FACES.length];

  return (
    <div className="relative h-full w-full bg-black preview-blur-on-hover">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => onReferenceSelected(ev.target?.result as string);
            reader.readAsDataURL(file);
          }
        }}
      />
      
      <div className="absolute top-14 left-0 right-0 z-50 px-5 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            {i < photoIndex && <div className="h-full w-full bg-white" />}
            {i === photoIndex && <div key={`${styleIndex}-${photoIndex}`} className="h-full bg-white animate-progress" style={{ animationDuration: '3.5s' }} />}
          </div>
        ))}
      </div>

      <div className="h-full w-full relative transition-all duration-700 content-to-blur">
        <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30" />
        
        <div className="absolute bottom-24 left-8 right-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full p-0.5 shadow-2xl ring-2 ring-white/10" style={{ background: currentStyle.mood }}>
               <img src={currentStyle.imageUrl} className="w-full h-full object-cover rounded-full outline-img" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Trending Now</p>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none mt-1">{currentStyle.name}</h3>
            </div>
          </div>
          <div className="flex gap-4 items-center">
             <div className="flex-1 h-12 rounded-full lush-glass flex items-center px-6 text-xs font-bold text-white/50 border border-white/10">Quick message...</div>
             <div className="flex gap-5 items-center text-white/90">
               <Icons.Heart />
               <Icons.PaperPlane />
             </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center opacity-0 hover-icon transition-all duration-500 backdrop-blur-md bg-black/40">
        <div className="flex flex-col items-center gap-10">
           <div className="flex items-center gap-12">
              <button onClick={() => setActiveTab(AppTab.HOME)} className={`flex flex-col items-center gap-2 transition-colors ${activeTab === AppTab.HOME ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                <Icons.Home />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Studio</span>
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="w-20 h-20 lush-card-gradient rounded-3xl rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-110 active:scale-95 transition-all">
                <div className="-rotate-45 text-white"><Icons.Plus size={32} /></div>
              </button>
              <button onClick={() => setActiveTab(AppTab.LIBRARY)} className={`flex flex-col items-center gap-2 transition-colors ${activeTab === AppTab.LIBRARY ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                <Icons.Library />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Items</span>
              </button>
           </div>
           <span className="text-[11px] font-black uppercase tracking-[6px] text-white/80 animate-pulse">Select Your Base</span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [library, setLibrary] = useState<GeneratedItem[]>([]);
  const [selectedStyleId, setSelectedStyleId] = useState<string | undefined>();
  const [previewItem, setPreviewItem] = useState<GeneratedItem | null>(null);
  const [externalRef, setExternalRef] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lush_library');
    if (saved) {
      try { setLibrary(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleItemGenerated = (item: GeneratedItem) => {
    const newList = [item, ...library];
    setLibrary(newList);
    localStorage.setItem('lush_library', JSON.stringify(newList));
    setExternalRef(null);
  };

  const startGenWithStyle = (styleId: string) => {
    setSelectedStyleId(styleId);
    setActiveTab(AppTab.GENERATE);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] flex items-center justify-center overflow-hidden p-4 lg:p-10">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row items-center justify-center gap-12 xl:gap-24 w-full max-w-[1650px] h-full max-h-[850px]">
        
        {/* Left Column: Styles */}
        <div className="flex flex-col w-[440px] h-full pt-4">
          <div className="mb-12 flex-shrink-0 pl-2">
            <h1 className="text-8xl xl:text-9xl font-black italic tracking-tighter uppercase leading-[0.7] text-white select-none">LUSH<br/>STUDIO</h1>
            <p className="mt-8 text-[11px] font-black text-white/20 uppercase tracking-[10px] pl-1">Premium AI Aesthetics</p>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-6 hide-scrollbar space-y-5 pb-24">
            {STYLE_TEMPLATES.map((style) => (
              <div 
                key={style.id} 
                onClick={() => startGenWithStyle(style.id)}
                className="group h-36 rounded-[36px] overflow-hidden relative shadow-2xl cursor-pointer hover:scale-[1.04] active:scale-95 transition-all duration-500"
                style={{ background: style.mood }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="relative h-full flex flex-col justify-center p-10 z-20">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-2xl">{style.name}</h3>
                  <span className="text-[11px] font-black opacity-80 uppercase mt-3 tracking-[0.2em] text-white/70">{style.id.split('-')[1]} mode</span>
                </div>
                <img src={style.imageUrl} className="absolute -bottom-8 -right-6 h-[145%] object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out outline-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Main Phone Frame */}
        <div className="phone-frame border-[#222] shadow-[0_60px_150px_rgba(0,0,0,0.9),0_20px_60px_rgba(255,107,0,0.15)]">
          <StatusBar />
          <Navbar />
          <main className="h-full bg-black">
            {activeTab === AppTab.HOME && <Home onStartGen={startGenWithStyle} />}
            {activeTab === AppTab.GENERATE && (
              <Generate 
                initialStyleId={selectedStyleId} 
                onItemGenerated={handleItemGenerated} 
                externalRefImage={externalRef || undefined}
              />
            )}
            {activeTab === AppTab.LIBRARY && (
              <Library items={library} onSelectItem={setPreviewItem} />
            )}
          </main>
          {previewItem && <DetailModal item={previewItem} onClose={() => setPreviewItem(null)} />}
        </div>

        {/* Right: Preview Phone Frame */}
        <div className="phone-frame border-[#222] opacity-90 hover:opacity-100 transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
          <StatusBar />
          <StoryPreview 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onReferenceSelected={(url) => { setExternalRef(url); setActiveTab(AppTab.GENERATE); }} 
          />
        </div>
      </div>

      {/* Mobile-Only Layout */}
      <div className="lg:hidden w-full h-full max-w-[500px] relative">
        <div className="h-full w-full phone-frame !w-full !h-full !border-0 !rounded-none !shadow-none">
          <StatusBar />
          <Navbar />
          <main className="h-full bg-black">
            {activeTab === AppTab.HOME && <Home onStartGen={startGenWithStyle} />}
            {activeTab === AppTab.GENERATE && (
              <Generate 
                initialStyleId={selectedStyleId} 
                onItemGenerated={handleItemGenerated} 
                externalRefImage={externalRef || undefined}
              />
            )}
            {activeTab === AppTab.LIBRARY && (
              <Library items={library} onSelectItem={setPreviewItem} />
            )}
          </main>
          {previewItem && <DetailModal item={previewItem} onClose={() => setPreviewItem(null)} />}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default App;
