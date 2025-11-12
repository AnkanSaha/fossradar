import { Counter } from 'counterapi';

/**
 * CounterAPI client configuration
 */
const counter = new Counter({
  workspace: process.env.COUNTERAPI_WORKSPACE || 'fossradar',
  debug: process.env.NODE_ENV !== 'production',
  timeout: 5000,
  accessToken: process.env.COUNTERAPI_ACCESS_TOKEN,
});

/**
 * Visitor tracking data model (for compatibility)
 */
interface VisitorRecord {
  slug: string;
  count: number;
  lastVisited?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Increment visitor count for a project slug
 * @param slug - The project slug
 * @returns The updated visitor count
 */
export async function incrementVisitorCount(slug: string): Promise<number> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Use CounterAPI to increment the counter
    const result = await counter.up(`visitor-${slug}`);
    return result.value;
  } catch (error) {
    console.error(`Error incrementing visitor count for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Get visitor count for a project slug
 * @param slug - The project slug
 * @returns The visitor count (0 if not found)
 */
export async function getVisitorCount(slug: string): Promise<number> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Use CounterAPI to get the current count
    const result = await counter.get(`visitor-${slug}`);
    return result.value;
  } catch (error) {
    console.error(`Error getting visitor count for slug "${slug}":`, error);
    // Return 0 if counter doesn't exist yet
    return 0;
  }
}

/**
 * Get all visitor records with optional filtering
 * Note: CounterAPI doesn't support bulk queries, so this function is deprecated
 * @param limit - Maximum number of records to return
 * @param sortBy - Field to sort by (default: 'count')
 * @returns Empty array (CounterAPI doesn't support this operation)
 */
export async function getAllVisitors(
  limit: number = 100,
  sortBy: 'count' | 'createdAt' | 'lastVisited' = 'count'
): Promise<VisitorRecord[]> {
  console.warn('getAllVisitors is not supported with CounterAPI');
  return [];
}

/**
 * Get top N projects by visitor count
 * Note: CounterAPI doesn't support bulk queries, so this function is deprecated
 * @param limit - Number of top projects to return
 * @returns Empty array (CounterAPI doesn't support this operation)
 */
export async function getTopProjectsByVisitors(limit: number = 10): Promise<VisitorRecord[]> {
  console.warn('getTopProjectsByVisitors is not supported with CounterAPI');
  return [];
}

/**
 * Get visitor statistics
 * Note: CounterAPI doesn't support aggregations, so this function is deprecated
 * @returns Object with placeholder statistics
 */
export async function getVisitorStatistics(): Promise<{
  totalProjects: number;
  totalVisitors: number;
  averageVisitors: number;
  topProject?: VisitorRecord;
}> {
  console.warn('getVisitorStatistics is not supported with CounterAPI');
  return {
    totalProjects: 0,
    totalVisitors: 0,
    averageVisitors: 0,
  };
}

/**
 * Reset visitor count for a slug (admin only)
 * @param slug - The project slug
 */
export async function resetVisitorCount(slug: string): Promise<void> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // CounterAPI v2 supports reset
    await counter.reset(`visitor-${slug}`);
  } catch (error) {
    console.error(`Error resetting visitor count for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Delete visitor record for a slug (admin only)
 * Note: CounterAPI doesn't support delete, use reset instead
 * @param slug - The project slug
 */
export async function deleteVisitorRecord(slug: string): Promise<void> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Reset to 0 as CounterAPI doesn't have a delete operation
    await counter.reset(`visitor-${slug}`);
  } catch (error) {
    console.error(`Error deleting visitor record for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Bulk insert visitor records (for data migration)
 * Note: CounterAPI doesn't support bulk operations, so this function is deprecated
 * @param records - Array of visitor records
 */
export async function bulkInsertVisitors(records: Omit<VisitorRecord, '_id'>[]): Promise<void> {
  console.warn('bulkInsertVisitors is not supported with CounterAPI');
  // Could implement sequential inserts if needed, but skipping for now
}

/**
 * Initialize visitor record for a slug with count = 0
 * If record already exists, it won't be modified
 * @param slug - The project slug
 */
export async function initializeProjectVisitors(slug: string): Promise<void> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Check if counter exists, if not, create it with value 0
    try {
      await counter.get(`visitor-${slug}`);
    } catch {
      // Counter doesn't exist, create it
      await counter.up(`visitor-${slug}`);
      await counter.down(`visitor-${slug}`);
    }
  } catch (error) {
    console.error(`Error initializing visitor record for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Initialize all projects with 0 visitors (bulk operation)
 * Note: This is deprecated with CounterAPI as it doesn't support bulk operations
 * @param slugs - Array of project slugs
 */
export async function initializeAllProjectVisitors(slugs: string[]): Promise<void> {
  console.warn('initializeAllProjectVisitors is not supported with CounterAPI');
  // Could implement sequential initialization if needed
}
