#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { loadAllProjects, getProjectFiles } from "../lib/projects";
import { validateTags, validateLicense } from "../lib/allowlists";
import { hasFossradarTopic, isRepoAccessible } from "../lib/github";

interface ValidationError {
  file: string;
  error: string;
  severity: "error" | "warning";
}

const errors: ValidationError[] = [];

function addError(file: string, error: string, severity: "error" | "warning" = "error") {
  errors.push({ file, error, severity });
}

async function validateProjects() {
  console.log("🔍 Starting validation...\n");

  // Check if data directory exists
  const dataDir = path.join(process.cwd(), "data", "projects");
  if (!fs.existsSync(dataDir)) {
    console.error("❌ Error: data/projects directory does not exist");
    process.exit(1);
  }

  const files = getProjectFiles();
  console.log(`Found ${files.length} project files\n`);

  if (files.length === 0) {
    console.log("⚠️  Warning: No project files found");
    return;
  }

  let projects;
  try {
    // This will validate schema, check duplicates, etc.
    projects = loadAllProjects();
  } catch (error) {
    console.error("❌ Fatal error loading projects:", error);
    process.exit(1);
  }

  console.log("✅ All projects loaded successfully\n");
  console.log("📋 Validating individual projects...\n");

  // Validate each project
  for (const project of projects) {
    const filename = project.filename;
    console.log(`Checking ${filename}...`);

    // Validate tags
    const tagValidation = validateTags(project.tags);
    if (!tagValidation.valid) {
      addError(
        filename,
        `Invalid tags: ${tagValidation.invalid.join(", ")}. Must be from tags.toml allowlist.`
      );
    }

    // Validate license
    if (!validateLicense(project.license)) {
      addError(
        filename,
        `Invalid license: ${project.license}. Must be an OSI-approved SPDX identifier.`
      );
    }

    // Validate logo path if present
    if (project.logo) {
      const logoPath = path.join(process.cwd(), "public", project.logo.replace(/^\//, ""));
      if (!fs.existsSync(logoPath)) {
        addError(
          filename,
          `Logo file not found: ${project.logo}. Please add the file or remove the logo field.`,
          "warning"
        );
      } else {
        // Check file size (max 200 KB)
        const stats = fs.statSync(logoPath);
        const sizeInKB = stats.size / 1024;
        if (sizeInKB > 200) {
          addError(
            filename,
            `Logo file is too large (${sizeInKB.toFixed(1)} KB). Maximum size is 200 KB.`,
            "warning"
          );
        }
      }
    }

    // Check GitHub repository accessibility
    console.log(`  Checking repository accessibility...`);
    const isAccessible = await isRepoAccessible(project.repo);
    if (!isAccessible) {
      addError(
        filename,
        `Repository ${project.repo} is not accessible or does not exist.`
      );
    }

    // Check fossradar topic (required)
    if (isAccessible) {
      console.log(`  Checking fossradar topic...`);
      const hasTopic = await hasFossradarTopic(project.repo);
      if (!hasTopic) {
        addError(
          filename,
          `Repository ${project.repo} does not have the 'fossradar' topic (case-insensitive). Please add it to your repository's topics.`
        );
      } else {
        console.log(`  ✅ fossradar topic found`);
      }
    }

    console.log("");
  }

  // Print results
  console.log("\n" + "=".repeat(80));
  console.log("VALIDATION RESULTS");
  console.log("=".repeat(80) + "\n");

  if (errors.length === 0) {
    console.log("✅ All validations passed!\n");
    return;
  }

  const errorCount = errors.filter((e) => e.severity === "error").length;
  const warningCount = errors.filter((e) => e.severity === "warning").length;

  if (warningCount > 0) {
    console.log(`⚠️  ${warningCount} warning(s):\n`);
    errors
      .filter((e) => e.severity === "warning")
      .forEach(({ file, error }) => {
        console.log(`  ${file}:`);
        console.log(`    ${error}\n`);
      });
  }

  if (errorCount > 0) {
    console.log(`❌ ${errorCount} error(s):\n`);
    errors
      .filter((e) => e.severity === "error")
      .forEach(({ file, error }) => {
        console.log(`  ${file}:`);
        console.log(`    ${error}\n`);
      });

    console.log("\n❌ Validation failed. Please fix the errors above.\n");
    process.exit(1);
  } else {
    console.log("\n✅ Validation completed with warnings only.\n");
  }
}

// Run validation
validateProjects().catch((error) => {
  console.error("❌ Validation script error:", error);
  process.exit(1);
});
