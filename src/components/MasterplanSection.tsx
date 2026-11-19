import { useState } from 'react';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  Droplets,
  Feather,
  Layers,
  LayoutDashboard,
  Leaf,
  Maximize2,
  Radio,
  RefreshCw,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MaskedHeading } from './MaskedHeading';
import { EditorialImage } from './EditorialImage';
import type { ConsultationFormValues } from '../utils/ecosystemData';
import masterplanDroneWebp from '../assets/images/masterplan/masterplan.webp';
import masterplanBlueprintJpg from '../assets/images/masterplan/masterplan.jpg';

interface MasterplanSectionProps {
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

type ViewModeKey = 'circular' | 'blueprint';

interface MasterplanZone {
  id: string;
  number: string;
  name: string;
  shortName: string;
  tag: string;
  role: string;
  hardware: string[];
  circularOutput: string;
  metric: { value: string; label: string };
  icon: typeof Feather;
  pilarIntegration: {
    p1: string;
    p2: string;
    p3: string;
  };
}

interface ViewModeConfig {
  id: ViewModeKey;
  label: string;
  badge: string;
  image: string;
  alt: string;
  aspectClass: string;
  pins: Record<string, { x: number; y: number }>;
}

const VIEW_MODES: Record<ViewModeKey, ViewModeConfig> = {
  circular: {
    id: 'circular',
    label: 'Foto Udara Drone (16:9)',
    badge: 'FOTO UDARA REALISTIS 16:9',
    image: masterplanDroneWebp,
    alt: 'Foto udara arsitektural drone kawasan Smart Integrated Eco-Farm Lumajang 16:9 tanpa label teks',
    aspectClass: 'aspect-[16/9]',
    pins: {
      'smart-coop': { x: 23, y: 28 }, // Kandang Ayam
      'maggot-bsf': { x: 51, y: 22 }, // Maggot BSF
      'aquaculture-walet': { x: 78, y: 46 }, // Kolam & Walet
      'hydroponics-padi': { x: 34, y: 68 }, // Hidroponik & Padi
      'microgrid-energy': { x: 72, y: 72 }, // Mikrogrid Energi
    },
  },
  blueprint: {
    id: 'blueprint',
    label: 'Cetak Biru Isometrik 3D',
    badge: 'BLUEPRINT TEKNIS 3D',
    image: masterplanBlueprintJpg,
    alt: 'Cetak biru arsitektur 3D isometrik Smart Integrated Eco-Farm RUMIVERSE Lumajang',
    aspectClass: 'aspect-[16/10]',
    pins: {
      'smart-coop': { x: 19, y: 22 },
      'maggot-bsf': { x: 33, y: 44 },
      'aquaculture-walet': { x: 50, y: 30 },
      'hydroponics-padi': { x: 82, y: 26 },
      'microgrid-energy': { x: 14, y: 76 },
    },
  },
};

const ZONES: MasterplanZone[] = [
  {
    id: 'smart-coop',
    number: '01',
    name: 'Kandang Ayam Smart Coop & Ruminansia',
    shortName: 'Kandang Ayam',
    tag: 'FASILITAS PETERNAKAN TERTUTUP',
    role: 'Kandang ayam petelur dan pedaging dengan ventilasi otomatis, atap surya, pemantauan kadar amonia (NH3), dan dispenser pakan otomatis berbasis jadwal.',
    hardware: [
      'Sensor Gas Amonia (NH3) & Kelembaban Udara',
      'Atap Panel Surya Fotovoltaik Terpadu',
      'Dispensasi Pakan Otomatis Berbasis Sensor Berat',
      'Saluran Talang Pembuangan Kotoran Basah Gravitasi',
    ],
    circularOutput: 'Limbah kotoran segar dialirkan langsung tanpa jeda ke unit biokonversi maggot BSF.',
    metric: { value: '100%', label: 'Kotoran dialirkan ke maggot' },
    icon: Feather,
    pilarIntegration: {
      p1: 'Dasbor pemantauan real-time status suhu, amonia, dan tombol dispensasi darurat di ponsel.',
      p2: 'AI Agent memprediksi lonjakan gas amonia & menghitung ransum pakan otomatis berbasis bobot ternak harian.',
      p3: 'Sensor gas amonia (NH3), blower ventilasi otomatis, timbangan digital talang pakan, dan solar PV atap.',
    },
  },
  {
    id: 'maggot-bsf',
    number: '02',
    name: 'Biokonversi Maggot BSF (Black Soldier Fly)',
    shortName: 'Maggot BSF',
    tag: 'UNIT REKAYASA BIOMASSA PROTEIN',
    role: 'Pusat pengurai limbah biologis: larva lalat tentara hitam mengonversi kotoran ternak dan sisa organik menjadi biomassa kaya protein kasar (42%) dalam 12–14 hari.',
    hardware: [
      'Bioreaktor Larva dengan Kendali Kelembaban Substrat',
      'Separator Otomatis Pemisah Pupa & Kasgot (Pupuk Organik)',
      'Sistem Ventilasi Penyaring Bau Berbasis Karbon Aktif',
    ],
    circularOutput: 'Larva segar bernutrisi tinggi dijadikan pakan utama mandiri untuk ayam dan kolam ikan.',
    metric: { value: '42%', label: 'Kandungan Protein Alami Kasar' },
    icon: RefreshCw,
    pilarIntegration: {
      p1: 'Pencatatan batch biokonversi, estimasi tanggal panen pupa, dan inventaris kasgot di web app.',
      p2: 'Model AI memprediksi laju konsumsi limbah dan menjadwalkan aktivasi sistem separator pupa secara optimal.',
      p3: 'Bioreaktor kendali kelembaban substrat, filter karbon aktif otomatis, dan sensor suhu biomassa.',
    },
  },
  {
    id: 'aquaculture-walet',
    number: '03',
    name: 'Kolam Akuakultur & Rumah Walet Terpadu',
    shortName: 'Kolam & Walet',
    tag: 'SENTRAL BIOFILTER AIR TAWAR',
    role: 'Kolam ikan nila dan gurame beraerasi surya di bawah rumah walet 3 lantai berarsitektur modern. Air kaya feses ikan dialirkan secara kontinu sebagai sumber nitrat bagi tanaman.',
    hardware: [
      'Probe Kualitas Air (pH, Dissolved Oxygen, Turbiditas)',
      'Aerator Venturi & Air Mancur Bertenaga Surya',
      'Sensor Suhu & Kelembaban Ultrasonik Mikro Rumah Walet',
    ],
    circularOutput: 'Air buangan kolam dipompa ke rak hidroponik dan sawah mina padi untuk penyerapan nutrisi.',
    metric: { value: '14.2 L/m', label: 'Debit Sirkulasi Biofilter' },
    icon: Droplets,
    pilarIntegration: {
      p1: 'Visualisasi grafis DO (dissolved oxygen), tren pH air, dan kontrol audio pemanggil walet dari web/mobile.',
      p2: 'AI Agent mendeteksi anomali oksigen air terlarut dan otomatis memicu aerasi surya sebelum membahayakan ikan.',
      p3: 'Probe multiparameter air, aerator venturi bertenaga surya, dan pelembab ultrasonik rumah walet.',
    },
  },
  {
    id: 'hydroponics-padi',
    number: '04',
    name: 'Hidroponik Bertingkat & Sawah Mina Padi',
    shortName: 'Hidroponik & Padi',
    tag: 'AGROTEKNOLOGI TANAMAN & PANGAN',
    role: 'Talang sayuran bertingkat dan petak sawah terintegrasi dengan ikan kecil dan bebek. Akar tanaman menyerap nitrat dan fosfat, menghasilkan panen sayur serta memurnikan kembali air.',
    hardware: [
      'Manifold Irigasi Tetes Baja Tahan Karat',
      'Katup Solenoid Otomatis Terhubung Waktu & Sensor EC',
      'Saluran Resapan Gravitasi Menuju Tandon Air Bersih',
    ],
    circularOutput: 'Air bersih terfiltrasi dialirkan kembali ke kolam ternak dan instalasi minum.',
    metric: { value: '4x', label: 'Densitas Lahan Vertikal' },
    icon: Leaf,
    pilarIntegration: {
      p1: 'Manajemen zona irigasi per blok bedengan dan pelacakan jadwal panen sayuran premium di dashboard web.',
      p2: 'AI menganalisis pola cuaca & tren sensor EC harian untuk menyesuaikan durasi penyiraman otomatis.',
      p3: 'Katup solenoid otomatis LoRa, manifold baja tahan karat, dan sensor konduktivitas listrik (EC/TDS).',
    },
  },
  {
    id: 'microgrid-energy',
    number: '05',
    name: 'Mikrogrid Energi Mandiri (Surya, Angin & BioDAS)',
    shortName: 'Mikrogrid Energi',
    tag: 'SUMBER DAYA TERBARUKAN 24/7',
    role: 'Pembangkit listrik mikrogrid terpadu: panel surya atap, kincir angin mini, dan turbin piko-hidro BioDAS pada arus sungai buatan memastikan 100% instrumen lapangan beroperasi tanpa ketergantungan PLN.',
    hardware: [
      'Generator Mikrohidro Aliran Arus Deras (BioDAS)',
      'Array Panel Surya Fotovoltaik Monokristalin',
      'Turbin Angin Horisontal 3 Sudu Ringan',
      'Bank Baterai Lithium Besi Fosfat (LiFePO4) & Smart BMS',
    ],
    circularOutput: 'Menyuplai daya mandiri untuk seluruh pompa, katup solenoid, dan pemancar sensor LoRa/WiFi.',
    metric: { value: '0 g/kWh', label: 'Emisi Karbon Operasional' },
    icon: Zap,
    pilarIntegration: {
      p1: 'Dasbor neraca daya: produksi surya, putaran kincir angin, debit BioDAS, dan kapasitas sisa baterai.',
      p2: 'Smart Grid AI mendistribusikan beban prioritas saat cuaca mendung agar pompa vital tidak pernah padam.',
      p3: 'Turbin piko-hidro arus deras BioDAS, inverter surya fotovoltaik, sensor arus Hall, dan baterai LiFePO4.',
    },
  },
];

export function MasterplanSection({ onOpenConsultation }: MasterplanSectionProps) {
  const [viewMode, setViewMode] = useState<ViewModeKey>('circular');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('smart-coop');
  const [detailTab, setDetailTab] = useState<'hardware' | 'synergy'>('hardware');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentMode = VIEW_MODES[viewMode];
  const selectedZone = ZONES.find((z) => z.id === selectedZoneId) ?? ZONES[0];
  const ZoneIcon = selectedZone.icon;

  return (
    <section id="masterplan" className="border-b border-[#D8D6CE] bg-[#F4F3EF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header with Long-Term Horizon Status & Modular Readiness */}
        <div className="px-6 py-8 sm:px-10 lg:px-12 border-b border-[#D8D6CE] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-[#2E7D5B] tracking-wider uppercase font-semibold">
                03. CETAK BIRU SPASIAL // LIVING LAB RUMIVERSE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1B3B2B] text-[#74C69D] border border-[#74C69D]/30 font-mono text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-pulse" />
                STATUS: CETAK BIRU ARSITEKTUR &amp; VISI JANGKA PANJANG (HORIZON 2030–2035)
              </span>
            </div>

            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121311] tracking-tight"
            >
              Smart Integrated Eco-Farm Lumajang
            </MaskedHeading>

            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              Masterplan kawasan terpadu ini dirancang sebagai cetak biru arsitektur dan peta jalan strategis jangka panjang (<strong>Horizon 2030–2035</strong>). Living lab di Lumajang ini menjadi sarana uji coba rekayasa kami untuk mengukur batas efisiensi sistem siklus tertutup (<em>closed-loop zero-waste</em>)—dengan target desain memangkas hingga 70% ketergantungan pada pakan pabrikan serta menyuplai kebutuhan energi instrumen secara mandiri.
            </p>

            {/* Modular Readiness Callout */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#EAE8E1]/90 border border-[#D8D6CE] text-xs sm:text-sm text-[#2D2F2A] space-y-1">
              <span className="font-mono text-[11px] font-bold text-[#1B3B2B] uppercase tracking-wider block">
                ● Adopsi Bertahap &amp; Siap Bangun Hari Ini:
              </span>
              <p className="text-xs text-[#4A4D46] leading-relaxed">
                Meskipun integrasi seluruh kawasan merupakan visi jangka panjang, setiap modul teknologinya—seperti kandang ayam pintar, bioreaktor maggot BSF, irigasi presisi hidroponik, hingga pemantauan mikrogrid mandiri—sudah berarsitektur modular dan siap diadopsi serta dibangun di lahan Anda secara terpisah sekarang.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden xl:inline text-xs font-mono text-[#6B6E66]">
              LOKASI R&amp;D: LUMAJANG · 8°08&apos;S 113°13&apos;E
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D8D6CE] hover:border-[#121311] text-xs font-mono text-[#121311] hover:bg-[#EAE8E1] transition-all cursor-pointer shadow-2xs"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>Perbesar Peta</span>
            </button>
          </div>
        </div>

        {/* Titik Temu Tiga Pilar Rekayasa RUMIVERSE Banner */}
        <div className="px-6 py-5 sm:px-10 lg:px-12 border-b border-[#D8D6CE] bg-[#FAF9F6]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-[#2E7D5B] font-bold tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
              Titik Temu Tiga Pilar Rekayasa RUMIVERSE
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-[#6B6E66]">
              SATU EKOSISTEM DIGITAL-FISIK TERPADU
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#121311] text-[#F4F3EF]">
                  PILAR 01
                </span>
                <span className="font-display font-semibold text-xs text-[#121311] flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#2E7D5B]" />
                  Web &amp; Mobile Dashboard
                </span>
              </div>
              <p className="text-[11px] text-[#4A4D46] leading-relaxed">
                Menjadi dasbor kendali pusat real-time dan aplikasi pemantauan harian bagi operator lapangan di genggaman.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                  PILAR 02
                </span>
                <span className="font-display font-semibold text-xs text-[#121311] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#74C69D]" />
                  Autonomous AI Workforce
                </span>
              </div>
              <p className="text-[11px] text-[#4A4D46] leading-relaxed">
                Menganalisis pola pakan, memprediksi lonjakan amonia, dan mengirim ringkasan operasional otomatis ke WhatsApp pengelola.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#2E7D5B] text-white">
                  PILAR 03
                </span>
                <span className="font-display font-semibold text-xs text-[#121311] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#2E7D5B]" />
                  Precision IoT &amp; Cyber-Physical
                </span>
              </div>
              <p className="text-[11px] text-[#4A4D46] leading-relaxed">
                Perangkat sensor mikroklimat, katup solenoid otomatis, dan turbin pembangkit fisik di kelima zona kawasan.
              </p>
            </div>
          </div>
        </div>

        {/* Split Layout: Masterplan Visualizer (Left 65%) + Zone Detail Inspector (Right 35%) */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[#D8D6CE] bg-[#FAF9F6]">
          {/* Top Metadata Blueprint Bar with Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#D8D6CE] font-mono text-xs text-[#4A4D46]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#1B3B2B] text-[#74C69D] text-[11px] font-bold tracking-wider">
                {currentMode.badge}
              </span>
              <span className="hidden sm:inline">
                RUMIVERSE LIVING LAB // MASTERPLAN 5 ZONA SIRKULAR
              </span>
            </div>

            {/* View Mode Switcher Pill */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EAE8E1] border border-[#D8D6CE]">
              <button
                type="button"
                onClick={() => setViewMode('circular')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewMode === 'circular'
                    ? 'bg-[#1B3B2B] text-[#74C69D] shadow-xs'
                    : 'text-[#4A4D46] hover:text-[#121311] hover:bg-[#FAF9F6]/60'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Foto Udara Drone (16:9)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('blueprint')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'bg-[#1B3B2B] text-[#74C69D] shadow-xs'
                    : 'text-[#4A4D46] hover:text-[#121311] hover:bg-[#FAF9F6]/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cetak Biru 3D</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri (~62-65%): Map Visualizer + 5 Tombol Zona Ringkas di Luar Gambar (Sticky pada Desktop) */}
            <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24 self-start space-y-4">
              {/* Map Container */}
              <div className="relative aspect-[16/9] max-h-[480px] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#0E1210] shadow-md group">
                <EditorialImage
                  key={currentMode.id}
                  src={currentMode.image}
                  alt={currentMode.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  fallbackTitle="Smart Integrated Eco-Farm Masterplan"
                  fallbackSubtitle="Visualisasi tata letak arsitektur terpadu Living Lab Lumajang."
                />

                {/* Aesthetic Technical Lighting & Vignette Overlay */}
                <div className="absolute inset-0 bg-[#0E1210]/10 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(14,18,16,0.3)_100%] pointer-events-none" />

                {/* Technical Framing HUD Corner Marks (Lifted to avoid container rounded clipping) */}
                {viewMode === 'circular' ? (
                  <>
                    <div className="absolute top-3.5 sm:top-4 left-4 sm:left-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      ┌ [DRONE ALT: 120M]
                    </div>
                    <div className="absolute top-3.5 sm:top-4 right-4 sm:right-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      [GPS: 8°08&apos;S 113°13&apos;E] ┐
                    </div>
                    <div className="absolute bottom-4 sm:bottom-4.5 left-4 sm:left-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      └ [HEADING: 320° NW]
                    </div>
                    <div className="absolute bottom-4 sm:bottom-4.5 right-4 sm:right-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      [LUMAJANG LIVING LAB] ┘
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-3.5 sm:top-4 left-4 sm:left-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      ┌ [NW: 8°08&apos;S]
                    </div>
                    <div className="absolute top-3.5 sm:top-4 right-4 sm:right-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      [NE: 113°13&apos;E] ┐
                    </div>
                    <div className="absolute bottom-4 sm:bottom-4.5 left-4 sm:left-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      └ [SW: ZONE-05]
                    </div>
                    <div className="absolute bottom-4 sm:bottom-4.5 right-4 sm:right-4.5 font-mono text-[9px] text-white/90 tracking-widest pointer-events-none select-none bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 shadow-sm">
                      [SE: SCALE 1:500] ┘
                    </div>
                  </>
                )}

                {/* Adaptive Animated Pins on the Map with Subtle Pulse ONLY on Active Pin */}
                {ZONES.map((zone) => {
                  const isActive = zone.id === selectedZoneId;
                  const pinPos = currentMode.pins[zone.id] ?? { x: 50, y: 50 };

                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer focus:outline-none transition-all duration-500 ease-out"
                      aria-label={`Pilih ${zone.name}`}
                    >
                      <span className="relative flex items-center justify-center">
                        {/* Subtle Pulse Aura ONLY on Active Pin */}
                        {isActive && (
                          <>
                            {/* Outer soft breathing halo */}
                            <span className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#74C69D]/30 animate-pulse pointer-events-none" />
                            {/* Gentle ping ripple */}
                            <span className="absolute -inset-1 rounded-full bg-[#74C69D]/50 animate-ping opacity-60 pointer-events-none" />
                          </>
                        )}

                        {/* High-Contrast Pin Badge */}
                        <span
                          className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 text-[10px] sm:text-[11px] font-mono font-bold transition-all ${
                            isActive
                              ? 'bg-[#1B3B2B] border-[#74C69D] text-[#74C69D] scale-110 shadow-[0_0_16px_rgba(116,198,157,0.7)] ring-2 ring-[#74C69D]/50'
                              : 'bg-[#121311]/90 border-white text-white hover:border-[#74C69D] hover:text-[#74C69D] hover:scale-105 shadow-md'
                          }`}
                        >
                          {zone.number}
                        </span>
                      </span>

                      {/* Tooltip on Hover */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block px-2.5 py-1 rounded bg-[#121311]/95 text-white font-mono text-[10px] tracking-wide whitespace-nowrap shadow-xl pointer-events-none z-30 border border-white/20">
                        {zone.number} · {zone.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Grid 5 Tombol Zona Ringkas di Luar Gambar (Tidak Terpotong, Height Uniform) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {ZONES.map((zone, idx) => {
                  const isSelected = zone.id === selectedZoneId;
                  const isLastOdd = idx === 4; // 5th item spans 2 cols on mobile
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                        isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        isSelected
                          ? 'bg-[#1B3B2B] text-[#F4F3EF] border-[#1B3B2B] shadow-xs scale-[1.01]'
                          : 'bg-[#F4F3EF] hover:bg-[#EAE8E1] text-[#242622] border-[#D8D6CE]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-[#FAF9F6] text-[#1B3B2B]'
                              : 'bg-[#FAF9F6] text-[#2E7D5B] border border-[#D8D6CE]'
                          }`}
                        >
                          ZONA {zone.number}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-pulse" />
                        )}
                      </div>
                      <span className="font-display font-semibold text-[11px] sm:text-xs leading-snug break-words block mt-2">
                        {zone.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              <figcaption className="font-mono text-[11px] text-[#6B6E66] px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <span>
                  <strong className="text-[#121311]">FIG. 04</strong> —{' '}
                  {viewMode === 'circular'
                    ? 'Foto udara arsitektural drone kawasan Living Lab Lumajang (16:9).'
                    : 'Model isometrik spasial Smart Integrated Eco-Farm RUMIVERSE Lumajang.'}
                </span>
                <span className="text-[#2E7D5B] font-semibold shrink-0">
                  ● Klik Pin / Tombol untuk Membedah Zona
                </span>
              </figcaption>
            </div>

            {/* Kolom Kanan (~35-38%): Panel Detail Zona Aktif (In-Place Inspector) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedZone.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-5 shadow-sm"
                >
                  {/* Header Zona & Ikon Khusus */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D] font-mono text-[11px] font-bold">
                          ZONA {selectedZone.number}
                        </span>
                        <span className="font-mono text-[10px] text-[#2E7D5B] uppercase tracking-wider font-semibold">
                          {selectedZone.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121311] leading-snug">
                        {selectedZone.name}
                      </h3>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] text-[#2E7D5B] shrink-0">
                      <ZoneIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                    {selectedZone.role}
                  </p>

                  {/* Tab Selector: Perangkat & Sensor vs Sinergi 3 Pilar */}
                  <div className="space-y-2.5">
                    <div className="flex items-center p-1 rounded-xl bg-[#EAE8E1] border border-[#D8D6CE]">
                      <button
                        type="button"
                        onClick={() => setDetailTab('hardware')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          detailTab === 'hardware'
                            ? 'bg-[#1B3B2B] text-[#74C69D] shadow-xs'
                            : 'text-[#4A4D46] hover:text-[#121311]'
                        }`}
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Perangkat &amp; Sensor</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab('synergy')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          detailTab === 'synergy'
                            ? 'bg-[#1B3B2B] text-[#74C69D] shadow-xs'
                            : 'text-[#4A4D46] hover:text-[#121311]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Sinergi 3 Pilar</span>
                      </button>
                    </div>

                    {/* Tab Content Box */}
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] min-h-[142px] flex flex-col justify-center">
                      {detailTab === 'hardware' ? (
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] text-[#2E7D5B] font-bold uppercase tracking-wider block">
                            Instrumentasi &amp; Sensor Fisik Terpasang:
                          </span>
                          <ul className="space-y-1.5 text-xs text-[#2D2F2A]">
                            {selectedZone.hardware.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] text-[#1B3B2B] font-bold uppercase tracking-wider block">
                            Konvergensi Digital-Fisik 3 Pilar:
                          </span>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-start gap-2">
                              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#121311] text-[#F4F3EF] shrink-0 mt-0.5">
                                P1 WEB
                              </span>
                              <span className="text-[11px] text-[#4A4D46] leading-snug">
                                {selectedZone.pilarIntegration.p1}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D] shrink-0 mt-0.5">
                                P2 AI
                              </span>
                              <span className="text-[11px] text-[#4A4D46] leading-snug">
                                {selectedZone.pilarIntegration.p2}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#2E7D5B] text-white shrink-0 mt-0.5">
                                P3 IOT
                              </span>
                              <span className="text-[11px] text-[#4A4D46] leading-snug">
                                {selectedZone.pilarIntegration.p3}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Aliran Siklus Bio-Ekosistem & Metrik Terpadu (Single Compact Card) */}
                  <div className="p-4 rounded-xl bg-[#1B3B2B] text-[#F4F3EF] border border-[#1B3B2B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                    <div className="space-y-1 sm:max-w-[62%]">
                      <div className="flex items-center gap-1.5 text-[#74C69D] font-mono text-[10px] font-semibold tracking-wider uppercase">
                        <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                        <span>ALIRAN SIKLUS BIO-EKOSISTEM</span>
                      </div>
                      <p className="text-xs text-[#E2E5E0] leading-snug">
                        {selectedZone.circularOutput}
                      </p>
                    </div>

                    <div className="sm:border-l sm:border-[#74C69D]/25 sm:pl-4 sm:text-right shrink-0">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-[#74C69D] tabular-nums block leading-tight">
                        {selectedZone.metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-[#D8D6CE] uppercase tracking-wide block mt-0.5">
                        {selectedZone.metric.label}
                      </span>
                    </div>
                  </div>

                  {/* Tombol Konsultasi Replikasi */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenConsultation) {
                        onOpenConsultation('precision-iot');
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#121311] text-[#F4F3EF] hover:bg-[#1B3B2B] text-xs font-semibold tracking-tight transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
                  >
                    <span>Konsultasi Replikasi Kawasan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#74C69D]" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Circular Closed Loop Visual Stepper */}
        <div className="p-6 sm:p-10 lg:p-12 bg-[#FAF9F6]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs text-[#2E7D5B] tracking-wider uppercase font-semibold">
                Prinsip Tanpa Sisa (Zero Organic Waste)
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121311] tracking-tight">
                Enam Tahapan Rantai Pasok Biologis Mandiri
              </h3>
              <p className="text-sm text-[#4A4D46] leading-relaxed">
                Setiap residu dari satu zona diolah menjadi masukan bernutrisi bagi zona berikutnya. Siklus biologis ini menargetkan pemangkasan hingga 70% ketergantungan pada pakan pabrikan melalui biokonversi mandiri yang seluruh simpulnya dikendalikan sensor dan otomasi perangkat lunak.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-[#6B6E66] border border-[#D8D6CE] bg-[#F4F3EF] px-3 py-1.5 rounded-lg shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
              <span>DIAGRAM ALUR SIKLUS (01 → 06 ↺ 01)</span>
            </div>
          </div>

          {/* 6 Sequential Flow Cards with Software/AI Control and Directional Arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                step: '01',
                title: 'Ternak & Unggas',
                desc: 'Pemeliharaan ayam & ruminansia dengan pakan presisi',
                techControl: 'Sensor amonia & pakan via app mobile',
              },
              {
                step: '02',
                title: 'Kotoran Segar',
                desc: 'Talang gravitasi mengalirkan feses tanpa jeda penumpukan bau',
                techControl: 'Pembersihan mekanis terjadwal',
              },
              {
                step: '03',
                title: 'Maggot BSF',
                desc: 'Biokonversi feses jadi larva berkadar protein 42%',
                techControl: 'AI memprediksi siklus panen & separator pupa',
              },
              {
                step: '04',
                title: 'Pakan Mandiri',
                desc: 'Larva segar & kasgot memangkas konsentrat pabrik',
                techControl: 'Formulasi ransum dihitung AI harian',
              },
              {
                step: '05',
                title: 'Air Kaya Nitrat',
                desc: 'Air kolam ikan dipompa ke hidroponik & mina padi',
                techControl: 'Katup solenoid LoRa aktif via sensor EC',
              },
              {
                step: '06',
                title: 'Air Bersih & Pakan',
                desc: 'Akar tanaman memfilter air kembali murni ke kolam ternak',
                techControl: 'Probe DO/pH verifikasi air sebelum siklus berulang',
              },
            ].map((node, idx) => (
              <div
                key={node.step}
                className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between shadow-2xs relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D]">
                      TAHAP {node.step}
                    </span>
                    {idx < 5 ? (
                      <span className="hidden lg:inline text-[#2E7D5B] font-mono text-xs font-bold">
                        →
                      </span>
                    ) : (
                      <span className="hidden lg:inline text-[#2E7D5B] font-mono text-[9px] font-bold bg-[#FAF9F6] border border-[#D8D6CE] px-1 py-0.5 rounded">
                        ↺ SIKLUS
                      </span>
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#121311] mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-[#4A4D46] leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                {/* Software / AI Control Layer Badge */}
                <div className="pt-2.5 mt-2.5 border-t border-[#D8D6CE] flex items-start gap-1.5 text-[10px] font-mono text-[#2E7D5B]">
                  <Cpu className="w-3 h-3 text-[#2E7D5B] shrink-0 mt-0.5" />
                  <span className="leading-tight">{node.techControl}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ajakan Diskusi Ringan di Akhir Masterplan */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#EAE8E1]/90 border border-[#D8D6CE] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#1B3B2B] text-[#74C69D] border border-[#74C69D]/30 font-mono text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-pulse" />
                <span>DARI CETAK BIRU MENUJU IMPLEMENTASI NYATA</span>
              </div>
              <h4 className="font-display font-bold text-lg sm:text-xl text-[#121311] leading-snug">
                Punya lahan, fasilitas peternakan, atau sistem operasional yang ingin diotomatisasi?
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                Anda tidak harus langsung membangun seluruh kawasan terpadu sekaligus. Kami dapat membantu mengaudit kebutuhan operasional Anda dan memulai dari satu bagian yang paling dibutuhkan lahan atau usaha Anda saat ini.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#roadmap"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D8D6CE] hover:border-[#121311] bg-[#FAF9F6] text-xs font-mono font-semibold text-[#121311] hover:bg-white transition-all shadow-2xs cursor-pointer"
              >
                <span>Lihat Alur Kerja Sama Kami ↓</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation('integrated');
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3B2B] hover:bg-[#121311] text-[#F4F3EF] text-xs font-semibold tracking-tight transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
              >
                <span>Diskusi Ringan &amp; Konsultasi</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#74C69D]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Masterplan Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#121311]/95 backdrop-blur-md flex flex-col p-4 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/20 text-white font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-[#1B3B2B] text-[#74C69D] font-bold">
                  {currentMode.badge}
                </span>
                <span className="hidden sm:inline">
                  SMART INTEGRATED ECO-FARM // LUMAJANG LIVING LAB
                </span>
              </div>

              {/* Mode Switcher in Lightbox */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/10 border border-white/15">
                  <button
                    type="button"
                    onClick={() => setViewMode('circular')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                      viewMode === 'circular'
                        ? 'bg-[#1B3B2B] text-[#74C69D]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Foto Drone
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('blueprint')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                      viewMode === 'blueprint'
                        ? 'bg-[#1B3B2B] text-[#74C69D]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Cetak Biru 3D
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <span>Tutup</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-auto p-4">
              <img
                src={currentMode.image}
                alt={currentMode.alt}
                className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
