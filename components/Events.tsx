import EventPoster from "@/components/EventPoster";
import { getUpcomingEvent, googleCalendarUrl } from "@/lib/events";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export default function Events({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const event = getUpcomingEvent();
  if (!event) return null;

  const calendarUrl = googleCalendarUrl(event, locale);
  const title = locale === "en" && event.titleEn ? event.titleEn : event.title;
  const tagline =
    locale === "en" && event.taglineEn ? event.taglineEn : event.tagline;
  const description =
    locale === "en" && event.descriptionEn ? event.descriptionEn : event.description;
  const dateLabel =
    locale === "en" && event.dateLabelEn ? event.dateLabelEn : event.dateLabel;

  return (
    <section
      id="eventos"
      className="bg-black border-t border-white/10"
      aria-labelledby="eventos-h2"
    >
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <h2
          id="eventos-h2"
          className="text-white/40 font-medium text-xs uppercase tracking-widest m-0"
        >
          <span aria-hidden="true">— </span>
          {t.eventsSection}
        </h2>
        <span className="text-neon font-medium text-xs uppercase tracking-widest flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon animate-pulse" aria-hidden="true" />
          {t.eventsNext}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
        <div className="p-8 md:p-12 bg-black flex flex-col justify-between gap-10 md:gap-16">
          <div>
            <p className="text-neon font-medium text-xs uppercase tracking-widest mb-6">
              {dateLabel} · {t.eventsDoors} {event.timeLabel}
            </p>
            <h3
              className="font-black text-white leading-none lowercase mb-8"
              style={{
                fontSize: "clamp(3.75rem, 10vw, 9rem)",
                letterSpacing: "-0.05em",
                lineHeight: "0.85",
              }}
            >
              {title}
            </h3>
            {tagline && (
              <p className="font-black text-neon text-lg md:text-xl uppercase tracking-tight mb-8">
                {tagline}
              </p>
            )}
            <p className="font-medium text-white/60 text-base md:text-lg max-w-md tracking-tight leading-snug">
              {description}
            </p>
            <p className="mt-6 text-white/30 text-xs uppercase tracking-widest font-medium">
              {event.location}
              {event.free && (
                <span className="ml-3 inline-block border border-neon text-neon px-2 py-0.5">
                  {t.eventsFree}
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
              {t.eventsCal}
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-neon hover:text-neon text-white/70 font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150"
            >
              {t.eventsMaps}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-neon hover:text-neon text-white/70 font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150"
            >
              {t.eventsIg}
            </a>
          </div>
        </div>

        <div className="hidden md:block relative bg-neon aspect-square overflow-hidden">
          <EventPoster
            posters={event.posters}
            alt={`BRUTO — ${title}, ${dateLabel}`}
          />
        </div>
      </div>
    </section>
  );
}
