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
      <div
        className={`flex items-center gap-3 border-t pt-3 ${
          light ? "border-white/20" : "border-line"
        }`}
      >
        {index && (
          <span className="font-mono text-[11px] tracking-[0.22em] text-amber">
            {index}
          </span>
        )}
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
            light ? "text-white/60" : "text-steel"
          }`}
        >
          {label}
        </span>
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
            light ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
