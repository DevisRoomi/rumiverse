import { useState } from 'react';
import { Activity, ArrowUpRight, Layers, RotateCcw } from 'lucide-react';
import {
  INDUSTRY_VERTICALS,
  SECTOR_SIMULATOR_PROFILES,
  calculateSandboxMetrics,
  type ConsultationFormValues,
  type IndustryVertical,
} from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';

interface SectorSimulationSectionProps {
  onConsultSector: (focus: ConsultationFormValues['focus']) => void;
}

const DEFAULT_SCALE = 100;
const DEFAULT_AUTOMATION = 80;

export function SectorSimulationSection({ onConsultSector }: SectorSimulationSectionProps) {
  const [selectedId, setSelectedId] = useState<IndustryVertical['id']>(INDUSTRY_VERTICALS[0].id);
  const [scale, setScale] = useState<number>(DEFAULT_SCALE);
  const [automation, setAutomation] = useState<number>(DEFAULT_AUTOMATION);

  const activeVertical =
    INDUSTRY_VERTICALS.find((item) => item.id === selectedId) ?? INDUSTRY_VERTICALS[0];
  const activeProfile = SECTOR_SIMULATOR_PROFILES[activeVertical.id];
  const metrics = calculateSandboxMetrics(scale, automation);

  const handleReset = () => {
    setScale(DEFAULT_SCALE);
    setAutomation(DEFAULT_AUTOMATION);
  };

  return (
    <section id="sektor" className="border-b border-[#D8D6CE] bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20 space-y-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-[#D8D6CE] items-end">
          <div className="lg:col-span-6 space-y-2">
            <p className="font-mono text-xs text-[#2E7D5B] tracking-wide uppercase font-semibold">
              04. Penerapan Sektor &amp; Estimasi Operasional
            </p>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl font-bold text-[#121311] tracking-tight"
            >
              Solusi Terapan Lintas Sektor &amp; Dampak Terukur
            </MaskedHeading>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              Arsitektur sistem kami dirancang modular untuk beradaptasi di berbagai bidang operasional: fasilitas peternakan tertutup, biofilter akuakultur, hingga perkebunan presisi. Tinjau studi kasus per sektor dan simulasikan estimasi efisiensinya.
            </p>
          </div>
        </div>

        {/* Part 1: Interactive Sector Cards & Dossier */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#2E7D5B] font-bold uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              PILIH SEKTOR OPERASIONAL
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#6B6E66]">
              KLIK TAB UNTUK MEMBUKA SPESIFIKASI SEKTOR
            </span>
          </div>

          {/* 3 Sector Tabs */}
          <div
            role="tablist"
            aria-label="Sektor Ekosistem RUMIVERSE"
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {INDUSTRY_VERTICALS.map((vertical) => {
              const isSelected = vertical.id === activeVertical.id;
              return (
                <button
                  key={vertical.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(vertical.id)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'bg-[#1B3B2B] text-[#F4F3EF] border-[#1B3B2B] shadow-sm'
                      : 'bg-[#F4F3EF] text-[#121311] border-[#D8D6CE] hover:bg-[#EAE8E1]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full font-mono text-xs mb-2">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        isSelected
                          ? 'bg-[#FAF9F6] text-[#1B3B2B]'
                          : 'bg-[#FAF9F6] text-[#2E7D5B] border border-[#D8D6CE]'
                      }`}
                    >
                      SEKTOR {vertical.index}
                    </span>
                    <span
                      className={`text-[11px] font-mono ${
                        isSelected ? 'text-[#74C69D]' : 'text-[#6B6E66]'
                      }`}
                    >
                      {isSelected ? '● Aktif' : 'Tinjau'}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold tracking-tight">
                    {vertical.title}
                  </h3>
                  <p
                    className={`mt-1 text-[11px] font-mono leading-tight ${
                      isSelected ? 'text-[#D0D6CF]' : 'text-[#6B6E66]'
                    }`}
                  >
                    {vertical.sectorTag}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Sector Dossier */}
          <div className="rounded-2xl border border-[#D8D6CE] bg-[#F4F3EF] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xs">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="font-mono text-[10px] text-[#6B6E66] uppercase tracking-wider font-bold block mb-1.5">
                  Tantangan Lapangan Sebelum Otomasi:
                </span>
                <p className="text-sm sm:text-base text-[#121311] leading-relaxed">
                  {activeVertical.problem}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D6CE]">
                <span className="font-mono text-[10px] text-[#2E7D5B] uppercase tracking-wider font-bold block mb-1.5">
                  Solusi Arsitektur Sistem Kami:
                </span>
                <p className="text-sm sm:text-base text-[#2D2F2A] leading-relaxed">
                  {activeVertical.solution}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-[#D8D6CE] flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] text-[#6B6E66] uppercase tracking-wider font-bold block mb-2">
                    Komponen &amp; Protokol Terpasang:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVertical.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#D8D6CE] font-mono text-[11px] text-[#121311]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#D8D6CE]">
                  <span className="font-mono text-[10px] text-[#2E7D5B] uppercase tracking-wider font-bold block mb-1">
                    Dampak Terukur di Lapangan:
                  </span>
                  <p className="font-display text-sm sm:text-base font-bold text-[#1B3B2B] leading-snug">
                    {activeVertical.outcome}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onConsultSector(activeVertical.recommendedFocus)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B3B2B] hover:bg-[#121311] text-[#F4F3EF] text-xs font-semibold tracking-tight transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
              >
                <span>Diskusikan Sektor {activeVertical.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#74C69D]" />
              </button>
            </div>
          </div>
        </div>

        {/* Part 2: Compact Interactive Operational Sandbox Simulator */}
        <div className="rounded-2xl bg-[#1B3B2B] text-[#F4F3EF] p-6 sm:p-8 lg:p-10 border border-[#121311] space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F4F3EF]/15">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#74C69D] inline-flex items-center gap-2 font-semibold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                SIMULATOR ESTIMASI DAMPAK OPERASIONAL
              </span>
              <p className="text-xs sm:text-sm text-[#D0D6CF] max-w-xl">
                Geser nilai di bawah untuk melihat perkiraan dampak efisiensi kerja manual dan konservasi sumber daya pada skala operasional Anda.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F4F3EF]/30 text-xs font-mono text-[#F4F3EF] hover:bg-[#F4F3EF]/10 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Contoh</span>
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl bg-[#121311]/40 border border-[#F4F3EF]/10">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="sim-scale" className="font-mono text-xs text-[#E2E5E0]">
                  {activeProfile.scaleLabel}
                </label>
                <span className="font-mono text-xs font-bold text-[#74C69D] tabular-nums">
                  {scale} {activeProfile.scaleUnit}
                </span>
              </div>
              <input
                id="sim-scale"
                type="range"
                min={10}
                max={250}
                step={5}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full blueprint-slider cursor-pointer"
              />
              <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#9EA69D]">
                <span>{activeProfile.minScaleText}</span>
                <span>{activeProfile.defaultScaleText}</span>
                <span>{activeProfile.maxScaleText}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="sim-auto" className="font-mono text-xs text-[#E2E5E0]">
                  Pekerjaan Diotomatisasi
                </label>
                <span className="font-mono text-xs font-bold text-[#74C69D] tabular-nums">
                  {automation}% tugas rutin
                </span>
              </div>
              <input
                id="sim-auto"
                type="range"
                min={20}
                max={100}
                step={5}
                value={automation}
                onChange={(e) => setAutomation(Number(e.target.value))}
                className="w-full blueprint-slider cursor-pointer"
              />
              <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#9EA69D]">
                <span>20% (Dasar)</span>
                <span>80% (Rekomendasi)</span>
                <span>100% (Penuh)</span>
              </div>
            </div>
          </div>

          {/* Dynamic 3-Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#121311]/50 border border-[#F4F3EF]/15 space-y-1">
              <span className="font-mono text-[10px] text-[#74C69D] uppercase tracking-wider block">
                01 · PENGURANGAN KERJA MANUAL
              </span>
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#74C69D] tabular-nums block">
                {metrics.manualReductionPct}%
              </span>
              <p className="text-[11px] text-[#D0D6CF] leading-snug">
                {activeProfile.metricCard1Detail}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121311]/50 border border-[#F4F3EF]/15 space-y-1">
              <span className="font-mono text-[10px] text-[#74C69D] uppercase tracking-wider block">
                {activeProfile.metricCard2Title}
              </span>
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#74C69D] tabular-nums block">
                {metrics.wasteReductionPct}%
              </span>
              <p className="text-[11px] text-[#D0D6CF] leading-snug">
                {activeProfile.getMetricCard2Detail(metrics, scale, automation)}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121311]/50 border border-[#F4F3EF]/15 space-y-1">
              <span className="font-mono text-[10px] text-[#74C69D] uppercase tracking-wider block">
                03 · RESPON PERINGATAN KRITIS
              </span>
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#74C69D] tabular-nums block">
                &lt; {metrics.telemetryLatencySec} dtk
              </span>
              <p className="text-[11px] text-[#D0D6CF] leading-snug">
                {activeProfile.metricCard3Detail}
              </p>
            </div>
          </div>

          {/* Footnote on Transparency & Field Benchmark */}
          <div className="pt-3 border-t border-[#F4F3EF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#9EA69D]">
            <span className="flex items-center gap-1.5 text-[#74C69D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D]" />
              <span>Model Simulasi: Sektor {activeVertical.index} · {activeVertical.title}</span>
            </span>
            <span className="text-left sm:text-right">
              *Estimasi berdasarkan rata-rata benchmark operasional lapangan; hasil aktual menyesuaikan audit lokasi.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
