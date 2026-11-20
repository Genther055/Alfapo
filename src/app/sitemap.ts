import { MetadataRoute } from "next";
import { CATALOG_CLUSTERS } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://edelvin.com.ua";
  const now = new Date();

  // Головні сторінки сайту
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/print`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/capabilities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/b2b`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Динамічні сторінки виробів з каталогу
  const productSlugs = new Set<string>();
  const catalogPages: MetadataRoute.Sitemap = [];

  CATALOG_CLUSTERS.forEach((cluster) => {
    cluster.items.forEach((item) => {
      if (!productSlugs.has(item.slug)) {
        productSlugs.add(item.slug);
        catalogPages.push({
          url: `${baseUrl}/catalog/${item.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    });
  });

  return [...mainPages, ...catalogPages];
}
