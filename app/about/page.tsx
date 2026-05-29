import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "S.S. Engineers is a Pune-based, woman-led, MSME-registered manufacturer of waste management and sanitation equipment, founded in 2018 by Sunita Sarode.",
};

export default function AboutPage() {
  return (
    <>
      <section className="blueprint text-white">
        <div className="h-1.5 w-full safety-stripes" />
        <div className="container-x py-16 md:py-24">
          <SectionHeading
            light
            index="A"
            label="About us"
            title="Built to keep India clean."
            intro="A Pune-based manufacturer engineering dependable cleaning and sanitation equipment for the people who keep our cities and villages clean."
          />
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                S.S. Engineers was founded in {company.established} with a single purpose — to put reliable,
                locally built sanitation and waste-management machinery into the hands of the people who keep our
                cities and villages clean. From our manufacturing facility in PCMC, Pune, our team of{" "}
                {company.teamSize} engineers and technicians designs, develops, modifies, and supplies equipment
                for sewer cleaning, road sweeping, garbage collection, mobile sanitation, and more.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                We work extensively through public tenders with government agencies, municipal corporations, and
                gram panchayats, as well as with private townships, institutions, and developers. Whether a client
                needs a standard machine off our line or a unit engineered to a precise specification, we deliver —
                and we stay involved long after delivery through installation, operator training, annual
                maintenance, and spare-parts support.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="border border-line bg-paper p-7">
                <p className="mono-label">Founder</p>
                <h3 className="display-tight mt-2 text-2xl text-ink">{company.founder}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Founded and led by {company.founder}, S.S. Engineers is a woman-led, MSME-registered manufacturer
                  committed to quality engineering and dependable after-sales service.
                </p>
                {company.founderMessage && (
                  <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm italic leading-relaxed text-ink-soft">
                    {company.founderMessage}
                  </blockquote>
                )}
              </div>

              <div className="mt-5 border border-line bg-brand-tint p-7">
                <p className="mono-label">Our mission</p>
                <p className="mt-2 font-display text-lg font-bold leading-snug text-brand-deep">
                  To engineer dependable cleaning and sanitation equipment that helps build a cleaner, healthier
                  India — one machine, one city, one village at a time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="paper-grid border-t border-line">
        <div className="container-x py-16 md:py-24">
          <SectionHeading index="B" label="Why choose us" title="Reasons clients return." />
          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.whyChoose.map((w, i) => (
              <li key={w} className="flex items-start gap-3 border-t border-line pt-4">
                <span className="font-mono text-[12px] text-amber">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-ink-soft">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t border-line bg-white">
        <div className="container-x py-16 md:py-20">
          <SectionHeading index="C" label="Certifications" title="Quality, on record." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {company.certifications.map((c) => (
              <div key={c.name} className="border border-line p-7">
                <h3 className="display-tight text-xl text-ink">{c.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
