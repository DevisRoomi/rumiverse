import { Github, Linkedin, MapPin } from 'lucide-react';
import { STUDIO_CONTACT } from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';
import { useReveal } from '../hooks/useReveal';
import founderPhoto from '../assets/images/founder.jpg';

export function ExecutiveProfileSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.15);

  return (
    <section id="profil" ref={ref} className="border-b border-[#D8D6CE] bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Authentic Portrait Image Frame */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="p-3 sm:p-4 rounded-3xl bg-[#F4F3EF] border border-[#D8D6CE] shadow-sm">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#D8D6CE] bg-[#1B3B2B] group">
                <img
                  src={founderPhoto}
                  alt="Potret Ahmad Devis Jalaluddin Rumi — Rekayasawan & Pendiri RUMIVERSE"
                  className="w-full h-full object-cover contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Technical Vignette & Overlays */}
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(14,18,16,0.35)_100%] pointer-events-none" />

                {/* Technical Coordinates Badge */}
                <div className="absolute top-3 left-3 bg-[#121311]/75 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono text-[#74C69D] border border-white/10 shadow-xs">
                  8°08&apos;S 113°13&apos;E · LUMAJANG STUDIO
                </div>

                {/* Bottom Identity Card Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#121311]/85 backdrop-blur-md p-3 rounded-xl border border-white/15 flex items-center justify-between shadow-md">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[11px] text-[#F4F3EF] block font-bold tracking-tight">
                      AHMAD DEVIS J. RUMI
                    </span>
                    <span className="font-mono text-[10px] text-[#74C69D] block">
                      Systems Architect &amp; Software Engineer
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#74C69D] animate-pulse" />
                </div>
              </div>

              <div className="mt-3 px-1 flex items-center justify-between text-xs font-mono text-[#6B6E66]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D5B]" />
                  <span>Lumajang (Living Lab) &amp; Bogor (Studio)</span>
                </span>
                <span className="text-[#2E7D5B] font-semibold">● Rekayasa Langsung</span>
              </div>
            </div>
          </div>

          {/* Grounded Human Story Bio Copy */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="space-y-2">
              <p className="font-mono text-xs text-[#2E7D5B] tracking-wider uppercase font-semibold">
                07. Profil Rekayasawan &amp; Pendiri
              </p>
              <MaskedHeading
                as="h2"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121311] tracking-tight leading-snug"
              >
                Ahmad Devis Jalaluddin Rumi
              </MaskedHeading>
              <p className="font-mono text-xs text-[#6B6E66]">
                Founder &amp; Principal Systems Architect // RUMIVERSE
              </p>
            </div>

            <div className="space-y-4 text-[#2D2F2A] leading-relaxed">
              <p className="text-base sm:text-lg text-[#121311] leading-[1.7]">
                Berakar dari kecintaan mendalam pada rekayasa perangkat lunak dan otomasi fisik, saya mendirikan <strong>RUMIVERSE</strong> untuk menjembatani kode di layar komputer dengan kerja nyata di lapangan—mulai dari studio riset di Bogor hingga Living Lab peternakan terpadu di Lumajang.
              </p>
              <p className="text-sm sm:text-base text-[#4A4D46] leading-[1.7]">
                Prinsip kerja saya sederhana: <em>arsitektur sistem yang andal tidak lahir dari teori di atas kertas, melainkan dibuktikan langsung di tanah berlumpur, di dalam kandang tertutup, dan di samping aliran air kolam</em>. Saya turun tangan langsung merancang antarmuka web, merakit mikrokontroler sensor dari nol, hingga melatih agen AI untuk membaca anomali operasional—memastikan setiap modul bekerja presisi dan siap diandalkan oleh pemilik usaha.
              </p>
            </div>

            <div className="pt-6 border-t border-[#D8D6CE] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1">
                <span className="font-mono text-[10px] text-[#2E7D5B] uppercase font-bold tracking-wider block">
                  Fokus Rekayasa:
                </span>
                <p className="text-[#121311] font-medium leading-snug">
                  Arsitektur Web/Mobile, Autonomous AI Multi-Agent, &amp; Mikrokontroler IoT Telemetri
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] space-y-1">
                <span className="font-mono text-[10px] text-[#2E7D5B] uppercase font-bold tracking-wider block">
                  Pendekatan Lapangan:
                </span>
                <p className="text-[#121311] font-medium leading-snug">
                  Turun Langsung Menguji Prototipe dari Nol hingga Beroperasi Mandiri di Lokasi Klien
                </p>
              </div>
            </div>

            {/* Direct Verification Links */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/DevisRoomi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] hover:border-[#121311] text-xs font-mono font-medium text-[#121311] hover:bg-white transition-all shadow-2xs cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-[#121311]" />
                <span>github.com/DevisRoomi ↗</span>
              </a>
              <a
                href="https://linkedin.com/in/devisroomi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F3EF] border border-[#D8D6CE] hover:border-[#121311] text-xs font-mono font-medium text-[#121311] hover:bg-white transition-all shadow-2xs cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>linkedin.com/in/devisroomi ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
