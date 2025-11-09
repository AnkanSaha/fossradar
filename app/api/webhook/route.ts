import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import crypto from "crypto";

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
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

    const payload = JSON.parse(body);

    // Handle push events
    if (payload.ref === `refs/heads/${payload.repository?.default_branch}`) {
      // Check if commits touched project files
      const touchedProjects = payload.commits?.some((commit: any) => {
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
        revalidateTag("projects");
        console.log("Revalidated projects tag");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
