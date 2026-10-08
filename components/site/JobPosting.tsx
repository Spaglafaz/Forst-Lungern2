import type { Job } from '@/lib/data';
import { CONTACT } from '@/lib/data';
import { Button } from '../ds/Button';
import { ArrowRule } from '../ds/ArrowRule';
import { Icon } from '../ds/Icon';
import { Tag } from '../ds/Tag';

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div data-reveal="" style={{ minWidth: 0 }}>
      <h3 className="job__list-title">{title}</h3>
      <ul className="job__list" data-checklist="">
        {items.map((it) => (
          <li key={it}>
            <Icon name="check" size={18} color="var(--pine-300)" style={{ marginTop: 4 }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Stelleninserat (dunkler Block) inkl. strukturierter Daten für die Google-Jobsuche. */
export function JobPosting({ job }: { job: Job }) {
  const subject = encodeURIComponent('Bewerbung: ' + job.title + ' ' + job.pensum);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title + ' ' + job.pensum,
    description: [job.intro, 'Deine Aufgaben: ' + job.aufgaben.join('; '), 'Dein Profil: ' + job.profil.join('; '), 'Wir bieten: ' + job.angebot.join('; ')].join(' '),
    datePosted: job.datePosted,
    employmentType: ['FULL_TIME', 'PART_TIME'],
    hiringOrganization: { '@type': 'Organization', name: 'Forst Lungern AG', sameAs: 'https://www.forst-lungern.ch' },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', streetAddress: 'Sattelwaldweg 4', postalCode: '6078', addressLocality: 'Lungern', addressRegion: 'OW', addressCountry: 'CH' },
    },
  };

  return (
    <section className="job" id="stelle">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <div data-reveal="" className="job__head">
          <span className="job__eyebrow">
            <span className="job__pulse" aria-hidden />
            Offene Stelle
          </span>
          <h2 className="job__title" data-split="">
            {job.title} {job.pensum}
          </h2>
          <ArrowRule animate width={120} color="#fff" style={{ marginTop: 18 }} />
          <p className="job__intro">{job.intro}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
            <Tag>{job.pensum}</Tag>
            <Tag>{job.start}</Tag>
            <Tag>Lungern OW</Tag>
          </div>
        </div>

        <div className="job__grid">
          <List title="Deine Aufgaben" items={job.aufgaben} />
          <List title="Dein Profil" items={job.profil} />
          <List title="Wir bieten" items={job.angebot} />
        </div>

        <div data-reveal="scale" className="job__cta">
          <div>
            <p className="job__cta-title">Wir freuen uns auf deine Bewerbung oder deinen Anruf.</p>
            <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,.82)' }}>
              {job.kontakt.name}, {job.kontakt.rolle} · <a href={job.kontakt.tel}>Tel. {job.kontakt.telLabel}</a> ·{' '}
              <a href={'mailto:' + job.kontakt.mail}>{job.kontakt.mail}</a>
            </p>
          </div>
          <div className="btn-row" style={{ gap: 12 }}>
            <Button icon="mail" href={'mailto:' + job.kontakt.mail + '?subject=' + subject}>
              Jetzt bewerben
            </Button>
            <Button variant="onDark" icon="phone" href={CONTACT.call}>
              Anrufen
            </Button>
            <Button variant="onDark" icon="message-circle" href={CONTACT.whatsapp}>
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
