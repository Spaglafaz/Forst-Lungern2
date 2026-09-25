import Image from 'next/image';

export function PolaroidStack({ images }: { images: { src: string; alt?: string }[] }) {
  const [a, b] = images;
  return (
    <div className="polaroids">
      {a && (
        <div className="polaroids__item polaroids__item--a">
          <Image src={a.src} alt={a.alt ?? ''} fill sizes="320px" />
        </div>
      )}
      {b && (
        <div className="polaroids__item polaroids__item--b">
          <Image src={b.src} alt={b.alt ?? ''} fill sizes="360px" />
        </div>
      )}
    </div>
  );
}
