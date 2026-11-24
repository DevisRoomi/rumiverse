import { useEffect, useRef } from 'react';

interface SoftSmokeRing {
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialRadius: number;
  targetRadius: number;
  life: number;
  maxLife: number;
  isDark: boolean;
  hue: number;
  peakAlpha: number;
  wobblePhase: number;
}

export function GlobalSmokeCursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (no mobile/touch screens)
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;
    const rings: SoftSmokeRing[] = [];
    const MAX_RINGS = 14; // Keep canvas light and uncluttered

    let lastSpawnX = -999;
    let lastSpawnY = -999;
    let lastSpawnTime = 0;

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
          '[class*="bg-[#121311]"], [class*="bg-[#181A16]"], [class*="bg-[#1B3B2B]"], [class*="bg-[#13241B]"], [data-theme="dark"], footer, #footer, [role="dialog"]'
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

    const spawnSmokeDonut = (x: number, y: number, dirX: number, dirY: number, isDark: boolean) => {
      if (rings.length >= MAX_RINGS) {
        rings.shift();
      }

      // Expansion parameters: start compact near cursor, billow widely into soft mist
      const initialRadius = Math.random() * 4 + 14;
      const targetRadius = Math.random() * 35 + 95; // Wide soft expansion
      // Lowered peak opacity (0.15 - 0.22 on dark; 0.05 on light) for authentic vapor feel
      const peakAlpha = isDark ? 0.20 : 0.05;
      const hue = isDark ? 154 + Math.random() * 16 : 158;

      rings.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: dirX * 0.25 + (Math.random() - 0.5) * 0.3,
        vy: dirY * 0.15 - (Math.random() * 0.4 + 0.8), // Clean buoyant drift upward
        initialRadius,
        targetRadius,
        life: 0,
        maxLife: Math.round(Math.random() * 8 + 62), // ~1.05 - 1.15 seconds (vanishes within 1.2s)
        isDark,
        hue,
        peakAlpha,
        wobblePhase: Math.random() * Math.PI * 2,
      });
    };

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (lastSpawnX === -999) {
        lastSpawnX = clientX;
        lastSpawnY = clientY;
        lastSpawnTime = now;
        return;
      }

      const dx = clientX - lastSpawnX;
      const dy = clientY - lastSpawnY;
      const dist = Math.hypot(dx, dy);

      // Throttling: exactly 1 soft ring every 36px of travel (fits 30-40px perfectly)
      const MIN_SPAWN_DIST = 36;
      if (dist >= MIN_SPAWN_DIST && now - lastSpawnTime >= 60) {
        const dirX = dx / dist;
        const dirY = dy / dist;
        const isDark = checkIsDark(clientX, clientY);

        spawnSmokeDonut(clientX, clientY, dirX, dirY, isDark);

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
        // power2.out expansion curve: fast initial puff, smoothly slowing down as it disperses
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        const radius = ring.initialRadius + (ring.targetRadius - ring.initialRadius) * easeOutQuad;

        // Organic upward float with subtle horizontal air swirl
        ring.x += ring.vx + Math.sin(progress * Math.PI * 2 + ring.wobblePhase) * 0.4;
        ring.y += ring.vy;

        // Smooth dissipation bell curve: rises, peaks, and evaporates completely before 1.2s
        const alpha = Math.sin(progress * Math.PI) * ring.peakAlpha;

        // Radial-gradient donut geometry: feathered hole at center, misty body, feathered outer edge
        const rInner = Math.max(0, radius * 0.32);
        const rOuter = radius * 1.35;

        const grad = ctx.createRadialGradient(ring.x, ring.y, rInner, ring.x, ring.y, rOuter);

        if (ring.isDark) {
          // Velvety emerald / sage vapor on dark background
          grad.addColorStop(0, `hsla(${ring.hue}, 48%, 68%, 0)`);
          grad.addColorStop(0.25, `hsla(${ring.hue}, 48%, 68%, ${alpha * 0.3})`);
          grad.addColorStop(0.5, `hsla(${ring.hue}, 52%, 72%, ${alpha})`); // peak foggy ring
          grad.addColorStop(0.75, `hsla(${ring.hue}, 46%, 62%, ${alpha * 0.35})`);
          grad.addColorStop(1, `hsla(${ring.hue}, 40%, 50%, 0)`); // feathered outer veil
        } else {
          // Ultra-sheer kinetic air shimmer on light background (never obscures text!)
          grad.addColorStop(0, `rgba(46, 85, 68, 0)`);
          grad.addColorStop(0.25, `rgba(46, 85, 68, ${alpha * 0.3})`);
          grad.addColorStop(0.5, `rgba(46, 85, 68, ${alpha})`);
          grad.addColorStop(0.75, `rgba(46, 85, 68, ${alpha * 0.35})`);
          grad.addColorStop(1, `rgba(46, 85, 68, 0)`);
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, rOuter, 0, Math.PI * 2);
        ctx.fill();
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
      className="fixed inset-0 pointer-events-none z-40 [filter:blur(10px)]"
      aria-hidden="true"
    />
  );
}
