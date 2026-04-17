import type { Locale } from "@/lib/locale";
import type { MenuData } from "@/lib/menu";

/**
 * Traducciones curadas por id de ítem (misma fuente que el admin).
 * Si falta una entrada nueva, se muestra el español de la API hasta que se agregue aquí.
 */
const MENU_EN: Partial<
  Record<number, { name?: string; desc?: string }>
> = {
  // Platos
  1: {
    name: "Uruguayan chivito with fries",
    desc: "Sirloin, tomato, lettuce, mayo, bacon, ham & cheese, hard-boiled egg",
  },
  2: {
    name: "Spinach malfatti",
    desc: "With curry cream",
  },
  3: {
    name: "Milanese with fries",
  },
  4: {
    name: "Milanese Napolitana with fries",
  },
  5: {
    name: "Patagonian squid",
    desc: "Pelayo-style with oven-roast potatoes",
  },
  6: {
    name: "Garlic prawns",
    desc: "With oven-roast potatoes",
  },
  7: {
    name: "Mediterranean aubergine",
    desc: "Mozzarella, rocket, cured ham, parmesan, tomato reduction",
  },
  33: {
    name: "Dessert",
    desc: "Chocolate salami / apple crunch",
  },
  34: {
    name: "Side of fries",
  },
  35: {
    name: "Caramelized pear salad",
    desc: "Greens, caramelized pear, Roquefort, almonds",
  },
  36: {
    name: "Gildas x3",
  },
  37: {
    name: "Croquettes x4",
    desc: "Shrimp",
  },
  // Tragos
  8: { name: "Cañita (small draft)" },
  9: { name: "Draft beer" },
  10: { name: "Mini Mojito" },
  11: { name: "Mini Caipirinha" },
  12: { name: "Spirits & mixer" },
  13: { name: "Aperol" },
  14: { name: "Americano" },
  15: { name: "Negroni" },
  16: { name: "Margarita" },
  17: { name: "Mezcalinha" },
  19: { name: "Johnnie Walker Red Label" },
  20: { name: "Johnnie Walker Black Label" },
  21: { name: "Non-alcoholic cocktail" },
  22: { name: "Soft drink" },
  23: { name: "Water" },
  38: { name: "Bloody Mary" },
  39: { name: "Espresso Martini" },
  // Vinos — nombres propios; solo desc region/uva
  24: { name: "Marqués de Vizhoja", desc: "Albariño" },
  25: { name: "Bardos", desc: "Verdejo" },
  26: { name: "Cava" },
  27: { name: "Bideona Laderas", desc: "Rioja" },
  28: { name: "Aniago", desc: "Ribera del Duero" },
  29: { name: "Pepe Yllera", desc: "Ribera del Duero" },
  30: { name: "Garzón", desc: "Uruguayan Tannat" },
  31: { name: "Viñas del Vero", desc: "Somontano" },
  32: { name: "L'Arnaude" },
};

export function applyMenuLocale(data: MenuData, locale: Locale): MenuData {
  if (locale === "es") return data;
  return {
    ...data,
    platos: data.platos.map((p) => {
      const t = MENU_EN[p.id];
      if (!t) return p;
      return {
        ...p,
        name: t.name ?? p.name,
        desc: t.desc !== undefined ? t.desc : p.desc,
      };
    }),
    tragos: data.tragos.map((t) => {
      const tr = MENU_EN[t.id];
      if (!tr) return t;
      return { ...t, name: tr.name ?? t.name };
    }),
    vinos: data.vinos.map((v) => {
      const tr = MENU_EN[v.id];
      if (!tr) return v;
      return {
        ...v,
        name: tr.name ?? v.name,
        desc: tr.desc !== undefined ? tr.desc : v.desc,
      };
    }),
  };
}
