import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Services & Project Execution",
  description:
    "End-to-end support from S.S. Engineers — requirement analysis, design, manufacturing, installation, operator training, AMC, spare parts, and after-sales service.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="blueprint text-white">
        <div className="h-1.5 w-full safety-stripes" />
        <div className="container-x py-16 md:py-24">
          <SectionHeading
            light
            index="S"
            label="Project execution & services"
            title="We don't just deliver machines — we run the full project lifecycle."
            intro="From the moment a tender is studied to long after a machine is commissioned, our team stays involved."
          />
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-x py-16 md:py-24">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {company.services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 60}>
                <div className="flex h-full flex-col bg-white p-7">
                  <span className="font-mono text-[12px] tracking-[0.18em] text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-tight mt-3 text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-soft">
            Whether it is a government tender, municipal sanitation project, institutional requirement, or private
            development, we provide end-to-end support from concept to deployment.
          </p>
        </div>
      </section>

      <CTABand
        title="Need a partner for your next sanitation project?"
        subtitle="From requirement analysis to after-sales service — talk to our team."
      />
    </>
  );
}
