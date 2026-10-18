import { asset } from './base';

export const PH = asset('/assets/photos/');

export const CONTACT = {
  tel: 'tel:+41798330036',
  telLabel: '079 833 00 36',
  whatsapp: 'https://wa.me/41798330036?text=Hallo%20Forst%20Lungern',
  whatsappProdukte:
    'https://wa.me/41798330036?text=Hallo%20Forst%20Lungern%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Holzprodukte.',
  mail: 'mailto:info@forst-lungern.ch',
  mailLabel: 'info@forst-lungern.ch',
  address: 'Forst Lungern AG · Sattelwaldweg 4 · 6078 Lungern',
  /** Ziel der «Anrufen»-Buttons: Kontaktdaten von Armin Imfeld auf der Kontaktseite */
  call: '/kontakt#ansprechperson',
  /** Direkte E-Mail der Ansprechperson */
  personMail: 'mailto:armin.imfeld@forst-lungern.ch',
  personMailLabel: 'armin.imfeld@forst-lungern.ch',
  /** Standort Werkhof Hackern */
  mapsGoogle: 'https://www.google.com/maps/search/?api=1&query=Forstwerkhof+Hackern+Lungern',
  mapsSwisstopo: 'https://s.geo.admin.ch/gc1en7gwlxcf',
};

export type NavItem = { href: string; label: string };

