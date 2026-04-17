"use client";

import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { pathPrefix, ui } from "@/lib/ui";

export default function Nav({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const p = pathPrefix(locale);
  const otherHref = locale === "en" ? "/" : "/en";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference">
      <div className="flex items-center gap-3">
        <Image
          src="/brand/bruto-logo.svg"
          alt="BRUTO"
          width={107}
          height={20}
          priority
          className="h-4 w-auto icon-invert"
        />
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-white font-medium text-xs uppercase tracking-[0.22em]">
        <div className="hidden sm:flex items-center gap-2 opacity-80">
          <Image src="/brand/icon-glass.svg" alt="" width={14} height={18} className="h-4 w-auto icon-invert" />
          <Image src="/brand/icon-fork.svg" alt="" width={14} height={18} className="h-4 w-auto icon-invert" />
          <Image src="/brand/icon-vinyl.svg" alt="" width={18} height={18} className="h-4 w-auto icon-invert" />
        </div>
        <a href={`${p}#eventos`} className="hover:text-neon transition-colors duration-150">
          {t.navEvents}
        </a>
        <a href={`${p}#menu`} className="hover:text-neon transition-colors duration-150">
          {t.navMenu}
        </a>
        <a href={`${p}#reservas`} className="hidden md:inline hover:text-neon transition-colors duration-150">
          {t.navReservas}
        </a>
        <a href={`${p}#footer`} className="hover:text-neon transition-colors duration-150">
          {t.navLocation}
        </a>
        <a
          href={otherHref}
          lang={locale === "en" ? "es" : "en"}
          className="text-white/50 hover:text-neon transition-colors duration-150 min-w-[1.75rem] text-center"
        >
          {t.navLangSwitch}
        </a>
      </div>
    </nav>
  );
}
