import EventPoster from "@/components/EventPoster";
import { getUpcomingEvent, googleCalendarUrl } from "@/lib/events";
import { site } from "@/lib/site";

export default function Events() {
  const event = getUpcomingEvent();
  if (!event) return null;

  const calendarUrl = googleCalendarUrl(event);

  return (
    <section
      id="eventos"
      className="bg-black border-t border-white/10"
      aria-labelledby="eventos-h2"
    >
      {/* Section label */}
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <h2
          id="eventos-h2"
          className="text-white/40 font-medium text-xs uppercase tracking-widest m-0"
        >
          <span aria-hidden="true">— </span>eventos
        </h2>
        <span className="text-neon font-medium text-xs uppercase tracking-widest flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon animate-pulse" aria-hidden="true" />
          próximo
        </span>
      </div>

      {/* Two-column: meta + poster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
        {/* Left · Meta / copy */}
        <div className="p-8 md:p-12 bg-black flex flex-col justify-between gap-10 md:gap-16">
          <div>
            <p className="text-neon font-medium text-xs uppercase tracking-widest mb-6">
              {event.dateLabel} · puertas {event.timeLabel}
            </p>
            <h3
              className="font-black text-white leading-none lowercase mb-8"
              style={{
                fontSize: "clamp(3.75rem, 10vw, 9rem)",
                letterSpacing: "-0.05em",
                lineHeight: "0.85",
              }}
            >
              {event.title}
            </h3>
            {event.tagline && (
              <p className="font-black text-neon text-lg md:text-xl uppercase tracking-tight mb-8">
                {event.tagline}
              </p>
            )}
            <p className="font-medium text-white/60 text-base md:text-lg max-w-md tracking-tight leading-snug">
              {event.description}
            </p>
            <p className="mt-6 text-white/30 text-xs uppercase tracking-widest font-medium">
              {event.location}
              {event.free && (
                <span className="ml-3 inline-block border border-neon text-neon px-2 py-0.5">
                  entrada libre
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neon bg-neon hover:bg-transparent hover:text-neon text-black font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150"
            >
              Añadir al calendario
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-neon hover:text-neon text-white/70 font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150"
            >
              Cómo llegar
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-neon hover:text-neon text-white/70 font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150"
            >
              Ver en Instagram
            </a>
          </div>
        </div>

        {/* Right · Poster (random on each reload) — desktop only */}
        <div className="hidden md:block relative bg-neon aspect-square overflow-hidden">
          <EventPoster
            posters={event.posters}
            alt={`BRUTO — ${event.title}, ${event.dateLabel}`}
          />
        </div>
      </div>
    </section>
  );
}
