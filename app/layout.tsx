import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { EVENTS } from "@/lib/events";
import { getMenuData, menuDataToSchemaMenuItems } from "@/lib/menu";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await getMenuData();
  const {
    platos: platosSchema,
    tragos: tragosSchema,
    vinos: vinosSchema,
  } = menuDataToSchemaMenuItems(menuData);
  const menuSections: Array<{
    "@type": "MenuSection";
    name: string;
    hasMenuItem: unknown[];
  }> = [];
  if (platosSchema.length > 0) {
    menuSections.push({
      "@type": "MenuSection",
      name: "Platos",
      hasMenuItem: platosSchema,
    });
  }
  if (tragosSchema.length > 0) {
    menuSections.push({
      "@type": "MenuSection",
      name: "Tragos",
      hasMenuItem: tragosSchema,
    });
  }
  if (vinosSchema.length > 0) {
    menuSections.push({
      "@type": "MenuSection",
      name: "Vinos",
      hasMenuItem: vinosSchema,
    });
  }
  const hasStructuredMenu = menuSections.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BarOrPub", "Restaurant", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: site.name,
        alternateName: site.legalName,
        description: site.longDescription,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/bruto-logo.svg`,
        image: [`${SITE_URL}/opengraph-image`],
        telephone: site.phone,
        email: site.email,
        priceRange: site.priceRange,
        currenciesAccepted: site.currenciesAccepted,
        paymentAccepted: site.paymentAccepted,
        servesCuisine: site.servesCuisine,
        acceptsReservations: false,
        smokingAllowed: false,
        publicAccess: true,
        isAccessibleForFree: true,
        slogan: "Tapas, vinilos, amigos y tiempo bien usado.",
        keywords: site.keywords.join(", "),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        hasMap: site.mapsUrl,
        areaServed: [
          { "@type": "City", name: "Santa Eulària des Riu" },
          { "@type": "AdministrativeArea", name: "Ibiza" },
          { "@type": "AdministrativeArea", name: "Illes Balears" },
        ],
        openingHoursSpecification: site.openingHours.map((o) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: o.days,
          opens: o.opens,
          closes: o.closes,
        })),
        sameAs: [site.instagram],
        ...(hasStructuredMenu ? { hasMenu: { "@id": `${SITE_URL}/#menu` } } : {}),
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Música en vinilo", value: true },
          { "@type": "LocationFeatureSpecification", name: "Tocadiscos", value: true },
          { "@type": "LocationFeatureSpecification", name: "Tapas", value: true },
          { "@type": "LocationFeatureSpecification", name: "Coctelería de autor", value: true },
          { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
        ],
      },
      ...(hasStructuredMenu
        ? [
            {
              "@type": "Menu" as const,
              "@id": `${SITE_URL}/#menu`,
              name: "Menú BRUTO",
              inLanguage: "es-ES",
              hasMenuSection: menuSections,
            },
          ]
        : []),
      ...EVENTS.filter(
        (e) => new Date(e.endISO).getTime() >= Date.now(),
      ).map((e) => ({
        "@type": "Event" as const,
        "@id": `${SITE_URL}/#event-${e.slug}`,
        name: `BRUTO — ${e.title}`,
        description: e.description,
        startDate: e.startISO,
        endDate: e.endISO,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode:
          "https://schema.org/OfflineEventAttendanceMode",
        image: e.posters.map((p) => `${SITE_URL}${p}`),
        location: { "@id": `${SITE_URL}/#business` },
        organizer: { "@id": `${SITE_URL}/#business` },
        isAccessibleForFree: !!e.free,
        url: `${SITE_URL}/#eventos`,
        ...(e.free
          ? {
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                validFrom: e.startISO,
                url: `${SITE_URL}/#eventos`,
              },
            }
          : {}),
      })),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        description: site.description,
        inLanguage: "es-ES",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: site.name,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/bruto-logo.svg`,
        email: site.email,
        telephone: site.phone,
        sameAs: [site.instagram],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Dónde está BRUTO en Ibiza?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "En Carrer Isidoro Macabich 30, Santa Eulària des Riu, Ibiza (07840).",
            },
          },
          {
            "@type": "Question",
            name: "¿BRUTO es un bar de vinilos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. En BRUTO la música suena en vinilo todas las noches. Tapas, tragos y vinilos — sin protocolo, con criterio.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué días abre BRUTO?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Abrimos de lunes a domingo de 18:00 a 01:00, excepto los martes que permanece cerrado.",
            },
          },
          {
            "@type": "Question",
            name: "¿Se puede reservar mesa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BRUTO funciona sin reserva: entrás, buscás mesa y te sentás. Para cumples, eventos privados u open decks escribinos a contacto@brutobar.com o llamá al +34 652 57 17 08.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué tipo de música suena?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Selección curada en vinilo: balearic, funk, soul, disco, jazz y ritmos del Mediterráneo.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="es-ES" className="bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${archivo.variable} font-sans bg-black text-white antialiased`}>
        {children}
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
