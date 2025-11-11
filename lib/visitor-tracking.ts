import { getDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

/**
 * Visitor tracking data model
 */
interface VisitorRecord {
  _id?: ObjectId;
  slug: string;
  count: number;
  lastVisited: Date;
  createdAt: Date;
  updatedAt: Date;
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

    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    // Create index on slug for faster queries
    await collection.createIndex({ slug: 1 });

    // First, check if record exists
    const existingRecord = await collection.findOne({ slug });

    if (!existingRecord) {
      // If new record, create with count = 0, then increment to 1
      const result = await collection.findOneAndUpdate(
        { slug },
        {
          $set: {
            slug,
            count: 0,
            lastVisited: new Date(),
            updatedAt: new Date(),
            createdAt: new Date(),
          },
        },
        {
          upsert: true,
          returnDocument: 'after',
        }
      );

      // Now increment from 0 to 1
      const incrementResult = await collection.findOneAndUpdate(
        { slug },
        {
          $inc: { count: 1 },
          $set: {
            lastVisited: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          returnDocument: 'after',
        }
      );

      return incrementResult?.count ?? 1;
    }

    // If record exists, just increment
    const result = await collection.findOneAndUpdate(
      { slug },
      {
        $inc: { count: 1 },
        $set: {
          lastVisited: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: 'after',
      }
    );

    return result?.count ?? 1;
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

    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    const record = await collection.findOne({ slug });
    return record?.count || 0;
  } catch (error) {
    console.error(`Error getting visitor count for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Get all visitor records with optional filtering
 * @param limit - Maximum number of records to return
 * @param sortBy - Field to sort by (default: 'count')
 * @returns Array of visitor records
 */
export async function getAllVisitors(
  limit: number = 100,
  sortBy: 'count' | 'createdAt' | 'lastVisited' = 'count'
): Promise<VisitorRecord[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    const records = await collection
      .find({})
      .sort({ [sortBy]: -1 })
      .limit(limit)
      .toArray();

    return records;
  } catch (error) {
    console.error('Error getting all visitors:', error);
    throw error;
  }
}

/**
 * Get top N projects by visitor count
 * @param limit - Number of top projects to return
 * @returns Array of top projects with their visitor counts
 */
export async function getTopProjectsByVisitors(limit: number = 10): Promise<VisitorRecord[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    const records = await collection
      .find({})
      .sort({ count: -1 })
      .limit(limit)
      .toArray();

    return records;
  } catch (error) {
    console.error('Error getting top projects by visitors:', error);
    throw error;
  }
}

/**
 * Get visitor statistics
 * @returns Object with statistics
 */
export async function getVisitorStatistics(): Promise<{
  totalProjects: number;
  totalVisitors: number;
  averageVisitors: number;
  topProject?: VisitorRecord;
}> {
  try {
    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    const stats = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          totalVisitors: { $sum: '$count' },
          averageVisitors: { $avg: '$count' },
          maxCount: { $max: '$count' },
        },
      },
    ]).toArray();

    const stat = stats[0];

    if (!stat) {
      return {
        totalProjects: 0,
        totalVisitors: 0,
        averageVisitors: 0,
      };
    }

    // Get top project
    const topProjects = await getTopProjectsByVisitors(1);

    return {
      totalProjects: stat.totalProjects,
      totalVisitors: stat.totalVisitors,
      averageVisitors: Math.round(stat.averageVisitors),
      topProject: topProjects[0],
    };
  } catch (error) {
    console.error('Error getting visitor statistics:', error);
    throw error;
  }
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

    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    await collection.updateOne(
      { slug },
      {
        $set: {
          count: 0,
          updatedAt: new Date(),
        },
      }
    );
  } catch (error) {
    console.error(`Error resetting visitor count for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Delete visitor record for a slug (admin only)
 * @param slug - The project slug
 */
export async function deleteVisitorRecord(slug: string): Promise<void> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    await collection.deleteOne({ slug });
  } catch (error) {
    console.error(`Error deleting visitor record for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Bulk insert visitor records (for data migration)
 * @param records - Array of visitor records
 */
export async function bulkInsertVisitors(records: Omit<VisitorRecord, '_id'>[]): Promise<void> {
  try {
    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    if (records.length === 0) {
      return;
    }

    const now = new Date();
    const formattedRecords = records.map(record => ({
      ...record,
      createdAt: record.createdAt || now,
      updatedAt: record.updatedAt || now,
    }));

    await collection.insertMany(formattedRecords);
  } catch (error) {
    console.error('Error bulk inserting visitor records:', error);
    throw error;
  }
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

    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    // Check if record exists
    const existingRecord = await collection.findOne({ slug });

    if (!existingRecord) {
      // Initialize with count = 0
      await collection.insertOne({
        slug,
        count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastVisited: new Date(),
      } as VisitorRecord);
    }
  } catch (error) {
    console.error(`Error initializing visitor record for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Initialize all projects with 0 visitors (bulk operation)
 * @param slugs - Array of project slugs
 */
export async function initializeAllProjectVisitors(slugs: string[]): Promise<void> {
  try {
    if (!slugs || slugs.length === 0) {
      return;
    }

    const db = await getDatabase();
    const collection = db.collection<VisitorRecord>('visitors');

    const now = new Date();
    const recordsToInsert: VisitorRecord[] = [];

    // Check which slugs don't have records yet
    for (const slug of slugs) {
      const existing = await collection.findOne({ slug });
      if (!existing) {
        recordsToInsert.push({
          slug,
          count: 0,
          createdAt: now,
          updatedAt: now,
          lastVisited: now,
        });
      }
    }

    if (recordsToInsert.length > 0) {
      await collection.insertMany(recordsToInsert);
    }
  } catch (error) {
    console.error('Error initializing all project visitors:', error);
    throw error;
  }
}
