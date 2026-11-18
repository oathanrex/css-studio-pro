// Accessibility & Color Blindness Simulation Engine
// Implements Brettel-Vienot-Mollon algorithms and WCAG 2.1 + WCAG 3 APCA

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, type RgbColor } from './harmonyEngine';

export type VisionDeficiency =
  | 'normal'
  | 'deuteranopia'
  | 'protanopia'
  | 'tritanopia'
  | 'achromatopsia';

// Convert sRGB to Linear RGB
function toLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

// Convert Linear RGB to sRGB
function toSrgb(v: number): number {
  const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(c * 255)));
}

// Simulate Color Vision Deficiency
export function simulateColorBlindness(rgb: RgbColor, type: VisionDeficiency): RgbColor {
  if (type === 'normal') return rgb;

  const lr = toLinear(rgb.r);
  const lg = toLinear(rgb.g);
  const lb = toLinear(rgb.b);

  let simR = lr;
  let simG = lg;
  let simB = lb;

  switch (type) {
    case 'protanopia':
      // Red-weak / Red-blind
      simR = 0.56667 * lr + 0.43333 * lg;
      simG = 0.55833 * lr + 0.44167 * lg;
      simB = 0.24167 * lg + 0.75833 * lb;
      break;

    case 'deuteranopia':
      // Green-weak / Green-blind
      simR = 0.625 * lr + 0.375 * lg;
      simG = 0.70 * lr + 0.30 * lg;
      simB = 0.30 * lg + 0.70 * lb;
      break;

    case 'tritanopia':
      // Blue-weak / Blue-blind
      simR = 0.95 * lr + 0.05 * lg;
      simG = 0.43333 * lg + 0.56667 * lb;
      simB = 0.475 * lg + 0.525 * lb;
      break;

    case 'achromatopsia':
      // Monochromacy / Complete color blindness
      const gray = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
      simR = gray;
      simG = gray;
      simB = gray;
      break;
  }

  return {
    r: toSrgb(simR),
    g: toSrgb(simG),
    b: toSrgb(simB),
  };
}

export function simulateHexColorBlindness(hex: string, type: VisionDeficiency): string {
  const rgb = hexToRgb(hex);
  const simulated = simulateColorBlindness(rgb, type);
  return rgbToHex(simulated);
}

// Relative Luminance for WCAG 2.1
export function getRelativeLuminance(rgb: RgbColor): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG 2.1 Contrast Ratio calculation
export function calculateContrastRatio(fgRgb: RgbColor, bgRgb: RgbColor): number {
  const l1 = getRelativeLuminance(fgRgb);
  const l2 = getRelativeLuminance(bgRgb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

// Simplified APCA (Advanced Perceptual Contrast Algorithm) lightness contrast
export function calculateApcaScore(fgRgb: RgbColor, bgRgb: RgbColor): number {
  const yTxt = Math.pow(getRelativeLuminance(fgRgb), 0.56);
  const yBg = Math.pow(getRelativeLuminance(bgRgb), 0.65);
  let lScore = (yBg - yTxt) * 100;
  return Math.round(lScore);
}

export interface ContrastAudit {
  ratio: number;
  apca: number;
  normalTextAA: boolean; // >= 4.5
  normalTextAAA: boolean; // >= 7.0
  largeTextAA: boolean; // >= 3.0
  largeTextAAA: boolean; // >= 4.5
  graphicComponentsAA: boolean; // >= 3.0
}

export function auditContrast(fgHex: string, bgHex: string): ContrastAudit {
  const fg = hexToRgb(fgHex);
  const bg = hexToRgb(bgHex);
  const ratio = calculateContrastRatio(fg, bg);
  const apca = calculateApcaScore(fg, bg);

  return {
    ratio,
    apca,
    normalTextAA: ratio >= 4.5,
    normalTextAAA: ratio >= 7.0,
    largeTextAA: ratio >= 3.0,
    largeTextAAA: ratio >= 4.5,
    graphicComponentsAA: ratio >= 3.0,
  };
}

// Auto-Fix Contrast: adjust background lightness to pass AAA (7.0:1) or AA (4.5:1)
export function autoFixContrast(
  fgHex: string,
  bgHex: string,
  targetRatio = 7.0
): string {
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);
  const fgLum = getRelativeLuminance(fgRgb);
  const bgHsl = rgbToHsl(bgRgb);

  // If text is bright, push background darker; if text is dark, push background brighter
  const shouldDarken = fgLum > 0.4;
  let bestHex = bgHex;
  let bestDiff = Infinity;

  for (let l = 0; l <= 100; l++) {
    const candidateRgb = hslToRgb({ h: bgHsl.h, s: bgHsl.s, l });
    const ratio = calculateContrastRatio(fgRgb, candidateRgb);
    if (ratio >= targetRatio) {
      const diff = Math.abs(l - bgHsl.l);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestHex = rgbToHex(candidateRgb);
        if (shouldDarken && l < bgHsl.l) break;
        if (!shouldDarken && l > bgHsl.l) break;
      }
    }
  }

  return bestHex;
}

// Detect accessibility color collisions between swatches
export interface ColorCollision {
  colorIndex1: number;
  colorIndex2: number;
  distance: number;
  severity: 'high' | 'medium';
}

export function detectColorCollisions(
  hexColors: string[],
  vision: VisionDeficiency
): ColorCollision[] {
  const collisions: ColorCollision[] = [];
  const simulatedRgbs = hexColors.map((hex) => {
    const raw = hexToRgb(hex);
    return simulateColorBlindness(raw, vision);
  });

  for (let i = 0; i < simulatedRgbs.length; i++) {
    for (let j = i + 1; j < simulatedRgbs.length; j++) {
      const c1 = simulatedRgbs[i];
      const c2 = simulatedRgbs[j];
      // Euclidean distance in simulated RGB
      const dist = Math.sqrt(
        (c1.r - c2.r) ** 2 +
        (c1.g - c2.g) ** 2 +
        (c1.b - c2.b) ** 2
      );
      if (dist < 35) {
        collisions.push({
          colorIndex1: i,
          colorIndex2: j,
          distance: Math.round(dist),
          severity: dist < 20 ? 'high' : 'medium',
        });
      }
    }
  }

  return collisions;
}
