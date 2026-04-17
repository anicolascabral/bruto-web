import Image from "next/image";

const hours = [
  { day: "Lunes", time: "18:00 — 01:00" },
  { day: "Martes", time: "Cerrado" },
  { day: "Miércoles", time: "18:00 — 01:00" },
  { day: "Jueves", time: "18:00 — 01:00" },
  { day: "Viernes", time: "18:00 — 01:00" },
  { day: "Sábado", time: "18:00 — 01:00" },
  { day: "Domingo", time: "18:00 — 01:00" },
];

const ICON_STRIP = [
  { src: "/brand/icon-bottle.svg", w: 24, h: 64 },
  { src: "/brand/icon-olives.svg", w: 56, h: 60 },
  { src: "/brand/icon-notes.svg",  w: 50, h: 60 },
  { src: "/brand/icon-glass.svg",  w: 36, h: 56 },
  { src: "/brand/icon-fork.svg",   w: 28, h: 60 },
  { src: "/brand/icon-vinyl.svg",  w: 46, h: 62 },
];

export default function Footer() {
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
  });
  const todayFormatted = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <footer id="footer" className="bg-black border-t border-white/10">
      {/* Big location text */}
      <div className="px-6 pt-20 pb-16 border-b border-white/10 overflow-hidden">
        <p
          className="font-black text-white/70 leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 14vw, 14rem)",
            letterSpacing: "-0.05em",
            lineHeight: "0.88",
          }}
        >
          IBIZA
        </p>
      </div>

      {/* Iconography strip — same lineup as the brand PDF */}
      <div className="border-b border-white/10 py-10 overflow-hidden">
        <div className="flex items-end justify-center gap-8 md:gap-14 flex-wrap opacity-60">
          {ICON_STRIP.map((i) => (
            <Image
              key={i.src}
              src={i.src}
              alt=""
              width={i.w}
              height={i.h}
              className="h-10 md:h-14 w-auto icon-invert"
            />
          ))}
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
        {/* Address */}
        <div className="px-6 py-10 border-b md:border-b-0 md:border-r border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">
            Dirección
          </p>
          <a
            href="https://share.google/s5jRnc5OYu4hfFSJ6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-white text-xl md:text-2xl tracking-tight leading-tight hover:text-neon transition-colors duration-150 block"
          >
            Isidoro Macabich 30
            <br />
            Santa Eulària des Riu
            <br />
            <span className="text-neon">Ibiza</span>, 07840
          </a>
          <p className="mt-4 text-white/30 text-xs uppercase tracking-widest font-medium">
            Cómo llegar →
          </p>
        </div>

        {/* Hours */}
        <div className="px-6 py-10 border-b md:border-b-0 md:border-r border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">
            Horario
          </p>
          <ul className="flex flex-col gap-1">
            {hours.map((h) => (
              <li
                key={h.day}
                className={`flex justify-between text-sm font-medium ${
                  h.day === todayFormatted
                    ? "text-neon"
                    : h.time === "Cerrado"
                    ? "text-white/20"
                    : "text-white/70"
                }`}
              >
                <span>{h.day}</span>
                <span className="tabular-nums">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="px-6 py-10">
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">
            Contacto
          </p>
          <a
            href="tel:+34652571708"
            className="font-black text-white text-xl md:text-2xl tracking-tight hover:text-neon transition-colors duration-150 block mb-2"
          >
            652 57 17 08
          </a>
          <a
            href="mailto:contacto@brutobar.com"
            className="font-medium text-white/70 text-sm tracking-tight hover:text-neon transition-colors duration-150 block break-all"
          >
            contacto@brutobar.com
          </a>
          <p className="text-white/40 text-sm font-medium mt-6 flex items-center gap-2">
            <Image
              src="/brand/icon-fork.svg"
              alt=""
              width={10}
              height={14}
              className="h-3 w-auto icon-invert opacity-60"
            />
            tapas &amp; vinilos
          </p>
        </div>
      </div>

      {/* Bottom bar — mini wordmark */}
      <div className="px-6 py-5 flex items-center justify-between">
        <Image
          src="/brand/bruto-logo.svg"
          alt="BRUTO"
          width={64}
          height={12}
          className="h-3 w-auto icon-invert opacity-40"
        />
        <span className="text-white/20 text-xs font-medium uppercase tracking-widest">
          tapas &amp; vinilos — ibiza
        </span>
      </div>
    </footer>
  );
}
