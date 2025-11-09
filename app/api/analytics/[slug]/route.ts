import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface VercelAnalyticsResponse {
  views: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Vercel Analytics Web Vitals API
    // Docs: https://vercel.com/docs/analytics/package
    const token = process.env.VERCEL_ACCESS_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID;
    const projectId = process.env.VERCEL_PROJECT_ID;

    if (!token || !projectId) {
      // Analytics not configured, return 0
      return NextResponse.json({
        slug,
        views: 0,
        source: "unconfigured",
      }, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }

    // Construct Vercel Analytics API URL
    const apiUrl = teamId
      ? `https://api.vercel.com/v1/analytics/views`
      : `https://api.vercel.com/v1/analytics/views`;

    const url = new URL(apiUrl);
    if (teamId) url.searchParams.set("teamId", teamId);
    url.searchParams.set("projectId", projectId);
    url.searchParams.set("path", `/projects/${slug}`);
    url.searchParams.set("since", "0"); // All time

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Vercel Analytics API error:", response.status, response.statusText);

      // Return 0 for now, can be configured later
      return NextResponse.json({
        slug,
        views: 0,
        source: "api-error",
        error: response.statusText,
      }, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }

    const data = await response.json();
    const views = data.total || data.views || 0;

    return NextResponse.json({
      slug,
      views,
      source: "vercel-analytics",
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);

    const { slug } = await params;
    return NextResponse.json({
      slug,
      views: 0,
      source: "error",
    }, {
      status: 200, // Don't fail, just return 0
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  }
}
