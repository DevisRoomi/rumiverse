import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Maximize2, Minimize2 } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { HERO_TELEMETRY_NODES } from '../utils/ecosystemData';
import { EditorialImage } from './EditorialImage';
import { MagneticButton } from './MagneticButton';
import heroVirtualStudioImg from '../assets/images/rumiverse_virtual_studio_hero.webp';

const WING_HIGHLIGHTS = [
  '01 · Web & Mobile Studio',
  '02 · Autonomous AI Foundry',
  '03 · Applied Field IoT Lab',
];

const ROOM_CAMERA_FOCUS: Record<string, { origin: string; scale: number }> = {
  'node-ai-foundry': { origin: '82% 26%', scale: 1.24 },
  'node-web-studio': { origin: '54% 34%', scale: 1.24 },
  'node-field-iot': { origin: '84% 68%', scale: 1.24 },
  'node-command-ops': { origin: '44% 62%', scale: 1.24 },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [activeNodeId, setActiveNodeId] = useState<string>(HERO_TELEMETRY_NODES[0].id);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isZoomedIn, setIsZoomedIn] = useState(true);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // 1. Rotating ticker every 2.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % WING_HIGHLIGHTS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // 2. Scrubbed Scroll Parallax (Transitioning out of Hero)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const leftColY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rightColScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const rightColOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.98, 0.88]);
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  // 3. 3D Tilt Parallax (Spring Physics on Cursor Movement)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSmoothScroll = () => {
    const target = document.querySelector('#tentang') || document.querySelector('#pilar');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeNode =
    HERO_TELEMETRY_NODES.find((n) => n.id === activeNodeId) ?? HERO_TELEMETRY_NODES[0];

  const currentCamera = isZoomedIn
    ? (ROOM_CAMERA_FOCUS[activeNode.id] ?? { origin: '50% 50%', scale: 1.2 })
    : { origin: '50% 50%', scale: 1.0 };

  const selectNode = (id: string) => {
    setActiveNodeId(id);
    setIsZoomedIn(true);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="border-b border-[#D8D6CE] bg-[#F4F3EF] overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[calc(100vh-4rem)]">
        {/* Left column: Editorial Typography with Masked Line Reveal & Interactive Keyword Highlight */}
        <motion.div
          style={{ y: leftColY }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20 flex flex-col justify-between lg:border-r border-b lg:border-b-0 border-[#D8D6CE] z-10"
        >
          <div className="space-y-8">
            {/* Eyebrow with soft pill styling */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E1] border border-[#D8D6CE] text-xs font-mono text-[#353732] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] animate-pulse" />
              <span>Lumajang, Jawa Timur</span>
              <span aria-hidden="true" className="text-[#A1A39B]">/</span>
              <span className="text-[#2E7D5B] font-semibold">Boutique Systems Studio</span>
            </div>

            {/* Masked Line Reveal Headline (staggered 80ms per baris dengan cubic-bezier tajam) */}
            <div
              className="font-display font-bold text-[#121311] tracking-tight leading-[1.14] max-w-xl"
              style={{ fontSize: 'clamp(2.2rem, 3.35vw, 3.45rem)' }}
            >
              {/* Line 1: Membangun [Software] */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center flex-wrap gap-x-2"
                >
                  <span>Membangun</span>
                  <button
                    type="button"
                    onClick={() => selectNode('node-web-studio')}
                    onMouseEnter={() => selectNode('node-web-studio')}
                    className="inline-flex items-center p-[2.5px] rounded-lg bg-[#E2E0D8] border border-[#C8C5BA] shadow-2xs hover:border-[#1B3B2B] transition-all cursor-pointer group/kw align-baseline"
                    aria-label="Sorot divisi Web & Mobile Studio"
                  >
                    <span
                      className={`px-3 py-0.5 rounded-md font-black tracking-tight leading-none transition-all duration-300 ${
                        activeNodeId === 'node-web-studio'
                          ? 'bg-[#1B3B2B] text-[#74C69D] shadow-[0_0_12px_rgba(46,125,91,0.4)]'
                          : 'bg-[#1B3B2B] text-[#FFFFFF] group-hover/kw:bg-[#121311]'
                      }`}
                    >
                      Software
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Line 2: Presisi, [Agen AI] */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center flex-wrap gap-x-2"
                >
                  <span>Presisi,</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => selectNode('node-ai-foundry')}
                    onMouseEnter={() => selectNode('node-ai-foundry')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectNode('node-ai-foundry');
                    }}
                    className={`cursor-pointer transition-all duration-300 underline decoration-2 rounded-sm ${
                      activeNodeId === 'node-ai-foundry'
                        ? 'text-[#1B3B2B] decoration-[#2E7D5B] bg-[#2E7D5B]/15 px-2 -mx-1 rounded-md'
                        : 'decoration-transparent hover:text-[#1B3B2B] hover:decoration-[#2E7D5B]'
                    }`}
                    title="Arahkan kursor atau klik untuk menyorot Autonomous AI Foundry"
                  >
                    Agen AI
                  </span>
                </motion.div>
              </div>

              {/* Line 3: [Otonom,] dan */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center flex-wrap gap-x-2"
                >
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => selectNode('node-ai-foundry')}
                    onMouseEnter={() => selectNode('node-ai-foundry')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectNode('node-ai-foundry');
                    }}
                    className={`cursor-pointer transition-all duration-300 underline decoration-2 rounded-sm ${
                      activeNodeId === 'node-ai-foundry'
                        ? 'text-[#1B3B2B] decoration-[#2E7D5B] bg-[#2E7D5B]/15 px-2 -mx-1 rounded-md'
                        : 'decoration-transparent hover:text-[#1B3B2B] hover:decoration-[#2E7D5B]'
                    }`}
                    title="Arahkan kursor atau klik untuk menyorot Autonomous AI Foundry"
                  >
                    Otonom,
                  </span>
                  <span>dan</span>
                </motion.div>
              </div>

              {/* Line 4: [Sistem Lapangan.] */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => selectNode('node-field-iot')}
                    onMouseEnter={() => selectNode('node-field-iot')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectNode('node-field-iot');
                    }}
                    className={`cursor-pointer transition-all duration-300 underline decoration-2 rounded-sm ${
                      activeNodeId === 'node-field-iot'
                        ? 'text-[#1B3B2B] decoration-[#2E7D5B] bg-[#2E7D5B]/15 px-2 -mx-1 rounded-md'
                        : 'decoration-transparent hover:text-[#1B3B2B] hover:decoration-[#2E7D5B]'
                    }`}
                    title="Arahkan kursor atau klik untuk menyorot Applied Field IoT Lab"
                  >
                    Sistem Lapangan.
                  </span>
                </motion.div>
              </div>
            </div>

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
              {/* Magnetic Button dengan Physics Spring Arrow */}
              <div
                onMouseEnter={() => setIsCtaHovered(true)}
                onMouseLeave={() => setIsCtaHovered(false)}
                className="inline-block shrink-0"
              >
                <MagneticButton
                  href="#tentang"
                  onClick={handleSmoothScroll}
                  strength={10}
                  className="group relative inline-flex items-center justify-center gap-3.5 px-6 py-4 rounded-2xl text-sm font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] shadow-[0_8px_25px_-5px_rgba(27,59,43,0.35)] hover:shadow-[0_14px_34px_-5px_rgba(46,125,91,0.45)] transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
                >
                  {/* Left Status Dot (Glows brighter on hover) */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] transition-all duration-300 group-hover:bg-[#74C69D] group-hover:shadow-[0_0_8px_#74C69D]" />

                  {/* Rolling Text Flip */}
                  <span className="relative inline-block h-[20px] overflow-hidden leading-[20px] font-sans font-semibold tracking-wide">
                    <span className="block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      Jelajahi Sayap Studio
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-[#74C69D]">
                      Jelajahi Sayap Studio
                    </span>
                  </span>

                  {/* Spring-based Inertia Diagonal Arrow (↘) */}
                  <motion.span
                    animate={{
                      x: isCtaHovered ? 4 : 0,
                      y: isCtaHovered ? 4 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                    className="inline-flex items-center"
                  >
                    <ArrowDownRight
                      className="w-4 h-4 text-[#74C69D]"
                      aria-hidden="true"
                    />
                  </motion.span>
                </MagneticButton>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A4D46] font-mono tabular-nums">
                <span className="px-2 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">01 · Web</span>
                <span className="px-2 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">02 · AI</span>
                <span className="px-2 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">03 · IoT</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: 3D Tilt Parallax & Camera Pan & Zoom Viewport */}
        <motion.div
          style={{
            scale: rightColScale,
            opacity: rightColOpacity,
            y: rightColY,
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-[#FAF9F6] perspective-[1000px]"
        >
          {/* 3D Tilt Container Wrapper */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="rounded-3xl border border-[#D8D6CE] bg-[#F4F3EF] shadow-[0_20px_50px_-20px_rgba(18,19,17,0.12)] overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_28px_65px_-15px_rgba(18,19,17,0.18)]"
          >
            {/* Viewport Top Header: Clean Monochromatic Editorial Bar */}
            <div className="px-5 py-3 border-b border-[#D8D6CE] bg-[#FAF9F6] flex items-center justify-between gap-4 text-xs font-mono select-none">
              <div className="flex items-center gap-2.5 text-[#121311]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B3B2B]" />
                <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-[#121311]">
                  RUMIVERSE // VIRTUAL STUDIO
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-[#4A4D46]">
                {/* Camera View Mode Toggle */}
                <button
                  type="button"
                  onClick={() => setIsZoomedIn((prev) => !prev)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[#D8D6CE] bg-[#F4F3EF] hover:bg-[#EAE8E1] text-[#121311] transition-all cursor-pointer text-[10px]"
                  title={isZoomedIn ? 'Zoom out ke tinjauan penuh' : 'Zoom in ke ruangan aktif'}
                >
                  {isZoomedIn ? (
                    <>
                      <Minimize2 className="w-3 h-3 text-[#2E7D5B]" />
                      <span>Fokus Ruangan</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3 h-3 text-[#6B6E66]" />
                      <span>Tinjau Penuh</span>
                    </>
                  )}
                </button>

                <span>FIG. 01</span>
                <span className="text-[#D8D6CE]">/</span>

                {/* Ambient Living Pulsing Status Indicator */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74C69D] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D5B]" />
                  </span>
                  <span className="font-semibold text-[#1B3B2B]">STATUS: OPERATIONAL</span>
                </div>
              </div>
            </div>

            {/* Uncropped 16:9 Architectural Stage with Camera Pan & Zoom */}
            <div className="relative w-full aspect-[16/9] bg-[#121311] overflow-hidden select-none">
              {/* Smooth Camera Pan & Zoom Motion Layer */}
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: currentCamera.scale,
                  transformOrigin: currentCamera.origin,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <EditorialImage
                  src={heroVirtualStudioImg}
                  alt="Panel visualisasi kantor virtual 3D RUMIVERSE Studio dengan divisi Web & Mobile Studio, Autonomous AI Foundry, dan Applied Field IoT Workshop"
                  className="w-full h-full object-contain pointer-events-none"
                  fallbackTitle="RUMIVERSE Studio Virtual Command Center"
                  fallbackSubtitle="Visualisasi pemantauan agen AI otonom dan ekosistem lab secara real-time."
                />

                {/* Ambient Living Micro-Motion 1: Server Rack LEDs in AI Foundry */}
                <div
                  className="absolute top-[48%] left-[91%] pointer-events-none flex flex-col gap-1 z-10"
                  aria-hidden="true"
                >
                  <span className="w-1 h-1 rounded-full bg-[#74C69D] animate-ping duration-1000 opacity-80" />
                  <span className="w-1 h-1 rounded-full bg-[#52B788] animate-pulse duration-700 opacity-90" />
                  <span className="w-1 h-1 rounded-full bg-[#40916C] animate-pulse duration-1200 opacity-75" />
                </div>

                {/* Ambient Living Micro-Motion 2: Monitor Glow in Web & Mobile */}
                <div
                  className="absolute top-[44%] left-[53%] w-10 h-7 rounded-full bg-[#74C69D]/20 blur-md pointer-events-none animate-pulse duration-3000"
                  aria-hidden="true"
                />

                {/* Ambient Living Micro-Motion 3: IoT Workshop Sensor Simulation Glow */}
                <div
                  className="absolute top-[72%] left-[86%] w-8 h-8 rounded-full bg-[#52B788]/20 blur-sm pointer-events-none animate-pulse duration-2500"
                  aria-hidden="true"
                />

                {/* Hotspot Room Pins with 3D Parallax translateZ Layer */}
                {HERO_TELEMETRY_NODES.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  const openLeft = node.align === 'left';
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => selectNode(node.id)}
                      onMouseEnter={() => selectNode(node.id)}
                      style={{
                        top: `${node.topPercent}%`,
                        left: `${node.leftPercent}%`,
                        transform: 'translateZ(26px)',
                      }}
                      aria-label={`Pilih ${node.label}`}
                      aria-pressed={isSelected}
                      className={`group absolute -translate-y-1/2 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F3EF] transition-all duration-300 ${
                        openLeft ? '-translate-x-[calc(100%-8px)]' : '-translate-x-2'
                      } ${isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-105'}`}
                    >
                      <span
                        className={`flex items-center gap-2 ${
                          openLeft ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <span
                          className={`relative flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                            isSelected
                              ? 'border-[#74C69D] bg-[#1B3B2B] shadow-[0_0_14px_rgba(116,198,157,0.7)]'
                              : 'border-[#F4F3EF]/80 bg-[#121311]/80 hover:bg-[#1B3B2B] hover:border-[#74C69D]'
                          }`}
                        >
                          {/* Pulsing Sonar Ring for Active Room Pin */}
                          {isSelected && (
                            <span className="absolute -inset-2.5 rounded-full border-2 border-[#74C69D] animate-ping opacity-60 pointer-events-none" />
                          )}

                          <span
                            className={`w-2 h-2 rounded-full transition-colors ${
                              isSelected ? 'bg-[#74C69D]' : 'bg-[#F4F3EF]'
                            }`}
                          />
                        </span>

                        <span
                          className={`hidden md:inline-flex px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase border transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#121311] text-[#74C69D] border-[#74C69D] shadow-md font-semibold'
                              : 'bg-[#121311]/85 text-[#D8D6CE] border-[#D8D6CE]/30 opacity-75 group-hover:opacity-100'
                          }`}
                        >
                          {node.shortLabel}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </motion.div>
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

              {/* Sliding Pill Indicator on "Fokus Divisi" (Physics Spring Shared Element) */}
              <div className="mt-5 pt-4 border-t border-[#D8D6CE]/80 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-[#6B6E66] mr-1 hidden sm:inline">
                  Fokus Divisi:
                </span>
                <div className="inline-flex flex-wrap p-1 rounded-full bg-[#EAE8E1]/80 border border-[#D8D6CE] gap-1">
                  {HERO_TELEMETRY_NODES.map((node) => {
                    const isActive = node.id === activeNode.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => selectNode(node.id)}
                        aria-pressed={isActive}
                        className="relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer select-none"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeHeroWingPill"
                            className="absolute inset-0 rounded-full bg-[#1B3B2B] shadow-sm"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span
                          className={`relative z-10 transition-colors duration-200 ${
                            isActive
                              ? 'text-[#F4F3EF] font-semibold'
                              : 'text-[#4A4D46] hover:text-[#121311]'
                          }`}
                        >
                          {node.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
