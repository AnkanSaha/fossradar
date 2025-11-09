#!/usr/bin/env tsx

/**
 * Verify PR Author Script
 *
 * This script checks if the PR author is affiliated with the project repository
 * (owner, org member, collaborator, or contributor). If yes, marks project as verified.
 *
 * Usage: tsx scripts/verify-pr-author.ts <pr-author> <project-slug>
 */

import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";
import { parseProjectFile, parseGitHubUrl } from "../lib/projects";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface AffilCheck {
  isOwner: boolean;
  isOrgMember: boolean;
  isCollaborator: boolean;
  hasContributions: boolean;
}

async function checkAffiliation(
  prAuthor: string,
  repoUrl: string
): Promise<AffilCheck> {
  const repoInfo = parseGitHubUrl(repoUrl);
  if (!repoInfo) {
    throw new Error(`Invalid GitHub URL: ${repoUrl}`);
  }

  const { owner, repo } = repoInfo;
  const result: AffilCheck = {
    isOwner: false,
    isOrgMember: false,
    isCollaborator: false,
    hasContributions: false,
  };

  try {
    // Check if PR author is the repository owner
    const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
    result.isOwner = repoData.owner.login.toLowerCase() === prAuthor.toLowerCase();

    // Check if PR author is an org member (if repo is owned by an org)
    if (repoData.owner.type === "Organization") {
      try {
        const { data: membership } = await octokit.rest.orgs.getMembershipForUser({
          org: owner,
          username: prAuthor,
        });
        result.isOrgMember = membership.state === "active";
      } catch {
        result.isOrgMember = false;
      }
    }

    // Check if PR author is a collaborator with write access
    try {
      const { data: permission } = await octokit.rest.repos.getCollaboratorPermissionLevel({
        owner,
        repo,
        username: prAuthor,
      });
      result.isCollaborator = ["admin", "write", "maintain"].includes(
        permission.permission
      );
    } catch {
      result.isCollaborator = false;
    }

    // Check if PR author has contributions to the repository
    try {
      const { data: contributors } = await octokit.rest.repos.listContributors({
        owner,
        repo,
        per_page: 100,
      });
      result.hasContributions = contributors.some(
        (c) => c.login?.toLowerCase() === prAuthor.toLowerCase()
      );
    } catch {
      result.hasContributions = false;
    }
  } catch (error) {
    console.error(`Error checking affiliation for ${prAuthor} on ${owner}/${repo}:`, error);
  }

  return result;
}

async function verifyPRAuthor(prAuthor: string, projectSlug: string) {
  console.log(`\n🔍 Verifying PR author affiliation...\n`);
  console.log(`PR Author: ${prAuthor}`);
  console.log(`Project: ${projectSlug}\n`);

  if (!process.env.GITHUB_TOKEN) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }

  // Load project
  const projectFile = `${projectSlug}.toml`;
  const projectPath = path.join(process.cwd(), "data", "projects", projectFile);

  if (!fs.existsSync(projectPath)) {
    console.error(`❌ Error: Project file not found: ${projectFile}`);
    process.exit(1);
  }

  let project;
  try {
    project = parseProjectFile(projectFile);
  } catch (error) {
    console.error(`❌ Error parsing project file:`, error);
    process.exit(1);
  }

  console.log(`Repository: ${project.repo}\n`);

  // Check affiliation
  const affil = await checkAffiliation(prAuthor, project.repo);

  console.log("Affiliation Check Results:");
  console.log(`  Repository Owner: ${affil.isOwner ? "✅ Yes" : "❌ No"}`);
  console.log(`  Organization Member: ${affil.isOrgMember ? "✅ Yes" : "❌ No"}`);
  console.log(`  Collaborator (write+): ${affil.isCollaborator ? "✅ Yes" : "❌ No"}`);
  console.log(`  Has Contributions: ${affil.hasContributions ? "✅ Yes" : "❌ No"}`);

  // Determine if affiliated
  const isAffiliated =
    affil.isOwner || affil.isOrgMember || affil.isCollaborator || affil.hasContributions;

  console.log(`\n${isAffiliated ? "✅" : "❌"} PR Author is ${isAffiliated ? "" : "NOT "}affiliated with the project repository\n`);

  // Update verified status in TOML file
  if (isAffiliated) {
    let content = fs.readFileSync(projectPath, "utf-8");

    // Update verified field
    if (content.includes("verified =")) {
      content = content.replace(/verified = (true|false)/, "verified = true");
    } else {
      // Add verified field if it doesn't exist
      content = content.replace(
        /stars = \d+/,
        `stars = ${project.stars || 0}\nverified = true`
      );
    }

    fs.writeFileSync(projectPath, content, "utf-8");
    console.log(`✅ Updated ${projectFile} - marked as verified\n`);

    // Output verification reason for logging
    const reasons = [];
    if (affil.isOwner) reasons.push("repository owner");
    if (affil.isOrgMember) reasons.push("organization member");
    if (affil.isCollaborator) reasons.push("collaborator");
    if (affil.hasContributions) reasons.push("contributor");

    console.log(`Verification reason: ${reasons.join(", ")}\n`);
  } else {
    console.log(`ℹ️  Project will remain unverified until submitted by an affiliated member\n`);
  }

  process.exit(isAffiliated ? 0 : 1);
}

// Parse command line arguments
const prAuthor = process.argv[2];
const projectSlug = process.argv[3];

if (!prAuthor || !projectSlug) {
  console.error("Usage: tsx scripts/verify-pr-author.ts <pr-author> <project-slug>");
  console.error("\nExample: tsx scripts/verify-pr-author.ts octocat my-project");
  process.exit(1);
}

verifyPRAuthor(prAuthor, projectSlug);
