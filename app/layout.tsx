import type { Metadata, Viewport } from 'next';
import { Alegreya, Oswald } from 'next/font/google';
import { MotionShell } from '@/components/motion/MotionShell';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import './globals.css';
import { asset } from '@/lib/base';

// Schriften werden beim Build heruntergeladen und lokal ausgeliefert (keine Anfrage an Google).
const oswald = Oswald({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-oswald', display: 'swap' });
const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-alegreya',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.forst-lungern.ch'),
  title: { default: 'Forst Lungern AG – Für einen sicheren und gesunden Wald', template: '%s · Forst Lungern AG' },
  description:
    'Holzerei, Schutzwaldpflege, Verbauungen, Steinschlagnetze und Winterdienst – aus einer Hand, vom Werkhof Hackern in Lungern OW.',
  icons: { icon: asset('/assets/logo.png') },
};

export const viewport: Viewport = { themeColor: '#1A3325', width: 'device-width', initialScale: 1 };

// Aktiviert Bewegung vor dem ersten Zeichnen – ausser bei «Bewegung reduzieren».
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('has-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${oswald.variable} ${alegreya.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <MotionShell chrome={<Nav />}>
          {children}
          <Footer />
          <div className="mobile-bar-spacer" />
        </MotionShell>
      </body>
    </html>
  );
}
