import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";

/** Base path for anchors: "" or "/en" */
export function pathPrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

type Ui = {
  metaTitle: string;
  metaDescription: string;
  navEvents: string;
  navMenu: string;
  navReservas: string;
  navLocation: string;
  navLangSwitch: string;
  heroH1: string;
  heroTaglineL1: string;
  heroTaglineL2: string;
  galleryTitle: string;
  gallerySr: string;
  galleryFollow: string;
  galleryMore: string;
  editorialSr: string;
  editorialMid: string;
  editorialSubtitle: string;
  editorialPlanLabel: string;
  editorialPlan: [string, string, string, string];
  editorialCloseL1: string;
  editorialCloseL2: string;
  editorialCloseL3: string;
  menuSectionLabel: string;
  menuSr: string;
  menuLocation: string;
  menuPlatos: string;
  menuTragos: string;
  menuVinos: string;
  menuCopa: string;
  menuBotella: string;
  menuFallback: string;
  eventsSection: string;
  eventsNext: string;
  eventsDoors: string;
  eventsFree: string;
  eventsCal: string;
  eventsMaps: string;
  eventsIg: string;
  reservaSection: string;
  reservaTags: string;
  reservaLine1: string;
  /** Second line (neon span), e.g. "en bruto." / "at bruto." */
  reservaLine2: string;
  reservaMail: string;
  reservaPhone: string;
  reservaOptions: {
    cumple: { title: string; sub: string; body: string; cta: string; wa: string };
    privado: { title: string; sub: string; body: string; cta: string; wa: string };
    vinilo: { title: string; sub: string; body: string; cta: string; wa: string };
  };
  reviewsSection: string;
  reviewsTag: string;
  reviewsH1a: string;
  reviewsH1b: string;
  reviewsBody: string;
  reviewsCta: string;
  reviewsStarsAria: string;
  footerSr: string;
  footerAddress: string;
  footerHours: string;
  footerContact: string;
  footerDirections: string;
  footerReview: string;
  footerTag: string;
  footerBar: string;
  hours: { day: string; time: string }[];
};

