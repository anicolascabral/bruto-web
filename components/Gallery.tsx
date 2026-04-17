import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

const IG_IMAGES = [
  {
    src: "/images/SaveClip.App_670827950_18067227665441382_6865959336694629111_n.jpg",
    altKey: "tapas" as const,
  },
  {
    src: "/images/SaveClip.App_670272052_18066595163441382_297965342487286954_n.jpg",
    altKey: "interior" as const,
  },
  {
    src: "/images/SaveClip.App_662353068_18066594995441382_7157751417801360084_n.jpg",
    altKey: "ambiente" as const,
  },
];

const ALT: Record<typeof IG_IMAGES[number]["altKey"], { es: string; en: string }> = {
  tapas: { es: "BRUTO — tapas & vinilos", en: "BRUTO — tapas & vinyl" },
  interior: { es: "BRUTO — interior", en: "BRUTO — interior" },
  ambiente: { es: "BRUTO — ambiente", en: "BRUTO — atmosphere" },
};

export default function Gallery({ locale }: { locale: Locale }) {
  const t = ui(locale);

  return (
    <section className="bg-black border-t border-white/10">
      <div className="px-6 pt-16 pb-6 flex items-end justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/icon-glass.svg"
            alt=""
            width={18}
            height={24}
            className="h-6 w-auto icon-invert opacity-60"
          />
          <div>
            <h2 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-1 m-0">
              <span aria-hidden="true">— </span>
              {t.galleryTitle}
              <span className="sr-only">{t.gallerySr}</span>
            </h2>
            <a
              href="https://www.instagram.com/bruto.____/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-white text-2xl md:text-3xl tracking-tight hover:text-neon transition-colors duration-150"
            >
              @bruto.____
            </a>
          </div>
        </div>
        <a
          href="https://www.instagram.com/bruto.____/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/20 hover:border-neon hover:text-neon text-white/40 font-medium text-xs uppercase tracking-widest px-4 py-2.5 transition-colors duration-150"
        >
          {t.galleryFollow}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {IG_IMAGES.map((img) => {
          const alt = ALT[img.altKey][locale === "en" ? "en" : "es"];
          return (
            <a
              key={img.src}
              href="https://www.instagram.com/bruto.____/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group block bg-[#111]"
            >
              <Image
                src={img.src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-black text-white text-sm uppercase tracking-[0.22em]">
                  @bruto.____
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="border-t border-white/10 px-6 py-5 flex items-center justify-between">
        <a
          href="https://www.instagram.com/bruto.____/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 font-medium text-xs uppercase tracking-widest hover:text-neon transition-colors duration-150"
        >
          {t.galleryMore}
        </a>
      </div>
    </section>
  );
}
