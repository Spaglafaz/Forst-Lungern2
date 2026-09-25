import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { ImageSlot } from '@/components/ds/ImageSlot';
import { CONTACT, HEROES, PRODUCTS, SHOW_PRICES, kontaktHref } from '@/lib/data';

export const metadata: Metadata = { title: 'Holzprodukte', description: HEROES.produkte.text };

export default function HolzproduktePage() {
  const h = HEROES.produkte;
  const priceNote = SHOW_PRICES
    ? 'Richtpreise ab Werkhof, Änderungen vorbehalten. Alle Preise sind Platzhalter und noch nicht verbindlich.'
    : 'Preise auf Anfrage.';
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />

      <section className="section">
        <div className="container">
          <div data-reveal="" className="split split--end">
            <SectionHeading title="Unser Sortiment" subtitle="Anfragen statt bestellen – wir melden uns" />
            <div>
              <p style={{ margin: 0, maxWidth: '62ch' }}>
                Kein Onlineshop: Wählen Sie ein Produkt und fragen Sie an – per Formular oder WhatsApp. Abholung im Forstwerkhof Hackern nach telefonischer
                Vereinbarung.
              </p>
              <p style={{ margin: '12px 0 0', fontSize: 15, color: 'var(--text-muted)' }}>{priceNote}</p>
            </div>
          </div>
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))' }}>
            {PRODUCTS.map((p) => (
              <article key={p.id} data-reveal="" className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card__media">
                  <ImageSlot label={'Foto ' + p.name} />
                </div>
                <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <div className="card__kind">{p.einheit}</div>
                  <h3 className="card__title" style={{ marginTop: 0 }}>
                    {p.name}
                  </h3>
                  <p className="card__text" style={{ marginTop: 0 }}>
                    {p.ausfuehrung}
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <span className="price">{SHOW_PRICES ? p.price : 'Preis auf Anfrage'}</span>
                    <Button
                      size="sm"
                      arrow
                      href={kontaktHref(
                        'Holzprodukte',
                        'Anfrage: ' + p.name + ' (' + p.ausfuehrung + '), Einheit: ' + p.einheit + '. Gewünschte Menge: ',
                      )}
                    >
                      Anfragen
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(40px,6vw,72px)' }}
        >
          <div data-reveal="">
            <SectionHeading title="Abholung" subtitle="Forstwerkhof Hackern (Nussberg), Lungern" />
            <p style={{ margin: '22px 0 0', maxWidth: '62ch' }}>
              Keine festen Öffnungszeiten – Abholung nach telefonischer Vereinbarung. Rufen Sie kurz an, dann ist das Holz bereit, wenn Sie kommen.
            </p>
            <div style={{ marginTop: 24 }}>
              <Button size="sm" icon="phone" href={CONTACT.tel}>
                {CONTACT.telLabel}
              </Button>
            </div>
          </div>
          <div data-reveal="">
            <SectionHeading title="Lieferung" subtitle="In der Gemeinde Lungern" />
            <p style={{ margin: '22px 0 0', maxWidth: '62ch' }}>
              Wir liefern in der Gemeinde Lungern pauschal ab CHF 30.–. Lieferungen in die Region und Mindestmengen auf Anfrage.
            </p>
          </div>
          <div data-reveal="">
            <SectionHeading title="WhatsApp" subtitle="Schnell nachfragen" />
            <p style={{ margin: '22px 0 0', maxWidth: '62ch' }}>Schreiben Sie uns, was Sie brauchen. Antwort in der Regel innert 1 Arbeitstag.</p>
            <div style={{ marginTop: 24 }}>
              <Button size="sm" variant="secondary" icon="message-circle" href={CONTACT.whatsappProdukte}>
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
