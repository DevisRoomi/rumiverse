import { useEffect, useRef } from 'react';

interface SmokeRing {
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialRadius: number;
  targetRadius: number;
  initialLineWidth: number;
  rotation: number;
  rotSpeed: number;
  wobblePhase: number;
  wobbleFreq: number;
  life: number;
  maxLife: number;
  isDark: boolean;
  hue: number;
  peakAlpha: number;
}

export function GlobalSmokeCursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (no touch screens)
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;
    const rings: SmokeRing[] = [];
    const MAX_RINGS = 35;

    let lastSpawnX = 0;
    let lastSpawnY = 0;
    let lastSpawnTime = 0;
    let spawnCounter = 0;

    // High-DPI responsive viewport sizing
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Intelligently detect if cursor is hovering over a dark or light background
    const checkIsDark = (clientX: number, clientY: number): boolean => {
      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return false;

      // Fast check for dark container classes and dark zones
      if (
        el.closest(
          '.bg-\\[\\#121311\\], .bg-\\[\\#181A16\\], .bg-\\[\\#1B3B2B\\], [data-theme="dark"], footer, #footer, [role="dialog"]'
        )
      ) {
        return true;
      }

      // Check computed background color up to 4 ancestors
      let curr: Element | null = el;
      let depth = 0;
      while (curr && depth < 4 && curr !== document.body) {
        const bg = window.getComputedStyle(curr).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = Number(match[0]);
            const g = Number(match[1]);
            const b = Number(match[2]);
            const luminance = (r * 299 + g * 587 + b * 114) / 1000;
            return luminance < 120;
          }
        }
        curr = curr.parentElement;
        depth++;
      }
      return false;
    };

    const spawnRing = (x: number, y: number, dirX: number, dirY: number, isDark: boolean, scaleMultiplier = 1.0) => {
      if (rings.length >= MAX_RINGS) {
        rings.shift();
      }

      const initialRadius = (Math.random() * 4 + 14) * scaleMultiplier;
      const targetRadius = (Math.random() * 24 + 56) * scaleMultiplier;
      const initialLineWidth = isDark ? 2.4 * scaleMultiplier : 1.2 * scaleMultiplier;
      const peakAlpha = isDark ? 0.32 : 0.08; // Translucent glow on dark; ultra-sheer kinetic ripple on light
      const hue = isDark ? 154 + Math.random() * 18 : 158 + Math.random() * 12;

      rings.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: dirX * 0.3 + (Math.random() - 0.5) * 0.25,
        vy: dirY * 0.2 - (Math.random() * 0.35 + 0.45), // buoyant upward drift
        initialRadius,
        targetRadius,
        initialLineWidth,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleFreq: Math.random() > 0.5 ? 2 : 3,
        life: 0,
        maxLife: Math.round(Math.random() * 18 + 52), // ~1.0 - 1.2s at 60fps
        isDark,
        hue,
        peakAlpha,
      });
    };

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const dx = clientX - lastSpawnX;
      const dy = clientY - lastSpawnY;
      const dist = Math.hypot(dx, dy);

      // Multi-ring trail: spawn when moved sufficiently or with smooth time stagger
      if (dist >= 15 || (now - lastSpawnTime >= 50 && dist >= 5)) {
        const dirX = dist > 0 ? dx / dist : 0;
        const dirY = dist > 0 ? dy / dist : 0;
        const isDark = checkIsDark(clientX, clientY);

        spawnRing(clientX, clientY, dirX, dirY, isDark, 1.0);
        spawnCounter++;

        // Staggered companion ring every 2nd emission for deep vortex trail depth
        if (spawnCounter % 2 === 0) {
          spawnRing(clientX - dirX * 6, clientY - dirY * 6, dirX * 0.6, dirY * 0.6, isDark, 0.68);
        }

        lastSpawnX = clientX;
        lastSpawnY = clientY;
        lastSpawnTime = now;

        if (!isRunning) {
          isRunning = true;
          render();
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life++;

        if (ring.life >= ring.maxLife) {
          rings.splice(i, 1);
          continue;
        }

        const progress = ring.life / ring.maxLife; // 0 to 1
        // power2.out expansion curve: rapid initial puff, smooth deceleration
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        const radius = ring.initialRadius + (ring.targetRadius - ring.initialRadius) * easeOutQuad;

        // Organic drift & upward float
        ring.x += ring.vx + Math.sin(progress * Math.PI * 2 + ring.wobblePhase) * 0.35;
        ring.y += ring.vy;
        ring.rotation += ring.rotSpeed;

        // Bell-curve opacity: rises smoothly, peaks, and dissipates to zero without hard cuts
        const alpha = Math.sin(progress * Math.PI) * ring.peakAlpha;
        const currentLineWidth = Math.max(0.5, ring.initialLineWidth * (1 - progress * 0.55));

        // Jellyfish pulse morphing (squash & stretch ratio)
        const pulse = Math.sin(progress * Math.PI * 3 + ring.wobblePhase) * 0.08;
        const radiusX = radius * (1 + pulse);
        const radiusY = radius * (1 - pulse);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(ring.x, ring.y, radiusX, radiusY, ring.rotation, 0, Math.PI * 2);
        ctx.lineWidth = currentLineWidth;

        if (ring.isDark) {
          // Luminous emerald / mint vape ring on dark background
          ctx.strokeStyle = `hsla(${ring.hue}, 48%, 68%, ${alpha})`;
          ctx.shadowColor = `hsla(${ring.hue}, 56%, 55%, ${alpha * 0.8})`;
          ctx.shadowBlur = 9 * (1 - progress * 0.3);
          ctx.stroke();

          // Delicate secondary inner concentric ring for smoke thickness
          ctx.beginPath();
          ctx.ellipse(ring.x, ring.y, radiusX * 0.72, radiusY * 0.72, ring.rotation, 0, Math.PI * 2);
          ctx.lineWidth = Math.max(0.5, currentLineWidth * 0.55);
          ctx.strokeStyle = `hsla(${ring.hue}, 52%, 76%, ${alpha * 0.45})`;
          ctx.shadowBlur = 4;
          ctx.stroke();
        } else {
          // Ultra-sheer kinetic air ripple on light background (never disturbs reading text!)
          ctx.strokeStyle = `rgba(38, 72, 56, ${alpha})`;
          ctx.shadowColor = `rgba(38, 72, 56, ${alpha * 0.4})`;
          ctx.shadowBlur = 3;
          ctx.stroke();
        }

        ctx.restore();
      }

      if (rings.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      aria-hidden="true"
    />
  );
}
