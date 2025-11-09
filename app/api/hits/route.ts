import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const HITS_FILE = path.join(process.cwd(), "data", "hits.json");

interface HitsData {
  [slug: string]: number;
}

async function readHits(): Promise<HitsData> {
  try {
    const data = await fs.readFile(HITS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeHits(hits: HitsData): Promise<void> {
  await fs.writeFile(HITS_FILE, JSON.stringify(hits, null, 2));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug parameter required" }, { status: 400 });
  }

  const hits = await readHits();
  return NextResponse.json({ slug, hits: hits[slug] || 0 });
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const hits = await readHits();
    hits[slug] = (hits[slug] || 0) + 1;
    await writeHits(hits);

    return NextResponse.json({ slug, hits: hits[slug] });
  } catch (error) {
    console.error("Error updating hits:", error);
    return NextResponse.json({ error: "Failed to update hits" }, { status: 500 });
  }
}
