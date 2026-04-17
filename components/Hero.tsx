import Image from "next/image";
import BrutoLogo from "./BrutoLogo";

const HERO_ICONS = [
  { src: "/brand/icon-bottle.svg", label: "bottle", w: 28, h: 72 },
  { src: "/brand/icon-olives.svg", label: "olives", w: 60, h: 64 },
  { src: "/brand/icon-notes.svg",  label: "notes",  w: 56, h: 64 },
  { src: "/brand/icon-glass.svg",  label: "glass",  w: 40, h: 60 },
  { src: "/brand/icon-fork.svg",   label: "fork",   w: 32, h: 64 },
  { src: "/brand/icon-vinyl.svg",  label: "vinyl",  w: 52, h: 66 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-neon flex flex-col justify-between overflow-hidden">

      {/* Logo — full width, fills the hero */}
      <div className="flex-1 flex items-center px-4 pt-24 pb-4">
        <BrutoLogo className="w-full text-black" />
      </div>

      {/* Iconography strip — lifted straight from the brand PDF */}
      <div className="px-6 pb-6 border-t border-black/10 pt-6">
        <div className="flex items-end justify-center gap-8 md:gap-14 flex-wrap">
          {HERO_ICONS.map((i) => (
            <Image
              key={i.label}
              src={i.src}
              alt=""
              width={i.w}
              height={i.h}
              className="h-12 md:h-16 w-auto"
              priority
            />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between px-6 pb-8 border-t border-black/10 pt-5">
        <p className="font-medium text-black text-xl md:text-2xl lowercase tracking-tight leading-tight">
          tapas
          <br />
          &amp; vinilos
        </p>

        <div className="flex flex-col items-end gap-3">
          <a
            href="https://www.instagram.com/bruto.____/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black/50 text-xs uppercase tracking-widest hover:text-black transition-colors duration-150"
          >
            @bruto.____
          </a>
          <div className="w-px h-8 bg-black/30 ml-auto" />
        </div>
      </div>
    </section>
  );
}
