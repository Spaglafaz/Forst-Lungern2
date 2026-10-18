import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { OrderForm } from '@/components/site/OrderForm';
import { Button } from '@/components/ds/Button';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { CONTACT, DELIVERY, HEROES, PRICE_LIST_LABEL, PRICE_LIST_PDF, PRICE_LIST_VALID, chf } from '@/lib/data';

export const metadata: Metadata = { title: 'Holzprodukte', description: HEROES.produkte.text };

const STEPS = [
  { n: '01', title: 'Produkte wählen', text: 'Menge eingeben, Länge wählen – der Preis rechnet sich selbst.' },
  { n: '02', title: 'Lieferung oder Abholung', text: 'Wir liefern in Lungern oder Sie holen im Forstwerkhof ab.' },
  { n: '03', title: 'Bestellung senden', text: 'Armin Imfeld bestätigt Menge, Preis und Termin persönlich.' },
];

export default function HolzproduktePage() {
  const h = HEROES.produkte;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />

      <section className="section" id="bestellen">
        <div className="container">
          <div data-reveal="" className="split split--end">
            <SectionHeading title="Sortiment & Bestellung" subtitle={'Preise ' + PRICE_LIST_VALID + ', exkl. MWST'} />
            <div>
              <ol className="order-steps">
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <span className="order-steps__num">{s.n}</span>
                    <span>
                      <strong>{s.title}</strong>
                      {s.text}
                    </span>
                  </li>
                ))}
              </ol>
              <div style={{ marginTop: 22 }}>
                <Button size="sm" variant="outline" icon="download" href={PRICE_LIST_PDF} download="Preisliste-Forst-Lungern-2026.pdf">
                  {PRICE_LIST_LABEL}
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 56 }}>
            <OrderForm />
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(40px,6vw,72px)' }}
        >
          <div data-reveal="">
            <SectionHeading title="Abholung" subtitle="Forstwerkhof Nussberg, Lungern" />
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
            <SectionHeading title="Lieferung" subtitle={'In der ' + DELIVERY.area} />
            <p style={{ margin: '22px 0 0', maxWidth: '62ch' }}>
              Brennholz liefern wir für {chf(DELIVERY.perSter)} pro Ster, ab {DELIVERY.reducedFrom} Ster für {chf(DELIVERY.perSterReduced)} pro Ster. Lieferungen in
              die Region und für übrige Produkte auf Anfrage.
            </p>
          </div>
          <div data-reveal="">
            <SectionHeading title="WhatsApp" subtitle="Schnell nachfragen" />
            <p style={{ margin: '22px 0 0', maxWidth: '62ch' }}>Schreiben Sie uns, was Sie brauchen. Antwort in der Regel innert 1 Arbeitstag.</p>
            <div style={{ marginTop: 24 }}>
              <Button size="sm" variant="whatsapp" icon="message-circle" href={CONTACT.whatsappProdukte}>
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
