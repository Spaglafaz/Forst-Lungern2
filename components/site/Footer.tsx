import { FOOTER_NAV, CONTACT } from '@/lib/data';
import { TLink } from '../motion/TLink';
import { asset } from '@/lib/base';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner" data-reveal="fade">
        <nav className="footer__nav" aria-label="Fussnavigation">
          {FOOTER_NAV.map((n) => (
            <TLink key={n.href} href={n.href} className="footer__link">
              {n.label}
            </TLink>
          ))}
        </nav>
        <TLink href="/" className="footer__logo" aria-label="Forst Lungern AG – Startseite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset('/assets/logo.png')} alt="Forst Lungern AG" width={58} height={58} />
        </TLink>
        <div className="footer__meta">
          <div>{CONTACT.address}</div>
          <div>© {new Date().getFullYear()} Forst Lungern AG · UID CHE-439.610.341</div>
        </div>
      </div>
    </footer>
  );
}
