import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  life: number;
  decay: number;
  hue: number;
}

export function SmokeCursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for coarse pointer (touch/mobile devices) - avoid unnecessary rendering
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;
    const particles: Particle[] = [];
    const MAX_PARTICLES = 40;

    // Responsive high-DPI scaling
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const spawnParticles = (x: number, y: number) => {
      // Spawn delicate, ethereal mist wisps
      const count = 2;
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.2;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.25, // gentle buoyant drift upward
          radius: Math.random() * 14 + 16,
          maxRadius: Math.random() * 40 + 50,
          life: 0,
          decay: Math.random() * 0.014 + 0.012,
          hue: 156 + Math.random() * 16, // subtle emerald/sage tint (156-172)
        });
      }

      if (!isRunning) {
        isRunning = true;
        render();
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnParticles(x, y);
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.006; // soft buoyancy upward
        p.life += p.decay;

        if (p.life >= 1) {
          particles.splice(i, 1);
          continue;
        }

        // Smooth radial expansion
        const progress = p.life;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.sin((progress * Math.PI) / 2);
        // Bell-curve opacity: rises gently, floats, then softly evaporates
        const alpha = Math.sin(progress * Math.PI) * 0.14;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        grad.addColorStop(0, `hsla(${p.hue}, 42%, 65%, ${alpha * 1.3})`);
        grad.addColorStop(0.35, `hsla(${p.hue}, 38%, 45%, ${alpha * 0.7})`);
        grad.addColorStop(0.7, `hsla(${p.hue}, 30%, 25%, ${alpha * 0.2})`);
        grad.addColorStop(1, `hsla(${p.hue}, 25%, 15%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener('mousemove', handlePointerMove);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
