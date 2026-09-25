/** Linie mit Punkt und Pfeilspitze – das Leitmotiv aus dem Designsystem. */
export function ArrowRule({
  width = 120,
  color = 'var(--accent-line)',
  thickness = 2,
  dot = true,
  animate = false,
  className,
  style,
}: {
  width?: number | string | null;
  color?: string;
  thickness?: number;
  dot?: boolean;
  /** Beim Einblenden per GSAP «zeichnen» */
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      data-rule={animate ? '' : undefined}
      className={'arrow-rule' + (className ? ' ' + className : '')}
      style={{ ...(width != null && { width }), color, ...style }}
    >
      {dot && <span className="arrow-rule__dot" style={{ width: thickness * 4, height: thickness * 4 }} />}
      <span className="arrow-rule__line" style={{ height: thickness }} />
      <span
        className="arrow-rule__head"
        style={{
          borderLeft: thickness * 4.5 + 'px solid currentColor',
          borderTop: thickness * 2.5 + 'px solid transparent',
          borderBottom: thickness * 2.5 + 'px solid transparent',
        }}
      />
    </span>
  );
}
