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
    tag: 'FASILITAS PETERNAKAN TERTUTUP',
    pin: { x: 22, y: 32 },
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
    tag: 'UNIT REKAYASA BIOMASSA PROTEIN',
    pin: { x: 34, y: 53 },
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
    tag: 'SENTRAL BIOFILTER AIR TAWAR',
    pin: { x: 48, y: 42 },
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
    tag: 'AGROTEKNOLOGI TANAMAN & PANGAN',
    pin: { x: 82, y: 38 },
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
    tag: 'SUMBER DAYA TERBARUKAN 24/7',
    pin: { x: 12, y: 88 },
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
        {/* Section Header */}
        <div className="px-6 py-12 sm:px-10 lg:px-12 border-b border-[#D8D6CE] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#2E7D5B] tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
              <span>03. Cetak Biru Spasial // Masterplan Living Lab</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121311] tracking-tight"
            >
              Smart Integrated Eco-Farm Lumajang
            </MaskedHeading>
          </div>
          <p className="text-sm text-[#4A4D46] max-w-md leading-relaxed">
            Arsitektur tata ruang 3 dimensi yang menghubungkan peternakan presisi, biokonversi maggot,
            biofiltrasi akuaponik, hingga sawah mina padi di bawah mikrogrid energi mandiri.
          </p>
        </div>

        {/* Blueprint Viewer Container */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[#D8D6CE] bg-[#FAF9F6]">
          {/* Top Metadata Blueprint Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D8D6CE] font-mono text-xs text-[#4A4D46]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#1B3B2B] text-[#74C69D] text-[11px] font-bold tracking-wider">
                FIG. 04 · BLUEPRINT
              </span>
              <span className="hidden sm:inline">
                RUMIVERSE LIVING LAB // MASTERPLAN ISOMETRIK 3D
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-[11px] text-[#6B6E66]">
                SKALA SPASIAL: 1:500 · 8°08&apos;S 113°13&apos;E
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D8D6CE] hover:border-[#121311] text-xs text-[#121311] hover:bg-[#EAE8E1] transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Perbesar Cetak Biru</span>
              </button>
            </div>
          </div>

          {/* Interactive Isometric Visualizer */}
          <div className="mt-6 relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#121311] shadow-lg group">
            <EditorialImage
              src={MASTERPLAN_IMAGE_SRC}
              alt="Cetak biru arsitektur 3D isometrik Smart Integrated Eco-Farm RUMIVERSE Lumajang"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              fallbackTitle="Smart Integrated Eco-Farm Masterplan"
              fallbackSubtitle="Visualisasi tata letak arsitektur terpadu Living Lab Lumajang."
            />

            {/* Subtle Blueprint Grid Watermark */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(18,19,17,0.3)_100%] pointer-events-none" />

            {/* Interactive Pins on the Map */}
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
                      className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#74C69D]/40 scale-125 animate-ping'
                          : 'bg-white/20 group-hover/pin:scale-110'
                      }`}
                    />
                    {/* Badge */}
                    <span
                      className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 text-[11px] sm:text-xs font-mono font-bold transition-all shadow-md ${
                        isActive
                          ? 'bg-[#1B3B2B] border-[#74C69D] text-[#74C69D] scale-110'
                          : 'bg-[#121311]/90 border-white/70 text-white hover:border-[#74C69D]'
                      }`}
                    >
                      {zone.number}
                    </span>
                  </span>

                  {/* Tooltip on Hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block px-2.5 py-1 rounded bg-[#121311]/95 text-white font-mono text-[10px] tracking-wide whitespace-nowrap shadow-lg pointer-events-none z-30">
                    {zone.name}
                  </span>
                </button>
              );
            })}

            {/* Bottom Floating Quick Zone Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-20 hidden md:flex items-center justify-between p-2 rounded-xl bg-[#121311]/85 backdrop-blur-md border border-white/10 text-white">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {ZONES.map((zone) => {
                  const isSelected = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B3B2B] text-[#74C69D] font-bold border border-[#74C69D]/40'
                          : 'text-[#D0D6CF] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {zone.number} · {zone.name.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>

              <span className="text-[11px] font-mono text-[#8E928A] shrink-0 pr-2">
                Pilih Pin / Menu untuk Rincian
              </span>
            </div>
          </div>

          <figcaption className="mt-3 font-mono text-xs text-[#6B6E66] px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              <strong className="text-[#121311]">FIG. 04</strong> — Model isometrik fasilitas terpadu RUMIVERSE Living Lab Lumajang: sirkulasi pakan biologis tertutup, integrasi energi surya/mikrohidro, dan pengolahan limbah tanpa sisa (*zero-waste*).
            </span>
            <span className="text-[#2E7D5B] font-semibold shrink-0">
              ● Titik Interaktif Tersedia
            </span>
          </figcaption>
        </div>

        {/* Selected Zone Deep-Dive Inspector Card */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[#D8D6CE] bg-[#F4F3EF]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Zone Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#1B3B2B] text-[#74C69D] font-mono text-xs font-bold">
                  ZONA {selectedZone.number}
                </span>
                <span className="font-mono text-xs text-[#2E7D5B] tracking-wider uppercase">
                  {selectedZone.tag}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#121311] tracking-tight">
                {selectedZone.name}
              </h3>

              <p className="text-base sm:text-lg text-[#353732] leading-relaxed">
                {selectedZone.role}
              </p>

              {/* Hardware & Sensor Suite */}
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#D8D6CE] space-y-3">
                <span className="font-mono text-xs text-[#2E7D5B] font-bold uppercase tracking-wider block">
                  Perangkat Keras &amp; Instrumentasi Terpasang:
                </span>
                <ul className="space-y-2 text-sm text-[#2D2F2A]">
                  {selectedZone.hardware.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Circular Impact & Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-6 lg:border-l border-[#D8D6CE]">
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#6B6E66] uppercase tracking-wider block">
                  Peran dalam Siklus Bio-Ekosistem:
                </span>

                <div className="p-5 rounded-2xl bg-[#1B3B2B] text-[#F4F3EF] space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-[#74C69D] font-mono text-xs font-semibold">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>ALIRAN SIKLUS SIRKULAR</span>
                  </div>
                  <p className="text-sm text-[#E2E5E0] leading-relaxed">
                    {selectedZone.circularOutput}
                  </p>
                </div>

                {/* Key Metric Highlight */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#D8D6CE] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#1B3B2B] tabular-nums block">
                      {selectedZone.metric.value}
                    </span>
                    <span className="text-xs font-mono text-[#6B6E66] mt-1 block">
                      {selectedZone.metric.label}
                    </span>
                  </div>
                  <Compass className="w-8 h-8 text-[#2E7D5B]/30" />
                </div>
              </div>

              {/* Consultation Trigger */}
              <div className="pt-4 border-t border-[#D8D6CE]">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenConsultation) {
                      onOpenConsultation('precision-iot');
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#121311] text-[#F4F3EF] hover:bg-[#1B3B2B] text-sm font-semibold tracking-tight transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                >
                  <span>Konsultasi Implementasi Kawasan Serupa</span>
                  <ArrowRight className="w-4 h-4 text-[#74C69D]" />
                </button>
              </div>
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
