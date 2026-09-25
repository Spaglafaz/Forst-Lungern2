import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { ArrowRule } from '@/components/ds/ArrowRule';
import { Icon } from '@/components/ds/Icon';
import { Tag } from '@/components/ds/Tag';
import { PhotoCard } from '@/components/ds/PhotoCard';
import { ZoomImage } from '@/components/ds/ZoomImage';
import { TLink } from '@/components/motion/TLink';
import { CONTACT, PH, SERVICES, kontaktHref } from '@/lib/data';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  return svc ? { title: svc.title, description: svc.short } : {};
}

export default async function LeistungPage({ params }: Params) {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) notFound();
  const others = SERVICES.filter((s) => s.slug !== svc.slug);

  return (
    <main>
      <PageHero image={PH + svc.images[0]} pos={svc.heroPos} eyebrow="Leistungen" title={svc.title} text={svc.short} />

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container split split--start">
          <div data-reveal="">
            <TLink href="/leistungen" className="back-link">
              <span className="back-link__arrow">←</span> Alle Leistungen
            </TLink>
            <h2 data-split="" style={{ margin: '22px 0 0', font: 'var(--type-h2)', textTransform: 'uppercase', color: 'var(--text-strong)', textWrap: 'balance' }}>
              {svc.title}
            </h2>
            <ArrowRule animate width={120} style={{ marginTop: 18 }} />
            <p style={{ margin: '26px 0 0', maxWidth: '62ch', fontSize: 19 }}>{svc.intro}</p>
            <ul data-checklist="" style={{ listStyle: 'none', margin: '30px 0 0', padding: 0, display: 'grid', gap: 12 }}>
              {svc.bullets.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', font: '400 18px/1.45 var(--font-serif)', color: 'var(--text-strong)' }}>
                  <Icon name="check" size={20} color="var(--pine-600)" style={{ marginTop: 3 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minWidth: 0 }}>
            <ZoomImage src={PH + svc.images[0]} alt="" aspect="16 / 10" style={{ gridColumn: 'span 2' }} />
            <ZoomImage src={PH + svc.images[1]} alt="" aspect="1" from="left" sizes="280px" />
            <ZoomImage src={PH + svc.images[2]} alt="" aspect="1" from="right" sizes="280px" />
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,7vw,88px) 0 clamp(64px,9vw,112px)' }}>
        <div className="container">
          <div
            data-reveal="scale"
            style={{
              background: 'var(--surface-dark)',
              color: '#fff',
              padding: 'clamp(28px,4vw,48px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow" style={{ color: 'var(--pine-300)' }}>
                Für wen?
              </div>
              <div data-checklist="" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                {svc.forWhom.map((w) => (
                  <Tag key={w}>{w}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ margin: 0, font: 'var(--type-h3)', textTransform: 'uppercase', color: '#fff' }}>Anliegen besprechen</h3>
              <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,.85)' }}>Wir schauen uns die Situation vor Ort an und machen Ihnen eine Offerte.</p>
              <div className="btn-row" style={{ gap: 12, marginTop: 22 }}>
                <Button icon="phone" href={CONTACT.tel}>
                  Anrufen
                </Button>
                <Button variant="onDark" arrow href={kontaktHref(svc.anliegen, 'Anfrage zu: ' + svc.title + '\n')}>
                  Offerte anfragen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand" style={{ padding: 'clamp(56px,7vw,88px) 0' }}>
        <div className="container">
          <div className="eyebrow" data-reveal="fade">
            Weitere Leistungen
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 20, marginTop: 24 }}>
            {others.map((s) => (
              <div key={s.slug} data-reveal="" style={{ minWidth: 0 }}>
                <PhotoCard image={PH + s.images[0]} title={s.title} layout="overlay" aspect="4 / 5" href={'/leistungen/' + s.slug} sizes="240px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
