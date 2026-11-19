import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  ARCHITECTURE_LAYERS,
  calculateSandboxMetrics,
  type ArchitectureLayer,
} from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';

const DEFAULT_HERD_SCALE = 100;
const DEFAULT_AUTOMATION_LEVEL = 80;

export function CaseStudySection() {
  const [herdScale, setHerdScale] = useState<number>(DEFAULT_HERD_SCALE);
  const [automationLevel, setAutomationLevel] = useState<number>(DEFAULT_AUTOMATION_LEVEL);
  const [selectedLayerId, setSelectedLayerId] = useState<ArchitectureLayer['id']>('edge');

  const metrics = calculateSandboxMetrics(herdScale, automationLevel);
  const selectedLayer =
    ARCHITECTURE_LAYERS.find((layer) => layer.id === selectedLayerId) ?? ARCHITECTURE_LAYERS[0];

  const handleReset = () => {
    setHerdScale(DEFAULT_HERD_SCALE);
    setAutomationLevel(DEFAULT_AUTOMATION_LEVEL);
  };

  return (
    <section id="studi-kasus" className="border-b border-[#D8D6CE]">
      {/* Operational scenario simulator */}
      <div className="bg-[#1B3B2B] text-[#F4F3EF] border-b border-[#121311]">
        <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#F4F3EF]/20">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-[#74C69D] tracking-wide mb-3">
                03. Cara Kerja &amp; Simulasi
              </p>
              <MaskedHeading
                as="h2"
                className="font-display text-2xl sm:text-4xl font-bold text-[#F4F3EF] tracking-tight"
              >
                Sistem yang Membantu Pekerjaan Sehari-hari
              </MaskedHeading>
            </div>

            <div className="lg:col-span-7 flex items-end">
              <p className="text-base sm:text-lg text-[#E2E5E0] leading-[1.68] max-w-2xl">
                Kami menyatukan data dan kegiatan lapangan dalam sistem yang mudah digunakan.
                Bagian teknis bekerja di belakang layar agar tim bisa fokus pada pekerjaan.
              </p>
            </div>
          </div>

          {/* Interactive operational estimate */}
          <div className="pt-12 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-[#74C69D] inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#2E7D5B] animate-pulse" aria-hidden="true" />
                  <span>Coba Simulasi Operasional</span>
                </p>
                <p className="mt-1 text-sm text-[#D0D6CF]">
                  Ubah jumlah ternak dan porsi pekerjaan otomatis untuk melihat perkiraan dampak.
                  Angka ini hanya contoh perhitungan, bukan hasil pengukuran lapangan.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono border border-[#F4F3EF]/30 text-[#F4F3EF] hover:bg-[#F4F3EF]/10 transition-colors cursor-pointer self-start md:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kembalikan ke Contoh Awal</span>
              </button>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-[#F4F3EF]/20 bg-[#121311]/35">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <label htmlFor="slider-herd-scale" className="font-mono text-xs text-[#E2E5E0]">
                    Jumlah Ternak
                  </label>
                  <span
                    data-testid="sandbox-herd-value"
                    className="font-mono text-sm font-semibold text-[#74C69D] tabular-nums"
                  >
                    {herdScale} ekor
                  </span>
                </div>
                <input
                  id="slider-herd-scale"
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={herdScale}
                  onChange={(e) => setHerdScale(Number(e.target.value))}
                  className="w-full blueprint-slider"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-[#9EA69D] tabular-nums">
                  <span>10 ekor · kecil</span>
                  <span>100 ekor · contoh</span>
                  <span>250 ekor · besar</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <label
                    htmlFor="slider-automation-level"
                    className="font-mono text-xs text-[#E2E5E0]"
                  >
                    Pekerjaan yang Diotomatisasi
                  </label>
                  <span
                    data-testid="sandbox-automation-value"
                    className="font-mono text-sm font-semibold text-[#74C69D] tabular-nums"
                  >
                    {automationLevel}% tugas otomatis
                  </span>
                </div>
                <input
                  id="slider-automation-level"
                  type="range"
                  min={20}
                  max={100}
                  step={5}
                  value={automationLevel}
                  onChange={(e) => setAutomationLevel(Number(e.target.value))}
                  className="w-full blueprint-slider"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-[#9EA69D] tabular-nums">
                  <span>20% · sedikit</span>
                  <span>80% · contoh</span>
                  <span>100% · semua</span>
                </div>
              </div>
            </div>

            {/* Dynamic Metrics Table */}
            <div className="border-t border-b border-[#F4F3EF]/20 divide-y divide-[#F4F3EF]/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 items-baseline">
                <div className="lg:col-span-1 font-mono text-xs text-[#9EA69D] tabular-nums">
                  01
                </div>
                <div className="lg:col-span-3">
                  <h3 className="font-display text-lg font-bold text-[#F4F3EF]">Catatan Otomatis</h3>
                  <p className="mt-1 font-mono text-xs text-[#9EA69D]">
                    Mengurangi catatan manual
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <span
                    data-testid="metric-manual-reduction"
                    className="font-mono text-4xl sm:text-5xl font-semibold text-[#74C69D] tabular-nums"
                  >
                    {metrics.manualReductionPct}%
                  </span>
                  <span className="block mt-1.5 font-mono text-xs text-[#D0D6CF]">
                    Perkiraan pengurangan catatan manual
                  </span>
                </div>
                <p className="lg:col-span-5 text-sm sm:text-base text-[#E2E5E0] leading-relaxed">
                  Pada simulasi ini, catatan manual diperkirakan berkurang {metrics.manualReductionPct}%
                  untuk {herdScale} ekor. Hasil sebenarnya bergantung pada cara kerja di lapangan.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 items-baseline">
                <div className="lg:col-span-1 font-mono text-xs text-[#9EA69D] tabular-nums">
                  02
                </div>
                <div className="lg:col-span-3">
                  <h3 className="font-display text-lg font-bold text-[#F4F3EF]">
                    Penggunaan Kembali Air &amp; Sisa
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#9EA69D]">
                    Ternak · ikan · tanaman
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <span
                    data-testid="metric-waste-reduction"
                    className="font-mono text-4xl sm:text-5xl font-semibold text-[#74C69D] tabular-nums"
                  >
                    {metrics.wasteReductionPct}%
                  </span>
                  <span className="block mt-1.5 font-mono text-xs text-[#D0D6CF]">
                    Perkiraan pengurangan sisa ternak
                  </span>
                </div>
                <p className="lg:col-span-5 text-sm sm:text-base text-[#E2E5E0] leading-relaxed">
                  Simulasi memperkirakan sekitar{' '}
                  <strong className="font-mono text-[#F4F3EF] tabular-nums">
                    {metrics.waterSavedLitersPerDay.toLocaleString('id-ID')} L/hari
                  </strong>{' '}
                  air dapat digunakan kembali dan{' '}
                  <strong className="font-mono text-[#F4F3EF] tabular-nums">
                    {metrics.biomassConvertedKgPerMonth.toLocaleString('id-ID')} kg/bulan
                  </strong>{' '}
                  sisa ternak dapat diolah menjadi pakan atau kompos.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 items-baseline">
                <div className="lg:col-span-1 font-mono text-xs text-[#9EA69D] tabular-nums">
                  03
                </div>
                <div className="lg:col-span-3">
                  <h3 className="font-display text-lg font-bold text-[#F4F3EF]">
                    Peringatan ke Ponsel
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#9EA69D]">
                    Jika suhu atau kondisi air berubah
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <span
                    data-testid="metric-latency"
                    className="font-mono text-4xl sm:text-5xl font-semibold text-[#74C69D] tabular-nums"
                  >
                    &lt; {metrics.telemetryLatencySec} dtk
                  </span>
                  <span className="block mt-1.5 font-mono text-xs text-[#D0D6CF]">
                    Perkiraan waktu pengiriman
                  </span>
                </div>
                <p className="lg:col-span-5 text-sm sm:text-base text-[#E2E5E0] leading-relaxed">
                  Dalam simulasi ini, peringatan diperkirakan tiba dalam kurang dari{' '}
                  {metrics.telemetryLatencySec} detik. Waktu sebenarnya bergantung pada jaringan
                  dan perangkat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three parts of the system */}
      <div className="bg-[#F4F3EF]">
        <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-[#D8D6CE]">
            <div>
              <p className="font-mono text-xs text-[#2E7D5B] mb-2">Bagian-bagian Sistem</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#121311] tracking-tight">
                Tiga Bagian yang Bekerja Bersama
              </h3>
            </div>
            <p className="text-sm text-[#4A4D46] max-w-md">
              Pilih salah satu bagian untuk melihat tugasnya dan bagaimana bagian itu membantu
              pekerjaan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-[#D8D6CE]">
            {ARCHITECTURE_LAYERS.map((layer, index) => {
              const isSelected = layer.id === selectedLayer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayerId(layer.id)}
                  aria-pressed={isSelected}
                  className={`text-left p-6 sm:p-8 border-b lg:border-b-0 ${
                    index < ARCHITECTURE_LAYERS.length - 1 ? 'lg:border-r' : ''
                  } border-[#D8D6CE] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1B3B2B] ${
                    isSelected
                      ? 'bg-[#1B3B2B] text-[#F4F3EF]'
                      : 'bg-[#FAF9F6] text-[#121311] hover:bg-[#EAE8E1]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-xs mb-4">
                    <span className={isSelected ? 'text-[#74C69D]' : 'text-[#2E7D5B]'}>
                      {layer.step}
                    </span>
                    <span className={isSelected ? 'text-[#D0D6CF]' : 'text-[#4A4D46]'}>
                      {isSelected ? 'Dipilih' : 'Lihat Detail'}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-bold tracking-tight">{layer.title}</h4>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isSelected ? 'text-[#E2E5E0]' : 'text-[#4A4D46]'
                    }`}
                  >
                    {layer.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Blueprint Specification Detail */}
          <div className="p-6 sm:p-8 lg:p-10 bg-[#FAF9F6] border-x border-b border-[#D8D6CE] grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#2E7D5B]">
                <span>{selectedLayer.step}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#4A4D46]">{selectedLayer.infoLine}</span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#121311]">
                {selectedLayer.title}
              </h4>
              <p className="text-base text-[#2D2F2A] leading-[1.68]">{selectedLayer.summary}</p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-sm text-[#121311]">
                {selectedLayer.features.map((feature) => (
                  <span key={feature} className="px-2.5 py-1 border border-[#D8D6CE]">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <dl className="lg:col-span-5 space-y-4 lg:pl-8 lg:border-l border-[#D8D6CE]">
              {selectedLayer.specLines.map((spec) => (
                <div key={spec.label} className="pb-3 border-b border-[#D8D6CE] last:border-b-0">
                  <dt className="font-mono text-xs text-[#4A4D46] mb-1">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-[#121311]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
