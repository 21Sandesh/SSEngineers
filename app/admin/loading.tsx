export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-9 w-40 animate-pulse rounded bg-line" />
        <div className="h-8 w-44 animate-pulse rounded bg-line" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-surface p-5 shadow-card">
            <div className="h-3 w-20 animate-pulse rounded bg-line" />
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-line" />
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-surface p-5 shadow-card">
        <div className="h-4 w-32 animate-pulse rounded bg-line" />
        <div className="mt-5 h-64 w-full animate-pulse rounded bg-line/60" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-surface p-5 shadow-card">
            <div className="h-4 w-32 animate-pulse rounded bg-line" />
            <div className="mt-4 space-y-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-6 w-full animate-pulse rounded bg-line/60" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
