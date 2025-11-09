import fs from "fs";
import path from "path";
import toml from "toml";
import { Project, ProjectSchema } from "./schema";

const PROJECTS_DIR = path.join(process.cwd(), "data", "projects");

export interface ProjectWithFilename extends Project {
  filename: string;
}

/**
 * Get all project TOML files
 */
export function getProjectFiles(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".toml"))
    .sort();
}

/**
 * Parse a single TOML file
 */
export function parseProjectFile(filename: string): Project {
  const filePath = path.join(PROJECTS_DIR, filename);
  const content = fs.readFileSync(filePath, "utf-8");

  // Check file size (spam guard: max 10 KB)
  if (content.length > 10240) {
    throw new Error(`File ${filename} exceeds maximum size of 10 KB`);
  }

  const raw = toml.parse(content);
  const parsed = ProjectSchema.parse(raw);

  return parsed;
}

/**
 * Load all projects with validation
 */
export function loadAllProjects(): ProjectWithFilename[] {
  const files = getProjectFiles();
  const projects: ProjectWithFilename[] = [];
  const slugs = new Set<string>();
  const repos = new Set<string>();

  for (const filename of files) {
    try {
      const project = parseProjectFile(filename);

      // Check for duplicate slugs
      if (slugs.has(project.slug)) {
        throw new Error(`Duplicate slug "${project.slug}" found in ${filename}`);
      }
      slugs.add(project.slug);

      // Check for duplicate repos
      const normalizedRepo = project.repo.toLowerCase().replace(/\/$/, "");
      if (repos.has(normalizedRepo)) {
        throw new Error(`Duplicate repository "${project.repo}" found in ${filename}`);
      }
      repos.add(normalizedRepo);

      // Verify filename matches slug
      const expectedFilename = `${project.slug}.toml`;
      if (filename !== expectedFilename) {
        throw new Error(
          `Filename mismatch: expected "${expectedFilename}", got "${filename}"`
        );
      }

      projects.push({
        ...project,
        filename,
      });
    } catch (error) {
      console.error(`Error parsing ${filename}:`, error);
      throw error;
    }
  }

  return projects;
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const filename = `${slug}.toml`;
  const filePath = path.join(PROJECTS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return parseProjectFile(filename);
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

/**
 * Extract owner and repo name from GitHub URL
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") {
      return null;
    }

    const parts = parsed.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");
    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}
