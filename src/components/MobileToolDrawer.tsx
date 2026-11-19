import {
  Box,
  Check,
  CircleDot,
  Flame,
  Image as ImageIcon,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  Type,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect } from 'react';
import type { ToolMode } from '../types';

export interface ToolDef {
  id: ToolMode;
  label: string;
  category: 'Color & Palette Architecture' | 'Modern CSS Physics' | 'UI & Accessibility';
  description: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WORKSPACE_TOOLS: ToolDef[] = [
  {
    id: 'gradient',
    label: 'Gradients',
    category: 'Color & Palette Architecture',
    description: 'OKLCH Linear & Radial sub-pixel gradient studio',
    icon: Palette,
  },
  {
    id: 'color-wheel',
    label: 'Color Wheel',
    category: 'Color & Palette Architecture',
    description: 'Adobe-style geometric harmonies & hue wheel',
    icon: CircleDot,
  },
  {
    id: 'image-extract',
    label: 'Extract Image',
    category: 'Color & Palette Architecture',
    description: 'K-means color quantization & mood presets',
    icon: ImageIcon,
  },
  {
    id: 'palettes',
    label: 'Gallery Vault',
    category: 'Color & Palette Architecture',
    description: 'Design token collections & local library vault',
    badge: 'Vault',
    icon: Flame,
  },
  {
    id: 'glassmorphism',
    label: 'Glassmorphism',
    category: 'Modern CSS Physics',
    description: 'Multi-layer backdrop blur & frosted glass optics',
    icon: Layers,
  },
  {
    id: 'neumorphism',
    label: 'Neumorphism',
    category: 'Modern CSS Physics',
    description: 'Soft 3D extrusion, convex/concave dual shadows',
    icon: Box,
  },
  {
    id: 'shadow',
    label: 'Shadows',
    category: 'Modern CSS Physics',
    description: 'Natural ambient elevation & multi-stack penumbra',
    icon: Sparkles,
  },
  {
    id: 'button',
    label: 'Buttons',
    category: 'UI & Accessibility',
    description: 'Production CTA system with tactile shine physics',
    icon: Zap,
  },
  {
    id: 'text',
    label: 'Typography',
    category: 'UI & Accessibility',
    description: 'High-contrast clipped gradient typographic headers',
    icon: Type,
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    category: 'UI & Accessibility',
    description: 'Adobe Color contrast ratio checker & WCAG AA/AAA',
    badge: 'WCAG',
    icon: ShieldCheck,
  },
];

interface MobileToolDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMode: ToolMode;
  onSelectMode: (mode: ToolMode) => void;
}

export function MobileToolDrawer({
  isOpen,
  onClose,
  activeMode,
  onSelectMode,
}: MobileToolDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = Array.from(new Set(WORKSPACE_TOOLS.map((t) => t.category)));

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Up Bottom Sheet */}
      <div className="relative z-50 max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border-t border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#0c0d12] p-5 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300">
        {/* Grab Handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700" />

        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
                Workspace Modules
              </h2>
              <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-700 dark:text-zinc-300">
                10 Available
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Select a specialized design or color workstation
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Categorized Tools Grid */}
        <div className="space-y-5 pb-6">
          {categories.map((cat) => {
            const toolsInCat = WORKSPACE_TOOLS.filter((t) => t.category === cat);
            return (
              <div key={cat} className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1">
                  {cat}
                </span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {toolsInCat.map((t) => {
                    const Icon = t.icon;
                    const isActive = activeMode === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          onSelectMode(t.id);
                          onClose();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex items-center justify-between rounded-2xl p-3 border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'border-zinc-900 dark:border-white/30 bg-zinc-100 dark:bg-zinc-800/80 shadow-xs'
                            : 'border-zinc-200/70 dark:border-white/5 bg-zinc-50/60 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                              isActive
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white'
                                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                                {t.label}
                              </span>
                              {t.badge && (
                                <span className="rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-mono px-1.5 py-0.2">
                                  {t.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {t.description}
                            </p>
                          </div>
                        </div>

                        {isActive && (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950">
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
