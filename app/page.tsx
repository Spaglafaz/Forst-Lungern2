import Image from 'next/image';
import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { PolaroidStack } from '@/components/ds/PolaroidStack';
import { PhotoCard } from '@/components/ds/PhotoCard';
import { ZoomImage } from '@/components/ds/ZoomImage';
import { IconBadge } from '@/components/ds/IconBadge';
import { CONTACT, PH, SERVICES } from '@/lib/data';
import { asset } from '@/lib/base';

export default function HomePage() {
  return (
    <main>
      <PageHero
        home
        image={PH + 'wald-sonnenstrahlen.jpg'}
        alt="Sonnenstrahlen im Lungerer Wald"
        pos="center 42%"
        eyebrow="Forst Lungern AG · Lungern OW"
        title="Für einen sicheren und gesunden Wald in Lungern"
        text="Holzerei, Schutzwaldpflege, Verbauungen, Steinschlagnetze und Winterdienst – aus einer Hand, vom Werkhof Hackern in Lungern."
      >
        <Button size="lg" icon="phone" href={CONTACT.tel}>
          Anrufen
        </Button>
        <Button size="lg" variant="onDark" icon="message-circle" href={CONTACT.whatsapp}>
          WhatsApp
        </Button>
      </PageHero>

      {/* Kurzvorstellung */}
      <section className="section">
        <div className="container split">
          <div data-reveal="left" style={{ display: 'flex', justifyContent: 'center', minWidth: 0, padding: '12px 0' }}>
            <PolaroidStack
              images={[
                { src: PH + 'team-werkhof.jpg', alt: 'Team im Werkhof' },
                { src: PH + 'seilkran-tal-panorama.jpg', alt: 'Seilkran über dem Tal' },
              ]}
            />
          </div>
          <div data-reveal="">
            <SectionHeading title="Die neue Forst Lungern AG" subtitle="Seit 1. März 2026 gemeinsam unterwegs" />
            <p className="body-copy">
              Die Teilsamen Lungern-Dorf und Lungern-Obsee führen ihre Forstbetriebe seit dem 1. März 2026 gemeinsam als Forst Lungern AG. Für unsere
              Kunden bleibt alles vertraut: das Team, der Werkhof Hackern und die Ansprechperson.
            </p>
            <p className="body-copy">
              Wir pflegen den Schutzwald, holzen sicher entlang von Strassen und in Gärten, bauen Verbauungen und Waldstrassen und räumen im Winter
              Schnee.
            </p>
            <div style={{ marginTop: 34 }}>
              <Button arrow href="/ueber-uns">
                Unser Betrieb
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="stats">
        <div className="container stats__grid">
          <div className="stat" data-reveal="">
            <span className="stat__line" />
            <div className="stat__value">
              <span data-count="61" data-suffix=" %">
                61 %
              </span>
            </div>
            <div className="stat__label">Schutzwaldanteil</div>
          </div>
          <div className="stat" data-reveal="">
            <span className="stat__line" />
            <div className="stat__value">
              <span className="stat__pre">rund</span>
              <span data-count="10">10</span>
            </div>
            <div className="stat__label">Mitarbeitende</div>
          </div>
          <div className="stat" data-reveal="">
            <span className="stat__line" />
            <div className="stat__value">
              <span className="stat__pre">seit</span>
              <span data-count="1996">1996</span>
            </div>
            <div className="stat__label">Gemeinsamer Werkhof</div>
          </div>
          <div className="stat" data-reveal="">
            <span className="stat__line" />
            <div className="stat__value">EFZ</div>
            <div className="stat__label">Anerkannter Lehrbetrieb</div>
          </div>
        </div>
      </section>

      {/* Leistungs-Kacheln */}
      <section className="section section--sand">
        <div className="container">
          <div data-reveal="" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
            <SectionHeading title="Unsere Leistungen" subtitle="Vom Schutzwald bis zum Winterdienst" />
            <Button variant="secondary" arrow href="/leistungen">
              Alle Leistungen
            </Button>
          </div>
          <div className="grid-cards">
            {SERVICES.map((s) => (
              <div key={s.slug} data-reveal="" style={{ minWidth: 0 }}>
                <PhotoCard image={PH + s.images[0]} title={s.title} meta={s.meta} href={'/leistungen/' + s.slug}>
                  {s.short}
                </PhotoCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holzprodukte-Teaser */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <div className="container split">
          <div data-reveal="">
            <SectionHeading title="Holz aus dem Lungerer Wald" subtitle="Brennholz, Schnitzel und mehr – direkt vom Werkhof" />
            <p className="body-copy">
              Ofenfertiges Brennholz aus Buche und Nadelholz, Anfeuerholz, Hackschnitzel für Heizungen, Rindenmulch und Lärchenpfosten für den Zaun.
              Abholung im Forstwerkhof Hackern nach telefonischer Vereinbarung oder Lieferung in der Gemeinde Lungern.
            </p>
            <div className="btn-row" style={{ marginTop: 34 }}>
              <Button arrow href="/holzprodukte">
                Sortiment ansehen
              </Button>
            </div>
          </div>
          <div style={{ position: 'relative', minWidth: 0 }}>
            <ZoomImage src={PH + 'rundholz-polter.jpg'} alt="Rundholzpolter" from="right" />
            <div
              data-pop="2.5"
              className="polaroid-frame"
              style={{ position: 'absolute', right: -8, bottom: -28, width: '44%', aspectRatio: '1', transform: 'rotate(2.5deg)', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image src={PH + 'stihl-stammquerschnitt.jpg'} alt="Stammquerschnitt" fill sizes="260px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mist band CTA */}
      <section className="mist">
        <div className="mist__media" data-parallax="0.08">
          <Image src={PH + 'holzerei-team-nebel.jpg'} alt="" fill sizes="100vw" style={{ objectPosition: 'center 30%' }} />
        </div>
        <div className="mist__fade" />
        <div className="mist__fog" />
        <div className="mist__content">
          <div style={{ marginTop: 'auto', paddingTop: 180 }}>
            <h2 data-split="" style={{ margin: 0, font: 'var(--type-h2)', textTransform: 'uppercase', color: '#fff', textWrap: 'balance' }}>
              Ein Anruf genügt
            </h2>
            <p data-reveal="" style={{ margin: '14px auto 0', maxWidth: 560, font: '400 19px/1.55 var(--font-serif)', color: 'rgba(255,255,255,.9)' }}>
              Ob Baum im Garten, Verbauung oder Brennholz: Rufen Sie an oder schreiben Sie uns per WhatsApp. Antwort in der Regel innert 1 Arbeitstag –
              für Notfälle bitte anrufen.
            </p>
            <div data-reveal="" className="btn-row" style={{ justifyContent: 'center', marginTop: 28 }}>
              <Button icon="phone" href={CONTACT.tel}>
                {CONTACT.telLabel}
              </Button>
              <Button variant="onDark" icon="message-circle" href={CONTACT.whatsapp}>
                WhatsApp
              </Button>
              <Button variant="onDark" arrow href="/kontakt">
                Formular
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ansprechperson */}
      <section className="section">
        <div className="container split" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))' }}>
          <div data-reveal="scale" style={{ maxWidth: 420, width: '100%', justifySelf: 'center' }}>
            <div className="polaroid-frame" style={{ position: 'relative', aspectRatio: '4/5', transform: 'rotate(-3deg)', overflow: 'hidden' }}>
              <Image src={asset('/assets/portraits/portrait-armin-home.webp')} alt="Armin Imfeld" fill sizes="420px" style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div data-reveal="">
            <SectionHeading eyebrow="Ihre Ansprechperson" title="Armin Imfeld" subtitle="Förster HF, Geschäftsführer und Betriebsleiter" />
            <p className="body-copy">
              Armin Imfeld leitet die Forstbetriebe seit dem 1. Oktober 2025 und führt die Forst Lungern AG seit ihrer Gründung. Er ist im Forst oft
              besser per Telefon als per E-Mail erreichbar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
              <a href={CONTACT.tel} className="contact-line">
                <IconBadge icon="phone" size={40} />
                <span className="contact-line__text">{CONTACT.telLabel}</span>
              </a>
              <a href={CONTACT.whatsapp} className="contact-line" target="_blank" rel="noopener noreferrer">
                <IconBadge icon="message-circle" size={40} />
                <span className="contact-line__text">WhatsApp</span>
              </a>
              <a href={CONTACT.mail} className="contact-line">
                <IconBadge icon="mail" size={40} />
                <span className="contact-line__text">{CONTACT.mailLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Grundsätze */}
      <section style={{ background: 'var(--surface-soft)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '40px 0' }}>
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px 40px', flexWrap: 'wrap', textAlign: 'center' }}
        >
          <span className="eyebrow" data-reveal="fade">
            Unsere Grundsätze
          </span>
          <span data-words="" style={{ font: '700 19px/1.3 var(--font-serif)', color: 'var(--text-strong)' }}>
            Naturnaher Waldbau · Bewirtschaftung nach den Grundsätzen von FSC und NaiS · Anerkannter Lehrbetrieb
          </span>
        </div>
      </section>
    </main>
  );
}
