import { company } from "@/data/company";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function waLink(message?: string) {
  const base = `https://wa.me/${company.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(raw: string) {
  return `tel:+${raw}`;
}

export function mailLink(subject?: string) {
  const base = `mailto:${company.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
