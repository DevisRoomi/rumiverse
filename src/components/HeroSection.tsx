import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_TELEMETRY_NODES } from '../utils/ecosystemData';
import { EditorialImage } from './EditorialImage';
import { MagneticButton } from './MagneticButton';

const HERO_IMAGE_SRC = '/src/assets/images/rumiverse_virtual_studio_hero.webp';

const WING_HIGHLIGHTS = [
  '01 · Web & Mobile Studio',
  '02 · Autonomous AI Foundry',
  '03 · Applied Field IoT Lab',
];

const HEADLINE_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
};

const WORD_ITEM = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function HeroSection() {
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string>(HERO_TELEMETRY_NODES[0].id);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Rotating ticker every 2 seconds to attract the eye
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % WING_HIGHLIGHTS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleSmoothScroll = () => {
    const target = document.querySelector('#pilar') || document.querySelector('#pendekatan');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeNode =
    HERO_TELEMETRY_NODES.find((n) => n.id === activeNodeId) ?? HERO_TELEMETRY_NODES[0];

  return (
    <section id="hero" className="border-b border-[#D8D6CE] bg-[#F4F3EF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left column: Editorial Typography & Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20 flex flex-col justify-between lg:border-r border-b lg:border-b-0 border-[#D8D6CE]"
        >
          <div className="space-y-8">
            {/* Eyebrow with soft pill styling */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E1] border border-[#D8D6CE] text-xs font-mono text-[#353732] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] animate-pulse" />
              <span>Lumajang, Jawa Timur</span>
              <span aria-hidden="true" className="text-[#A1A39B]">/</span>
              <span className="text-[#2E7D5B] font-semibold">Boutique Systems Studio</span>
            </div>

            {/* Word Stagger Headline with exact "Software" capsule block matching reference */}
            <motion.h1
              variants={HEADLINE_CONTAINER}
              initial="hidden"
              animate="visible"
              className="font-display font-bold text-[#121311] tracking-tight leading-[1.15] max-w-xl"
              style={{
                fontSize: 'clamp(2.2rem, 3.35vw, 3.45rem)',
              }}
            >
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                Membangun
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em] align-baseline">
                {/* Outer capsule + inner dark green block with white text */}
                <span className="inline-flex items-center p-[2.5px] rounded-lg bg-[#E2E0D8] border border-[#C8C5BA] shadow-2xs">
                  <span className="px-3 py-0.5 rounded-md bg-[#1B3B2B] text-[#FFFFFF] font-black tracking-tight leading-none">
                    Software
                  </span>
                </span>
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                Presisi,
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                Agen
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                AI
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                Otonom,
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                dan
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block mr-[0.26em]">
                Sistem
              </motion.span>
              <motion.span variants={WORD_ITEM} className="inline-block">
                Lapangan.
              </motion.span>
            </motion.h1>

            <p className="text-base sm:text-[17px] text-[#353732] leading-[1.72] max-w-lg">
              RUMIVERSE adalah boutique technology studio independen. Kami memadukan antarmuka
              digital berstandar tinggi, orkestrasi agen AI otonom untuk otomatisasi kerja, dan
              instrumen IoT yang menghubungkan kode langsung ke dunia fisik.
            </p>
          </div>

          {/* CTA Area with revolving eye-catching elements */}
          <div className="pt-10 lg:pt-12 flex flex-col gap-6 border-t border-[#D8D6CE] mt-10">
            {/* Dynamic Rotating Ticker above button */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#4A4D46]">
              <span className="text-[11px] font-semibold text-[#1B3B2B] tracking-wider uppercase">[DIVISI]</span>
              <span className="text-[#8A8D86]">→</span>
              <div className="h-5 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tickerIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="font-medium text-[#121311] inline-block tracking-tight"
                  >
                    {WING_HIGHLIGHTS[tickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Mechanical Rolling Text Flip Button */}
              <MagneticButton
                href="#pilar"
                onClick={handleSmoothScroll}
                className="group relative inline-flex items-center justify-center gap-3.5 px-6 py-4 rounded-2xl text-sm font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] shadow-[0_8px_25px_-5px_rgba(27,59,43,0.3)] hover:shadow-[0_12px_30px_-5px_rgba(46,125,91,0.4)] transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
              >
                {/* Left Status Dot (Glows brighter on hover) */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] transition-all duration-300 group-hover:bg-[#74C69D] group-hover:shadow-[0_0_8px_#74C69D]" />

                {/* Rolling Text Flip (0.4s cubic-bezier(0.16, 1, 0.3, 1)) */}
                <span className="relative inline-block h-[20px] overflow-hidden leading-[20px] font-sans font-semibold tracking-wide">
                  <span className="block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                    Jelajahi Sayap Studio
                  </span>
                  <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-[#74C69D]">
                    Jelajahi Sayap Studio
                  </span>
                </span>

                {/* Dynamic Diagonal Arrow (↘): Idle Nudge + Hover Glide */}
                <ArrowDownRight
                  className="w-4 h-4 text-[#74C69D] transition-transform duration-300 animate-[diagonalNudge_2.5s_ease-in-out_infinite] group-hover:animate-none group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                  aria-hidden="true"
                />
              </MagneticButton>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A4D46] font-mono tabular-nums">
                <span className="px-2 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">01 · Web</span>
                <span className="px-2 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">02 · AI</span>
                <span className="px-2 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">03 · IoT</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Softer Architectural Viewport & Virtual Studio Inspector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-[#FAF9F6]"
        >
          {/* Softer Floating Shell (Rounded & Elevated) */}
          <div className="rounded-3xl border border-[#D8D6CE] bg-[#F4F3EF] shadow-[0_20px_50px_-20px_rgba(18,19,17,0.08)] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(18,19,17,0.12)]">
            {/* Viewport Top Header: Clean Monochromatic Editorial Bar */}
            <div className="px-5 py-3 border-b border-[#D8D6CE] bg-[#FAF9F6] flex items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-[#121311]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B3B2B]" />
                <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-[#121311]">
                  RUMIVERSE // VIRTUAL STUDIO
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-[#4A4D46]">
                <span>FIG. 01</span>
                <span className="text-[#D8D6CE]">/</span>
                <span className="font-medium text-[#1B3B2B]">STATUS: OPERATIONAL</span>
              </div>
            </div>

            {/* Uncropped 16:9 Architectural Stage with Rounded Inner View */}
            <div
              ref={mediaContainerRef}
              className="relative w-full aspect-[16/9] bg-[#121311] overflow-hidden"
            >
              <EditorialImage
                src={HERO_IMAGE_SRC}
                alt="Panel visualisasi kantor virtual 3D RUMIVERSE Studio dengan divisi Web & Mobile Studio, Autonomous AI Foundry, dan Applied Field IoT Workshop"
                className="w-full h-full object-contain"
                fallbackTitle="RUMIVERSE Studio Virtual Command Center"
                fallbackSubtitle="Visualisasi pemantauan agen AI otonom dan ekosistem lab secara real-time."
              />

              {/* Pin Hotspots on each room with smooth hover expansion */}
              {HERO_TELEMETRY_NODES.map((node) => {
                const isSelected = node.id === activeNode.id;
                const openLeft = node.align === 'left';
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNodeId(node.id)}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    style={{
                      top: `${node.topPercent}%`,
                      left: `${node.leftPercent}%`,
                    }}
                    aria-label={`Pilih ${node.label}`}
                    aria-pressed={isSelected}
                    className={`group absolute -translate-y-1/2 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F3EF] transition-all duration-200 ${
                      openLeft ? '-translate-x-[calc(100%-8px)]' : '-translate-x-2'
                    } ${isSelected ? 'z-20 scale-105' : 'z-10 hover:scale-105'}`}
                  >
                    <span
                      className={`flex items-center gap-2 ${openLeft ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <span
                        className={`relative flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                          isSelected
                            ? 'border-[#74C69D] bg-[#1B3B2B] shadow-[0_0_12px_rgba(116,198,157,0.6)] scale-110'
                            : 'border-[#F4F3EF]/80 bg-[#121311]/80 hover:bg-[#1B3B2B] hover:border-[#74C69D]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isSelected ? 'bg-[#74C69D]' : 'bg-[#F4F3EF]'
                          }`}
                        />
                      </span>

                      <span
                        className={`hidden md:inline-flex px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase border transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#121311] text-[#74C69D] border-[#74C69D] shadow-md'
                            : 'bg-[#121311]/80 text-[#D8D6CE] border-[#D8D6CE]/30 opacity-75 group-hover:opacity-100'
                        }`}
                      >
                        {node.shortLabel}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Inspector Panel: Active Wing Detail with Smooth Animated Transitions */}
            <div className="p-5 sm:p-6 bg-[#FAF9F6] border-t border-[#D8D6CE] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D8D6CE]/80">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-[#1B3B2B] text-[#74C69D] font-mono text-[11px] font-bold tracking-wider">
                        {activeNode.code}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#121311]">
                        {activeNode.label}
                      </h3>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#EAE8E1] text-[#2E7D5B] font-semibold">
                      {activeNode.reading}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[#353732] leading-relaxed">
                    {activeNode.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Softer Quick Switcher Pill Buttons */}
              <div className="mt-5 pt-4 border-t border-[#D8D6CE]/80 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-[#6B6E66] mr-1 hidden sm:inline">
                  Fokus Divisi:
                </span>
                {HERO_TELEMETRY_NODES.map((node) => {
                  const isActive = node.id === activeNode.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      aria-pressed={isActive}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-[#1B3B2B] bg-[#1B3B2B] text-[#F4F3EF] font-semibold shadow-sm scale-[1.02]'
                          : 'border-[#D8D6CE] bg-[#F4F3EF] text-[#4A4D46] hover:bg-[#EAE8E1] hover:text-[#121311] hover:border-[#B5B2A8]'
                      }`}
                    >
                      {node.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
