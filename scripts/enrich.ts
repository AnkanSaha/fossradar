#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { loadAllProjects } from "../lib/projects";
import { getRepoMetadata, countGoodFirstIssues, hasWbfossTopic, hasVerifiedBadge } from "../lib/github";

async function enrichProjects() {
  console.log("🔄 Enriching project data...\n");

  if (!process.env.GITHUB_TOKEN) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }

  try {
    const projects = loadAllProjects();
    console.log(`Loaded ${projects.length} projects\n`);

    for (const project of projects) {
      console.log(`Enriching ${project.slug}...`);

      try {
        // Get repository metadata
        const metadata = await getRepoMetadata(project.repo);
        if (!metadata) {
          console.log(`  ⚠️  Could not fetch metadata`);
          continue;
        }

        // Count good first issues
        const goodFirstIssues = await countGoodFirstIssues(project.repo);

        // Check verification status
        const hasTopic = await hasWbfossTopic(project.repo);
        const hasBadge = await hasVerifiedBadge(project.repo);
        const verified = hasTopic && hasBadge;

        // Update TOML file
        const filePath = path.join(process.cwd(), "data", "projects", `${project.slug}.toml`);
        let content = fs.readFileSync(filePath, "utf-8");

        // Update fields (simple regex replacement)
        content = content.replace(/^stars = \d+$/m, `stars = ${metadata.stars}`);
        content = content.replace(/^good_first_issues = \d+$/m, `good_first_issues = ${goodFirstIssues}`);
        content = content.replace(/^verified = (true|false)$/m, `verified = ${verified}`);

        // Update primary_lang if not set
        if (metadata.language && !content.includes("primary_lang")) {
          content = content.replace(/^added_at = /, `primary_lang = "${metadata.language}"\nadded_at = `);
        } else if (metadata.language) {
          content = content.replace(/^primary_lang = ".*"$/m, `primary_lang = "${metadata.language}"`);
        }

        fs.writeFileSync(filePath, content, "utf-8");

        console.log(`  ✅ Updated: ${metadata.stars} stars, ${goodFirstIssues} good first issues, verified: ${verified}`);
      } catch (error) {
        console.log(`  ❌ Error: ${error}`);
      }

      // Rate limiting: wait a bit between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("\n✅ Enrichment complete!\n");
  } catch (error) {
    console.error("❌ Error enriching projects:", error);
    process.exit(1);
  }
}

enrichProjects();
