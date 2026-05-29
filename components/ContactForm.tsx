"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import { waLink } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
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
  }

  async function handleSubmit() {
    if (!form.name || !form.phone) {
      setStatus("error");
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
      setForm({ name: "", phone: "", email: "", organization: "", interest: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const whatsappFallback = waLink(
    `Enquiry from ${form.name || "—"}\nPhone: ${form.phone}\nInterest: ${form.interest || "—"}\n${form.message}`
  );

  const field =
    "w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand";

  if (status === "sent") {
    return (
      <div className="border border-brand bg-brand-tint p-8 text-center">
        <p className="font-display text-xl font-bold text-brand-deep">Thank you — message received.</p>
        <p className="mt-2 text-sm text-ink-soft">Our team will get back to you shortly.</p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mono-label">Name *</label>
          <input className={`${field} mt-2`} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <label className="mono-label">Phone *</label>
          <input className={`${field} mt-2`} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <label className="mono-label">Email</label>
          <input type="email" className={`${field} mt-2`} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <label className="mono-label">Organization</label>
          <input className={`${field} mt-2`} value={form.organization} onChange={(e) => update("organization", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="mono-label">Product / category of interest</label>
          <select className={`${field} mt-2`} value={form.interest} onChange={(e) => update("interest", e.target.value)}>
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Custom Engineered Solution">Custom Engineered Solution</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mono-label">Message</label>
          <textarea rows={4} className={`${field} mt-2 resize-none`} value={form.message} onChange={(e) => update("message", e.target.value)} />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-amber-deep">
          Please add at least your name and phone — or message us directly on WhatsApp below.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handleSubmit} disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className="btn-amber">
          Send on WhatsApp
        </a>
      </div>
    </div>
  );
}
