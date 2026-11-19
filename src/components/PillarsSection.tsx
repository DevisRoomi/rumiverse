import { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Cpu, Radio, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import { MaskedHeading } from './MaskedHeading';
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
  const [selectedPillarId, setSelectedPillarId] = useState<PillarData['id'] | null>(null);
  const [pilar1JournalOpen, setPilar1JournalOpen] = useState(false);
  const [pilar2JournalOpen, setPilar2JournalOpen] = useState(false);
  const [pilar3JournalOpen, setPilar3JournalOpen] = useState(false);

  const selectedPillar = PILLARS_LIST.find((p) => p.id === selectedPillarId) ?? null;

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

  return (
    <section id="pilar" className="border-b border-[#D8D6CE] bg-[#F4F3EF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="px-6 py-8 sm:px-10 lg:px-12 lg:py-10 border-b border-[#D8D6CE] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#2E7D5B] tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
              <span>02. Spesifikasi Divisi // Tiga Pilar Rekayasa</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121311] tracking-tight"
            >
              Tiga Sayap Rekayasa RUMIVERSE
            </MaskedHeading>
          </div>
          <p className="text-sm text-[#4A4D46] max-w-md leading-relaxed">
            Mulai dari antarmuka perangkat lunak, otomatisasi agen AI mandiri, hingga implementasi
            instrumen sensor fisik yang teruji di Lumajang.
          </p>
        </div>

        {/* 3-Column Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-[#D8D6CE]">
          {PILLARS_LIST.map((pillar, idx) => {
            const isLast = idx === PILLARS_LIST.length - 1;
            return (
              <article
                key={pillar.id}
                className={`group flex flex-col justify-between p-5 sm:p-6 lg:p-7 border-b lg:border-b-0 ${
                  !isLast ? 'lg:border-r border-[#D8D6CE]' : ''
                } bg-[#FAF9F6] hover:bg-[#F4F3EF] transition-colors duration-300`}
              >
                <div>
                  {/* Card Index & Tag */}
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#D8D6CE] font-mono text-xs">
                    <span className="text-[#121311] font-bold tracking-wider">{pillar.index}</span>
                    <span className="text-[#6B6E66] uppercase text-[11px] tracking-wide">{pillar.tag}</span>
                  </div>

                  {/* Title & Subtitle Container with min-height for uniform horizontal image alignment */}
                  <div className="mt-4 min-h-[68px] sm:min-h-[76px] lg:min-h-[82px] flex flex-col justify-start">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#121311] tracking-tight group-hover:text-[#1B3B2B] transition-colors leading-[1.25]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#6B6E66] font-mono leading-relaxed">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Interactive Clickable Image Frame with Whole-Card Hover Affordance */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handlePillarClick(pillar.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePillarClick(pillar.id);
                      }
                    }}
                    aria-label={`Buka Bedah Spesifikasi untuk ${pillar.title}`}
                    className="mt-4 relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#D8D6CE] hover:border-[#1B3B2B] bg-[#E2E0D8] group/img cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B] shadow-2xs transition-all duration-300"
                  >
                    <EditorialImage
                      src={pillar.imageSrc}
                      alt={pillar.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.04]"
                      fallbackTitle={pillar.title}
                      fallbackSubtitle={pillar.tag}
                    />

                    {/* Subtle darkening vignette on container hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors duration-300 pointer-events-none" />

                    {/* Minimalist Frosted Glass Circle (Expands smoothly into Pill on Image Hover) */}
                    <div className="absolute top-3 right-3 z-10 pointer-events-none flex items-center h-8 px-2 rounded-full bg-[#121311]/70 backdrop-blur-md border border-white/20 text-[#F4F3EF] shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:bg-[#1B3B2B] group-hover/img:border-[#74C69D]/60 group-hover/img:text-[#74C69D] group-hover/img:shadow-lg group-hover/img:px-3">
                      <ArrowUpRight className="w-4 h-4 text-[#F4F3EF] group-hover/img:text-[#74C69D] transition-transform duration-300 group-hover/img:translate-x-0.5 group-hover/img:-translate-y-0.5 shrink-0" />
                      <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap font-mono text-[11px] font-semibold tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:max-w-[100px] group-hover/img:opacity-100 group-hover/img:ml-1.5">
                        Spesifikasi
                      </span>
                    </div>
                  </div>

                  {/* Honest Summary */}
                  <p className="mt-3.5 text-[13px] sm:text-sm text-[#353732] leading-[1.6]">
                    {pillar.summary}
                  </p>

                  {/* Deliverable Highlights (Enhanced contrast, line-height, and vertical gap) */}
                  <ul className="mt-4 pt-3.5 border-t border-[#D8D6CE]/80 space-y-2.5 text-xs text-[#242622]">
                    {pillar.deliverables.slice(0, 3).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 font-medium leading-[1.5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action: Visible on mobile/touch screens, hidden on desktop to keep cards clean and above the fold */}
                <div className="mt-5 pt-3.5 border-t border-[#D8D6CE] block md:hidden">
                  <button
                    type="button"
                    onClick={() => handlePillarClick(pillar.id)}
                    className="w-full inline-flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-xl border border-[#C8C6BC] bg-[#F4F3EF] active:bg-[#1B3B2B] active:text-[#FFFFFF] text-[#121311] text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
                      <span>[+ Bedah Spesifikasi]</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#4A4D46]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Architectural Detail Sheet (Slide-in Drawer Modal) */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#121311]/50 backdrop-blur-xs p-0 sm:p-4">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillarId(null)}
              className="absolute inset-0"
              aria-hidden="true"
            />

            {/* Slide-in Sheet */}
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
              {/* Sheet Header */}
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

              {/* Sheet Body (Scrollable) */}
              <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
                {/* Large Visual */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#E2E0D8]">
                  <EditorialImage
                    src={selectedPillar.imageSrc}
                    alt={selectedPillar.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={selectedPillar.title}
                    fallbackSubtitle={selectedPillar.subtitle}
                  />
                </div>

                {/* Narrative Summary */}
                <div>
                  <h4 className="font-mono text-xs text-[#2E7D5B] uppercase tracking-wider mb-2">
                    Prinsip &amp; Cakupan Kerja
                  </h4>
                  <p className="text-base text-[#2D2F2A] leading-relaxed">
                    {selectedPillar.summary}
                  </p>
                </div>

                {/* Deliverables List */}
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

                {/* Realistic Tech Stack */}
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

                {/* Use Cases */}
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

              {/* Sheet Bottom Footer CTA */}
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
