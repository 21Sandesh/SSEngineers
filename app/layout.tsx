import type { Metadata } from "next";
import { Archivo, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { company, SITE_URL } from "@/data/company";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Waste Management & Sanitation Equipment Manufacturer, Pune`,
    template: `%s — ${company.name}`,
  },
  description:
    "S.S. Engineers manufactures waste management, sewer cleaning, road sweeping, sanitation, and custom equipment in Pune. MSME registered, ISO certified, pan-India delivery for government, municipal, and private projects.",
  keywords: [
    "waste management equipment manufacturer Pune",
    "sewer jetting machine",
    "road sweeper",
    "garbage compactor truck",
    "mobile toilet manufacturer",
    "sanitation equipment India",
  ],
  openGraph: {
    title: `${company.name} — Waste Management & Sanitation Equipment`,
    description:
      "Manufacturing waste management and sanitation equipment in Pune since 2018. Pan-India delivery.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable} font-body`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
