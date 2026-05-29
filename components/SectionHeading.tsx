import { type ReactNode } from "react";

export default function SectionHeading({
  index,
  label,
  title,
  intro,
  light = false,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        {index && (
          <span className="font-mono text-[11px] tracking-[0.20em] text-amber">{index}</span>
        )}
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.20em] ${
            light ? "text-white/55" : "text-ink-muted"
          }`}
        >
          {label}
        </span>
        <span
          className={`flex-1 h-px ${light ? "bg-white/10" : "bg-line-strong"}`}
          style={{ maxWidth: "2.5rem" }}
        />
      </div>
      <h2
        className={`display-tight mt-4 text-3xl sm:text-4xl md:text-[2.75rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/65" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
