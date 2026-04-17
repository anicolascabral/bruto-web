/**
 * Canonical site configuration — single source of truth for SEO signals.
 * Production canonical: https://www.brutobar.com
 * Override per-environment with NEXT_PUBLIC_SITE_URL if needed (preview deploys).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.brutobar.com";

export const site = {
  name: "BRUTO",
  legalName: "BRUTO — tapas & vinilos",
  tagline: "Tapas & vinilos en Ibiza",
  description:
    "BRUTO es un bar de tapas y vinilos en Santa Eulària des Riu, Ibiza. Tragos honestos, platos con criterio y música en vinilo — todas las noches. Isidoro Macabich 30.",
  longDescription:
    "BRUTO es el bar de tapas y vinilos de Santa Eulària des Riu, Ibiza. Un lugar donde las cosas pasan sin demasiado protocolo, pero con intención: tapas de verdad, tragos con criterio y música elegida en vinilo. Abrimos todas las noches menos los martes. Isidoro Macabich 30.",
  url: SITE_URL,
  instagram: "https://www.instagram.com/bruto.____/",
  instagramHandle: "@bruto.____",
  email: "contacto@brutobar.com",
  phone: "+34652571708",
  phonePretty: "+34 652 57 17 08",
  mapsUrl: "https://share.google/s5jRnc5OYu4hfFSJ6",
  address: {
    street: "Carrer Isidoro Macabich, 30",
    locality: "Santa Eulària des Riu",
    region: "Illes Balears",
    postalCode: "07840",
    country: "ES",
  },
  // Approximate coordinates for the main avenue Isidoro Macabich in Santa Eulària des Riu.
  // Refine with exact lat/lng from the Google Maps share URL if needed.
  geo: { lat: 38.9852, lng: 1.5345 },
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  servesCuisine: [
    "Tapas",
    "Spanish",
    "Mediterranean",
    "Ibicenca",
    "Bar food",
  ],
  // Monday = 18–01, Tuesday closed, rest 18–01.
  openingHours: [
    { days: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "18:00", closes: "01:00" },
  ],
  keywords: [
    "bar de vinilos Ibiza",
    "bar de tapas Ibiza",
    "tapas y vinilos Ibiza",
    "bar vinilos Santa Eulària",
    "bar vinilos Santa Eulalia",
    "listening bar Ibiza",
    "vinyl bar Ibiza",
    "audiophile bar Ibiza",
    "bar con música en vinilo Ibiza",
    "bar con DJ vinilo Ibiza",
    "tapas Santa Eulària des Riu",
    "bar Isidoro Macabich Ibiza",
    "dónde tomar algo en Santa Eulària",
    "bares Santa Eulalia Ibiza",
    "BRUTO Ibiza",
    "BRUTO bar Ibiza",
    "bar tragos Ibiza",
    "bar tapas con buena música Ibiza",
    "planes Santa Eulària",
    "Ibiza by night Santa Eulària",
  ],
} as const;

export type SiteConfig = typeof site;
