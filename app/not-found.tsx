import { PageHero } from '@/components/site/PageHero';
import { Button } from '@/components/ds/Button';
import { PH } from '@/lib/data';

export default function NotFound() {
  return (
    <main>
      <PageHero image={PH + 'waldstrasse-winter-polter.jpg'} pos="center 55%" eyebrow="Fehler 404" title="Hier geht es nicht weiter" text="Diese Seite gibt es nicht (mehr).">
        <Button arrow href="/">
          Zur Startseite
        </Button>
      </PageHero>
    </main>
  );
}
