import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { PolaroidStack } from '@/components/ds/PolaroidStack';
import { ZoomImage } from '@/components/ds/ZoomImage';
import { FeatureColumn } from '@/components/ds/FeatureColumn';
import { CONTACT, HEROES, MILESTONES, PH } from '@/lib/data';
import { asset } from '@/lib/base';

export const metadata: Metadata = { title: 'Über uns', description: HEROES.ueber.text };

export default function UeberUnsPage() {
  const h = HEROES.ueber;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />

      <section className="section">
        <div className="container split">
          <div data-reveal="">
            <SectionHeading title="Die neue Forst Lungern AG" subtitle="Zwei Teilsamen, ein Forstbetrieb" />
            <p className="body-copy">
              Seit dem 1. März 2026 führen die Teilsamen Lungern-Dorf und Lungern-Obsee ihre Forstbetriebe gemeinsam als Aktiengesellschaft. Beide
              Teilsamen halten je 50 % der Forst Lungern AG.
            </p>
            <p className="body-copy">
              Für Kunden bleiben Team, Werkhof Hackern und Ansprechperson gleich. Neu ist die Form: ein Betrieb mit einer Adresse, einer Rechnung und
              einer Nummer.
            </p>
            <dl className="dl-grid">
              <dt>Sitz</dt>
              <dd>Lungern OW</dd>
              <dt>Adresse</dt>
              <dd>Sattelwaldweg 4, 6078 Lungern</dd>
              <dt>Werkhof</dt>
              <dd>Forstwerkhof Hackern (Nussberg), Lungern</dd>
              <dt>Aktionäre</dt>
              <dd>Teilsame Lungern-Dorf 50 % · Teilsame Lungern-Obsee 50 %</dd>
            </dl>
          </div>
          <div data-reveal="right" style={{ display: 'flex', justifyContent: 'center', minWidth: 0, padding: '12px 0' }}>
            <PolaroidStack
              images={[
                { src: PH + 'forwarder-holzlager.jpg', alt: 'Forstschlepper im Holzlager' },
                { src: PH + 'team-werkhof.jpg', alt: 'Team im Werkhof' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Geschichte */}
      <section className="section section--sand">
        <div className="container">
          <div data-reveal="">
            <SectionHeading title="Geschichte" subtitle="Dreissig Jahre Zusammenarbeit, ein neuer Betrieb" />
          </div>
          <ol className="timeline" data-timeline="">
            <li className="timeline__progress" aria-hidden role="presentation">
              <span className="timeline__progress-fill" />
            </li>
            {MILESTONES.map((m) => (
              <li key={m.date} className="timeline__item">
                <span className="timeline__rule" aria-hidden />
                <div className="timeline__date">{m.date}</div>
                <div className="timeline__text">{m.text}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div data-reveal="" className="split split--end">
            <SectionHeading title="Unser Team" subtitle="14 Forstwarte, Maschinisten und Lernende" />
            <p style={{ margin: 0, maxWidth: '62ch' }}>
              Wir kennen die Hänge rund um Lungern seit Jahrzehnten. Im Team arbeiten erfahrene Forstwarte, Maschinisten und Lernende – vom Seilkran bis
              zur Motorsäge alles aus eigener Hand.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 56, maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto' }}>
          <ZoomImage
            src={PH + 'team-werkhof.jpg'}
            alt="Das Team der Forst Lungern AG im Werkhof"
            aspect="21 / 9"
            pos="center 55%"
            sizes="100vw"
            shadow={false}
            style={{ background: 'var(--forest-900)' }}
          />
        </div>
        <div className="container">
          <div
            data-reveal=""
            style={{
              marginTop: -64,
              position: 'relative',
              background: 'var(--surface-card)',
              boxShadow: 'var(--shadow-card)',
              padding: 'clamp(24px,4vw,40px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div className="polaroid-frame" data-pop="-3" style={{ position: 'relative', width: 180, aspectRatio: '1', transform: 'rotate(-3deg)', overflow: 'hidden' }}>
              <Image src={asset('/assets/portraits/portrait-armin-about.webp')} alt="Armin Imfeld" fill sizes="180px" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
              <div className="eyebrow">Förster und Betriebsleiter</div>
              <h3 style={{ margin: '10px 0 0', font: 'var(--type-h3)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>Armin Imfeld</h3>
              <p style={{ margin: '12px 0 0', maxWidth: '62ch' }}>
                Förster HF. Seit 1. Oktober 2025 Leiter der Forstbetriebe, seit der Gründung Geschäftsführer der Forst Lungern AG. Er plant die Einsätze,
                berät Teilsamen, Gemeinde und Private und ist Ihre erste Ansprechperson.
              </p>
              <div className="btn-row" style={{ gap: 12, marginTop: 20 }}>
                <Button size="sm" icon="phone" href={CONTACT.tel}>
                  {CONTACT.telLabel}
                </Button>
                <Button size="sm" variant="outline" icon="mail" href={CONTACT.mail}>
                  E-Mail
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ausbildung */}
      <section className="section">
        <div className="container split">
          <ZoomImage src={PH + 'motorsaege-gegenlicht.jpg'} alt="Motorsäge im Gegenlicht" from="left" />
          <div data-reveal="">
            <SectionHeading title="Ausbildung" subtitle="Anerkannter Lehrbetrieb für Forstwart/in EFZ" />
            <p className="body-copy">
              Die Ausbildung junger Berufsleute ist uns ein zentrales Anliegen. Lernende arbeiten vom ersten Tag an im Team mit – im Schutzwald, am
              Seilkran und beim Wegbau.
            </p>
            <div style={{ marginTop: 34 }}>
              <Button arrow href="/jobs">
                Jobs & Lehrstellen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Werte & Zertifikate */}
      <section className="section section--sand">
        <div className="container">
          <div data-reveal="">
            <SectionHeading title="Werte & Zertifikate" subtitle="Wie wir mit dem Wald umgehen" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 48, marginTop: 56 }}>
            <div data-reveal="">
              <FeatureColumn icon="trees" title="Naturnaher Waldbau" subtitle="Standortgerecht und stufig">
                Wir arbeiten mit der natürlichen Verjüngung, fördern Mischbestände und greifen so ein, dass der Wald stabil bleibt.
              </FeatureColumn>
            </div>
            <div data-reveal="">
              <FeatureColumn icon="leaf" title="Nachhaltigkeit" subtitle="Für die nächsten Generationen">
                Es wird nicht mehr Holz genutzt, als nachwächst. Lebensräume wie Weiher und Waldränder werten wir gezielt auf.
              </FeatureColumn>
            </div>
            <div data-reveal="">
              <FeatureColumn icon="shield-check" title="FSC und NaiS" subtitle="Bewirtschaftung nach anerkannten Grundsätzen">
                Wir bewirtschaften den Wald nach den Grundsätzen von FSC und nach NaiS (Nachhaltigkeit und Erfolgskontrolle im Schutzwald, BAFU).
              </FeatureColumn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
