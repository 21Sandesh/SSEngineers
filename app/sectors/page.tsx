import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Sectors We Serve",
  description:
    "S.S. Engineers serves government departments, municipal corporations, gram panchayats, smart city initiatives, institutions, hospitals, townships, and industry across India.",
};

export default function SectorsPage() {
  return (
    <>
      <section className="blueprint text-white">
        <div className="h-[3px] w-full safety-stripes" />
        <div className="container-x py-16 md:py-24">
          <SectionHeading
            light
            index="I"
            label="Industries we serve"
            title="Trusted across the public and private sector."
            intro="From municipal corporations and gram panchayats to townships, institutions, and industry — delivered pan-India."
          />
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="container-x py-16 md:py-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.sectors.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 50}>
                <div className="flex items-center gap-4 bg-surface shadow-card hover:shadow-card-md transition-shadow rounded-sm p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-tint font-mono text-[11px] tracking-[0.14em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-bold text-ink">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-sm border border-line bg-surface shadow-card p-8">
            <p className="mono-label">Clients</p>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              We have completed projects for government schemes, municipal bodies, gram panchayats,
              and private townships. For client references and project details, please{" "}
              <a href="/contact" className="font-semibold text-brand hover:underline underline-offset-2">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
