export function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-reveal="">
      <h2 data-split="" style={{ margin: 0, font: 'var(--type-h3)', textTransform: 'uppercase', color: 'var(--text-strong)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
