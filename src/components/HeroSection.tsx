import { useRef, useState } from 'react';
import { ArrowDownRight, Crosshair, Maximize2, Minimize2 } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'motion/react';
import { HERO_TELEMETRY_NODES } from '../utils/ecosystemData';
import { EditorialImage } from './EditorialImage';
import { MagneticButton } from './MagneticButton';
import heroVirtualStudioImg from '../assets/images/rumiverse_virtual_studio_hero.webp';

const ROOM_CAMERA_FOCUS: Record<string, { origin: string; scale: number }> = {
  'node-ai-foundry': { origin: '78% 32%', scale: 1.25 },
  'node-web-studio': { origin: '58% 28%', scale: 1.25 },
  'node-field-iot': { origin: '83% 76%', scale: 1.25 },
  'node-command-ops': { origin: '38% 64%', scale: 1.25 },
};

// Optimized coordinates positioned directly on respective room workstations with generous breathing room
const PIN_COORDINATES: Record<string, { top: number; left: number }> = {
  'node-ai-foundry': { top: 32, left: 78 },
  'node-web-studio': { top: 28, left: 58 },
  'node-field-iot': { top: 76, left: 83 },
  'node-command-ops': { top: 64, left: 38 },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeNodeId, setActiveNodeId] = useState<string>(HERO_TELEMETRY_NODES[0].id);
  // Default to Full Overview (Scale 1.0) so entire 4-room layout is visible initially
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // 1. Scrubbed Scroll Parallax (Transitioning out of Hero - subtle & calm)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const leftColY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rightColScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const rightColOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.98, 0.92]);
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, 16]);

  const handleSmoothScroll = () => {
    const target = document.querySelector('#tentang') || document.querySelector('#pilar');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeNode =
    HERO_TELEMETRY_NODES.find((n) => n.id === activeNodeId) ?? HERO_TELEMETRY_NODES[0];

  // Camera settings: Initial scale 1.0 (Full Overview). Zoom in only when a room is active/selected.
  const currentCamera = isZoomedIn
    ? (ROOM_CAMERA_FOCUS[activeNode.id] ?? { origin: '50% 50%', scale: 1.25 })
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
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center lg:min-h-[calc(100vh-4.25rem)]">
        {/* Left column: Compact Editorial Typography with 3-Line Masked Reveal & Interactive Keywords */}
        <motion.div
          style={{ y: leftColY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-7 flex flex-col justify-center space-y-5 sm:space-y-6 lg:border-r border-b lg:border-b-0 border-[#D8D6CE] z-10"
        >
          {/* Eyebrow badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE8E1] border border-[#D8D6CE] text-[11px] font-mono text-[#353732] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] animate-pulse" />
              <span>Lumajang, Jawa Timur</span>
              <span aria-hidden="true" className="text-[#A1A39B]">/</span>
              <span className="text-[#2E7D5B] font-semibold">Boutique Systems Studio</span>
            </div>
          </div>

          {/* Masked Line Reveal Headline (3 Baris Bersih: Koma Nempel Rapi di Akhir Baris 2) */}
          <div className="font-display font-bold text-[#121311] tracking-tight leading-[1.14] text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.2rem] xl:text-[2.65rem]">
            {/* Baris 1: Membangun [Software] Presisi, */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 sm:whitespace-nowrap"
              >
                <span>Membangun</span>
                <button
                  type="button"
                  onClick={() => selectNode('node-web-studio')}
                  onMouseEnter={() => selectNode('node-web-studio')}
                  className="inline-flex items-center p-[2px] rounded-lg bg-[#E2E0D8] border border-[#C8C5BA] shadow-2xs hover:border-[#1B3B2B] transition-all cursor-pointer group/kw align-baseline"
                  aria-label="Sorot divisi Web & Mobile Studio"
                >
                  <span
                    className={`px-2.5 py-0.5 rounded-md font-black tracking-tight leading-none transition-all duration-300 text-[0.88em] ${
                      activeNodeId === 'node-web-studio' && isZoomedIn
                        ? 'bg-[#1B3B2B] text-[#74C69D] shadow-[0_0_12px_rgba(46,125,91,0.4)]'
                        : 'bg-[#1B3B2B] text-[#FFFFFF] group-hover/kw:bg-[#121311]'
                    }`}
                  >
                    Software
                  </span>
                </button>
                <span>Presisi,</span>
              </motion.div>
            </div>

            {/* Baris 2: [Agen AI Otonom], (Tanda koma menempel langsung di akhir Otonom) */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="sm:whitespace-nowrap"
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
                    activeNodeId === 'node-ai-foundry' && isZoomedIn
                      ? 'text-[#1B3B2B] decoration-[#2E7D5B] bg-[#2E7D5B]/15 px-1.5 -mx-1 rounded'
                      : 'decoration-transparent hover:text-[#1B3B2B] hover:decoration-[#2E7D5B]'
                  }`}
                  title="Klik atau sorot untuk meninjau Autonomous AI Foundry"
                >
                  Agen AI Otonom,
                </span>
              </motion.div>
            </div>

            {/* Baris 3: dan [Sistem Lapangan.] */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-x-1.5 sm:gap-x-2 sm:whitespace-nowrap"
              >
                <span>dan</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => selectNode('node-field-iot')}
                  onMouseEnter={() => selectNode('node-field-iot')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') selectNode('node-field-iot');
                  }}
                  className={`cursor-pointer transition-all duration-300 underline decoration-2 rounded-sm ${
                    activeNodeId === 'node-field-iot' && isZoomedIn
                      ? 'text-[#1B3B2B] decoration-[#2E7D5B] bg-[#2E7D5B]/15 px-1.5 -mx-1 rounded'
                      : 'decoration-transparent hover:text-[#1B3B2B] hover:decoration-[#2E7D5B]'
                  }`}
                  title="Klik atau sorot untuk meninjau Applied Field IoT Lab"
                >
                  Sistem Lapangan.
                </span>
              </motion.div>
            </div>
          </div>

          <p className="text-sm sm:text-[15px] text-[#353732] leading-relaxed max-w-lg">
            RUMIVERSE adalah boutique technology studio independen. Kami memadukan antarmuka
            digital berstandar tinggi, orkestrasi agen AI otonom untuk otomatisasi kerja, dan
            instrumen IoT yang menghubungkan kode langsung ke dunia fisik.
          </p>

          {/* CTA & Synchronized Status Area */}
          <div className="pt-4 lg:pt-5 border-t border-[#D8D6CE] flex flex-col gap-4">
            {/* Indikator Status Divisi: 100% Tersinkronisasi dengan Kartu Kanan */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#4A4D46]">
              <span className="text-[11px] font-semibold text-[#1B3B2B] tracking-wider uppercase">
                {isZoomedIn ? '[DIVISI AKTIF]' : '[DIVISI STUDIO]'}
              </span>
              <span className="text-[#8A8D86]">→</span>
              <div className="h-5 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeNode.id + (isZoomedIn ? '-zoomed' : '-overview')}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="font-medium text-[#121311] inline-flex items-center gap-1.5 tracking-tight text-[11px] sm:text-xs"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isZoomedIn ? 'bg-[#2E7D5B] animate-pulse' : 'bg-[#1B3B2B]'
                      }`}
                    />
                    <span className="font-semibold text-[#1B3B2B]">{activeNode.code}</span>
                    <span className="text-[#A1A39B]">·</span>
                    <span>{activeNode.label}</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                  className="group relative inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] shadow-[0_6px_20px_-4px_rgba(27,59,43,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(46,125,91,0.45)] transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
                >
                  {/* Left Status Dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] transition-all duration-300 group-hover:bg-[#74C69D] group-hover:shadow-[0_0_8px_#74C69D]" />

                  {/* Rolling Text Flip */}
                  <span className="relative inline-block h-[18px] overflow-hidden leading-[18px] font-sans font-semibold tracking-wide">
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
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#4A4D46] font-mono tabular-nums">
                <span className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">01 · Web</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">02 · AI</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#D8D6CE]">03 · IoT</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Calm, Solid, Grounded Architectural Viewport (No Dizziness / No Tilting Platter) */}
        <motion.div
          style={{
            scale: rightColScale,
            opacity: rightColOpacity,
            y: rightColY,
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-3 sm:p-5 lg:p-6 flex flex-col justify-center bg-[#FAF9F6]"
        >
          {/* Stable Grounded Card Frame (Tenang & Santai, Tidak Goyang) */}
          <div className="rounded-3xl border border-[#D8D6CE] bg-[#F4F3EF] shadow-[0_16px_40px_-16px_rgba(18,19,17,0.1)] overflow-hidden flex flex-col transition-shadow duration-500 hover:shadow-[0_20px_48px_-14px_rgba(18,19,17,0.14)]">
            {/* Viewport Top Header */}
            <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 border-b border-[#D8D6CE] bg-[#FAF9F6] flex items-center justify-between gap-2 sm:gap-4 text-xs font-mono select-none">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#121311] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B3B2B]" />
                <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-[11px] text-[#121311]">
                  RUMIVERSE <span className="hidden sm:inline">// VIRTUAL STUDIO</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-mono text-[#4A4D46]">
                {/* Camera View Mode Toggle: Zoom In Room vs Full Overview */}
                <button
                  type="button"
                  onClick={() => setIsZoomedIn((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[#D8D6CE] bg-[#FAF9F6] hover:bg-[#EAE8E1] text-[#121311] transition-all cursor-pointer font-mono"
                  title={isZoomedIn ? 'Kembali ke tinjauan denah penuh' : 'Zoom in ke ruangan aktif'}
                >
                  {isZoomedIn ? (
                    <>
                      <Minimize2 className="w-3 h-3 text-[#2E7D5B]" />
                      <span>Tinjau Penuh</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3 h-3 text-[#2E7D5B]" />
                      <span>Fokus Ruangan</span>
                    </>
                  )}
                </button>

                <span>FIG. 01</span>
                <span className="text-[#D8D6CE]">/</span>

                {/* Ambient Living Pulsing Status Indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74C69D] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D5B]" />
                  </span>
                  <span className="font-semibold text-[#1B3B2B] hidden sm:inline">STATUS: OPERATIONAL</span>
                  <span className="font-semibold text-[#1B3B2B] sm:hidden">AKTIF</span>
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
                  alt="Panel visualisasi kantor virtual 3D RUMIVERSE Studio dengan denah arsitektural isometrik 4 divisi"
                  className="w-full h-full object-contain pointer-events-none"
                  fallbackTitle="RUMIVERSE Studio Virtual Command Center"
                  fallbackSubtitle="Visualisasi pemantauan agen AI otonom dan ekosistem lab secara real-time."
                  priority={typeof window !== 'undefined' ? window.innerWidth >= 1024 : false}
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

                {/* Center Architectural Scope Reticle (Compact & Well-Spaced in Center Hallway) */}
                <button
                  type="button"
                  onClick={() => setIsZoomedIn(false)}
                  onMouseEnter={() => setIsZoomedIn(false)}
                  style={{
                    top: '52%',
                    left: '49%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-label="Pusat pandang: Tinjau penuh seluruh studio"
                  className="group absolute z-25 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74C69D] transition-all duration-300 select-none"
                  title="Arahkan kursor atau klik untuk tinjau penuh seluruh studio"
                >
                  <span className="relative flex items-center justify-center">
                    {/* Discrete Scope Crosshair Badge (Ringkas & Proporsional 24px) */}
                    <span
                      className={`relative flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 shadow-sm ${
                        !isZoomedIn
                          ? 'border-[#74C69D] bg-[#1B3B2B]/95 text-[#74C69D] shadow-[0_0_10px_rgba(116,198,157,0.4)] ring-1.5 ring-[#74C69D]/40'
                          : 'border-white/50 bg-[#121311]/90 text-[#D8D6CE] hover:border-[#74C69D] hover:bg-[#1B3B2B] hover:text-[#74C69D]'
                      }`}
                    >
                      <Crosshair className="w-3.5 h-3.5 stroke-[1.8] transition-transform duration-300 group-hover:rotate-45" />
                    </span>

                    {/* Floating Reticle Tooltip */}
                    <span className="pointer-events-none absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#121311] text-[10px] font-mono text-[#74C69D] whitespace-nowrap border border-[#74C69D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-40">
                      Pusat Pandang · Tinjau Penuh
                    </span>
                  </span>
                </button>

                {/* Clean Tactile Room Pins (Well-Spaced on Room Desks - No Clutter) */}
                {HERO_TELEMETRY_NODES.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  const coords = PIN_COORDINATES[node.id] ?? {
                    top: node.topPercent,
                    left: node.leftPercent,
                  };
                  const wingNum = node.code.replace('WING-', '');

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => selectNode(node.id)}
                      onMouseEnter={() => selectNode(node.id)}
                      style={{
                        top: `${coords.top}%`,
                        left: `${coords.left}%`,
                      }}
                      aria-label={`Pilih ${node.label}`}
                      aria-pressed={isSelected}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F3EF] transition-all duration-300 ${
                        isSelected && isZoomedIn ? 'z-30 scale-110' : 'z-20 hover:scale-105'
                      }`}
                    >
                      <span className="relative flex items-center justify-center">
                        {/* Sonar Ping Ring on Active Room Pin */}
                        {isSelected && isZoomedIn && (
                          <span className="absolute -inset-2 rounded-full border-2 border-[#74C69D] animate-ping opacity-60 pointer-events-none" />
                        )}

                        {/* Minimalist Tactile Number Capsule */}
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full border text-[10px] font-mono font-bold transition-all duration-300 shadow-sm ${
                            isSelected && isZoomedIn
                              ? 'border-[#74C69D] bg-[#1B3B2B] text-[#74C69D] shadow-[0_0_12px_rgba(116,198,157,0.7)]'
                              : 'border-white/50 bg-[#121311]/85 text-[#F4F3EF] hover:bg-[#1B3B2B] hover:border-[#74C69D] hover:text-[#74C69D]'
                          }`}
                        >
                          {wingNum}
                        </span>

                        {/* Floating Tooltip Only Visible on Hover */}
                        <span className="pointer-events-none absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#121311]/95 text-[10px] font-mono text-[#F4F3EF] whitespace-nowrap border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                          {node.shortLabel}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Inspector Panel: Active Wing Detail */}
            <div className="p-3.5 sm:p-4 bg-[#FAF9F6] border-t border-[#D8D6CE] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D8D6CE]/80">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#1B3B2B] text-[#74C69D] font-mono text-[10px] font-bold tracking-wider">
                        {activeNode.code}
                      </span>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#121311]">
                        {activeNode.label}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#EAE8E1] text-[#2E7D5B] font-semibold">
                      {activeNode.reading}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#353732] leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {activeNode.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Sliding Pill Indicator on "Fokus Divisi" */}
              <div className="mt-3 pt-2.5 border-t border-[#D8D6CE]/80 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#6B6E66] mr-1 hidden sm:inline">
                  Fokus Divisi:
                </span>
                <div className="inline-flex flex-wrap p-0.5 rounded-full bg-[#EAE8E1]/80 border border-[#D8D6CE] gap-0.5 max-w-full overflow-x-auto">
                  {HERO_TELEMETRY_NODES.map((node) => {
                    const isActive = node.id === activeNode.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => selectNode(node.id)}
                        aria-pressed={isActive}
                        className="relative px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-colors cursor-pointer select-none"
                      >
                        {isActive && isZoomedIn && (
                          <motion.div
                            layoutId="activeHeroWingPill"
                            className="absolute inset-0 rounded-full bg-[#1B3B2B] shadow-xs"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span
                          className={`relative z-10 transition-colors duration-200 ${
                            isActive && isZoomedIn
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
