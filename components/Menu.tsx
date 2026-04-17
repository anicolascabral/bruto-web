import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { applyMenuLocale } from "@/lib/menu-en";
import { getMenuData } from "@/lib/menu";
import { ui } from "@/lib/ui";

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

export default async function Menu({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const { platos, tragos, vinos, ok } = applyMenuLocale(await getMenuData(), locale);
  const hasContent = ok && (platos.length + tragos.length + vinos.length) > 0;

  return (
    <section id="menu" className="bg-black border-t border-white/10">
      <div className="px-6 pt-16 pb-6 flex items-center justify-between border-b border-white/10">
        <h2 className="text-white/40 font-medium text-xs uppercase tracking-widest m-0">
          <span aria-hidden="true">— </span>
          <span className="sr-only">{t.menuSr}</span>
          {t.menuSectionLabel}
        </h2>
        <span className="text-white/40 font-medium text-xs uppercase tracking-widest">
          {t.menuLocation}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
        <MenuCard title={t.menuPlatos} icon="/brand/icon-fork.svg" accent>
          {ok && platos.length > 0 ? (
            <ul className="flex flex-col">
              {platos.map((item) => (
                <li
                  key={item.id}
                  className="py-4 border-b border-black/20 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-black text-xl md:text-2xl tracking-tight leading-tight uppercase">
                      {item.name}
                    </p>
                    {item.priceLabel != null && (
                      <span className="font-black text-lg md:text-xl tabular-nums shrink-0">
                        {item.priceLabel}€
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="font-medium text-sm text-black/60 lowercase mt-0.5">
                      {item.desc}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-medium text-sm text-black/60">{t.menuFallback}</p>
          )}
        </MenuCard>

        <MenuCard title={t.menuTragos} icon="/brand/icon-glass.svg">
          {hasContent ? (
            <>
              {tragos.length > 0 && (
                <ul className="columns-1 md:columns-2 md:gap-x-10">
                  {tragos.map((item) => (
                    <li
                      key={item.id}
                      className="py-4 border-b border-white/10 break-inside-avoid"
                    >
                      <div className="flex items-baseline justify-between gap-x-4">
                        <p className="font-black text-xl md:text-2xl tracking-tight uppercase">
                          {item.name}
                        </p>
                        {item.copa != null && (
                          <span className="font-black text-lg md:text-xl tabular-nums shrink-0">
                            {item.copa}€
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {vinos.length > 0 && (
                <div className={tragos.length > 0 ? "mt-10 pt-8 border-t border-white/20" : ""}>
                  <div className="grid grid-cols-[minmax(0,1fr)_3.75rem_4.75rem] gap-x-3 items-end mb-3">
                    <h4 className="text-white/50 font-medium text-xs uppercase tracking-widest m-0 min-w-0">
                      <span aria-hidden="true">— </span>
                      {t.menuVinos}
                    </h4>
                    <span className="text-white/40 font-medium text-[10px] uppercase tracking-widest text-right">
                      {t.menuCopa}
                    </span>
                    <span className="text-white/40 font-medium text-[10px] uppercase tracking-widest text-right">
                      {t.menuBotella}
                    </span>
                  </div>
                  <ul className="flex flex-col">
                    {vinos.map((item) => (
                      <li
                        key={item.id}
                        className="grid grid-cols-[minmax(0,1fr)_3.75rem_4.75rem] gap-x-3 gap-y-0 items-start py-3 border-b border-white/10 last:border-b-0"
                      >
                        <div className="min-w-0 pr-1">
                          <p
                            className="font-black text-base md:text-lg tracking-tight uppercase leading-snug"
                            id={`vino-${item.id}-title`}
                            {...(item.desc
                              ? { "aria-describedby": `vino-${item.id}-desc` }
                              : {})}
                          >
                            {item.name}
                          </p>
                          {item.desc ? (
                            <p
                              className="font-medium text-sm text-white/50 lowercase mt-1 leading-snug max-w-prose"
                              id={`vino-${item.id}-desc`}
                            >
                              {item.desc}
                            </p>
                          ) : null}
                        </div>
                        <span className="font-black text-base md:text-lg tabular-nums text-right text-white/85 self-start pt-0.5">
                          {item.copa != null ? `${item.copa}€` : (
                            <span className="text-white/25">—</span>
                          )}
                        </span>
                        <span className="font-black text-base md:text-lg tabular-nums text-right text-white/85 self-start pt-0.5">
                          {item.botella != null ? `${item.botella}€` : (
                            <span className="text-white/25">—</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="font-medium text-sm text-white/50">{t.menuFallback}</p>
          )}
        </MenuCard>
      </div>
    </section>
  );
}
