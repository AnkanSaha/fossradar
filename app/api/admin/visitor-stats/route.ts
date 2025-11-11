import { NextRequest, NextResponse } from 'next/server';
import {
  getTopProjectsByVisitors,
  getVisitorStatistics,
  getAllVisitors,
} from '@/lib/visitor-tracking';

/**
 * GET /api/admin/visitor-stats
 * Get visitor statistics (admin endpoint)
 * 
 * Query parameters:
 * - limit: Maximum number of top projects to return (default: 10)
 * - action: 'stats' (default), 'top', or 'all'
 * 
 * Requires ADMIN_API_KEY header for security
 */
export async function GET(request: NextRequest) {
  try {
    // Security check - verify admin API key
    const apiKey = request.headers.get('x-admin-api-key');
    const expectedKey = process.env.ADMIN_API_KEY;

    if (expectedKey && apiKey !== expectedKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'stats';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(parseInt(limitParam), 1000) : 10;

    try {
      let result;

      switch (action) {
        case 'top':
          result = await getTopProjectsByVisitors(limit);
          return NextResponse.json(
            {
              action: 'top',
              limit,
              data: result,
              count: result.length,
              success: true,
            },
            { status: 200 }
          );

        case 'all':
          result = await getAllVisitors(limit);
          return NextResponse.json(
            {
              action: 'all',
              limit,
              data: result,
              count: result.length,
              success: true,
            },
            { status: 200 }
          );

        case 'stats':
        default:
          result = await getVisitorStatistics();
          return NextResponse.json(
            {
              action: 'stats',
              data: result,
              success: true,
            },
            { status: 200 }
          );
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to fetch visitor statistics from database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching visitor statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor statistics' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/admin/visitor-stats
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
