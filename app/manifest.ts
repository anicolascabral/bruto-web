import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BRUTO — tapas & vinilos",
    short_name: "BRUTO",
    description:
      "Bar de tapas y vinilos en Santa Eulària des Riu, Ibiza. Tapas, tragos y música en vinilo todas las noches.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#E6FF7B",
    orientation: "portrait",
    lang: "es-ES",
    categories: ["food", "lifestyle", "music", "travel"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  };
}
