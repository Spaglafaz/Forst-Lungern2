import { Icon } from './Icon';

const SHAPES = {
  shield: 'polygon(50% 0,100% 12%,100% 58%,50% 100%,0 58%,0 12%)',
  hex: 'polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)',
  square: 'inset(0 round 3px)',
};

export function IconBadge({
  icon = 'trees',
  shape = 'shield',
  size = 48,
  className,
}: {
  icon?: string;
  shape?: keyof typeof SHAPES;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={'icon-badge' + (className ? ' ' + className : '')}
      style={{ width: size, height: size * (shape === 'shield' ? 1.08 : 1), clipPath: SHAPES[shape] }}
    >
      <Icon name={icon} size={Math.round(size * 0.46)} style={{ marginTop: shape === 'shield' ? -size * 0.06 : 0 }} />
    </span>
  );
}
