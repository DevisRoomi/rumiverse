import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface MaskedHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  immediate?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function MaskedHeading({
  as: Tag = 'h2',
  immediate = false,
  children,
  className = '',
  style,
}: MaskedHeadingProps) {
  const { ref, visible: inView } = useReveal<HTMLDivElement>(0.15);
  const [mounted, setMounted] = useState(immediate ? false : true);

  useEffect(() => {
    if (!immediate) return;
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, [immediate]);

  const isVisible = immediate ? mounted : inView;

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag
        data-visible={isVisible ? 'true' : 'false'}
        style={{ textWrap: 'balance', ...style }}
        className={`mask-reveal ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
}
