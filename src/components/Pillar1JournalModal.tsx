import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import type { ConsultationFormValues } from '../utils/ecosystemData';

const WORKSTATION_IMG = '/src/assets/images/pilar-1-web-mobile/web_office_workstation.webp';
const DESIGN_SYSTEM_IMG = '/src/assets/images/pilar-1-web-mobile/p1_design_system.webp';
const DASHBOARD_DARK_IMG = '/src/assets/images/pilar-1-web-mobile/p1_dashboard_dark.webp';
const DASHBOARD_LIGHT_IMG = '/src/assets/images/pilar-1-web-mobile/p1_dashboard_light.webp';
const MOBILE_DESK_IMG = '/src/assets/images/pilar-1-web-mobile/p1_mobile_desk.webp';

interface Pillar1JournalModalProps {
  open: boolean;
  onClose: () => void;
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

export function Pillar1JournalModal({
  open,
  onClose,
  onOpenConsultation,
}: Pillar1JournalModalProps) {
  const [activeDashboardMode, setActiveDashboardMode] = useState<'dark' | 'light'>('dark');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading scroll progress
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !open) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable > 0) {
        setReadingProgress(Math.min(100, (scrollTop / totalScrollable) * 100));
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pillar1-journal-reader"
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.99 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-[#FAF9F6] text-[#121311] overflow-hidden select-text shadow-2xl"
        >
          {/* Sticky Editorial Header */}
        <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#D8D6CE]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#1B3B2B] text-[#74C69D] font-mono text-[11px] font-bold tracking-wider uppercase">
                PILAR 01
              </span>
              <span className="font-mono text-xs text-[#4A4D46] hidden sm:inline">
                RUMIVERSE ENGINEERING JOURNAL // SPECIFICATION DEEP-DIVE
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-mono text-[11px] text-[#6B6E66] tabular-nums">
                {Math.round(readingProgress)}% DIBACA
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8D6CE] hover:border-[#121311] text-xs font-mono text-[#121311] hover:bg-[#EAE8E1] transition-all cursor-pointer"
              >
                <span>Tutup Jurnal</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reading Progress Line */}
          <div className="w-full h-0.5 bg-[#EAE8E1]">
            <div
              className="h-full bg-[#1B3B2B] transition-all duration-150 ease-out"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </header>

        {/* Scrollable Journal Article Body */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-12 sm:px-10 sm:py-16 lg:py-20"
        >
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto space-y-16"
          >
            {/* Article Header & Title */}
            <header className="space-y-6 pb-10 border-b border-[#D8D6CE]">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                <span>Dokumentasi Sistem</span>
                <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                <span>Lumajang Studio</span>
                <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                <span>4 Menit Baca</span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[54px] tracking-tight text-[#121311] leading-[1.12]">
                Membangun Antarmuka Presisi: Dari Sistem Desain Modular hingga Dasbor Waktu-Nyata
              </h1>

              <div className="flex items-center justify-between gap-4 pt-4 text-xs font-mono text-[#6B6E66]">
                <span>Penulis: Abu Devis J.R. — Systems Architect</span>
                <span>RUMIVERSE / PILAR 01</span>
              </div>
            </header>

            {/* Abstract Blockquote */}
            <blockquote className="p-6 sm:p-8 rounded-2xl bg-[#F4F3EF] border-l-4 border-[#1B3B2B] font-display text-lg sm:text-xl text-[#2D2F2A] leading-relaxed italic">
              &ldquo;Sebuah platform web bisnis tidak boleh rapuh saat data bertambah banyak.
              Di RUMIVERSE, kami tidak sekadar menata tampilan luar, melainkan merumuskan arsitektur
              komponen yang terukur—memastikan dasbor tetap cepat, nyaman dipakai, dan mudah dirawat
              dalam jangka panjang.&rdquo;
            </blockquote>

            {/* FIG 01: Workstation Photo */}
            <figure className="space-y-3">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#E2E0D8] shadow-sm">
                <EditorialImage
                  src={WORKSTATION_IMG}
                  alt="Meja kerja studio RUMIVERSE dengan monitor lengkung ultrawide dan monitor vertikal mobile wireframe"
                  className="w-full h-full object-cover"
                  fallbackTitle="Studio Workstation"
                  fallbackSubtitle="Lingkungan kerja perancangan sistem web dan mobile RUMIVERSE."
                />
              </div>
              <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                <strong className="text-[#121311]">FIG. 01</strong> — Lingkungan kerja studio RUMIVERSE: meja kayu alami dengan monitor lengkung ultrawide untuk pengembangan kode dan layar vertikal untuk pengujian prototipe antarmuka ponsel.
              </figcaption>
            </figure>

            {/* Bab I: Dari Kertas ke Kode */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                <span>Bagian 01</span>
                <span aria-hidden="true">/</span>
                <span>Metodologi Desain</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                I. Dari Kertas ke Kode: Sistem Desain Modular
              </h2>

              <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                Banyak platform digital menjadi lambat dan sulit diperbaiki karena tidak memiliki aturan komponen yang terpadu. Ketika tombol baru ditambahkan, gayanya berbeda dari halaman sebelumnya. Ketika data bertambah, susunan tata letak berantakan.
              </p>

              <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                Pendekatan kami selalu diawali dengan <strong>RUMIVERSE Design System</strong>: merumuskan kisi modular 8 piksel, aturan tipografi yang jelas (mulai dari judul Display hingga teks teknis Monospace), serta status interaksi tombol yang terdefinisi dengan tegas (default, hover, dan active).
              </p>

              {/* FIG 02: Design System Blueprint */}
              <figure className="pt-4 space-y-3">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#FAF9F6] shadow-sm">
                  <EditorialImage
                    src={DESIGN_SYSTEM_IMG}
                    alt="RUMIVERSE Design System v1.0 dengan spesifikasi grid, tipografi, wireframe ke high-fidelity, dan micro-interactions"
                    className="w-full h-full object-contain bg-[#FAF9F6]"
                    fallbackTitle="RUMIVERSE Design System v1.0"
                    fallbackSubtitle="Spesifikasi komponen dan arsitektur token desain."
                  />
                </div>
                <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                  <strong className="text-[#121311]">FIG. 02</strong> — Cetak biru RUMIVERSE Design System v1.0: transisi dari wireframe rangka ke komponen high-fidelity, token tipografi, serta aturan interaksi hover dan active.
                </figcaption>
              </figure>
            </section>

            {/* Bab II: Dasbor Operasional Waktu-Nyata */}
            <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                <span>Bagian 02</span>
                <span aria-hidden="true">/</span>
                <span>Data Waktu-Nyata</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                II. Mengelola Arus Data Tinggi: Dasbor Waktu-Nyata
              </h2>

              <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                Dasbor yang baik tidak sekadar menampilkan angka, melainkan menceritakan kondisi bisnis saat ini secara langsung. Kami mengintegrasikan <strong>WebSocket</strong> dan pipeline <strong>REST API</strong> yang efisien sehingga ribuan pembaruan data per detik dapat ditampilkan tanpa membuat browser melambat atau memicu kedipan layar (*flicker*).
              </p>

              {/* Interactive Dashboard Viewer (Dark Mode vs Light Mode Toggle) */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE]">
                  <span className="font-mono text-xs text-[#121311] font-semibold">
                    Eksplorasi Antarmuka Dasbor RUMIVERSE:
                  </span>
                  <div className="inline-flex rounded-lg border border-[#D8D6CE] bg-[#FAF9F6] p-1 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveDashboardMode('dark')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                        activeDashboardMode === 'dark'
                          ? 'bg-[#121311] text-[#F4F3EF] font-semibold shadow-xs'
                          : 'text-[#6B6E66] hover:text-[#121311]'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Mode Gelap (Operasional)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDashboardMode('light')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                        activeDashboardMode === 'light'
                          ? 'bg-[#1B3B2B] text-[#F4F3EF] font-semibold shadow-xs'
                          : 'text-[#6B6E66] hover:text-[#121311]'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Mode Terang (Eksekutif)</span>
                    </button>
                  </div>
                </div>

                <figure className="space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-md transition-all">
                    <EditorialImage
                      src={activeDashboardMode === 'dark' ? DASHBOARD_DARK_IMG : DASHBOARD_LIGHT_IMG}
                      alt={
                        activeDashboardMode === 'dark'
                          ? 'Dasbor Operasional Terpadu Mode Gelap dengan kurva real-time dan log WebSocket'
                          : 'Operations Hub Eksekutif Mode Terang dengan tren pendapatan dan analisis retensi kohort'
                      }
                      className="w-full h-full object-contain"
                      fallbackTitle={activeDashboardMode === 'dark' ? 'Dasbor Operasional' : 'Operations Hub'}
                      fallbackSubtitle="Tangkapan antarmuka platform web kustom RUMIVERSE."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 03</strong> — {activeDashboardMode === 'dark'
                      ? 'Dasbor Operasional Terpadu (Mode Gelap): Menampilkan kurva aktivitas jaringan real-time, status beban server, dan aliran log live WebSocket.'
                      : 'Operations Hub Eksekutif (Mode Terang): Dirancang untuk pengambil keputusan—menampilkan metrik pendapatan, efisiensi automasi, dan matriks retensi kohort.'}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Bab III: Ekosistem Ponsel */}
            <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                <span>Bagian 03</span>
                <span aria-hidden="true">/</span>
                <span>Integrasi Mobile</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                III. Ekosistem Ponsel: Kendali di Genggaman
              </h2>

              <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                Aplikasi bisnis modern tidak boleh terkurung di komputer kantor. Kami merancang antarmuka mobile yang beradaptasi secara alami—baik sebagai aplikasi web progresif (*PWA*) maupun aplikasi ponsel mandiri.
              </p>

              <figure className="pt-2 space-y-3">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#E2E0D8] shadow-sm">
                  <EditorialImage
                    src={MOBILE_DESK_IMG}
                    alt="Dua ponsel pintar di atas meja kayu menampilkan aplikasi mobile RUMIVERSE"
                    className="w-full h-full object-cover"
                    fallbackTitle="Aplikasi Mobile Companion"
                    fallbackSubtitle="Pengujian antarmuka ponsel di perangkat iOS dan Android."
                  />
                </div>
                <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                  <strong className="text-[#121311]">FIG. 04</strong> — Aplikasi mobile RUMIVERSE: sinkronisasi waktu-nyata memungkinkan pemilik usaha atau operator lapangan memantau dasbor dan matriks retensi langsung dari ponsel pintar.
                </figcaption>
              </figure>
            </section>

            {/* Bab IV: Spesifikasi Standar Teknologi */}
            <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                <span>Bagian 04</span>
                <span aria-hidden="true">/</span>
                <span>Spesifikasi Teknis</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                IV. Teknologi yang Digunakan (Tanpa Retorika)
              </h2>

              <p className="text-base text-[#353732] leading-relaxed">
                Kami memilih perangkat lunak dan pustaka kode yang telah teruji kestabilannya di industri, mudah dikembangkan oleh tim developer lain, dan memiliki dukungan jangka panjang:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE]">
                  <span className="font-mono text-xs text-[#2E7D5B] font-semibold uppercase block mb-2">
                    Lapisan Antarmuka (Frontend)
                  </span>
                  <ul className="space-y-2 text-sm text-[#2D2F2A]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span><strong>React 19 &amp; TypeScript</strong> untuk keandalan tipe kode tanpa bug runtime.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span><strong>Tailwind CSS &amp; Motion</strong> untuk antarmuka presisi dan animasi 60fps.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span><strong>Vite</strong> untuk build kilat dan pemuatan modul yang efisien.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE]">
                  <span className="font-mono text-xs text-[#2E7D5B] font-semibold uppercase block mb-2">
                    Lapisan Server &amp; Basis Data
                  </span>
                  <ul className="space-y-2 text-sm text-[#2D2F2A]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span><strong>Node.js &amp; Express / FastAPI</strong> untuk API yang ringan dan modular.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span><strong>PostgreSQL / Supabase</strong> untuk integritas data transaksi dan akun.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span><strong>WebSocket</strong> untuk transmisi telemetri data langsung tanpa jeda.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bottom Call to Action Box */}
            <footer className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#1B3B2B] text-[#F4F3EF] space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#74C69D] tracking-wider uppercase">
                  Langkah Berikutnya
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Punya Kebutuhan Pembuatan Web atau Aplikasi?
                </h3>
                <p className="text-sm sm:text-base text-[#D0D6CF] max-w-xl leading-relaxed">
                  Kami siap membantu merancang arsitektur sistem digital yang sesuai dengan alur kerja bisnis Anda—dari tahap cetak biru hingga peluncuran live.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F4F3EF]/20">
                <span className="font-mono text-xs text-[#74C69D]">
                  Studio: Lumajang, Jawa Timur · Sesi Daring &amp; Kunjungan
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenConsultation) {
                      onOpenConsultation('software-ai');
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F4F3EF] text-[#121311] hover:bg-[#FFFFFF] text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  <span>Mulai Diskusi Proyek Web / App</span>
                  <ArrowRight className="w-4 h-4 text-[#1B3B2B]" />
                </button>
              </div>
            </footer>
          </motion.article>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
