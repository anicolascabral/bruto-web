import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: { "es-ES": `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: { "es-ES": `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
    { url: `${SITE_URL}/#menu`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/#footer`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
