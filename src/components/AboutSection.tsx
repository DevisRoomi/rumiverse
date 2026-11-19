import { useReveal } from '../hooks/useReveal';
import { MaskedHeading } from './MaskedHeading';

export function AboutSection() {
  const { ref, visible } = useReveal<HTMLElement>(0.2);

  return (
    <section id="pendekatan" ref={ref} className="border-b border-[#D8D6CE] bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-[#D8D6CE] items-end">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs text-[#2E7D5B] tracking-wide mb-3">01. Tentang Kami</p>
            <MaskedHeading
              as="h2"
              className="font-display text-2xl sm:text-3xl font-bold text-[#121311] tracking-tight"
            >
              Cara Kami Bekerja
            </MaskedHeading>
          </div>
          <div className="lg:col-span-8">
            <p
              className="font-display text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#121311] leading-[1.35] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Teknologi boleh rumit di belakang layar. Cara pakainya tetap sederhana.
            </p>
          </div>
        </div>

        {/* 3-Column Editorial Layout with Animated Vertical Grid Rules */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 pt-12">
          <div
            aria-hidden="true"
            className={`hidden lg:block absolute top-0 bottom-0 left-1/3 w-px bg-[#D8D6CE] origin-top transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
            }`}
          />

          <div
            aria-hidden="true"
            className={`hidden lg:block absolute top-0 bottom-0 left-2/3 w-px bg-[#D8D6CE] origin-top transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
            }`}
          />

          <article
            className={`pb-8 lg:pb-0 lg:pr-10 border-b lg:border-b-0 border-[#D8D6CE] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <p className="font-mono text-xs text-[#4A4D46] mb-4">I. Lokasi Kami</p>
            <p className="text-base text-[#2D2F2A] leading-[1.72]">
              Kami berbasis di Lumajang, Jawa Timur. Kami memadukan riset software modern dengan
              laboratorium lapangan langsung untuk menghadirkan solusi digital yang teruji nyata.
            </p>
          </article>

          <article
            className={`py-8 lg:py-0 lg:px-10 border-b lg:border-b-0 border-[#D8D6CE] transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <p className="font-mono text-xs text-[#4A4D46] mb-4">II. Yang Kami Kerjakan</p>
            <p className="text-base text-[#2D2F2A] leading-[1.72]">
              Kami membuat situs dan aplikasi sesuai kebutuhan, menghubungkan AI untuk membantu
              pekerjaan berulang, dan menyatukan sistem agar pekerjaan sehari-hari lebih mudah
              dipantau.
            </p>
          </article>

          <article
            className={`pt-8 lg:pt-0 lg:pl-10 transition-all duration-500 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <p className="font-mono text-xs text-[#4A4D46] mb-4">III. Prinsip Kerja</p>
            <p className="text-base text-[#2D2F2A] leading-[1.72]">
              Kami menjelaskan pilihan teknologi dengan bahasa yang jelas dan membuat sistem yang
              mudah dirawat, sehingga tetap berguna dalam jangka panjang.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
