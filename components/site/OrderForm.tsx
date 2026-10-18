'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CONTACT,
  DELIVERY,
  FIREWOOD,
  FIREWOOD_LENGTHS,
  FORM_ENDPOINT,
  MWST_RATE,
  PRICE_LIST_LABEL,
  PRICE_LIST_PDF,
  PRODUCTS,
  SPLIT_FINE_SURCHARGE,
  chf,
  round05,
  type FirewoodLength,
} from '@/lib/data';
import { Button } from '../ds/Button';
import { Icon } from '../ds/Icon';
import { IconBadge } from '../ds/IconBadge';
import { TLink } from '../motion/TLink';
import { LocationPicker, fmtPos, type LatLng } from './LocationPicker';
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger, motionEnabled } from '../motion/gsap';

/* ===== Datenmodell ===== */

type WoodLine = { key: string; wood: string; length: FirewoodLength; fine: boolean; qty: number };
type Mode = 'abholung' | 'lieferung';
type Contact = { name: string; tel: string; email: string; strasse: string; ort: string; pos: LatLng | null; termin: string; msg: string; hp: string };
type Line = { id: string; title: string; detail: string; qty: number; unit: string; unitPrice: number; amount: number; remove: () => void };

const EMPTY_CONTACT: Contact = { name: '', tel: '', email: '', strasse: '', ort: '', pos: null, termin: '', msg: '', hp: '' };
const STORE_KEY = 'fl-bestellung-v2';
const STER_STEP = 0.5;

let keySeq = 0;
const newKey = () => 'w' + Date.now().toString(36) + (keySeq++).toString(36);
const initialWood = (): WoodLine[] => FIREWOOD.map((w) => ({ key: 'w-' + w.id, wood: w.id, length: '33', fine: false, qty: 0 }));

const lengthOf = (id: FirewoodLength) => FIREWOOD_LENGTHS.find((l) => l.id === id) ?? FIREWOOD_LENGTHS[0];
const woodOf = (id: string) => FIREWOOD.find((w) => w.id === id) ?? FIREWOOD[0];
const canSplit = (l: FirewoodLength) => l !== '100';

