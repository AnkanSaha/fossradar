/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://fossradar.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/submit", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/submit"],
      },
    ],
  },
};
