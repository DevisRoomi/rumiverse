import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy, MessageCircle } from 'lucide-react';
import { STUDIO_CONTACT } from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';

interface FooterSectionProps {
  onOpenConsultation: () => void;
}

export function FooterSection({ onOpenConsultation }: FooterSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/6285122797969?text=${encodeURIComponent(
    'Halo Devis, saya tertarik berdiskusi mengenai implementasi arsitektur sistem presisi RUMIVERSE untuk usaha/lahan saya.'
  )}`;

  return (
    <footer id="kontak" className="bg-[#13241B] text-[#F4F3EF] relative overflow-hidden border-t border-[#233C2E]">
      {/* Subtle Architectural Grid Pattern Overlay */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="footerGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#74C69D" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#footerGrid)" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-4xl space-y-10">
          {/* Section Number & Tag */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-pulse" />
            <p className="font-mono text-xs text-[#74C69D] tracking-wider uppercase font-semibold">
              08. Kontak &amp; Diskusi Teknis // Mulai Proyek Anda
            </p>
          </div>

          <MaskedHeading
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F3EF] tracking-tight leading-[1.12]"
          >
            Mari bangun sistem presisi yang bekerja mandiri untuk bisnis Anda.
          </MaskedHeading>

          <p className="text-base sm:text-lg text-[#D0D6CF] leading-relaxed max-w-2xl">
            Dari audit masalah lapangan, integrasi kecerdasan buatan, hingga instalasi instrumen IoT fisik—kami siap mendengarkan rencana dan kebutuhan operasional Anda.
          </p>

          {/* Large Interactive Email Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1B3B2B]/70 border border-[#74C69D]/20 shadow-md space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <a
                href={`mailto:${STUDIO_CONTACT.email}`}
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F3EF] tracking-tight hover:text-[#74C69D] transition-colors break-all"
              >
                {STUDIO_CONTACT.email}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Salin alamat email"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-xl border border-[#74C69D]/30 bg-[#121311]/60 text-[#F4F3EF] hover:bg-[#121311] transition-all cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#74C69D]" aria-hidden="true" />
                    <span className="text-[#74C69D]">Email Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#74C69D]" aria-hidden="true" />
                    <span>Salin Alamat Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Quick Action Buttons (WhatsApp & Consultation) */}
            <div className="pt-4 border-t border-[#74C69D]/15 flex flex-wrap items-center gap-4">
              {/* Chat WhatsApp Direct Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#121311] font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat WhatsApp Langsung (+62 851-2279-7969)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Ajukan Pertemuan / Konsultasi Button */}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF9F6] hover:bg-white text-[#121311] font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <span>Ajukan Pertemuan / Jadwal Diskusi</span>
                <ArrowUpRight className="w-4 h-4 text-[#1B3B2B]" />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Footer Line with Studio Locations, Copyright & Back to Top */}
        <div className="mt-20 pt-8 border-t border-[#233C2E] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-[#A1A39B] font-mono">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <span className="text-[#F4F3EF] font-medium">
              Studio &amp; Living Lab: Lumajang (Jawa Timur) &amp; Bogor (Jawa Barat) · Indonesia
            </span>
            <span className="hidden sm:inline text-[#2E7D5B]">·</span>
            <span>Sesi daring &amp; kunjungan lapangan tersedia</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 RUMIVERSE · Arsitektur Sistem Presisi</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#74C69D]/30 text-[#74C69D] hover:bg-[#74C69D]/10 hover:text-white transition-all cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
