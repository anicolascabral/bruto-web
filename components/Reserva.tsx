import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

const waNumber = site.phone.replace(/[^0-9]/g, "");
const waUrl = (text: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

type Opcion = {
  id: string;
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  waText: string;
  accent?: boolean;
};

function opcionesForLocale(locale: Locale): Opcion[] {
  const o = ui(locale).reservaOptions;
  return [
    {
      id: "cumpleanos",
      number: "01",
      icon: "/brand/icon-bottle.svg",
      title: o.cumple.title,
      subtitle: o.cumple.sub,
      body: o.cumple.body,
      cta: o.cumple.cta,
      waText: o.cumple.wa,
    },
    {
      id: "evento-privado",
      number: "02",
      icon: "/brand/icon-glass.svg",
      title: o.privado.title,
      subtitle: o.privado.sub,
      body: o.privado.body,
      cta: o.privado.cta,
      waText: o.privado.wa,
      accent: true,
    },
    {
      id: "traeturvinilo",
      number: "03",
      icon: "/brand/icon-vinyl.svg",
      title: o.vinilo.title,
      subtitle: o.vinilo.sub,
      body: o.vinilo.body,
      cta: o.vinilo.cta,
      waText: o.vinilo.wa,
    },
  ];
}

function OpcionCard({ o }: { o: Opcion }) {
  const isAccent = !!o.accent;
  return (
    <a
      href={waUrl(o.waText)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${o.title} — WhatsApp`}
      className={`p-8 md:p-10 flex flex-col gap-10 group transition-colors duration-200
        ${
          isAccent
            ? "bg-neon text-black hover:bg-black hover:text-white"
            : "bg-black text-white hover:bg-neon hover:text-black"
        }`}
    >
      <div className="flex items-start justify-between">
        <Image
          src={o.icon}
          alt=""
          width={44}
          height={60}
          className={`h-14 md:h-16 w-auto transition-[filter] duration-200
            ${
              isAccent
                ? "group-hover:invert"
                : "invert group-hover:invert-0"
            }`}
        />
        <span className="text-xs uppercase tracking-widest font-medium opacity-50">
          {o.number}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h3
          className="font-black leading-none tracking-tight"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {o.title}
        </h3>
        <p className="font-medium text-xs uppercase tracking-widest opacity-60">
          {o.subtitle}
        </p>
        <p className="font-medium text-sm md:text-base leading-snug opacity-80 max-w-xs mt-2">
          {o.body}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
        <span>{o.cta}</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </a>
  );
}

export default function Reserva({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const mailSubject =
    locale === "en" ? "Event at BRUTO" : "Evento en BRUTO";

  return (
    <section
      id="reservas"
      className="bg-black border-t border-white/10"
      aria-labelledby="reservas-h2"
    >
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <h2
          id="reservas-h2"
          className="text-white/40 font-medium text-xs uppercase tracking-widest m-0"
        >
          <span aria-hidden="true">— </span>
          {t.reservaSection}
        </h2>
        <span className="text-white/40 font-medium text-xs uppercase tracking-widest">
          {t.reservaTags}
        </span>
      </div>

      <div className="px-6 pt-16 pb-10 border-b border-white/10 overflow-hidden">
        <p
          className="font-black text-white leading-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            letterSpacing: "-0.05em",
            lineHeight: "0.88",
          }}
        >
          {t.reservaLine1}
          <br />
          <span className="text-neon">{t.reservaLine2}</span>
        </p>
        <p className="mt-10 font-medium text-white/50 text-base md:text-lg max-w-xl tracking-tight leading-snug">
          {locale === "es" ? (
            <>
              Sin reserva. Entrás, buscás lugar, te sentás.
              <br />
              Para una noche <span className="text-white">a medida</span> — cumple,
              privado, tus vinilos en la bandeja — la armamos juntos.
            </>
          ) : (
            <>
              No reservations. Walk in, find a seat, sit down.
              <br />
              For a <span className="text-white">tailored</span> night — birthday,
              private, your vinyl on the decks — we set it up together.
            </>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {opcionesForLocale(locale).map((o) => (
          <OpcionCard key={o.id} o={o} />
        ))}
      </div>

      <div className="border-t border-white/10 px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-white/40 text-sm font-medium tracking-tight">
          {t.reservaMail}{" "}
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(mailSubject)}`}
            className="text-white/80 hover:text-neon underline decoration-white/30 underline-offset-4 transition-colors duration-150"
          >
            {site.email}
          </a>
        </p>
        <a
          href={`tel:${site.phone}`}
          className="text-white/70 font-medium text-xs uppercase tracking-widest hover:text-neon transition-colors duration-150"
        >
          {t.reservaPhone} {site.phonePretty} →
        </a>
      </div>
    </section>
  );
}
