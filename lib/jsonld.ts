import { EVENTS } from "@/lib/events";
import type { Locale } from "@/lib/locale";
import { applyMenuLocale } from "@/lib/menu-en";
import { getMenuData, menuDataToSchemaMenuItems } from "@/lib/menu";
import { SITE_URL, site } from "@/lib/site";

function menuSectionLabels(locale: Locale) {
  return locale === "en"
    ? { platos: "Food", tragos: "Drinks", vinos: "Wine" }
    : { platos: "Platos", tragos: "Tragos", vinos: "Vinos" };
}

function faqEntities(locale: Locale) {
  if (locale === "en") {
    return [
      {
        "@type": "Question" as const,
        name: "Where is BRUTO in Ibiza?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Carrer Isidoro Macabich 30, Santa Eulària des Riu, Ibiza (07840).",
        },
      },
      {
        "@type": "Question" as const,
        name: "Is BRUTO a vinyl bar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. At BRUTO the music plays on vinyl every night. Tapas, drinks & vinyl — no protocol, with intent.",
        },
      },
      {
        "@type": "Question" as const,
        name: "What days is BRUTO open?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We open Monday to Sunday from 18:00 to 01:00, except Tuesdays when we are closed.",
        },
      },
      {
        "@type": "Question" as const,
        name: "Can I book a table?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BRUTO runs without reservations: you walk in, find a table, and sit. For birthdays, private events or open decks write to contacto@brutobar.com or call +34 652 57 17 08.",
        },
      },
      {
        "@type": "Question" as const,
        name: "What kind of music do you play?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Curated vinyl selection: balearic, funk, soul, disco, jazz and Mediterranean rhythms.",
        },
      },
    ];
  }
  return [
    {
      "@type": "Question" as const,
      name: "¿Dónde está BRUTO en Ibiza?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Carrer Isidoro Macabich 30, Santa Eulària des Riu, Ibiza (07840).",
      },
    },
    {
      "@type": "Question" as const,
      name: "¿BRUTO es un bar de vinilos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. En BRUTO la música suena en vinilo todas las noches. Tapas, tragos y vinilos — sin protocolo, con criterio.",
      },
    },
    {
      "@type": "Question" as const,
      name: "¿Qué días abre BRUTO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abrimos de lunes a domingo de 18:00 a 01:00, excepto los martes que permanece cerrado.",
      },
    },
    {
      "@type": "Question" as const,
      name: "¿Se puede reservar mesa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BRUTO funciona sin reserva: entrás, buscás mesa y te sentás. Para cumples, eventos privados u open decks escribinos a contacto@brutobar.com o llamá al +34 652 57 17 08.",
      },
    },
    {
      "@type": "Question" as const,
      name: "¿Qué tipo de música suena?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selección curada en vinilo: balearic, funk, soul, disco, jazz y ritmos del Mediterráneo.",
      },
    },
  ];
}

function amenityFeatures(locale: Locale) {
  if (locale === "en") {
    return [
      { "@type": "LocationFeatureSpecification" as const, name: "Music on vinyl", value: true },
      { "@type": "LocationFeatureSpecification" as const, name: "Turntables", value: true },
      { "@type": "LocationFeatureSpecification" as const, name: "Tapas", value: true },
      { "@type": "LocationFeatureSpecification" as const, name: "Cocktails", value: true },
      { "@type": "LocationFeatureSpecification" as const, name: "WiFi", value: true },
    ];
  }
  return [
    { "@type": "LocationFeatureSpecification" as const, name: "Música en vinilo", value: true },
    { "@type": "LocationFeatureSpecification" as const, name: "Tocadiscos", value: true },
    { "@type": "LocationFeatureSpecification" as const, name: "Tapas", value: true },
    { "@type": "LocationFeatureSpecification" as const, name: "Coctelería de autor", value: true },
    { "@type": "LocationFeatureSpecification" as const, name: "WiFi", value: true },
  ];
}

export async function buildJsonLdGraph(locale: Locale) {
  const raw = await getMenuData();
  const menuData = applyMenuLocale(raw, locale);
  const {
    platos: platosSchema,
    tragos: tragosSchema,
    vinos: vinosSchema,
  } = menuDataToSchemaMenuItems(menuData, locale);
  const labels = menuSectionLabels(locale);

  const menuSections: Array<{
    "@type": "MenuSection";
    name: string;
    hasMenuItem: unknown[];
  }> = [];
  if (platosSchema.length > 0) {
    menuSections.push({
      "@type": "MenuSection",
      name: labels.platos,
      hasMenuItem: platosSchema,
    });
  }
  if (tragosSchema.length > 0) {
    menuSections.push({
      "@type": "MenuSection",
      name: labels.tragos,
      hasMenuItem: tragosSchema,
    });
  }
  if (vinosSchema.length > 0) {
    menuSections.push({
      "@type": "MenuSection",
      name: labels.vinos,
      hasMenuItem: vinosSchema,
    });
  }
  const hasStructuredMenu = menuSections.length > 0;

  const businessDescription =
    locale === "en" ? site.longDescriptionEn : site.longDescription;
  const businessSlogan =
    locale === "en"
      ? site.sloganEn
      : "Tapas, vinilos, amigos y tiempo bien usado.";
  const menuName = locale === "en" ? "BRUTO menu" : "Menú BRUTO";
  const schemaLang = locale === "en" ? "en-GB" : "es-ES";
  const webDesc = locale === "en" ? site.descriptionEn : site.description;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BarOrPub", "Restaurant", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: site.name,
        alternateName: site.legalName,
        description: businessDescription,
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
        slogan: businessSlogan,
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
        amenityFeature: amenityFeatures(locale),
      },
      ...(hasStructuredMenu
        ? [
            {
              "@type": "Menu" as const,
              "@id": `${SITE_URL}/#menu`,
              name: menuName,
              inLanguage: schemaLang,
              hasMenuSection: menuSections,
            },
          ]
        : []),
      ...EVENTS.filter(
        (e) => new Date(e.endISO).getTime() >= Date.now(),
      ).map((e) => {
        const title = locale === "en" && e.titleEn ? e.titleEn : e.title;
        const desc =
          locale === "en" && e.descriptionEn ? e.descriptionEn : e.description;
        return {
          "@type": "Event" as const,
          "@id": `${SITE_URL}/#event-${e.slug}`,
          name: `BRUTO — ${title}`,
          description: desc,
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
        };
      }),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        description: webDesc,
        inLanguage: schemaLang,
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
        mainEntity: faqEntities(locale),
      },
    ],
  };
}