export const NAV: NavItem[] = [
  { href: '/', label: 'Startseite' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/holzprodukte', label: 'Holzprodukte' },
  { href: '/maschinen', label: 'Maschinenpark' },
  { href: '/jobs', label: 'Jobs & Lehrstellen' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const FOOTER_NAV: NavItem[] = NAV.concat([
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
]);

export type Service = {
  slug: string;
  title: string;
  meta: string;
  short: string;
  intro: string;
  bullets: string[];
  forWhom: string[];
  images: [string, string, string];
  heroPos: string;
  anliegen: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'waldbewirtschaftung-schutzwald',
    title: 'Waldbewirtschaftung & Schutzwald',
    meta: 'Teilsamen · Kanton',
    short: 'Schutzwaldpflege nach NaiS, Jungwaldpflege, Pflanzungen und Lebensraumaufwertung.',
    intro:
      'Rund 61 % des Lungerer Waldes sind Schutzwald. Wir pflegen ihn nach den Grundsätzen von NaiS, damit er Siedlungen, Strassen und Bahn vor Steinschlag, Lawinen und Rutschungen schützt.',
    bullets: ['Waldbewirtschaftung', 'Schutzwaldpflege', 'Jungwaldpflege', 'Pflanzungen', 'Lebensraumaufwertung'],
    forWhom: ['Teilsamen', 'Kanton'],
    images: ['motorsaege-gegenlicht.jpg', 'wald-sonnenstrahlen.jpg', 'weiher-nachher.jpg'],
    heroPos: 'center 40%',
    anliegen: 'Anderes',
  },
  {
    slug: 'naturgefahren-verbauungen',
    title: 'Verbauungen',
    meta: 'Gemeinde · Kanton · Wuhrgenossenschaften',
    short: 'Bach-, Hang- und Lawinenverbauungen sowie deren Unterhalt.',
    intro:
      'Bäche, Hänge und Lawinenzüge oberhalb von Lungern brauchen Verbauungen, die halten. Wir bauen und unterhalten sie mit eigenen Maschinen und mit Holz aus der Region.',
    bullets: ['Bachverbauungen', 'Hangverbauungen', 'Lawinenverbauungen', 'Unterhalt bestehender Verbauungen'],
    forWhom: ['Gemeinde', 'Kanton', 'Wuhrgenossenschaften'],
    images: ['schreitbagger-verbau.jpg', 'wegbau-treppe-bagger.jpg', 'seilkran-bagger-rundholz.jpg'],
    heroPos: 'center 50%',
    anliegen: 'Verbauungen',
  },
  {
    slug: 'holzerei-baumpflege',
    title: 'Sicherheitsholzerei & Baumpflege',
    meta: 'Private · Gemeinde · Werke',
    short: 'Sicherheitsholzerei, Gartenholzerei, Baumpflege, Böschungspflege und Entsorgung.',
    intro:
      'Ob ein Baum zu nah am Haus steht oder eine Strasse gesichert werden muss: Wir fällen sicher, pflegen Bäume fachgerecht und entsorgen das Material – auch dort, wo kein Kran hinkommt.',
    bullets: ['Sicherheitsholzerei', 'Gartenholzerei', 'Baumpflege', 'Böschungspflege', 'Entsorgung'],
    forWhom: ['Private', 'Gemeinde', 'Werke'],
    images: ['holzerei-team-nebel.jpg', 'stihl-stammquerschnitt.jpg', 'seilkran-winter.jpg'],
    heroPos: 'center 30%',
    anliegen: 'Holzerei/Baumpflege',
  },
  {
    slug: 'strassen-infrastruktur',
    title: 'Unterhalt Infrastruktur',
    meta: 'Teilsamen · Gemeinde',
    short: 'Wald-, Alp- und Erschliessungsstrassen sowie Schwemmholz am Lungerersee.',
    intro:
      'Wald-, Alp- und Erschliessungsstrassen müssen Wetter und Last aushalten. Wir bauen und unterhalten sie und reinigen den Lungerersee.',
    bullets: ['Wald-, Alp- und Erschliessungsstrassen', 'Unterhalt und Instandstellungen aller Art', 'Schwemmholz Lungerersee'],
    forWhom: ['Teilsamen', 'Gemeinde'],
    images: ['wegbau-treppe-bagger.jpg', 'wegunterhalt-team.jpg', 'waldstrasse-winter-polter.jpg'],
    heroPos: 'center 50%',
    anliegen: 'Anderes',
  },
  {
    slug: 'winterdienst',
    title: 'Winterdienst',
    meta: 'Gemeinde · Private · Bahn',
    short: 'Schneeräumung auf Gemeindestrassen, bei Privaten und an Bahnhöfen.',
    intro:
      'Im Winter räumen wir Schnee auf Gemeindestrassen, bei Privaten und an Bahnhöfen – früh am Morgen, zuverlässig und mit eigenen Fahrzeugen.',
    bullets: ['Schneeräumung Gemeindestrassen', 'Schneeräumung für Private', 'Schneeräumung Bahnhöfe'],
    forWhom: ['Gemeinde', 'Private', 'Bahn'],
    images: ['waldstrasse-winter-polter.jpg', 'seilkran-winter.jpg', 'seilbahn-tal.jpg'],
    heroPos: 'center 55%',
    anliegen: 'Winterdienst',
  },
];

/* ===== Holzprodukte (gemäss «Preisliste Holzschopf», gültig ab 1. Januar 2026, Preise exkl. MWST) ===== */

/** Preisliste als PDF zum Herunterladen (liegt in public/assets/docs/). */
export const PRICE_LIST_PDF = asset('/assets/docs/Preisliste-Holzsortiment-2026.pdf');
/** Vorgeschlagener Dateiname beim Herunterladen */
export const PRICE_LIST_FILE = 'Preisliste-Holzsortiment-2026-Forst-Lungern.pdf';
export const PRICE_LIST_LABEL = 'Preisliste 2026 (PDF)';
export const PRICE_LIST_VALID = 'gültig ab 1. Januar 2026';
/** MWST-Satz Schweiz (Normalsatz). Alle Preise der Liste verstehen sich exkl. MWST. */
export const MWST_RATE = 0.081;

/** Brennholz: Grundpreis pro Ster (Meterholz, 1 m), Zuschläge für Fräsen und Spalten. */
export type Firewood = { id: string; name: string; detail: string; pricePerSter: number };
export const FIREWOOD: Firewood[] = [
  { id: 'buche', name: 'Buche Brennholz', detail: 'trocken, Hartholz mit langer Glut', pricePerSter: 120 },
  { id: 'nadel', name: 'Nadelholz Brennholz', detail: 'trocken, brennt schnell und heiss', pricePerSter: 110 },
];

/** Schnittlänge: 1 m = Meterholz ohne Zuschlag, kürzer = gefräst (Zuschlag pro Ster). */
export const FIREWOOD_LENGTHS = [
  { id: '100', label: '1 m', detail: 'Meterholz', surcharge: 0 },
  { id: '50', label: '50 cm', detail: 'Fräsen 1×', surcharge: 17 },
  { id: '33', label: '33 cm', detail: 'Fräsen 2×', surcharge: 22 },
  { id: '25', label: '25 cm', detail: 'Fräsen 3×', surcharge: 32 },
] as const;
export type FirewoodLength = (typeof FIREWOOD_LENGTHS)[number]['id'];

/** Zuschlag «Spalten fein» pro Ster (nur bei gefrästem Holz). */
export const SPLIT_FINE_SURCHARGE = 25;

/** Lieferung von Brennholz: Preis pro Ster, ab einer Mindestmenge günstiger. */
export const DELIVERY = { perSter: 30, perSterReduced: 20, reducedFrom: 2, area: 'Gemeinde Lungern' };

/** Übrige Produkte mit festem Stückpreis. */
export type Product = {
  id: string;
  group: string;
  name: string;
  detail: string;
  /** Einheit kurz (z.B. «Sack»), Mehrzahl und ausgeschrieben */
  unit: string;
  unitPlural: string;
  unitLong: string;
  price: number;
  /** Schrittweite im Mengenfeld */
  step: number;
  /** Preis pro Laufmeter: Kunde gibt Stückzahl und Länge pro Stück ein */
  perLength?: { step: number; default: number };
};

export const PRODUCTS: Product[] = [
  { id: 'sack-25', group: 'Brennholz im Sack', name: 'Buche Brennholz', detail: 'trocken, 25 cm', unit: 'Sack', unitPlural: 'Säcke', unitLong: 'Sack', price: 13, step: 1 },
  { id: 'sack-33', group: 'Brennholz im Sack', name: 'Buche Brennholz', detail: 'trocken, 33 cm', unit: 'Sack', unitPlural: 'Säcke', unitLong: 'Sack', price: 13, step: 1 },
  { id: 'latten', group: 'Latten & Pfähle', name: 'Latten rund', detail: 'entrindet', unit: 'Stk.', unitPlural: 'Stk.', unitLong: 'Laufmeter', price: 5, step: 1, perLength: { step: 0.5, default: 3 } },
  { id: 'zaunpfahl', group: 'Latten & Pfähle', name: 'Zaunpfähle', detail: 'Länge 1.6 m', unit: 'Stk.', unitPlural: 'Stk.', unitLong: 'Stück', price: 5.2, step: 1 },
  { id: 'pfahl', group: 'Latten & Pfähle', name: 'Pfähle', detail: 'Länge 1 m', unit: 'Stk.', unitPlural: 'Stk.', unitLong: 'Stück', price: 4, step: 1 },
  { id: 'hackschnitzel', group: 'Schüttgut', name: 'Hackschnitzel', detail: '', unit: 'Sm³', unitPlural: 'Sm³', unitLong: 'Schüttkubikmeter', price: 45, step: 1 },
  { id: 'bergschotter', group: 'Schüttgut', name: 'Bergschotter', detail: 'für Wege und Plätze', unit: 'm³', unitPlural: 'm³', unitLong: 'Kubikmeter', price: 75, step: 1 },
];

/** Betrag in Franken, Schweizer Schreibweise: CHF 1'234.50 */
export function chf(n: number) {
  const [int, dec] = (Math.round(n * 100) / 100).toFixed(2).split('.');
  return 'CHF ' + int.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + '.' + dec;
}

/** Auf 5 Rappen runden (Schweizer Rundung für Endbeträge). */
export const round05 = (n: number) => Math.round(n * 20) / 20;

export type Machine = { id: string; name: string; kind: string; use: string; image?: string; pos?: string; placeholder?: string };

export const MACHINES: Machine[] = [
  { id: 'seilkran', name: 'Seilkran (Kippmast)', kind: 'Holzbringung', use: 'Bringt Holz aus steilen Hängen heraus, wo keine Maschine hinkommt.', image: 'seilkran-tal-panorama.jpg', pos: 'center 67%' },
  { id: 'hsm', name: 'Forstschlepper HSM 805', kind: 'Rücken und Transport', use: 'Rückt Rundholz von der Strasse zum Polter und auf den Lagerplatz.', image: 'forwarder-holzlager.jpg', pos: 'center' },
  { id: 'liebherr', name: 'Bagger Liebherr 916', kind: 'Wegbau und Verbau', use: 'Für Waldstrassen, Treppen, Bach- und Hangverbauungen.', image: 'wegbau-treppe-bagger.jpg', pos: 'center' },
  { id: 'unitrac', name: 'Lindner Unitrac 82', kind: 'Transporter', use: 'Transport von Material und Personal, Winterdienst.', placeholder: 'Foto Lindner Unitrac 82' },
  { id: 'mbtrac', name: 'MB Trac', kind: 'Zugmaschine', use: 'Für Anhänger, Seilwinde und Winterdienst.', image: 'maschine-mbtrac.jpg', pos: 'center 30%' },
  { id: 'kramer', name: 'Kramer', kind: 'Radlader', use: 'Holzumschlag und Arbeiten im Forstwerkhof.', image: 'maschine-kramer.jpg', pos: 'center 15%' },
];

export const MILESTONES = [
  { date: '1996', text: 'Bau des gemeinsamen Forstwerkhofes – Beginn der Zusammenarbeit der Teilsamen Lungern-Dorf und Lungern-Obsee.' },
  { date: '2005', text: 'Neubau Brennholzhalle.' },
  { date: '1. Oktober 2025', text: 'Armin Imfeld übernimmt als Revierförster und Betriebsleiter.' },
  { date: '28. Januar 2026', text: 'Ausserordentliche Einungsgemeinden beider Teilsamen stimmen der Gründung zu.' },
  { date: '23. Februar 2026', text: 'Eintrag im Handelsregister des Kantons Obwalden.' },
  { date: '1. März 2026', text: 'Offizieller Betriebsstart der Forst Lungern AG.' },
];

export type Job = {
  id: string;
  title: string;
  pensum: string;
  start: string;
  /** Veröffentlicht am (für Google-Jobsuche) */
  datePosted: string;
  intro: string;
  aufgaben: string[];
  profil: string[];
  angebot: string[];
  kontakt: { name: string; rolle: string; tel: string; telLabel: string; mail: string };
};

/** Offene Stellen. Leere Liste = Hinweis «Zurzeit keine Stellen ausgeschrieben». */
export const JOBS: Job[] = [
  {
    id: 'forstwart-allrounder',
    title: 'Forstwart/in EFZ oder Allrounder/in',
    pensum: '80–100 %',
    start: 'Per sofort oder nach Vereinbarung',
    datePosted: '2026-10-08',
    intro:
      'Die Forst Lungern AG sucht zur Verstärkung ihres Teams per sofort oder nach Vereinbarung eine/n Forstwart/in EFZ oder Allrounder/in.',
    aufgaben: [
      'Allgemeine forstliche Tätigkeiten',
      'Mitarbeit bei Hang- und Bachverbauungen',
      'Unterhalt von Wald-, Alp- und Erschliessungsstrassen',
      'Sicherheits- und Spezialholzereien',
      'Bedienen und Warten von Maschinen und Geräten',
      'Mitarbeit bei weiteren vielseitigen Arbeiten unseres Forstbetriebs',
    ],
    profil: [
      'Abgeschlossene Ausbildung als Forstwart/in EFZ von Vorteil',
      'Selbständige, zuverlässige und teamorientierte Arbeitsweise',
      'Freude an der Arbeit in der Natur und im alpinen Gelände',
      'Führerausweis Kategorie B (BE von Vorteil)',
    ],
    angebot: [
      'Eine abwechslungsreiche und verantwortungsvolle Tätigkeit',
      'Ein motiviertes und kollegiales Team',
      'Einen vielseitigen Maschinenpark',
      'Möglichkeiten zur Aus- und Weiterbildung',
      '5 Wochen Ferien',
    ],
    kontakt: {
      name: 'Armin Imfeld',
      rolle: 'Geschäftsführer',
      tel: 'tel:+41798330036',
      telLabel: '079 833 00 36',
      mail: 'armin.imfeld@forst-lungern.ch',
    },
  },
];

export const LEHRE = [
  { n: '01', title: 'Schnuppern', text: 'Zwei bis drei Tage mit dem Team im Wald. Du siehst, wie ein Arbeitstag im Forst aussieht.' },
  { n: '02', title: 'Bewerben', text: 'Bewerbung mit Lebenslauf und Zeugnissen an Armin Imfeld. Wir laden dich zum Gespräch ein.' },
  { n: '03', title: 'Drei Jahre Lehre', text: 'Arbeit im Betrieb, ein Tag Berufsfachschule pro Woche und überbetriebliche Kurse.' },
  { n: '04', title: 'Abschluss EFZ', text: 'Qualifikationsverfahren und eidgenössisches Fähigkeitszeugnis Forstwart/in EFZ.' },
];

/**
 * Versand des Kontaktformulars über FormSubmit (formsubmit.co) an Armin Imfeld.
 * Die erste Anfrage löst eine Bestätigungs-Mail an diese Adresse aus («Activate» klicken).
 * Danach kann die E-Mail-Adresse hier durch die zugeschickte Zufallszeichenfolge ersetzt werden.
 */
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/armin.imfeld@forst-lungern.ch';
/**
 * what3words-API-Schlüssel für das Feld «what3words-Adresse» im Formular (Gratis-Plan: nur Vorschläge/AutoSuggest).
 * Er ist im Browser sichtbar – im what3words-Konto deshalb auf die Website-Domain beschränken.
 */
export const W3W_KEY = 'SVB653U4';
/** Max. Gesamtgrösse der Anhänge (Grenze von FormSubmit) */
export const FORM_MAX_BYTES = 10 * 1024 * 1024;

export const ANLIEGEN = ['Holzprodukte', 'Holzerei/Baumpflege', 'Verbauungen', 'Winterdienst', 'Stelle/Lehre', 'Anderes'];

export type Hero = { image: string; pos: string; eyebrow: string; title: string; text: string };

export const HEROES: Record<string, Hero> = {
  ueber: { image: PH + 'seilkran-tal-panorama.jpg', pos: 'center 47%', eyebrow: 'Über uns', title: 'Ein Betrieb für den Lungerer Wald', text: 'Die Forst Lungern AG führt die Forstbetriebe der Teilsamen Lungern-Dorf und Lungern-Obsee seit dem 1. März 2026 gemeinsam.' },
  leistungen: { image: PH + 'seilbahn-tal.jpg', pos: 'center 50%', eyebrow: 'Leistungen', title: 'Was wir für Sie tun', text: 'Fünf Bereiche – vom Schutzwald über Verbauungen bis zum Winterdienst.' },
  produkte: { image: PH + 'rundholz-polter.jpg', pos: 'center 42%', eyebrow: 'Holzprodukte', title: 'Holz aus dem Lungerer Wald', text: 'Brennholz, Pfähle, Hackschnitzel und Bergschotter – Menge wählen, Preis sehen und direkt bei uns bestellen.' },
  maschinen: { image: PH + 'seilkran-bagger-rundholz.jpg', pos: 'center 72%', eyebrow: 'Maschinenpark', title: 'Für steiles Gelände gebaut', text: 'Seilkran, Forstschlepper, Bagger und Transporter – alle Maschinen sind auf die Forst Lungern AG übergegangen.' },
  jobs: { image: PH + 'holzerei-team-nebel.jpg', pos: 'center 45%', eyebrow: 'Jobs & Lehrstellen', title: 'Arbeiten, wo andere wandern', text: 'Offene Stellen, Lehre Forstwart/in EFZ und Schnupperlehre bei einem anerkannten Lehrbetrieb.' },
  kontakt: { image: PH + 'wegunterhalt-team.jpg', pos: 'center 45%', eyebrow: 'Kontakt', title: 'Wir sind für Sie da', text: 'Telefon, WhatsApp oder Formular – Sie erreichen uns von jeder Seite aus mit einem Klick.' },
  impressum: { image: PH + 'waldstrasse-winter-polter.jpg', pos: 'center 55%', eyebrow: 'Rechtliches', title: 'Impressum', text: 'Pflichtangaben der Forst Lungern AG.' },
  datenschutz: { image: PH + 'waldstrasse-winter-polter.jpg', pos: 'center 55%', eyebrow: 'Rechtliches', title: 'Datenschutzerklärung', text: 'Wie wir mit Ihren Daten umgehen.' },
};

/** Link zum Kontaktformular mit vorausgefülltem Anliegen und Nachricht. */
export function kontaktHref(anliegen: string, nachricht: string) {
  return '/kontakt?' + new URLSearchParams({ anliegen, nachricht }).toString() + '#formular';
}
