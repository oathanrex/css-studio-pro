import { Check, ChevronUp, Copy, Download, Shuffle } from 'lucide-react';
import React from 'react';
import type { ToolMode } from '../types';
import { WORKSPACE_TOOLS } from './MobileToolDrawer';

interface MobileBottomDockProps {
  activeMode: ToolMode;
  onOpenDrawer: () => void;
  onRandomize: () => void;
  onDownloadPng?: () => void;
  onCopyCss: () => void;
  copied: boolean;
}

export function MobileBottomDock({
  activeMode,
  onOpenDrawer,
  onRandomize,
  onDownloadPng,
  onCopyCss,
  copied,
}: MobileBottomDockProps) {
  const currentTool = WORKSPACE_TOOLS.find((t) => t.id === activeMode) || WORKSPACE_TOOLS[0];
  const Icon = currentTool.icon;

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none xl:hidden">
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200/90 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl p-1.5 shadow-2xl transition-all">
        {/* Tool Switcher Button */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 px-3 sm:px-3.5 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-white/10 transition-all cursor-pointer active:scale-95 shrink-0"
          title="Switch workspace tool"
        >
          <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
          <span className="max-w-[75px] sm:max-w-none truncate">{currentTool.label}</span>
          <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
        </button>

        {/* Quick Gradient Actions: Randomize + 4K Export (in Thumb Zone) */}
        {activeMode === 'gradient' && (
          <>
            <button
              type="button"
              onClick={onRandomize}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10 transition-all cursor-pointer active:scale-95 shrink-0"
              title="Randomize Palette"
              aria-label="Randomize Palette"
            >
              <Shuffle className="h-3.5 w-3.5" />
            </button>

            {onDownloadPng && (
              <button
                type="button"
                onClick={onDownloadPng}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10 transition-all cursor-pointer active:scale-95 shrink-0"
                title="Export 4K Wallpaper PNG"
                aria-label="Export 4K Wallpaper"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </>
        )}

        {/* Primary Action Button: Copy CSS (Always in thumb zone) */}
        <button
          type="button"
          onClick={onCopyCss}
          className={`flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2 text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95 shrink-0 ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-black dark:hover:bg-zinc-100'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy CSS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
