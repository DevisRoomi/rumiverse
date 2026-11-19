import { ENGAGEMENT_ROADMAP } from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';
import { useReveal } from '../hooks/useReveal';

export function EngagementRoadmapSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.15);

  return (
    <section id="roadmap" ref={ref} className="border-b border-[#D8D6CE] bg-[#F4F3EF]">
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#D8D6CE] items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs text-[#2E7D5B] tracking-wide mb-3">
              06. Engagement Roadmap
            </p>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl font-bold text-[#121311] tracking-tight"
            >
              Alur Kerja Sama Terstruktur
            </MaskedHeading>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              Setiap implementasi dijalankan melalui empat fase bertahap dengan artefak teknis yang
              terukur dari audit awal hingga pemeliharaan jangka panjang.
            </p>
          </div>
        </div>

        {/* 4-Step Connected Horizontal/Vertical Roadmap */}
        <div className="relative pt-12">
          {/* Desktop horizontal connector rail */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[56px] left-0 right-0 h-px bg-[#D8D6CE]"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-0">
            {ENGAGEMENT_ROADMAP.map((phase, idx) => (
              <article
                key={phase.id}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className={`relative pl-8 pb-10 last:pb-0 lg:pl-0 lg:pb-0 lg:pr-8 border-l lg:border-l-0 border-[#D8D6CE] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {/* Node anchor marker on horizontal/vertical rail */}
                <div className="flex items-center gap-3 mb-6 h-4">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-[1px] lg:static w-3.5 h-3.5 bg-[#1B3B2B] border-2 border-[#F4F3EF] outline outline-1 outline-[#1B3B2B] shrink-0"
                  />
                  <span className="font-mono text-xs font-semibold text-[#2E7D5B] tabular-nums">
                    FASE {phase.step}
                  </span>
                  <span className="font-mono text-xs text-[#4A4D46]">· {phase.duration}</span>
                </div>

                <div className="lg:pt-2 lg:border-t lg:border-transparent">
                  <h3 className="font-display text-xl font-bold text-[#121311] tracking-tight">
                    {phase.step}. {phase.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#2D2F2A] leading-[1.68]">{phase.summary}</p>

                  <div className="mt-5 pt-4 border-t border-[#D8D6CE]">
                    <span className="block font-mono text-[11px] text-[#4A4D46] mb-1">
                      Keluaran Fase
                    </span>
                    <span className="text-xs font-semibold text-[#121311]">{phase.deliverable}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
