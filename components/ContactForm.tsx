"use client";

import { useRef, useState } from "react";
import { categories } from "@/data/categories";
import { waLink } from "@/lib/utils";
import { track } from "@/lib/track";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const fieldsTouched = useRef<Set<string>>(new Set());
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    interest: "",
    message: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (!fieldsTouched.current.has(key)) {
      fieldsTouched.current.add(key);
      track({ type: "form_step", payload: { field: key } });
    }
  }

  async function handleSubmit() {
    if (!form.name || !form.phone) {
      setStatus("error");
      track({ type: "form_submit", payload: { outcome: "validation_error" } });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      track({ type: "form_submit", payload: { outcome: "success", interest: form.interest } });
      setForm({ name: "", phone: "", email: "", organization: "", interest: "", message: "" });
      fieldsTouched.current = new Set();
    } catch {
      setStatus("error");
      track({ type: "form_submit", payload: { outcome: "error" } });
    }
  }

  const whatsappFallback = waLink(
    `Enquiry from ${form.name || "—"}\nPhone: ${form.phone}\nInterest: ${form.interest || "—"}\n${form.message}`
  );

  const field =
    "w-full border border-line bg-surface px-4 py-3 text-sm text-ink rounded-sm outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/10 placeholder:text-ink-muted/50";

  if (status === "sent") {
    return (
      <div className="bg-brand-tint border border-brand/20 rounded p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
          <span className="text-2xl text-brand">✓</span>
        </div>
        <p className="font-display text-xl font-bold text-brand-deep">
          Thank you — message received.
        </p>
        <p className="mt-2 text-sm text-ink-soft">Our team will get back to you shortly.</p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface shadow-card rounded p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mono-label mb-2 block">Name *</label>
          <input
            className={field}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label className="mono-label mb-2 block">Phone *</label>
          <input
            className={field}
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="mono-label mb-2 block">Email</label>
          <input
            type="email"
            className={field}
            placeholder="you@organisation.in"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label className="mono-label mb-2 block">Organization</label>
          <input
            className={field}
            placeholder="Municipality / Department / Company"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mono-label mb-2 block">Product / category of interest</label>
          <select
            className={field}
            value={form.interest}
            onChange={(e) => update("interest", e.target.value)}
          >
            <option value="">Select a category…</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Custom Engineered Solution">Custom Engineered Solution</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mono-label mb-2 block">Message</label>
          <textarea
            rows={4}
            className={`${field} resize-none`}
            placeholder="Describe your requirement, tender details, or any questions…"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>
      </div>

      {status === "error" && (
        <div className="mt-4 flex items-start gap-2.5 rounded bg-amber-tint border border-amber/20 px-4 py-3">
          <span className="text-amber-deep mt-0.5 text-sm font-bold shrink-0">!</span>
          <p className="text-sm text-amber-deep">
            Please fill in your name and phone — or send us a message directly on WhatsApp below.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          data-track="cta:contact-submit"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a
          href={whatsappFallback}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-amber"
          data-track="cta:contact-whatsapp"
        >
          Send on WhatsApp
        </a>
      </div>
    </div>
  );
}
