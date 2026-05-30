export default function KpiTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg bg-surface p-5 shadow-card">
      <p className="mono-label">{label}</p>
      <p className="display-tight mt-2 text-3xl text-ink">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}
