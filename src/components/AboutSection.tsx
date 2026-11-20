import { useState } from 'react';
import { motion } from 'motion/react';
import { useReveal } from '../hooks/useReveal';
import { MaskedHeading } from './MaskedHeading';

const ABOUT_COLUMNS = [
  {
    num: 'I. Lokasi Kami',
    body: 'Kami berbasis di Lumajang, Jawa Timur. Kami memadukan riset software modern dengan laboratorium lapangan langsung untuk menghadirkan solusi digital yang teruji nyata.',
  },
  {
    num: 'II. Yang Kami Kerjakan',
    body: 'Kami membuat situs dan aplikasi sesuai kebutuhan, menghubungkan AI untuk membantu pekerjaan berulang, dan menyatukan sistem agar pekerjaan sehari-hari lebih mudah dipantau.',
  },
  {
    num: 'III. Prinsip Kerja',
    body: 'Kami menjelaskan pilihan teknologi dengan bahasa yang jelas dan membuat sistem yang mudah dirawat, sehingga tetap berguna dalam jangka panjang.',
  },
];

export function AboutSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.15);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="pendekatan" ref={ref} className="border-b border-[#D8D6CE] bg-[#FAF9F6] relative">
      <span id="tentang" className="absolute -top-16" aria-hidden="true" />
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8">
          {/* Left Column: Eyebrow & Title */}
          <div className="lg:col-span-4 space-y-2">
            <p className="font-mono text-xs text-[#2E7D5B] tracking-wide font-semibold">
              01. Tentang Kami
            </p>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121311] tracking-tight"
            >
              Cara Kami Bekerja
            </MaskedHeading>
          </div>

          {/* Right Column: Masked Line Reveal Headline (Stagger 100ms antara baris 1 & 2) */}
          <div className="lg:col-span-8 font-display text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#121311] leading-[1.32] tracking-tight">
            {/* Baris 1: Teknologi boleh rumit di belakang layar. */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={visible ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Teknologi boleh rumit di belakang layar.
              </motion.div>
            </div>

            {/* Baris 2: Cara pakainya tetap sederhana. */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={visible ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Cara pakainya tetap sederhana.
              </motion.div>
            </div>
          </div>
        </div>

        {/* 1. Draw-in Horizontal Grid Line (Memanjang mulus dari kiri ke kanan scaleX: 0 → 1) */}
        <div className="w-full relative overflow-hidden">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={visible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="w-full h-px bg-[#D8D6CE]"
          />
        </div>

        {/* 3-Column Editorial Swiss Grid Layout with Draw-in Vertical Rules */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 pt-10 sm:pt-12">
          {/* Vertical Draw-in Rule 1 (Turun dari atas ke bawah antara Kolom I dan II) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="hidden lg:block absolute top-0 bottom-0 left-1/3 w-px bg-[#D8D6CE]"
          />

          {/* Vertical Draw-in Rule 2 (Turun dari atas ke bawah antara Kolom II dan III) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.85, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="hidden lg:block absolute top-0 bottom-0 left-2/3 w-px bg-[#D8D6CE]"
          />

          {/* 3 Staggered Columns with Interactive Subtle Focus (Editorial Dimming 0.55) */}
          {ABOUT_COLUMNS.map((col, idx) => {
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.article
                key={col.num}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 16 }}
                animate={
                  visible
                    ? { opacity: isDimmed ? 0.55 : 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                transition={{
                  opacity: { duration: 0.3, ease: 'easeOut' },
                  y: {
                    duration: 0.7,
                    delay: 0.62 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className={`transition-all duration-300 cursor-default select-none ${
                  idx === 0
                    ? 'pb-8 lg:pb-0 lg:pr-10 border-b lg:border-b-0 border-[#D8D6CE]'
                    : idx === 1
                      ? 'py-8 lg:py-0 lg:px-10 border-b lg:border-b-0 border-[#D8D6CE]'
                      : 'pt-8 lg:pt-0 lg:pl-10'
                }`}
              >
                {/* Column Number & Title with Brand Green Transition on Hover */}
                <p
                  className={`font-mono text-xs mb-4 font-semibold transition-colors duration-300 ${
                    isHovered ? 'text-[#1B3B2B]' : 'text-[#4A4D46]'
                  }`}
                >
                  {col.num}
                </p>

                {/* Column Body Text */}
                <p
                  className={`text-base leading-[1.72] transition-colors duration-300 ${
                    isHovered ? 'text-[#121311]' : 'text-[#2D2F2A]'
                  }`}
                >
                  {col.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
