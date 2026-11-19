import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Droplets,
  Gauge,
  Layers,
  Radio,
  ShieldCheck,
  Thermometer,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialImage } from './EditorialImage';
import type { ConsultationFormValues } from '../utils/ecosystemData';

const COVER_IMG = '/src/assets/images/pilar-3-cyber-physical/cover.jpg';
const PROTOTYPE_DIAGRAM_IMG = '/src/assets/images/pilar-3-cyber-physical/p3.webp';
const FILTRATION_TANKS_IMG = '/src/assets/images/pilar-3-cyber-physical/p3 2.webp';
const GREENHOUSE_MANIFOLD_IMG = '/src/assets/images/pilar-3-cyber-physical/p3 3.webp';
const CONTROL_BOX_IMG = '/src/assets/images/pilar-3-cyber-physical/p3 4.webp';

interface Pillar3JournalModalProps {
  open: boolean;
  onClose: () => void;
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

type TelemetryNodeKey = 'livestock' | 'aquaculture' | 'fertigation';

interface TelemetryNodeData {
  title: string;
  tag: string;
  location: string;
  metrics: { label: string; value: string; status: 'normal' | 'optimal' | 'warning' }[];
  actuators: { label: string; state: string }[];
}

const TELEMETRY_NODES: Record<TelemetryNodeKey, TelemetryNodeData> = {
  livestock: {
    title: 'Simpul 01: Kandang Unggas Modular',
    tag: 'NODE-LIVESTOCK-01',
    location: 'Zona Barat Living Lab Lumajang',
    metrics: [
      { label: 'Suhu Lingkungan', value: '28.4 °C', status: 'normal' },
      { label: 'Kelembaban Relatif', value: '72 %RH', status: 'normal' },
      { label: 'Kadar Gas Amonia (NH3)', value: '8.2 ppm', status: 'optimal' },
      { label: 'Sensor Berat Pakan', value: '14.8 kg', status: 'normal' },
    ],
    actuators: [
      { label: 'Blower Sirkulasi Udara', state: 'Aktif Siklus Otomatis (5m/jam)' },
      { label: 'Dispensasi Pakan Gravitasi', state: 'Siaga (Jadwal 16:00 WIB)' },
    ],
  },
  aquaculture: {
    title: 'Simpul 02: Sirkulasi Kolam Ikan & Biofilter',
    tag: 'NODE-AQUA-02',
    location: 'Bak Beton Sentral Living Lab',
    metrics: [
      { label: 'Suhu Air Kolam', value: '25.6 °C', status: 'optimal' },
      { label: 'Keasaman Air (pH)', value: '7.18 pH', status: 'optimal' },
      { label: 'Oksigen Terlarut (DO)', value: '6.4 mg/L', status: 'optimal' },
      { label: 'Kekeruhan (Turbidity)', value: '12 NTU', status: 'normal' },
    ],
    actuators: [
      { label: 'Pompa Submersible Sirkulasi', state: 'ON (Debit: 14.2 L/menit)' },
      { label: 'Solenoid Valve Drain Bak Pasir', state: 'STANDBY (Tekanan: 1.6 Bar)' },
    ],
  },
  fertigation: {
    title: 'Simpul 03: Rak Fertigasi & Hidroponik NFT',
    tag: 'NODE-HYDROPONIC-03',
    location: 'Sayap Timur & Greenhouse Mini',
    metrics: [
      { label: 'Konduktivitas Nutrisi (EC)', value: '1.85 mS/cm', status: 'optimal' },
      { label: 'Level Tandon Nutrisi', value: '84 %', status: 'normal' },
      { label: 'Tekanan Pipa Manifold', value: '1.8 Bar', status: 'normal' },
      { label: 'Intensitas Cahaya (PAR)', value: '720 µmol/m²/s', status: 'optimal' },
    ],
    actuators: [
      { label: 'Dosing Pump Pupuk A & B', state: 'OFF (Terkalibrasi Otomatis)' },
      { label: 'Irigasi Tetes Saluran Atas', state: 'ON (Interval 30 Detik)' },
    ],
  },
};

export function Pillar3JournalModal({
  open,
  onClose,
  onOpenConsultation,
}: Pillar3JournalModalProps) {
  const [activeNode, setActiveNode] = useState<TelemetryNodeKey>('aquaculture');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

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
              <header className="space-y-5 pb-8 border-b border-[#D8D6CE]">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Dokumentasi Sistem</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>Living Lab Lumajang</span>
                  <span aria-hidden="true" className="text-[#A1A39B]">·</span>
                  <span>6 Menit Baca</span>
                </div>

                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[46px] tracking-tight text-[#121311] leading-[1.15]">
                  Cyber-Physical Systems: Menjembatani Baris Kode ke Tanah, Air, dan Udara Lapangan
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-[#6B6E66]">
                  <span>Penulis: Abu Devis J.R. — Systems Architect</span>
                  <span>RUMIVERSE / PILAR 03</span>
                </div>

                {/* Quick Jump Table of Contents (Pills) */}
                <div className="pt-3 border-t border-[#D8D6CE]/80">
                  <span className="font-mono text-[11px] text-[#6B6E66] uppercase tracking-wider block mb-2">
                    Lompat Cepat ke Bab:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'p3-bab-1', label: '§ I. Tiga Simpul' },
                      { id: 'p3-bab-2', label: '§ II. Boks IP66 & Telemetri' },
                      { id: 'p3-bab-3', label: '§ III. Rekayasa Hidrolik' },
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

              {/* Abstract Blockquote */}
              <blockquote className="my-6 p-6 sm:p-7 rounded-2xl bg-[#F4F3EF] border-l-4 border-[#1B3B2B] font-display text-base sm:text-lg text-[#2D2F2A] leading-relaxed italic shadow-2xs">
                &ldquo;Banyak rekayasawan perangkat lunak nyaman merancang antarmuka di ruangan berpendingin udara, namun terhenti ketika berhadapan dengan debu lapangan, fluktuasi tegangan listrik desa, kelembaban tropis, dan kotoran ternak. Di RUMIVERSE, kami menguji setiap sensor dan kode kendali secara langsung di tanah Lumajang—membuktikan bahwa otomasi presisi bukan sekadar teori di atas kertas.&rdquo;
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

                {/* Interactive Simulated Field Telemetry Node Inspector */}
                <div className="mt-6 rounded-2xl border border-[#2D332B] bg-[#0E110F] text-[#E0E2DC] overflow-hidden shadow-xl">
                  {/* Panel Header */}
                  <div className="px-5 py-3.5 bg-[#151916] border-b border-[#252B24] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#46A758] animate-pulse" />
                      <span className="text-[#8E928A] text-[11px]">telemetry.lumajang-field-01 // modbus-rs485</span>
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#252B24]">
                      <div>
                        <span className="font-mono text-[11px] text-[#74C69D] uppercase tracking-wider block">
                          {TELEMETRY_NODES[activeNode].tag} · {TELEMETRY_NODES[activeNode].location}
                        </span>
                        <h4 className="font-display font-bold text-lg text-[#F4F3EF] mt-0.5">
                          {TELEMETRY_NODES[activeNode].title}
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B3B2B]/70 border border-[#74C69D]/30 text-[#74C69D] font-mono text-[11px]">
                        <Radio className="w-3 h-3" />
                        <span>Kanal Aktif (Transmisi 10 Detik)</span>
                      </span>
                    </div>

                    {/* Sensor Metric Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TELEMETRY_NODES[activeNode].metrics.map((m, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#151916] border border-[#252B24]">
                          <span className="text-[11px] font-mono text-[#8E928A] block truncate">{m.label}</span>
                          <span className="text-lg font-mono font-bold text-[#F4F3EF] mt-1 block tabular-nums">
                            {m.value}
                          </span>
                          <span className="text-[10px] font-mono text-[#74C69D] uppercase block mt-1">
                            ● Status {m.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Actuator State List */}
                    <div className="p-4 rounded-xl bg-[#151916]/60 border border-[#252B24] space-y-2">
                      <span className="text-[11px] font-mono text-[#8E928A] uppercase tracking-wider block">
                        Status Aktuator &amp; Katup Mekanis:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {TELEMETRY_NODES[activeNode].actuators.map((act, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#0E110F] border border-[#252B24]/80">
                            <span className="text-[#C8CBC2]">{act.label}</span>
                            <span className="text-[#74C69D] font-bold">{act.state}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bab III: Filtrasi Hidrolik & Sirkulasi Presisi */}
              <section id="p3-bab-3" className="space-y-5 pt-8 border-t border-[#D8D6CE] scroll-mt-20">
                <div className="flex items-center gap-2 font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  <span>Bagian 03</span>
                  <span aria-hidden="true">/</span>
                  <span>Rekayasa Hidrolik</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                  III. Rekayasa Hidrolik: Filtrasi Pasir Silika &amp; Karbon Aktif
                </h2>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Menjaga air kolam tetap jernih dan bebas amonia tidak boleh mengandalkan pergantian air manual yang boros dan melelahkan. Kami mengintegrasikan tangki silinder filtrasi ganda:
                </p>

                <p className="text-base text-[#353732] leading-[1.8]">
                  Tabung abu-abu pertama diisi <strong>pasir silika bertingkat</strong> untuk menyaring partikel padat kotoran ikan, sementara tabung kedua diisi <strong>karbon aktif dan batu zeolit</strong> untuk mengikat zat racun terlarut. Manometer tekanan terpasang di setiap saluran masuk untuk memantau waktu pencucian balik (*backwash*) secara otomatis melalui katup solenoid.
                </p>

                {/* FIG 04: Industrial Filtration System */}
                <figure className="pt-2 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-sm">
                    <EditorialImage
                      src={FILTRATION_TANKS_IMG}
                      alt="Sistem filtrasi tangki ganda dengan pasir silika dan karbon aktif terintegrasi dengan pompa sirkulasi"
                      className="w-full h-full object-cover"
                      fallbackTitle="Sistem Filtrasi Tangki Ganda"
                      fallbackSubtitle="Tangki penyaring partikel silika dan karbon aktif dengan pengukur tekanan analog."
                    />
                  </div>
                  <figcaption className="font-mono text-xs text-[#6B6E66] px-1">
                    <strong className="text-[#121311]">FIG. 04</strong> — Stasiun pengolahan air Living Lab: tabung silinder filtrasi ganda bersanding dengan panel kontrol listrik di tiang sentral dan instalasi fertigasi sayuran di sisi kanan.
                  </figcaption>
                </figure>
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
