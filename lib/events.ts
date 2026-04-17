/**
 * Agenda de eventos de BRUTO.
 * El primer evento "activo" (endDate >= hoy) se muestra como próximo evento en la web.
 * Editar aquí para sumar / quitar / actualizar fechas.
 */

export type EventItem = {
  slug: string;
  title: string;
  /** Slogan corto (“tapas · vinilos · tragos”). */
  tagline?: string;
  /** ISO start (UTC) */
  startISO: string;
  /** ISO end (UTC) */
  endISO: string;
  /** Texto humano en es-ES para mostrar (ej. "Lunes 20 · Abril") */
  dateLabel: string;
  /** "15:00" — hora humana */
  timeLabel: string;
  /** Descripción corta (máx ~140 char) */
  description: string;
  /** Ubicación legible */
  location: string;
  /**
   * Posters del evento. El componente elige uno al azar en cada carga.
   * El primero se usa como fallback SSR y como imagen del schema.org.
   */
  posters: string[];
  /** ¿Entrada libre? */
  free?: boolean;
};

export const EVENTS: EventItem[] = [
  {
    slug: "apertura-2026-04-20",
    title: "Apertura",
    tagline: "tapas · vinilos · tragos",
    startISO: "2026-04-20T13:00:00.000Z", // 15:00 Ibiza (CEST, UTC+2)
    endISO: "2026-04-20T23:00:00.000Z",
    dateLabel: "Lunes 20 · Abril",
    timeLabel: "15:00",
    description:
      "Tapas, vinilos, tragos. Sin protocolo — con intención. Puertas desde las 15h.",
    location: "Isidoro Macabich 30, Santa Eulària des Riu, Ibiza",
    posters: [
      "/events/apertura-01.jpeg",
      "/events/apertura-03.jpeg",
      "/events/apertura-04.jpeg",
    ],
    free: true,
  },
];

/** Próximo evento (o el único activo). Devuelve null si no hay ninguno en el futuro. */
export function getUpcomingEvent(now: Date = new Date()): EventItem | null {
  const upcoming = EVENTS
    .filter((e) => new Date(e.endISO).getTime() >= now.getTime())
    .sort(
      (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime(),
    );
  return upcoming[0] ?? null;
}

/** Construye URL de Google Calendar para añadir el evento con un click. */
export function googleCalendarUrl(e: EventItem): string {
  const fmt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `BRUTO — ${e.title}`,
    dates: `${fmt(e.startISO)}/${fmt(e.endISO)}`,
    details: e.description,
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
