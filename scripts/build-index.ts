#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { loadAllProjects } from "../lib/projects";
import { SearchIndexItem } from "../lib/schema";

async function buildIndex() {
  console.log("🏗️  Building search index...\n");

  try {
    const projects = loadAllProjects();
    console.log(`Loaded ${projects.length} projects`);

    // Build minimal search index
    const index: SearchIndexItem[] = projects.map((project) => ({
      slug: project.slug,
      name: project.name,
      short_desc: project.short_desc,
      category: project.category,
      tags: project.tags,
      stars: project.stars || 0,
      primary_lang: project.primary_lang,
      verified: project.verified || false,
      added_at: project.added_at,
      looking_for_contributors: project.looking_for_contributors || false,
      location_city: project.location_city,
      location_indian_state: project.location_indian_state,
    }));

    // Sort: fossradar first, then alphabetically by name
    index.sort((a, b) => {
      if (a.slug === "fossradar") return -1;
      if (b.slug === "fossradar") return 1;
      return a.name.localeCompare(b.name);
    });

    // Write to public directory
    const outputPath = path.join(process.cwd(), "public", "index.json");
    fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), "utf-8");

    const sizeInKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
    console.log(`✅ Index built successfully: ${outputPath} (${sizeInKB} KB)\n`);

    // Warn if size is getting large
    if (parseFloat(sizeInKB) > 300) {
      console.log(`⚠️  Warning: Index size (${sizeInKB} KB) exceeds recommended 300 KB.`);
      console.log("   Consider implementing sharding for better performance.\n");
    }
  } catch (error) {
    console.error("❌ Error building index:", error);
    process.exit(1);
  }
}

buildIndex();
