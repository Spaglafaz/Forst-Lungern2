import { Button } from '@/components/ds/Button';
import { BeetleGalleries } from '@/components/site/BeetleGalleries';
import { TLink } from '@/components/motion/TLink';
import { NAV } from '@/lib/data';

export default function NotFound() {
  return (
    <main className="nf">
      <div className="container split">
        <div>
          <p className="nf__eyebrow">Fehler 404 · Schadholz</p>
          <h1 className="nf__title">Hier hat der Borkenkäfer zugeschlagen</h1>
          <p className="nf__text">
            Diese Seite ist angefressen und nicht mehr zu retten. Wir haben sie vorsorglich gefällt und abtransportiert,
            damit sich der Käfer nicht weiter ausbreitet.
          </p>
          <div className="nf__actions">
            <Button arrow href="/">
              Zurück in den Wald
            </Button>
            <Button variant="onDark" href="/kontakt">
              Kontakt
            </Button>
          </div>
          <nav className="nf__healthy" aria-label="Weitere Seiten">
            <p>Diese Bäume sind kerngesund:</p>
            <ul>
              {NAV.filter((n) => n.href !== '/' && n.href !== '/kontakt').map((n) => (
                <li key={n.href}>
                  <TLink href={n.href}>{n.label}</TLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <figure className="nf__polaroid polaroid-frame">
          <div className="nf__wood">
            <BeetleGalleries />
          </div>
          <figcaption>
            <strong>Tatort: Abteilung 404</strong>
            Der Buchdrucker heisst so, weil seine Frassgänge unter der Rinde wie Schriftzeichen aussehen. Diese hier sind gut
            lesbar.
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
