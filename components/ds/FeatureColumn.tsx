import { IconBadge } from './IconBadge';
import { SectionHeading } from './SectionHeading';

export function FeatureColumn({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <span data-badge-pop="">
        <IconBadge icon={icon} />
      </span>
      <SectionHeading title={title} subtitle={subtitle} as="h3" />
      <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-body)' }}>{children}</p>
    </div>
  );
}
