import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How S.S. Engineers handles visitor data, cookies, and analytics on this website.",
};

export default function PrivacyPage() {
  return (
    <article className="container-x py-16 md:py-20">
      <p className="mono-label">Legal</p>
      <h1 className="display-tight mt-3 text-4xl text-ink sm:text-5xl">Privacy Notice</h1>
      <p className="mt-4 text-sm text-ink-muted">
        Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div className="prose mt-10 max-w-3xl space-y-6 text-[15px] leading-relaxed text-ink-soft">
        <p>
          {company.name} ("we", "us") respects your privacy. This notice explains what
          information we collect when you visit this website and how we use it.
        </p>

        <h2 className="display-tight mt-10 text-2xl text-ink">What we collect</h2>
        <p>When you visit our site, we collect the following information to help us improve our website and services:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Pages you visit and the order in which you visit them</li>
          <li>Buttons and links you click (e.g., "Request a quote", "WhatsApp us")</li>
          <li>Products and categories you open</li>
          <li>How far you scroll on each page</li>
          <li>Approximate location (country, region, city) derived from your IP address</li>
          <li>Device type, browser, and operating system</li>
          <li>The referring website that brought you here</li>
          <li>If you submit our contact form: name, phone, email, organisation, and your message</li>
        </ul>
        <p>
          We do <strong>not</strong> sell, share, or trade your data with any third party for
          advertising.
        </p>

        <h2 className="display-tight mt-10 text-2xl text-ink">Cookies and consent</h2>
        <p>
          On your first visit, we ask whether you accept analytics cookies.
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>
            <strong>If you accept:</strong> we store a small visitor ID in your browser, log your
            IP address, and load Microsoft Clarity (which records anonymised heatmaps and session
            replays). This helps us understand which parts of our website are useful and where
            people get stuck.
          </li>
          <li>
            <strong>If you reject:</strong> we store no persistent visitor ID, your IP address is
            truncated before storage (the last octet is removed), and Microsoft Clarity is not
            loaded. We retain only basic, anonymous page-view counts.
          </li>
        </ul>
        <p>
          You can change your choice at any time by clearing your browser&apos;s site data for this
          domain.
        </p>

        <h2 className="display-tight mt-10 text-2xl text-ink">Third-party services</h2>
        <ul className="ml-6 list-disc space-y-1.5">
          <li><strong>Vercel</strong> — our hosting provider; processes server logs.</li>
          <li><strong>Microsoft Clarity</strong> — heatmaps and session replays (only with consent).</li>
        </ul>

        <h2 className="display-tight mt-10 text-2xl text-ink">How long we keep data</h2>
        <p>
          Visitor analytics data is retained for up to 365 days, after which it is automatically
          deleted. Contact-form enquiries are retained for as long as needed to respond and
          fulfil your request.
        </p>

        <h2 className="display-tight mt-10 text-2xl text-ink">Your rights</h2>
        <p>
          Under India&apos;s Digital Personal Data Protection Act (DPDP), you have the right to
          request access to, correction of, or deletion of your personal data. To make a
          request, please contact us at{" "}
          <a className="text-brand hover:underline" href={`mailto:${company.contact.email}`}>
            {company.contact.email}
          </a>
          .
        </p>

        <h2 className="display-tight mt-10 text-2xl text-ink">Contact</h2>
        <p>
          {company.name}
          <br />
          {company.contact.address.lines.join(", ")}
          <br />
          {company.contact.email}
        </p>
      </div>
    </article>
  );
}
