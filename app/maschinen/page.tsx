import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { ImageSlot } from '@/components/ds/ImageSlot';
import { HEROES, MACHINES, PH } from '@/lib/data';

export const metadata: Metadata = { title: 'Maschinenpark', description: HEROES.maschinen.text };

export default function MaschinenPage() {
  const h = HEROES.maschinen;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />
      <section className="section">
        <div className="container">
          <div data-reveal="" className="split split--end">
            <SectionHeading title="Fahrzeuge und Geräte" subtitle="Alles auf die Forst Lungern AG übergegangen" />
            <p style={{ margin: 0, maxWidth: '62ch' }}>
              Vom Seilkran für den Steilhang bis zum Bagger für den Wegbau: Unsere Maschinen sind auf das Gelände rund um Lungern abgestimmt und werden
              von eigenen Maschinisten gefahren.
            </p>
          </div>
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))' }}>
            {MACHINES.map((m) => (
              <article key={m.id} data-reveal="" className="card">
                <div className="card__media">
                  {m.image ? (
                    <Image src={PH + m.image} alt={m.name} fill sizes="(max-width: 700px) 100vw, 380px" style={{ objectPosition: m.pos ?? 'center' }} />
                  ) : (
                    <ImageSlot label={m.placeholder ?? 'Foto ' + m.name} />
                  )}
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div className="card__kind">{m.kind}</div>
                  <h3 className="card__title">{m.name}</h3>
                  <p className="card__text">{m.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
