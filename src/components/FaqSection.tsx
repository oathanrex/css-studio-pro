import { ChevronDown, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

const FAQS = [
  {
    question: 'How do I create a CSS gradient?',
    answer:
      'A CSS gradient is created using the linear-gradient(), radial-gradient(), or conic-gradient() CSS function as the background or background-image property. In CSS Studio Pro, you can visually pick colors, adjust angles, and drag stops to generate clean, production-ready CSS code instantly.',
  },
  {
    question: 'What is the difference between linear-gradient and radial-gradient?',
    answer:
      'A linear gradient transitions colors progressively along a straight directional line (such as 90deg, 180deg, or corner-to-corner), whereas a radial gradient transitions colors outward from a single origin point in a circular or elliptical pattern.',
  },
  {
    question: 'How does CSS Glassmorphism work?',
    answer:
      'Glassmorphism creates a frosted-glass optical effect by combining backdrop-filter: blur(px), a semi-transparent RGBA background (e.g. rgba(255, 255, 255, 0.15)), subtle border highlights, and soft box-shadows.',
  },
  {
    question: 'Can I export gradients to Tailwind CSS?',
    answer:
      'Yes! CSS Studio Pro automatically generates native Tailwind CSS classes (such as bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500) and arbitrary Tailwind values for instant copy-pasting into your project.',
  },
  {
    question: 'Are CSS gradients fully supported across all browsers?',
    answer:
      'Yes! Modern CSS gradients (linear and radial) have 99.8% global browser support across all versions of Chrome, Safari, Firefox, Edge, and iOS/Android mobile web browsers.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
        <HelpCircle className="h-4 w-4" />
        <span>Frequently Asked Questions</span>
      </div>
      <h2 className="text-2xl font-extrabold text-white">CSS Design &amp; Gradients FAQ</h2>

      <div className="space-y-3 pt-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-bold text-sm text-slate-200 hover:text-white cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-800/80 px-4 pb-4 pt-2 text-xs leading-relaxed text-slate-400">
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
