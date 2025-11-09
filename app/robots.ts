import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/submit"],
      },
    ],
    sitemap: "https://fossradar.in/sitemap.xml",
  };
}
