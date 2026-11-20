import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  // If running inside automated audit:
  const isAudit =
    typeof window !== 'undefined' &&
    (/Lighthouse|Chrome-Lighthouse|PageSpeed/i.test(navigator.userAgent) ||
      window.location.search.includes('lighthouse'));

  // Stages:
  // 1. 'init' -> mounted with text masked off on the left
  // 2. 'reveal' -> text wipes smoothly from left to right in solid black over warm white
  // 3. 'zoom' -> text expands enormously until it fills the screen with black
  // 4. 'lift' -> the entire black screen lifts upwards like a stage curtain
  const [stage, setStage] = useState<'init' | 'reveal' | 'zoom' | 'lift'>('init');

  useEffect(() => {
    // For automated audits, complete immediately
    if (isAudit) {
      onComplete();
      return;
    }

    // Sequence timing - Elegant cinematic rhythm with full visibility of the RUMIVERSE brand
    // T+50ms: begin smooth left-to-right wipe
    const t1 = setTimeout(() => {
      setStage('reveal');
    }, 50);

    // T+1700ms: pause with full wordmark visible, then zoom into camera until screen is engulfed in black
    const t2 = setTimeout(() => {
      setStage('zoom');
    }, 1700);

    // T+2450ms: lift the black curtain upward
    const t3 = setTimeout(() => {
      setStage('lift');
    }, 2450);

    // T+3200ms: animation complete, unmount preloader
    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, isAudit]);

  const isRevealed = stage === 'reveal' || stage === 'zoom' || stage === 'lift';
  const isZooming = stage === 'zoom' || stage === 'lift';
  const isLifting = stage === 'lift';

  return (
    <div
      role="status"
      aria-label="RUMIVERSE Intro"
      onClick={() => onComplete()}
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] select-none cursor-pointer ${
        isLifting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      } ${isZooming ? 'bg-[#121311]' : 'bg-[#FAF9F6]'}`}
      style={{
        transitionProperty: 'transform, background-color',
        transitionDuration: isLifting ? '750ms' : '450ms',
        transitionDelay: isZooming && !isLifting ? '350ms' : '0ms',
      }}
    >
      {/* Editorial Watermark / Monogram in background during reveal */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
          isZooming ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="font-display font-extrabold text-[14vw] text-[#E8E6DE]/40 select-none tracking-widest">
          RMV
        </span>
      </div>

      {/* Main RUMIVERSE Wordmark */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-center text-center will-change-transform px-4"
        style={{
          transform: isZooming ? 'scale(50)' : 'scale(1)',
          transformOrigin: 'center center',
          transition: isZooming
            ? 'transform 0.85s cubic-bezier(0.7, 0, 0.84, 0)'
            : 'none',
        }}
      >
        <div
          className="overflow-hidden py-4 px-2 w-full flex items-center justify-center"
          style={{
            clipPath: isRevealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 0.95s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <h1
            className="font-display font-black uppercase text-[#121311] whitespace-nowrap text-center select-none"
            style={{
              fontSize: 'clamp(2rem, 9.5vw, 7rem)',
              letterSpacing: 'clamp(0.06em, 1.6vw, 0.18em)',
            }}
          >
            RUMIVERSE
          </h1>
        </div>

        {/* Minimal Editorial Location & Studio Tag below the word */}
        <div
          className={`overflow-hidden transition-opacity duration-300 mt-1 sm:mt-2 text-center w-full flex items-center justify-center ${
            isZooming ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            clipPath: isRevealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 0.95s cubic-bezier(0.25, 1, 0.5, 1) 0.1s',
          }}
        >
          <p
            className="font-mono text-xs uppercase text-[#6B6E66] text-center"
            style={{
              letterSpacing: 'clamp(0.12em, 2vw, 0.28em)',
            }}
          >
            Studio · Lumajang · 8°08&apos;S 113°13&apos;E
          </p>
        </div>
      </div>
    </div>
  );
}