function sterPrice(line: WoodLine) {
  return woodOf(line.wood).pricePerSter + lengthOf(line.length).surcharge + (line.fine && canSplit(line.length) ? SPLIT_FINE_SURCHARGE : 0);
}
function woodDetail(line: WoodLine) {
  const l = lengthOf(line.length);
  return [l.id === '100' ? 'Meterholz 1 m' : l.label, line.fine && canSplit(line.length) ? 'fein gespalten' : ''].filter(Boolean).join(', ');
}
const fmtQty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const parseQty = (s: string) => {
  const n = parseFloat(s.replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const mapsLink = (p: LatLng) => `https://www.google.com/maps?q=${p.lat.toFixed(6)},${p.lng.toFixed(6)}`;
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

/** Weich zu einem Element scrollen – auch mit ScrollSmoother. */
function scrollToEl(el: HTMLElement | null, pos = 'center center') {
  if (!el) return;
  const s = ScrollSmoother.get();
  if (s) s.scrollTo(el, true, pos);
  else el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ===== Bausteine ===== */

function QtyStepper({
  value,
  step,
  unit,
  label,
  onChange,
}: {
  value: number;
  step: number;
  unit: string;
  label: string;
  onChange: (n: number) => void;
}) {
  const [text, setText] = useState(value ? fmtQty(value) : '');
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setText(value ? fmtQty(value) : '');
  }, [value]);
  // Aktuellen Wert merken, damit schnelle Mehrfachklicks alle zählen
  const latest = useRef(value);
  latest.current = value;
  const bump = (d: number) => {
    const n = Math.max(0, Math.round((latest.current + d) / step) * step);
    latest.current = n;
    onChange(n);
  };
  return (
    <div className={'qty' + (value > 0 ? ' qty--active' : '')}>
      <button type="button" className="qty__btn" onClick={() => bump(-step)} disabled={value <= 0} aria-label={`${label}: Menge verringern`}>
        <Icon name="minus" size={16} />
      </button>
      <label className="qty__field">
        <input
          inputMode="decimal"
          value={text}
          placeholder="0"
          aria-label={`${label}: Menge in ${unit}`}
          onFocus={(e) => {
            focused.current = true;
            e.target.select();
          }}
          onBlur={() => {
            focused.current = false;
            const n = Math.round(parseQty(text) / step) * step;
            setText(n ? fmtQty(n) : '');
            onChange(n);
          }}
          onChange={(e) => {
            const t = e.target.value.replace(/[^\d.,]/g, '');
            setText(t);
            onChange(parseQty(t));
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              bump(step);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              bump(-step);
            }
          }}
        />
        <span className="qty__unit">{unit}</span>
      </label>
      <button type="button" className="qty__btn" onClick={() => bump(step)} aria-label={`${label}: Menge erhöhen`}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={'field' + (error ? ' field--error' : '')} style={{ display: 'block' }}>
      <span className="field-label">{label}</span>
      <span className="field-control">{children}</span>
      {error ? <span className="field-error">{error}</span> : hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

function StepHead({ n, title, text }: { n: string; title: string; text?: string }) {
  return (
    <div className="order-step__head">
      <span className="order-step__num">{n}</span>
      <div>
        <h3 className="order-step__title">{title}</h3>
        {text && <p className="order-step__text">{text}</p>}
      </div>
    </div>
  );
}

/* ===== Bestellformular ===== */

export function OrderForm() {
  const [wood, setWood] = useState<WoodLine[]>(initialWood);
  const [items, setItems] = useState<Record<string, number>>({});
  /** Länge pro Stück (m) bei Produkten mit Laufmeterpreis */
  const [lens, setLens] = useState<Record<string, number>>({});
  const lenOf = (p: (typeof PRODUCTS)[number]) => lens[p.id] ?? p.perLength?.default ?? 1;
  const [mode, setMode] = useState<Mode>('abholung');
  const [c, setC] = useState<Contact>(EMPTY_CONTACT);
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState('');
  const [sent, setSent] = useState<null | { lines: Line[]; total: number; mode: Mode; delivery: number }>(null);
  const [hydrated, setHydrated] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  /* Auswahl im Browser merken (keine Kontaktdaten) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.wood) && d.wood.length) setWood(d.wood);
        if (d.items && typeof d.items === 'object') setItems(d.items);
        if (d.lens && typeof d.lens === 'object') setLens(d.lens);
        if (d.mode === 'lieferung' || d.mode === 'abholung') setMode(d.mode);
      }
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ wood, items, lens, mode }));
    } catch {}
  }, [wood, items, lens, mode, hydrated]);

  /* ----- Berechnung ----- */
  const calc = useMemo(() => {
    const lines: Line[] = [];
    wood.forEach((w) => {
      if (w.qty <= 0) return;
      const p = sterPrice(w);
      lines.push({
        id: w.key,
        title: woodOf(w.wood).name,
        detail: woodDetail(w),
        qty: w.qty,
        unit: 'Ster',
        unitPrice: p,
        amount: p * w.qty,
        remove: () => setWood((ws) => ws.map((x) => (x.key === w.key ? { ...x, qty: 0 } : x))),
      });
    });
    PRODUCTS.forEach((p) => {
      const q = items[p.id] ?? 0;
      if (q <= 0) return;
      const len = p.perLength ? lenOf(p) : 1;
      lines.push({
        id: p.id,
        title: p.name,
        detail: p.perLength ? [p.detail, `je ${fmtQty(len)} m`, `total ${fmtQty(q * len)} lm`].filter(Boolean).join(', ') : p.detail,
        qty: q,
        unit: q === 1 ? p.unit : p.unitPlural,
        unitPrice: p.price * len,
        amount: p.price * len * q,
        remove: () => setItems((it) => ({ ...it, [p.id]: 0 })),
      });
    });
    const ster = wood.reduce((n, w) => n + (w.qty > 0 ? w.qty : 0), 0);
    const otherItems = PRODUCTS.some((p) => (items[p.id] ?? 0) > 0);
    const deliveryRate = ster >= DELIVERY.reducedFrom ? DELIVERY.perSterReduced : DELIVERY.perSter;
    const delivery = mode === 'lieferung' ? ster * deliveryRate : 0;
    const goods = lines.reduce((n, l) => n + l.amount, 0);
    const subtotal = goods + delivery;
    const mwst = subtotal * MWST_RATE;
    const total = round05(subtotal + mwst);
    return { lines, ster, otherItems, deliveryRate, delivery, goods, subtotal, mwst, total };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wood, items, lens, mode]);

  /* ----- Prüfung ----- */
  const errors = useMemo(() => {
    const e: Partial<Record<keyof Contact | 'products', string>> = {};
    if (!calc.lines.length) e.products = 'Bitte wählen Sie mindestens ein Produkt.';
    if (!c.name.trim()) e.name = 'Bitte Namen angeben.';
    if (c.tel.replace(/\D/g, '').length < 9) e.tel = 'Bitte gültige Telefonnummer angeben.';
    if (!emailOk(c.email)) e.email = 'Bitte gültige E-Mail-Adresse angeben.';
    if (mode === 'lieferung') {
      if (!c.strasse.trim()) e.strasse = 'Für die Lieferung benötigt.';
      if (!c.ort.trim()) e.ort = 'Für die Lieferung benötigt.';
    }
    return e;
  }, [calc.lines.length, c, mode]);
  const missing = [
    errors.products && 'Produkte wählen',
    (errors.name || errors.tel || errors.email) && 'Kontaktdaten',
    (errors.strasse || errors.ort) && 'Lieferadresse',
  ].filter(Boolean) as string[];
  const valid = missing.length === 0;
  const err = (k: keyof typeof errors) => (tried ? errors[k] : undefined);

  const setField = <K extends keyof Contact>(k: K, v: Contact[K]) => setC((x) => ({ ...x, [k]: v }));
  const updWood = (key: string, patch: Partial<WoodLine>) =>
    setWood((ws) =>
      ws.map((w) => {
        if (w.key !== key) return w;
        const next = { ...w, ...patch };
        if (!canSplit(next.length)) next.fine = false;
        return next;
      }),
    );
  const addWood = (woodId: string) => {
    const used = wood.filter((w) => w.wood === woodId).map((w) => w.length);
    const free = FIREWOOD_LENGTHS.find((l) => !used.includes(l.id))?.id ?? '33';
    setWood((ws) => {
      const i = ws.map((w) => w.wood).lastIndexOf(woodId);
      const copy = ws.slice();
      copy.splice(i + 1, 0, { key: newKey(), wood: woodId, length: free, fine: false, qty: 0 });
      return copy;
    });
  };
  const removeWood = (key: string) => setWood((ws) => ws.filter((w) => w.key !== key));

  /* ----- Texte für E-Mail ----- */
  const orderText = () => {
    const rows = calc.lines.map((l) => `• ${fmtQty(l.qty)} ${l.unit} ${l.title}${l.detail ? ` (${l.detail})` : ''} à ${chf(l.unitPrice)} = ${chf(l.amount)}`);
    if (mode === 'lieferung' && calc.ster > 0) rows.push(`• Lieferung ${fmtQty(calc.ster)} Ster à ${chf(calc.deliveryRate)} = ${chf(calc.delivery)}`);
    if (mode === 'lieferung' && calc.otherItems) rows.push('• Lieferung übrige Produkte: nach Absprache');
    rows.push('', `Zwischensumme exkl. MWST: ${chf(calc.subtotal)}`, `MWST ${(MWST_RATE * 100).toFixed(1)} %: ${chf(calc.mwst)}`, `Total inkl. MWST: ${chf(calc.total)}`);
    return rows.join('\n');
  };
  const addressText = () => [c.strasse.trim(), c.ort.trim()].filter(Boolean).join(', ') || '–';
  const mailtoHref = () => {
    const body = [
      'Guten Tag Herr Imfeld',
      '',
      'Ich möchte folgende Holzprodukte bestellen:',
      '',
      orderText(),
      '',
      `Lieferart: ${mode === 'lieferung' ? 'Lieferung' : 'Selbstabholung im Forstwerkhof'}`,
      c.pos ? `Abladeort (Karte): ${fmtPos(c.pos)} – ${mapsLink(c.pos)}` : null,
      `Wunschtermin: ${c.termin.trim() || '–'}`,
      c.msg.trim() ? `Bemerkungen: ${c.msg.trim()}` : null,
      '',
      'Freundliche Grüsse',
      c.name.trim(),
      addressText(),
      c.tel.trim(),
      c.email.trim(),
    ]
      .filter((l): l is string => l !== null)
      .join('\n');
    return `${CONTACT.personMail}?subject=${encodeURIComponent('Bestellung Holzprodukte – ' + c.name.trim())}&body=${encodeURIComponent(body)}`;
  };

  /** Prüfen; bei Fehlern zum ersten Fehler scrollen. */
  const check = () => {
    setTried(true);
    if (valid) return true;
    requestAnimationFrame(() => {
      const first = rootRef.current?.querySelector<HTMLElement>('.field--error input, .field--error textarea');
      if (errors.products) scrollToEl(productsRef.current, 'top 130px');
      else if (first) {
        scrollToEl(first);
        first.focus({ preventScroll: true });
      }
    });
    return false;
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (sending || !check()) return;
    if (c.hp) return finish();
    const data = new FormData();
    data.append('_subject', `Bestellung Holzprodukte: ${c.name.trim()} – ${chf(calc.total)}`);
    data.append('_template', 'table');
    data.append('_captcha', 'false');
    data.append('_replyto', c.email.trim());
    data.append('Bestellung', orderText());
    data.append('Lieferart', mode === 'lieferung' ? 'Lieferung' : 'Selbstabholung im Forstwerkhof');
    data.append('Name', c.name.trim());
    data.append('Telefon', c.tel.trim());
    data.append('E-Mail', c.email.trim());
    data.append(mode === 'lieferung' ? 'Lieferadresse' : 'Adresse', addressText());
    data.append('Abladeort (Karte)', c.pos ? `${fmtPos(c.pos)} – ${mapsLink(c.pos)}` : '–');
    data.append('Wunschtermin', c.termin.trim() || '–');
    data.append('Bemerkungen', c.msg.trim() || '–');
    data.append('Total inkl. MWST', chf(calc.total));
    setSending(true);
    setSendErr('');
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => null);
      if (!res.ok || (json && String(json.success) !== 'true')) throw new Error();
      finish();
    } catch {
      setSendErr('mail');
    } finally {
      setSending(false);
    }
  };

  const finish = () => {
    setSent({ lines: calc.lines, total: calc.total, mode, delivery: calc.delivery });
    setWood(initialWood());
    setItems({});
    setLens({});
    setTried(false);
    requestAnimationFrame(() => scrollToEl(rootRef.current, 'top 130px'));
  };

  /* ----- Animationen ----- */

  // Übersicht auf grossen Bildschirmen mitlaufen lassen (CSS-sticky funktioniert mit ScrollSmoother nicht)
  useGSAP(
    () => {
      if (sent) return;
      const grid = gridRef.current;
      const box = summaryRef.current;
      if (!grid || !box || !motionEnabled()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1000px)', () => {
        const top = 100;
        // Passt die Übersicht nicht ganz in den Bildschirm, bleibt sie mit der Unterkante stehen
        const fits = () => box.offsetHeight + top + 20 < window.innerHeight;
        const st = ScrollTrigger.create({
          trigger: box,
          start: () => (fits() ? `top top+=${top}` : 'bottom bottom-=20'),
          endTrigger: grid,
          end: () => (fits() ? `bottom top+=${top + box.offsetHeight}` : 'bottom bottom-=20'),
          pin: true,
          pinSpacing: false,
        });
        let t: ReturnType<typeof setTimeout>;
        const ro = new ResizeObserver(() => {
          clearTimeout(t);
          t = setTimeout(() => st.refresh(), 120);
        });
        ro.observe(box);
        ro.observe(grid);
        return () => {
          ro.disconnect();
          clearTimeout(t);
        };
      });
      return () => mm.revert();
    },
    { dependencies: [sent], scope: rootRef },
  );

  // Erfolg: Haken ploppt auf
  useGSAP(
    () => {
      if (!sent || !motionEnabled()) return;
      const box = rootRef.current;
      if (!box) return;
      gsap
        .timeline()
        .from(box.querySelector('.success-badge'), { scale: 0, rotation: -40, duration: 0.9, ease: 'back.out(2.2)' })
        .from(box.querySelectorAll('.success-item'), { y: 24, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out' }, 0.2);
    },
    { dependencies: [sent], scope: rootRef },
  );

  // Mobile Leiste nur zeigen, solange die Übersicht nicht sichtbar ist
  useEffect(() => {
    const box = summaryRef.current;
    if (!box || sent) return;
    const io = new IntersectionObserver(([e]) => setSummaryVisible(e.isIntersecting), { rootMargin: '0px 0px -80px 0px' });
    io.observe(box);
    return () => io.disconnect();
  }, [sent]);

  const count = calc.lines.length;

  /* ===== Erfolg ===== */
  if (sent) {
    return (
      <div ref={rootRef} className="order-done">
        <span className="success-badge" style={{ display: 'inline-block' }}>
          <IconBadge icon="check" size={64} />
        </span>
        <h3 className="success-item order-done__title">Danke für Ihre Bestellung</h3>
        <p className="success-item" style={{ margin: 0, maxWidth: '58ch' }}>
          Ihre Bestellung ist bei Armin Imfeld eingegangen. Er meldet sich in der Regel innert 1 Arbeitstag, bestätigt Menge und Preis und vereinbart mit Ihnen
          den Termin für die {sent.mode === 'lieferung' ? 'Lieferung' : 'Abholung im Forstwerkhof'}.
        </p>
        <ul className="success-item order-done__list">
          {sent.lines.map((l) => (
            <li key={l.id}>
              <span>
                {fmtQty(l.qty)} {l.unit} {l.title} <small>{l.detail}</small>
              </span>
              <span>{chf(l.amount)}</span>
            </li>
          ))}
          {sent.delivery > 0 && (
            <li>
              <span>Lieferung</span>
              <span>{chf(sent.delivery)}</span>
            </li>
          )}
          <li className="order-done__total">
            <span>Total inkl. MWST</span>
            <span>{chf(sent.total)}</span>
          </li>
        </ul>
        <div className="success-item btn-row" style={{ marginTop: 8 }}>
          <Button size="sm" variant="outline" onClick={() => setSent(null)}>
            Neue Bestellung
          </Button>
          <Button size="sm" variant="secondary" icon="phone" href={CONTACT.tel}>
            {CONTACT.telLabel}
          </Button>
        </div>
      </div>
    );
  }

  /* ===== Formular ===== */
  return (
    <div ref={rootRef}>
      <form onSubmit={submit} noValidate>
        <div ref={gridRef} className="order">
          <div className="order__main">
            {/* 01 Produkte */}
            <section ref={productsRef} className="order-step" aria-labelledby="step-produkte">
              <StepHead n="01" title="Produkte wählen" text="Menge eingeben – der Preis wird laufend berechnet." />
              {err('products') && (
                <p className="form-error" role="alert" style={{ margin: '0 0 16px' }}>
                  {err('products')}
                </p>
              )}

              <h4 className="order-group" id="step-produkte">
                Brennholz <span className="order-group__note">1 Ster = 1 m³ geschichtetes Holz</span>
              </h4>
              <div className="order-list">
                {wood.map((w, i) => {
                  const wd = woodOf(w.wood);
                  const isExtra = wood.findIndex((x) => x.wood === w.wood) !== i;
                  const isLastOfWood = wood.map((x) => x.wood).lastIndexOf(w.wood) === i;
                  return (
                    <div key={w.key} className={'wood' + (w.qty > 0 ? ' is-active' : '') + (isExtra ? ' wood--extra' : '')}>
                      <div className="wood__head">
                        <div>
                          <div className="wood__name">
                            {wd.name}
                            {isExtra && <span className="wood__tag">weitere Länge</span>}
                          </div>
                          {!isExtra && <div className="wood__detail">{wd.detail}</div>}
                        </div>
                        <div className="wood__price">
                          <span key={sterPrice(w)} className="bump">
                            {chf(sterPrice(w))}
                          </span>
                          <small>pro Ster</small>
                        </div>
                      </div>

                      <div className="wood__opts">
                        <div className="seg" role="radiogroup" aria-label={`${wd.name}: Schnittlänge`}>
                          {FIREWOOD_LENGTHS.map((l) => (
                            <label key={l.id} className={'seg__opt' + (w.length === l.id ? ' is-on' : '')}>
                              <input type="radio" name={'len-' + w.key} checked={w.length === l.id} onChange={() => updWood(w.key, { length: l.id })} />
                              <span className="seg__label">{l.label}</span>
                              <span className="seg__sub">{l.surcharge ? '+ ' + l.surcharge + '.–' : 'Meterholz'}</span>
                            </label>
                          ))}
                        </div>
                        <label className={'checkbox wood__fine' + (canSplit(w.length) ? '' : ' is-disabled')}>
                          <input
                            type="checkbox"
                            checked={w.fine}
                            disabled={!canSplit(w.length)}
                            onChange={(e) => updWood(w.key, { fine: e.target.checked })}
                          />
                          <span className="checkbox__box">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6.5 5 9.5 10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span>
                            fein gespalten <small>+ {SPLIT_FINE_SURCHARGE}.– / Ster</small>
                          </span>
                        </label>
                      </div>

                      <div className="wood__foot">
                        <QtyStepper value={w.qty} step={STER_STEP} unit="Ster" label={`${wd.name} ${woodDetail(w)}`} onChange={(n) => updWood(w.key, { qty: n })} />
                        <span className={'line-total' + (w.qty > 0 ? ' is-on' : '')}>{w.qty > 0 ? chf(sterPrice(w) * w.qty) : '–'}</span>
                      </div>

                      {(isExtra || (isLastOfWood && wood.filter((x) => x.wood === w.wood).length < FIREWOOD_LENGTHS.length)) && (
                        <div className="wood__links">
                          {isLastOfWood && wood.filter((x) => x.wood === w.wood).length < FIREWOOD_LENGTHS.length && (
                            <button type="button" className="link-btn" onClick={() => addWood(w.wood)}>
                              <Icon name="plus" size={14} /> Weitere Länge {wd.name.split(' ')[0]}
                            </button>
                          )}
                          {isExtra && (
                            <button type="button" className="link-btn link-btn--muted" onClick={() => removeWood(w.key)}>
                              <Icon name="x" size={14} /> Entfernen
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {Array.from(new Set(PRODUCTS.map((p) => p.group))).map((g) => (
                <div key={g}>
                  <h4 className="order-group">{g}</h4>
                  <div className="order-list">
                    {PRODUCTS.filter((p) => p.group === g).map((p) => {
                      const q = items[p.id] ?? 0;
                      const len = p.perLength ? lenOf(p) : 1;
                      return (
                        <div key={p.id} className={'prod' + (p.perLength ? ' prod--len' : '') + (q > 0 ? ' is-active' : '')}>
                          <div className="prod__info">
                            <div className="prod__name">{p.name}</div>
                            {p.detail && <div className="prod__detail">{p.detail}</div>}
                          </div>
                          <div className="prod__price">
                            {chf(p.price)}
                            <small>pro {p.unitLong}</small>
                          </div>
                          <QtyStepper value={q} step={p.step} unit={p.unit} label={p.perLength ? `${p.name}: Stückzahl` : `${p.name} ${p.detail}`} onChange={(n) => setItems((it) => ({ ...it, [p.id]: n }))} />
                          <span className={'line-total' + (q > 0 ? ' is-on' : '')}>{q > 0 ? chf(p.price * len * q) : '–'}</span>
                          {p.perLength && (
                            <>
                              <span className="prod__len-label">
                                × Länge pro Stück
                                {q > 0 && <small>= {fmtQty(q * len)} lm total</small>}
                              </span>
                              <div className="prod__len">
                                <QtyStepper
                                  value={len}
                                  step={p.perLength.step}
                                  unit="m"
                                  label={`${p.name}: Länge pro Stück`}
                                  onChange={(n) => setLens((l) => ({ ...l, [p.id]: n || p.perLength!.step }))}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <p className="order-note">
                <Icon name="info" size={16} />
                <span>
                  Alle Preise in CHF exkl. MWST, gemäss{' '}
                  <a href={PRICE_LIST_PDF} download="Preisliste-Forst-Lungern-2026.pdf">
                    Preisliste 2026
                  </a>
                  . Die MWST wird in der Übersicht ausgewiesen.
                </span>
              </p>
            </section>

            {/* 02 Lieferart */}
            <section className="order-step" aria-labelledby="step-lieferart">
              <StepHead n="02" title="Lieferung oder Abholung" />
              <div className="choice" role="radiogroup" aria-labelledby="step-lieferart">
                <span id="step-lieferart" hidden>
                  Lieferart
                </span>
                <label className={'choice__opt' + (mode === 'abholung' ? ' is-on' : '')}>
                  <input type="radio" name="mode" checked={mode === 'abholung'} onChange={() => setMode('abholung')} />
                  <Icon name="warehouse" size={26} className="choice__icon" />
                  <span className="choice__title">Selbstabholung</span>
                  <span className="choice__text">Forstwerkhof Nussberg, Lungern – Termin nach telefonischer Vereinbarung.</span>
                  <span className="choice__price">kostenlos</span>
                </label>
                <label className={'choice__opt' + (mode === 'lieferung' ? ' is-on' : '')}>
                  <input type="radio" name="mode" checked={mode === 'lieferung'} onChange={() => setMode('lieferung')} />
                  <Icon name="truck" size={26} className="choice__icon" />
                  <span className="choice__title">Lieferung</span>
                  <span className="choice__text">
                    Brennholz in der {DELIVERY.area}: {chf(DELIVERY.perSter)} pro Ster, ab {DELIVERY.reducedFrom} Ster {chf(DELIVERY.perSterReduced)} pro Ster.
                  </span>
                  <span className="choice__price">
                    {calc.ster > 0 ? (mode === 'lieferung' ? chf(calc.delivery) : '+ ' + chf(calc.ster * calc.deliveryRate)) : 'pro Ster'}
                  </span>
                </label>
              </div>
              {mode === 'lieferung' && (
                <p className="order-note">
                  <Icon name="info" size={16} />
                  <span>
                    Lieferungen ausserhalb der {DELIVERY.area}
                    {calc.otherItems ? ' sowie die Lieferkosten für Säcke, Pfähle und Schüttgut' : ''} vereinbaren wir mit Ihnen persönlich.
                  </span>
                </p>
              )}
            </section>

            {/* 03 Kontaktdaten */}
            <section className="order-step" aria-labelledby="step-kontakt">
              <StepHead n="03" title="Ihre Angaben" text="Damit wir die Bestellung bestätigen und den Termin vereinbaren können." />
              <div style={{ display: 'grid', gap: 18 }} id="step-kontakt">
                <div className="form-row">
                  <Field label="Name, Vorname *" error={err('name')}>
                    <input value={c.name} onChange={(e) => setField('name', e.target.value)} autoComplete="name" aria-invalid={!!err('name')} />
                  </Field>
                  <Field label="Telefon *" hint="Für Rückfragen und Terminabsprache" error={err('tel')}>
                    <input type="tel" value={c.tel} onChange={(e) => setField('tel', e.target.value)} autoComplete="tel" aria-invalid={!!err('tel')} />
                  </Field>
                </div>
                <Field label="E-Mail *" hint="Für die Bestätigung Ihrer Bestellung" error={err('email')}>
                  <input type="email" value={c.email} onChange={(e) => setField('email', e.target.value)} autoComplete="email" aria-invalid={!!err('email')} />
                </Field>
                <div className="form-row">
                  <Field label={mode === 'lieferung' ? 'Strasse, Nr. *' : 'Strasse, Nr.'} error={err('strasse')}>
                    <input value={c.strasse} onChange={(e) => setField('strasse', e.target.value)} autoComplete="street-address" aria-invalid={!!err('strasse')} />
                  </Field>
                  <Field label={mode === 'lieferung' ? 'PLZ, Ort *' : 'PLZ, Ort'} error={err('ort')}>
                    <input value={c.ort} onChange={(e) => setField('ort', e.target.value)} autoComplete="address-level2" placeholder="z.B. 6078 Lungern" aria-invalid={!!err('ort')} />
                  </Field>
                </div>
                <div>
                  <div className="field-label">Liefer- bzw. Abladeort auf der Karte (optional)</div>
                  <LocationPicker value={c.pos} onChange={(p) => setField('pos', p)} />
                </div>
                <Field label="Wunschtermin" hint="z.B. «ab Mitte November» oder «Samstagvormittag» – wir bestätigen telefonisch">
                  <input value={c.termin} onChange={(e) => setField('termin', e.target.value)} />
                </Field>
                <Field label="Bemerkungen">
                  <textarea rows={3} value={c.msg} onChange={(e) => setField('msg', e.target.value)} placeholder="z.B. Zufahrt, Abladeort, weitere Wünsche" />
                </Field>
                <input
                  type="text"
                  name="firma_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={c.hp}
                  onChange={(e) => setField('hp', e.target.value)}
                  style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
                  aria-hidden
                />
              </div>
            </section>
          </div>

          {/* Übersicht */}
          <aside className="order__aside" aria-label="Bestellübersicht">
            <div ref={summaryRef} className="summary" id="bestelluebersicht">
              <div className="summary__head">
                <Icon name="basket" size={20} />
                <span>Ihre Bestellung</span>
                {count > 0 && (
                  <span key={count} className="summary__count bump">
                    {count}
                  </span>
                )}
              </div>

              {count === 0 ? (
                <div className="summary__empty">
                  <p>Noch keine Produkte gewählt.</p>
                  <button type="button" className="link-btn" onClick={() => scrollToEl(productsRef.current, 'top 130px')}>
                    Zum Sortiment
                  </button>
                </div>
              ) : (
                <ul className="summary__lines">
                  {calc.lines.map((l) => (
                    <li key={l.id} className="summary__line">
                      <div>
                        <div className="summary__title">
                          {fmtQty(l.qty)} {l.unit} {l.title}
                        </div>
                        <div className="summary__detail">
                          {[l.detail, 'à ' + chf(l.unitPrice) + (l.unit.startsWith('Stk') ? ' pro Stk.' : '')].filter(Boolean).join(' · ')}
                        </div>
                      </div>
                      <span className="summary__amount">{chf(l.amount)}</span>
                      <button type="button" className="summary__remove" onClick={l.remove} aria-label={`${l.title} entfernen`}>
                        <Icon name="x" size={14} />
                      </button>
                    </li>
                  ))}
                  <li className="summary__line summary__line--muted">
                    <div>
                      <div className="summary__title">{mode === 'lieferung' ? 'Lieferung' : 'Selbstabholung'}</div>
                      <div className="summary__detail">
                        {mode === 'lieferung'
                          ? calc.ster > 0
                            ? `${fmtQty(calc.ster)} Ster à ${chf(calc.deliveryRate)}${calc.otherItems ? ' · übrige nach Absprache' : ''}`
                            : 'Kosten nach Absprache'
                          : 'Forstwerkhof Nussberg'}
                      </div>
                    </div>
                    <span className="summary__amount">{mode === 'lieferung' && calc.ster > 0 ? chf(calc.delivery) : '–'}</span>
                  </li>
                </ul>
              )}

              <dl className="summary__sums">
                <div>
                  <dt>Zwischensumme exkl. MWST</dt>
                  <dd>{chf(calc.subtotal)}</dd>
                </div>
                <div>
                  <dt>MWST {(MWST_RATE * 100).toFixed(1)} %</dt>
                  <dd>{chf(calc.mwst)}</dd>
                </div>
                <div className="summary__total">
                  <dt>Total inkl. MWST</dt>
                  <dd>
                    <span key={calc.total} className="bump">
                      {chf(calc.total)}
                    </span>
                  </dd>
                </div>
              </dl>

              {tried && !valid && (
                <p className="form-error" role="alert" style={{ margin: '0 0 14px' }}>
                  Noch offen: {missing.join(', ')}.
                </p>
              )}
              {sendErr && (
                <div className="summary__fail" role="alert">
                  Die Bestellung konnte nicht direkt gesendet werden. Öffnen Sie sie stattdessen in Ihrem E-Mail-Programm oder rufen Sie an:{' '}
                  <a href={CONTACT.tel}>{CONTACT.telLabel}</a>.
                </div>
              )}

              <Button type="submit" arrow={!sending} fullWidth>
                {sending ? 'Wird gesendet …' : 'Bestellung senden'}
              </Button>
              <a
                className="summary__mail"
                href={valid ? mailtoHref() : '#bestelluebersicht'}
                onClick={(e) => {
                  if (!check()) e.preventDefault();
                }}
              >
                <Icon name="mail" size={15} /> Lieber mit eigenem E-Mail-Programm senden
              </a>
              <p className="summary__fine">
                Die Bestellung geht direkt an Armin Imfeld und wird mit seiner Bestätigung verbindlich.{' '}
                <TLink href="/datenschutz">Datenschutz</TLink>
              </p>
              <a className="summary__pdf" href={PRICE_LIST_PDF} download="Preisliste-Forst-Lungern-2026.pdf">
                <Icon name="file-text" size={18} />
                <span>
                  {PRICE_LIST_LABEL}
                  <small>Zum Ausdrucken oder Weitergeben</small>
                </span>
                <Icon name="download" size={16} />
              </a>
            </div>
          </aside>
        </div>
      </form>

      {/* Mobile: Leiste mit Total, solange die Übersicht nicht im Blick ist */}
      {hydrated &&
        createPortal(
          <div className={'order-bar' + (count > 0 && !summaryVisible ? ' is-on' : '')} aria-hidden={!(count > 0 && !summaryVisible)}>
            <div className="order-bar__sum">
              <small>
                {count} {count === 1 ? 'Position' : 'Positionen'} · inkl. MWST
              </small>
              <strong>{chf(calc.total)}</strong>
            </div>
            <button type="button" className="btn btn--primary btn--sm" onClick={() => scrollToEl(summaryRef.current, 'top 130px')} tabIndex={count > 0 && !summaryVisible ? 0 : -1}>
              <span className="btn__inner">Zur Übersicht</span>
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
