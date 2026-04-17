import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

function Stars({ aria }: { aria: string }) {
  return (
    <div
      className="flex items-center gap-1 text-neon leading-none"
      role="img"
      aria-label={aria}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.05em" }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const reviewAria =
    locale === "en" ? "Leave a review on Google" : "Dejar una reseña en Google";

  return (
    <section
      id="reseñas"
      className="bg-black border-t border-white/10"
      aria-labelledby="reviews-h2"
    >
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <h2
          id="reviews-h2"
          className="text-white/40 font-medium text-xs uppercase tracking-widest m-0"
        >
          <span aria-hidden="true">— </span>
          {t.reviewsSection}
        </h2>
        <span className="text-white/40 font-medium text-xs uppercase tracking-widest hidden sm:inline">
          {t.reviewsTag}
        </span>
      </div>

      <div className="px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end border-b border-white/10">
        <div>
          <p
            className="font-black text-white leading-none lowercase"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 7rem)",
              letterSpacing: "-0.05em",
              lineHeight: "0.88",
            }}
          >
            {t.reviewsH1a}
            <br />
            <span className="text-neon">{t.reviewsH1b}</span>
          </p>
          <p className="mt-8 font-medium text-white/50 text-base md:text-lg max-w-xl tracking-tight leading-snug">
            {t.reviewsBody}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-6">
          <Stars aria={t.reviewsStarsAria} />
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={reviewAria}
            className="inline-flex items-center gap-2 border border-neon bg-neon hover:bg-transparent hover:text-neon text-black font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-150 self-start md:self-auto"
          >
            {t.reviewsCta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
