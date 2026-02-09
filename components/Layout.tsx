
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
      <span className="text-[16px] tracking-tight">{time}</span>
      <div className="flex gap-2 items-center">
        <div className="flex gap-[1.5px] items-end h-[11px]">
          <div className="w-[3.5px] h-[30%] bg-white rounded-[1px]"></div>
          <div className="w-[3.5px] h-[55%] bg-white rounded-[1px]"></div>
          <div className="w-[3.5px] h-[80%] bg-white rounded-[1px]"></div>
          <div className="w-[3.5px] h-[100%] bg-white rounded-[1px]"></div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21l-12-12c4.1-4.1 10.9-4.1 15 0s4.1 10.9 0 15l-3-3z" opacity="0.3"/>
          <path d="M12 18l-9-9c3.1-3.1 8.1-3.1 11.2 0s3.1 8.1 0 11.2l-2.2-2.2z"/>
        </svg>
        <div className="relative w-[26px] h-[13px] border-[1.5px] border-white/60 rounded-[4px] p-[1.5px] flex items-center">
           <div className="h-full w-[85%] bg-white rounded-[1.5px]"></div>
           <div className="absolute -right-[3.5px] top-[3.5px] w-[2px] h-[4px] bg-white/60 rounded-r-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC<{ onHomeClick?: () => void; hide?: boolean }> = ({ onHomeClick, hide }) => (
  <header className={`absolute top-12 left-0 right-0 z-[80] h-14 flex items-center justify-between px-8 transition-opacity duration-300 ${hide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    <button onClick={onHomeClick} className="w-11 h-11 flex items-center justify-center hover:bg-white/10 rounded-full transition-all group">
      <div className="group-hover:scale-125 transition-transform duration-300">
        <Icons.Search />
      </div>
    </button>
    <h1 onClick={onHomeClick} className="text-2xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)] cursor-pointer hover:scale-105 transition-transform">LUSH</h1>
    <div className="w-11 h-11 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden shadow-2xl transition-transform hover:scale-110">
      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
    </div>
  </header>
);

export const BottomNav: React.FC<{ activeTab: AppTab; setActiveTab: (tab: AppTab) => void }> = ({ activeTab, setActiveTab }) => (
  <nav className="absolute bottom-0 left-0 right-0 z-50 h-22 bg-black/60 backdrop-blur-3xl flex items-center justify-around px-6 pb-6 border-t border-white/5">
    <button 
      onClick={() => setActiveTab(AppTab.HOME)}
      className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === AppTab.HOME ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'}`}
    >
      <Icons.Home />
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Studio</span>
    </button>
    <button 
      onClick={() => setActiveTab(AppTab.GENERATE)}
      className={`relative -top-8 w-16 h-16 lush-card-gradient rounded-3xl rotate-45 flex items-center justify-center shadow-2xl shadow-orange-600/40 active:scale-90 transition-all`}
    >
      <div className="-rotate-45 text-white">
        <Icons.Plus size={24} />
      </div>
    </button>
    <button 
      onClick={() => setActiveTab(AppTab.LIBRARY)}
      className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === AppTab.LIBRARY ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'}`}
    >
      <Icons.Library />
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Items</span>
    </button>
  </nav>
);
