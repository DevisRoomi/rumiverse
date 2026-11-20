import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Moon,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sun,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import type { ConsultationFormValues } from '../utils/ecosystemData';

import WORKSTATION_IMG from '../assets/images/pilar-1-web-mobile/web_office_workstation.webp';
import DESIGN_SYSTEM_IMG from '../assets/images/pilar-1-web-mobile/p1_design_system.webp';
import DASHBOARD_DARK_IMG from '../assets/images/pilar-1-web-mobile/p1_dashboard_dark.webp';
import DASHBOARD_LIGHT_IMG from '../assets/images/pilar-1-web-mobile/p1_dashboard_light.webp';
import MOBILE_DESK_IMG from '../assets/images/pilar-1-web-mobile/p1_mobile_desk.webp';

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
  useBodyScrollLock(open);
  const [activeDashboardMode, setActiveDashboardMode] = useState<'dark' | 'light'>('dark');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sync with browser History API so Back button & mobile swipe gesture close modal cleanly
  useEffect(() => {
    if (!open) return;

    const modalHash = '#jurnal-pilar-01';
    if (window.location.hash !== modalHash) {
      window.history.pushState({ modal: 'jurnal-pilar-01' }, '', modalHash);
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
    if (window.location.hash === '#jurnal-pilar-01') {
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
          key="pillar1-journal-reader"
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.99 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
                  PILAR 01
                </span>
                <span className="font-mono text-xs text-[#4A4D46] hidden lg:inline">
                  RUMIVERSE ENGINEERING JOURNAL // FULL-STACK PLATFORMS
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
              <header className="space-y-5 pb-8 border-b border-[#D8D6CE]">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Dokumentasi Sistem</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>Lumajang Studio</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>4 Menit Baca</span>
                </div>

                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[46px] tracking-tight text-[#121311] leading-[1.15]">
                  Membangun Antarmuka Presisi: Dari Sistem Desain Modular hingga Dasbor Waktu-Nyata
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-[#6B6E66]">
                  <span>Penulis: Abu Devis J.R. — Systems Architect</span>
                  <span>RUMIVERSE / PILAR 01</span>
                </div>

                {/* Quick Jump Table of Contents (Pills) */}
                <div className="pt-3 border-t border-[#D8D6CE]/80">
                  <span className="font-mono text-[11px] text-[#6B6E66] uppercase tracking-wider block mb-2">
                    Lompat Cepat ke Bab:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'p1-kategori', label: '§ Jenis Platform' },
                      { id: 'p1-bab-1', label: '§ I. Desain Modular' },
                      { id: 'p1-bab-2', label: '§ II. Dasbor Real-Time' },
                      { id: 'p1-bab-3', label: '§ III. Integrasi Mobile' },
                      { id: 'p1-bab-4', label: '§ IV. Tech Stack' },
                      { id: 'p1-alur-pemesanan', label: '§ Alur Pemesanan' },
                      { id: 'p1-bab-cta', label: '§ Konsultasi' },
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

              {/* Abstract Blockquote */}
              <blockquote className="my-6 p-6 sm:p-7 rounded-2xl bg-[#F4F3EF] border-l-4 border-[#1B3B2B] font-display text-base sm:text-lg text-[#2D2F2A] leading-relaxed italic shadow-2xs">
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

              {/* Bagian Solusi: Jenis Platform yang Kami Bangun (Bahasa Pembeli) */}
              <section id="p1-kategori" className="space-y-6 pt-6 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Katalog Solusi</span>
                  <span aria-hidden="true">/</span>
                  <span>Berorientasi Bisnis</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                    Jenis Platform yang Kami Bangun
                  </h2>
                  <p className="text-base text-[#353732] leading-relaxed">
                    Setiap bisnis memiliki skala dan tantangan yang berbeda. Kami mengelompokkan pengembangan platform berdasarkan tujuan bisnis dan kebutuhan nyata—memastikan solusi tepat sasaran tanpa kerumitan istilah teknis:
                  </p>
                </div>

                {/* Grid Kartu Solusi 5 Kategori */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Kartu 1: Company Profile & Landing Page */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          01 · KREDIBILITAS &amp; PROFIL RESMI
                        </span>
                        <Globe className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Company Profile &amp; Landing Page
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Situs resmi perusahaan, lembaga, atau produk untuk membangun kredibilitas terpercaya, menampilkan portofolio layanan unggulan, dan menangkap calon klien secara terarah lewat formulir digital atau tombol WhatsApp langsung.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Kredibilitas instan &amp; integrasi formulir / WhatsApp</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Kecepatan kilat &amp; ramah mesin pencari (SEO Google)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Kartu 2: Web Portofolio & Personal Branding */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          02 · REPUTASI &amp; KARYA
                        </span>
                        <Briefcase className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Web Portofolio &amp; Personal Branding
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Tampilan khusus untuk arsitek, desainer, konsultan, atau profesional independen yang ingin memamerkan karya dengan tata letak editorial rapi layaknya buku seni cetak serta interaksi kurasi yang halus.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Tata letak editorial presisi &amp; galeri visual tajam</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Penyajian studi kasus karya &amp; profil kepakaran</span>
                      </li>
                    </ul>
                  </div>

                  {/* Kartu 3: Katalog Digital & E-Commerce */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          03 · TRANSAKSI &amp; PENJUALAN
                        </span>
                        <ShoppingBag className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Katalog Digital &amp; E-Commerce (Toko Online)
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Platform jualan dengan keranjang belanja mandiri, perhitungan ongkos kirim otomatis ke seluruh kecamatan, hingga integrasi pembayaran instan (QRIS, Virtual Account bank, dan kartu kredit).
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Hitung ongkir ekspedisi otomatis (JNE, SiCepat, dll.)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Payment gateway resmi aman (QRIS &amp; Transfer Bank)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Kartu 4: Aplikasi Operasional & Dasbor Internal */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          04 · EFISIENSI OPERASIONAL
                        </span>
                        <LayoutDashboard className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Aplikasi Operasional &amp; Dasbor Internal
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Sistem custom penunjang operasional seperti manajemen stok pergudangan, pencatatan pesanan terpadu, sistem kasir (POS), atau aplikasi pemesanan jadwal reservasi (booking) tanpa risiko kekeliruan manual.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Manajemen stok, pesanan &amp; multi-role (Admin/Staff)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Laporan keuangan otomatis &amp; ekspor data terstruktur</span>
                      </li>
                    </ul>
                  </div>

                  {/* Kartu 5: Aplikasi Mobile (Android / iOS / PWA) */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs md:col-span-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          05 · AKSES PORTABEL TIM &amp; PELANGGAN
                        </span>
                        <Smartphone className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Aplikasi Mobile (Android / iOS / PWA)
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Aplikasi yang bisa dipasang langsung di layar utama ponsel pintar (HP) untuk memudahkan tim lapangan mencatat aktivitas secara mobile di lokasi, atau memudahkan pelanggan setia mengakses layanan Anda kapan pun dengan satu ketukan.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#D8D6CE]/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2D2F2A]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Bisa dipasang di homescreen HP tanpa instalasi rumit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Sinkronisasi instan dua arah dengan dasbor pusat</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bab I: Dari Kertas ke Kode */}
              <section id="p1-bab-1" className="space-y-5 scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 01</span>
                  <span aria-hidden="true">/</span>
                  <span>Metodologi Desain</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  I. Dari Kertas ke Kode: Sistem Desain Modular
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Banyak platform digital menjadi lambat dan sulit diperbaiki karena tidak memiliki aturan komponen yang terpadu. Ketika tombol baru ditambahkan, gayanya berbeda dari halaman sebelumnya. Ketika data bertambah, susunan tata letak berantakan.
                </p>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Pendekatan kami selalu diawali dengan <strong>RUMIVERSE Design System</strong>: merumuskan kisi modular 8 piksel, aturan tipografi yang jelas (mulai dari judul Display hingga teks teknis Monospace), serta status interaksi tombol yang terdefinisi dengan tegas (default, hover, dan active).
                </p>

                {/* FIG 02: Design System Blueprint */}
                <figure className="pt-3 space-y-3">
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
              <section id="p1-bab-2" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 02</span>
                  <span aria-hidden="true">/</span>
                  <span>Data Waktu-Nyata</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  II. Mengelola Arus Data Tinggi: Dasbor Waktu-Nyata
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Dasbor yang baik tidak sekadar menampilkan angka, melainkan menceritakan kondisi bisnis saat ini secara langsung. Kami mengintegrasikan <strong>WebSocket</strong> dan pipeline <strong>REST API</strong> yang efisien sehingga ribuan pembaruan data per detik dapat ditampilkan tanpa membuat browser melambat atau memicu kedipan layar (*flicker*).
                </p>

                {/* Interactive Dashboard Viewer (Dark Mode vs Light Mode Toggle) */}
                <div className="pt-2 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE]">
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
              <section id="p1-bab-3" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 03</span>
                  <span aria-hidden="true">/</span>
                  <span>Integrasi Mobile</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  III. Ekosistem Ponsel: Kendali di Genggaman
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
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
              <section id="p1-bab-4" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
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

              {/* Alur Pemesanan Singkat (Pilih Kebutuhan Anda) */}
              <section id="p1-alur-pemesanan" className="space-y-6 pt-10 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Alur Kerja Sama</span>
                  <span aria-hidden="true">/</span>
                  <span>Transparan &amp; Terarah</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                    Pilih Kebutuhan Anda: 3 Langkah Sederhana Memulai
                  </h2>
                  <p className="text-base text-[#353732] leading-relaxed">
                    Banyak pembeli dan pemilik bisnis ragu menghubungi pengembang karena merasa belum paham seluk-beluk teknis website atau aplikasi. Di RUMIVERSE, Anda tidak perlu menguasai istilah rekayasa kode—cukup sampaikan tujuan usaha Anda:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {/* Langkah 1 */}
                  <div className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 shadow-2xs hover:border-[#1B3B2B]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                          LANGKAH 01
                        </span>
                        <MessageSquare className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311] leading-snug">
                        Ceritakan Kebutuhan &amp; Referensi
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Cukup sampaikan jenis web atau aplikasi yang Anda inginkan (misalnya <em>&ldquo;Mau buat company profile + katalog produk&rdquo;</em>), tanpa perlu paham istilah teknis.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#D8D6CE]/80 font-mono text-[11px] text-[#2E7D5B] flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Diskusi santai &amp; eksplorasi ide</span>
                    </div>
                  </div>

                  {/* Langkah 2 */}
                  <div className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 shadow-2xs hover:border-[#1B3B2B]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                          LANGKAH 02
                        </span>
                        <FileCheck2 className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311] leading-snug">
                        Dapatkan Rancangan &amp; Estimasi
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Kami buatkan gambaran tata letak awal, rincian fitur yang akan didapat, serta estimasi waktu pengerjaan dan penawaran biaya yang transparan tanpa biaya tersembunyi.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#D8D6CE]/80 font-mono text-[11px] text-[#2E7D5B] flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Rincian biaya &amp; jadwal pasti</span>
                    </div>
                  </div>

                  {/* Langkah 3 */}
                  <div className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 shadow-2xs hover:border-[#1B3B2B]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                          LANGKAH 03
                        </span>
                        <Rocket className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311] leading-snug">
                        Pengembangan &amp; Peluncuran
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Proses pengerjaan bertahap yang bisa Anda pantau progresnya secara berkala lewat link preview. Kami dampingi pengujian hingga sistem siap dipakai publik.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#D8D6CE]/80 font-mono text-[11px] text-[#2E7D5B] flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Pengujian tuntas &amp; siap rilis</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom Call to Action Box */}
              <footer id="p1-bab-cta" className="mt-14 p-7 sm:p-9 rounded-3xl bg-[#1B3B2B] text-[#F4F3EF] space-y-6 shadow-xl scroll-mt-20">
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
                      handleClose();
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
