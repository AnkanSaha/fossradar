import fs from "fs";
import path from "path";
import toml from "toml";

export interface TagsConfig {
  tags: string[];
}

export interface LicensesConfig {
  licenses: string[];
}

let tagsCache: Set<string> | null = null;
let licensesCache: Set<string> | null = null;

export function loadTags(): Set<string> {
  if (tagsCache) return tagsCache;

  const tagsPath = path.join(process.cwd(), "data", "tags.toml");
  const content = fs.readFileSync(tagsPath, "utf-8");
  const parsed = toml.parse(content) as TagsConfig;

  tagsCache = new Set(parsed.tags.map((t) => t.toLowerCase()));
  return tagsCache;
}

export function loadLicenses(): Set<string> {
  if (licensesCache) return licensesCache;

  const licensesPath = path.join(process.cwd(), "data", "licenses-osi.json");
  const content = fs.readFileSync(licensesPath, "utf-8");
  const parsed = JSON.parse(content) as LicensesConfig;

  licensesCache = new Set(parsed.licenses);
  return licensesCache;
}

export function validateTags(tags: string[]): { valid: boolean; invalid: string[] } {
  const allowedTags = loadTags();
  const invalid = tags.filter((tag) => !allowedTags.has(tag.toLowerCase()));

  return {
    valid: invalid.length === 0,
    invalid,
  };
}

export function validateLicense(license: string): boolean {
  const allowedLicenses = loadLicenses();
  return allowedLicenses.has(license);
}
