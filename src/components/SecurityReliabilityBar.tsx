import { RELIABILITY_SPECS } from '../utils/ecosystemData';

export function SecurityReliabilityBar() {
  return (
    <section
      aria-label="Standar Keamanan & Keandalan Infrastruktur"
      className="bg-[#121311] text-[#F4F3EF] border-b border-[#2D2F2A]"
    >
      <div className="max-w-[1440px] mx-auto px-6 py-10 sm:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#2D2F2A]">
          <span className="font-mono text-xs text-[#74C69D] tracking-wide uppercase font-semibold">
            07. INFRASTRUCTURE SECURITY &amp; RELIABILITY SPECIFICATIONS
          </span>
          <span className="font-mono text-xs text-[#A1A39B]">
            STANDAR KEAMANAN &amp; KEANDALAN ENTERPRISE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#2D2F2A] pt-6">
          {RELIABILITY_SPECS.map((spec, idx) => (
            <div
              key={spec.code}
              className={`py-4 lg:py-2 ${
                idx >= 2 ? 'sm:border-t sm:border-[#2D2F2A] lg:border-t-0' : ''
              } ${idx % 2 === 1 ? 'sm:border-l sm:border-[#2D2F2A] lg:border-l-0 sm:pl-6' : 'sm:pr-6'} ${
                idx === 0
                  ? 'lg:pl-0 lg:pr-6'
                  : idx === RELIABILITY_SPECS.length - 1
                    ? 'lg:pl-6 lg:pr-0'
                    : 'lg:px-6'
              }`}
            >
              <p className="font-mono text-[11px] text-[#74C69D] mb-1.5">{spec.code}</p>
              <h3 className="font-mono text-sm font-semibold text-[#F4F3EF] tracking-tight">
                {spec.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-[#A1A39B] leading-relaxed">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
