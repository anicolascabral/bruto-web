import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "BRUTO — Tapas & vinyl bar in Ibiza · Santa Eulària des Riu",
    template: "%s · BRUTO — tapas & vinyl · Ibiza",
  },
  description: site.descriptionEn,
  alternates: {
    canonical: "/en",
    languages: {
      "es-ES": "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["es_ES", "ca_ES"],
    url: `${SITE_URL}/en`,
    siteName: site.name,
    title: "BRUTO — Tapas & vinyl · Ibiza · Santa Eulària des Riu",
    description: site.descriptionEn,
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUTO — tapas & vinyl · Ibiza",
    description:
      "Tapas, drinks & vinyl in Santa Eulària des Riu, Ibiza. Isidoro Macabich 30.",
    site: site.instagramHandle,
    creator: site.instagramHandle,
  },
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return children;
}
