import {
  Check,
  Copy,
  Download,
  Flame,
  Image as ImageIcon,
  Move,
  Palette,
  Sparkles,
  Upload,
  Zap,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  extractGradientFromVector,
  extractPaletteKMeans,
  samplePixelColor,
  type ExtractedColorPin,
  type ExtractedGradientStop,
  type MoodFilter,
} from '../engine/imageSamplingEngine';

interface ImageExtractStudioProps {
  onApplyToGradient: (hexColors: string[]) => void;
}

// Built-in Sample Photos for instant testing
const SAMPLE_PHOTOS = [
  {
    name: 'Titanium Architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Boreal Emerald Aurora',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tokyo Twilight Neon',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mojave Sunset Dune',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },
];

const MOODS: { id: MoodFilter; label: string }[] = [
  { id: 'vibrant', label: 'Vibrant' },
  { id: 'bright', label: 'Bright' },
  { id: 'deep', label: 'Deep' },
  { id: 'muted', label: 'Muted' },
  { id: 'dark', label: 'Dark' },
  { id: 'none', label: 'Custom' },
];

export function ImageExtractStudio({ onApplyToGradient }: ImageExtractStudioProps) {
  const [subMode, setSubMode] = useState<'palette' | 'gradient'>('palette');
  const [selectedMood, setSelectedMood] = useState<MoodFilter>('vibrant');
  const [activeImageSrc, setActiveImageSrc] = useState<string>(SAMPLE_PHOTOS[0].url);
  const [isCustomUpload, setIsCustomUpload] = useState(false);

  const [pins, setPins] = useState<ExtractedColorPin[]>([]);
  const [gradientStops, setGradientStops] = useState<ExtractedGradientStop[]>([]);
  const [stopsCount, setStopsCount] = useState<number>(4);

  // Gradient vector line positions (in percentage 0 - 100)
  const [vectorP1, setVectorP1] = useState<{ x: number; y: number }>({ x: 15, y: 50 });
  const [vectorP2, setVectorP2] = useState<{ x: number; y: number }>({ x: 85, y: 50 });

  const [activeDragTarget, setActiveDragTarget] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load and sample image whenever source changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activeImageSrc;
    img.onload = () => {
      imgRef.current = img;
      runExtraction(img, selectedMood);
    };
  }, [activeImageSrc]);

  // Re-run extraction on mood change
  const handleMoodChange = (mood: MoodFilter) => {
    setSelectedMood(mood);
    if (imgRef.current) {
      runExtraction(imgRef.current, mood);
    }
  };

  const runExtraction = (img: HTMLImageElement, mood: MoodFilter) => {
    // 1. Extract K-Means palette pins
    const extractedPins = extractPaletteKMeans(img, 5, mood);
    setPins(extractedPins);

    // 2. Draw on offscreen canvas for vector gradient extraction
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width || 600;
    canvas.height = img.naturalHeight || img.height || 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const stops = extractGradientFromVector(
        ctx,
        { x: (vectorP1.x / 100) * canvas.width, y: (vectorP1.y / 100) * canvas.height },
        { x: (vectorP2.x / 100) * canvas.width, y: (vectorP2.y / 100) * canvas.height },
        stopsCount,
        canvas.width,
        canvas.height
      );
      setGradientStops(stops);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setIsCustomUpload(true);
          setActiveImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Pin / Vector dragging
  const handlePointerDown = (targetId: string) => {
    setActiveDragTarget(targetId);
  };

  const handleContainerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeDragTarget || !containerRef.current || !imgRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xClamped = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yClamped = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    const canvas = canvasRef.current || document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (subMode === 'palette') {
      // Dragging a color pin
      setPins((prev) =>
        prev.map((pin) => {
          if (pin.id === activeDragTarget && ctx) {
            const pixelX = (xClamped / 100) * canvas.width;
            const pixelY = (yClamped / 100) * canvas.height;
            const { hex, rgb } = samplePixelColor(ctx, pixelX, pixelY, canvas.width, canvas.height);
            return {
              ...pin,
              xPercent: xClamped,
              yPercent: yClamped,
              hex,
              rgb,
            };
          }
          return pin;
        })
      );
    } else {
      // Dragging vector line points
      if (activeDragTarget === 'p1') {
        setVectorP1({ x: xClamped, y: yClamped });
      } else if (activeDragTarget === 'p2') {
        setVectorP2({ x: xClamped, y: yClamped });
      }

      if (ctx) {
        const p1 = activeDragTarget === 'p1' ? { x: xClamped, y: yClamped } : vectorP1;
        const p2 = activeDragTarget === 'p2' ? { x: xClamped, y: yClamped } : vectorP2;
        const stops = extractGradientFromVector(
          ctx,
          { x: (p1.x / 100) * canvas.width, y: (p1.y / 100) * canvas.height },
          { x: (p2.x / 100) * canvas.width, y: (p2.y / 100) * canvas.height },
          stopsCount,
          canvas.width,
          canvas.height
        );
        setGradientStops(stops);
      }
    }
  };

  const handlePointerUp = () => {
    setActiveDragTarget(null);
  };

  const activeGradientCss = `linear-gradient(90deg, ${gradientStops
    .map((s) => `${s.hex} ${s.position}%`)
    .join(', ')})`;

  return (
    <div className="space-y-6 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-7 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-100">
              Image Theme &amp; Gradient Extractor
            </h2>
            <span className="rounded bg-zinc-800 border border-white/10 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300">
              100% PRIVATE CLIENT-SIDE
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Extract mathematical palettes and linear vector gradients directly from any photograph.
          </p>
        </div>

        {/* Sub-mode Switcher */}
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-zinc-900/60 p-1 shadow-inner">
          <button
            type="button"
            onClick={() => setSubMode('palette')}
            className={`rounded-lg px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
              subMode === 'palette'
                ? 'bg-zinc-800 text-white shadow-xs border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Extract Palette
          </button>
          <button
            type="button"
            onClick={() => setSubMode('gradient')}
            className={`rounded-lg px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
              subMode === 'gradient'
                ? 'bg-zinc-800 text-white shadow-xs border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Extract Gradient
          </button>
        </div>
      </div>

      {/* Preset Photo Selector & Upload Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-zinc-400 uppercase">Presets:</span>
          {SAMPLE_PHOTOS.map((sp) => (
            <button
              key={sp.name}
              type="button"
              onClick={() => {
                setIsCustomUpload(false);
                setActiveImageSrc(sp.url);
              }}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer border ${
                activeImageSrc === sp.url && !isCustomUpload
                  ? 'border-white/20 bg-zinc-800 text-white font-semibold'
                  : 'border-white/[0.05] bg-zinc-900/40 text-zinc-400 hover:text-white'
              }`}
            >
              {sp.name}
            </button>
          ))}
        </div>

        {/* Custom Upload Button */}
        <label className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900 hover:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-200 cursor-pointer shadow-xs transition-colors">
          <Upload className="h-3.5 w-3.5" />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Mood Filters Bar (Only for Palette Mode) */}
      {subMode === 'palette' && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400 uppercase">Mood Filter:</span>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleMoodChange(m.id)}
                className={`rounded px-2 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
                  selectedMood === m.id
                    ? 'bg-zinc-800 text-white font-bold border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gradient Stops Count (Only for Gradient Mode) */}
      {subMode === 'gradient' && (
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[10px] font-mono text-zinc-400 uppercase">Stops ({stopsCount}):</span>
          <div className="flex items-center gap-1">
            {[2, 3, 4, 5, 6, 8].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => {
                  setStopsCount(count);
                  if (imgRef.current) runExtraction(imgRef.current, selectedMood);
                }}
                className={`rounded px-2 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
                  stopsCount === count
                    ? 'bg-zinc-800 text-white font-bold border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Image Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl select-none touch-none cursor-crosshair bg-black"
        onPointerMove={handleContainerPointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Background Image */}
        <img
          src={activeImageSrc}
          alt="Color Extraction Source"
          className="h-full w-full object-cover pointer-events-none"
        />

        {/* Offscreen sampling canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Mode 1: Draggable Color Palette Pins */}
        {subMode === 'palette' &&
          pins.map((pin) => (
            <div
              key={pin.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group transition-transform"
              style={{
                left: `${pin.xPercent}%`,
                top: `${pin.yPercent}%`,
              }}
              onPointerDown={() => handlePointerDown(pin.id)}
            >
              {/* Outer Glow Halo Ring */}
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center border-2 border-white shadow-xl transition-transform group-hover:scale-125"
                style={{ backgroundColor: pin.hex }}
              >
                <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
              </div>

              {/* Floating Loupe Hex Badge */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-zinc-950/90 border border-white/15 px-2 py-0.5 rounded font-mono text-[9px] text-white whitespace-nowrap shadow-md pointer-events-none">
                {pin.hex}
              </div>
            </div>
          ))}

        {/* Mode 2: Draggable Gradient Vector Line */}
        {subMode === 'gradient' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Gradient Vector Line */}
            <line
              x1={`${vectorP1.x}%`}
              y1={`${vectorP1.y}%`}
              x2={`${vectorP2.x}%`}
              y2={`${vectorP2.y}%`}
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Intermediate Stop Markers */}
            {gradientStops.map((stop) => {
              const t = stop.position / 100;
              const sx = vectorP1.x + (vectorP2.x - vectorP1.x) * t;
              const sy = vectorP1.y + (vectorP2.y - vectorP1.y) * t;
              return (
                <circle
                  key={`stop-${stop.id}`}
                  cx={`${sx}%`}
                  cy={`${sy}%`}
                  r="6"
                  fill={stop.hex}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        )}

        {/* Vector Anchors (Interactive) */}
        {subMode === 'gradient' && (
          <>
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing h-7 w-7 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center shadow-2xl"
              style={{ left: `${vectorP1.x}%`, top: `${vectorP1.y}%` }}
              onPointerDown={() => handlePointerDown('p1')}
            >
              <span className="font-mono text-[9px] text-white font-bold">A</span>
            </div>

            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing h-7 w-7 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center shadow-2xl"
              style={{ left: `${vectorP2.x}%`, top: `${vectorP2.y}%` }}
              onPointerDown={() => handlePointerDown('p2')}
            >
              <span className="font-mono text-[9px] text-white font-bold">B</span>
            </div>
          </>
        )}
      </div>

      {/* Output Panel: Swatches or Gradient Preview */}
      {subMode === 'palette' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {pins.map((pin, idx) => (
              <div
                key={pin.id}
                className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3 space-y-2.5 hover:border-white/15 transition-all"
              >
                <div
                  className="h-16 w-full rounded-lg border border-white/10 shadow-inner flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: pin.hex }}
                  onClick={() => {
                    navigator.clipboard.writeText(pin.hex);
                    setCopiedId(pin.id);
                    setTimeout(() => setCopiedId(null), 1500);
                  }}
                  title="Click to copy Hex"
                >
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/60 text-white">
                    {copiedId === pin.id ? 'Copied!' : pin.hex}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>Color #{idx + 1}</span>
                  <span>RGB: {pin.rgb.r},{pin.rgb.g},{pin.rgb.b}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => onApplyToGradient(pins.map((p) => p.hex))}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 px-4 py-2 text-xs font-semibold transition-all cursor-pointer shadow-md"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Apply Extracted Palette to Studio</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Extracted Linear Vector Gradient
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Vector Length: A $\to$ B
            </span>
          </div>

          {/* Live Gradient Preview Bar */}
          <div
            className="h-14 w-full rounded-xl border border-white/10 shadow-lg"
            style={{ background: activeGradientCss }}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <pre className="font-mono text-[11px] text-zinc-400 bg-black/60 px-3 py-1.5 rounded border border-white/5 select-all overflow-x-auto">
              <code>background: {activeGradientCss};</code>
            </pre>

            <button
              type="button"
              onClick={() => onApplyToGradient(gradientStops.map((s) => s.hex))}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 px-4 py-2 text-xs font-semibold transition-all cursor-pointer shadow-md"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Apply to Studio Gradient Canvas</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
