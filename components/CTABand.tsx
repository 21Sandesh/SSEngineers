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
    <section className="bg-brand-deep text-white">
      <div className="container-x grid items-center gap-8 py-14 md:grid-cols-2">
        <div>
          <h2 className="display-tight text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-white/75">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href={waLink("Hello S.S. Engineers, I'd like to discuss a requirement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber"
          >
            WhatsApp us
          </a>
          <a href={telLink(company.contact.phonesRaw[0])} className="btn-ghost-light">
            Call now
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
