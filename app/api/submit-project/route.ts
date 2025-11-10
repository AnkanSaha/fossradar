import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ProjectSubmissionSchema } from "@/lib/schema";
import { generateTOML } from "@/lib/toml-generator";
import { createProjectPR } from "@/lib/github";
import { getProjectFiles } from "@/lib/projects";
import { z } from "zod";

// Extended schema to include optional logo
const SubmissionWithLogoSchema = ProjectSubmissionSchema.extend({
  logoFile: z
    .object({
      content: z.string(), // base64
      filename: z.string(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.accessToken || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in with GitHub." },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = SubmissionWithLogoSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check for duplicate slug
    const existingProjects = getProjectFiles();
    const slugExists = existingProjects.some(
      (file) => file.replace(".toml", "") === data.slug
    );

    if (slugExists) {
      return NextResponse.json(
        {
          error: `A project with slug "${data.slug}" already exists. Please choose a different slug.`,
        },
        { status: 409 }
      );
    }

    // Generate TOML content
    const tomlContent = generateTOML(data);

    // Prepare logo data if provided
    let logoData;
    if (data.logoFile) {
      logoData = {
        content: data.logoFile.content,
        filename: data.logoFile.filename,
      };
    }

    // Create PR using user's access token
    const pr = await createProjectPR({
      slug: data.slug,
      content: tomlContent,
      submitterName: session.user.name || undefined,
      userToken: session.accessToken,
      logo: logoData,
    });

    return NextResponse.json({
      success: true,
      prUrl: pr.url,
      prNumber: pr.number,
      message: "Pull request created successfully!",
    });
  } catch (error: any) {
    console.error("Submit project error:", error);

    // Handle specific errors
    if (error.message?.includes("branch")) {
      return NextResponse.json(
        { error: "Failed to create branch. Please try again." },
        { status: 500 }
      );
    }

    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        {
          error: "GitHub authentication failed. Please sign in again.",
          requiresAuth: true,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create pull request" },
      { status: 500 }
    );
  }
}
