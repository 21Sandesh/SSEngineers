import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { company } from "@/data/company";
import { telLink, mailLink, waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact S.S. Engineers, Pune for product enquiries, project consultations, tenders, and custom solutions. Phone, WhatsApp, and email.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    company.contact.address.mapsQuery
  )}&output=embed`;

  return (
    <>
      <section className="blueprint text-white">
        <div className="h-1.5 w-full safety-stripes" />
        <div className="container-x py-16 md:py-20">
          <SectionHeading
            light
            index="C"
            label="Contact us"
            title="Let's talk about your requirement."
            intro="Government tender, township order, or a fully custom build — our team is ready to help."
          />
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-20">
          {/* Quick contact */}
          <div className="md:col-span-5">
            <div className="space-y-3">
              {company.contact.phonesRaw.map((p, i) => (
                <a
                  key={p}
                  href={telLink(p)}
                  className="flex items-center justify-between border border-line bg-paper px-5 py-4 transition-colors hover:border-ink"
                >
                  <span className="mono-label">Call</span>
                  <span className="font-display text-lg font-bold text-ink">{company.contact.phones[i]}</span>
                </a>
              ))}
              <a
                href={waLink("Hello S.S. Engineers, I'd like to enquire.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-brand bg-brand-tint px-5 py-4 transition-colors hover:bg-brand hover:text-white"
              >
                <span className="mono-label">WhatsApp</span>
                <span className="font-display text-lg font-bold">Chat now</span>
              </a>
              <a
                href={mailLink("Product enquiry")}
                className="flex items-center justify-between border border-line bg-paper px-5 py-4 transition-colors hover:border-ink"
              >
                <span className="mono-label">Email</span>
                <span className="break-all font-display text-base font-bold text-ink">
                  {company.contact.email}
                </span>
              </a>
            </div>

            <div className="mt-6 border border-line p-6">
              <p className="mono-label">Office & factory</p>
              <address className="mt-3 not-italic text-sm leading-relaxed text-ink-soft">
                {company.contact.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4 text-sm text-ink-soft">
                <span>
                  <span className="mono-label block">Service area</span>
                  {company.contact.serviceArea}
                </span>
                <span>
                  <span className="mono-label block">Hours</span>
                  {company.contact.hours}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-line">
        <iframe
          title="S.S. Engineers location"
          src={mapSrc}
          className="h-[360px] w-full grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
