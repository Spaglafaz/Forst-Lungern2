'use client';

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, ScrollSmoother, ScrollTrigger, motionEnabled } from './gsap';
import { animatePage } from './animatePage';
import { asset, BASE } from '@/lib/base';

type Ctx = {
  navigate: (href: string) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

const TransitionCtx = createContext<Ctx>({ navigate: () => {}, menuOpen: false, setMenuOpen: () => {} });
export const useSite = () => useContext(TransitionCtx);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Hülle um alle Seiten: ScrollSmoother, Seitenübergang (Vorhang mit Rissrand),
 * und Aufbau der Scroll-Animationen pro Seite.
 */
export function MotionShell({ chrome, children }: { chrome: React.ReactNode; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const covered = useRef(true); // Beim ersten Laden deckt der Vorhang die Seite ab (Intro)
  const busy = useRef(false);
  const pendingHash = useRef('');
  const failSafe = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ScrollSmoother einmalig */
  useIsoLayoutEffect(() => {
    if (!motionEnabled()) return;
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.15,
      smoothTouch: false,
      effects: false,
    });
    smootherRef.current = smoother;
    return () => {
      smoother.kill();
      smootherRef.current = null;
    };
  }, []);

  const scrollToHash = (hash: string) => {
    const el = hash ? document.querySelector<HTMLElement>(hash) : null;
    if (!el) return false;
    // data-scroll="center": Ziel in die Bildschirmmitte, sofern es ganz Platz hat
    const center = el.dataset.scroll === 'center' && el.offsetHeight < window.innerHeight - 120;
    const s = smootherRef.current;
    if (s) s.scrollTo(el, true, center ? 'center center+=45px' : 'top 90px');
    else el.scrollIntoView({ behavior: 'smooth', block: center ? 'center' : 'start' });
    return true;
  };

  /* Seitenwechsel: nach oben, Animationen aufbauen, Vorhang öffnen */
  useIsoLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    setMenuOpen(false);
    clearTimeout(failSafe.current);

    const s = smootherRef.current;
    if (s) s.scrollTop(0);
    else window.scrollTo(0, 0);

    if (!motionEnabled()) {
      busy.current = false;
      if (pendingHash.current) scrollToHash(pendingHash.current);
      pendingHash.current = '';
      return;
    }

    const wasCovered = covered.current;
    const cleanup = animatePage(root, { heroDelay: wasCovered ? 0.45 : 0.1 });
    ScrollTrigger.refresh();

    const curtain = curtainRef.current;
    if (curtain && wasCovered) {
      const panels = curtain.querySelectorAll('.curtain__panel');
      const logo = curtain.querySelector('.curtain__logo');
      curtain.classList.remove('curtain--intro');
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(curtain, { visibility: 'hidden' });
            covered.current = false;
            busy.current = false;
            if (pendingHash.current) {
              scrollToHash(pendingHash.current);
              pendingHash.current = '';
            }
          },
        })
        .set(curtain, { visibility: 'visible' })
        .to(logo, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' }, 0.1)
        .to(panels, { yPercent: -110, duration: 0.9, ease: 'expo.inOut', stagger: { each: 0.1, from: 'end' } }, 0.15);
    } else {
      busy.current = false;
    }

    return cleanup;
  }, [pathname]);

  /* Hash-Links innerhalb derselben Seite, Browser-Zurück ohne Vorhang */
  useEffect(() => {
    const onPop = () => {
      covered.current = false;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }
      // Vergleich ohne Unterpfad (GitHub Pages) und ohne abschliessenden Schrägstrich
      const norm = (p: string) => (p.startsWith(BASE) ? p.slice(BASE.length) : p).replace(/\/$/, '') || '/';
      if (norm(url.pathname) === norm(window.location.pathname) && url.search === window.location.search) {
        setMenuOpen(false);
        if (!scrollToHash(url.hash)) {
          const s = smootherRef.current;
          if (s) s.scrollTo(0, true);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      if (busy.current) return;
      pendingHash.current = url.hash;
      const target = url.pathname + url.search;

      const curtain = curtainRef.current;
      if (!motionEnabled() || !curtain) {
        router.push(target, { scroll: false });
        return;
      }
      busy.current = true;
      const panels = curtain.querySelectorAll('.curtain__panel');
      const logo = curtain.querySelector('.curtain__logo');
      gsap
        .timeline({
          onComplete: () => {
            covered.current = true;
            router.push(target, { scroll: false });
            // Falls die Navigation hängt: Vorhang nicht ewig stehen lassen
            failSafe.current = setTimeout(() => {
              gsap.to(panels, { yPercent: -110, duration: 0.6, onComplete: () => gsap.set(curtain, { visibility: 'hidden' }) });
              busy.current = false;
              covered.current = false;
            }, 8000);
          },
        })
        .set(curtain, { visibility: 'visible' })
        .fromTo(panels, { yPercent: 110 }, { yPercent: 0, duration: 0.75, ease: 'expo.inOut', stagger: 0.08 })
        .fromTo(logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
    },
    [router],
  );

  return (
    <TransitionCtx.Provider value={{ navigate, menuOpen, setMenuOpen }}>
      {chrome}
      <div id="smooth-wrapper">
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
      <div ref={curtainRef} className="curtain curtain--intro" aria-hidden>
        <div className="curtain__panel curtain__panel--b" />
        <div className="curtain__panel" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="curtain__logo" src={asset('/assets/logo-white.png')} alt="" />
      </div>
    </TransitionCtx.Provider>
  );
}
