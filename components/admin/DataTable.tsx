type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export default function DataTable<T extends Record<string, unknown>>({
  rows,
  columns,
  empty = "No data yet.",
}: {
  rows: T[];
  columns: Column<T>[];
  empty?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded bg-paper p-6 text-center text-sm text-ink-muted">{empty}</div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-ink-muted">
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] ${c.className ?? ""}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-line last:border-0 hover:bg-paper/60 transition-colors"
            >
              {columns.map((c) => (
                <td key={String(c.key)} className={`px-3 py-2.5 text-ink-soft ${c.className ?? ""}`}>
                  {c.render ? c.render(row) : ((row as Record<string, unknown>)[String(c.key)] as React.ReactNode) ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
