import { STUDIO_CONTACT } from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';
import { useReveal } from '../hooks/useReveal';

export function ExecutiveProfileSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.15);

  return (
    <section id="profil" ref={ref} className="border-b border-[#D8D6CE] bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Geometric Architectural Blueprint Emblem (Zero Human Photo) */}
          <div
            className={`lg:col-span-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="border border-[#D8D6CE] bg-[#F4F3EF] p-6 sm:p-10">
              <div className="aspect-square w-full border border-[#D8D6CE] bg-[#1B3B2B] relative flex flex-col justify-between p-6 overflow-hidden">
                {/* Architectural SVG Blueprint Overlay */}
                <svg
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full opacity-40"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="emblemGrid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="#74C69D"
                        strokeWidth="0.45"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#emblemGrid)" />
                  <circle
                    cx="200"
                    cy="200"
                    r="138"
                    fill="none"
                    stroke="#F4F3EF"
                    strokeWidth="0.85"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="96"
                    fill="none"
                    stroke="#74C69D"
                    strokeWidth="1"
                  />
                  <rect
                    x="104"
                    y="104"
                    width="192"
                    height="192"
                    fill="none"
                    stroke="#F4F3EF"
                    strokeWidth="0.8"
                  />
                  <line x1="200" y1="24" x2="200" y2="376" stroke="#74C69D" strokeWidth="0.7" />
                  <line x1="24" y1="200" x2="376" y2="200" stroke="#74C69D" strokeWidth="0.7" />
                  <line x1="62" y1="62" x2="338" y2="338" stroke="#F4F3EF" strokeWidth="0.45" />
                  <line x1="338" y1="62" x2="62" y2="338" stroke="#F4F3EF" strokeWidth="0.45" />
                </svg>

                {/* Top Blueprint Coordinates */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#74C69D]">
                  <span>8°08&apos;S 113°13&apos;E</span>
                  <span>LUMAJANG STUDIO</span>
                </div>

                {/* Center Precision Typographic Monogram */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8">
                  <span className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-[#F4F3EF]">
                    ADR
                  </span>
                  <div className="mt-4 px-3 py-1.5 bg-[#121311]/85 border border-[#2E7D5B] font-mono text-[11px] tracking-[0.16em] text-[#74C69D]">
                    {STUDIO_CONTACT.monogram}
                  </div>
                </div>

                {/* Bottom Blueprint Scale Bar */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#D0D6CF]">
                  <span>SYSTEMS ARCHITECTURE</span>
                  <span>AI &amp; IOT LAB</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#D8D6CE] flex items-center justify-between text-xs font-mono text-[#4A4D46]">
                <span>Blueprint Monogram</span>
                <span>Lumajang · Studio &amp; Living Lab</span>
              </div>
            </div>
          </div>

          {/* Bio Copy */}
          <div
            className={`lg:col-span-7 space-y-8 transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div>
              <p className="font-mono text-xs text-[#2E7D5B] tracking-wide mb-3">
                06. Profil Rekayasawan &amp; Pendiri
              </p>
              <MaskedHeading
                as="h2"
                className="font-display text-2xl sm:text-4xl font-bold text-[#121311] tracking-tight"
              >
                {STUDIO_CONTACT.architectName} — {STUDIO_CONTACT.architectRole}
              </MaskedHeading>
            </div>

            <p className="text-lg sm:text-xl text-[#2D2F2A] leading-[1.68] max-w-2xl">
              Menggabungkan keandalan manajerial dengan akurasi rekayasa perangkat lunak.
              Berpengalaman memimpin tim dari garis depan untuk memastikan setiap baris kode,
              logika AI, dan sensor IoT bekerja secara selaras membentuk ekosistem yang
              berkelanjutan.
            </p>

            <div className="pt-8 border-t border-[#D8D6CE] grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-mono text-xs text-[#4A4D46] mb-1.5">Disiplin Inti</p>
                <p className="text-[#121311] font-semibold">
                  Arsitektur Sistem Enterprise, Otomasi AI, &amp; Telemetri IoT
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#4A4D46] mb-1.5">Pendekatan Lapangan</p>
                <p className="text-[#121311] font-semibold">
                  Kepemimpinan Teknis Langsung dari Cetak Biru hingga Implementasi Fisik
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
