import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { Icon } from '@/components/ds/Icon';
import { ZoomImage } from '@/components/ds/ZoomImage';
import { ContactForm } from '@/components/site/ContactForm';
import { CONTACT, HEROES, PH } from '@/lib/data';
import { asset } from '@/lib/base';

export const metadata: Metadata = { title: 'Kontakt', description: HEROES.kontakt.text };

export default function KontaktPage() {
  const h = HEROES.kontakt;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />

      <section className="section">
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(40px,6vw,72px)' }}
        >
          <div id="ansprechperson" data-reveal="" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="polaroid-frame" data-pop="-3" style={{ position: 'relative', width: 150, aspectRatio: '4/5', transform: 'rotate(-3deg)', flex: 'none', overflow: 'hidden' }}>
              <Image src={asset('/assets/portraits/portrait-armin-kontakt.webp')} alt="Armin Imfeld" fill sizes="150px" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="eyebrow">Direktkontakt Förster</div>
              <h2 style={{ margin: '10px 0 0', font: 'var(--type-h3)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>Armin Imfeld</h2>
              <p style={{ margin: '6px 0 0', fontSize: 16 }}>Förster HF, Geschäftsführer und Betriebsleiter</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
                <a href={CONTACT.tel} className="contact-line" style={{ fontSize: 17, gap: 10 }}>
                  <Icon name="phone" size={18} color="var(--pine-600)" />
                  <span className="contact-line__text">{CONTACT.telLabel}</span>
                </a>
                <a href={CONTACT.personMail} className="contact-line" style={{ fontSize: 17, gap: 10 }}>
                  <Icon name="mail" size={18} color="var(--pine-600)" />
                  <span className="contact-line__text">{CONTACT.personMailLabel}</span>
                </a>
              </div>
              <div style={{ marginTop: 20 }}>
                <Button size="sm" variant="whatsapp" icon="message-circle" href={CONTACT.whatsapp}>
                  WhatsApp
                </Button>
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--text-muted)' }}>Antwort in der Regel innert 1 Arbeitstag – für Notfälle bitte anrufen.</p>
            </div>
          </div>

          <div data-reveal="">
            <div className="eyebrow">Allgemeiner Kontakt</div>
            <h2 style={{ margin: '10px 0 0', font: 'var(--type-h3)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>Forst Lungern AG</h2>
            <dl className="dl-grid dl-grid--muted" style={{ margin: '18px 0 0', gap: '10px 20px' }}>
              <dt>Post</dt>
              <dd>
                Sattelwaldweg 4
                <br />
                6078 Lungern
              </dd>
              <dt>Werkhof</dt>
              <dd>
                Forstwerkhof Hackern (Nussberg)
                <br />
                Lungern
              </dd>
              <dt>Zeiten</dt>
              <dd>Keine festen Öffnungszeiten. Abholung nach telefonischer Vereinbarung.</dd>
              <dt>E-Mail</dt>
              <dd>
                <a href={CONTACT.mail}>{CONTACT.mailLabel}</a>
              </dd>
            </dl>
          </div>

          <div data-reveal="">
            <div className="eyebrow">Karte</div>
            <a
              href={CONTACT.mapsSwisstopo}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ display: 'block', marginTop: 14, position: 'relative', aspectRatio: '4/3', background: 'var(--sand-200)', overflow: 'hidden' }}
            >
              <Image src={PH + 'karte-werkhof-hackern.png'} alt="Luftbild Forstwerkhof Hackern, Lungern" fill sizes="(max-width: 700px) 100vw, 400px" style={{ objectFit: 'cover' }} />
            </a>
            <div className="btn-row" style={{ gap: 10, marginTop: 14 }}>
              <Button size="sm" variant="outline" icon="map-pin" href={CONTACT.mapsGoogle}>
                Google Maps
              </Button>
              <Button size="sm" variant="outline" icon="map" href={CONTACT.mapsSwisstopo}>
                Swisstopo
              </Button>
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--text-muted)' }}>Die Karte öffnet extern – es wird nichts ohne Ihre Zustimmung geladen.</p>
          </div>
        </div>
      </section>

      {/* Formular */}
      <section className="section section--sand" id="formular">
        <div
          className="container split split--start"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))' }}
        >
          <div data-reveal="">
            <SectionHeading title="Kontaktformular" subtitle="Wir melden uns in der Regel innert 1 Arbeitstag" />
            <p style={{ margin: '26px 0 0', maxWidth: '52ch' }}>
              Ein Telefon für den Rückruf ist im Forst meist schneller als E-Mail. Bei Bäumen im Garten helfen Fotos sehr – bis zu drei Dateien. Den genauen Ort können Sie direkt auf der Karte markieren.
            </p>
            <p style={{ margin: '16px 0 0', maxWidth: '52ch', fontSize: 15, color: 'var(--text-muted)' }}>
              Ihre Anfrage geht direkt an Armin Imfeld. Wer WhatsApp nicht nutzen möchte, ist mit dem Formular gleich gut bedient.
            </p>
            <ZoomImage src={PH + 'seilkran-tal-panorama.jpg'} alt="Seilkran über dem Tal" pos="center 60%" style={{ marginTop: 40 }} />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
