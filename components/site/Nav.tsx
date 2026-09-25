'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { NAV, CONTACT } from '@/lib/data';
import { TLink } from '../motion/TLink';
import { useSite } from '../motion/MotionShell';
import { Button } from '../ds/Button';
import { Icon } from '../ds/Icon';
import { gsap, ScrollTrigger, useGSAP, motionEnabled } from '../motion/gsap';
import { asset } from '@/lib/base';

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

export function Nav() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useSite();
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  /* Einblenden, Verstecken beim Runterscrollen, Fortschrittsbalken */
  useGSAP(
    () => {
      const header = headerRef.current!;
      if (!motionEnabled()) return;
      // fromTo mit festen Endwerten: CSS-Transitions verfälschen sonst den gemessenen Startwert
      gsap.fromTo(
        header.querySelectorAll('.nav__logo, .nav__link, .nav__cta, .nav__menu-btn'),
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.9, ease: 'expo.out', delay: 0.7, clearProps: 'opacity,transform' },
      );
      const hide = gsap.to(header, { yPercent: -150, duration: 0.45, ease: 'power3.inOut', paused: true });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          header.classList.toggle('is-scrolled', y > 40);
          if (y < 160 || self.direction === -1) hide.reverse();
          else hide.play();
          gsap.set(progressRef.current, { scaleX: self.progress });
        },
      });
    },
    { scope: headerRef },
  );

  /* Nach Seitenwechsel die Leiste wieder zeigen */
  useEffect(() => {
    gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, overwrite: 'auto' });
  }, [pathname]);

  /* Aktiv-Linie gleitet zum aktuellen Menüpunkt */
  useEffect(() => {
    const links = linksRef.current;
    const ind = indicatorRef.current;
    if (!links || !ind) return;
    const place = (animate: boolean) => {
      const active = links.querySelector<HTMLElement>('.nav__link.is-active');
      if (!active) {
        gsap.to(ind, { opacity: 0, duration: 0.3 });
        return;
      }
      const vars = { x: active.offsetLeft, width: active.offsetWidth, opacity: 1 };
      if (animate && motionEnabled()) gsap.to(ind, { ...vars, duration: 0.7, ease: 'expo.inOut' });
      else gsap.set(ind, vars);
    };
    place(true);
    const onResize = () => place(false);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(() => place(false));
    return () => window.removeEventListener('resize', onResize);
  }, [pathname]);

  return (
    <>
      <header className="nav" ref={headerRef}>
        <div className="nav__inner">
          <TLink href="/" className="nav__logo" aria-label="Forst Lungern AG – Startseite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/assets/logo-white.png')} alt="Forst Lungern AG" width={64} height={64} />
          </TLink>
          <nav className="nav__links" ref={linksRef} aria-label="Hauptnavigation">
            {NAV.map((n) => (
              <TLink key={n.href} href={n.href} className={'nav__link' + (isActive(pathname, n.href) ? ' is-active' : '')}>
                {n.label}
              </TLink>
            ))}
            <span className="nav__indicator" ref={indicatorRef} style={{ opacity: 0 }} />
          </nav>
          <span className="nav__cta">
            <Button size="sm" href="/kontakt">
              Kontakt
            </Button>
          </span>
          <span className="nav__menu-btn">
            <Button size="sm" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? 'Schliessen' : 'Menü'}
            </Button>
          </span>
        </div>
        <span className="nav__progress" ref={progressRef} />
      </header>
      <MobileMenu />
      <MobileBar />
    </>
  );
}

function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: 'visible' })
        .to(el, { clipPath: 'circle(150% at calc(100% - 48px) 38px)', duration: 0.9, ease: 'expo.inOut' })
        .from(el.querySelectorAll('.menu__link-text'), { yPercent: 110, duration: 0.8, stagger: 0.05, ease: 'expo.out' }, 0.35)
        .from(el.querySelectorAll('.menu__link-num'), { opacity: 0, x: -10, duration: 0.5, stagger: 0.05 }, 0.45)
        .from(el.querySelectorAll('.menu__link-rule'), { scaleX: 0, duration: 0.8, stagger: 0.05, ease: 'expo.inOut' }, 0.35)
        .from(el.querySelectorAll('.menu__actions > *, .menu__close'), { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.6);
    },
    { scope: ref },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (!motionEnabled()) {
      t.progress(menuOpen ? 1 : 0);
      return;
    }
    if (menuOpen) t.timeScale(1).play();
    else t.timeScale(1.8).reverse();
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMenuOpen]);

  return (
    <div className="menu" ref={ref} aria-hidden={!menuOpen} role="dialog" aria-label="Menü">
      <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label="Menü schliessen" tabIndex={menuOpen ? 0 : -1}>
        Schliessen
      </button>
      <nav className="menu__nav">
        {NAV.map((n, i) => (
          <TLink key={n.href} href={n.href} className="menu__link" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
            <span className="menu__link-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="menu__link-text">{n.label}</span>
            <span className="menu__link-rule" />
          </TLink>
        ))}
      </nav>
      <div className="menu__actions">
        <Button icon="phone" href={CONTACT.tel}>
          Anrufen
        </Button>
        <Button variant="onDark" icon="message-circle" href={CONTACT.whatsapp}>
          WhatsApp
        </Button>
      </div>
    </div>
  );
}

function MobileBar() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!motionEnabled()) return;
    gsap.from(ref.current, { yPercent: 110, duration: 0.9, ease: 'expo.out', delay: 1.2 });
  });
  return (
    <div className="mobile-bar" ref={ref}>
      <a href={CONTACT.tel} style={{ background: 'var(--action-primary)' }}>
        <Icon name="phone" size={18} color="#fff" />
        Anrufen
      </a>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--action-secondary)' }}>
        <Icon name="message-circle" size={18} color="#fff" />
        WhatsApp
      </a>
    </div>
  );
}
