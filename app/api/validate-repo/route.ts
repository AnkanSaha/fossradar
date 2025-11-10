import { NextRequest, NextResponse } from "next/server";
import { getRepoMetadata, hasFossradarTopic, isRepoAccessible } from "@/lib/github";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const repoUrl = searchParams.get("repoUrl");

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    // Validate GitHub URL format
    const githubUrlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
    if (!githubUrlRegex.test(repoUrl)) {
      return NextResponse.json(
        { error: "Invalid GitHub repository URL format" },
        { status: 400 }
      );
    }

    // Check if repository is accessible
    const accessible = await isRepoAccessible(repoUrl);
    if (!accessible) {
      return NextResponse.json(
        { error: "Repository not found or is private" },
        { status: 404 }
      );
    }

    // Fetch repository metadata
    const metadata = await getRepoMetadata(repoUrl);
    if (!metadata) {
      return NextResponse.json(
        { error: "Failed to fetch repository metadata" },
        { status: 500 }
      );
    }

    // Check for fossradar topic
    const hasTopic = await hasFossradarTopic(repoUrl);

    // Return all data
    return NextResponse.json({
      accessible: true,
      hasFossradarTopic: hasTopic,
      metadata: {
        name: metadata.description || "",
        description: metadata.description || "",
        stars: metadata.stars,
        language: metadata.language || "",
        license: metadata.license || "Unknown",
        homepage: metadata.homepage || "",
        topics: metadata.topics,
        archived: metadata.archived,
      },
    });
  } catch (error: any) {
    console.error("Validate repo error:", error);
    return NextResponse.json(
      { error: "Failed to validate repository" },
      { status: 500 }
    );
  }
}
