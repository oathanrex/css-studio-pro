import { ExternalLink, Github, Globe, Shield } from 'lucide-react';
import React from 'react';

const ECOSYSTEM_LINKS = [
  { name: 'Pro Color Extractor', url: 'https://oathanrex.github.io/pro-color-extractor/' },
  { name: 'OKLCH Design Tokens', url: 'https://oathanrex.github.io/oklch-tool/' },
  { name: 'ChromaLab Pro', url: 'https://oathanrex.github.io/chromalab-pro/' },
  { name: 'ColorKit Pro', url: 'https://oathanrex.github.io/colorkit-pro/' },
  { name: 'CSS Named Colors', url: 'https://oathanrex.github.io/css-named-colors-explorer/' },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#07080b] py-12 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 space-y-8">
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

        {/* Silo Ecosystem Spoke Links Bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono">
          <span className="text-zinc-500 uppercase tracking-wider">
            Oathan Rex Design Cloud:
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {ECOSYSTEM_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>{link.name}</span>
                <ExternalLink className="h-2.5 w-2.5 text-zinc-600" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
