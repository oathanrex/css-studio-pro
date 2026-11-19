import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Color Theory' | 'CSS Physics' | 'Accessibility' | 'Engineering & Privacy';
}

const FAQS: FaqItem[] = [
  {
    category: 'Color Theory',
    question: 'How does OKLCH gradient interpolation differ from traditional sRGB?',
    answer:
      'Standard sRGB color interpolation creates an unnatural "gray dead zone" in midtones between complementary hues because sRGB is not perceptually uniform. CSS Color Module Level 4 introduces OKLCH, which decouples perceived Lightness (L), Chroma (C), and Hue (h). In OKLCH space, color transitions maintain consistent perceived luminance and vibrant chroma across the entire transition line without dropping into muddy desaturated grays.',
  },
  {
    category: 'Color Theory',
    question: 'What are the 10 color harmony rules supported by the Color Wheel Studio?',
    answer:
      'CSS Studio Pro features 10 classical and algorithmic color harmony rules: Complementary (180° opposite), Analogous (adjacent ±30° angles), Triadic (three equidistant points at 120°), Tetradic/Rectangular (two complementary pairs at 60°/180°), Square (four equidistant points at 90°), Split-Complementary (base plus ±30° from its complement), Monochromatic (constant hue with variable chroma and lightness), Compound/Double-Split, Shades & Tints (luminance graduations), and OKLCH Perceptual Hue-Step.',
  },
  {
    category: 'Engineering & Privacy',
    question: 'How does the Image Palette Extractor extract gradients without uploading images?',
    answer:
      'The Image Palette Extractor operates entirely inside your local browser using the HTML5 2D Canvas API. Image pixels are decoded and sampled directly into a local Uint8ClampedArray, clustered using perceptual Euclidean distance quantization, and converted into dominant palette swatches and multi-stop CSS gradients. Zero bytes of image data or telemetry are transmitted to any server, guaranteeing 100% data privacy and offline capability.',
  },
  {
    category: 'CSS Physics',
    question: 'How do I ensure Glassmorphism runs smoothly at 60fps on mobile browsers?',
    answer:
      'To prevent GPU jank and high compositor latency with backdrop-filter: blur(), always isolate the frosted glass element onto its own hardware compositing layer using transform: translateZ(0) or will-change: transform. Additionally, pair moderate blur radii (16px to 24px) with subtle semi-transparent borders (rgba(255, 255, 255, 0.15)) to achieve crisp specular highlights without causing excessive fill-rate bottle-necks.',
  },
  {
    category: 'Accessibility',
    question: 'How is the WCAG 2.1 contrast ratio calculated, and what do AA and AAA mean?',
    answer:
      'The Web Content Accessibility Guidelines (WCAG) 2.1 calculate contrast ratio as (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 is the darker color. Level AA requires at least 4.5:1 for normal body text and 3.0:1 for large text (18pt+) or UI components. Level AAA requires at least 7.0:1 for normal text and 4.5:1 for large text. CSS Studio Pro computes these ratios in real time for every color pair.',
  },
  {
    category: 'Accessibility',
    question: 'How does the Color Blindness simulator calculate vision deficiency previews?',
    answer:
      'The accessibility studio simulates color vision deficiencies using standard 3x3 color transformation matrices applied in linear RGB space. This mathematically models Protanopia (L-cone / red-blind), Deuteranopia (M-cone / green-blind), Tritanopia (S-cone / blue-blind), and Achromatopsia (complete monochromacy), allowing designers to verify whether essential UI information remains distinguishable without relying solely on hue.',
  },
  {
    category: 'CSS Physics',
    question: 'Why should I use multi-layered box shadows instead of a single box-shadow?',
    answer:
      'A single CSS box-shadow creates a harsh, uniform outline that looks artificial. Real-world optics feature an umbra (a tight, darker shadow near the contact surface) and a penumbra (a soft, diffused outer shadow caused by ambient scattered light). Stacking 2 to 4 layered shadows (e.g. one sharp ambient layer and one wide diffused layer) produces natural physical depth and realistic 3D elevation.',
  },
  {
    category: 'Engineering & Privacy',
    question: 'Can I export generated CSS into Tailwind CSS, SVG, Flutter, and Android?',
    answer:
      'Yes. CSS Studio Pro features a multi-target code generation engine that outputs pure CSS declarations, Tailwind CSS v3 and v4 utility classes, scalable vector SVG gradients (<linearGradient>), Flutter Dart BoxDecoration code, and Android XML shape drawables with one-click copying.',
  },
  {
    category: 'Engineering & Privacy',
    question: 'What is the browser compatibility for modern CSS OKLCH gradients?',
    answer:
      'OKLCH gradients declared with "linear-gradient(in oklch ...)" are supported natively in all modern evergreen browsers, including Chrome 111+, Safari 16.2+, Firefox 113+, and Edge 111+. For legacy environments, CSS Studio Pro provides automatic sRGB fallbacks so older web clients gracefully render standard gradients.',
  },
  {
    category: 'Engineering & Privacy',
    question: 'Is CSS Studio Pro free, open-source, and privacy-respecting?',
    answer:
      'CSS Studio Pro is 100% free, MIT licensed, open-source, and contains zero tracking scripts, zero advertising cookies, and zero server-side telemetry. All operations execute strictly client-side within the user browser, making it safe for enterprise, proprietary, and personal development.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Color Theory', 'CSS Physics', 'Accessibility', 'Engineering & Privacy'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="space-y-6 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-6 sm:p-8 shadow-lg dark:shadow-xl transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <HelpCircle className="h-4 w-4 text-zinc-400" />
            <span>Developer Knowledge Base</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl tracking-tight">
            CSS Design, Color Science &amp; Workstation FAQ
          </h2>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Authoritative answers on OKLCH color spaces, accessibility standards, optics, and code generation.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50/70 dark:bg-zinc-900/40 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-sm text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white cursor-pointer gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
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

      <div className="flex items-center justify-between rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 p-4 border border-zinc-200 dark:border-white/[0.06] text-xs">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Have a technical question or feature suggestion?</span>
        </div>
        <a
          href="https://github.com/oathanrex/css-studio-pro/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 dark:text-white font-semibold underline underline-offset-2 hover:text-blue-500 dark:hover:text-blue-400"
        >
          Open GitHub Issue →
        </a>
      </div>
    </section>
  );
}