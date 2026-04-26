import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { buildJsonLdGraph } from "@/lib/jsonld";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/locale";
import { SITE_URL, site } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BRUTO — Bar de tapas y vinilos en Ibiza · Santa Eulària",
    template: "%s · BRUTO — tapas & vinilos · Ibiza",
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [...site.keywords],
  authors: [{ name: "BRUTO", url: SITE_URL }],
  creator: "BRUTO",
  publisher: "BRUTO",
  category: "restaurant",
  classification: "Bar · Tapas · Listening bar · Vinilos",
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      es: "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_GB", "ca_ES"],
    url: SITE_URL,
    siteName: site.name,
    title: "BRUTO — Tapas & vinilos en Ibiza · Santa Eulària des Riu",
    description:
      "Un bar de barrio en Ibiza. Tapas de verdad, tragos con criterio y música elegida en vinilo. Todas las noches menos los martes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUTO — tapas & vinilos · Ibiza",
    description:
      "Tapas, tragos y vinilos en Santa Eulària des Riu, Ibiza. Isidoro Macabich 30.",
    site: site.instagramHandle,
    creator: site.instagramHandle,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  appleWebApp: {
    capable: true,
    title: "BRUTO",
    statusBarStyle: "black-translucent",
  },
  other: {
    "geo.region": "ES-IB",
    "geo.placename": "Santa Eulària des Riu, Ibiza",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E6FF7B" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

function localeFromHeader(): Locale {
  const raw = headers().get("x-next-locale");
  return isLocale(raw) ? raw : DEFAULT_LOCALE;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = localeFromHeader();
  const jsonLd = await buildJsonLdGraph(locale);
  const htmlLang = locale === "en" ? "en-GB" : "es-ES";

  return (
    <html lang={htmlLang} className="bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${archivo.variable} font-sans bg-black text-white antialiased`}>
        {children}
        <Analytics />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
