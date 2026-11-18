import { Github, Globe } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-[#07080b] py-12 text-zinc-600 dark:text-zinc-400 text-xs transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm">
              <span>CSS Studio Pro</span>
              <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 px-2 py-0.5 text-[10px] text-zinc-700 dark:text-zinc-300 font-mono">
                v2.5 PRO SUITE
              </span>
            </div>
            <p className="mt-1.5 max-w-md text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Official architectural visual color &amp; CSS design workstation by{' '}
              <a
                href="https://oathanrex.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 dark:text-zinc-200 hover:underline font-medium underline-offset-2"
              >
                Oathan Rex
              </a>
              . High-performance, client-side, zero tracking, zero advertising.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a
              href="https://oathanrex.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>OathanRex Portfolio</span>
            </a>

            <a
              href="https://github.com/oathanrex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Developer Profile</span>
            </a>

            <span className="text-zinc-400 dark:text-zinc-700 select-none">•</span>
            <span className="text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">
              © 2026 Oathan Rex · All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
