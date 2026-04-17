import { cache } from "react";
import type { Locale } from "@/lib/locale";

const MENU_ITEMS_URL =
  process.env.MENU_ITEMS_URL?.replace(/\/$/, "") ??
  "https://menu-bruta.simpled.app/api/items";

type MenuApiItem = {
  id: number;
  name: string;
  description: string;
  type: "comida" | "trago";
  active: number;
  price: number | null;
  price_copa: number | null;
  price_botella: number | null;
  sort_order: number;
};

export type PlatosRow = {
  id: number;
  name: string;
  desc: string;
  priceLabel: string | null;
};

export type TragosRow = {
  id: number;
  name: string;
  copa: string | null;
};

export type VinosRow = {
  id: number;
  name: string;
  /** Origen, uva, nota corta — desde el admin (campo descripción). */
  desc: string;
  copa: string | null;
  botella: string | null;
};

export type MenuData = {
  ok: boolean;
  platos: PlatosRow[];
  tragos: TragosRow[];
  vinos: VinosRow[];
};

function formatPrice(val: number | null | undefined): string | null {
  if (val == null) return null;
  return Number.isInteger(val) ? String(val) : val.toFixed(1);
}

/**
 * Orden de venta curado por marketing / menu engineering.
 * Los ids listados aparecen PRIMERO y en este orden exacto.
 * Los ids que no estén en la lista caen al final, ordenados por `sort_order` del admin.
 * Si un id aquí ya no existe en la API (ítem borrado), simplemente se ignora.
 * Si aparece un ítem nuevo en el admin, se añade al final hasta que lo incluyas aquí.
 */
const CURATED_ORDER = {
  platos: [
    1, // Chivito Uruguayo — firma
    4, // Milanesa napolitana — ancla de precio alto
    3, // Milanesa con fritas
    5, // Calamar patagónico
    6, // Gambas al ajillo
    7, // Berenjena mediterránea
    2, // Malfatti de espinaca
    35, // Ensalada de pera caramelizada
    37, // Croquetas x4
    36, // Gildas x3
    34, // Porción de fritas
    33, // Postre — cierre
  ],
  tragos: [
    15, // Negroni — firma listening bar
    14, // Americano
    13, // Aperol
    39, // Espresso Martini
    16, // Margarita
    17, // Mezcalinha — ancla alta
    38, // Bloody Mary
    20, // Whisky Johnnie Negro
    19, // Whisky Johnnie Rojo
    12, // Combinados
    10, // Mini Mojito
    11, // Mini Caipi
    21, // Coctel sin alcohol
    9, // Caña
    8, // Cañita
    22, // Refresco
    23, // Agua
  ],
  vinos: [
    24, // Marqués de Vizhoja — Albariño
    25, // Bardos — Verdejo
    26, // Cava
    27, // Bideona Laderas — Rioja
    31, // Viñas del Vero — Somontano
    28, // Aniago — Ribera
    29, // Pepe Yllera — Ribera (sólo botella)
    32, // L'Arnaude
    30, // Garzón Tannat — cierre con identidad uruguaya
  ],
} as const;

function sortByCurated<T extends { id: number }>(
  items: T[],
  curated: readonly number[],
  fallbackKey: (t: T) => number,
): T[] {
  const rank = new Map<number, number>();
  curated.forEach((id, idx) => rank.set(id, idx));
  return [...items].sort((a, b) => {
    const ra = rank.get(a.id);
    const rb = rank.get(b.id);
    if (ra != null && rb != null) return ra - rb;
    if (ra != null) return -1;
    if (rb != null) return 1;
    return fallbackKey(a) - fallbackKey(b);
  });
}

/** Server-only: cached + deduped across layout + Menu in one request. */
export const getMenuData = cache(async (): Promise<MenuData> => {
  try {
    const res = await fetch(MENU_ITEMS_URL, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(String(res.status));
    const items = (await res.json()) as MenuApiItem[];
    const active = items.filter((i) => i.active);
    const comida = sortByCurated(
      active.filter((i) => i.type === "comida"),
      CURATED_ORDER.platos,
      (i) => i.sort_order,
    );
    const tragoRaw = active.filter((i) => i.type === "trago");
    const tragosOnly = sortByCurated(
      tragoRaw.filter((i) => i.price_botella == null),
      CURATED_ORDER.tragos,
      (i) => i.sort_order,
    );
    const vinos = sortByCurated(
      tragoRaw.filter((i) => i.price_botella != null),
      CURATED_ORDER.vinos,
      (i) => i.sort_order,
    );

    return {
      ok: true,
      platos: comida.map((i) => ({
        id: i.id,
        name: i.name,
        desc: (i.description ?? "").trim(),
        priceLabel: formatPrice(i.price),
      })),
      tragos: tragosOnly.map((i) => ({
        id: i.id,
        name: i.name,
        copa: formatPrice(i.price_copa),
      })),
      vinos: vinos.map((i) => ({
        id: i.id,
        name: i.name,
        desc: (i.description ?? "").trim(),
        copa: formatPrice(i.price_copa),
        botella: formatPrice(i.price_botella),
      })),
    };
  } catch {
    return { ok: false, platos: [], tragos: [], vinos: [] };
  }
});

type SchemaMenuItem = {
  "@type": "MenuItem";
  name: string;
  description?: string;
  offers?: unknown | unknown[];
};

export function menuDataToSchemaMenuItems(
  data: MenuData,
  locale: Locale = "es",
): {
  platos: SchemaMenuItem[];
  tragos: SchemaMenuItem[];
  vinos: SchemaMenuItem[];
} {
  const glass = locale === "en" ? "Glass" : "Copa";
  const bottle = locale === "en" ? "Bottle" : "Botella";
  const platos: SchemaMenuItem[] = data.platos.map((p) => {
    const item: SchemaMenuItem = {
      "@type": "MenuItem",
      name: p.name,
      ...(p.desc ? { description: p.desc } : {}),
    };
    if (p.priceLabel != null) {
      item.offers = {
        "@type": "Offer",
        price: p.priceLabel,
        priceCurrency: "EUR",
      };
    }
    return item;
  });

  const tragos: SchemaMenuItem[] = data.tragos.map((t) => {
    const item: SchemaMenuItem = {
      "@type": "MenuItem",
      name: t.name,
    };
    if (t.copa != null) {
      item.offers = {
        "@type": "Offer",
        price: t.copa,
        priceCurrency: "EUR",
      };
    }
    return item;
  });

  const vinos: SchemaMenuItem[] = data.vinos.map((v) => {
    const offers: unknown[] = [];
    if (v.copa != null) {
      offers.push({
        "@type": "Offer",
        name: glass,
        price: v.copa,
        priceCurrency: "EUR",
      });
    }
    if (v.botella != null) {
      offers.push({
        "@type": "Offer",
        name: bottle,
        price: v.botella,
        priceCurrency: "EUR",
      });
    }
    const item: SchemaMenuItem = {
      "@type": "MenuItem",
      name: v.name,
      ...(v.desc ? { description: v.desc } : {}),
      ...(offers.length > 0 ? { offers } : {}),
    };
    return item;
  });

  return { platos, tragos, vinos };
}
