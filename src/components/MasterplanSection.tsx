import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Compass,
  Droplets,
  Feather,
  Info,
  Layers,
  Maximize2,
  RefreshCw,
  Sun,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MaskedHeading } from './MaskedHeading';
import { EditorialImage } from './EditorialImage';
import type { ConsultationFormValues } from '../utils/ecosystemData';

const MASTERPLAN_IMAGE_SRC = '/src/assets/images/masterplan/masterplan.jpg';

interface MasterplanSectionProps {
  onOpenConsultation?: (focus: ConsultationFormValues['focus']) => void;
}

interface MasterplanZone {
  id: string;
  number: string;
  name: string;
  shortName: string;
  tag: string;
  pin: { x: number; y: number }; // Percentage position on image
  role: string;
  hardware: string[];
  circularOutput: string;
  metric: { value: string; label: string };
}

const ZONES: MasterplanZone[] = [
  {
    id: 'smart-coop',
    number: '01',
    name: 'Kandang Ayam Smart Coop & Ruminansia',
    shortName: 'Kandang Ayam',
    tag: 'FASILITAS PETERNAKAN TERTUTUP',
    pin: { x: 19, y: 22 },
    role: 'Kandang ayam petelur dan pedaging dengan ventilasi otomatis, atap surya, pemantauan kadar amonia (NH3), dan dispenser pakan otomatis berbasis jadwal.',
    hardware: [
      'Sensor Gas Amonia (NH3) & Kelembaban Udara',
      'Atap Panel Surya Fotovoltaik Terpadu',
      'Dispensasi Pakan Otomatis Berbasis Sensor Berat',
      'Saluran Talang Pembuangan Kotoran Basah Gravitasi',
    ],
    circularOutput: 'Limbah kotoran segar dialirkan langsung tanpa jeda ke unit biokonversi maggot BSF.',
    metric: { value: '100%', label: 'Kotoran dialirkan ke maggot' },
  },
  {
    id: 'maggot-bsf',
    number: '02',
    name: 'Biokonversi Maggot BSF (Black Soldier Fly)',
    shortName: 'Maggot BSF',
    tag: 'UNIT REKAYASA BIOMASSA PROTEIN',
    pin: { x: 33, y: 44 },
    role: 'Pusat pengurai limbah biologis: larva lalat tentara hitam mengonversi kotoran ternak dan sisa organik menjadi biomassa kaya protein kasar (42%) dalam 12–14 hari.',
    hardware: [
      'Bioreaktor Larva dengan Kendali Kelembaban Substrat',
      'Separator Otomatis Pemisah Pupa & Kasgot (Pupuk Organik)',
      'Sistem Ventilasi Penyaring Bau Berbasis Karbon Aktif',
    ],
    circularOutput: 'Larva segar bernutrisi tinggi dijadikan pakan utama mandiri untuk ayam dan kolam ikan.',
    metric: { value: '42%', label: 'Kandungan Protein Alami Kasar' },
  },
  {
    id: 'aquaculture-walet',
    number: '03',
    name: 'Kolam Akuakultur & Rumah Walet Terpadu',
    shortName: 'Kolam & Walet',
    tag: 'SENTRAL BIOFILTER AIR TAWAR',
    pin: { x: 50, y: 30 },
    role: 'Kolam ikan nila dan gurame beraerasi surya di bawah rumah walet 3 lantai berarsitektur modern. Air kaya feses ikan dialirkan secara kontinu sebagai sumber nitrat bagi tanaman.',
    hardware: [
      'Probe Kualitas Air (pH, Dissolved Oxygen, Turbiditas)',
      'Aerator Venturi & Air Mancur Bertenaga Surya',
      'Sensor Suhu & Kelembaban Ultrasonik Mikro Rumah Walet',
    ],
    circularOutput: 'Air buangan kolam dipompa ke rak hidroponik dan sawah mina padi untuk penyerapan nutrisi.',
    metric: { value: '14.2 L/m', label: 'Debit Sirkulasi Biofilter' },
  },
  {
    id: 'hydroponics-padi',
    number: '04',
    name: 'Hidroponik Bertingkat & Sawah Mina Padi',
    shortName: 'Hidroponik & Padi',
    tag: 'AGROTEKNOLOGI TANAMAN & PANGAN',
    pin: { x: 82, y: 26 },
    role: 'Talang sayuran bertingkat dan petak sawah terintegrasi dengan ikan kecil dan bebek. Akar tanaman menyerap nitrat dan fosfat, menghasilkan panen sayur serta memurnikan kembali air.',
    hardware: [
      'Manifold Irigasi Tetes Baja Tahan Karat',
      'Katup Solenoid Otomatis Terhubung Waktu & Sensor EC',
      'Saluran Resapan Gravitasi Menuju Tandon Air Bersih',
    ],
    circularOutput: 'Air bersih terfiltrasi dialirkan kembali ke kolam ternak dan instalasi minum.',
    metric: { value: '4x', label: 'Densitas Lahan Vertikal' },
  },
  {
    id: 'microgrid-energy',
    number: '05',
    name: 'Mikrogrid Energi Mandiri (Surya, Angin & BioDAS)',
    shortName: 'Mikrogrid Energi',
    tag: 'SUMBER DAYA TERBARUKAN 24/7',
    pin: { x: 14, y: 76 },
    role: 'Pembangkit listrik mikrogrid terpadu: panel surya atap, kincir angin mini, dan turbin piko-hidro BioDAS pada arus sungai buatan memastikan 100% instrumen lapangan beroperasi tanpa ketergantungan PLN.',
    hardware: [
      'Generator Mikrohidro Aliran Arus Deras (BioDAS)',
      'Array Panel Surya Fotovoltaik Monokristalin',
      'Turbin Angin Horisontal 3 Sudu Ringan',
      'Bank Baterai Lithium Besi Fosfat (LiFePO4) & Smart BMS',
    ],
    circularOutput: 'Menyuplai daya mandiri untuk seluruh pompa, katup solenoid, dan pemancar sensor LoRa/WiFi.',
    metric: { value: '0 g/kWh', label: 'Emisi Karbon Operasional' },
  },
];

