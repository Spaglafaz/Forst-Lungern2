import { ArrowRule } from './ArrowRule';

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  tone = 'light',
  size = 'md',
  as: Tag = 'h2',
  style,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h2' | 'h3';
  style?: React.CSSProperties;
}) {
  const fs = { sm: 22, md: 28, lg: 38, xl: 52 }[size];
  return (
    <div
      className={'sh' + (align === 'center' ? ' sh--center' : '') + (tone === 'dark' ? ' sh--dark' : '')}
      style={style}
    >
      {eyebrow && <span className="sh__eyebrow">{eyebrow}</span>}
      <Tag className="sh__title" data-split="" style={{ fontSize: fs }}>
        {title}
      </Tag>
      {subtitle && <p className="sh__subtitle">{subtitle}</p>}
      <ArrowRule animate width={Math.max(90, fs * 3.4)} color={tone === 'dark' ? '#fff' : 'var(--accent-line)'} style={{ marginTop: 10 }} />
    </div>
  );
}
