/**
 * Generates a URL-safe slug from a project name
 * Follows the schema requirements: lowercase letters, numbers, and hyphens only
 */
export function generateSlug(projectName: string): string {
  return projectName
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, "-")
    // Remove all non-alphanumeric characters except hyphens
    .replace(/[^a-z0-9-]/g, "")
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, "-")
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "")
    // Limit length to 60 characters
    .slice(0, 60)
    // Remove trailing hyphen if slicing created one
    .replace(/-+$/, "");
}

/**
 * Validates if a slug is valid according to schema rules
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9-]+$/;
  return (
    slug.length >= 2 &&
    slug.length <= 60 &&
    slugRegex.test(slug) &&
    !isReservedSlug(slug)
  );
}

/**
 * Checks if a slug is reserved
 */
export function isReservedSlug(slug: string): boolean {
  const RESERVED_SLUGS = [
    "new",
    "admin",
    "api",
    "auth",
    "projects",
    "tags",
    "search",
    "submit",
    "about",
    "privacy",
    "terms",
  ];
  return RESERVED_SLUGS.includes(slug);
}

/**
 * Generates a unique slug by appending a number if needed
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
