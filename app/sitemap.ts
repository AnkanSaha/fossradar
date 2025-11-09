import { MetadataRoute } from "next";
import { loadAllProjects } from "@/lib/projects";

// Revalidate sitemap every hour to ensure new projects appear
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fossradar.in";
  const projects = loadAllProjects();

  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/radar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Project pages
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.added_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
