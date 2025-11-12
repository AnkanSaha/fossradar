import { ProjectSubmission } from "./schema";

/**
 * Converts form data to TOML format string
 */
export function generateTOML(data: ProjectSubmission): string {
  const lines: string[] = [];

  // Basic info
  lines.push(`slug = "${data.slug}"`);
  lines.push(`name = "${data.name}"`);
  lines.push(`short_desc = "${data.short_desc}"`);

  if (data.website) {
    lines.push(`website = "${data.website}"`);
  }

  lines.push(`repo = "${data.repo}"`);
  lines.push(`license = "${data.license}"`);

  if (data.logo) {
    lines.push(`logo = "${data.logo}"`);
  }

  lines.push(`added_at = "${data.added_at}"`);
  lines.push("");

  // Language, category, and tags
  lines.push(`primary_lang = "${data.primary_lang}"`);
  lines.push(`category = "${data.category}"`);
  lines.push(`tags = [${data.tags.map(tag => `"${tag}"`).join(", ")}]`);
  lines.push(`looking_for_contributors = ${data.looking_for_contributors}`);
  lines.push(`location_city = "${data.location_city}"`);
  lines.push(`location_indian_state = "${data.location_indian_state}"`);
  lines.push("");

  // Default values for auto-generated fields
  lines.push("good_first_issues = 0");
  lines.push("stars = 0");
  lines.push("verified = false");

  // India connection (if provided)
  if (data.india_connection) {
    lines.push("");
    lines.push("# India Connection");
    lines.push(`india_connection = "${data.india_connection}"`);

    if (data.india_connection_details) {
      lines.push(`india_connection_details = "${data.india_connection_details}"`);
    }
  }

  return lines.join("\n") + "\n";
}

/**
 * Escapes special characters in TOML strings
 */
function escapeTomlString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}
