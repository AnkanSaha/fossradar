import { NextRequest, NextResponse } from "next/server";
import { loadAllProjects } from "@/lib/projects";

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

    // Normalize the repo URL (remove trailing slash, .git suffix)
    const normalizedUrl = repoUrl.toLowerCase().replace(/\/$/, "").replace(/\.git$/, "");

    // Load all projects and check if repo exists
    const projects = loadAllProjects();
    const existingProject = projects.find((project) => {
      const projectRepoNormalized = project.repo.toLowerCase().replace(/\/$/, "").replace(/\.git$/, "");
      return projectRepoNormalized === normalizedUrl;
    });

    if (existingProject) {
      return NextResponse.json({
        exists: true,
        project: {
          name: existingProject.name,
          slug: existingProject.slug,
        },
      });
    }

    return NextResponse.json({
      exists: false,
    });
  } catch (error: any) {
    console.error("Check duplicate error:", error);
    return NextResponse.json(
      { error: "Failed to check for duplicates" },
      { status: 500 }
    );
  }
}
