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

  const cleanPhone = STUDIO_CONTACT.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Halo Studio RUMIVERSE, saya tertarik berdiskusi mengenai implementasi arsitektur sistem presisi untuk bisnis/institusi saya.'
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

      <div className="relative max-w-[1440px] mx-auto px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <div className="max-w-4xl space-y-6 sm:space-y-7">
          {/* Section Number & Tag */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] animate-pulse" />
            <p className="font-mono text-xs text-[#74C69D] tracking-wider uppercase font-semibold">
              08. Kontak &amp; Diskusi Teknis // Mulai Proyek Anda
            </p>
          </div>

          <MaskedHeading
            as="h2"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F3EF] tracking-tight leading-[1.15]"
          >
            Punya rencana membangun aplikasi, otomasi AI, atau sistem lapangan? Mari diskusikan.
          </MaskedHeading>

          <p className="text-sm sm:text-base text-[#D0D6CF] leading-relaxed max-w-2xl">
            Baik untuk pembuatan aplikasi web, otomasi alur kerja, maupun pemasangan sensor di lapangan, Anda bisa langsung menghubungi saya untuk diskusi awal.
          </p>

          {/* Large Interactive Email Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1B3B2B]/70 border border-[#74C69D]/20 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <a
                href={`mailto:${STUDIO_CONTACT.email}`}
                className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4F3EF] tracking-tight hover:text-[#74C69D] transition-colors break-all"
              >
                {STUDIO_CONTACT.email}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Salin alamat email"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-xl border border-[#74C69D]/30 bg-[#121311]/60 text-[#F4F3EF] hover:bg-[#121311] transition-all cursor-pointer shadow-xs"
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
            <div className="pt-3 border-t border-[#74C69D]/15 flex flex-wrap items-center gap-3">
              {/* Chat WhatsApp Direct Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#121311] font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat WhatsApp Langsung ({STUDIO_CONTACT.phone})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Ajukan Pertemuan / Konsultasi Button */}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF9F6] hover:bg-white text-[#121311] font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <span>Ajukan Jadwal Diskusi</span>
                <ArrowUpRight className="w-4 h-4 text-[#1B3B2B]" />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Footer Line with Studio Locations, Copyright & Back to Top */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#233C2E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#A1A39B] font-mono">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <span className="text-[#F4F3EF] font-medium">
              Studio &amp; Living Lab: Lumajang (Jawa Timur) &amp; Bogor (Jawa Barat) · Indonesia
            </span>
            <span className="hidden sm:inline text-[#2E7D5B]">·</span>
            <span>Sesi daring &amp; kunjungan lapangan tersedia</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span>© 2026 RUMIVERSE · Arsitektur Sistem Presisi</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#74C69D]/30 text-[#74C69D] hover:bg-[#74C69D]/10 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono font-medium"
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
