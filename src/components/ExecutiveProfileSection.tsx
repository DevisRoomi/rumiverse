import { Github, Linkedin } from 'lucide-react';
import { MaskedHeading } from './MaskedHeading';
import { useReveal } from '../hooks/useReveal';
import founderPhoto from '../assets/images/founder.webp';

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
            {/* Clean Card Frame: Soft ivory background, 1px thin border, rounded-2xl, no heavy shadows */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F3EF] border border-[#D8D6CE] shadow-xs">
              {/* Photo Frame: Neutral warm studio backdrop, completely clear of overlays */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-[#D8D6CE] bg-gradient-to-b from-[#EAE8E1] via-[#E3E1D9] to-[#D8D6CE] group">
                <img
                  src={founderPhoto}
                  alt="Potret Abu Devis Jalaluddin Rumi — Rekayasawan & Pendiri RUMIVERSE"
                  className="w-full h-full object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Minimalist Identity Block (Outside image, directly underneath photo) */}
              <div className="mt-4 pt-1 space-y-1">
                {/* Baris 1 (Tebal) */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#121311] tracking-tight">
                  Abu Devis Jalaluddin Rumi
                </h3>

                {/* Baris 2 (Abu-abu lembut) */}
                <p className="font-mono text-xs sm:text-sm text-[#6B6E66]">
                  Founder &amp; Systems Architect
                </p>

                {/* Baris 3 (Teks kecil dengan satu titik hijau halus) */}
                <div className="pt-1.5 flex items-center gap-2 text-xs font-mono text-[#6B6E66]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]" />
                  <span>Lumajang · Bogor, Indonesia</span>
                </div>
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
                Abu Devis Jalaluddin Rumi
              </MaskedHeading>
              <p className="font-mono text-xs text-[#6B6E66]">
                Founder &amp; Principal Systems Architect // RUMIVERSE
              </p>
            </div>

            <div className="space-y-4 text-[#2D2F2A] leading-relaxed">
              <p className="text-base sm:text-lg text-[#121311] leading-[1.7]">
                Saya mendirikan <strong>RUMIVERSE</strong> untuk menghubungkan kode di layar komputer dengan kebutuhan kerja nyata di lapangan—mulai dari pengembangan aplikasi di Bogor hingga uji coba sistem peternakan terpadu di Lumajang.
              </p>
              <p className="text-sm sm:text-base text-[#4A4D46] leading-[1.7]">
                Bagi saya, arsitektur sistem yang baik tidak dinilai dari rumitnya teori di atas kertas, melainkan dari kemampuannya bekerja stabil saat diuji langsung di tanah berlumpur, di dalam kandang, dan di samping aliran air kolam. Saya turun tangan langsung dari merancang antarmuka web, merakit sensor fisik dari nol, hingga melatih model AI operasional agar setiap solusi benar-benar siap meringankan beban kerja Anda.
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
