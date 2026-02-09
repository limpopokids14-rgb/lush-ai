
import React from 'react';
import { StyleTemplate } from './types';

// Функция для генерации прямой ссылки из ID Google Drive
const getDirectLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

// 14 ID для иконок стилей
const STYLE_ICON_IDS = [
  '1GnyPPVJHzhyTSOPuUDHuCMvYL6CkPtKy', '1r78vHfRr4WoY3XvRFjxM1u_8n2nccEJe',
  '1yogVKrh15I7H80eInBtFnWYhyCJZ9UM4', '18RQuIdn-xUv8cCLvQYIecl9gZBxK0FYt',
  '1nG7McV0nuysrk5h7FpKHuZp0RdbmyzUb', '19PdvZjdvheLjBJUzK5Ll6pTRRr8U_NWT',
  '1aLrBLdbZ8dUuvCjQcx493I2Ai88KC5hR', '16lIYBJHjjWSSO8iLAcapdKX7BEZu7HIY',
  '1fz6066j8-J7L1brFj2m5V6HtVyzwOHiP', '1jAT1u5aSrdQLXoINh4tRrG1tTWRNzlYW',
  '1ygKJqy9i9-mR6KgPiZtO0AexCpLNZh5s', '1zxYhs6klabd53AzC0AxQSdGt9CW2dRcI',
  '1YsJ5IkwH2M3YqIydqwMstFCAIz-Sunr-', '1yAoDJbcVXJHWv-f0_er8uYJRJU18YITn'
];

// 27 ID для сторис (LUSH Shorts)
const STORY_ICON_IDS = [
  '1_0NfWMGOzBaBPWjm88ch2b7-DctE7you', '1KwY4fQ0wZwSrSj5zTdajDYIOtblZ6nlr',
  '1eLUW6QshcYa3iQawFIWhXBUbx7qkkRVQ', '1zuF6CI3w-Pyv17mvsiEVRlt8z3fj7eWE',
  '1I8_9IRmMPnuvDeySupuhP81DfjCx_VrB', '1Ih5JBCRtb9zAqZC3ucj-5m0IbIakwP5v',
  '1yKsOCKr0G3IZlvY1F2uHfOL7lbcqO-Z1', '1sX4cVCTphHFwCXyvdWIHXaOZO14Sz8cd',
  '19hPTQsOqJmPTJGqMRb_6f0DORgXqaAg4', '1ZJPNn5DW4m1ULSvpaWsAZtjHko1TRsh8',
  '1Gnys8Q5koboO2RVo_9TP_QVdZEFt8HSJ', '1qOr3IyLhf-khZ4E8H-ndsQbygrIvwnGl',
  '1nEA0_KnM_B6uIumw3_od0B2GcwiVtEOO', '1xKfY53u7dBZHyoc6TVqRXHAJTo5NCJ0t',
  '1K8Tnd4JD4D6AliKr_hDyOWYWA7d0goP0', '14VG3MgXSKySePw01I1oVb5NOxcG3zuvM',
  '1P7nno-xEdV5j5v2J6mqwA5OyQFZJO40U', '1pSJxBvhV-9DzIFHHKa5oZeHr8a-5dp1f',
  '16yfuJVOi2IYD7HaXWWoi6FwqQHxftrif', '1QNN5FrHe1uXdtpoZnxS-rX-HDt9Z_loU',
  '1kJ3VXbfswcyZU7tjGJNRXG60TLpPhGY1', '1i3UJu-lMLroti2z7XPx6L7ZqtpBCQwGs',
  '1ZC714Pu7gTcpRdxMPfYzonDhJZmnntin', '1TV74edK1Th-YGOHbSREJdzKRod5puEW6',
  '1Uexey7X_fTs4vqMS4HSnq-SWjbwUuHsx', '1x4cVs8sLVCjOxWvsSduL44xOEmRJ_U1J',
  '1l5RMAfTmGEOjQa-kRRe9Th4y1I6vV0yp'
];

// Иконки соцсетей для шеринга
const SHARE_ICON_IDS = [
  '1koLxpjpEVir06pu3L7lhgxJ0f72e5-a_', // Instagram
  '12ZwHY1IVALHPFuK8DElVBrZ72EGgWhCB', // TikTok
  '1AaaDZAkG-mgpWEKCzOqNaTUuGbNNIGrO', // X
  '1RaUroIN_JGlu9boogwoEEfaFE_B2ZWga'  // WhatsApp/Link
];

export const RANDOM_FACES = STORY_ICON_IDS.map(getDirectLink);
export const SHARE_ICONS = SHARE_ICON_IDS.map(getDirectLink);