const UI_ES: Ui = {
  metaTitle: "BRUTO — Bar de tapas y vinilos en Ibiza · Santa Eulària",
  metaDescription: site.description,
  navEvents: "Eventos",
  navMenu: "Menú",
  navReservas: "Reservas",
  navLocation: "Ubicación",
  navLangSwitch: "EN",
  heroH1:
    "BRUTO — Bar de tapas y vinilos en Santa Eulària des Riu, Ibiza. Isidoro Macabich 30. Tragos con criterio, tapas de verdad, música en vinilo todas las noches.",
  heroTaglineL1: "tapas",
  heroTaglineL2: "& vinilos",
  galleryTitle: "galería",
  gallerySr: " · BRUTO tapas y vinilos Ibiza en Instagram",
  galleryFollow: "Seguir",
  galleryMore: "Ver más en Instagram →",
  editorialSr: "Qué es BRUTO · un bar de tapas y vinilos en Ibiza",
  editorialMid: "ES",
  editorialSubtitle:
    "Un lugar donde las cosas pasan sin demasiado protocolo, pero con intención.",
  editorialPlanLabel: "el plan",
  editorialPlan: [
    "Tapas sin excusa.",
    "Vinilos de verdad.",
    "Tragos con criterio.",
    "Mesa. Amigos. Tiempo.",
  ],
  editorialCloseL1: "Simple, pero no básico.",
  editorialCloseL2: "Directo, pero con criterio.",
  editorialCloseL3: "Y ahí es donde funciona.",
  menuSectionLabel: "menú",
  menuSr: "Carta · ",
  menuLocation: "Santa Eulària · Ibiza",
  menuPlatos: "platos",
  menuTragos: "tragos",
  menuVinos: "vinos",
  menuCopa: "copa",
  menuBotella: "botella",
  menuFallback: "Carta no disponible en este momento — preguntá en barra.",
  eventsSection: "eventos",
  eventsNext: "próximo",
  eventsDoors: "puertas",
  eventsFree: "entrada libre",
  eventsCal: "Añadir al calendario",
  eventsMaps: "Cómo llegar",
  eventsIg: "Ver en Instagram",
  reservaSection: "reservas & eventos",
  reservaTags: "cumpleaños · privados · open decks",
  reservaLine1: "tu noche",
  reservaLine2: "en bruto.",
  reservaMail: "¿Preferís mail?",
  reservaPhone: "O llamá ·",
  reservaOptions: {
    cumple: {
      title: "Cumpleaños",
      sub: "tu noche, tu playlist",
      body:
        "Reservamos la mesa larga, armamos la carta a medida y te dejamos la bandeja un rato. Sin protocolo — con intención.",
      cta: "Armar mi cumple",
      wa: "Hola BRUTO! Me gustaría armar mi cumpleaños en el bar. ¿Me pasan info?",
    },
    privado: {
      title: "Evento privado",
      sub: "despedida · launch · cena",
      body:
        "Tus amigos, nuestro lugar. Carta BRUTO, selección en vinilo, y el horario lo marcás vos.",
      cta: "Consultar disponibilidad",
      wa: "Hola BRUTO! Quería consultar por un evento privado. ¿Me cuentan cómo funciona?",
    },
    vinilo: {
      title: "Traé tu vinilo",
      sub: "open decks · noche de curadores",
      body:
        "¿Coleccionás vinilos? La bandeja es tuya un rato. Elegimos día, hora, y lo pasás.",
      cta: "Quiero pinchar",
      wa: "Hola BRUTO! Quiero llevar mis vinilos a pinchar un rato. ¿Qué día puedo?",
    },
  },
  reviewsSection: "reseñas",
  reviewsTag: "si te fuiste feliz, contalo",
  reviewsH1a: "contá",
  reviewsH1b: "cómo te fue.",
  reviewsBody:
    "Veinte segundos en Google. Si te fuiste feliz, contalo — así el próximo encuentra el lugar.",
  reviewsCta: "Reseñar en Google",
  reviewsStarsAria: "5 estrellas en Google",
  footerSr:
    "Dónde estamos · BRUTO bar de tapas y vinilos en Santa Eulària des Riu, Ibiza",
  footerAddress: "Dirección",
  footerHours: "Horario",
  footerContact: "Contacto",
  footerDirections: "Cómo llegar →",
  footerReview: "Reseñanos en Google →",
  footerTag: "tapas & vinilos",
  footerBar: "tapas & vinilos — ibiza",
  hours: [
    { day: "Lunes", time: "18:00 — 01:00" },
    { day: "Martes", time: "Cerrado" },
    { day: "Miércoles", time: "18:00 — 01:00" },
    { day: "Jueves", time: "18:00 — 01:00" },
    { day: "Viernes", time: "18:00 — 01:00" },
    { day: "Sábado", time: "18:00 — 01:00" },
    { day: "Domingo", time: "18:00 — 01:00" },
  ],
};

