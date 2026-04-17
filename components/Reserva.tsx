import Image from "next/image";
import { site } from "@/lib/site";

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

const OPCIONES: Opcion[] = [
  {
    id: "cumpleanos",
    number: "01",
    icon: "/brand/icon-bottle.svg",
    title: "Cumpleaños",
    subtitle: "tu noche, tu playlist",
    body:
      "Reservamos la mesa larga, armamos la carta a medida y te dejamos la bandeja un rato. Sin protocolo — con intención.",
    cta: "Armar mi cumple",
    waText:
      "Hola BRUTO! Me gustaría armar mi cumpleaños en el bar. ¿Me pasan info?",
  },
  {
    id: "evento-privado",
    number: "02",
    icon: "/brand/icon-glass.svg",
    title: "Evento privado",
    subtitle: "despedida · launch · cena",
    body:
      "Tus amigos, nuestro lugar. Carta BRUTO, selección en vinilo, y el horario lo marcás vos.",
    cta: "Consultar disponibilidad",
    waText:
      "Hola BRUTO! Quería consultar por un evento privado. ¿Me cuentan cómo funciona?",
    accent: true,
  },
  {
    id: "traeturvinilo",
    number: "03",
    icon: "/brand/icon-vinyl.svg",
    title: "Traé tu vinilo",
    subtitle: "open decks · noche de curadores",
    body:
      "¿Coleccionás vinilos? La bandeja es tuya un rato. Elegimos día, hora, y lo pasás.",
    cta: "Quiero pinchar",
    waText:
      "Hola BRUTO! Quiero llevar mis vinilos a pinchar un rato. ¿Qué día puedo?",
  },
];

function OpcionCard({ o }: { o: Opcion }) {
  const isAccent = !!o.accent;
  return (
    <a
      href={waUrl(o.waText)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${o.title} — hablar por WhatsApp`}
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

export default function Reserva() {
  return (
    <section
      id="reservas"
      className="bg-black border-t border-white/10"
      aria-labelledby="reservas-h2"
    >
      {/* Section label */}
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <h2
          id="reservas-h2"
          className="text-white/40 font-medium text-xs uppercase tracking-widest m-0"
        >
          <span aria-hidden="true">— </span>reservas &amp; eventos
        </h2>
        <span className="text-white/40 font-medium text-xs uppercase tracking-widest">
          cumpleaños · privados · open decks
        </span>
      </div>

      {/* Statement */}
      <div className="px-6 pt-16 pb-10 border-b border-white/10 overflow-hidden">
        <p
          className="font-black text-white leading-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            letterSpacing: "-0.05em",
            lineHeight: "0.88",
          }}
        >
          tu noche
          <br />
          <span className="text-neon">en bruto.</span>
        </p>
        <p className="mt-10 font-medium text-white/50 text-base md:text-lg max-w-xl tracking-tight leading-snug">
          Sin reserva. Entrás, buscás lugar, te sentás.
          <br />
          Para una noche <span className="text-white">a medida</span> — cumple,
          privado, tus vinilos en la bandeja — la armamos juntos.
        </p>
      </div>

      {/* Three options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {OPCIONES.map((o) => (
          <OpcionCard key={o.id} o={o} />
        ))}
      </div>

      {/* Alt contact footer */}
      <div className="border-t border-white/10 px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-white/40 text-sm font-medium tracking-tight">
          ¿Preferís mail?{" "}
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              "Evento en BRUTO",
            )}`}
            className="text-white/80 hover:text-neon underline decoration-white/30 underline-offset-4 transition-colors duration-150"
          >
            {site.email}
          </a>
        </p>
        <a
          href={`tel:${site.phone}`}
          className="text-white/70 font-medium text-xs uppercase tracking-widest hover:text-neon transition-colors duration-150"
        >
          O llamá · {site.phonePretty} →
        </a>
      </div>
    </section>
  );
}
