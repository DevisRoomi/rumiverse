import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  Cpu,
  Droplets,
  Fish,
  Flame,
  Gauge,
  Layers,
  Radio,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sprout,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Warehouse,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import type { ConsultationFormValues } from '../utils/ecosystemData';

const COVER_IMG = '/src/assets/images/pilar-3-cyber-physical/cover.webp';
const PROTOTYPE_DIAGRAM_IMG = '/src/assets/images/pilar-3-cyber-physical/p3.webp';
const GREENHOUSE_MANIFOLD_IMG = '/src/assets/images/pilar-3-cyber-physical/p3 3.webp';
const CONTROL_BOX_IMG = '/src/assets/images/pilar-3-cyber-physical/p3 4.webp';

interface Pillar3JournalModalProps {
  open: boolean;
  onClose: () => void;
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

type TelemetryNodeKey = 'aquaculture' | 'livestock' | 'fertigation';
type SimulationScenario = 'normal' | 'anomaly';

interface TelemetryMetric {
  label: string;
  value: string;
  status: 'normal' | 'optimal' | 'warning' | 'critical';
  benchmark: string;
}

interface TelemetryNodeData {
  title: string;
  tag: string;
  location: string;
  metrics: TelemetryMetric[];
  actuators: { label: string; state: string; isAlert?: boolean }[];
  alertBanner?: string;
}

const TELEMETRY_DATA: Record<
  SimulationScenario,
  Record<TelemetryNodeKey, TelemetryNodeData>
> = {
  normal: {
    aquaculture: {
      title: 'Simpul 01: Sirkulasi Kolam Ikan & Biofilter',
      tag: 'NODE-AQUA-02',
      location: 'Bak Beton Sentral Living Lab',
      metrics: [
        { label: 'Oksigen Terlarut (DO)', value: '6.4 mg/L', status: 'optimal', benchmark: 'Target: >5.0 mg/L' },
        { label: 'Keasaman Air (pH)', value: '7.18 pH', status: 'optimal', benchmark: 'Target: 6.8 - 7.5' },
        { label: 'Suhu Air Kolam', value: '25.6 °C', status: 'optimal', benchmark: 'Target: 25 - 28 °C' },
        { label: 'Kekeruhan (Turbidity)', value: '12 NTU', status: 'normal', benchmark: 'Batas: <25 NTU' },
      ],
      actuators: [
        { label: 'Pompa Submersible Sirkulasi', state: 'ON · Aliran Normal (14.2 L/m)' },
        { label: 'Aerator Kincir Oksigen', state: 'SIKLUS RUTIN (Hemat Daya)' },
      ],
    },
    livestock: {
      title: 'Simpul 02: Kandang Unggas Modular',
      tag: 'NODE-LIVESTOCK-01',
      location: 'Zona Barat Living Lab Lumajang',
      metrics: [
        { label: 'Kadar Amonia (NH3)', value: '8.2 ppm', status: 'optimal', benchmark: 'Ambang: <15.0 ppm' },
        { label: 'Suhu Lingkungan', value: '28.4 °C', status: 'normal', benchmark: 'Ideal: 26 - 29 °C' },
        { label: 'Kelembaban Relatif', value: '72 %RH', status: 'normal', benchmark: 'Ideal: 60 - 75 %' },
        { label: 'Berat Pakan Tandon', value: '14.8 kg', status: 'normal', benchmark: 'Jadwal 16:00 WIB' },
      ],
      actuators: [
        { label: 'Blower Sirkulasi Udara', state: 'Siklus Otomatis (5m/jam)' },
        { label: 'Tirai Ventilasi Otomatis', state: 'Posisi Standar (60% Terbuka)' },
      ],
    },
    fertigation: {
      title: 'Simpul 03: Rak Fertigasi & Hidroponik NFT',
      tag: 'NODE-HYDROPONIC-03',
      location: 'Sayap Timur & Greenhouse Mini',
      metrics: [
        { label: 'Kepekatan Nutrisi (EC)', value: '1.85 mS/cm', status: 'optimal', benchmark: 'Target: 1.6 - 2.0' },
        { label: 'Kelembaban Media Tanam', value: '74 %', status: 'optimal', benchmark: 'Target: 65 - 80 %' },
        { label: 'Tekanan Pipa Manifold', value: '1.8 Bar', status: 'normal', benchmark: 'Batas: 1.5 - 2.2 Bar' },
        { label: 'Intensitas Cahaya (PAR)', value: '720 µmol/m²/s', status: 'optimal', benchmark: 'Optimal Sayuran' },
      ],
      actuators: [
        { label: 'Pompa Dosing Nutrisi A & B', state: 'STANDBY (Terkalibrasi)' },
        { label: 'Irigasi Tetes Saluran Atas', state: 'ON (Interval Presisi 30s)' },
      ],
    },
  },
  anomaly: {
    aquaculture: {
      title: 'Simpul 01: Sirkulasi Kolam Ikan & Biofilter',
      tag: 'NODE-AQUA-02',
      location: 'Bak Beton Sentral Living Lab',
      alertBanner: 'PERINGATAN KRITIS: Oksigen terlarut anjlok ke 3.1 mg/L! Aerator darurat diaktifkan otomatis.',
      metrics: [
        { label: 'Oksigen Terlarut (DO)', value: '3.1 mg/L', status: 'critical', benchmark: 'BAHAYA KEMATIAN: <4.0' },
        { label: 'Keasaman Air (pH)', value: '6.35 pH', status: 'warning', benchmark: 'Kondisi Asam: <6.8' },
        { label: 'Suhu Air Kolam', value: '29.4 °C', status: 'warning', benchmark: 'Suhu Panas: >28 °C' },
        { label: 'Kekeruhan (Turbidity)', value: '38 NTU', status: 'warning', benchmark: 'Limbah Tinggi: >25 NTU' },
      ],
      actuators: [
        { label: 'Aerator Oksigen Cadangan', state: 'MENYALA 100% (INTERVENSI OTOMATIS)', isAlert: true },
        { label: 'Katup Solenoid Fresh Water', state: 'TERBUKA (PENGENCERAN AIR OTOMATIS)', isAlert: true },
      ],
    },
    livestock: {
      title: 'Simpul 02: Kandang Unggas Modular',
      tag: 'NODE-LIVESTOCK-01',
      location: 'Zona Barat Living Lab Lumajang',
      alertBanner: 'PERINGATAN KRITIS: Lonjakan gas amonia 31.8 ppm (>25 ppm). Blower darurat aktif & WhatsApp terkirim!',
      metrics: [
        { label: 'Kadar Amonia (NH3)', value: '31.8 ppm', status: 'critical', benchmark: 'BAHAYA KERACUNAN: >25' },
        { label: 'Suhu Lingkungan', value: '33.2 °C', status: 'warning', benchmark: 'STRES PANAS: >31 °C' },
        { label: 'Kelembaban Relatif', value: '88 %RH', status: 'warning', benchmark: 'Udara Lembab Pemicu Gas' },
        { label: 'Berat Pakan Tandon', value: '11.2 kg', status: 'normal', benchmark: 'Nafsu Makan Menurun' },
      ],
      actuators: [
        { label: 'Blower Exhaust Darurat', state: 'MENYALA 100% (PEMBUANGAN GAS CEPAT)', isAlert: true },
        { label: 'Cooling Pad Pendingin Basah', state: 'AKTIF (MENURUNKAN SUHU RUANG)', isAlert: true },
      ],
    },
    fertigation: {
      title: 'Simpul 03: Rak Fertigasi & Hidroponik NFT',
      tag: 'NODE-HYDROPONIC-03',
      location: 'Sayap Timur & Greenhouse Mini',
      alertBanner: 'PERINGATAN: Media tanam mengering cepat (41%) akibat terik ekstrim. Misting pendingin dinyalakan.',
      metrics: [
        { label: 'Kepekatan Nutrisi (EC)', value: '2.75 mS/cm', status: 'warning', benchmark: 'TERLALU PEKAT: >2.2' },
        { label: 'Kelembaban Media Tanam', value: '41 %', status: 'critical', benchmark: 'BAHAYA LAYU: <50 %' },
        { label: 'Tekanan Pipa Manifold', value: '0.9 Bar', status: 'warning', benchmark: 'PENURUNAN TEKANAN' },
        { label: 'Intensitas Cahaya (PAR)', value: '1,180 µmol/m²/s', status: 'warning', benchmark: 'Terik Siang Ekstrim' },
      ],
      actuators: [
        { label: 'Misting Pengabutan Daun', state: 'MENYALA OTOMATIS (TURUNKAN SUHU DAUN)', isAlert: true },
        { label: 'Katup Air Pengencer Nutrisi', state: 'OPEN (MENURUNKAN NILAI EC KE 1.8)', isAlert: true },
      ],
    },
  },
};

export function Pillar3JournalModal({
  open,
  onClose,
  onOpenConsultation,
}: Pillar3JournalModalProps) {
  useBodyScrollLock(open);
  const [activeNode, setActiveNode] = useState<TelemetryNodeKey>('aquaculture');
  const [simulationScenario, setSimulationScenario] = useState<SimulationScenario>('normal');
  const [livePulseTick, setLivePulseTick] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Live simulation telemetry pulse (every 2.5s)
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setLivePulseTick((prev) => (prev + 1) % 1000);
    }, 2500);
    return () => clearInterval(interval);
  }, [open]);

  // Sync with browser History API so Back button & mobile swipe gesture close modal cleanly
  useEffect(() => {
    if (!open) return;

    const modalHash = '#jurnal-pilar-03';
    if (window.location.hash !== modalHash) {
      window.history.pushState({ modal: 'jurnal-pilar-03' }, '', modalHash);
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
    if (window.location.hash === '#jurnal-pilar-03') {
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
          key="pillar3-journal-reader"
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
                  PILAR 03
                </span>
                <span className="font-mono text-xs text-[#4A4D46] hidden lg:inline">
                  RUMIVERSE ENGINEERING JOURNAL // CYBER-PHYSICAL SYSTEMS (CPS)
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
                  <span>Living Lab Lumajang</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>6 Menit Baca</span>
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-[34px] tracking-tight text-[#121311] leading-[1.25]">
                  Cyber-Physical Systems: Menjembatani Baris Kode ke Tanah, Air, dan Udara Lapangan
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6B6E66]">
                  <span>Penulis: Abu Devis J.R. — Systems Architect</span>
                  <span>RUMIVERSE / PILAR 03</span>
                </div>

                {/* Quick Jump Table of Contents (Pills) */}
                <div className="pt-2.5 border-t border-[#D8D6CE]/80">
                  <span className="font-mono text-[11px] text-[#6B6E66] uppercase tracking-wider block mb-2">
                    Lompat Cepat ke Bab:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'p3-urgensi', label: '§ Urgensi Lapangan' },
                      { id: 'p3-sektor', label: '§ Penerapan Sektor' },
                      { id: 'p3-bab-1', label: '§ I. Tiga Simpul' },
                      { id: 'p3-bab-2', label: '§ II. Boks IP66 & Telemetri' },
                      { id: 'p3-bab-3', label: '§ III. Komparasi Data' },
                      { id: 'p3-bab-4', label: '§ IV. Skala Komersial' },
                      { id: 'p3-bab-5', label: '§ V. Standar Daya' },
                      { id: 'p3-bab-cta', label: '§ Konsultasi' },
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
                &ldquo;Banyak rekayasawan perangkat lunak nyaman merancang antarmuka di ruangan ber-AC, namun terhenti ketika berhadapan dengan debu lapangan, fluktuasi tegangan listrik desa, kelembaban tropis, dan kotoran ternak. Di RUMIVERSE, kami menguji setiap sensor dan kode kendali secara langsung di tanah Lumajang—membuktikan bahwa otomasi presisi bukan sekadar teori di atas kertas.&rdquo;
              </blockquote>

              {/* FIG 01: Circular Integrated Eco-Farm Overview */}
              <figure className="space-y-3">
                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-sm">
                  <EditorialImage
                    src={COVER_IMG}
                    alt="Prototipe ekosistem sirkular terpadu RUMIVERSE: kandang ayam modular di atas kolam ikan dan sirkulasi hidroponik"
                    className="w-full h-full object-cover"
                    fallbackTitle="Living Lab Lumajang Circular Setup"
                    fallbackSubtitle="Ekosistem tertutup perpaduan unggas, akuakultur, dan hidroponik berbasis sensor."
                  />
                </div>
                <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                  <strong className="text-[#121311]">FIG. 01</strong> — Fasilitas Living Lab RUMIVERSE di Lumajang: perpaduan kandang ayam modular kayu alami, kolam akuakultur air tawar, unit filtrasi multi-tahap, dan talang hidroponik tanaman sayur dengan sirkulasi gravitasi tertutup.
                </figcaption>
              </figure>

              {/* Bagian Baru 01: Kenapa Otomasi Lapangan Mendesak? (Data & Paradoks) */}
              <section id="p3-urgensi" className="space-y-6 pt-6 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Urgensi Nyata</span>
                  <span aria-hidden="true">/</span>
                  <span>Paradoks Produktivitas</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                    Kenapa Otomasi Lapangan Mendesak?
                  </h2>
                  <p className="text-base text-[#353732] leading-relaxed">
                    Terdapat kontras tajam dalam peta ketahanan pangan dan agrikultur regional yang patut menjadi bahan refleksi bersama:
                  </p>
                </div>

                {/* Paradoks Singapura vs Indonesia */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-4">
                  <span className="font-mono text-xs font-bold text-[#1B3B2B] uppercase tracking-wider block">
                    Paradoks Luas Lahan vs. Hasil Produktivitas
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-[#353732]">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE]/80 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#2E7D5B]">
                        <span>SINGAPURA (~730 km²)</span>
                      </div>
                      <p className="text-xs text-[#4A4D46] leading-relaxed">
                        Dengan lahan pertanian kurang dari 1% dari total wilayahnya, Singapura menargetkan pemenuhan <strong>30% kebutuhan pangan secara mandiri (&ldquo;30 by 30&rdquo;)</strong> melalui *vertical farming*, pencahayaan LED presisi, dan sensor iklim tertutup tanpa bergantung pada tanah luas.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE]/80 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#B45309]">
                        <span>INDONESIA (Jutaan Hektare)</span>
                      </div>
                      <p className="text-xs text-[#4A4D46] leading-relaxed">
                        Dikaruniai tanah vulkanik subur dan iklim tropis sepanjang tahun, namun produktivitasnya kerap tertahan oleh tebakan manual cuaca dan tingginya tingkat susut pascapanen (<em>post-harvest loss</em> mencapai <strong>20–30% pada komoditas pangan segar</strong>).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Kerugian Nyata di Lapangan */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-display font-bold text-lg text-[#121311]">
                    Kerugian Nyata di Lapangan yang Kerap Dialami Pemilik Usaha:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2.5 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] text-[#B91C1C] border border-[#FCA5A5]/60">
                          01 · GAS BERACUN TERNAK
                        </span>
                        <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
                      </div>
                      <h4 className="font-display font-bold text-base text-[#121311]">
                        Lonjakan Gas Amonia (NH₃) &amp; Kematian Ternak
                      </h4>
                      <p className="text-xs text-[#4A4D46] leading-relaxed">
                        Kadar amonia di atas 25 ppm yang telat terdeteksi di kandang menurunkan bobot panen ayam hingga 10–15% dan memicu gangguan pernapasan serta risiko kematian massal dalam semalam.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2.5 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] text-[#B45309] border border-[#FCD34D]/60">
                          02 · PEMBOROSAN AIR &amp; PUPUK
                        </span>
                        <Droplets className="w-4 h-4 text-[#B45309]" />
                      </div>
                      <h4 className="font-display font-bold text-base text-[#121311]">
                        Pemborosan 30–50% Air &amp; Nutrisi Pupuk Cair
                      </h4>
                      <p className="text-xs text-[#4A4D46] leading-relaxed">
                        Penyiraman dan pemupukan berbasis jadwal jam dinding tanpa sensor kelembaban tanah (*soil moisture*) dan nilai EC membuang 30–50% pupuk cair larut ke tanah tanpa terserap akar tanaman.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2.5 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] text-[#B91C1C] border border-[#FCA5A5]/60">
                          03 · RESPON TERLAMBAT
                        </span>
                        <Fish className="w-4 h-4 text-[#B91C1C]" />
                      </div>
                      <h4 className="font-display font-bold text-base text-[#121311]">
                        Keterlambatan Respon Bencana Oksigen &amp; Suhu
                      </h4>
                      <p className="text-xs text-[#4A4D46] leading-relaxed">
                        Petugas kolam baru tahu oksigen terlarut (*DO drop*) anjlok atau suhu greenhouse terlalu panas setelah ikan mengambang lemas atau tanaman layu permanen.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-2.5 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] text-[#2E7D5B] border border-[#A7F3D0]/60">
                          04 · KERUSAKAN MESIN
                        </span>
                        <ShieldAlert className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h4 className="font-display font-bold text-base text-[#121311]">
                        Kerusakan Pompa &amp; Mesin Pendingin Mendadak
                      </h4>
                      <p className="text-xs text-[#4A4D46] leading-relaxed">
                        Pompa sirkulasi macet atau kompresor *cold storage* yang mati tanpa terdeteksi di malam hari dapat merusak berton-ton stok komoditas bernilai puluhan juta rupiah dalam hitungan jam.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bagian Baru 02: Penerapan Modular di Berbagai Sektor */}
              <section id="p3-sektor" className="space-y-6 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Aplikasi Lintas Sektor</span>
                  <span aria-hidden="true">/</span>
                  <span>Modular &amp; Tahan Cuaca</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                    Penerapan Modular di Berbagai Sektor Industri
                  </h2>
                  <p className="text-base text-[#353732] leading-relaxed">
                    Sistem kontroler berstandar industri IP66 RUMIVERSE bersifat agnostik dan modular—tidak hanya untuk kandang dan kolam, melainkan dapat dipasang pada beragam fasilitas komersial:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Sektor 1: Perkebunan & Greenhouse */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          01 · PERKEBUNAN &amp; GREENHOUSE
                        </span>
                        <Sprout className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Irigasi Tetes &amp; Fertigasi Presisi
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Otomasi irigasi tetes (*drip irrigation*) dan pengabutan (*misting*) berdasarkan sensor kelembaban tanah, suhu kanopi daun, dan radiasi sinar matahari (PAR) untuk tanaman melon, stroberi, atau hortikultura bernilai tinggi.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Hemat air &amp; nutrisi hingga 42%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Jadwal dosing pupuk terkalibrasi otomatis</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sektor 2: Cold Storage & Gudang */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          02 · GUDANG &amp; COLD STORAGE
                        </span>
                        <Warehouse className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Pemantauan Suhu Ruang Beku 24/7
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Monitoring kestabilan suhu ruangan beku (-25°C s/d 10°C) dan kelembaban udara dengan alarm instan ke WhatsApp pimpinan dan sirene otomatis saat kompresor pendingin drop atau pemadaman listrik.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Log suhu otomatis untuk audit sertifikasi mutu</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Deteksi dini sebelum komoditas mengalami pembusukan</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sektor 3: Tambak & Akuakultur */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          03 · TAMBAK &amp; AKUAKULTUR
                        </span>
                        <Fish className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Kendali Kincir &amp; Kualitas Air Real-Time
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Pengaturan otomatis kincir air (*aerator*) dan pompa sirkulasi berdasarkan sensor Oksigen Terlarut (DO), pH, salinitas, dan kekeruhan air untuk tambak udang vaname atau pembibitan ikan air tawar.
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Cegah kematian massal saat penurunan DO malam hari</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Hemat konsumsi listrik motor kincir di siang hari</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sektor 4: Peternakan Closed House */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between space-y-4 hover:border-[#1B3B2B]/40 transition-colors shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#D8D6CE] text-[#1B3B2B]">
                          04 · PETERNAKAN CLOSED HOUSE
                        </span>
                        <Wind className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#121311]">
                        Regulasi Iklim Mikro Kandang Tertutup
                      </h3>
                      <p className="text-sm text-[#4A4D46] leading-relaxed">
                        Pengendalian cerdas kipas *exhaust blower*, tirai otomatis, dan *cooling pad* basah berdasarkan gas amonia ($NH_3$), $CO_2$, suhu, dan indeks kenyamanan unggas (THI).
                      </p>
                    </div>
                    <ul className="pt-3 border-t border-[#D8D6CE]/70 space-y-1.5 text-xs text-[#2D2F2A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Menekan FCR (*Feed Conversion Ratio*) panen</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>Udara kandang segar bebas komplain bau lingkungan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Bab I: Arsitektur Tiga Simpul Modular */}
              <section id="p3-bab-1" className="space-y-5 scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 01</span>
                  <span aria-hidden="true">/</span>
                  <span>Arsitektur Siklus Tertutup</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  I. Arsitektur Tiga Simpul: Ternak, Akuakultur, dan Hidroponik
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Sistem cyber-physical kami tidak berdiri sendiri-sendiri sebagai alat yang terisolasi. Seluruh elemen lapangan dirancang membentuk **siklus nutrisi biologis tertutup (*circular bio-loop*)**:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Simpul 01 · Ternak
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Kandang Unggas Modular</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Dipantau dengan sensor gas amonia ($NH_3$) dan sensor kelembaban untuk mendeteksi stres hewan dan waktu pembersihan alas kandang secara presisi.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Simpul 02 · Air
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Kolam Biofilter Akuaponik</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Limbah organik diurai oleh bakteri nitrifikasi menjadi nitrat alami. Probe pH dan oksigen terlarut (DO) mengendalikan aerator waktu-nyata.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase block">
                      Simpul 03 · Tanaman
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#121311]">Rak Irigasi Hidroponik</h4>
                    <p className="text-xs text-[#4A4D46] leading-relaxed">
                      Akar tanaman menyerap nitrat sebagai pupuk alami sekaligus memurnikan air sebelum dialirkan kembali ke kolam ikan dalam kondisi bersih.
                    </p>
                  </div>
                </div>

                {/* FIG 02: Prototype Annotation Diagram */}
                <figure className="pt-3 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#FAF9F6] shadow-sm">
                    <EditorialImage
                      src={PROTOTYPE_DIAGRAM_IMG}
                      alt="Cetak biru visual Prototipe CPS Pilar 03 dengan anotasi sensor, katup solenoid, dan panel kendali"
                      className="w-full h-full object-contain bg-[#FAF9F6]"
                      fallbackTitle="PROTOTIPE CPS — PILAR 03"
                      fallbackSubtitle="Penempatan instrumentasi probe kualitas air, sensor gas amonia, dan katup otomatis."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 02</strong> — Skematik prototipe lapangan: pemasangan sensor amonia pada kandang unggas modular (kiri), probe kualitas air dan katup solenoid otomatis pada kolam penampung (tengah), serta talang fertigasi hidroponik 3 susun (kanan).
                  </figcaption>
                </figure>
              </section>

              {/* Bab II: Rekayasa Panel Instrumentasi Lapangan IP66 */}
              <section id="p3-bab-2" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 02</span>
                  <span aria-hidden="true">/</span>
                  <span>Ketahanan Perangkat Keras</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  II. Standar Panel Lapangan: Sertifikasi IP66 &amp; Isolasi Optik
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Kerusakan modul IoT paling sering bukan disebabkan oleh kesalahan algoritma perangkat lunak, melainkan korosi lembab tropis dan lonjakan arus induktif dari dinamo pompa.
                </p>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Oleh karena itu, seluruh unit kontroler RUMIVERSE dirakit dalam boks berperingkat cuaca **IP66 tahan cuaca ekstrim**: menggunakan rel DIN standar industri, pemutus arus independen (MCB), modul relay dengan isolasi optik (*optocoupler*), dan layar OLED mandiri untuk diagnosa manual di lokasi tanpa bergantung pada koneksi internet.
                </p>

                {/* FIG 03: Control Box Close-Up */}
                <figure className="space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-md">
                    <EditorialImage
                      src={CONTROL_BOX_IMG}
                      alt="Tampilan detail panel kontrol industri IP66 dengan pengkabelan rapi, MCB, relay, dan layar telemetri OLED"
                      className="w-full h-full object-cover"
                      fallbackTitle="Kotak Kontrol Instrumen IP66"
                      fallbackSubtitle="Tata letak pengkabelan terminal rel DIN, pengaman MCB, dan modul kontroler terlindung."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 03</strong> — Detail panel instrumentasi lapangan: penataan kabel rapi berselubung conduit, pemisah sirkuit MCB daya tinggi, modul logika mikrokontroler dengan isolasi galvanis, serta indikator telemetri OLED lokal.
                  </figcaption>
                </figure>

                {/* Interactive Simulated Field Telemetry Node Inspector with Scenario Toggle */}
                <div className="mt-6 rounded-2xl border border-[#2D332B] bg-[#0E110F] text-[#E0E2DC] overflow-hidden shadow-xl">
                  {/* Scenario Switcher Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#151916] border-b border-[#252B24]">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-[#74C69D]" />
                      <span className="font-mono text-xs text-[#E0E2DC] font-semibold">
                        Uji Skenario Telemetri:
                      </span>
                    </div>
                    <div className="inline-flex rounded-lg border border-[#252B24] bg-[#0E110F] p-1 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => setSimulationScenario('normal')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                          simulationScenario === 'normal'
                            ? 'bg-[#1B3B2B] text-[#74C69D] font-bold shadow-xs'
                            : 'text-[#8E928A] hover:text-[#E0E2DC]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Kondisi Normal &amp; Optimal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSimulationScenario('anomaly')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                          simulationScenario === 'anomaly'
                            ? 'bg-[#B91C1C] text-white font-bold shadow-xs'
                            : 'text-[#8E928A] hover:text-[#E0E2DC]'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                        <span>Simulasi Gangguan (Lonjakan Gas / DO Drop)</span>
                      </button>
                    </div>
                  </div>

                  {/* Node Selector Bar */}
                  <div className="px-5 py-3 bg-[#111512] border-b border-[#252B24] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${simulationScenario === 'normal' ? 'bg-[#46A758] animate-pulse' : 'bg-[#E5484D] animate-ping'}`} />
                      <span className="text-[#8E928A] text-[11px]">telemetry.lumajang-field-01 // modbus-rs485 · live tick #{livePulseTick}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#0E110F] p-1 rounded-lg border border-[#252B24]">
                      {(['aquaculture', 'livestock', 'fertigation'] as TelemetryNodeKey[]).map((nodeKey) => (
                        <button
                          key={nodeKey}
                          type="button"
                          onClick={() => setActiveNode(nodeKey)}
                          className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                            activeNode === nodeKey
                              ? 'bg-[#1B3B2B] text-[#74C69D] font-bold'
                              : 'text-[#8E928A] hover:text-[#E0E2DC]'
                          }`}
                        >
                          {nodeKey === 'aquaculture' ? '01. Kolam & Biofilter' : nodeKey === 'livestock' ? '02. Kandang Ternak' : '03. Rak Fertigasi'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Node Body */}
                  <div className="p-6 space-y-5 bg-[#0E110F]">
                    {/* Anomaly Alert Banner if Active */}
                    {TELEMETRY_DATA[simulationScenario][activeNode].alertBanner && (
                      <div className="p-3.5 rounded-xl bg-[#E5484D]/15 border border-[#E5484D]/40 text-[#FF9496] font-mono text-xs flex items-center gap-2.5 animate-pulse">
                        <Bell className="w-4 h-4 shrink-0 text-[#E5484D]" />
                        <span>{TELEMETRY_DATA[simulationScenario][activeNode].alertBanner}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#252B24]">
                      <div>
                        <span className="font-mono text-[11px] text-[#74C69D] uppercase tracking-wider block">
                          {TELEMETRY_DATA[simulationScenario][activeNode].tag} · {TELEMETRY_DATA[simulationScenario][activeNode].location}
                        </span>
                        <h4 className="font-display font-bold text-lg text-[#F4F3EF] mt-0.5">
                          {TELEMETRY_DATA[simulationScenario][activeNode].title}
                        </h4>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] border ${
                        simulationScenario === 'normal'
                          ? 'bg-[#1B3B2B]/70 border-[#74C69D]/30 text-[#74C69D]'
                          : 'bg-[#B91C1C]/30 border-[#B91C1C]/60 text-[#FCA5A5]'
                      }`}>
                        <Radio className="w-3 h-3" />
                        <span>{simulationScenario === 'normal' ? 'Kanal Stabil (Interval 10s)' : 'Darurat: Intervensi Aktuator'}</span>
                      </span>
                    </div>

                    {/* Sensor Metric Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TELEMETRY_DATA[simulationScenario][activeNode].metrics.map((m, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#151916] border border-[#252B24] space-y-1">
                          <span className="text-[11px] font-mono text-[#8E928A] block truncate">{m.label}</span>
                          <span className={`text-lg font-mono font-bold block tabular-nums ${
                            m.status === 'critical' ? 'text-[#FF6369]' : m.status === 'warning' ? 'text-[#F5A623]' : 'text-[#F4F3EF]'
                          }`}>
                            {m.value}
                          </span>
                          <div className="pt-1 border-t border-[#252B24]/60 flex items-center justify-between text-[10px] font-mono">
                            <span className={
                              m.status === 'critical'
                                ? 'text-[#FF6369] font-bold'
                                : m.status === 'warning'
                                ? 'text-[#F5A623]'
                                : 'text-[#74C69D]'
                            }>
                              ● {m.status.toUpperCase()}
                            </span>
                            <span className="text-[#6E736A]">{m.benchmark}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actuator State List */}
                    <div className="p-4 rounded-xl bg-[#151916]/60 border border-[#252B24] space-y-2">
                      <span className="text-[11px] font-mono text-[#8E928A] uppercase tracking-wider block">
                        Status Aktuator &amp; Katup Mekanis Waktu-Nyata:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {TELEMETRY_DATA[simulationScenario][activeNode].actuators.map((act, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border ${
                              act.isAlert
                                ? 'bg-[#3A1416] border-[#E5484D]/60 text-[#FF9496]'
                                : 'bg-[#0E110F] border-[#252B24]/80 text-[#C8CBC2]'
                            }`}
                          >
                            <span>{act.label}</span>
                            <span className={`font-bold ${act.isAlert ? 'text-[#FF6369]' : 'text-[#74C69D]'}`}>
                              {act.state}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bab III: Komparasi Data Nyata Lapangan (Sebelum vs Sesudah IoT) */}
              <section id="p3-bab-3" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 03</span>
                  <span aria-hidden="true">/</span>
                  <span>Validasi Data Nyata</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  III. Komparasi Data: Sebelum vs. Sesudah Otomasi Presisi
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Nilai investasi perangkat keras tidak boleh diukur dari kecanggihan teknologinya semata, melainkan dari efisiensi biaya dan penurunan angka kerugian panen. Di Living Lab Lumajang, kami menguji performa selama 60 hari siklus operasional:
                </p>

                {/* Editorial Visual Data Chart: 24-Hour Fluctuation & ROI */}
                <div className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs text-[#2E7D5B] font-bold uppercase block">
                        GRAFIK TELEMETRI 24 JAM
                      </span>
                      <h4 className="font-display font-bold text-lg text-[#121311]">
                        Fluktuasi Kadar Gas Amonia (NH₃) Kandang Unggas
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-[#4A4D46]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-0.5 bg-[#B91C1C] border border-dashed border-[#B91C1C]" />
                        <span>Manual (Konvensional)</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-1 bg-[#1B3B2B] rounded-full" />
                        <span>RUMIVERSE CPS</span>
                      </span>
                    </div>
                  </div>

                  {/* SVG Chart Graphic */}
                  <div className="w-full bg-[#FAF9F6] p-4 rounded-xl border border-[#D8D6CE]/80 overflow-hidden">
                    <svg
                      viewBox="0 0 600 200"
                      className="w-full h-auto"
                      aria-label="Grafik perbandingan kadar amonia manual vs otomatis RUMIVERSE CPS"
                    >
                      {/* Grid Lines */}
                      <line x1="40" y1="30" x2="580" y2="30" stroke="#E2E0D8" strokeDasharray="3 3" />
                      <line x1="40" y1="80" x2="580" y2="80" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="4 4" />
                      <line x1="40" y1="130" x2="580" y2="130" stroke="#E2E0D8" strokeDasharray="3 3" />
                      <line x1="40" y1="170" x2="580" y2="170" stroke="#D8D6CE" strokeWidth="1.5" />

                      {/* Threshold Danger Label */}
                      <text x="45" y="75" fill="#B91C1C" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        AMBANG BAHAYA RESIKO KEMATIAN: 25 PPM
                      </text>
                      <text x="5" y="35" fill="#6B6E66" fontSize="10" fontFamily="monospace">35 ppm</text>
                      <text x="5" y="85" fill="#B91C1C" fontSize="10" fontFamily="monospace">25 ppm</text>
                      <text x="5" y="135" fill="#6B6E66" fontSize="10" fontFamily="monospace">15 ppm</text>
                      <text x="5" y="175" fill="#6B6E66" fontSize="10" fontFamily="monospace">0 ppm</text>

                      {/* Conventional Curve (Red dashed curve swinging wildly up to 36 ppm) */}
                      <path
                        d="M 40 140 Q 120 160, 180 120 T 280 60 T 360 40 T 440 90 T 520 45 T 580 85"
                        fill="none"
                        stroke="#B91C1C"
                        strokeWidth="2.5"
                        strokeDasharray="5 4"
                      />

                      {/* CPS Curve (Green solid curve locked safely between 8-12 ppm) */}
                      <path
                        d="M 40 152 Q 120 148, 180 150 T 280 145 T 360 148 T 440 146 T 520 147 T 580 149"
                        fill="none"
                        stroke="#1B3B2B"
                        strokeWidth="3.5"
                      />

                      {/* Time Labels */}
                      <text x="40" y="190" fill="#6B6E66" fontSize="10" fontFamily="monospace">00:00</text>
                      <text x="175" y="190" fill="#6B6E66" fontSize="10" fontFamily="monospace">06:00</text>
                      <text x="310" y="190" fill="#6B6E66" fontSize="10" fontFamily="monospace">12:00</text>
                      <text x="445" y="190" fill="#6B6E66" fontSize="10" fontFamily="monospace">18:00</text>
                      <text x="550" y="190" fill="#6B6E66" fontSize="10" fontFamily="monospace">24:00</text>
                    </svg>
                    <div className="pt-2 text-center text-xs font-mono text-[#6B6E66]">
                      Kurva hijau RUMIVERSE CPS stabil di bawah 12 ppm berkat pemicu otomatis blower begitu sensor membaca kenaikan gas.
                    </div>
                  </div>

                  {/* 4 Business Impact Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-1">
                      <span className="font-mono text-[10px] text-[#6B6E66] uppercase block">
                        Mortalitas Hewan / Ikan
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-[#1B3B2B]">-80.9%</span>
                        <span className="text-xs font-mono text-[#6B6E66] line-through">8.4%</span>
                      </div>
                      <span className="text-[11px] text-[#2E7D5B] font-mono block">Turun ke 1.6%</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-1">
                      <span className="font-mono text-[10px] text-[#6B6E66] uppercase block">
                        Efisiensi Air &amp; Pupuk
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-[#1B3B2B]">Hemat 42%</span>
                        <TrendingDown className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <span className="text-[11px] text-[#2E7D5B] font-mono block">Dosis sensor akurat</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-1">
                      <span className="font-mono text-[10px] text-[#6B6E66] uppercase block">
                        Respon Penanganan Krisis
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-[#1B3B2B]">&lt; 12 Detik</span>
                        <span className="text-xs font-mono text-[#6B6E66] line-through">3-6 Jam</span>
                      </div>
                      <span className="text-[11px] text-[#2E7D5B] font-mono block">Otomatis ke WhatsApp</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-1">
                      <span className="font-mono text-[10px] text-[#6B6E66] uppercase block">
                        Kualitas Bobot Panen
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-[#1B3B2B]">+14.2%</span>
                        <TrendingUp className="w-4 h-4 text-[#2E7D5B]" />
                      </div>
                      <span className="text-[11px] text-[#2E7D5B] font-mono block">Iklim mikro konsisten</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bab IV: Dari Prototipe ke Skala Komersial */}
              <section id="p3-bab-4" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 04</span>
                  <span aria-hidden="true">/</span>
                  <span>Peningkatan Skala (Scale-Up)</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  IV. Peningkatan Skala: Manifold Dosing Presisi &amp; Menara Aeroponik
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Prototipe di ruang terbuka Lumajang membuktikan prinsip dasarnya; langkah berikutnya adalah standardisasi untuk rumah kaca (*greenhouse*) komersial dan perkebunan presisi berkapasitas besar.
                </p>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Kami merancang **manifold instrumentasi stainless steel** dengan sensor aliran optik (*flowmeter*), pompa injeksi nutrisi peristaltik mikro, serta menara aeroponik vertikal yang menghemat luas lahan hingga 400% dibandingkan pertanian konvensional.
                </p>

                {/* FIG 05: Commercial Greenhouse Manifold */}
                <figure className="pt-2 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-sm">
                    <EditorialImage
                      src={GREENHOUSE_MANIFOLD_IMG}
                      alt="Manifold dosing nutrisi stainless steel dan menara hidroponik vertikal di dalam greenhouse modern"
                      className="w-full h-full object-cover"
                      fallbackTitle="Manifold Dosing Otomatis"
                      fallbackSubtitle="Penerapan skala rumah kaca komersial dengan menara tanaman vertikal bertingkat."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 05</strong> — Penerapan skala komersial: stasiun manifold manifold baja tahan karat dengan tabung pengukur laju aliran, pompa injeksi pupuk otomatis, dan jajaran menara aeroponik vertikal berdensitas tinggi.
                  </figcaption>
                </figure>
              </section>

              {/* Bab V: Spesifikasi Protokol & Perangkat Keras */}
              <section id="p3-bab-5" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 05</span>
                  <span aria-hidden="true">/</span>
                  <span>Spesifikasi Teknis Lapangan</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  V. Standar Komunikasi &amp; Manajemen Daya Mandiri
                </h2>

                <p className="text-base text-[#353732] leading-relaxed">
                  Kami tidak bergantung pada koneksi internet konsumen yang tidak stabil. Seluruh instrumen di lapangan menggunakan protokol komunikasi berstandar industri:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE]">
                    <span className="font-mono text-xs text-[#2E7D5B] font-semibold uppercase block mb-2">
                      Protokol &amp; Mikrokontroler
                    </span>
                    <ul className="space-y-2 text-sm text-[#2D2F2A]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Modbus RS485</strong>: Kebal interferensi elektromagnetik kabel panjang hingga 1.200 meter.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>LoRaWAN / ESP32-S3</strong>: Transmisi data nirkabel jarak jauh antar kebun tanpa biaya pulsa bulanan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>MQTT Broker Lokal</strong>: Tetap mencatat data lokal meskipun jaringan internet luar sedang padam.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE]">
                    <span className="font-mono text-xs text-[#2E7D5B] font-semibold uppercase block mb-2">
                      Catu Daya &amp; Keamanan Fisik
                    </span>
                    <ul className="space-y-2 text-sm text-[#2D2F2A]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Panel Surya &amp; Baterai LiFePO4</strong>: Menjaga sistem tetap menyala 24/7 tanpa henti saat pemadaman PLN.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Boks Polikarbonat IP66</strong>: Perlindungan total terhadap cipratan air hujan deras, terik matahari, dan serangga.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                        <span><strong>Fail-Safe Valve State</strong>: Katup otomatis menutup bila terjadi kehilangan daya mendadak untuk mencegah banjir.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Bottom Call to Action Box */}
              <footer id="p3-bab-cta" className="mt-14 p-7 sm:p-9 rounded-3xl bg-[#1B3B2B] text-[#F4F3EF] space-y-6 shadow-xl scroll-mt-20">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#74C69D] tracking-wider uppercase">
                    Langkah Berikutnya
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                    Ingin Menerapkan Instrumentasi Sensor &amp; Kendali Fisik?
                  </h3>
                  <p className="text-sm sm:text-base text-[#D0D6CF] max-w-xl leading-relaxed">
                    Mulai dari pemantauan suhu gudang, otomatisasi pompa kebun, hingga integrasi sensor lapangan ke dasbor digital. Kunjungi Living Lab kami di Lumajang atau jadwalkan diskusi teknis bersama kami.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F4F3EF]/20">
                  <span className="font-mono text-xs text-[#74C69D]">
                    Living Lab: Lumajang, Jawa Timur · Kunjungan &amp; Studi Kasus
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      if (onOpenConsultation) {
                        onOpenConsultation('precision-iot');
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F4F3EF] text-[#121311] hover:bg-[#FFFFFF] text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <span>Mulai Diskusi Proyek Instrumentasi / IoT</span>
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
