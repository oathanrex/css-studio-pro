import { ChevronDown, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

const FAQS = [
  {
    question: 'How do I create a modern CSS gradient in OKLCH?',
    answer:
      'In modern CSS Color Module Level 4, you can declare gradients using "linear-gradient(in oklch 135deg, #090a0f 0%, #94a3b8 100%)". OKLCH provides perceptually uniform color interpolation, completely preventing the muddy gray dead zones found in classic sRGB transitions.',
  },
  {
    question: 'What is the difference between linear-gradient and radial-gradient?',
    answer:
      'A linear gradient transitions colors progressively along a straight directional line (such as 90deg, 180deg, or corner-to-corner), whereas a radial gradient transitions colors outward from a single origin point in a circular or elliptical pattern.',
  },
  {
    question: 'How does CSS Glassmorphism work with hardware acceleration?',
    answer:
      'Glassmorphism creates a frosted-glass optical effect by combining backdrop-filter: blur(px), a semi-transparent RGBA/OKLCH background, subtle border highlights, and soft box-shadows. For 60fps performance on mobile, isolate the card with will-change: transform.',
  },
  {
    question: 'Can I export gradients to Tailwind CSS, Flutter and SVG?',
    answer:
      'Yes! CSS Studio Pro automatically generates native Tailwind CSS classes, scalable SVG vector gradients, Flutter Dart BoxDecoration code, and Android XML shape syntax for seamless cross-platform implementation.',
  },
  {
    question: 'Are CSS gradients fully supported across all browsers?',
    answer:
      'Yes! Modern CSS gradients have 99.8% global browser support across Chrome, Safari, Firefox, Edge, and iOS/Android mobile web browsers.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="space-y-4 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-6 sm:p-8 shadow-lg dark:shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-semibold">
        <HelpCircle className="h-4 w-4 text-zinc-400" />
        <span>Frequently Asked Questions</span>
      </div>
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl tracking-tight">CSS Design &amp; Gradients FAQ</h2>

      <div className="space-y-3 pt-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-sm text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-white/[0.04] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
