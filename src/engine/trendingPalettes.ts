import type { PalettePreset } from '../types';

export const TRENDING_PALETTES: PalettePreset[] = [
  // Titanium & Obsidian (Architectural Minimalist)
  {
    name: 'Liquid Titanium',
    category: 'titanium',
    angle: 135,
    gradient: 'linear-gradient(135deg, #090a0f 0%, #1a202c 40%, #334155 75%, #94a3b8 100%)',
    stops: [
      { id: '1', color: '#090a0f', position: 0 },
      { id: '2', color: '#1a202c', position: 40 },
      { id: '3', color: '#334155', position: 75 },
      { id: '4', color: '#94a3b8', position: 100 },
    ],
  },
  {
    name: 'Monolith Carbon',
    category: 'titanium',
    angle: 160,
    gradient: 'linear-gradient(160deg, #050505 0%, #141416 45%, #26262b 80%, #3f3f46 100%)',
    stops: [
      { id: '1', color: '#050505', position: 0 },
      { id: '2', color: '#141416', position: 45 },
      { id: '3', color: '#26262b', position: 80 },
      { id: '4', color: '#3f3f46', position: 100 },
    ],
  },
  {
    name: 'Silicon Stealth',
    category: 'titanium',
    angle: 90,
    gradient: 'linear-gradient(90deg, #0b0f19 0%, #1e293b 50%, #0f172a 100%)',
    stops: [
      { id: '1', color: '#0b0f19', position: 0 },
      { id: '2', color: '#1e293b', position: 50 },
      { id: '3', color: '#0f172a', position: 100 },
    ],
  },
  {
    name: 'Silver Nitrate',
    category: 'titanium',
    angle: 135,
    gradient: 'linear-gradient(135deg, #0f172a 0%, #475569 50%, #cbd5e1 100%)',
    stops: [
      { id: '1', color: '#0f172a', position: 0 },
      { id: '2', color: '#475569', position: 50 },
      { id: '3', color: '#cbd5e1', position: 100 },
    ],
  },

  // Luxury Metals & Warm Gold
  {
    name: 'Imperial Champagne',
    category: 'metals',
    angle: 135,
    gradient: 'linear-gradient(135deg, #18140f 0%, #452e15 45%, #a16207 80%, #fef08a 100%)',
    stops: [
      { id: '1', color: '#18140f', position: 0 },
      { id: '2', color: '#452e15', position: 45 },
      { id: '3', color: '#a16207', position: 80 },
      { id: '4', color: '#fef08a', position: 100 },
    ],
  },
  {
    name: 'Rose Gold Alloy',
    category: 'metals',
    angle: 120,
    gradient: 'linear-gradient(120deg, #1a1014 0%, #4a212e 45%, #9f495e 80%, #fbcfe8 100%)',
    stops: [
      { id: '1', color: '#1a1014', position: 0 },
      { id: '2', color: '#4a212e', position: 45 },
      { id: '3', color: '#9f495e', position: 80 },
      { id: '4', color: '#fbcfe8', position: 100 },
    ],
  },
  {
    name: 'Smoked Bronze',
    category: 'metals',
    angle: 180,
    gradient: 'linear-gradient(180deg, #1c140d 0%, #59351a 50%, #ca8a04 100%)',
    stops: [
      { id: '1', color: '#1c140d', position: 0 },
      { id: '2', color: '#59351a', position: 50 },
      { id: '3', color: '#ca8a04', position: 100 },
    ],
  },

  // Nordic Aurora & Emerald
  {
    name: 'Boreal Emerald',
    category: 'aurora',
    angle: 135,
    gradient: 'linear-gradient(135deg, #021a14 0%, #064e3b 45%, #0d9488 80%, #5eead4 100%)',
    stops: [
      { id: '1', color: '#021a14', position: 0 },
      { id: '2', color: '#064e3b', position: 45 },
      { id: '3', color: '#0d9488', position: 80 },
      { id: '4', color: '#5eead4', position: 100 },
    ],
  },
  {
    name: 'Arctic Iceberg',
    category: 'aurora',
    angle: 180,
    gradient: 'linear-gradient(180deg, #03121e 0%, #0c4a6e 50%, #38bdf8 100%)',
    stops: [
      { id: '1', color: '#03121e', position: 0 },
      { id: '2', color: '#0c4a6e', position: 50 },
      { id: '3', color: '#38bdf8', position: 100 },
    ],
  },
  {
    name: 'Highland Pine',
    category: 'aurora',
    angle: 135,
    gradient: 'linear-gradient(135deg, #061911 0%, #14532d 50%, #4ade80 100%)',
    stops: [
      { id: '1', color: '#061911', position: 0 },
      { id: '2', color: '#14532d', position: 50 },
      { id: '3', color: '#4ade80', position: 100 },
    ],
  },

  // Tokyo Twilight & Deep Violet
  {
    name: 'Tokyo Midnight',
    category: 'twilight',
    angle: 140,
    gradient: 'linear-gradient(140deg, #0b0716 0%, #2e1065 45%, #6b21a8 80%, #c084fc 100%)',
    stops: [
      { id: '1', color: '#0b0716', position: 0 },
      { id: '2', color: '#2e1065', position: 45 },
      { id: '3', color: '#6b21a8', position: 80 },
      { id: '4', color: '#c084fc', position: 100 },
    ],
  },
  {
    name: 'Kyoto Dusk',
    category: 'twilight',
    angle: 90,
    gradient: 'linear-gradient(90deg, #1c0e24 0%, #581c87 50%, #c026d3 100%)',
    stops: [
      { id: '1', color: '#1c0e24', position: 0 },
      { id: '2', color: '#581c87', position: 50 },
      { id: '3', color: '#c026d3', position: 100 },
    ],
  },
  {
    name: 'Solaris Ember',
    category: 'twilight',
    angle: 135,
    gradient: 'linear-gradient(135deg, #180808 0%, #7f1d1d 45%, #ea580c 80%, #fed7aa 100%)',
    stops: [
      { id: '1', color: '#180808', position: 0 },
      { id: '2', color: '#7f1d1d', position: 45 },
      { id: '3', color: '#ea580c', position: 80 },
      { id: '4', color: '#fed7aa', position: 100 },
    ],
  },

  // Deep Space & Quantum
  {
    name: 'Quantum Void',
    category: 'space',
    angle: 160,
    gradient: 'linear-gradient(160deg, #020617 0%, #1e1b4b 50%, #312e81 100%)',
    stops: [
      { id: '1', color: '#020617', position: 0 },
      { id: '2', color: '#1e1b4b', position: 50 },
      { id: '3', color: '#312e81', position: 100 },
    ],
  },
  {
    name: 'Cosmic Sapphire',
    category: 'space',
    angle: 135,
    gradient: 'linear-gradient(135deg, #030d22 0%, #1d4ed8 50%, #60a5fa 100%)',
    stops: [
      { id: '1', color: '#030d22', position: 0 },
      { id: '2', color: '#1d4ed8', position: 50 },
      { id: '3', color: '#60a5fa', position: 100 },
    ],
  },
  {
    name: 'Interstellar Nebula',
    category: 'space',
    angle: 120,
    gradient: 'linear-gradient(120deg, #0d081e 0%, #3730a3 50%, #06b6d4 100%)',
    stops: [
      { id: '1', color: '#0d081e', position: 0 },
      { id: '2', color: '#3730a3', position: 50 },
      { id: '3', color: '#06b6d4', position: 100 },
    ],
  },

  // Minimalist Silk & Editorial
  {
    name: 'Desert Dune',
    category: 'minimal',
    angle: 90,
    gradient: 'linear-gradient(90deg, #1c1917 0%, #44403c 50%, #d6d3d1 100%)',
    stops: [
      { id: '1', color: '#1c1917', position: 0 },
      { id: '2', color: '#44403c', position: 50 },
      { id: '3', color: '#d6d3d1', position: 100 },
    ],
  },
  {
    name: 'Alabaster Frost',
    category: 'minimal',
    angle: 135,
    gradient: 'linear-gradient(135deg, #111827 0%, #374151 50%, #f3f4f6 100%)',
    stops: [
      { id: '1', color: '#111827', position: 0 },
      { id: '2', color: '#374151', position: 50 },
      { id: '3', color: '#f3f4f6', position: 100 },
    ],
  },
];
