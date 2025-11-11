import { NextRequest, NextResponse } from 'next/server';
import { incrementVisitorCount, getVisitorCount } from '@/lib/visitor-tracking';

/**
 * GET /api/visitors?slug={slug}
 * Get the current visitor count for a project slug
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'slug parameter is required' },
        { status: 400 }
      );
    }

    // Validate slug format
    if (typeof slug !== 'string' || slug.length === 0 || slug.length > 100) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    try {
      const count = await getVisitorCount(slug);
      return NextResponse.json(
        {
          slug,
          count,
          success: true,
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to fetch visitor count from database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/visitors
 * Increment the visitor count for a project slug
 * Returns the updated visitor count
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'slug is required in request body' },
        { status: 400 }
      );
    }

    // Validate slug format
    if (typeof slug !== 'string' || slug.length === 0 || slug.length > 100) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    try {
      const count = await incrementVisitorCount(slug);
      return NextResponse.json(
        {
          slug,
          count,
          success: true,
          message: 'Visitor count incremented',
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to update visitor count in database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/visitors
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
