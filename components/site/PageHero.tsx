import Image from 'next/image';

export function PageHero({
  image,
  pos = 'center',
  eyebrow,
  title,
  text,
  alt = '',
  home = false,
  children,
}: {
  image: string;
  pos?: string;
  eyebrow: string;
  title: string;
  text: string;
  alt?: string;
  home?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={'hero ' + (home ? 'hero--home' : 'hero--page')} data-hero="">
      <div className="hero__media">
        <Image src={image} alt={alt} fill priority sizes="100vw" style={{ objectPosition: pos }} />
      </div>
      <div className="hero__scrim" />
      <div className="hero__scrim hero__scrim--bottom" />
      <div className="hero__content">
        <p className="hero__eyebrow" data-hero-item="">
          {eyebrow}
        </p>
        <h1 className="hero__title" data-hero-item="">
          {title}
        </h1>
        <p className="hero__text" data-hero-item="">
          {text}
        </p>
        {children && (
          <div className="hero__actions" data-hero-item="">
            {children}
          </div>
        )}
      </div>
      {home && (
        <div className="hero__scroll" aria-hidden>
          <span>Scrollen</span>
          <span className="hero__scroll-line" />
        </div>
      )}
    </section>
  );
}
