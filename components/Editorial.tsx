import Image from "next/image";

const plan = [
  { icon: "/brand/icon-glass.svg",  text: "Tapas sin excusa." },
  { icon: "/brand/icon-vinyl.svg",  text: "Vinilos de verdad." },
  { icon: "/brand/icon-bottle.svg", text: "Tragos con criterio." },
  { icon: "/brand/icon-olives.svg", text: "Mesa. Amigos. Tiempo." },
];

export default function Editorial() {
  return (
    <section className="bg-black border-t border-white/10" aria-labelledby="bruto-manifiesto">

      <h2 id="bruto-manifiesto" className="sr-only">
        Qué es BRUTO · un bar de tapas y vinilos en Ibiza
      </h2>

      {/* BRUTO ES BRUTO — full bleed statement */}
      <div className="px-4 pt-24 pb-10 overflow-hidden">
        <p
          className="font-black text-white leading-none"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 18rem)",
            letterSpacing: "-0.04em",
            lineHeight: "0.85",
          }}
        >
          BRUTO
          <br />
          <span className="text-neon">ES</span>
          <br />
          BRUTO.
        </p>
      </div>

      {/* Subtitle */}
      <div className="px-6 pb-20 md:pb-32 border-b border-white/10">
        <p className="font-medium text-white/40 text-base md:text-lg max-w-md tracking-tight">
          Un lugar donde las cosas pasan sin demasiado protocolo, pero con intención.
        </p>
      </div>

      {/* El Plan — iconified list */}
      <div className="px-6 py-16 md:py-24 border-b border-white/10">
        <p className="text-white/30 font-medium text-xs uppercase tracking-widest mb-10">
          — el plan
        </p>
        <ul className="flex flex-col">
          {plan.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-6 md:gap-10 py-5 border-b border-white/10 last:border-b-0 group"
            >
              <span className="w-10 md:w-14 shrink-0 flex justify-center">
                <Image
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 md:h-10 w-auto icon-invert opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                />
              </span>
              <span
                className="font-black text-white group-hover:text-neon transition-colors duration-200"
                style={{
                  fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1",
                }}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Closing line */}
      <div className="px-6 py-16">
        <p
          className="font-black text-white/80 leading-none"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: "0.9",
          }}
        >
          Simple, pero no básico.
          <br />
          Directo, pero con criterio.
          <br />
          Desprolijo en su justa medida.
          <br />
          <span className="text-neon">Y ahí es donde funciona.</span>
        </p>
      </div>
    </section>
  );
}
