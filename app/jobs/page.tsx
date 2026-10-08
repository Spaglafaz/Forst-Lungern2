import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { SectionHeading } from '@/components/ds/SectionHeading';
import { PolaroidStack } from '@/components/ds/PolaroidStack';
import { ZoomImage } from '@/components/ds/ZoomImage';
import { JobPosting } from '@/components/site/JobPosting';
import { CONTACT, HEROES, JOBS, LEHRE, PH } from '@/lib/data';

export const metadata: Metadata = { title: 'Jobs & Lehrstellen', description: HEROES.jobs.text };

export default function JobsPage() {
  const h = HEROES.jobs;
  return (
    <main>
      <PageHero image={h.image} pos={h.pos} eyebrow={h.eyebrow} title={h.title} text={h.text} />

      <section className="section">
        <div className="container split">
          <div data-reveal="">
            {JOBS.length > 0 ? (
              <>
                <SectionHeading title="Offene Stellen" subtitle="Wir suchen Verstärkung für unser Team" />
                <p className="body-copy">
                  {JOBS.length === 1 ? 'Aktuell ist eine Stelle offen: ' : 'Aktuell sind folgende Stellen offen: '}
                  {JOBS.map((j) => j.title + ' ' + j.pensum).join(', ')}. Initiativbewerbungen für andere Funktionen sind ebenfalls willkommen.
                </p>
                <div className="btn-row" style={{ marginTop: 34, gap: 12 }}>
                  <Button arrow href="/jobs#stelle">
                    Zum Inserat
                  </Button>
                  <Button variant="outline" icon="phone" href={CONTACT.call}>
                    Anrufen
                  </Button>
                </div>
              </>
            ) : (
              <>
                <SectionHeading title="Offene Stellen" subtitle="Initiativbewerbungen willkommen" />
                <p className="body-copy">
                  Zurzeit sind keine Stellen ausgeschrieben. Forstwarte und Maschinisten, die gerne im steilen Gelände arbeiten, dürfen sich jederzeit melden –
                  wir freuen uns über Ihre Bewerbung.
                </p>
                <div className="btn-row" style={{ marginTop: 34, gap: 12 }}>
                  <Button icon="mail" href={CONTACT.mail + '?subject=Initiativbewerbung'}>
                    Bewerbung senden
                  </Button>
                  <Button variant="outline" icon="phone" href={CONTACT.call}>
                    Anrufen
                  </Button>
                </div>
              </>
            )}
          </div>
          <div data-reveal="right" style={{ display: 'flex', justifyContent: 'center', minWidth: 0, padding: '12px 0' }}>
            <PolaroidStack
              images={[
                { src: PH + 'seilkran-winter.jpg', alt: 'Seilkran im Winter' },
                { src: PH + 'holzerei-team-nebel.jpg', alt: 'Holzerei-Team im Nebel' },
              ]}
            />
          </div>
        </div>
      </section>

      {JOBS.map((job) => (
        <JobPosting key={job.id} job={job} />
      ))}

      <section className="section section--sand">
        <div className="container">
          <div data-reveal="">
            <SectionHeading title="Lehre Forstwart/in EFZ" subtitle="Drei Jahre im Wald, im Werkhof und in der Berufsfachschule" />
          </div>
          <p data-reveal="" style={{ margin: '26px 0 0', maxWidth: '62ch' }}>
            Als anerkannter Lehrbetrieb bilden wir Forstwartinnen und Forstwarte EFZ aus. Die Lehre dauert drei Jahre und verbindet die Arbeit im Betrieb mit
            dem Unterricht an der Berufsfachschule und überbetrieblichen Kursen.
          </p>
          <ol
            style={{
              listStyle: 'none',
              margin: '48px 0 0',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
              gap: 28,
            }}
          >
            {LEHRE.map((st) => (
              <li key={st.n} data-reveal="" className="card" style={{ padding: '28px 26px 30px' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div data-step-num="" style={{ font: '600 40px/1 var(--font-display)', color: 'var(--pine-600)' }}>
                    {st.n}
                  </div>
                </div>
                <h3 style={{ margin: '14px 0 0', font: '500 22px/1.15 var(--font-display)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>
                  {st.title}
                </h3>
                <p style={{ margin: '10px 0 0', font: '400 16px/1.5 var(--font-serif)' }}>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <ZoomImage src={PH + 'wegunterhalt-team.jpg'} alt="Team beim Wegunterhalt" from="left" />
          <div data-reveal="">
            <SectionHeading title="Schnupperlehre" subtitle="Zwei bis drei Tage mit dem Team unterwegs" />
            <p className="body-copy">
              Du möchtest wissen, ob der Beruf zu dir passt? Melde dich für eine Schnupperlehre. Du arbeitest zwei bis drei Tage mit dem Team im Wald und
              lernst Maschinen, Werkzeuge und Alltag kennen.
            </p>
            <div style={{ marginTop: 28, padding: '22px 24px', background: 'var(--surface-soft)', border: '1px solid var(--border-subtle)' }}>
              <div className="eyebrow">Kontaktperson</div>
              <div style={{ marginTop: 10, font: '500 20px/1.2 var(--font-display)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>
                Armin Imfeld
              </div>
              <div style={{ marginTop: 6 }}>
                Förster und Betriebsleiter · <a href={CONTACT.tel}>{CONTACT.telLabel}</a> · <a href={CONTACT.mail}>{CONTACT.mailLabel}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
