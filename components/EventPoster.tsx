"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  posters: string[];
  alt: string;
};

/**
 * Muestra un afiche del evento elegido al azar en cada carga.
 * SSR: siempre el primero (estable, sin hydration mismatch).
 * Cliente: selecciona uno al azar al montar y hace crossfade suave.
 */
export default function EventPoster({ posters, alt }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (posters.length <= 1) return;
    setIndex(Math.floor(Math.random() * posters.length));
  }, [posters.length]);

  const src = posters[index] ?? posters[0];

  return (
    <div className="absolute inset-0 p-5 md:p-10">
      <div className="relative w-full h-full">
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center animate-[poster-in_260ms_ease-out]"
          priority
        />
      </div>
    </div>
  );
}
