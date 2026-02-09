
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
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentStyle = STYLE_TEMPLATES[styleIndex];
  // Ensure we use a cycle from the verified RANDOM_FACES pool
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
      
      {/* Progress Bars */}
      <div className="absolute top-14 left-0 right-0 z-50 px-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            {i < photoIndex && <div className="h-full w-full bg-white" />}
            {i === photoIndex && <div key={`${styleIndex}-${photoIndex}`} className="h-full bg-white animate-progress" style={{ animationDuration: '3s' }} />}
          </div>
        ))}
      </div>

      <div className="h-full w-full relative transition-all duration-700 animate-in fade-in zoom-in-95 content-to-blur">
        <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40" />
        
        <div className="absolute bottom-24 left-8 right-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full p-0.5 shadow-2xl" style={{ background: currentStyle.mood }}>
               <img src={currentStyle.imageUrl} className="w-full h-full object-cover rounded-full outline-img" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">Featured AI</p>
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">{currentStyle.name}</h3>
            </div>
          </div>
          <div className="flex gap-4 items-center">
             <div className="flex-1 h-12 rounded-full lush-glass flex items-center px-6 text-xs font-bold text-white/50 border border-white/10">Message...</div>
             <div className="flex gap-4 items-center text-white/80">
               <Icons.Heart />
               <Icons.PaperPlane />
             </div>
          </div>
        </div>
      </div>

      {/* Hover Controls - Moved from center phone to right phone as interaction layer */}
      <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center opacity-0 hover-icon transition-all duration-300 backdrop-blur-sm bg-black/40">
        <div className="flex flex-col items-center gap-8">
           <div className="flex items-center gap-10">
              <button 
                onClick={() => setActiveTab(AppTab.HOME)}
                className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === AppTab.HOME ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`}
              >
                <Icons.Home />
                <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
              </button>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`w-16 h-16 lush-card-gradient rounded-2xl rotate-45 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all`}
              >
                <div className="-rotate-45 text-white">
                  <Icons.Plus size={24} />
                </div>
              </button>

              <button 
                onClick={() => setActiveTab(AppTab.LIBRARY)}
                className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === AppTab.LIBRARY ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`}
              >
                <Icons.Library />
                <span className="text-[9px] font-black uppercase tracking-widest">Library</span>
              </button>
           </div>
           
           <span className="text-[10px] font-black uppercase tracking-[4px] text-white/60 animate-pulse">Use as Reference</span>
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

  const handleRefFromPreview = (url: string) => {
    setExternalRef(url);
    setActiveTab(AppTab.GENERATE);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center lg:p-12 overflow-x-hidden select-none">
      <div className="hidden lg:flex gap-12 items-center max-w-[1200px] w-full">
        {/* Left Column: Style Gallery */}
        <div className="flex-1 max-w-[320px] h-[812px] flex flex-col pt-12">
           <div className="mb-12 flex-shrink-0">
             <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.7] text-white">LUSH<br/>STUDIO</h1>
             <p className="mt-6 text-[11px] font-black text-white/20 uppercase tracking-[6px]">Premium AI Styles</p>
           </div>
           
           <div className="flex-1 overflow-y-auto pr-4 hide-scrollbar space-y-4 pb-20 mask-gradient">
             {STYLE_TEMPLATES.map((style) => (
               <div 
                 key={style.id} 
                 onClick={() => startGenWithStyle(style.id)}
                 className="group h-28 rounded-[28px] overflow-hidden relative shadow-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-300"
                 style={{ background: style.mood }}
               >
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  <div className="relative h-full flex flex-col justify-center p-6 z-20">
                     <h3 className="text-lg font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-md">{style.name}</h3>
                     <span className="text-[9px] font-bold opacity-70 uppercase mt-1 tracking-widest text-white">{style.id.split('-')[1]}</span>
                  </div>
                  <img src={style.imageUrl} className="absolute -bottom-4 -right-3 h-[120%] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 outline-img" />
               </div>
             ))}
           </div>
        </div>

        {/* Center Main App Phone - Optimized Scale, Removed navigation footer to prevent stretching */}
        <div className="phone-frame border-[#2a2a2a] shadow-[0_40px_100px_rgba(255,107,0,0.1)] scale-[1.0] z-20">
          <StatusBar />
          <Navbar />
          <main className="h-full">
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

        {/* Right Column: Story Preview Phone - Matched Scale to Center */}
        <div className="phone-frame border-[#2a2a2a] opacity-90 hover:opacity-100 transition-opacity duration-500 scale-[1.0] z-10 shadow-2xl">
          <StatusBar />
          <StoryPreview 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onReferenceSelected={handleRefFromPreview} 
          />
        </div>
      </div>

      {/* Mobile Only View */}
      <div className="lg:hidden w-full h-full fixed inset-0">
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
  );
};

export default App;
