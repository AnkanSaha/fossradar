import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Edge runtime for better performance
export const runtime = "edge";

// Simple in-memory cache with expiry (fallback for edge)
const memoryCache = new Map<string, { count: number; timestamp: number }>();
const CACHE_EXPIRY = 60 * 1000; // 1 minute

// Rate limiting: track IPs per slug
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Get IP address for rate limiting
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  return ip;
}

// Check rate limit
function isRateLimited(ip: string, slug: string): boolean {
  const key = `${ip}:${slug}`;
  const now = Date.now();
  const lastRequest = rateLimitMap.get(key) || 0;

  if (now - lastRequest < RATE_LIMIT_WINDOW) {
    return true;
  }

  rateLimitMap.set(key, now);

  // Clean up old entries
  if (rateLimitMap.size > 1000) {
    const cutoff = now - RATE_LIMIT_WINDOW;
    for (const [k, timestamp] of rateLimitMap.entries()) {
      if (timestamp < cutoff) {
        rateLimitMap.delete(k);
      }
    }
  }

  return false;
}

// Get cached hit count
const getCachedHits = unstable_cache(
  async (slug: string) => {
    // Check memory cache first
    const cached = memoryCache.get(slug);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_EXPIRY) {
      return cached.count;
    }

    // Return 0 for new slugs (will be incremented on POST)
    return 0;
  },
  ["hit-counts"],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: ["hits"],
  }
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter required" }, { status: 400 });
    }

    const hits = await getCachedHits(slug);

    return NextResponse.json({
      slug,
      hits: hits || 0
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Error fetching hits:", error);
    return NextResponse.json({ error: "Failed to fetch hits" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    // Rate limiting
    const ip = getClientIP(request);
    if (isRateLimited(ip, slug)) {
      // Don't fail, just return current count
      const hits = await getCachedHits(slug);
      return NextResponse.json({
        slug,
        hits: hits || 0,
        rateLimited: true
      });
    }

    // Update in-memory cache
    const now = Date.now();
    const cached = memoryCache.get(slug);
    const currentCount = cached?.count || 0;
    const newCount = currentCount + 1;

    memoryCache.set(slug, {
      count: newCount,
      timestamp: now,
    });

    // Clean up old cache entries periodically
    if (memoryCache.size > 100) {
      const cutoff = now - CACHE_EXPIRY * 10; // Keep last 10 minutes
      for (const [key, value] of memoryCache.entries()) {
        if (value.timestamp < cutoff) {
          memoryCache.delete(key);
        }
      }
    }

    return NextResponse.json({
      slug,
      hits: newCount
    }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error updating hits:", error);
    return NextResponse.json({ error: "Failed to update hits" }, { status: 500 });
  }
}
