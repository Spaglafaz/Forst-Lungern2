import Image from 'next/image';
import { ArrowRule } from './ArrowRule';
import { TLink } from '../motion/TLink';

export function PhotoCard({
  image,
  title,
  meta,
  children,
  href,
  aspect = '4 / 3',
  layout = 'below',
  sizes = '(max-width: 700px) 100vw, 380px',
}: {
  image: string;
  title: string;
  meta?: string;
  children?: React.ReactNode;
  href: string;
  aspect?: string;
  layout?: 'below' | 'overlay';
  sizes?: string;
}) {
  const overlay = layout === 'overlay';
  return (
    <TLink href={href} className={'photo-card' + (overlay ? ' photo-card--overlay' : '')} data-tilt="">
      <div className="photo-card__media" style={{ aspectRatio: aspect }}>
        <Image src={image} alt="" fill sizes={sizes} />
        {overlay && <div className="photo-card__scrim" />}
      </div>
      <div className="photo-card__body">
        {meta && <div className="photo-card__meta">{meta}</div>}
        <h3 className="photo-card__title">{title}</h3>
        {children && <p className="photo-card__text">{children}</p>}
        <ArrowRule thickness={1.5} className="photo-card__rule" width={null} color={overlay ? '#fff' : 'var(--accent-line)'} />
      </div>
      <span className="photo-card__shine" aria-hidden />
    </TLink>
  );
}
