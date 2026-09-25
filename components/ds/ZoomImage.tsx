import Image from 'next/image';

/** Foto mit Vorhang-Reveal beim Scrollen und sanftem Hover-Zoom. */
export function ZoomImage({
  src,
  alt,
  aspect = '4 / 3',
  pos = 'center',
  from = 'up',
  sizes = '(max-width: 900px) 100vw, 560px',
  shadow = true,
  style,
  priority,
}: {
  src: string;
  alt: string;
  aspect?: string;
  pos?: string;
  from?: 'up' | 'left' | 'right';
  sizes?: string;
  shadow?: boolean;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  return (
    <div className="zoom-box" data-zoom={from} style={{ aspectRatio: aspect, boxShadow: shadow ? undefined : 'none', ...style }}>
      <div className="zoom-box__inner" style={{ inset: '-6% 0' }}>
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectPosition: pos }} priority={priority} />
      </div>
    </div>
  );
}