export function MasterplanSection({ onOpenConsultation }: MasterplanSectionProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('smart-coop');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectedZone = ZONES.find((z) => z.id === selectedZoneId) ?? ZONES[0];

  return (
    <section id="masterplan" className="border-b border-[#D8D6CE] bg-[#F4F3EF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header with Honest Credibility Status Badge & Target R&D Scope */}
        <div className="px-6 py-8 sm:px-10 lg:px-12 border-b border-[#D8D6CE] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-[#2E7D5B] tracking-wider uppercase font-semibold">
                03. CETAK BIRU SPASIAL // LIVING LAB RUMIVERSE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1B3B2B] text-[#74C69D] border border-[#74C69D]/30 font-mono text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-pulse" />
                STATUS: CETAK BIRU ARSITEKTUR &amp; TARGET R&amp;D 2026–2027
              </span>
            </div>

            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121311] tracking-tight"
            >
              Smart Integrated Eco-Farm Lumajang
            </MaskedHeading>

            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              Masterplan kawasan terpadu ini dirancang sebagai cetak biru arsitektur dan model percontohan (<em>reference architecture</em>) target 2026–2027. Tujuannya adalah menguji coba sistem pertanian-peternakan sirkular tertutup (<em>zero-waste</em>) di Lumajang agar biaya pakan dan energi mandiri dapat ditekan hingga 70%, sekaligus siap direplikasi di lahan milik klien maupun mitra investor.
            </p>
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

        {/* Split Layout: Blueprint Map (Left 65%) + Zone Detail Inspector (Right 35%) */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[#D8D6CE] bg-[#FAF9F6]">
          {/* Top Metadata Blueprint Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#D8D6CE] font-mono text-xs text-[#4A4D46]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#1B3B2B] text-[#74C69D] text-[11px] font-bold tracking-wider">
                FIG. 04 · BLUEPRINT TEKNIS
              </span>
              <span className="hidden sm:inline">
                RUMIVERSE LIVING LAB // MASTERPLAN ISOMETRIK 3D
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#6B6E66]">
                SKALA SPASIAL: 1:500 · TATA LETAK 5 ZONA SIRKULAR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri (~62-65%): Map + 5 Tombol Zona di Luar Gambar */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {/* Blueprint Visualizer Container (Height Controlled to fit within viewport) */}
              <div className="relative aspect-[16/10] max-h-[460px] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#0E1210] shadow-md group">
                <EditorialImage
                  src={MASTERPLAN_IMAGE_SRC}
                  alt="Cetak biru arsitektur 3D isometrik Smart Integrated Eco-Farm RUMIVERSE Lumajang"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  fallbackTitle="Smart Integrated Eco-Farm Masterplan"
                  fallbackSubtitle="Visualisasi tata letak arsitektur terpadu Living Lab Lumajang."
                />

                {/* Blueprint Aesthetic Technical Overlay */}
                <div className="absolute inset-0 bg-[#0E1210]/15 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,rgba(14,18,16,0.35)_100%] pointer-events-none" />

                {/* Blueprint Framing Corner Marks */}
                <div className="absolute top-2.5 left-3 font-mono text-[9px] text-white/50 tracking-widest pointer-events-none select-none">
                  ┌ [NW: 8°08&apos;S]
                </div>
                <div className="absolute top-2.5 right-3 font-mono text-[9px] text-white/50 tracking-widest pointer-events-none select-none">
                  [NE: 113°13&apos;E] ┐
                </div>
                <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-white/50 tracking-widest pointer-events-none select-none">
                  └ [SW: ZONE-05]
                </div>
                <div className="absolute bottom-2.5 right-3 font-mono text-[9px] text-white/50 tracking-widest pointer-events-none select-none">
                  [SE: SCALE 1:500] ┘
                </div>

                {/* Interactive Pins on the Map (Shifted away from text labels) */}
                {ZONES.map((zone) => {
                  const isActive = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      style={{ left: `${zone.pin.x}%`, top: `${zone.pin.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer focus:outline-none"
                      aria-label={`Pilih ${zone.name}`}
                    >
                      <span className="relative flex items-center justify-center">
                        {/* Pulsing Aura */}
                        <span
                          className={`absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-[#74C69D]/50 scale-125 animate-ping'
                              : 'bg-white/25 group-hover/pin:scale-110'
                          }`}
                        />
                        {/* Badge */}
                        <span
                          className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 text-[10px] sm:text-[11px] font-mono font-bold transition-all shadow-md ${
                            isActive
                              ? 'bg-[#1B3B2B] border-[#74C69D] text-[#74C69D] scale-110 ring-2 ring-[#74C69D]/40'
                              : 'bg-[#121311]/90 border-white/80 text-white hover:border-[#74C69D] hover:text-[#74C69D]'
                          }`}
                        >
                          {zone.number}
                        </span>
                      </span>

                      {/* Tooltip on Hover */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/pin:block px-2 py-0.5 rounded bg-[#121311]/95 text-white font-mono text-[10px] tracking-wide whitespace-nowrap shadow-lg pointer-events-none z-30 border border-white/20">
                        {zone.number} · {zone.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Grid 5 Tombol Zona Ringkas di Luar Gambar (Tidak Terpotong) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {ZONES.map((zone) => {
                  const isSelected = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1B3B2B] text-[#F4F3EF] border-[#1B3B2B] shadow-xs scale-[1.01]'
                          : 'bg-[#F4F3EF] hover:bg-[#EAE8E1] text-[#242622] border-[#D8D6CE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-[#FAF9F6] text-[#1B3B2B]'
                              : 'bg-[#FAF9F6] text-[#2E7D5B] border border-[#D8D6CE]'
                          }`}
                        >
                          ZONA {zone.number}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D]" />}
                      </div>
                      <span className="font-display font-semibold text-xs truncate block mt-2">
                        {zone.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              <figcaption className="font-mono text-[11px] text-[#6B6E66] px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <span>
                  <strong className="text-[#121311]">FIG. 04</strong> — Model isometrik spasial Smart Integrated Eco-Farm RUMIVERSE Lumajang.
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
                  className="p-6 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-5 shadow-sm"
                >
                  {/* Header Zona */}
                  <div className="space-y-2">
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
                    <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                      {selectedZone.role}
                    </p>
                  </div>

                  {/* Instrumentasi Terpasang */}
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-2.5">
                    <span className="font-mono text-[11px] text-[#2E7D5B] font-bold uppercase tracking-wider block">
                      Instrumentasi &amp; Sensor Terpasang:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#2D2F2A]">
                      {selectedZone.hardware.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aliran Siklus Sirkular */}
                  <div className="p-4 rounded-xl bg-[#1B3B2B] text-[#F4F3EF] space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[#74C69D] font-mono text-[11px] font-semibold">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>ALIRAN SIKLUS BIO-EKOSISTEM</span>
                    </div>
                    <p className="text-xs text-[#E2E5E0] leading-relaxed">
                      {selectedZone.circularOutput}
                    </p>
                  </div>

                  {/* Metrik Kunci */}
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-[#1B3B2B] tabular-nums block">
                        {selectedZone.metric.value}
                      </span>
                      <span className="text-[11px] font-mono text-[#6B6E66] mt-0.5 block">
                        {selectedZone.metric.label}
                      </span>
                    </div>
                    <Compass className="w-7 h-7 text-[#2E7D5B]/30" />
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
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
              Prinsip Tanpa Sisa (Zero Organic Waste)
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121311] tracking-tight">
              Enam Tahapan Rantai Pasok Biologis Mandiri
            </h3>
            <p className="text-sm text-[#4A4D46] leading-relaxed">
              Setiap keluaran dari satu zona menjadi masukan bagi zona berikutnya. Tidak ada limbah organik
              yang terbuang ke luar kawasan, memangkas 70% biaya pakan komersial secara berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Ternak & Unggas', desc: 'Pemberian pakan & pemantauan amonia' },
              { step: '02', title: 'Kotoran Segar', desc: 'Dialirkan ke media biokonversi' },
              { step: '03', title: 'Maggot BSF', desc: 'Penguraian menjadi 42% protein larva' },
              { step: '04', title: 'Pakan Ikan & Ayam', desc: 'Nutrisi alami tanpa beli konsentrat' },
              { step: '05', title: 'Air Kaya Nitrat', desc: 'Dipompa ke hidroponik & mina padi' },
              { step: '06', title: 'Air Bersih & Pakan', desc: 'Kembali murni ke ternak & rumput' },
            ].map((node) => (
              <div
                key={node.step}
                className="p-4 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#2E7D5B] block mb-2">
                    TAHAP {node.step}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#121311] mb-1">
                    {node.title}
                  </h4>
                </div>
                <p className="text-[11px] text-[#6B6E66] leading-relaxed mt-2">{node.desc}</p>
              </div>
            ))}
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
                  MASTERPLAN 3D
                </span>
                <span>SMART INTEGRATED ECO-FARM // LUMAJANG LIVING LAB</span>
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

            <div className="flex-1 flex items-center justify-center overflow-auto p-4">
              <img
                src={MASTERPLAN_IMAGE_SRC}
                alt="Masterplan Isometrik Smart Integrated Eco-Farm RUMIVERSE"
                className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