export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'lush-vibe',
    name: 'MEET CODAY',
    description: 'Most viewed Creator',
    imageUrl: getDirectLink(STYLE_ICON_IDS[0]),
    promptPrefix: 'High fashion editorial, yellow bucket hat aesthetic, studio lighting, bold colors.',
    mood: 'linear-gradient(135deg, #FF6B00 0%, #FF3D00 50%, #EC008C 100%)'
  },
  {
    id: 'lush-beret',
    name: 'LUSH BERET',
    description: 'Most viewed Newbie',
    imageUrl: getDirectLink(STYLE_ICON_IDS[1]),
    promptPrefix: 'Parisian chic, black beret style, sophisticated portrait, neutral background.',
    mood: 'linear-gradient(135deg, #845EC2 0%, #D65DB1 50%, #FF6F91 100%)'
  },
  {
    id: 'lush-street',
    name: 'STREET SOUL',
    description: 'The new Trendy',
    imageUrl: getDirectLink(STYLE_ICON_IDS[2]),
    promptPrefix: 'Urban streetwear, bandana aesthetic, high contrast urban photography.',
    mood: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)'
  },
  {
    id: 'lush-pearl',
    name: 'PEARL GLAM',
    description: 'Most engage Host',
    imageUrl: getDirectLink(STYLE_ICON_IDS[3]),
    promptPrefix: 'Luxury jewelry showcase, soft lighting, elegant poise, pearl aesthetic.',
    mood: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 100%)'
  },
  {
    id: 'lush-denim',
    name: 'DENIM DRIFT',
    description: 'The new Instructor',
    imageUrl: getDirectLink(STYLE_ICON_IDS[4]),
    promptPrefix: 'Casual denim fashion, curly hair aesthetic, natural outdoor lighting.',
    mood: 'linear-gradient(135deg, #4834D4 0%, #686DE0 100%)'
  },
  {
    id: 'lush-active',
    name: 'LUSH ACTIVE',
    description: 'Active Lifestyle',
    imageUrl: getDirectLink(STYLE_ICON_IDS[5]),
    promptPrefix: 'Professional fitness photography, gym aesthetic, high energy, sharp focus.',
    mood: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)'
  },
  {
    id: 'lush-summer',
    name: 'SUMMER HAZE',
    description: 'Seasonal Trend',
    imageUrl: getDirectLink(STYLE_ICON_IDS[6]),
    promptPrefix: 'Summer festival vibe, white bucket hat, gold accessories, sunny glow.',
    mood: 'linear-gradient(135deg, #F9D423 0%, #FF4E50 100%)'
  },
  {
    id: 'lush-smart',
    name: 'STUDIO SMART',
    description: 'Academic Chic',
    imageUrl: getDirectLink(STYLE_ICON_IDS[7]),
    promptPrefix: 'Minimalist studio portrait, glasses aesthetic, clean professional look.',
    mood: 'linear-gradient(135deg, #5EEAD4 0%, #2563EB 100%)'
  },
  {
    id: 'lush-rock',
    name: 'ROCK NOIR',
    description: 'Night Life',
    imageUrl: getDirectLink(STYLE_ICON_IDS[8]),
    promptPrefix: 'Leather jacket aesthetic, moody dark tones, rock and roll vibe.',
    mood: 'linear-gradient(135deg, #2C3E50 0%, #000000 100%)'
  },
  {
    id: 'lush-urban',
    name: 'CAP CULTURE',
    description: 'City Dweller',
    imageUrl: getDirectLink(STYLE_ICON_IDS[9]),
    promptPrefix: 'Modern urban fashion, hoodie and cap aesthetic, soft overcast lighting.',
    mood: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)'
  },
  {
    id: 'lush-knit',
    name: 'WARM KNIT',
    description: 'Cozy Style',
    imageUrl: getDirectLink(STYLE_ICON_IDS[10]),
    promptPrefix: 'Autumnal knitwear, soft textures, warm indoor lighting, glasses.',
    mood: 'linear-gradient(135deg, #B721FF 0%, #21D4FD 100%)'
  },
  {
    id: 'lush-edge',
    name: 'SPIKY EDGE',
    description: 'Bold Statement',
    imageUrl: getDirectLink(STYLE_ICON_IDS[11]),
    promptPrefix: 'High energy portrait, spiky hair aesthetic, leather jacket, dramatic lighting.',
    mood: 'linear-gradient(135deg, #FF3E81 0%, #FF673B 100%)'
  },
  {
    id: 'lush-art',
    name: 'ART FLOW',
    description: 'Creative Mode',
    imageUrl: getDirectLink(STYLE_ICON_IDS[12]),
    promptPrefix: 'Graffiti artist aesthetic, colorful hoodie, urban art background.',
    mood: 'linear-gradient(135deg, #30CFD0 0%, #330867 100%)'
  },
  {
    id: 'lush-shadow',
    name: 'DARK DRIFT',
    description: 'Deep Shadows',
    imageUrl: getDirectLink(STYLE_ICON_IDS[13]),
    promptPrefix: 'Black hoodie aesthetic, high contrast shadows, mysterious urban look.',
    mood: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
  }
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
  ),
  Sparkles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/></svg>
  )
};
