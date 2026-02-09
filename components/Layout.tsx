
import React, { useState, useEffect } from 'react';
import { AppTab } from '../types';
import { Icons } from '../constants';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-bar">
      <span className="text-[15px] tracking-tight">{time}</span>
      <div className="flex gap-1.5 items-center">
        {/* Signal Bars */}
        <div className="flex gap-[1px] items-end h-[10px]">
          <div className="w-[3px] h-[30%] bg-white rounded-[1px]"></div>
          <div className="w-[3px] h-[50%] bg-white rounded-[1px]"></div>
          <div className="w-[3px] h-[80%] bg-white rounded-[1px]"></div>
          <div className="w-[3px] h-[100%] bg-white rounded-[1px]"></div>
        </div>
        {/* WiFi */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21l-12-12c4.1-4.1 10.9-4.1 15 0s4.1 10.9 0 15l-3-3z" opacity="0.3"/>
          <path d="M12 18l-9-9c3.1-3.1 8.1-3.1 11.2 0s3.1 8.1 0 11.2l-2.2-2.2z"/>
        </svg>
        {/* Battery */}
        <div className="relative w-[24px] h-[12px] border-[1.5px] border-white/50 rounded-[3px] p-[1px] flex items-center">
           <div className="h-full w-[80%] bg-white rounded-[1px]"></div>
           <div className="absolute -right-[3px] top-[3px] w-[2px] h-[4px] bg-white/50 rounded-r-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => (
  <header className="absolute top-11 left-0 right-0 z-50 h-14 flex items-center justify-between px-6">
    <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
      <Icons.Search />
    </button>
    <h1 className="text-xl font-black italic tracking-tighter uppercase text-white drop-shadow-md">LUSH</h1>
    <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden shadow-lg shadow-black/40">
      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
    </div>
  </header>
);

export const BottomNav: React.FC<{ activeTab: AppTab; setActiveTab: (tab: AppTab) => void }> = ({ activeTab, setActiveTab }) => (
  <nav className="absolute bottom-0 left-0 right-0 z-50 h-20 bg-black/50 backdrop-blur-2xl flex items-center justify-around px-4 pb-2 border-t border-white/5">
    <button 
      onClick={() => setActiveTab(AppTab.HOME)}
      className={`flex flex-col items-center gap-1 transition-all ${activeTab === AppTab.HOME ? 'text-white' : 'text-white/40'}`}
    >
      <Icons.Home />
      <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
    </button>
    <button 
      onClick={() => setActiveTab(AppTab.GENERATE)}
      className={`relative -top-6 w-14 h-14 lush-card-gradient rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-orange-600/40 active:scale-90 transition-transform`}
    >
      <div className="-rotate-45 text-white">
        <Icons.Plus size={20} />
      </div>
    </button>
    <button 
      onClick={() => setActiveTab(AppTab.LIBRARY)}
      className={`flex flex-col items-center gap-1 transition-all ${activeTab === AppTab.LIBRARY ? 'text-white' : 'text-white/40'}`}
    >
      <Icons.Library />
      <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
    </button>
  </nav>
);