const UI_EN: Ui = {
  metaTitle: "BRUTO — Tapas & vinyl bar in Ibiza · Santa Eulària des Riu",
  metaDescription:
    "BRUTO is a tapas & vinyl bar in Santa Eulària des Riu, Ibiza. Honest drinks, food with intent, and vinyl every night but Tuesdays. Isidoro Macabich 30.",
  navEvents: "Events",
  navMenu: "Menu",
  navReservas: "Bookings",
  navLocation: "Location",
  navLangSwitch: "ES",
  heroH1:
    "BRUTO — Tapas & vinyl bar in Santa Eulària des Riu, Ibiza. Isidoro Macabich 30. Drinks with intent, real tapas, vinyl every night.",
  heroTaglineL1: "tapas",
  heroTaglineL2: "& vinyl",
  galleryTitle: "gallery",
  gallerySr: " · BRUTO tapas & vinyl Ibiza on Instagram",
  galleryFollow: "Follow",
  galleryMore: "More on Instagram →",
  editorialSr: "What is BRUTO · a tapas & vinyl bar in Ibiza",
  editorialMid: "IS",
  editorialSubtitle:
    "A place where things happen without too much protocol — but with intent.",
  editorialPlanLabel: "the plan",
  editorialPlan: [
    "Tapas, no excuses.",
    "Real vinyl.",
    "Drinks with intent.",
    "Table. Friends. Time.",
  ],
  editorialCloseL1: "Simple, but not basic.",
  editorialCloseL2: "Direct, but with taste.",
  editorialCloseL3: "That's where it works.",
  menuSectionLabel: "menu",
  menuSr: "Menu · ",
  menuLocation: "Santa Eulària · Ibiza",
  menuPlatos: "food",
  menuTragos: "drinks",
  menuVinos: "wine",
  menuCopa: "glass",
  menuBotella: "bottle",
  menuFallback: "Menu unavailable right now — ask at the bar.",
  eventsSection: "events",
  eventsNext: "next",
  eventsDoors: "doors",
  eventsFree: "free entry",
  eventsCal: "Add to calendar",
  eventsMaps: "Directions",
  eventsIg: "See on Instagram",
  reservaSection: "bookings & events",
  reservaTags: "birthdays · private · open decks",
  reservaLine1: "your night",
  reservaLine2: "at bruto.",
  reservaMail: "Prefer email?",
  reservaPhone: "Or call ·",
  reservaOptions: {
    cumple: {
      title: "Birthday",
      sub: "your night, your playlist",
      body:
        "We hold the long table, tailor the menu, and hand you the decks for a while. No protocol — with intent.",
      cta: "Plan my birthday",
      wa: "Hi BRUTO! I'd like to plan my birthday at the bar. Can you share details?",
    },
    privado: {
      title: "Private event",
      sub: "farewell · launch · dinner",
      body:
        "Your friends, our place. BRUTO menu, vinyl selection, and you set the time.",
      cta: "Check availability",
      wa: "Hi BRUTO! I'd like to ask about a private event. How does it work?",
    },
    vinilo: {
      title: "Bring your vinyl",
      sub: "open decks · curator nights",
      body:
        "Collect records? The turntable is yours for a while. We pick a day and time — you play.",
      cta: "I want to play",
      wa: "Hi BRUTO! I'd like to bring my vinyl to play for a bit. What day works?",
    },
  },
  reviewsSection: "reviews",
  reviewsTag: "if you left happy, say so",
  reviewsH1a: "tell us",
  reviewsH1b: "how it went.",
  reviewsBody:
    "Twenty seconds on Google. If you left happy, say so — it helps the next person find us.",
  reviewsCta: "Review on Google",
  reviewsStarsAria: "5 stars on Google",
  footerSr:
    "Where we are · BRUTO tapas & vinyl bar in Santa Eulària des Riu, Ibiza",
  footerAddress: "Address",
  footerHours: "Hours",
  footerContact: "Contact",
  footerDirections: "Directions →",
  footerReview: "Review us on Google →",
  footerTag: "tapas & vinyl",
  footerBar: "tapas & vinyl — ibiza",
  hours: [
    { day: "Mon", time: "18:00 — 01:00" },
    { day: "Tue", time: "Closed" },
    { day: "Wed", time: "18:00 — 01:00" },
    { day: "Thu", time: "18:00 — 01:00" },
    { day: "Fri", time: "18:00 — 01:00" },
    { day: "Sat", time: "18:00 — 01:00" },
    { day: "Sun", time: "18:00 — 01:00" },
  ],
};

export function ui(locale: Locale): Ui {
  return locale === "en" ? UI_EN : UI_ES;
}
