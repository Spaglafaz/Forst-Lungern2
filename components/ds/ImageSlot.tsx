import { Icon } from './Icon';

/** Platzhalter für Fotos, die noch geliefert werden (wie die «image-slots» im Entwurf). */
export function ImageSlot({ label }: { label: string }) {
  return (
    <div className="image-slot" role="img" aria-label={label}>
      <Icon name="image" size={30} />
      <span style={{ maxWidth: 220 }}>{label}</span>
    </div>
  );
}
