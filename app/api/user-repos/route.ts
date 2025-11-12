import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Octokit } from "@octokit/rest";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in with GitHub." },
        { status: 401 }
      );
    }

    // Initialize Octokit with user's access token
    const octokit = new Octokit({
      auth: session.accessToken,
    });

    // Fetch user's repositories
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: "updated",
      per_page: 100,
      type: "public",
    });

    // Filter and format repositories
    const formattedRepos = repos
      .filter((repo) => !repo.private && !repo.fork) // Only public, non-fork repos
      .map((repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        private: repo.private,
      }));

    return NextResponse.json({
      repos: formattedRepos,
      total: formattedRepos.length,
    });
  } catch (error: any) {
    console.error("Fetch user repos error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
