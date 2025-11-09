import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Check if a repository has the 'fossradar' topic (case-insensitive, exact match)
 */
export async function hasFossradarTopic(repoUrl: string): Promise<boolean> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      throw new Error("Invalid GitHub URL");
    }

    const { data } = await octokit.rest.repos.getAllTopics({
      owner,
      repo,
    });

    // Case-insensitive exact match
    return data.names.some((topic) => topic.toLowerCase() === "fossradar");
  } catch (error) {
    console.error("Error checking fossradar topic:", error);
    return false;
  }
}

/**
 * Check if a repository exists and is public
 */
export async function isRepoAccessible(repoUrl: string): Promise<boolean> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return false;
    }

    const { data } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    return !data.private;
  } catch {
    return false;
  }
}

/**
 * Get repository metadata (stars, language, etc.)
 */
export async function getRepoMetadata(repoUrl: string) {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      throw new Error("Invalid GitHub URL");
    }

    const { data } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    return {
      stars: data.stargazers_count,
      language: data.language,
      description: data.description,
      homepage: data.homepage,
      license: data.license?.spdx_id,
    };
  } catch (error) {
    console.error("Error fetching repo metadata:", error);
    return null;
  }
}

/**
 * Get README content
 */
export async function getReadme(repoUrl: string): Promise<string | null> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return null;
    }

    const { data } = await octokit.rest.repos.getReadme({
      owner,
      repo,
    });

    // Decode base64 content
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

/**
 * Check if README contains the fossradar.in verified badge
 */
export async function hasVerifiedBadge(repoUrl: string): Promise<boolean> {
  const readme = await getReadme(repoUrl);
  if (!readme) return false;

  return /img\.shields\.io\/badge\/fossradar\.in-Verified/i.test(readme);
}

/**
 * Count good first issues
 */
export async function countGoodFirstIssues(repoUrl: string): Promise<number> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return 0;
    }

    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      labels: "good first issue",
      state: "open",
      per_page: 1,
    });

    // Get total count from response headers
    return data.length;
  } catch {
    return 0;
  }
}

/**
 * Create a new branch, file, and pull request
 */
export async function createProjectPR(params: {
  slug: string;
  content: string;
  submitterName?: string;
}) {
  const owner = process.env.GITHUB_REPO_OWNER!;
  const repo = process.env.GITHUB_REPO_NAME!;
  const branch = `add/${params.slug}`;
  const filePath = `data/projects/${params.slug}.toml`;

  try {
    // Get default branch ref
    const { data: defaultBranch } = await octokit.rest.repos.get({ owner, repo });
    const { data: ref } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${defaultBranch.default_branch}`,
    });

    // Create new branch
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branch}`,
      sha: ref.object.sha,
    });

    // Create file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Add project: ${params.slug}`,
      content: Buffer.from(params.content).toString("base64"),
      branch,
    });

    // Create PR
    const prBody = `## New Project Submission

**Slug:** ${params.slug}
${params.submitterName ? `**Submitted by:** ${params.submitterName}\n` : ""}

### Checklist
- [ ] Repository has topic \`fossradar\`
- [ ] README includes verified badge (recommended)
- [ ] License is OSI-approved
- [ ] All required fields are filled

---
*This PR was automatically generated via the FOSSRadar.in submission form.*`;

    const { data: pr } = await octokit.rest.pulls.create({
      owner,
      repo,
      title: `Add project: ${params.slug}`,
      head: branch,
      base: defaultBranch.default_branch,
      body: prBody,
    });

    return { url: pr.html_url, number: pr.number };
  } catch (error) {
    console.error("Error creating PR:", error);
    throw error;
  }
}
