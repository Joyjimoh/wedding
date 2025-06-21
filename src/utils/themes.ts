import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'classic-rose',
    name: 'Classic Rose',
    primary: '#e11d48',
    secondary: '#fdf2f8',
    accent: '#be185d',
    background: '#fdf8f5',
    text: '#4a4a4a',
    cardBg: '#ffffff'
  },
  {
    id: 'beige-elegance',
    name: 'Beige Elegance',
    primary: '#d4a574',
    secondary: '#f5f5dc',
    accent: '#8b7355',
    background: '#faf8f3',
    text: '#2d2d2d',
    cardBg: '#ffffff'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primary: '#7c3aed',
    secondary: '#f3e8ff',
    accent: '#5b21b6',
    background: '#faf7ff',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'emerald-dream',
    name: 'Emerald Dream',
    primary: '#059669',
    secondary: '#ecfdf5',
    accent: '#047857',
    background: '#f0fdf4',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'sunset-gold',
    name: 'Sunset Gold',
    primary: '#f59e0b',
    secondary: '#fffbeb',
    accent: '#d97706',
    background: '#fffbeb',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    primary: '#0ea5e9',
    secondary: '#f0f9ff',
    accent: '#0284c7',
    background: '#f8fafc',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'blush-pink',
    name: 'Blush Pink',
    primary: '#ec4899',
    secondary: '#fdf2f8',
    accent: '#db2777',
    background: '#fef7f7',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'sage-green',
    name: 'Sage Green',
    primary: '#84cc16',
    secondary: '#f7fee7',
    accent: '#65a30d',
    background: '#f9fafb',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    primary: '#a855f7',
    secondary: '#faf5ff',
    accent: '#9333ea',
    background: '#fefbff',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    primary: '#f97316',
    secondary: '#fff7ed',
    accent: '#ea580c',
    background: '#fffbf5',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'midnight-navy',
    name: 'Midnight Navy',
    primary: '#1e40af',
    secondary: '#eff6ff',
    accent: '#1d4ed8',
    background: '#f8fafc',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    primary: '#eab308',
    secondary: '#fefce8',
    accent: '#ca8a04',
    background: '#fffef0',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose',
    primary: '#f43f5e',
    secondary: '#fff1f2',
    accent: '#e11d48',
    background: '#fef2f2',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    primary: '#16a34a',
    secondary: '#f0fdf4',
    accent: '#15803d',
    background: '#f7fef7',
    text: '#374151',
    cardBg: '#ffffff'
  },
  {
    id: 'vintage-burgundy',
    name: 'Vintage Burgundy',
    primary: '#991b1b',
    secondary: '#fef2f2',
    accent: '#7f1d1d',
    background: '#fefefe',
    text: '#374151',
    cardBg: '#ffffff'
  }
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-card-bg', theme.cardBg);
};