import { useRef, useState, type ReactNode } from 'react';

interface MagneticBaseProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

type MagneticButtonProps = MagneticBaseProps &
  (
    | {
        href: string;
        onClick?: () => void;
        type?: never;
      }
    | {
        href?: undefined;
        onClick?: () => void;
        type?: 'button' | 'submit' | 'reset';
      }
  );

export function MagneticButton({
  children,
  className = '',
  strength = 6,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Disable magnetic physics on touchscreens, mobile, or reduced motion
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(hover: none)').matches ||
        window.innerWidth < 768
      ) {
        return;
      }
    }

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const relX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setOffset({
        x: Math.max(-strength, Math.min(strength, relX * strength)),
        y: Math.max(-strength, Math.min(strength, relY * strength)),
      });
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setOffset({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
    transition:
      offset.x === 0 && offset.y === 0
        ? 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)'
        : 'transform 80ms linear',
  };

  if ('href' in props && props.href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        onClick={props.onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
    >
      {children}
    </button>
  );
}
