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
};

/** Richtpreise anzeigen (entspricht der Option «showPrices» im Entwurf). */
export const SHOW_PRICES = true;

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
      'Rund 61 % des Lungerer Waldes sind Schutzwald. Wir pflegen ihn nach den Grundsätzen von NaiS, damit er Siedlungen, Strassen und Bahn vor Steinschlag, Lawinen und Rutschungen schützt – und bewirtschaften den übrigen Wald naturnah.',
    bullets: ['Waldbewirtschaftung', 'Schutzwaldpflege (NaiS)', 'Jungwaldpflege', 'Pflanzungen', 'Lebensraumaufwertung'],
    forWhom: ['Teilsamen', 'Kanton'],
    images: ['motorsaege-gegenlicht.jpg', 'wald-sonnenstrahlen.jpg', 'weiher-nachher.jpg'],
    heroPos: 'center 40%',
    anliegen: 'Anderes',
  },
  {
    slug: 'naturgefahren-verbauungen',
    title: 'Naturgefahren & Verbauungen',
    meta: 'Gemeinde · Kanton · Wuhrgenossenschaften',
    short: 'Bach-, Hang- und Lawinenverbauungen, Unterhalt, Quell- und Wasserfassungen.',
    intro:
      'Bäche, Hänge und Lawinenzüge oberhalb von Lungern brauchen Verbauungen, die halten. Wir bauen und unterhalten sie mit eigenen Maschinen und mit Holz aus der Region.',
    bullets: ['Bachverbauungen', 'Hangverbauungen', 'Lawinenverbauungen', 'Unterhalt bestehender Verbauungen', 'Quell- und Wasserfassungen'],
    forWhom: ['Gemeinde', 'Kanton', 'Wuhrgenossenschaften'],
    images: ['schreitbagger-verbau.jpg', 'wegbau-treppe-bagger.jpg', 'seilkran-bagger-rundholz.jpg'],
    heroPos: 'center 50%',
    anliegen: 'Verbauungen',
  },
  {
    slug: 'steinschlagnetze',
    title: 'Steinschlagnetze',
    meta: 'Kanton · Bund · Netzhersteller',
    short: 'Aufbau, Tests mit Partnerfirma, Ausmähen und Unterhalt an der Brünig-Passstrasse.',
    intro:
      'Steinschlagnetze sichern die Brünig-Passstrasse. Wir bauen sie auf, testen sie zusammen mit einer Partnerfirma und halten sie frei und intakt – im steilen Gelände, oft direkt über dem Verkehr.',
    bullets: ['Aufbau von Steinschlagnetzen', 'Testen mit Partnerfirma', 'Ausmähen und Unterhalt an der Brünig-Passstrasse'],
    forWhom: ['Kanton', 'Bund (ASTRA)', 'Netzhersteller'],
    images: ['sicherheitsholzerei-strasse.jpg', 'seilbahn-tal.jpg', 'seilkran-winter.jpg'],
    heroPos: 'center 50%',
    anliegen: 'Verbauungen',
  },
  {
    slug: 'holzerei-baumpflege',
    title: 'Holzerei & Baumpflege',
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
    title: 'Strassen & Infrastruktur',
    meta: 'Teilsamen · Gemeinde',
    short: 'Wald-, Alp- und Erschliessungsstrassen sowie Schwemmholz am Lungerersee.',
    intro:
      'Wald-, Alp- und Erschliessungsstrassen müssen Wetter und Last aushalten. Wir bauen und unterhalten sie mit Bagger und Schlepper und räumen Schwemmholz am Lungerersee.',
    bullets: ['Wald-, Alp- und Erschliessungsstrassen', 'Unterhalt und Instandstellung', 'Schwemmholz Lungerersee'],
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

export type Product = { id: string; name: string; ausfuehrung: string; einheit: string; price: string };

export const PRODUCTS: Product[] = [
  { id: 'buche-sack', name: 'Brennholz Buche', ausfuehrung: 'gespalten, 25 / 33 cm', einheit: 'Sack ca. 40 l', price: 'CHF 12.–' },
  { id: 'buche-ster', name: 'Brennholz Buche', ausfuehrung: 'gespalten, 25 / 33 / 50 cm', einheit: 'Ster', price: 'CHF 160.–' },
  { id: 'nadel-ster', name: 'Brennholz Nadelholz', ausfuehrung: 'gespalten, 25 / 33 / 50 cm', einheit: 'Ster', price: 'CHF 120.–' },
  { id: 'meterholz', name: 'Meterholz Buche', ausfuehrung: '1 m, gespalten', einheit: 'Ster', price: 'CHF 120.–' },
  { id: 'anfeuerholz', name: 'Anfeuerholz', ausfuehrung: 'Nadelholz, fein gespalten', einheit: 'Sack ca. 20 l', price: 'CHF 10.–' },
  { id: 'finnenkerze', name: 'Finnenkerze', ausfuehrung: 'ca. 50 cm, Nadelholz', einheit: 'Stück', price: 'CHF 15.–' },
  { id: 'schnitzel', name: 'Holzschnitzel', ausfuehrung: 'Hackschnitzel für Heizungen', einheit: 'Sm³ (Schüttkubikmeter)', price: 'CHF 50.–' },
  { id: 'rindenmulch', name: 'Rindenmulch', ausfuehrung: 'für Garten und Beete', einheit: 'Sm³', price: 'CHF 45.–' },
  { id: 'pfosten-15', name: 'Zaunpfosten Lärche', ausfuehrung: 'gespitzt, 1.5 m', einheit: 'Stück', price: 'CHF 9.–' },
  { id: 'pfosten-20', name: 'Zaunpfosten Lärche', ausfuehrung: 'gespitzt, 2.0 m', einheit: 'Stück', price: 'CHF 12.–' },
  { id: 'lieferung', name: 'Lieferung', ausfuehrung: 'Gemeinde Lungern', einheit: 'pauschal', price: 'ab CHF 30.–' },
];

export type Machine = { id: string; name: string; kind: string; use: string; image?: string; pos?: string; placeholder?: string };

export const MACHINES: Machine[] = [
  { id: 'seilkran', name: 'Seilkran (Kippmast)', kind: 'Holzbringung', use: 'Bringt Holz aus steilen Hängen heraus, wo keine Maschine hinkommt.', image: 'seilkran-tal-panorama.jpg', pos: 'center 62%' },
  { id: 'hsm', name: 'Forstschlepper HSM 805', kind: 'Rücken und Transport', use: 'Rückt Rundholz von der Strasse zum Polter und auf den Lagerplatz.', image: 'forwarder-holzlager.jpg', pos: 'center' },
  { id: 'liebherr', name: 'Bagger Liebherr 916', kind: 'Wegbau und Verbau', use: 'Für Waldstrassen, Treppen, Bach- und Hangverbauungen.', image: 'wegbau-treppe-bagger.jpg', pos: 'center' },
  { id: 'unitrac', name: 'Lindner Unitrac 82', kind: 'Transporter', use: 'Transport von Material und Personal, Winterdienst.', placeholder: 'Foto Lindner Unitrac 82' },
  { id: 'mbtrac', name: 'MB Trac', kind: 'Zugmaschine', use: 'Für Anhänger, Seilwinde und Winterdienst.', image: 'maschine-mbtrac.jpg', pos: 'center 30%' },
  { id: 'kramer', name: 'Kramer', kind: 'Radlader', use: 'Holzumschlag und Arbeiten im Werkhof Hackern.', image: 'maschine-kramer.jpg', pos: 'center 15%' },
];

export const MILESTONES = [
  { date: '1996', text: 'Gemeinsamer Bau des Werkhofs – Beginn der Zusammenarbeit der Teilsamen Lungern-Dorf und Lungern-Obsee.' },
  { date: '2007', text: 'Erweiterung des Werkhofs.' },
  { date: '1. Oktober 2025', text: 'Armin Imfeld übernimmt als Förster und Betriebsleiter.' },
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

export const ANLIEGEN = ['Holzprodukte', 'Holzerei/Baumpflege', 'Verbauungen', 'Winterdienst', 'Stelle/Lehre', 'Anderes'];

export type Hero = { image: string; pos: string; eyebrow: string; title: string; text: string };

export const HEROES: Record<string, Hero> = {
  ueber: { image: PH + 'seilkran-tal-panorama.jpg', pos: 'center 62%', eyebrow: 'Über uns', title: 'Ein Betrieb für den Lungerer Wald', text: 'Die Forst Lungern AG führt die Forstbetriebe der Teilsamen Lungern-Dorf und Lungern-Obsee seit dem 1. März 2026 gemeinsam.' },
  leistungen: { image: PH + 'seilbahn-tal.jpg', pos: 'center 45%', eyebrow: 'Leistungen', title: 'Was wir für Sie tun', text: 'Sechs Bereiche – vom Schutzwald über Verbauungen und Steinschlagnetze bis zum Winterdienst.' },
  produkte: { image: PH + 'rundholz-polter.jpg', pos: 'center 55%', eyebrow: 'Holzprodukte', title: 'Holz aus dem Lungerer Wald', text: 'Brennholz, Schnitzel, Rindenmulch und Lärchenpfosten – Schaufenster mit Anfrage, kein Onlineshop.' },
  maschinen: { image: PH + 'seilkran-bagger-rundholz.jpg', pos: 'center 55%', eyebrow: 'Maschinenpark', title: 'Für steiles Gelände gebaut', text: 'Seilkran, Forstschlepper, Bagger und Transporter – alle Maschinen sind auf die Forst Lungern AG übergegangen.' },
  jobs: { image: PH + 'holzerei-team-nebel.jpg', pos: 'center 30%', eyebrow: 'Jobs & Lehrstellen', title: 'Arbeiten, wo andere wandern', text: 'Offene Stellen, Lehre Forstwart/in EFZ und Schnupperlehre bei einem anerkannten Lehrbetrieb.' },
  kontakt: { image: PH + 'wegunterhalt-team.jpg', pos: 'center 45%', eyebrow: 'Kontakt', title: 'Wir sind für Sie da', text: 'Telefon, WhatsApp oder Formular – Sie erreichen uns von jeder Seite aus mit einem Klick.' },
  impressum: { image: PH + 'waldstrasse-winter-polter.jpg', pos: 'center 55%', eyebrow: 'Rechtliches', title: 'Impressum', text: 'Pflichtangaben der Forst Lungern AG.' },
  datenschutz: { image: PH + 'waldstrasse-winter-polter.jpg', pos: 'center 55%', eyebrow: 'Rechtliches', title: 'Datenschutzerklärung', text: 'Wie wir mit Ihren Daten umgehen.' },
};

/** Link zum Kontaktformular mit vorausgefülltem Anliegen und Nachricht. */
export function kontaktHref(anliegen: string, nachricht: string) {
  return '/kontakt?' + new URLSearchParams({ anliegen, nachricht }).toString() + '#formular';
}
