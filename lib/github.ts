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
      forks: data.forks_count,
      watchers: data.subscribers_count,
      open_issues: data.open_issues_count,
      size: data.size, // in KB
      default_branch: data.default_branch,
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      topics: data.topics || [],
      has_wiki: data.has_wiki,
      has_pages: data.has_pages,
      has_discussions: data.has_discussions,
      archived: data.archived,
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
 * Get top contributors for a repository
 */
export async function getContributors(repoUrl: string, limit: number = 10) {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return [];
    }

    const { data } = await octokit.rest.repos.listContributors({
      owner,
      repo,
      per_page: limit,
    });

    return data.map((contributor) => ({
      login: contributor.login || "anonymous",
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
    }));
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return [];
  }
}

/**
 * Detect package manager and installation command from repo
 */
export async function detectInstallation(repoUrl: string): Promise<{
  type: string;
  command: string;
} | null> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return null;
    }

    // Check for package files
    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "",
    });

    if (!Array.isArray(contents)) {
      return null;
    }

    const files = contents.map((item) => item.name);

    // Check for npm
    if (files.includes("package.json")) {
      // Try to get package name from package.json
      try {
        const { data: pkgFile } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: "package.json",
        });
        if ("content" in pkgFile) {
          const pkgJson = JSON.parse(Buffer.from(pkgFile.content, "base64").toString());
          if (pkgJson.name) {
            return {
              type: "npm",
              command: `npm install ${pkgJson.name}`,
            };
          }
        }
      } catch {
        // Fallback to git clone
      }
    }

    // Check for Python
    if (files.includes("setup.py") || files.includes("pyproject.toml") || files.includes("requirements.txt")) {
      try {
        const { data: setupFile } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: files.includes("setup.py") ? "setup.py" : "pyproject.toml",
        });
        // For simplicity, just suggest pip install if we detect Python project
        return {
          type: "pip",
          command: `pip install ${repo}`,
        };
      } catch {
        // Fallback
      }
    }

    // Check for Rust
    if (files.includes("Cargo.toml")) {
      return {
        type: "cargo",
        command: `cargo install ${repo}`,
      };
    }

    // Check for Go
    if (files.includes("go.mod")) {
      return {
        type: "go",
        command: `go install github.com/${owner}/${repo}@latest`,
      };
    }

    // Default to git clone
    return {
      type: "git",
      command: `git clone ${repoUrl}`,
    };
  } catch (error) {
    console.error("Error detecting installation:", error);
    // Fallback to git clone
    return {
      type: "git",
      command: `git clone ${repoUrl}`,
    };
  }
}

/**
 * Get repository language breakdown
 */
export async function getLanguageBreakdown(repoUrl: string): Promise<Record<string, number>> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return {};
    }

    const { data } = await octokit.rest.repos.listLanguages({
      owner,
      repo,
    });

    return data;
  } catch (error) {
    console.error("Error fetching language breakdown:", error);
    return {};
  }
}

/**
 * Check for common documentation URLs
 */
export async function findDocumentation(repoUrl: string): Promise<{
  docs_url?: string;
  changelog_url?: string;
}> {
  try {
    const url = new URL(repoUrl);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");

    if (!owner || !repo) {
      return {};
    }

    const result: { docs_url?: string; changelog_url?: string } = {};

    // Check for common doc directories
    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "",
    });

    if (!Array.isArray(contents)) {
      return result;
    }

    const files = contents.map((item) => ({ name: item.name, type: item.type }));

    // Check for docs directory
    const docsDir = files.find((f) =>
      f.type === "dir" && (f.name.toLowerCase() === "docs" || f.name.toLowerCase() === "documentation")
    );
    if (docsDir) {
      result.docs_url = `${repoUrl}/tree/main/${docsDir.name}`;
    }

    // Check for CHANGELOG
    const changelog = files.find((f) =>
      f.type === "file" && /^changelog/i.test(f.name)
    );
    if (changelog) {
      result.changelog_url = `${repoUrl}/blob/main/${changelog.name}`;
    }

    return result;
  } catch (error) {
    console.error("Error finding documentation:", error);
    return {};
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
