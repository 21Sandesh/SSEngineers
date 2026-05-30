export default function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
