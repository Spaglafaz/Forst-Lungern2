# Forst Lungern AG – Website (Next.js + GSAP)

Umsetzung des Entwurfs `Forst Lungern Website.dc.html` als Next.js-Projekt (App Router, TypeScript).

## Starten

```bash
npm install
npm run dev      # Entwicklung: http://localhost:3000
npm run build    # statischer Export nach out/
npm start        # out/ lokal ansehen
npm run images   # WebP-Varianten der Fotos neu erzeugen (nach neuen Fotos in public/assets/photos)
```

## Veröffentlichung (GitHub Pages)

Die Seite wird als statischer Export gebaut (`output: 'export'`). Jeder Push auf `main` baut und veröffentlicht sie über
`.github/workflows/deploy.yml` automatisch. Der Workflow setzt `NEXT_PUBLIC_BASE_PATH=/<repo-name>`, weil Pages die Seite
unter `https://<konto>.github.io/<repo-name>/` ausliefert. Bei einer eigenen Domain (z.B. forst-lungern.ch) die Variable leer lassen.

- Bilder: GitHub Pages kann keine Bilder optimieren. `lib/imageLoader.ts` wählt deshalb die vorab erzeugten WebP-Varianten
  (640/1280/1920 px) aus `public/assets/photos/<breite>/`.
- `scripts/flatten-rsc.mjs` legt nach dem Build flache Kopien der Next-Prefetch-Dateien an (Next 16 exportiert sie verschachtelt).

## Seiten

| URL | Inhalt |
| --- | --- |
| `/` | Startseite |
| `/ueber-uns` | Über uns, Geschichte, Team, Ausbildung, Werte |
| `/leistungen` | Übersicht der 6 Bereiche |
| `/leistungen/[slug]` | Detailseite je Leistung (statisch generiert) |
| `/holzprodukte` | Sortiment mit Anfrage-Links |
| `/maschinen` | Maschinenpark |
| `/jobs` | Stellen, Lehre, Schnupperlehre |
| `/kontakt` | Kontakt + Formular (Vorbelegung im Browser über `?anliegen=…&nachricht=…`) |
| `/impressum`, `/datenschutz` | Rechtliches |

## Aufbau

- `lib/data.ts` – alle Inhalte (Leistungen, Produkte, Maschinen, Meilensteine, Heros, Kontaktdaten). `SHOW_PRICES` blendet Preise ein/aus.
- `app/tokens.css` – Design-Tokens aus dem Designsystem (Farben, Typo, Abstände, Effekte).
- `app/globals.css` – Komponenten-Styles und CSS-Mikroanimationen.
- `components/ds/` – Designsystem-Komponenten (Button, ArrowRule, SectionHeading, PhotoCard, PolaroidStack …).
- `components/site/` – Navigation, Mobile-Menü, Footer, Hero, Kontaktformular.
- `components/motion/` – GSAP-Setup:
  - `MotionShell.tsx`: ScrollSmoother, Seitenübergang (Vorhang mit Rissrand), Intro.
  - `animatePage.ts`: baut pro Seite alle Scroll-Animationen über `data-*`-Attribute auf.
  - `TLink.tsx`: interner Link mit Seitenübergang.

### Animations-Attribute

| Attribut | Wirkung |
| --- | --- |
| `data-hero` | Ken-Burns, Zeilen-Reveal der Headline, Parallaxe beim Wegscrollen |
| `data-reveal` (`left`, `right`, `scale`, `fade`) | Einblenden beim Scrollen, automatisch gestaffelt |
| `data-split` | Überschrift steigt zeilenweise aus einer Maske |
| `data-words` | Wort-für-Wort-Einblendung |
| `data-rule` | ArrowRule «zeichnet» sich (Punkt → Linie → Spitze) |
| `data-count` / `data-suffix` | Zahl zählt hoch |
| `data-zoom` (`up`, `left`, `right`) | Bild-Vorhang-Reveal + Zoom + leichte Parallaxe |
| `data-parallax="0.1"` | Parallaxe |
| `data-pop="<Winkel>"` | Polaroid ploppt mit Drehung auf den Endwinkel |
| `data-tilt` | 3D-Neigung + Lichtreflex auf Karten (nur Maus) |
| `data-timeline`, `data-checklist`, `data-step-num`, `data-badge-pop` | Zeitstrahl, Listen, Schritt-Nummern, Icon-Badges |

Bei «Bewegung reduzieren» (prefers-reduced-motion) werden alle Animationen und das Smooth-Scrolling abgeschaltet.

## Offene Punkte

- **Formularversand**: Das Formular validiert und zeigt die Bestätigung, verschickt aber noch nichts (wie im Entwurf). Für den Versand an info@forst-lungern.ch auf statischem Hosting einen Formular-Dienst (z.B. Formspree, Web3Forms) oder ein eigenes Backend anbinden.
- **Fotos fehlen noch** für Produkte, drei Maschinen (Unitrac, MB Trac, Kramer) und das Kartenbild – dort stehen Platzhalter (`ImageSlot`).
- **Logo**: `logo-white.png` / `logo-dark.png` wurden automatisch aus `logo.png` freigestellt. Eine Vektor-Version (SVG) wäre besser.
- Preise sind Platzhalter (siehe Hinweis auf der Produktseite), Datenschutztext ist ein Entwurf.
