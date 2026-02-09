
import React from 'react';
import { StyleTemplate } from './types';

// Using your provided 15 PNG silhouette images with white outline style
export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'lush-vibe',
    name: 'MEET CODAY',
    description: 'Most viewed Creator',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/1.png',
    promptPrefix: 'High fashion editorial, yellow bucket hat aesthetic, studio lighting, bold colors.',
    mood: 'linear-gradient(135deg, #FF6B00 0%, #FF3D00 50%, #EC008C 100%)'
  },
  {
    id: 'lush-beret',
    name: 'ZIRKA BERET',
    description: 'Most viewed Newbie',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/2.png',
    promptPrefix: 'Parisian chic, black beret style, sophisticated portrait, neutral background.',
    mood: 'linear-gradient(135deg, #845EC2 0%, #D65DB1 50%, #FF6F91 100%)'
  },
  {
    id: 'lush-street',
    name: 'STREET SOUL',
    description: 'The new Trendy',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/3.png',
    promptPrefix: 'Urban streetwear, bandana aesthetic, high contrast urban photography.',
    mood: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)'
  },
  {
    id: 'lush-pearl',
    name: 'PEARL GLAM',
    description: 'Most engage Host',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/4.png',
    promptPrefix: 'Luxury jewelry showcase, soft lighting, elegant poise, pearl aesthetic.',
    mood: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 100%)'
  },
  {
    id: 'lush-denim',
    name: 'DENIM DRIFT',
    description: 'The new Instructor',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/5.png',
    promptPrefix: 'Casual denim fashion, curly hair aesthetic, natural outdoor lighting.',
    mood: 'linear-gradient(135deg, #4834D4 0%, #686DE0 100%)'
  },
  {
    id: 'lush-active',
    name: 'LUSH ACTIVE',
    description: 'Active Lifestyle',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/6.png',
    promptPrefix: 'Professional fitness photography, gym aesthetic, high energy, sharp focus.',
    mood: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)'
  },
  {
    id: 'lush-summer',
    name: 'SUMMER HAZE',
    description: 'Seasonal Trend',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/7.png',
    promptPrefix: 'Summer festival vibe, white bucket hat, gold accessories, sunny glow.',
    mood: 'linear-gradient(135deg, #F9D423 0%, #FF4E50 100%)'
  },
  {
    id: 'lush-smart',
    name: 'STUDIO SMART',
    description: 'Academic Chic',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/8.png',
    promptPrefix: 'Minimalist studio portrait, glasses aesthetic, clean professional look.',
    mood: 'linear-gradient(135deg, #5EEAD4 0%, #2563EB 100%)'
  },
  {
    id: 'lush-rock',
    name: 'ROCK NOIR',
    description: 'Night Life',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/9.png',
    promptPrefix: 'Leather jacket aesthetic, moody dark tones, rock and roll vibe.',
    mood: 'linear-gradient(135deg, #2C3E50 0%, #000000 100%)'
  },
  {
    id: 'lush-urban',
    name: 'CAP CULTURE',
    description: 'City Dweller',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/10.png',
    promptPrefix: 'Modern urban fashion, hoodie and cap aesthetic, soft overcast lighting.',
    mood: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)'
  },
  {
    id: 'lush-knit',
    name: 'WARM KNIT',
    description: 'Cozy Style',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/11.png',
    promptPrefix: 'Autumnal knitwear, soft textures, warm indoor lighting, glasses.',
    mood: 'linear-gradient(135deg, #B721FF 0%, #21D4FD 100%)'
  },
  {
    id: 'lush-edge',
    name: 'SPIKY EDGE',
    description: 'Bold Statement',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/12.png',
    promptPrefix: 'High energy portrait, spiky hair aesthetic, leather jacket, dramatic lighting.',
    mood: 'linear-gradient(135deg, #FF3E81 0%, #FF673B 100%)'
  },
  {
    id: 'lush-art',
    name: 'ART FLOW',
    description: 'Creative Mode',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/13.png',
    promptPrefix: 'Graffiti artist aesthetic, colorful hoodie, urban art background.',
    mood: 'linear-gradient(135deg, #30CFD0 0%, #330867 100%)'
  },
  {
    id: 'lush-shadow',
    name: 'DARK DRIFT',
    description: 'Deep Shadows',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/14.png',
    promptPrefix: 'Black hoodie aesthetic, high contrast shadows, mysterious urban look.',
    mood: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
  },
  {
    id: 'lush-neon',
    name: 'NEON WAVE',
    description: 'Digital Pulse',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/15.png',
    promptPrefix: 'Vibrant neon aesthetic, orange bucket hat, electric summer vibe.',
    mood: 'linear-gradient(135deg, #00DBDE 0%, #FC00FF 100%)'
  }
];

export const RANDOM_FACES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1521119989659-a83eee4882ef?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1492562080023-ab3dbdf5bb33?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1520155707335-fe88801ce584?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400'
];

export const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Plus: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7h14"/></svg>
  ),
  Library: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  ),
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  PaperPlane: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  )
};
