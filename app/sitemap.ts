import type { MetadataRoute } from "next";

const DOMAIN = "https://vanttagetech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              DOMAIN,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         1,
    },
    {
      url:              `${DOMAIN}/#services`,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.9,
    },
    {
      url:              `${DOMAIN}/#portfolio`,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.8,
    },
    {
      url:              `${DOMAIN}/#about`,
      lastModified:     new Date(),
      changeFrequency:  "yearly",
      priority:         0.7,
    },
    {
      url:              `${DOMAIN}/#contact`,
      lastModified:     new Date(),
      changeFrequency:  "yearly",
      priority:         0.8,
    },
  ];
}
