import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { STUDIO_CONTACT } from '../utils/ecosystemData';
import { MaskedHeading } from './MaskedHeading';
import { MagneticButton } from './MagneticButton';

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

  return (
    <footer id="kontak" className="bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-32">
        <div className="max-w-4xl space-y-10">
          <p className="font-mono text-xs text-[#2E7D5B] tracking-wide">
            08. Kontak &amp; Diskusi Teknis
          </p>

          <MaskedHeading
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121311] tracking-tight leading-[1.12]"
          >
            Mari bangun sistem yang bekerja untuk Anda.
          </MaskedHeading>

          {/* Large sans-serif email block */}
          <div className="pt-4 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${STUDIO_CONTACT.email}`}
                className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121311] tracking-tight underline decoration-[#D8D6CE] underline-offset-8 hover:decoration-[#1B3B2B] transition-colors duration-150 break-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B]"
              >
                {STUDIO_CONTACT.email}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Salin alamat email"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono border border-[#D8D6CE] bg-[#F4F3EF] text-[#121311] hover:bg-[#EAE8E1] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2E7D5B]" aria-hidden="true" />
                    <span>Email Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Salin Email</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
              <a
                href={STUDIO_CONTACT.phoneHref}
                className="font-mono text-lg sm:text-xl font-medium text-[#121311] hover:text-[#2E7D5B] transition-colors duration-150 tabular-nums"
              >
                {STUDIO_CONTACT.phone}
              </a>

              <MagneticButton
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#1B3B2B] text-[#F4F3EF] hover:bg-[#121311] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
              >
                <span>Ajukan Pertemuan</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Quiet bottom line */}
        <div className="mt-20 pt-8 border-t border-[#D8D6CE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#4A4D46]">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <p className="italic font-medium text-[#121311]">{STUDIO_CONTACT.location}</p>
            <span className="hidden sm:inline text-[#9EA69D]" aria-hidden="true">
              ·
            </span>
            <p className="italic text-[#4A4D46]">{STUDIO_CONTACT.appointmentNote}</p>
          </div>

          <p className="font-mono text-xs text-[#4A4D46]">
            © {new Date().getFullYear()} {STUDIO_CONTACT.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
