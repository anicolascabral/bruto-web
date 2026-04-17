"use client";

import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference">
      <div className="flex items-center gap-3">
        {/* Mini logo — the BRUTO wordmark on the awning/cartel */}
        <Image
          src="/brand/bruto-logo.svg"
          alt="BRUTO"
          width={107}
          height={20}
          priority
          className="h-4 w-auto icon-invert"
        />
      </div>

      <div className="flex items-center gap-6 text-white font-medium text-xs uppercase tracking-[0.22em]">
        {/* Iconography pulled from the brand PDF */}
        <div className="hidden sm:flex items-center gap-2 opacity-80">
          <Image src="/brand/icon-glass.svg" alt="" width={14} height={18} className="h-4 w-auto icon-invert" />
          <Image src="/brand/icon-fork.svg" alt="" width={14} height={18} className="h-4 w-auto icon-invert" />
          <Image src="/brand/icon-vinyl.svg" alt="" width={18} height={18} className="h-4 w-auto icon-invert" />
        </div>
        <a href="#menu" className="hover:text-neon transition-colors duration-150">
          Menú
        </a>
        <a href="#footer" className="hover:text-neon transition-colors duration-150">
          Ubicación
        </a>
      </div>
    </nav>
  );
}
