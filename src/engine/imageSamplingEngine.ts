// Client-Side Image Color Extraction & K-Means Clustering Engine
// Zero server uploads: 100% On-device Canvas processing

import { hexToRgb, rgbToHex, rgbToHsl, type RgbColor } from './harmonyEngine';

export type MoodFilter = 'vibrant' | 'bright' | 'deep' | 'muted' | 'dark' | 'none';

export interface ExtractedColorPin {
  id: string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
  hex: string;
  rgb: RgbColor;
}

export interface ExtractedGradientStop {
  id: string;
  position: number; // 0 - 100
  hex: string;
}

// Sample a single pixel color at (x, y) on a Canvas
export function samplePixelColor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): { hex: string; rgb: RgbColor } {
  const clX = Math.max(0, Math.min(width - 1, Math.round(x)));
  const clY = Math.max(0, Math.min(height - 1, Math.round(y)));
  const pixel = ctx.getImageData(clX, clY, 1, 1).data;
  const rgb: RgbColor = { r: pixel[0], g: pixel[1], b: pixel[2] };
  return { hex: rgbToHex(rgb), rgb };
}

// K-Means Clustering for Palette Extraction
export function extractPaletteKMeans(
  img: HTMLImageElement,
  k = 5,
  mood: MoodFilter = 'vibrant'
): ExtractedColorPin[] {
  const canvas = document.createElement('canvas');
  const maxDim = 120; // Fast downsampling
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;

  if (w > h) {
    if (w > maxDim) {
      h = Math.round((h * maxDim) / w);
      w = maxDim;
    }
  } else {
    if (h > maxDim) {
      w = Math.round((w * maxDim) / h);
      h = maxDim;
    }
  }

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  ctx.drawImage(img, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h).data;

  // Collect pixel samples with spatial coordinates
  interface SamplePoint {
    r: number;
    g: number;
    b: number;
    x: number;
    y: number;
  }
  const samples: SamplePoint[] = [];
  const step = 2; // sample every 2nd pixel for performance

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const idx = (y * w + x) * 4;
      const alpha = imgData[idx + 3];
      if (alpha > 128) {
        samples.push({
          r: imgData[idx],
          g: imgData[idx + 1],
          b: imgData[idx + 2],
          x,
          y,
        });
      }
    }
  }

  if (samples.length === 0) return [];

  // Initialize centroids
  const centroids: { r: number; g: number; b: number; x: number; y: number }[] = [];
  for (let i = 0; i < k; i++) {
    const s = samples[Math.floor((i * samples.length) / k)];
    centroids.push({ ...s });
  }

  // Run 6 K-Means iterations
  const iterations = 6;
  const assignments = new Int32Array(samples.length);

  for (let it = 0; it < iterations; it++) {
    // Assign samples to nearest centroid
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      let minDist = Infinity;
      let bestCluster = 0;
      for (let c = 0; c < k; c++) {
        const cent = centroids[c];
        const dist =
          (s.r - cent.r) ** 2 +
          (s.g - cent.g) ** 2 +
          (s.b - cent.b) ** 2;
        if (dist < minDist) {
          minDist = dist;
          bestCluster = c;
        }
      }
      assignments[i] = bestCluster;
    }

    // Recompute centroids
    const counts = new Int32Array(k);
    const sumR = new Float64Array(k);
    const sumG = new Float64Array(k);
    const sumB = new Float64Array(k);
    const sumX = new Float64Array(k);
    const sumY = new Float64Array(k);

    for (let i = 0; i < samples.length; i++) {
      const c = assignments[i];
      const s = samples[i];
      counts[c]++;
      sumR[c] += s.r;
      sumG[c] += s.g;
      sumB[c] += s.b;
      sumX[c] += s.x;
      sumY[c] += s.y;
    }

    for (let c = 0; c < k; c++) {
      if (counts[c] > 0) {
        centroids[c].r = Math.round(sumR[c] / counts[c]);
        centroids[c].g = Math.round(sumG[c] / counts[c]);
        centroids[c].b = Math.round(sumB[c] / counts[c]);
        centroids[c].x = Math.round(sumX[c] / counts[c]);
        centroids[c].y = Math.round(sumY[c] / counts[c]);
      }
    }
  }

  // Filter/Sort centroids by Mood
  let sortedCentroids = [...centroids];
  if (mood === 'vibrant') {
    sortedCentroids.sort((a, b) => {
      const hslA = rgbToHsl(a);
      const hslB = rgbToHsl(b);
      return hslB.s * (1 - Math.abs(hslB.l - 50) / 50) - hslA.s * (1 - Math.abs(hslA.l - 50) / 50);
    });
  } else if (mood === 'bright') {
    sortedCentroids.sort((a, b) => rgbToHsl(b).l - rgbToHsl(a).l);
  } else if (mood === 'deep') {
    sortedCentroids.sort((a, b) => {
      const hslA = rgbToHsl(a);
      const hslB = rgbToHsl(b);
      return (hslB.s * 1.5 - hslB.l) - (hslA.s * 1.5 - hslA.l);
    });
  } else if (mood === 'muted') {
    sortedCentroids.sort((a, b) => rgbToHsl(a).s - rgbToHsl(b).s);
  } else if (mood === 'dark') {
    sortedCentroids.sort((a, b) => rgbToHsl(a).l - rgbToHsl(b).l);
  }

  return sortedCentroids.slice(0, k).map((c, idx) => ({
    id: String(idx + 1),
    xPercent: Math.round((c.x / w) * 100),
    yPercent: Math.round((c.y / h) * 100),
    hex: rgbToHex({ r: c.r, g: c.g, b: c.b }),
    rgb: { r: c.r, g: c.g, b: c.b },
  }));
}

// Sample a linear gradient vector line across an image
export function extractGradientFromVector(
  ctx: CanvasRenderingContext2D,
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  stopsCount = 5,
  width: number,
  height: number
): ExtractedGradientStop[] {
  const stops: ExtractedGradientStop[] = [];
  const step = 1 / (stopsCount - 1);

  for (let i = 0; i < stopsCount; i++) {
    const t = i * step;
    const x = p1.x + (p2.x - p1.x) * t;
    const y = p1.y + (p2.y - p1.y) * t;
    const { hex } = samplePixelColor(ctx, x, y, width, height);
    stops.push({
      id: String(i + 1),
      position: Math.round(t * 100),
      hex,
    });
  }

  return stops;
}
