// Mathematical Color Harmony & Conversion Engine
// Supports RGB, HSL, HSV, CMYK, and OKLCH color spaces

export type HarmonyRule =
  | 'analogous'
  | 'monochromatic'
  | 'triad'
  | 'tetradic'
  | 'complementary'
  | 'split-complementary'
  | 'square'
  | 'compound'
  | 'shades'
  | 'custom';

export interface RgbColor {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
}

export interface HslColor {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
}

export interface OklchColor {
  l: number; // 0 - 1
  c: number; // 0 - 0.4
  h: number; // 0 - 360
}

export interface CmykColor {
  c: number; // 0 - 100
  m: number; // 0 - 100
  y: number; // 0 - 100
  k: number; // 0 - 100
}

export interface SwatchColor {
  id: string;
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  oklch: OklchColor;
  cmyk: CmykColor;
  isBase: boolean;
}

// Convert Hex to RGB
export function hexToRgb(hex: string): RgbColor {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 15, g: 23, b: 42 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Convert RGB to Hex
export function rgbToHex(rgb: RgbColor): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// Convert RGB to HSL
export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HSL to RGB
export function hslToRgb(hsl: HslColor): RgbColor {
  const h = (hsl.h % 360 + 360) % 360 / 360;
  const s = Math.max(0, Math.min(100, hsl.s)) / 100;
  const l = Math.max(0, Math.min(100, hsl.l)) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

// Convert RGB to CMYK
export function rgbToCmyk(rgb: RgbColor): CmykColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

// Convert RGB to OKLCH (Perceptual Uniform Color Space)
export function rgbToOklch(rgb: RgbColor): OklchColor {
  // sRGB to linear RGB
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const lr = toLinear(rgb.r);
  const lg = toLinear(rgb.g);
  const lb = toLinear(rgb.b);

  // Linear RGB to LMS
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // Non-linear cube root
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // OKLab coordinates
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_val = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + b_val * b_val);
  let h = (Math.atan2(b_val, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return {
    l: Number(L.toFixed(3)),
    c: Number(C.toFixed(3)),
    h: Math.round(h),
  };
}

// Build SwatchColor from Hex
export function buildSwatchFromHex(hex: string, isBase = false, id = String(Date.now())): SwatchColor {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const oklch = rgbToOklch(rgb);
  const cmyk = rgbToCmyk(rgb);
  return { id, hex: rgbToHex(rgb), rgb, hsl, oklch, cmyk, isBase };
}

// Generate 5-Color Harmony Palette based on Base Color and Rule
export function calculateHarmonies(baseColor: SwatchColor, rule: HarmonyRule): SwatchColor[] {
  const baseH = baseColor.hsl.h;
  const baseS = baseColor.hsl.s;
  const baseL = baseColor.hsl.l;

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
  const normHue = (h: number) => (h % 360 + 360) % 360;

  const makeSwatch = (id: string, h: number, s: number, l: number, isBase = false): SwatchColor => {
    const rgb = hslToRgb({ h: normHue(h), s: clamp(s, 0, 100), l: clamp(l, 5, 95) });
    const hex = rgbToHex(rgb);
    const oklch = rgbToOklch(rgb);
    const cmyk = rgbToCmyk(rgb);
    return {
      id,
      hex,
      rgb,
      hsl: { h: normHue(h), s: Math.round(s), l: Math.round(l) },
      oklch,
      cmyk,
      isBase,
    };
  };

  switch (rule) {
    case 'analogous':
      return [
        makeSwatch('1', baseH - 45, baseS * 0.9, baseL - 10),
        makeSwatch('2', baseH - 22, baseS * 0.95, baseL - 5),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 22, baseS * 0.95, baseL + 5),
        makeSwatch('5', baseH + 45, baseS * 0.9, baseL + 10),
      ];

    case 'monochromatic':
      return [
        makeSwatch('1', baseH, baseS, clamp(baseL - 30, 10, 90)),
        makeSwatch('2', baseH, clamp(baseS * 0.85, 10, 100), clamp(baseL - 15, 15, 90)),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH, clamp(baseS * 0.7, 10, 100), clamp(baseL + 15, 10, 95)),
        makeSwatch('5', baseH, clamp(baseS * 0.5, 10, 100), clamp(baseL + 30, 10, 98)),
      ];

    case 'triad':
      return [
        makeSwatch('1', baseH - 120, baseS * 0.85, baseL - 8),
        makeSwatch('2', baseH - 120, baseS, baseL),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 120, baseS, baseL),
        makeSwatch('5', baseH + 120, baseS * 0.85, baseL + 10),
      ];

    case 'complementary':
      return [
        makeSwatch('1', baseH, baseS * 0.75, clamp(baseL - 18, 10, 90)),
        makeSwatch('2', baseH, baseS, baseL),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 180, baseS, baseL),
        makeSwatch('5', baseH + 180, baseS * 0.8, clamp(baseL + 16, 10, 95)),
      ];

    case 'split-complementary':
      return [
        makeSwatch('1', baseH - 150, baseS * 0.9, baseL - 5),
        makeSwatch('2', baseH, baseS * 0.8, clamp(baseL - 10, 10, 90)),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 150, baseS, baseL),
        makeSwatch('5', baseH + 150, baseS * 0.8, clamp(baseL + 12, 10, 95)),
      ];

    case 'tetradic':
      return [
        makeSwatch('1', baseH + 30, baseS, baseL),
        makeSwatch('2', baseH + 180, baseS, baseL),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 210, baseS, baseL),
        makeSwatch('5', baseH, clamp(baseS * 0.6, 10, 100), clamp(baseL + 25, 10, 95)),
      ];

    case 'square':
      return [
        makeSwatch('1', baseH + 90, baseS, baseL),
        makeSwatch('2', baseH + 180, baseS, baseL),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 270, baseS, baseL),
        makeSwatch('5', baseH, clamp(baseS * 0.5, 10, 100), clamp(baseL + 25, 10, 95)),
      ];

    case 'compound':
      return [
        makeSwatch('1', baseH - 25, baseS * 0.9, clamp(baseL - 8, 10, 90)),
        makeSwatch('2', baseH + 180, baseS * 0.8, baseL),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 155, baseS, baseL),
        makeSwatch('5', baseH + 205, baseS * 0.9, clamp(baseL + 10, 10, 95)),
      ];

    case 'shades':
      return [
        makeSwatch('1', baseH, baseS, clamp(baseL * 0.3, 5, 95)),
        makeSwatch('2', baseH, baseS, clamp(baseL * 0.65, 8, 95)),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH, baseS, clamp(baseL + (100 - baseL) * 0.4, 10, 96)),
        makeSwatch('5', baseH, baseS, clamp(baseL + (100 - baseL) * 0.75, 10, 98)),
      ];

    case 'custom':
    default:
      return [
        makeSwatch('1', baseH - 40, baseS, baseL),
        makeSwatch('2', baseH - 20, baseS, baseL),
        { ...baseColor, id: '3', isBase: true },
        makeSwatch('4', baseH + 20, baseS, baseL),
        makeSwatch('5', baseH + 40, baseS, baseL),
      ];
  }
}
