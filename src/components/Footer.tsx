import { Github, Globe } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#07080b] py-12 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span>CSS Studio Pro</span>
              <span className="rounded bg-zinc-800 border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-300 font-mono">
                v2.5 PRO SUITE
              </span>
            </div>
            <p className="mt-1.5 max-w-md text-[11px] text-zinc-400 leading-relaxed">
              Official architectural visual color &amp; CSS design workstation by{' '}
              <a
                href="https://oathanrex.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:text-white font-medium underline underline-offset-2"
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
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-zinc-400" />
              <span>OathanRex Portfolio</span>
            </a>

            <a
              href="https://github.com/oathanrex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5 text-zinc-400" />
              <span>Developer Profile</span>
            </a>

            <span className="text-zinc-700 select-none">•</span>
            <span className="text-zinc-400 font-mono text-[11px]">© 2026 Oathan Rex · All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
