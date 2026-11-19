import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  INDUSTRY_VERTICALS,
  type ConsultationFormValues,
  type IndustryVertical,
} from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';

interface IndustryVerticalsSectionProps {
  onConsultSector: (focus: ConsultationFormValues['focus']) => void;
}

export function IndustryVerticalsSection({ onConsultSector }: IndustryVerticalsSectionProps) {
  const [selectedId, setSelectedId] = useState<IndustryVertical['id']>(INDUSTRY_VERTICALS[0].id);

  const activeVertical =
    INDUSTRY_VERTICALS.find((item) => item.id === selectedId) ?? INDUSTRY_VERTICALS[0];

  return (
    <section id="sektor" className="border-b border-[#D8D6CE] bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 border-b border-[#D8D6CE] items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs text-[#2E7D5B] tracking-wide mb-3">
              05. Sektor &amp; Studi Terapan
            </p>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl font-bold text-[#121311] tracking-tight"
            >
              Penerapan Lintas Sektor Industri
            </MaskedHeading>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              Pilih sektor operasional di bawah untuk meninjau tantangan lapangan, pemetaan solusi
              arsitektur, serta perangkat yang terpasang.
            </p>
          </div>
        </div>

        {/* 3 Thin-Lined Interactive Sector Tabs */}
        <div
          role="tablist"
          aria-label="Sektor Ekosistem RUMIVERSE"
          className="grid grid-cols-1 lg:grid-cols-3 border-x border-b border-[#D8D6CE]"
        >
          {INDUSTRY_VERTICALS.map((vertical, idx) => {
            const isSelected = vertical.id === activeVertical.id;
            return (
              <button
                key={vertical.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(vertical.id)}
                className={`text-left p-6 sm:p-8 border-b lg:border-b-0 ${
                  idx < INDUSTRY_VERTICALS.length - 1 ? 'lg:border-r' : ''
                } border-[#D8D6CE] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1B3B2B] ${
                  isSelected
                    ? 'bg-[#1B3B2B] text-[#F4F3EF]'
                    : 'bg-[#F4F3EF] text-[#121311] hover:bg-[#EAE8E1]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 font-mono text-xs mb-4">
                  <span className={isSelected ? 'text-[#74C69D]' : 'text-[#2E7D5B]'}>
                    {vertical.index}. Sektor
                  </span>
                  <span className={isSelected ? 'text-[#D0D6CF]' : 'text-[#4A4D46]'}>
                    {isSelected ? 'Aktif' : 'Pilih'}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                  {vertical.index}. {vertical.title}
                </h3>
                <p
                  className={`mt-2 text-xs font-mono ${
                    isSelected ? 'text-[#D0D6CF]' : 'text-[#4A4D46]'
                  }`}
                >
                  {vertical.sectorTag}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Vertical Architectural Dossier */}
        <div
          role="tabpanel"
          aria-label={activeVertical.title}
          className="border-x border-b border-[#D8D6CE] bg-[#F4F3EF] p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="font-mono text-xs text-[#4A4D46] mb-2">Tantangan Lapangan</p>
              <p className="text-base text-[#121311] leading-[1.68]">{activeVertical.problem}</p>
            </div>

            <div className="pt-6 border-t border-[#D8D6CE]">
              <p className="font-mono text-xs text-[#2E7D5B] mb-2">Solusi Arsitektur</p>
              <p className="text-base text-[#2D2F2A] leading-[1.68]">{activeVertical.solution}</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-10 lg:border-l border-[#D8D6CE] flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs text-[#4A4D46] mb-3">Komponen &amp; Protokol</p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#121311]">
                  {activeVertical.stack.map((item, i) => (
                    <span key={item} className="inline-flex items-center gap-3">
                      <span>{item}</span>
                      {i < activeVertical.stack.length - 1 && (
                        <span className="text-[#9EA69D]" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#D8D6CE]">
                <p className="font-mono text-xs text-[#4A4D46] mb-2">Dampak Terukur</p>
                <p className="font-display text-lg font-semibold text-[#1B3B2B]">
                  {activeVertical.outcome}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D8D6CE] flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#4A4D46]">
                Sektor {activeVertical.index} · Terverifikasi
              </span>
              <button
                type="button"
                onClick={() => onConsultSector(activeVertical.recommendedFocus)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Diskusikan Sektor Ini</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
