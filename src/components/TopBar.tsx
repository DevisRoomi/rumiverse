import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_CONTACT } from '../utils/ecosystemData';
import { MagneticButton } from './MagneticButton';

interface TopBarProps {
  onOpenConsultation: () => void;
}

const NAV_LINKS = [
  { href: '#pendekatan', label: 'Pendekatan' },
  { href: '#pilar', label: 'Pilar' },
  { href: '#masterplan', label: 'Living Lab' },
  { href: '#simulasi', label: 'Simulasi' },
  { href: '#profil', label: 'Profil' },
] as const;

export function TopBar({ onOpenConsultation }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F4F3EF] border-b border-[#D8D6CE] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-[60px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line wordmark */}
        <a
          href="#hero"
          className="font-display text-sm sm:text-base font-bold tracking-tight text-[#121311] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B]"
        >
          {STUDIO_CONTACT.brand}
        </a>

        {/* Zone 2: Clean single-line text links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4D46]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#121311] transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#1B3B2B] hover:after:w-full after:transition-all after:duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Magnetic primary CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-tight text-[#F4F3EF] bg-[#1B3B2B] hover:bg-[#121311] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
          >
            Mulai Diskusi
          </MagneticButton>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#D8D6CE] text-[#121311] hover:bg-[#EAE8E1] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D8D6CE] bg-[#F4F3EF]">
          <nav aria-label="Navigasi seluler" className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileLinkClick}
                className="py-3 text-sm font-medium text-[#121311] border-b border-[#D8D6CE] last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-3 w-full py-3 px-4 text-sm font-semibold text-[#F4F3EF] bg-[#1B3B2B] hover:bg-[#121311] transition-colors duration-150 cursor-pointer"
            >
              Mulai Diskusi
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
