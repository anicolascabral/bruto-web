import Image from "next/image";

const platos = [
  {
    name: "CHIVITO",
    desc: "lomo, jamón, queso, lechuga, tomate, huevo y mayonesa",
  },
  { name: "TORTILLA", desc: "" },
  { name: "EMPANADA", desc: "de carne / j&q / humita" },
  { name: "CROQUETA", desc: "jamón ibérico" },
];

const tragos = [
  { name: "CAÑA" },
  { name: "NEGRONI" },
  { name: "AMERICANO" },
  { name: "FERNET" },
  { name: "WHISKEY" },
  { name: "RONCOLA" },
  { name: "GIN TONIC" },
  { name: "COPA DE VINO" },
];

function MenuCard({
  title,
  icon,
  children,
  accent = false,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`p-8 md:p-12 flex flex-col gap-0 ${
        accent ? "bg-neon text-black" : "bg-black text-white border border-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-10">
        <h3
          className="font-black leading-none"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            letterSpacing: "-0.05em",
            lineHeight: "0.88",
          }}
        >
          {title}
        </h3>
        <Image
          src={icon}
          alt=""
          width={60}
          height={90}
          className={`h-16 md:h-24 w-auto shrink-0 ${accent ? "" : "icon-invert"}`}
        />
      </div>
      {children}
    </div>
  );
}

export default function Menu() {
  return (
    <section id="menu" className="bg-black border-t border-white/10">
      {/* Section label */}
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <span className="text-white/40 font-medium text-xs uppercase tracking-widest">
          — menú
        </span>
        <span className="text-white/40 font-medium text-xs uppercase tracking-widest">
          Santa Eulària · Ibiza
        </span>
      </div>

      {/* Two-column menu layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
        <MenuCard title="platos" icon="/brand/icon-fork.svg" accent>
          <ul className="flex flex-col">
            {platos.map((item) => (
              <li
                key={item.name}
                className="py-4 border-b border-black/20 last:border-b-0"
              >
                <p className="font-black text-xl md:text-2xl tracking-tight leading-tight">
                  {item.name}
                </p>
                {item.desc && (
                  <p className="font-medium text-sm text-black/60 lowercase mt-0.5">
                    {item.desc}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </MenuCard>

        <MenuCard title="tragos" icon="/brand/icon-glass.svg">
          <ul className="flex flex-col">
            {tragos.map((item) => (
              <li
                key={item.name}
                className="py-4 border-b border-white/10 last:border-b-0"
              >
                <p className="font-black text-xl md:text-2xl tracking-tight">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </MenuCard>
      </div>
    </section>
  );
}
