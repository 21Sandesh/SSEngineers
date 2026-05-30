import Link from "next/link";
import { company } from "@/data/company";
import { waLink, telLink } from "@/lib/utils";

export default function CTABand({
  title = "Have a tender, an order, or a custom requirement?",
  subtitle = "Talk to our team — we handle everything from design and manufacturing to installation and after-sales service.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(15,122,60,0.25) 0%, transparent 65%)",
        }}
      />

      <div className="container-x relative grid items-center gap-8 py-14 md:grid-cols-2">
        <div>
          <h2 className="display-tight text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-white/70 text-[15px] leading-relaxed">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href={waLink("Hello S.S. Engineers, I'd like to discuss a requirement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber"
            data-track="cta:band-whatsapp"
          >
            WhatsApp us
          </a>
          <a
            href={telLink(company.contact.phonesRaw[0])}
            className="btn-ghost-light"
            data-track="cta:band-call"
          >
            Call now
          </a>
          <Link href="/contact" className="btn-ghost-light" data-track="cta:band-request-quote">
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
