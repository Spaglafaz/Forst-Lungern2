import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { LegalBlock } from '@/components/site/LegalBlock';
import { CONTACT, HEROES } from '@/lib/data';

export const metadata: Metadata = { title: 'Impressum', description: HEROES.impressum.text };

export default function ImpressumPage() {
  const h = HEROES.impressum;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />
      <section className="section">
        <div className="container container--narrow" style={{ display: 'grid', gap: 40 }}>
          <LegalBlock title="Verantwortlich für den Inhalt">
            <p style={{ margin: '14px 0 0' }}>
              Forst Lungern AG
              <br />
              Sattelwaldweg 4
              <br />
              6078 Lungern
              <br />
              Schweiz
            </p>
            <p style={{ margin: '14px 0 0' }}>
              Telefon <a href={CONTACT.tel}>{CONTACT.telLabel}</a>
              <br />
              E-Mail <a href={CONTACT.mail}>{CONTACT.mailLabel}</a>
            </p>
          </LegalBlock>
          <LegalBlock title="Unternehmen">
            <dl className="dl-grid dl-grid--muted" style={{ margin: '14px 0 0', gap: '8px 24px', fontSize: 17 }}>
              <dt>Rechtsform</dt>
              <dd>Aktiengesellschaft (Art. 620 ff. OR)</dd>
              <dt>Sitz</dt>
              <dd>Lungern OW</dd>
              <dt>UID</dt>
              <dd>CHE-439.610.341</dd>
              <dt>Handelsregister</dt>
              <dd>Kanton Obwalden, Eintrag vom 23. Februar 2026</dd>
              <dt>Geschäftsführer</dt>
              <dd>Armin Imfeld</dd>
              <dt>Verwaltungsrat</dt>
              <dd>Zeichnungsberechtigte laut Handelsregisterauszug</dd>
              <dt>Aktienkapital</dt>
              <dd>CHF 200&apos;000, voll liberiert</dd>
            </dl>
          </LegalBlock>
          <LegalBlock title="Bildnachweise und Gestaltung">
            <p style={{ margin: '14px 0 0' }}>Fotos: Forst Lungern AG. Konzept und Webdesign: Forst Lungern AG.</p>
          </LegalBlock>
          <LegalBlock title="Haftungsausschluss">
            <p style={{ margin: '14px 0 0' }}>
              Die Forst Lungern AG übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte. Verweise und Links auf Websites
              Dritter liegen ausserhalb unseres Verantwortungsbereichs; der Zugriff erfolgt auf eigene Verantwortung.
            </p>
          </LegalBlock>
        </div>
      </section>
    </main>
  );
}
