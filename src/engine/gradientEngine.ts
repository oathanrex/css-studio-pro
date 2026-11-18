import type { ColorStop, GradientState } from '../types';

export function buildGradientCss(state: GradientState): string {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');
  const cs = state.colorSpace && state.colorSpace !== 'srgb' ? `in ${state.colorSpace} ` : '';

  switch (state.type) {
    case 'linear':
      return `linear-gradient(${cs}${state.angle}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(${cs}${state.radialShape} at ${state.radialPosition}, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(${cs}from ${state.angle}deg at 50% 50%, ${stopsStr})`;
    case 'repeating-linear':
      return `repeating-linear-gradient(${cs}${state.angle}deg, ${stopsStr})`;
    case 'mesh': {
      const c1 = state.stops[0]?.color || '#090a0f';
      const c2 = state.stops[1]?.color || '#1e293b';
      const c3 = state.stops[2]?.color || '#334155';
      return `radial-gradient(at 0% 0%, ${c1} 0px, transparent 50%), radial-gradient(at 100% 0%, ${c2} 0px, transparent 50%), radial-gradient(at 100% 100%, ${c3} 0px, transparent 50%)`;
    }
    default:
      return `linear-gradient(${cs}${state.angle}deg, ${stopsStr})`;
  }
}

export function buildTailwindCss(state: GradientState): string {
  if (state.type === 'linear' && (!state.colorSpace || state.colorSpace === 'srgb')) {
    let dir = 'to-r';
    if (state.angle >= 315 || state.angle < 45) dir = 'to-t';
    else if (state.angle >= 45 && state.angle < 135) dir = 'to-r';
    else if (state.angle >= 135 && state.angle < 225) dir = 'to-b';
    else if (state.angle >= 225 && state.angle < 315) dir = 'to-l';

    const s1 = state.stops[0]?.color || '#090a0f';
    const s2 = state.stops[state.stops.length - 1]?.color || '#94a3b8';
    return `bg-gradient-${dir} from-[${s1}] to-[${s2}]`;
  }
  return `bg-[${buildGradientCss(state)}]`;
}

export function buildSvgGradient(state: GradientState): string {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const stopsXml = sortedStops
    .map((s) => `    <stop offset="${s.position}%" stop-color="${s.color}" />`)
    .join('\n');

  return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cssg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
${stopsXml}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#cssg-grad)" />
</svg>`;
}

export function buildFlutterCode(state: GradientState): string {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const colors = sortedStops
    .map((s) => {
      const hex = s.color.replace('#', '');
      return `Color(0xFF${hex.toUpperCase()})`;
    })
    .join(', ');
  const stops = sortedStops.map((s) => (s.position / 100).toFixed(2)).join(', ');

  return `BoxDecoration(
  gradient: LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [${colors}],
    stops: [${stops}],
  ),
)`;
}

export function buildAndroidXml(state: GradientState): string {
  const s1 = state.stops[0]?.color || '#090a0f';
  const s2 = state.stops[state.stops.length - 1]?.color || '#94a3b8';
  return `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <gradient
    android:angle="${state.angle}"
    android:startColor="${s1}"
    android:endColor="${s2}"
    android:type="linear" />
</shape>`;
}

// Convert Hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Relative Luminance according to WCAG 2.1
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate WCAG Contrast Ratio
export function calculateWcagContrast(stops: ColorStop[]): {
  whiteContrast: number;
  blackContrast: number;
  whiteLevel: 'AAA' | 'AA' | 'Fail';
  blackLevel: 'AAA' | 'AA' | 'Fail';
} {
  if (!stops || stops.length === 0) {
    return { whiteContrast: 21, blackContrast: 1, whiteLevel: 'AAA', blackLevel: 'Fail' };
  }

  // Calculate average luminance across stops
  let totalLum = 0;
  for (const s of stops) {
    const rgb = hexToRgb(s.color || '#000000');
    totalLum += getLuminance(rgb.r, rgb.g, rgb.b);
  }
  const avgLum = totalLum / stops.length;

  const whiteLum = 1.0;
  const blackLum = 0.0;

  const whiteRatio = (Math.max(avgLum, whiteLum) + 0.05) / (Math.min(avgLum, whiteLum) + 0.05);
  const blackRatio = (Math.max(avgLum, blackLum) + 0.05) / (Math.min(avgLum, blackLum) + 0.05);

  const whiteLevel = whiteRatio >= 7 ? 'AAA' : whiteRatio >= 4.5 ? 'AA' : 'Fail';
  const blackLevel = blackRatio >= 7 ? 'AAA' : blackRatio >= 4.5 ? 'AA' : 'Fail';

  return {
    whiteContrast: Number(whiteRatio.toFixed(1)),
    blackContrast: Number(blackRatio.toFixed(1)),
    whiteLevel,
    blackLevel,
  };
}

export function generateRandomGradient(): GradientState {
  const architecturalPalettes = [
    ['#090a0f', '#1a202c', '#334155', '#94a3b8'], // Titanium
    ['#050505', '#141416', '#26262b', '#3f3f46'], // Carbon Monolith
    ['#18140f', '#452e15', '#a16207', '#fef08a'], // Champagne Gold
    ['#1a1014', '#4a212e', '#9f495e', '#fbcfe8'], // Rose Bronze
    ['#021a14', '#064e3b', '#0d9488', '#5eead4'], // Emerald Aurora
    ['#03121e', '#0c4a6e', '#0284c7', '#38bdf8'], // Deep Arctic
    ['#0b0716', '#2e1065', '#6b21a8', '#c084fc'], // Tokyo Twilight
    ['#180808', '#7f1d1d', '#ea580c', '#fed7aa'], // Solaris Ember
    ['#020617', '#1e1b4b', '#312e81', '#6366f1'], // Quantum Void
    ['#1c1917', '#44403c', '#78716c', '#d6d3d1'], // Desert Slate
  ];

  const chosen = architecturalPalettes[Math.floor(Math.random() * architecturalPalettes.length)];
  const randomAngle = [0, 45, 90, 135, 180, 225, 270][Math.floor(Math.random() * 7)];

  const step = 100 / (chosen.length - 1);
  const stops: ColorStop[] = chosen.map((color, idx) => ({
    id: String(idx + 1),
    color,
    position: Math.round(idx * step),
  }));

  return {
    type: 'linear',
    angle: randomAngle,
    radialShape: 'circle',
    radialPosition: 'center',
    colorSpace: 'oklch',
    stops,
  };
}
