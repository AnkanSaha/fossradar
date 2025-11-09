import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import crypto from "crypto";

interface GitHubCommit {
  added?: string[];
  modified?: string[];
  removed?: string[];
}

interface GitHubWebhookPayload {
  ref?: string;
  repository?: {
    default_branch?: string;
  };
  commits?: GitHubCommit[];
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

async function pingSitemapToSearchEngines() {
  const sitemapUrl = "https://fossradar.in/sitemap.xml";

  // Ping Google
  try {
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log("Pinged Google about sitemap update");
  } catch (error) {
    console.error("Failed to ping Google:", error);
  }

  // Ping Bing
  try {
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log("Pinged Bing about sitemap update");
  } catch (error) {
    console.error("Failed to ping Bing:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-hub-signature-256");
    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 401 });
    }

    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("WEBHOOK_SECRET not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const body = await request.text();

    // Verify signature
    if (!verifySignature(body, signature, webhookSecret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body) as GitHubWebhookPayload;

    // Handle push events
    if (payload.ref === `refs/heads/${payload.repository?.default_branch}`) {
      // Check if commits touched project files
      const touchedProjects = payload.commits?.some((commit: GitHubCommit) => {
        const files = [
          ...(commit.added || []),
          ...(commit.modified || []),
          ...(commit.removed || []),
        ];
        return files.some((file: string) =>
          file.startsWith("data/projects/") || file === "public/index.json"
        );
      });

      if (touchedProjects) {
        revalidateTag("projects", "/");
        revalidatePath("/sitemap.xml");
        console.log("Revalidated projects tag and sitemap");

        // Ping search engines about sitemap update
        pingSitemapToSearchEngines();
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
