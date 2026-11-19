import { useState } from 'react';
import { Layers } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-zinc-100 text-zinc-700 p-8 text-center border border-zinc-200 ${className}`}
      >
        <Layers className="w-8 h-8 mb-3 text-zinc-500 stroke-[1.5]" aria-hidden="true" />
        <p className="font-display text-sm font-semibold text-zinc-900">{fallbackTitle}</p>
        {fallbackSubtitle && (
          <p className="mt-1 text-xs text-zinc-500 max-w-xs">{fallbackSubtitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
