import type { PalettePreset } from '../types';

export interface ProDesignToken {
  id: string;
  name: string;
  category: string;
  angle: number;
  stops: { color: string; position: number }[];
  css: string;
  tailwindClass: string;
}

const PALETTE_THEMES = [
  {
    category: 'Titanium & Obsidian (Enterprise SaaS)',
    baseColors: [
      ['#090a0f', '#18181b', '#27272a', '#71717a'],
      ['#030712', '#111827', '#1f2937', '#6b7280'],
      ['#08090d', '#1e293b', '#334155', '#94a3b8'],
      ['#020617', '#0f172a', '#1e293b', '#cbd5e1'],
      ['#0f172a', '#1e293b', '#475569', '#f8fafc'],
    ],
  },
  {
    category: 'Luxury Metals & Champagne Gold',
    baseColors: [
      ['#1c1917', '#78350f', '#b45309', '#fef3c7'],
      ['#292524', '#854d0e', '#ca8a04', '#fef9c3'],
      ['#18181b', '#3f3f46', '#a1a1aa', '#f4f4f5'],
      ['#1e1b4b', '#312e81', '#6366f1', '#e0e7ff'],
      ['#3b0764', '#581c87', '#9333ea', '#f3e8ff'],
    ],
  },
  {
    category: 'Nordic Aurora & Bioluminescence',
    baseColors: [
      ['#022c22', '#064e3b', '#059669', '#6ee7b7'],
      ['#042f2e', '#115e59', '#0d9488', '#5eead4'],
      ['#082f49', '#075985', '#0284c7', '#7dd3fc'],
      ['#052e16', '#14532d', '#16a34a', '#86efac'],
      ['#134e4a', '#0f766e', '#14b8a6', '#99f6e4'],
    ],
  },
  {
    category: 'Tokyo Twilight & Cyberpunk Neon',
    baseColors: [
      ['#2e0854', '#4c1d95', '#7c3aed', '#c4b5fd'],
      ['#4a044e', '#701a75', '#a21caf', '#f0abfc'],
      ['#500724', '#831843', '#be185d', '#fbcfe8'],
      ['#172554', '#1d4ed8', '#3b82f6', '#bfdbfe'],
      ['#1e1b4b', '#4338ca', '#6366f1', '#c7d2fe'],
    ],
  },
  {
    category: 'Deep Space & Stellar Nebula',
    baseColors: [
      ['#02040a', '#090d16', '#121b2d', '#253556'],
      ['#0b0a1a', '#171434', '#28235a', '#443c94'],
      ['#100720', '#200e40', '#3b1a75', '#602bbd'],
      ['#050b14', '#0c1a2f', '#163056', '#2b589b'],
      ['#040a0f', '#091824', '#112c42', '#22557f'],
    ],
  },
  {
    category: 'Editorial Minimal & Clean Pastels',
    baseColors: [
      ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1'],
      ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1'],
      ['#fdf4ff', '#fae8ff', '#f5d0fe', '#e879f9'],
      ['#f0fdfa', '#ccfbf1', '#99f6e4', '#2dd4bf'],
      ['#eff6ff', '#dbeafe', '#bfdbfe', '#60a5fa'],
    ],
  },
];

const ANGLES = [45, 90, 135, 180, 225, 270, 315];

/**
 * Generates an architectural set of 500+ design tokens.
 */
export function generateProTokenBundle(): ProDesignToken[] {
  const tokens: ProDesignToken[] = [];
  let counter = 1;

  for (const theme of PALETTE_THEMES) {
    for (let variantIdx = 0; variantIdx < theme.baseColors.length; variantIdx++) {
      const colors = theme.baseColors[variantIdx];

      for (const angle of ANGLES) {
        // Linear variation
        const stops = colors.map((hex, idx) => ({
          color: hex,
          position: Math.round((idx / (colors.length - 1)) * 100),
        }));

        const gradientCss = `linear-gradient(in oklch ${angle}deg, ${stops
          .map((s) => `${s.color} ${s.position}%`)
          .join(', ')})`;

        const tokenName = `${theme.category.split(' ')[0]}-${variantIdx + 1}-a${angle}`;

        tokens.push({
          id: `token-${counter}`,
          name: tokenName,
          category: theme.category,
          angle,
          stops,
          css: gradientCss,
          tailwindClass: `bg-[${gradientCss}]`,
        });
        counter++;

        // Reversed / Alternated harmonic variation
        const reversedColors = [...colors].reverse();
        const altStops = reversedColors.map((hex, idx) => ({
          color: hex,
          position: Math.round((idx / (reversedColors.length - 1)) * 100),
        }));

        const altGradientCss = `linear-gradient(in oklch ${angle + 15}deg, ${altStops
          .map((s) => `${s.color} ${s.position}%`)
          .join(', ')})`;

        tokens.push({
          id: `token-${counter}`,
          name: `${tokenName}-rev`,
          category: theme.category,
          angle: angle + 15,
          stops: altStops,
          css: altGradientCss,
          tailwindClass: `bg-[${altGradientCss}]`,
        });
        counter++;
      }
    }
  }

  // Multiply variations across luminance shifts until reaching 500+
  const extraVariations = 500 - tokens.length;
  if (extraVariations > 0) {
    for (let i = 0; i < extraVariations; i++) {
      const source = tokens[i % tokens.length];
      const shiftedAngle = (source.angle + 30) % 360;
      const shiftedStops = source.stops.map((s, idx) => ({
        color: s.color,
        position: Math.min(100, Math.max(0, s.position + (idx % 2 === 0 ? 5 : -5))),
      }));

      tokens.push({
        id: `token-${counter}`,
        name: `${source.name}-shift${i + 1}`,
        category: source.category,
        angle: shiftedAngle,
        stops: shiftedStops,
        css: `linear-gradient(in oklch ${shiftedAngle}deg, ${shiftedStops
          .map((s) => `${s.color} ${s.position}%`)
          .join(', ')})`,
        tailwindClass: `bg-[linear-gradient(in oklch ${shiftedAngle}deg, ...)]`,
      });
      counter++;
    }
  }

  return tokens;
}

/**
 * Downloads the full 500+ design tokens as formatted JSON.
 */
export function downloadProTokensJson() {
  const tokens = generateProTokenBundle();
  const payload = {
    schemaVersion: '2.5.0',
    title: 'CSS Studio Pro — Executive Design Tokens & Architectural UI Bundle',
    author: 'Oathan Rex',
    license: 'Commercial License (Unlimited Personal & Client Projects)',
    generatedAt: new Date().toISOString(),
    totalTokens: tokens.length,
    tokens: tokens.map((t) => ({
      name: t.name,
      category: t.category,
      angle: t.angle,
      stops: t.stops,
      css: t.css,
    })),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `css-studio-pro-executive-tokens-${tokens.length}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Downloads Tailwind CSS v4 @theme export file.
 */
export function downloadTailwindConfig() {
  const tokens = generateProTokenBundle();
  let cssContent = `/* CSS Studio Pro v2.5 — Tailwind CSS v4 Theme Extension */\n/* Generated by Oathan Rex · https://oathanrex.github.io/css-studio-pro/ */\n\n@theme {\n`;

  tokens.slice(0, 100).forEach((t, idx) => {
    const slug = t.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    cssContent += `  --color-gradient-${slug}: ${t.css};\n`;
  });

  cssContent += `}\n`;

  const blob = new Blob([cssContent], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tailwind-gradients.css`;
  a.click();
  URL.revokeObjectURL(url);
}
