import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { LegalBlock } from '@/components/site/LegalBlock';
import { CONTACT, HEROES } from '@/lib/data';

export const metadata: Metadata = { title: 'Datenschutz', description: HEROES.datenschutz.text };

export default function DatenschutzPage() {
  const h = HEROES.datenschutz;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />
      <section className="section">
        <div className="container container--narrow" style={{ display: 'grid', gap: 40 }}>
          <p
            data-reveal=""
            style={{ margin: 0, padding: '16px 20px', background: 'var(--surface-soft)', border: '1px solid var(--border-subtle)', fontSize: 15, color: 'var(--text-muted)' }}
          >
            Entwurf nach revDSG. Die finalen Texte sind vor dem Aufschalten durch eine Fachperson zu prüfen.
          </p>
          <LegalBlock title="Verantwortliche Stelle">
            <p style={{ margin: '14px 0 0' }}>
              Forst Lungern AG, Sattelwaldweg 4, 6078 Lungern, <a href={CONTACT.mail}>{CONTACT.mailLabel}</a>. Kontakt für Datenschutzfragen: Armin Imfeld,
              Geschäftsführer.
            </p>
          </LegalBlock>
          <LegalBlock title="Welche Daten wir bearbeiten">
            <p style={{ margin: '14px 0 0' }}>
              Wenn Sie uns über das Kontaktformular, per E-Mail, Telefon oder WhatsApp kontaktieren, bearbeiten wir die Angaben, die Sie uns übermitteln: Name,
              Telefon, E-Mail, Einsatzort, Nachricht und allfällige Fotos.
            </p>
          </LegalBlock>
          <LegalBlock title="Zweck und Aufbewahrung">
            <p style={{ margin: '14px 0 0' }}>
              Wir nutzen die Daten zur Beantwortung Ihrer Anfrage, zur Offertstellung und zur Abwicklung von Aufträgen. Anfragen ohne Auftrag löschen wir nach
              Abschluss der Bearbeitung; Auftragsdaten bewahren wir gemäss den gesetzlichen Fristen auf.
            </p>
          </LegalBlock>
          <LegalBlock title="Hosting">
            <p style={{ margin: '14px 0 0' }}>
              Diese Website wird bei einem Anbieter mit Serverstandort Schweiz betrieben. Der Anbieter bearbeitet technische Zugriffsdaten (IP-Adresse,
              Zeitpunkt, aufgerufene Seite) zur Sicherstellung des Betriebs.
            </p>
          </LegalBlock>
          <LegalBlock title="Dienste von Dritten">
            <p style={{ margin: '14px 0 0' }}>
              WhatsApp: Wenn Sie uns über den WhatsApp-Link kontaktieren, werden Daten an Meta Platforms (USA) übermittelt. Der Link öffnet WhatsApp erst nach
              Ihrem Klick. Als Alternative steht das Kontaktformular zur Verfügung.
            </p>
            <p style={{ margin: '10px 0 0' }}>Karten: Wir binden keine Karte ein. Der Link zu Google Maps oder Swisstopo öffnet den jeweiligen Dienst extern.</p>
            <p style={{ margin: '10px 0 0' }}>Schriften und Statistik: Schriften werden lokal gehostet. Wir setzen keine Cookies und keine Tracking-Dienste ein.</p>
          </LegalBlock>
          <LegalBlock title="Ihre Rechte">
            <p style={{ margin: '14px 0 0' }}>
              Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Wenden Sie sich dafür an <a href={CONTACT.mail}>{CONTACT.mailLabel}</a>.
            </p>
          </LegalBlock>
        </div>
      </section>
    </main>
  );
}
