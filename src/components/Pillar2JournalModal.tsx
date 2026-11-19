import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileText,
  MessageSquare,
  Radio,
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
    label: '01. Ingesti & Parsing',
    agent: 'AGENT-OCR-INGEST',
    lines: [
      '[07:00:01] INGEST_WATCHER: Menerima 14 file laporan (.pdf & .xlsx) dari sistem ERP.',
      '[07:00:02] PARSER_WORKER: Mengekstraksi 1,842 baris transaksi operasional harian.',
      '[07:00:03] EMBEDDING_ENGINE: Menghasilkan 256 vektor konteks ke pgvector (latensi: 110ms).',
      '[07:00:04] VALIDATION_CHECK: 100% payload terverifikasi valid tanpa korupsi berkas.',
      '[07:00:04] STATUS: Ingesti selesai. Meneruskan kendali ke Swarm Kognitif.',
    ],
  },
  deliberation: {
    label: '02. Musyawarah Swarm',
    agent: 'AGENT-SWARM-SYNTHESIS',
    lines: [
      '[07:00:05] PLANNER: Mengidentifikasi 3 anomali stok di gudang Lumajang Timur.',
      '[07:00:06] CRITIC_AGENT: Membandingkan tren konsumsi vs data historis 30 hari terakhir.',
      '[07:00:07] SYNTHESIS: Rekomendasi restock 450 unit sebelum Jumat untuk mencegah kehabisan stok.',
      '[07:00:08] CONFIDENCE_SCORE: 96.4% (melebihi ambang batas mandiri 85%).',
      '[07:00:08] STATUS: Konsensus tercapai. Menghasilkan ringkasan eksekutif 1 halaman.',
    ],
  },
  dispatch: {
    label: '03. Eksekusi & Dispatch',
    agent: 'AGENT-DISPATCH-GATEWAY',
    lines: [
      '[07:00:09] PDF_ENGINE: Merender lembar ringkasan eksekutif (A4 - 300DPI).',
      '[07:00:10] WA_GATEWAY: Mengirim pesan terformat + lampiran PDF ke nomor pimpinan.',
      '[07:00:11] SMTP_CLIENT: Mengirim salinan audit terenkripsi ke manajer operasional.',
      '[07:00:11] DB_COMMIT: Mencatat log audit eksekusi ke PostgreSQL (Status: DELIVERED).',
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
          key="pillar2-journal-reader"
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
                  PILAR 02
                </span>
                <span className="font-mono text-xs text-[#4A4D46] hidden sm:inline">
                  RUMIVERSE ENGINEERING JOURNAL // AUTONOMOUS AI WORKFORCE
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
                  <span>5 Menit Baca</span>
                </div>

                <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[52px] tracking-tight text-[#121311] leading-[1.12]">
                  Orkestrasi Agen AI Mandiri: Mengubah Tugas Rutin Menjadi Alur Kerja Otonom 24/7
                </h1>

                <div className="flex items-center justify-between gap-4 pt-4 text-xs font-mono text-[#6B6E66]">
                  <span>Penulis: Abu Devis J.R. — Systems Architect</span>
                  <span>RUMIVERSE / PILAR 02</span>
                </div>
              </header>

              {/* Abstract Blockquote */}
              <blockquote className="p-6 sm:p-8 rounded-2xl bg-[#F4F3EF] border-l-4 border-[#1B3B2B] font-display text-lg sm:text-xl text-[#2D2F2A] leading-relaxed italic">
                &ldquo;AI yang bernilai nyata bagi bisnis bukanlah antarmuka chatbot yang banyak bicara namun minim eksekusi. Di RUMIVERSE, kami merancang gugus agen mandiri (*multi-agent swarm*) yang bekerja seperti unit operasi terlatih: membaca data mentah, memvalidasi anomali, merumuskan sintesis keputusan, dan mendistribusikan laporan siap-tindak langsung ke WhatsApp atau email pemilik usaha.&rdquo;
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
                  <strong className="text-[#121311]">FIG. 01</strong> — Ruang uji orkestrasi model kognitif di studio RUMIVERSE Lumajang: workstation multi-layar untuk pemantauan throughput token, evaluasi prompt chain, dan debugging alur worker otonom.
                </figcaption>
              </figure>

              {/* Bab I: Cetak Biru Swarm Kognitif */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 01</span>
                  <span aria-hidden="true">/</span>
                  <span>Arsitektur Sistem</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  I. Cetak Biru Swarm Kognitif: Dari Ingesti Mentah ke Tindakan
                </h2>

                <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                  Sebagian besar kegagalan adopsi AI di dunia industri berakar dari satu hal: menyerahkan seluruh pekerjaan ke satu prompt raksasa (*monolithic prompt*). Hasilnya tidak konsisten, boros token, dan rentan halusinasi data.
                </p>

                <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                  Arsitektur kami memecah pemecahan masalah ke dalam <strong>tiga lapisan independen</strong> yang saling memverifikasi:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Fase 01 · Ingesti
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Input Multi-Kanal</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Membaca berkas PDF, spreadsheet, aliran basis data, atau webhook API secara instan tanpa konversi manual.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Fase 02 · Orkestrasi
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Musyawarah Swarm</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Planner Agent merancang langkah kerja, Specialist Agent menganalisis fakta, dan Critic Agent memeriksa keabsahan logika.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Fase 03 · Dispatch
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Eksekusi Nyata</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Menerbitkan lembar laporan PDF, menyalakan alarm peringatan, atau mengirim ringkasan via WhatsApp dalam hitungan detik.
                    </p>
                  </div>
                </div>

                {/* FIG 02: Architectural Whiteboard Diagram */}
                <figure className="pt-4 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#FAF9F6] shadow-sm">
                    <EditorialImage
                      src={PIPELINE_WHITEBOARD_IMG}
                      alt="Cetak biru whiteboard arsitektur Autonomous AI Agent Swarm Engine RUMIVERSE"
                      className="w-full h-full object-contain bg-[#FAF9F6]"
                      fallbackTitle="Autonomous AI Swarm Engine Pipeline"
                      fallbackSubtitle="Arsitektur Ingesti, Orkestrasi Kognitif, dan Integrasi Eksekusi."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 02</strong> — Cetak biru papan kerja studio: pemetaan alur dari Ingestion (kiri), Orkestrasi Kognitif Multi-Agen (tengah), hingga Dispatch ke WhatsApp, Surel, dan Basis Data (kanan).
                  </figcaption>
                </figure>
              </section>

              {/* Bab II: Konsol Eksekusi & Telemetri Waktu-Nyata */}
              <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 02</span>
                  <span aria-hidden="true">/</span>
                  <span>Telemetri & Pengawasan</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  II. Konsol Eksekusi: Pemantauan Tanpa Kotak Hitam (*No Black Box*)
                </h2>

                <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
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
                    <strong className="text-[#121311]">FIG. 03</strong> — Dasbor pemantauan pilar kognitif: terminal log eksekusi langsung, pelacak latensi sub-2.5 detik, dan metrik rasio keberhasilan tugas 80%+ tanpa intervensi manual.
                  </figcaption>
                </figure>

                {/* Interactive Simulated Terminal Box */}
                <div className="mt-8 rounded-2xl border border-[#2D332B] bg-[#0E110F] text-[#E0E2DC] overflow-hidden shadow-xl">
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
              <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 03</span>
                  <span aria-hidden="true">/</span>
                  <span>Pengiriman Operasional</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  III. Dari Kode ke Lapangan: Otomasi Laporan WhatsApp &amp; PDF
                </h2>

                <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                  Nilai guna agen AI diukur dari seberapa cepat informasinya sampai ke tangan pengambil keputusan. Kebanyakan pemilik bisnis tidak memiliki waktu membuka 10 tab software setiap pagi.
                </p>

                <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
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
              <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
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
              <section className="space-y-6 pt-10 border-t border-[#D8D6CE]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 05</span>
                  <span aria-hidden="true">/</span>
                  <span>Kendali &amp; Keamanan</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  V. Prinsip Batas Kendali (*Human-in-the-Loop*)
                </h2>

                <p className="text-base sm:text-lg text-[#353732] leading-[1.8]">
                  Otonomi bukan berarti melepaskan kendali secara membabi buta. Arsitektur kami menyematkan **ambang batas keyakinan (confidence threshold)**:
                </p>

                <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-4">
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

              {/* Bottom Call to Action Box */}
              <footer className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#1B3B2B] text-[#F4F3EF] space-y-6 shadow-xl">
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
                      onClose();
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
