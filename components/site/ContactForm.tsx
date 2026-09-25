'use client';

import { useEffect, useRef, useState } from 'react';
import { ANLIEGEN, CONTACT } from '@/lib/data';
import { Button } from '../ds/Button';
import { Icon } from '../ds/Icon';
import { IconBadge } from '../ds/IconBadge';
import { TLink } from '../motion/TLink';
import { gsap, useGSAP, motionEnabled } from '../motion/gsap';

type Form = { anliegen: string; name: string; tel: string; email: string; ort: string; msg: string; ds: boolean; hp: string };
const EMPTY: Form = { anliegen: '', name: '', tel: '', email: '', ort: '', msg: '', ds: false, hp: '' };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="field" style={{ display: 'block' }}>
      <span className="field-label">{label}</span>
      <span className="field-control">{children}</span>
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [files, setFiles] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  // Vorbelegung aus der URL (?anliegen=…&nachricht=…), z.B. von «Anfragen» bei einem Produkt
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const anliegen = q.get('anliegen') ?? '';
    const msg = q.get('nachricht') ?? '';
    if (anliegen || msg) setForm((f) => ({ ...f, anliegen: ANLIEGEN.includes(anliegen) ? anliegen : f.anliegen, msg: msg || f.msg }));
  }, []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErr('');
  };

  // Fehler: kurzes Schütteln
  useGSAP(
    () => {
      if (!err || !motionEnabled()) return;
      gsap.fromTo(errRef.current, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(errRef.current, { x: -10 }, { x: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.3)' });
    },
    { dependencies: [err], scope: boxRef },
  );

  // Erfolg / zurück zum Formular: Inhalte einblenden
  useGSAP(
    () => {
      const box = boxRef.current;
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      if (!box || !motionEnabled()) return;
      if (sent) {
        gsap
          .timeline()
          .from(box.querySelector('.success-badge'), { scale: 0, rotation: -40, duration: 0.9, ease: 'back.out(2.2)' })
          .from(box.querySelectorAll('.success-item'), { y: 24, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out' }, 0.2);
      } else {
        gsap.from(box.querySelectorAll('form > *'), { y: 16, opacity: 0, stagger: 0.04, duration: 0.6, ease: 'expo.out', clearProps: 'transform,opacity' });
      }
    },
    { dependencies: [sent], scope: boxRef, revertOnUpdate: false },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.hp) return;
    if (!form.anliegen || !form.name.trim() || !form.tel.trim() || !form.msg.trim()) return setErr('Bitte füllen Sie alle Pflichtfelder aus.');
    if (!form.ds) return setErr('Bitte bestätigen Sie die Datenschutzerklärung.');
    // TODO: Anbindung an Versand (z.B. Route Handler, der an info@forst-lungern.ch mailt)
    setSent(true);
    setErr('');
  };

  return (
    <div ref={boxRef} data-reveal="" style={{ background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)', padding: 'clamp(24px,4vw,40px)' }}>
      {sent ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <span className="success-badge" style={{ display: 'inline-block' }}>
            <IconBadge icon="check" size={56} />
          </span>
          <h3 className="success-item" style={{ margin: '8px 0 0', font: 'var(--type-h3)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>
            Danke für Ihre Anfrage
          </h3>
          <p className="success-item" style={{ margin: 0 }}>
            Wir melden uns in der Regel innert 1 Arbeitstag bei Ihnen. Für Notfälle rufen Sie bitte direkt an: <a href={CONTACT.tel}>{CONTACT.telLabel}</a>.
          </p>
          <div className="success-item" style={{ marginTop: 8 }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSent(false);
                setForm(EMPTY);
                setFiles(0);
              }}
            >
              Neue Anfrage
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 18 }}>
          <Field label="Anliegen *">
            <select value={form.anliegen} onChange={(e) => set('anliegen', e.target.value)}>
              <option value="">Bitte wählen</option>
              {ANLIEGEN.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <Icon name="chevron-down" size={18} className="field-control__chevron" />
          </Field>
          <div className="form-row">
            <Field label="Name, Vorname *">
              <input value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Telefon *" hint="Für Rückruf, im Forst meist schneller als E-Mail">
              <input type="tel" value={form.tel} onChange={(e) => set('tel', e.target.value)} autoComplete="tel" />
            </Field>
          </div>
          <div className="form-row">
            <Field label="E-Mail">
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
            </Field>
            <Field label="Adresse / Ort des Einsatzes" hint="Hilfreich bei Holzerei und Lieferung">
              <input value={form.ort} onChange={(e) => set('ort', e.target.value)} autoComplete="street-address" />
            </Field>
          </div>
          <Field label="Nachricht *">
            <textarea rows={5} value={form.msg} onChange={(e) => set('msg', e.target.value)} />
          </Field>
          <div>
            <div className="field-label">Fotos hochladen (max. 3 Bilder)</div>
            <label className="file-input">
              <Icon name="upload" size={16} />
              Bilder wählen
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(Math.min(3, e.target.files?.length ?? 0))}
                style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
              />
            </label>
            <div style={{ marginTop: 6, fontSize: 14, color: 'var(--text-muted)' }}>
              {files ? files + (files === 1 ? ' Bild ausgewählt' : ' Bilder ausgewählt') : 'Noch keine Bilder ausgewählt'}
            </div>
          </div>
          <input
            type="text"
            name="firma_website"
            tabIndex={-1}
            autoComplete="off"
            value={form.hp}
            onChange={(e) => set('hp', e.target.value)}
            style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
            aria-hidden
          />
          <label className="checkbox">
            <input type="checkbox" checked={form.ds} onChange={(e) => set('ds', e.target.checked)} />
            <span className="checkbox__box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
            <span>
              Ich habe die <TLink href="/datenschutz">Datenschutzerklärung</TLink> gelesen *
            </span>
          </label>
          {err && (
            <div ref={errRef} className="form-error" role="alert">
              {err}
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button type="submit" arrow>
              Anfrage senden
            </Button>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>* Pflichtfelder</span>
          </div>
        </form>
      )}
    </div>
  );
}
