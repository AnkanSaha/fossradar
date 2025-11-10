import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Octokit } from "@octokit/rest";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized", requiresAuth: true },
        { status: 401 }
      );
    }

    const { repoUrl } = await request.json();

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    // Parse GitHub repo URL to extract owner and repo
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid GitHub repository URL" },
        { status: 400 }
      );
    }

    const [, owner, repo] = match;
    const repoName = repo.replace(/\.git$/, ""); // Remove .git suffix if present

    // Use the user's access token to star the repository
    const octokit = new Octokit({
      auth: session.accessToken,
    });

    await octokit.activity.starRepoForAuthenticatedUser({
      owner,
      repo: repoName,
    });

    return NextResponse.json({
      success: true,
      message: "Repository starred successfully"
    });
  } catch (error: any) {
    console.error("Star error:", error);

    if (error.status === 401) {
      return NextResponse.json(
        { error: "Authentication failed. Please sign in again.", requiresAuth: true },
        { status: 401 }
      );
    }

    if (error.status === 404) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to star repository" },
      { status: 500 }
    );
  }
}

// Check if a repository is starred by the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.accessToken) {
      return NextResponse.json({ starred: false });
    }

    const { searchParams } = new URL(request.url);
    const repoUrl = searchParams.get("repoUrl");

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return NextResponse.json({ starred: false });
    }

    const [, owner, repo] = match;
    const repoName = repo.replace(/\.git$/, "");

    const octokit = new Octokit({
      auth: session.accessToken,
    });

    try {
      await octokit.activity.checkRepoIsStarredByAuthenticatedUser({
        owner,
        repo: repoName,
      });
      return NextResponse.json({ starred: true });
    } catch (error: any) {
      if (error.status === 404) {
        return NextResponse.json({ starred: false });
      }
      throw error;
    }
  } catch (error) {
    console.error("Check star error:", error);
    return NextResponse.json({ starred: false });
  }
}
