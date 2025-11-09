import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

async function pingSitemapToSearchEngines() {
  const sitemapUrl = "https://fossradar.in/sitemap.xml";
  const results = {
    google: false,
    bing: false,
  };

  // Ping Google
  try {
    const response = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    results.google = response.ok;
    console.log("Pinged Google about sitemap update:", response.status);
  } catch (error) {
    console.error("Failed to ping Google:", error);
  }

  // Ping Bing
  try {
    const response = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    results.bing = response.ok;
    console.log("Pinged Bing about sitemap update:", response.status);
  } catch (error) {
    console.error("Failed to ping Bing:", error);
  }

  return results;
}

export async function POST(request: NextRequest) {
  try {
    // Optional API key check for security
    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    if (expectedKey && apiKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Revalidate sitemap
    revalidatePath("/sitemap.xml");
    console.log("Revalidated sitemap");

    // Ping search engines
    const results = await pingSitemapToSearchEngines();

    return NextResponse.json({
      success: true,
      message: "Sitemap revalidated and search engines notified",
      results,
    });
  } catch (error) {
    console.error("Ping sitemap error:", error);
    return NextResponse.json(
      { error: "Failed to ping sitemap" },
      { status: 500 }
    );
  }
}
