import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import { Pillar1JournalModal } from './Pillar1JournalModal';
import { Pillar2JournalModal } from './Pillar2JournalModal';
import { Pillar3JournalModal } from './Pillar3JournalModal';
import type { ConsultationFormValues } from '../utils/ecosystemData';

const SOFTWARE_IMAGE_SRC = '/src/assets/images/pillar_software_hardware_1794974579995.jpg';
const AI_IMAGE_SRC = '/src/assets/images/pilar-2-ai-workforce/cover.webp';
const IOT_IMAGE_SRC = '/src/assets/images/pilar-3-cyber-physical/cover.jpg';

export interface PillarData {
  id: 'web-mobile' | 'ai-workforce' | 'cyber-physical';
  index: string;
  tag: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  deliverables: string[];
  techStack: { category: string; items: string[] }[];
  useCases: { title: string; desc: string }[];
  consultationFocus: ConsultationFormValues['focus'];
}

export const PILLARS_LIST: PillarData[] = [
  {
    id: 'web-mobile',
    index: '01',
    tag: 'Web & Mobile Platforms',
    title: 'Aplikasi Web & Mobile Kustom',
    subtitle: 'Pengembangan sistem digital sesuai kebutuhan spesifik bisnis',
    imageSrc: SOFTWARE_IMAGE_SRC,
    imageAlt: 'Ruang kerja monitor pemrograman dan perancangan antarmuka aplikasi',
    summary:
      'Pembuatan website dan aplikasi sesuai kebutuhan—mulai dari company profile, web portofolio, toko online, hingga dasbor operasional dan aplikasi mobile yang cepat serta mudah dikelola.',
    deliverables: [
      'Aplikasi Web Responsif (Desktop & Mobile)',
      'Portal Manajemen & Dasbor Operasional',
      'Arsitektur REST API & WebSocket Real-Time',
      'Database Relasional & Autentikasi Pengguna',
    ],
    techStack: [
      { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'] },
      { category: 'Backend & Data', items: ['Node.js', 'Express', 'PostgreSQL / Supabase'] },
      { category: 'Arsitektur', items: ['RESTful API', 'Modular Components', 'Role-Based Access'] },
    ],
    useCases: [
      {
        title: 'Portal Operasional Internal',
        desc: 'Menggantikan pencatatan spreadsheet yang tercecer dengan sistem satu pintu yang rapi dan aman.',
      },
      {
        title: 'Dasbor Analitik & Monitoring',
        desc: 'Menampilkan metrik bisnis, log aktivitas, dan laporan otomatis yang mudah dipahami pemilik usaha.',
      },
    ],
    consultationFocus: 'software-ai',
  },
  {
    id: 'ai-workforce',
    index: '02',
    tag: 'Autonomous AI Workforce',
    title: 'Agen AI Otonom & Otomasi Kerja',
    subtitle: 'Asisten digital cerdas yang mengeksekusi tugas rutin 24/7',
    imageSrc: AI_IMAGE_SRC,
    imageAlt: 'Visualisasi orkestrasi agen AI di ruang Autonomous AI Foundry',
    summary:
      'Sistem agen AI mandiri untuk tugas rutin 24/7: ekstraksi dokumen dan OCR, deteksi anomali data operasional, hingga pengiriman ringkasan eksekutif ke WhatsApp dan email tanpa jeda.',
    deliverables: [
      'Orkestrasi Multi-Agent Swarm (Riset & Sintesis)',
      'Pipeline Pemrosesan Dokumen & Ekstraksi Data',
      'Integrasi Model LLM (Gemini, Claude, DeepSeek)',
      'Notifikasi Otomatis & Trigger Laporan Terjadwal',
    ],
    techStack: [
      { category: 'AI Orchestration', items: ['Python', 'Multi-Agent Workflows', 'Prompt Pipelines'] },
      { category: 'Model Integrasi', items: ['Gemini 2.5 / Flash', 'Claude 3.7', 'Local LLM / DeepSeek'] },
      { category: 'Automasi', items: ['Background Workers', 'Event Triggers', 'Webhooks'] },
    ],
    useCases: [
      {
        title: 'Asisten Audit Data Harian',
        desc: 'AI secara otomatis memeriksa data operasional yang masuk dan menandai jika ada kejanggalan.',
      },
      {
        title: 'Otomasi Pelaporan Eksekutif',
        desc: 'Mengubah ribuan baris data mentah menjadi ringkasan poin keputusan dalam hitungan detik.',
      },
    ],
    consultationFocus: 'software-ai',
  },
  {
    id: 'cyber-physical',
    index: '03',
    tag: 'Cyber-Physical Systems (CPS)',
    title: 'Instrumen IoT & Sistem Lapangan',
    subtitle: 'Menghubungkan kode perangkat lunak ke perangkat fisik dan sensor',
    imageSrc: IOT_IMAGE_SRC,
    imageAlt: 'Prototipe instalasi kandang modular terintegrasi kolam ikan dan rak hidroponik',
    summary:
      'Integrasi kode langsung ke instrumen lapangan: pemantauan sensor mikroklimat (amonia, suhu, kelembaban) dan kendali katup pompa otomatis yang diuji langsung di Living Lab Lumajang.',
    deliverables: [
      'Panel Sensor Mikroklimat (Suhu, Udara & Air)',
      'Otomasi Aktuator Pompa & Katup (Closed-Loop)',
      'Pengiriman Data Telemetri Real-Time ke Cloud',
      'Pengujian Prototipe Fisik di Living Lab Lumajang',
    ],
    techStack: [
      { category: 'Perangkat Keras', items: ['ESP32 Microcontroller', 'RS-485 Modbus', 'Relay Actuator'] },
      { category: 'Protokol & Cloud', items: ['MQTT Protocol', 'HTTP Telemetry', 'Time-Series Logging'] },
      { category: 'Fasilitas Uji', items: ['Living Lab Lumajang', 'Instalasi Akuaponik Modular', 'IP65 Enclosure'] },
    ],
    useCases: [
      {
        title: 'Pemantauan Kandang Otomatis',
        desc: 'Sensor membaca suhu dan kadar amonia, memicu kipas sirkulasi otomatis jika ambang batas terlampaui.',
      },
      {
        title: 'Sirkulasi Air & Nutrisi Akuaponik',
        desc: 'Pengaturan siklus pompa air antara kolam ikan dan tanaman pakan secara mandiri tanpa lupa.',
      },
    ],
    consultationFocus: 'precision-iot',
  },
];

interface PillarsSectionProps {
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

export function PillarsSection({ onOpenConsultation }: PillarsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedPillarId, setSelectedPillarId] = useState<PillarData['id'] | null>(null);
  const [pilar1JournalOpen, setPilar1JournalOpen] = useState(false);
  const [pilar2JournalOpen, setPilar2JournalOpen] = useState(false);
  const [pilar3JournalOpen, setPilar3JournalOpen] = useState(false);

  // Responsive check for desktop pinned scroll choreography
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Listen to URL hash so direct links like #jurnal-pilar-01 open the modal automatically
  useEffect(() => {
    const handleCheckHash = () => {
      const hash = window.location.hash;
      if (hash === '#jurnal-pilar-01') {
        setPilar1JournalOpen(true);
      } else if (hash === '#jurnal-pilar-02') {
        setPilar2JournalOpen(true);
      } else if (hash === '#jurnal-pilar-03') {
        setPilar3JournalOpen(true);
      }
    };

    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);
    return () => window.removeEventListener('hashchange', handleCheckHash);
  }, []);

  // Pinned scroll-driven choreography using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Single Kinetic Title: Starts big in upper-center, glides smoothly to top-left header
  // ONLY ONE headline element in the entire section - ZERO duplicate or ghost text!
  const titleX = useTransform(scrollYProgress, [0, 0.26], ['14vw', '0vw']);
  const titleY = useTransform(scrollYProgress, [0, 0.26], ['15vh', '0vh']);
  const titleScale = useTransform(scrollYProgress, [0, 0.26], [1.32, 1.0]);

  // Eyebrow badge and right subtitle paragraph fade in as the single title docks on the left
  const headerExtrasOpacity = useTransform(scrollYProgress, [0.12, 0.26], [0, 1]);
  const headerExtrasY = useTransform(scrollYProgress, [0.12, 0.26], [12, 0]);

  // 2. Sequential Entrance of Full Tall Cards (Sunny Bonnell Style)
  // Each card arrives one by one directly into its column (Left -> Center -> Right)
  // Card 1 enters into Column 1
  const card1Y = useTransform(scrollYProgress, [0.14, 0.35], ['100vh', '0vh']);
  const card1Opacity = useTransform(scrollYProgress, [0.14, 0.24], [0, 1]);

  // Card 2 enters into Column 2
  const card2Y = useTransform(scrollYProgress, [0.28, 0.49], ['100vh', '0vh']);
  const card2Opacity = useTransform(scrollYProgress, [0.28, 0.38], [0, 1]);

  // Card 3 enters into Column 3
  const card3Y = useTransform(scrollYProgress, [0.42, 0.63], ['100vh', '0vh']);
  const card3Opacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);

  // Long, stable runway: From 0.63 all the way to 1.00 (37% of scroll distance),
  // all cards remain 100% stationary, razor-sharp, crystal-clear, and interactive!

  // Architectural progress bar at the top edge of the sticky viewport
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handlePillarClick = (pillarId: PillarData['id']) => {
    if (pillarId === 'web-mobile') {
      setPilar1JournalOpen(true);
    } else if (pillarId === 'ai-workforce') {
      setPilar2JournalOpen(true);
    } else if (pillarId === 'cyber-physical') {
      setPilar3JournalOpen(true);
    } else {
      setSelectedPillarId(pillarId);
    }
  };

  const handleOpenConsult = (focus: ConsultationFormValues['focus']) => {
    setSelectedPillarId(null);
    if (onOpenConsultation) {
      onOpenConsultation(focus);
    }
  };

  const selectedPillar = PILLARS_LIST.find((p) => p.id === selectedPillarId) ?? null;

  return (
    <section
      id="pilar"
      ref={containerRef}
      className={`border-b border-[#D8D6CE] bg-[#F4F3EF] relative ${
        isDesktop ? 'h-[380vh]' : 'h-auto'
      }`}
    >
      {/* Pinned Sticky Stage (Desktop) / Normal Section (Mobile) */}
      <div
        className={`${
          isDesktop
            ? 'sticky top-0 h-screen max-h-screen overflow-hidden flex flex-col justify-between'
            : 'relative'
        }`}
      >
        {/* Subtle Architectural Scroll Progress Line */}
        {isDesktop && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D8D6CE] z-40">
            <motion.div
              style={{ width: progressBarWidth }}
              className="h-full bg-[#1B3B2B]"
            />
          </div>
        )}

        <div className="max-w-[1440px] w-full mx-auto flex flex-col justify-between h-full relative z-10">
          {/* Section Header: Holds the SINGLE kinetic title that starts big and glides to the left */}
          <div className="px-6 py-5 sm:px-10 lg:px-12 lg:py-6 border-b border-[#D8D6CE] flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
            <div className="max-w-2xl relative">
              {/* Eyebrow badge (fades in as title arrives) */}
              <motion.div
                style={isDesktop ? { opacity: headerExtrasOpacity, y: headerExtrasY } : {}}
                className="flex items-center gap-2 text-xs font-mono text-[#2E7D5B] tracking-wider uppercase mb-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
                <span>02. Spesifikasi Divisi // Tiga Pilar Rekayasa</span>
              </motion.div>

              {/* THE ONLY TITLE: Starts big, glides smoothly to left header position */}
              <motion.h2
                style={
                  isDesktop
                    ? {
                        x: titleX,
                        y: titleY,
                        scale: titleScale,
                        transformOrigin: 'top left',
                      }
                    : {}
                }
                className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-black text-[#121311] tracking-tight leading-[1.1] whitespace-normal"
              >
                Tiga Sayap Rekayasa <span className="text-[#1B3B2B]">RUMIVERSE</span>
              </motion.h2>
            </div>

            {/* Subtitle Paragraph (fades in as title docks on the left) */}
            <motion.p
              style={isDesktop ? { opacity: headerExtrasOpacity, y: headerExtrasY } : {}}
              className="text-xs sm:text-sm text-[#4A4D46] max-w-md leading-relaxed"
            >
              Mulai dari antarmuka perangkat lunak, otomatisasi agen AI mandiri, hingga implementasi
              instrumen sensor fisik yang teruji di Lumajang.
            </motion.p>
          </div>

          {/* 3 Pillars Grid: Tall, commanding cards entering sequentially into their columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 sm:p-6 lg:px-12 gap-5 lg:gap-6 items-stretch pb-6 relative z-10 border-b border-[#D8D6CE]">
            {PILLARS_LIST.map((pillar, idx) => {
              // Connect animations based on column index
              const cardY = isDesktop ? (idx === 0 ? card1Y : idx === 1 ? card2Y : card3Y) : 0;
              const cardOpacity = isDesktop ? (idx === 0 ? card1Opacity : idx === 1 ? card2Opacity : card3Opacity) : 1;

              return (
                <div key={pillar.id} className="h-full flex items-stretch relative">
                  <motion.article
                    style={
                      isDesktop
                        ? {
                            y: cardY,
                            opacity: cardOpacity,
                          }
                        : {}
                    }
                    className="w-full h-full max-h-[70vh] rounded-2xl border border-[#D8D6CE] hover:border-[#1B3B2B] bg-[#FAF9F6] hover:bg-[#FFFFFF] shadow-sm hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between relative group cursor-pointer"
                    onClick={() => handlePillarClick(pillar.id)}
                  >
                    <div className="flex flex-col h-full justify-between">
                      {/* Top Bar: Index & Tag */}
                      <div className="flex items-center justify-between gap-4 pb-2.5 border-b border-[#D8D6CE] font-mono text-xs">
                        <span className="text-[#121311] font-bold text-sm tracking-wider">{pillar.index}</span>
                        <span className="text-[#6B6E66] uppercase text-[10px] sm:text-[11px] tracking-wide font-medium">
                          {pillar.tag}
                        </span>
                      </div>

                      {/* 16:9 Editorial Image (Always razor sharp and crystal clear) */}
                      <div className="mt-3 relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#D8D6CE] group-hover:border-[#1B3B2B] bg-[#E2E0D8] shadow-2xs transition-all duration-300 shrink-0">
                        <EditorialImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          fallbackTitle={pillar.title}
                          fallbackSubtitle={pillar.tag}
                        />

                        {/* Vignette on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />

                        {/* Interactive Pill */}
                        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none flex items-center h-7 px-2.5 rounded-full bg-[#121311]/75 backdrop-blur-md border border-white/20 text-[#F4F3EF] shadow-md transition-all duration-300 group-hover:bg-[#1B3B2B] group-hover:border-[#74C69D]/60 group-hover:text-[#74C69D]">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#F4F3EF] group-hover:text-[#74C69D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                          <span className="font-mono text-[10px] font-semibold tracking-wider ml-1">
                            Spesifikasi
                          </span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mt-3.5">
                        <h3 className="font-display text-base sm:text-lg lg:text-xl xl:text-[22px] font-bold text-[#121311] tracking-tight group-hover:text-[#1B3B2B] transition-colors leading-[1.2]">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#6B6E66] font-mono leading-relaxed">
                          {pillar.subtitle}
                        </p>
                      </div>

                      {/* Summary & Deliverables */}
                      <div className="mt-3 space-y-2.5 pt-2.5 border-t border-[#D8D6CE]/80">
                        <p className="text-xs sm:text-[13px] text-[#353732] leading-relaxed line-clamp-2">
                          {pillar.summary}
                        </p>

                        <ul className="space-y-1.5 text-xs text-[#242622]">
                          {pillar.deliverables.slice(0, 3).map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 font-medium leading-tight">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Mobile Quick Action Pill */}
                    <div className="mt-4 pt-3 border-t border-[#D8D6CE] block lg:hidden">
                      <div className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#C8C6BC] bg-[#F4F3EF] active:bg-[#1B3B2B] active:text-[#FFFFFF] text-[#121311] text-xs font-mono font-semibold transition-all duration-200 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
                          <span>[+ Bedah Spesifikasi]</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#4A4D46]" />
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Architectural Detail Sheet (Slide-in Drawer Modal) */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#121311]/50 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillarId(null)}
              className="absolute inset-0"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pillar-sheet-title"
              className="relative z-10 w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[92vh] bg-[#F4F3EF] border border-[#D8D6CE] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[#D8D6CE] bg-[#FAF9F6] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#1B3B2B] text-[#74C69D] font-mono text-xs font-bold">
                    PILAR {selectedPillar.index}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] text-[#6B6E66] uppercase block">
                      {selectedPillar.tag}
                    </span>
                    <h3 id="pillar-sheet-title" className="font-display text-lg font-bold text-[#121311]">
                      {selectedPillar.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPillarId(null)}
                  aria-label="Tutup lembar spesifikasi"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#D8D6CE] hover:bg-[#EAE8E1] text-[#121311] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#E2E0D8]">
                  <EditorialImage
                    src={selectedPillar.imageSrc}
                    alt={selectedPillar.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={selectedPillar.title}
                    fallbackSubtitle={selectedPillar.subtitle}
                  />
                </div>

                <div>
                  <h4 className="font-mono text-xs text-[#2E7D5B] uppercase tracking-wider mb-2">
                    Prinsip &amp; Cakupan Kerja
                  </h4>
                  <p className="text-base text-[#2D2F2A] leading-relaxed">
                    {selectedPillar.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#D8D6CE]">
                  <h4 className="font-mono text-xs text-[#2E7D5B] uppercase tracking-wider mb-4">
                    Hasil Implementasi Nyata (Deliverables)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {selectedPillar.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE]/70">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span className="text-[#353732] font-medium text-xs leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#D8D6CE]">
                  <h4 className="font-mono text-xs text-[#2E7D5B] uppercase tracking-wider mb-4">
                    Standar Teknologi yang Digunakan
                  </h4>
                  <div className="space-y-3">
                    {selectedPillar.techStack.map((group, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE]/70">
                        <span className="font-mono text-[11px] font-semibold text-[#1B3B2B] uppercase block mb-1.5">
                          {group.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className="px-2.5 py-0.5 rounded-md bg-[#F4F3EF] border border-[#D8D6CE] text-xs font-mono text-[#353732]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#D8D6CE]">
                  <h4 className="font-mono text-xs text-[#2E7D5B] uppercase tracking-wider mb-4">
                    Contoh Penerapan Lapangan
                  </h4>
                  <div className="space-y-3">
                    {selectedPillar.useCases.map((uc, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE]/70">
                        <p className="font-display text-sm font-bold text-[#121311] mb-1">{uc.title}</p>
                        <p className="text-xs text-[#4A4D46] leading-relaxed">{uc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#D8D6CE] bg-[#FAF9F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#6B6E66]">
                  Siap mendiskusikan kebutuhan sistem Anda?
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenConsult(selectedPillar.consultationFocus)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] text-xs font-semibold tracking-tight transition-colors cursor-pointer"
                >
                  <span>Mulai Diskusi untuk Sayap Ini</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#74C69D]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pilar 01 Interactive Editorial Journal Modal (Kinfolk / Stripe Press Style) */}
      <Pillar1JournalModal
        open={pilar1JournalOpen}
        onClose={() => setPilar1JournalOpen(false)}
        onOpenConsultation={onOpenConsultation}
      />

      {/* Pilar 02 Interactive Editorial Journal Modal (Autonomous AI Workforce) */}
      <Pillar2JournalModal
        open={pilar2JournalOpen}
        onClose={() => setPilar2JournalOpen(false)}
        onOpenConsultation={onOpenConsultation}
      />

      {/* Pilar 03 Interactive Editorial Journal Modal (Cyber-Physical Systems) */}
      <Pillar3JournalModal
        open={pilar3JournalOpen}
        onClose={() => setPilar3JournalOpen(false)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
}
