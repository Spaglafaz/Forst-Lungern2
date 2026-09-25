'use client';

import { gsap, ScrollTrigger, SplitText, finePointer } from './gsap';

type Opts = { heroDelay?: number };

/**
 * Sucht auf der aktuellen Seite alle data-Attribute und baut die GSAP-Animationen auf.
 * Gibt eine Aufräumfunktion zurück (bei Seitenwechsel).
 */
export function animatePage(root: HTMLElement, { heroDelay = 0 }: Opts = {}) {
  const cleanups: Array<() => void> = [];
  const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));
  const fine = finePointer();

  const ctx = gsap.context(() => {
    /* ---------- Hero ---------- */
    q('[data-hero]').forEach((hero) => {
      const media = hero.querySelector<HTMLElement>('.hero__media');
      const img = media?.querySelector('img');
      const content = hero.querySelector<HTMLElement>('.hero__content');
      const tl = gsap.timeline({ delay: heroDelay });

      if (img) tl.fromTo(img, { scale: 1.28 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0);

      const eyebrow = hero.querySelector<HTMLElement>('.hero__eyebrow');
      const title = hero.querySelector<HTMLElement>('.hero__title');
      const text = hero.querySelector<HTMLElement>('.hero__text');
      const actions = hero.querySelector<HTMLElement>('.hero__actions');
      const scrollHint = hero.querySelector<HTMLElement>('.hero__scroll');

      if (eyebrow) {
        gsap.set(eyebrow, { opacity: 1 });
        const s = SplitText.create(eyebrow, { type: 'chars' });
        tl.from(s.chars, { opacity: 0, y: 10, stagger: 0.018, duration: 0.6 }, 0.25);
      }
      // Zeilen erst nach dem Laden der Schrift messen (autoSplit teilt bei Änderungen neu auf)
      if (title) {
        gsap.set(title, { opacity: 1 });
        SplitText.create(title, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (s) =>
            gsap.from(s.lines, { yPercent: 115, rotate: 2, stagger: 0.12, duration: 1.25, ease: 'expo.out', delay: heroDelay + 0.35 }),
        });
      }
      if (text) {
        gsap.set(text, { opacity: 1 });
        SplitText.create(text, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (s) => gsap.from(s.lines, { yPercent: 105, stagger: 0.08, duration: 1, ease: 'expo.out', delay: heroDelay + 0.7 }),
        });
      }
      if (actions) {
        gsap.set(actions, { opacity: 1 });
        tl.from(actions.children, { y: 26, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out' }, 0.95);
      }
      if (scrollHint) tl.fromTo(scrollHint, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.8 }, 1.3);

      // Parallax beim Wegscrollen
      if (media)
        gsap.to(media, {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
      if (content)
        gsap.to(content, {
          yPercent: -18,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
    });

    /* ---------- Überschriften: Zeilen steigen aus einer Maske ---------- */
    q('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }),
      });
    });

    /* ---------- Wörter nacheinander (z.B. Grundsätze-Band) ---------- */
    q('[data-words]').forEach((el) => {
      const s = SplitText.create(el, { type: 'words' });
      gsap.from(s.words, {
        opacity: 0.12,
        y: 8,
        stagger: 0.045,
        duration: 0.7,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    /* ---------- ArrowRule zeichnet sich ---------- */
    q('[data-rule]').forEach((el) => {
      const dot = el.querySelector('.arrow-rule__dot');
      const line = el.querySelector('.arrow-rule__line');
      const head = el.querySelector('.arrow-rule__head');
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 92%', once: true }, delay: 0.25 });
      if (dot) tl.from(dot, { scale: 0, duration: 0.45, ease: 'back.out(3)' });
      if (line) tl.from(line, { scaleX: 0, duration: 0.9, ease: 'expo.inOut' }, '-=0.2');
      if (head) tl.from(head, { x: -14, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.45');
    });

    /* ---------- Allgemeines Einblenden (gebündelt → automatischer Versatz) ---------- */
    const reveals = q('[data-reveal]');
    const fromFor = (el: HTMLElement): gsap.TweenVars => {
      switch (el.dataset.reveal) {
        case 'left':
          return { x: -60, y: 0 };
        case 'right':
          return { x: 60, y: 0 };
        case 'scale':
          return { scale: 0.92, y: 30 };
        case 'fade':
          return { y: 0 };
        default:
          return { y: 48 };
      }
    };
    if (reveals.length) {
      ScrollTrigger.batch(reveals, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => {
          (batch as HTMLElement[]).forEach((el, i) => {
            gsap.fromTo(
              el,
              { opacity: 0, ...fromFor(el) },
              { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.1, ease: 'expo.out', delay: i * 0.1, overwrite: true, clearProps: 'transform' },
            );
          });
        },
      });
    }

    /* ---------- Zahlen zählen hoch ---------- */
    q('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      const obj = { v: 0 };
      el.textContent = '0' + suffix;
      gsap.to(obj, {
        v: end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.v) + suffix;
        },
      });
    });

    /* ---------- Trennlinien der Kennzahlen ---------- */
    q('.stat__line').forEach((el, i) => {
      gsap.from(el, { scaleY: 0, duration: 1.2, ease: 'expo.inOut', delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    /* ---------- Bilder: Vorhang-Reveal + Zoom + leichte Parallaxe ---------- */
    q('[data-zoom]').forEach((box) => {
      const inner = box.querySelector<HTMLElement>('.zoom-box__inner');
      const dir = box.dataset.zoom || 'up';
      const from =
        dir === 'left' ? 'inset(0% 100% 0% 0%)' : dir === 'right' ? 'inset(0% 0% 0% 100%)' : 'inset(100% 0% 0% 0%)';
      const tl = gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 88%', once: true } });
      tl.fromTo(box, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
      if (inner) {
        tl.fromTo(inner, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1);
        gsap.fromTo(
          inner,
          { yPercent: -5 },
          { yPercent: 5, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      }
    });

    /* ---------- Parallaxe ---------- */
    q('[data-parallax]').forEach((el) => {
      const amt = Number(el.dataset.parallax) || 0.12;
      gsap.fromTo(
        el,
        { yPercent: -amt * 100 },
        {
          yPercent: amt * 100,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    /* ---------- Nebel treibt ---------- */
    q('.mist__fog').forEach((el) => {
      gsap.to(el, { xPercent: 8, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });

    /* ---------- Polaroids fliegen ein ---------- */
    q('.polaroids').forEach((stack) => {
      const [a, b] = Array.from(stack.querySelectorAll<HTMLElement>('.polaroids__item'));
      const tl = gsap.timeline({ scrollTrigger: { trigger: stack, start: 'top 85%', once: true } });
      if (a) tl.fromTo(a, { opacity: 0, x: -70, y: 50, rotation: -16 }, { opacity: 1, x: 0, y: 0, rotation: -3, duration: 1.3, ease: 'expo.out' });
      if (b) tl.fromTo(b, { opacity: 0, x: 80, y: 90, rotation: 14 }, { opacity: 1, x: 0, y: 0, rotation: 2.5, duration: 1.3, ease: 'expo.out' }, 0.18);

      if (fine) {
        const imgs = [a, b].filter(Boolean).map((el) => el!.querySelector('img')!).filter(Boolean);
        gsap.set(imgs, { scale: 1.08 });
        const movers = imgs.map((img, i) => ({
          x: gsap.quickTo(img, 'x', { duration: 0.8, ease: 'power3.out' }),
          y: gsap.quickTo(img, 'y', { duration: 0.8, ease: 'power3.out' }),
          depth: i === 0 ? 10 : -14,
        }));
        const move = (e: PointerEvent) => {
          const r = stack.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.depth);
            m.y(ny * m.depth);
          });
        };
        const leave = () => movers.forEach((m) => (m.x(0), m.y(0)));
        stack.addEventListener('pointermove', move);
        stack.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          stack.removeEventListener('pointermove', move);
          stack.removeEventListener('pointerleave', leave);
        });
      }
    });

    /* ---------- Einzelnes Foto «ploppt» mit Drehung ---------- */
    q('[data-pop]').forEach((el) => {
      const rot = Number(el.dataset.pop) || 0; // End-Neigung des Polaroids
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.6, rotation: rot + 18 },
        { opacity: 1, scale: 1, rotation: rot, duration: 1.2, ease: 'back.out(1.6)', delay: 0.35, scrollTrigger: { trigger: el, start: 'top 95%', once: true } },
      );
    });

    /* ---------- Icon-Badges ---------- */
    q('[data-badge-pop]').forEach((el) => {
      gsap.from(el, { scale: 0, rotation: -25, duration: 0.9, ease: 'back.out(2.4)', delay: 0.2, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    /* ---------- Zeitstrahl ---------- */
    q('[data-timeline]').forEach((list) => {
      const fill = list.querySelector('.timeline__progress-fill');
      if (fill)
        gsap.to(fill, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
      list.querySelectorAll<HTMLElement>('.timeline__item').forEach((item) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
        tl.from(item.querySelector('.timeline__rule'), { scaleX: 0, duration: 1, ease: 'expo.inOut' })
          .from(item.querySelector('.timeline__date'), { x: -24, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.25)
          .from(item.querySelector('.timeline__text'), { y: 16, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.35);
      });
    });

    /* ---------- Schritt-Nummern (Lehre) ---------- */
    q('[data-step-num]').forEach((el) => {
      gsap.from(el, { yPercent: 100, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.3, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    /* ---------- Checkliste ---------- */
    q('[data-checklist]').forEach((list) => {
      gsap.from(list.children, {
        x: -18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: list, start: 'top 90%', once: true },
      });
    });
  }, root);

  /* ---------- 3D-Neigung auf Karten (nur Maus) ---------- */
  if (fine) {
    root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      const ty = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' });
      gsap.set(card, { transformPerspective: 900 });
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        ry((nx - 0.5) * 7);
        rx((0.5 - ny) * 6);
        card.style.setProperty('--mx', nx * 100 + '%');
        card.style.setProperty('--my', ny * 100 + '%');
      };
      const enter = () => ty(-4);
      const leave = () => {
        rx(0);
        ry(0);
        ty(0);
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
      });
    });
  }

  // Nach dem Laden der Schriften neu vermessen
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    cleanups.forEach((fn) => fn());
    ctx.revert();
  };
}
