import Image from "next/image";

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
      className={`relative overflow-hidden blueprint ${className}`}
      aria-label={`${alt} — image coming soon`}
    >
      <div className="h-[3px] w-full safety-stripes" />
      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-white/40">
          {num} · Image coming soon
        </span>
        <span className="mt-2 font-display text-base font-bold text-white/70">{alt}</span>
      </div>
    </div>
  );
}
