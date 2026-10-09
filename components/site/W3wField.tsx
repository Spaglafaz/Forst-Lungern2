'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { W3W_KEY } from '@/lib/data';

/** Vorschläge nahe Lungern bevorzugen, nur Adressen in der Schweiz */
const FOCUS = '46.7803,8.1566';

type Suggestion = { words: string; nearestPlace: string };

/** «///wort wort wort» → «wort.wort.wort» */
const normalize = (s: string) =>
  s
    .trim()
    .replace(/^\/+/, '')
    .replace(/[\s,]+/g, '.')
    .toLowerCase();

/** AutoSuggest braucht mindestens zwei ganze Wörter und den ersten Buchstaben des dritten */
const ready = (s: string) => /^[^.]+\.[^.]+\.[^.]+$/.test(s);

/**
 * Eingabefeld für eine what3words-Adresse mit Vorschlägen (what3words-AutoSuggest, im Gratis-Plan enthalten).
 * `onChange` liefert die Adresse und ob sie aus den Vorschlägen bestätigt wurde.
 */
export function W3wField({ value, onChange }: { value: string; onChange: (words: string, valid: boolean) => void }) {
  const [list, setList] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [valid, setValid] = useState(false);
  const listId = useId();
  const req = useRef(0);

  useEffect(() => {
    const input = normalize(value);
    if (valid || !ready(input)) {
      setList([]);
      return;
    }
    const n = ++req.current;
    const t = setTimeout(() => {
      const q = new URLSearchParams({ input, language: 'de', 'clip-to-country': 'CH', focus: FOCUS, 'n-results': '4', key: W3W_KEY });
      fetch('https://api.what3words.com/v3/autosuggest?' + q)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d: { suggestions: Suggestion[] }) => {
          if (n !== req.current) return;
          setList(d.suggestions ?? []);
          setActive(-1);
          // Genau getroffen: gleich als bestätigt übernehmen
          if (d.suggestions?.some((s) => s.words === input)) {
            setValid(true);
            onChange(input, true);
          }
        })
        .catch(() => n === req.current && setList([]));
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, valid]);

  const pick = (s: Suggestion) => {
    setValid(true);
    setOpen(false);
    setList([]);
    onChange(s.words, true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || !list.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const d = e.key === 'ArrowDown' ? 1 : -1;
      setActive((a) => (a + d + list.length) % list.length);
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      pick(list[active]);
    } else if (e.key === 'Escape') setOpen(false);
  };

  const showList = open && list.length > 0;

  return (
    <label className="field w3w-field" style={{ display: 'block' }}>
      <span className="field-label">what3words-Adresse (optional)</span>
      <span className="field-control">
        <span className="w3w-field__prefix" aria-hidden>
          ///
        </span>
        <input
          value={value}
          onChange={(e) => {
            setValid(false);
            setOpen(true);
            onChange(e.target.value, false);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKey}
          placeholder="wort.wort.wort"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        />
        {valid && <span className="w3w-field__ok" aria-label="Adresse gefunden" />}
        {showList && (
          <ul className="w3w-field__list" id={listId} role="listbox">
            {list.map((s, i) => (
              <li
                key={s.words}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? 'is-active' : undefined}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(s);
                }}
              >
                <strong>///{s.words}</strong>
                <span>{s.nearestPlace}</span>
              </li>
            ))}
          </ul>
        )}
      </span>
      <span className="field-hint">
        {valid ? (
          <>
            Gefunden:{' '}
            <a href={'https://w3w.co/' + normalize(value)} target="_blank" rel="noopener noreferrer">
              auf der what3words-Karte ansehen
            </a>
          </>
        ) : (
          <>
            Drei Wörter eintippen, Vorschläge erscheinen automatisch. Ihre Adresse finden Sie auf{' '}
            <a href="https://what3words.com/" target="_blank" rel="noopener noreferrer">
              what3words.com
            </a>{' '}
            oder in der what3words-App.
          </>
        )}
      </span>
    </label>
  );
}
