import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/cart"],
      },
    ],
    sitemap: "https://edelvin.com.ua/sitemap.xml",
    host: "https://edelvin.com.ua",
  };
}
