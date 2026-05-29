import Image from "next/image";

// Renders the first real image if present; otherwise a branded placeholder
// so the layout looks intentional until photos are added.
export default function ProductImage({
  src,
  alt,
  index = 0,
  className = "",
}: {
  src?: string;
  alt: string;
  index?: number;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  const num = String((index % 8) + 1).padStart(2, "0");
  return (
    <div
      className={`relative overflow-hidden bg-ink paper-grid ${className}`}
      aria-label={`${alt} — image coming soon`}
    >
      <div className="absolute inset-0 blueprint opacity-90" />
      <div className="absolute left-0 top-0 h-1.5 w-full safety-stripes opacity-80" />
      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
          {num} / Image coming soon
        </span>
        <span className="mt-2 font-display text-base font-bold text-white/85">
          {alt}
        </span>
      </div>
    </div>
  );
}
