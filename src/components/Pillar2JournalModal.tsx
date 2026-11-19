import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileSearch,
  FileText,
  MessageSquare,
  Radio,
  Search,
  ShieldCheck,
  Terminal,
  Zap,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import type { ConsultationFormValues } from '../utils/ecosystemData';

const COVER_IMG = '/src/assets/images/pilar-2-ai-workforce/cover.webp';
const PIPELINE_WHITEBOARD_IMG = '/src/assets/images/pilar-2-ai-workforce/p2.webp';
const DASHBOARD_CLI_IMG = '/src/assets/images/pilar-2-ai-workforce/p2 2.webp';
const DISPATCH_WORKFLOW_IMG = '/src/assets/images/pilar-2-ai-workforce/p2 3.webp';

interface Pillar2JournalModalProps {
  open: boolean;
  onClose: () => void;
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

type TerminalLogTab = 'ingestion' | 'deliberation' | 'dispatch';

const TERMINAL_LOGS: Record<TerminalLogTab, { label: string; agent: string; lines: string[] }> = {
  ingestion: {
    label: '01. Pembacaan Data',
    agent: 'AGENT-OCR-INGEST',
    lines: [
      '[07:00:01] INGEST_WATCHER: Menerima 14 file laporan (.pdf & .xlsx) dari sistem bisnis.',
      '[07:00:02] PARSER_WORKER: Mengekstraksi 1,842 baris transaksi operasional harian.',
      '[07:00:03] EMBEDDING_ENGINE: Menghasilkan 256 vektor konteks ke database terenkripsi.',
      '[07:00:04] VALIDATION_CHECK: 100% data transaksi terverifikasi valid tanpa korupsi berkas.',
      '[07:00:04] STATUS: Pembacaan data selesai. Meneruskan kendali ke Agen Verifikasi.',
    ],
  },
  deliberation: {
    label: '02. Verifikasi Berlapis',
    agent: 'AGENT-MULTI-VERIFICATION',
    lines: [
      '[07:00:05] PLANNER_AGENT: Mengidentifikasi 3 anomali selisih stok di gudang cabang.',
      '[07:00:06] CRITIC_AGENT: Menguji silang vs histori transaksi 30 hari & mengecek validitas hitungan.',
      '[07:00:07] SYNTHESIS: Rekomendasi restock 450 unit sebelum akhir pekan untuk cegah kehabisan barang.',
      '[07:00:08] CONFIDENCE_SCORE: 96.4% (akurasi tinggi, hitungan tervalidasi ganda).',
      '[07:00:08] STATUS: Verifikasi selesai. Menghasilkan ringkasan eksekutif siap-tindak.',
    ],
  },
  dispatch: {
    label: '03. Pengiriman Laporan',
    agent: 'AGENT-DISPATCH-GATEWAY',
    lines: [
      '[07:00:09] PDF_ENGINE: Merender lembar ringkasan eksekutif 1 halaman (A4).',
      '[07:00:10] WA_GATEWAY: Mengirim poin keputusan + PDF ringkasan ke nomor WhatsApp pimpinan.',
      '[07:00:11] SMTP_CLIENT: Mengirim salinan audit terenkripsi ke manajer operasional.',
      '[07:00:11] DB_COMMIT: Mencatat log eksekusi ke database (Status: DELIVERED).',
      '[07:00:12] SYSTEM: Seluruh siklus selesai dalam 11.2 detik. Siaga untuk jadwal berikutnya.',
    ],
  },
};

export function Pillar2JournalModal({
  open,
  onClose,
  onOpenConsultation,
}: Pillar2JournalModalProps) {
  const [activeLogTab, setActiveLogTab] = useState<TerminalLogTab>('deliberation');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sync with browser History API so Back button & mobile swipe gesture close modal cleanly
  useEffect(() => {
    if (!open) return;

    const modalHash = '#jurnal-pilar-02';
    if (window.location.hash !== modalHash) {
      window.history.pushState({ modal: 'jurnal-pilar-02' }, '', modalHash);
    }

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [open, onClose]);

  // Clean close action that pops history entry if still present
  const handleClose = () => {
    if (window.location.hash === '#jurnal-pilar-02') {
      window.history.back();
    }
    onClose();
  };

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
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pillar2-journal-reader"
          initial={{ opacity: 0, y: 35, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.99 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-[#FAF9F6] text-[#121311] overflow-hidden select-text shadow-2xl"
        >
          {/* Sticky Editorial Header */}
          <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b border-[#D8D6CE] shadow-2xs">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-14 flex items-center justify-between gap-3 sm:gap-6">
              {/* Left Return Button & Pillar Tag */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg bg-[#121311] hover:bg-[#1B3B2B] text-[#FAF9F6] text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                  aria-label="Kembali ke Pilar"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Pilar</span>
                </button>

                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-[#1B3B2B] text-[#74C69D] font-mono text-[11px] font-bold tracking-wider uppercase">
                  PILAR 02
                </span>
                <span className="font-mono text-xs text-[#4A4D46] hidden lg:inline">
                  RUMIVERSE ENGINEERING JOURNAL // AUTONOMOUS AI WORKFORCE
                </span>
              </div>

              {/* Right Reading Progress & High-Contrast Close Button */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden md:inline font-mono text-[11px] text-[#6B6E66] tabular-nums">
                  {Math.round(readingProgress)}% DIBACA
                </span>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#1B3B2B] text-white text-xs font-mono font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98] border border-black/20"
                  aria-label="Tutup Jurnal (Esc)"
                >
                  <span>Tutup</span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/20 text-[10px] text-white font-mono leading-none">
                    Esc
                  </kbd>
                  <X className="w-3.5 h-3.5 text-white/80" />
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

          {/* Scrollable Journal Article Body (Spacious bottom padding) */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-5 py-10 sm:px-10 sm:py-14 lg:py-16 pb-28 sm:pb-36"
          >
            {/* Optimal reading measure: max 700px (65ch-70ch) */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[700px] mx-auto space-y-12 sm:space-y-14"
            >
              {/* Article Header & Title */}
              <header className="space-y-4 pb-6 border-b border-[#D8D6CE]">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Dokumentasi Sistem</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>Lumajang Studio</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>5 Menit Baca</span>
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-[34px] tracking-tight text-[#121311] leading-[1.25]">
                  Orkestrasi Agen AI Mandiri: Mengubah Tugas Rutin Menjadi Alur Kerja Otonom 24/7
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6B6E66]">
                  <span>Penulis: Abu Devis J.R. — Systems Architect</span>
                  <span>RUMIVERSE / PILAR 02</span>
                </div>

                {/* Quick Jump Table of Contents (Pills) */}
                <div className="pt-2.5 border-t border-[#D8D6CE]/80">
                  <span className="font-mono text-[11px] text-[#6B6E66] uppercase tracking-wider block mb-2">
                    Lompat Cepat ke Bab:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'p2-use-cases', label: '§ Kasus Nyata Bisnis' },
                      { id: 'p2-bab-1', label: '§ I. Verifikasi Berlapis' },
                      { id: 'p2-bab-2', label: '§ II. Konsol Pemantauan' },
                      { id: 'p2-bab-3', label: '§ III. Laporan Otomatis' },
                      { id: 'p2-bab-4', label: '§ IV. Efisiensi Model' },
                      { id: 'p2-bab-5', label: '§ V. Batas Kendali' },
                      { id: 'p2-skema-layanan', label: '§ Skema Layanan' },
                      { id: 'p2-bab-cta', label: '§ Konsultasi' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="px-2.5 py-1 rounded-md border border-[#D8D6CE] bg-[#F4F3EF] hover:bg-[#1B3B2B] text-[#242622] hover:text-[#F4F3EF] hover:border-[#1B3B2B] font-mono text-[11px] transition-all cursor-pointer shadow-2xs"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </header>

              {/* Abstract Blockquote (compact padding, fully visible above fold) */}
              <blockquote className="my-5 p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border-l-4 border-[#1B3B2B] font-display text-base sm:text-lg text-[#2D2F2A] leading-relaxed italic shadow-2xs">
                &ldquo;AI yang bernilai nyata bagi bisnis bukanlah antarmuka chatbot yang banyak bicara namun minim eksekusi. Di RUMIVERSE, kami merancang agen pekerja mandiri yang menangani pekerjaan rutin Anda: membaca rekapan data harian, memvalidasi kejanggalan angka secara berlapis, dan mengirimkan ringkasan siap-tindak langsung ke WhatsApp pemilik usaha.&rdquo;
              </blockquote>

              {/* FIG 01: Studio AI Foundry Workstation */}
              <figure className="space-y-3">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-sm">
                  <EditorialImage
                    src={COVER_IMG}
                    alt="Workstation Autonomous AI Foundry di studio RUMIVERSE dengan pemantauan model dan pipeline kognitif"
                    className="w-full h-full object-cover"
                    fallbackTitle="Autonomous AI Foundry"
                    fallbackSubtitle="Lingkungan komputasi dan pemantauan orkestrasi agen AI di studio RUMIVERSE Lumajang."
                  />
                </div>
                <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                  <strong className="text-[#121311]">FIG. 01</strong> — Ruang uji orkestrasi model di studio RUMIVERSE Lumajang: workstation multi-layar untuk pemantauan throughput token, evaluasi alur agen, dan pengujian keandalan sistem otomasi.
                </figcaption>
              </figure>

              {/* Bagian Solusi Bisnis: Kasus Penggunaan Nyata */}
              <section id="p2-use-cases" className="space-y-6 pt-6 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Solusi Nyata Bisnis</span>
                  <span aria-hidden="true">/</span>
                  <span>Masalah yang Diselesaikan</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                    Apa yang Sebenarnya Dikerjakan oleh Agen AI?
                  </h2>
                  <p className="text-base text-[#353732] leading-relaxed">
                    Banyak orang mengira AI hanya sekadar chatbot untuk tanya-jawab umum. Di RUMIVERSE, kami membangun pekerja digital mandiri yang menangani pekerjaan repetitif, rekapitulasi data, dan audit operasional bisnis Anda secara otomatis:
                  </p>
                </div>

                {/* Grid 4 Kasus Nyata Bisnis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Use Case 1 */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          01 · AUDIT &amp; LAPORAN RUTIN
                        </span>
                        <BarChart3 className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Asisten Laporan Harian &amp; Audit Stok
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Secara otomatis membaca rekapan penjualan dan stok gudang dari spreadsheet atau database setiap tengah malam, mendeteksi selisih barang, lalu mengirimkan ringkasan eksekutif beserta peringatan stok menipis ke WhatsApp pimpinan tepat jam 07.00 pagi.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Deteksi anomali selisih angka &amp; tren omzet</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Pengiriman ringkasan terjadwal langsung ke WhatsApp &amp; PDF</span>
                      </li>
                    </ul>
                  </div>

                  {/* Use Case 2 */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          02 · ADMINISTRASI &amp; OCR
                        </span>
                        <FileText className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Otomasi Input Faktur &amp; Dokumen
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Mengubah tumpukan foto nota fisik, berkas invoice PDF dari supplier, atau formulir masuk menjadi data terstruktur di spreadsheet maupun sistem ERP perusahaan tanpa perlu diketik manual oleh staf satu per satu.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Ekstraksi nomor invoice, nominal, tanggal, dan nama item</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Hemat puluhan jam kerja staf administrasi tiap bulan</span>
                      </li>
                    </ul>
                  </div>

                  {/* Use Case 3 */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          03 · INTELIJEN PASAR
                        </span>
                        <Search className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Riset &amp; Pemantauan Kompetitor
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Mengumpulkan pergerakan harga kompetitor, berita tren industri terkait, hingga ulasan pelanggan di berbagai platform secara periodik, kemudian menyaring poin-poin krusial menjadi laporan wawasan mingguan untuk strategi bisnis Anda.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Pemantauan harga produk &amp; perubahan katalog pasar</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Sintesis ringkas dari ratusan artikel &amp; ulasan publik</span>
                      </li>
                    </ul>
                  </div>

                  {/* Use Case 4 */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          04 · LAYANAN KLIEN CERDAS
                        </span>
                        <MessageSquare className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Asisten FAQ &amp; Layanan Pelanggan Berbasis Dokumen
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Menjawab pertanyaan teknis atau prosedural dari pelanggan maupun tim internal berdasarkan dokumen SOP perusahaan, panduan produk, dan histori kebijakan resmi tanpa mengarang bebas atau halusinasi data.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Jawaban terikat 100% pada dokumen resmi perusahaan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Eskalasi otomatis ke tim manusia jika butuh persetujuan khusus</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Bab I: Verifikasi Berlapis (Multi-Agent Check) */}
              <section id="p2-bab-1" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 01</span>
                  <span aria-hidden="true">/</span>
                  <span>Metodologi Kerja</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  I. Cara Kerja Agen Mandiri: Verifikasi Berlapis (Multi-Agent Check)
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Sebagian besar kegagalan adopsi AI di dunia industri berakar dari satu hal: menyerahkan seluruh pekerjaan ke satu prompt raksasa (*monolithic prompt*). Hasilnya tidak konsisten, boros token, dan rentan halusinasi data.
                </p>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Arsitektur kami memecah penyelesaian tugas ke dalam <strong>tiga tahapan kerja independen</strong> yang saling memverifikasi:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Fase 01 · Pembacaan
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Input Multi-Kanal</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Membaca berkas PDF faktur, spreadsheet laporan, aliran basis data, atau webhook API secara instan tanpa konversi manual.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Fase 02 · Verifikasi
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Verifikasi Berlapis</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Satu agen memproses data (*Worker Agent*), lalu agen kedua menguji ulang validitas fakta &amp; hitungan (*Critic Agent*) sebelum disetujui.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Fase 03 · Pengiriman
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Eksekusi Nyata</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Menerbitkan lembar laporan PDF, menyalakan peringatan jika ada selisih, atau mengirim ringkasan via WhatsApp dalam hitungan detik.
                    </p>
                  </div>
                </div>

                {/* FIG 02: Architectural Whiteboard Diagram */}
                <figure className="pt-3 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#FAF9F6] shadow-sm">
                    <EditorialImage
                      src={PIPELINE_WHITEBOARD_IMG}
                      alt="Cetak biru whiteboard arsitektur Autonomous AI Agent Swarm Engine RUMIVERSE"
                      className="w-full h-full object-contain bg-[#FAF9F6]"
                      fallbackTitle="Autonomous AI Swarm Engine Pipeline"
                      fallbackSubtitle="Arsitektur Pembacaan Data, Verifikasi Berlapis, dan Pengiriman Laporan."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 02</strong> — Cetak biru papan kerja studio: pemetaan alur dari Pembacaan Data (kiri), Verifikasi Berlapis Multi-Agen (tengah), hingga Pengiriman Otomatis ke WhatsApp, Surel, dan Basis Data (kanan).
                  </figcaption>
                </figure>
              </section>

              {/* Bab II: Konsol Pemantauan */}
              <section id="p2-bab-2" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 02</span>
                  <span aria-hidden="true">/</span>
                  <span>Telemetri &amp; Pengawasan</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  II. Konsol Pemantauan: Pengawasan Terbuka Tanpa Kotak Hitam (*No Black Box*)
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Dalam ranah operasional bisnis, kepercayaan dibangun dari transparansi. Pemilik usaha tidak boleh menebak-nebak apa yang sedang diproses oleh AI. Setiap keputusan, alasan pemilihan jalur data, hingga waktu eksekusi milidetik terekam dalam konsol audit terpadu.
                </p>

                {/* FIG 03: Telemetry Dashboard Image */}
                <figure className="space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#0E100F] shadow-md">
                    <EditorialImage
                      src={DASHBOARD_CLI_IMG}
                      alt="Dasbor pemantauan orkestrasi agen otonom RUMIVERSE dengan terminal log CLI dan metrik telemetri"
                      className="w-full h-full object-contain"
                      fallbackTitle="Cognitive Orchestration Dashboard"
                      fallbackSubtitle="Pemantauan status agen, efisiensi waktu, dan log CLI langsung."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 03</strong> — Dasbor pemantauan kinerja agen otonom: terminal log eksekusi langsung, pelacak latensi sub-2.5 detik, dan metrik rasio keberhasilan tugas tanpa intervensi manual.
                  </figcaption>
                </figure>

                {/* Interactive Simulated Terminal Box */}
                <div className="mt-6 rounded-2xl border border-[#2D332B] bg-[#0E110F] text-[#E0E2DC] overflow-hidden shadow-xl">
                  {/* Terminal Window Header */}
                  <div className="px-4 py-3 bg-[#151916] border-b border-[#252B24] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#46A758]/80" />
                      <span className="ml-2 text-[#8E928A] text-[11px]">rumiverse-ai-node-01 // stream-audit</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#0E110F] p-1 rounded-lg border border-[#252B24]">
                      {(['ingestion', 'deliberation', 'dispatch'] as TerminalLogTab[]).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveLogTab(tab)}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                            activeLogTab === tab
                              ? 'bg-[#1B3B2B] text-[#74C69D] font-bold'
                              : 'text-[#8E928A] hover:text-[#E0E2DC]'
                          }`}
                        >
                          {TERMINAL_LOGS[tab].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terminal Content Screen */}
                  <div className="p-5 font-mono text-xs space-y-2 leading-relaxed bg-[#0E110F]">
                    <div className="flex items-center gap-2 text-[#74C69D] pb-2 border-b border-[#252B24]/70">
                      <Terminal className="w-3.5 h-3.5" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold">
                        Modul Aktif: {TERMINAL_LOGS[activeLogTab].agent}
                      </span>
                    </div>

                    <div className="pt-2 space-y-1.5">
                      {TERMINAL_LOGS[activeLogTab].lines.map((line, idx) => (
                        <p key={idx} className="text-[#C8CBC2]">
                          <span className="text-[#5E6359] select-none mr-2">{`0${idx + 1}`}</span>
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="pt-3 flex items-center gap-2 text-[#74C69D] text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-ping" />
                      <span>Node beroperasi normal · 0 kegagalan tercatat</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bab III: Dari Kode ke Lapangan: Integrasi Laporan Otomatis */}
              <section id="p2-bab-3" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 03</span>
                  <span aria-hidden="true">/</span>
                  <span>Pengiriman Operasional</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  III. Dari Kode ke Lapangan: Otomasi Laporan WhatsApp &amp; PDF
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Nilai guna agen AI diukur dari seberapa cepat informasinya sampai ke tangan pengambil keputusan. Kebanyakan pemilik bisnis tidak memiliki waktu membuka 10 tab software setiap pagi.
                </p>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Sistem kami menerjemahkan hasil komputasi menjadi format yang siap dinikmati manusia: <strong>Pesan ringkas WhatsApp</strong> dengan poin-poin krusial pada pukul 07:00 pagi, disertai dokumen <strong>PDF ringkasan eksekutif 1 halaman</strong> untuk arsip resmi dan rapat tim.
                </p>

                {/* FIG 04: Dispatch Workflow */}
                <figure className="pt-2 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#FAF9F6] shadow-sm">
                    <EditorialImage
                      src={DISPATCH_WORKFLOW_IMG}
                      alt="Alur pengiriman laporan otomatis RUMIVERSE ke WhatsApp, dokumen PDF, dan email eksekutif"
                      className="w-full h-full object-contain bg-[#FAF9F6]"
                      fallbackTitle="Automated Report Dispatch Flow"
                      fallbackSubtitle="Generasi dokumen PDF ringkas dan pengiriman instan ke kanal pesan WhatsApp."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 04</strong> — Alur pengiriman hasil kerja agen mandiri: ringkasan terstruktur langsung diantar ke aplikasi pesan harian pemilik usaha tanpa perlu membuka perangkat lunak tambahan.
                  </figcaption>
                </figure>
              </section>

              {/* Bab IV: Pilihan Model Cerdas (Routing Tanpa Hype) */}
              <section id="p2-bab-4" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 04</span>
                  <span aria-hidden="true">/</span>
                  <span>Strategi Model</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  IV. Routing Model Cerdas: Efisiensi Biaya &amp; Kecepatan
                </h2>

                <p className="text-base text-[#353732] leading-relaxed">
                  Kami tidak memaksakan satu model untuk semua jenis beban kerja. Dengan pendekatan *model router*, kami mengarahkan tugas ke mesin yang paling hemat biaya namun paling tangguh:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE]">
                    <span className="font-mono text-xs text-[#2E7D5B] font-semibold uppercase block mb-2">
                      Pemrosesan Cepat &amp; Volume Tinggi
                    </span>
                    <ul className="space-y-2 text-sm text-[#2D2F2A]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Gemini 2.5 Flash / Fast OCR</strong>: Mengekstrak ribuan baris dokumen dalam hitungan detik dengan biaya token minimal.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Vector Embeddings (pgvector)</strong>: Pencarian konteks relevan dari arsip lama tanpa membebani jendela memori utama.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE]">
                    <span className="font-mono text-xs text-[#2E7D5B] font-semibold uppercase block mb-2">
                      Penalaran Kritis &amp; Privasi Lokal
                    </span>
                    <ul className="space-y-2 text-sm text-[#2D2F2A]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Claude 3.7 / Pro Reasoning</strong>: Digunakan khusus untuk fase sintesis kesimpulan dan pengecekan anomali logika kompleks.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Local LLM / DeepSeek</strong>: Opsi implementasi mandiri di server lokal untuk data rahasia perbankan atau internal perusahaan.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Bab V: Batas Kendali Manusia (Human-in-the-Loop) */}
              <section id="p2-bab-5" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 05</span>
                  <span aria-hidden="true">/</span>
                  <span>Kendali &amp; Keamanan</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  V. Prinsip Batas Kendali (*Human-in-the-Loop*)
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Otonomi bukan berarti melepaskan kendali secara membabi buta. Arsitektur kami menyematkan **ambang batas keyakinan (confidence threshold)**:
                </p>

                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D5B] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-base text-[#121311]">
                        Konfirmasi Tindakan Kritis Otomatis
                      </h4>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Jika agen mendeteksi selisih angka transaksi di atas batas aman atau nilai keyakinan model berada di bawah 85%, sistem tidak akan mengambil tindakan sendiri. Sistem akan langsung mengirimkan prompt persetujuan singkat: <em>&ldquo;Ditemukan selisih data sebesar 12%. Butuh konfirmasi pimpinan untuk melanjutkan.&rdquo;</em>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skema Layanan & Model Kerja Sama */}
              <section id="p2-skema-layanan" className="space-y-6 pt-10 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Skema Layanan</span>
                  <span aria-hidden="true">/</span>
                  <span>Model Kepemilikan &amp; Kerja Sama</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                    Skema Layanan: Bagaimana Solusi Ini Diterapkan di Bisnis Anda?
                  </h2>
                  <p className="text-base text-[#353732] leading-relaxed">
                    Setiap perusahaan memiliki skala kebutuhan, regulasi privasi data, dan kesiapan infrastruktur yang berbeda. Kami menyediakan dua pilihan skema kerja sama yang transparan:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Skema 1: Custom AI Workflow (Turnkey) */}
                  <div className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#1B3B2B]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                          OPSI 01 · SEKALI BANGUN (TURNKEY)
                        </span>
                        <Cpu className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[#121311]">
                        Custom AI Workflow (Turnkey System)
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Dibangun khusus sesuai alur kerja spesifik, format dokumen faktur, dan sistem database perusahaan Anda. Setelah selesai diuji dan diluncurkan, sistem sepenuhnya menjadi aset milik perusahaan Anda.
                      </p>
                      <ul className="space-y-2 text-xs text-[#2D2F2A] pt-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                          <span><strong>Privasi Penuh:</strong> Dapat dipasang di cloud perusahaan atau server lokal (*on-premise*) tanpa data keluar ke pihak luar.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                          <span><strong>Investasi Sekali di Awal:</strong> Biaya proyek transparan disertai panduan operasional dan serah terima penuh kode sumber.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-[#D8D6CE]/80 font-mono text-[11px] text-[#2E7D5B] font-medium">
                      ✓ Cocok untuk: Perusahaan dengan server mandiri &amp; alur kerja yang sudah ajeg
                    </div>
                  </div>

                  {/* Skema 2: Managed AI Agent */}
                  <div className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#1B3B2B]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                          OPSI 02 · BERLANGGANAN &amp; PEMELIHARAAN
                        </span>
                        <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[#121311]">
                        Managed AI Agent (Layanan Terkelola)
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Sistem agen AI yang dipantau, dirawat, dan dioptimalkan secara berkelanjutan oleh tim engineer RUMIVERSE setiap bulan. Anda cukup menerima hasil laporan dan efisiensi kerja tanpa pusing urusan server.
                      </p>
                      <ul className="space-y-2 text-xs text-[#2D2F2A] pt-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                          <span><strong>Pemantauan 24/7:</strong> Pengecekan latensi harian, audit akurasi verifikasi, dan penanganan otomatis jika API pihak ketiga bermasalah.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                          <span><strong>Pembaruan Berkala:</strong> Penyesuaian alur kerja baru dan optimasi pemakaian token model agar biaya operasional bulanan tetap hemat.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-[#D8D6CE]/80 font-mono text-[11px] text-[#2E7D5B] font-medium">
                      ✓ Cocok untuk: Pemilik bisnis yang ingin sistem terima beres tanpa tim IT khusus
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom Call to Action Box */}
              <footer id="p2-bab-cta" className="mt-14 p-7 sm:p-9 rounded-3xl bg-[#1B3B2B] text-[#F4F3EF] space-y-6 shadow-xl scroll-mt-20">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#74C69D] tracking-wider uppercase">
                    Langkah Berikutnya
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                    Ingin Mengotomatiskan Alur Kerja Bisnis Anda dengan Agen AI?
                  </h3>
                  <p className="text-sm sm:text-base text-[#D0D6CF] max-w-xl leading-relaxed">
                    Diskusikan proses manual atau pemeriksaan data berulang di usaha Anda. Kami akan buatkan purwarupa alur kerja agen otonom yang terukur, transparan, dan siap pakai.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F4F3EF]/20">
                  <span className="font-mono text-xs text-[#74C69D]">
                    Studio: Lumajang, Jawa Timur · Eksplorasi Prototipe Swarm
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      if (onOpenConsultation) {
                        onOpenConsultation('software-ai');
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F4F3EF] text-[#121311] hover:bg-[#FFFFFF] text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <span>Mulai Diskusi Proyek Agen AI</span>
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
