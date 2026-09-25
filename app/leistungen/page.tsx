import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { PhotoCard } from '@/components/ds/PhotoCard';
import { HEROES, PH, SERVICES } from '@/lib/data';

export const metadata: Metadata = { title: 'Leistungen', description: HEROES.leistungen.text };

export default function LeistungenPage() {
  const h = HEROES.leistungen;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />
      <section className="section">
        <div className="container">
          <div data-reveal="" className="split split--end">
            <SectionHeading title="Sechs Bereiche, ein Team" subtitle="Für Teilsamen, Gemeinde, Kanton und Private" />
            <p style={{ margin: 0, maxWidth: '62ch' }}>
              Wir arbeiten dort, wo es steil, nass oder eng wird: im Schutzwald, an Bächen und Hängen, an der Brünig-Passstrasse und in Ihrem Garten.
              Wählen Sie den Bereich, der zu Ihrem Anliegen passt.
            </p>
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
    </main>
  );
}
