/**
 * MongoDB Initialization Script
 * 
 * This script initializes the MongoDB database with proper indexes
 * Run once after setting up MongoDB to ensure optimal performance
 * 
 * Usage:
 *   npx ts-node scripts/init-mongodb.ts
 */

import client, { getDatabase } from '@/lib/mongodb';

async function initializeMongoDB() {
  console.log('🚀 Initializing MongoDB...\n');

  try {
    // Connect to database
    console.log('📡 Connecting to MongoDB...');
    const db = await getDatabase();
    console.log('✅ Connected to MongoDB\n');

    // Get or create visitors collection
    console.log('📊 Setting up visitors collection...');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('visitors')) {
      await db.createCollection('visitors');
      console.log('✅ Created visitors collection\n');
    } else {
      console.log('✅ Visitors collection already exists\n');
    }

    const visitorsCollection = db.collection('visitors');

    // Create indexes
    console.log('🔍 Creating indexes...');

    // Index on slug (for fast lookups)
    await visitorsCollection.createIndex({ slug: 1 });
    console.log('  ✅ Created index on slug');

    // Index on count descending (for sorting by visitor count)
    await visitorsCollection.createIndex({ count: -1 });
    console.log('  ✅ Created index on count');

    // Index on lastVisited (for time-based queries)
    await visitorsCollection.createIndex({ lastVisited: -1 });
    console.log('  ✅ Created index on lastVisited');

    // Compound index for queries and sorting
    await visitorsCollection.createIndex(
      { slug: 1, lastVisited: -1 },
      { name: 'slug_lastVisited_index' }
    );
    console.log('  ✅ Created compound index on slug and lastVisited\n');

    // Display collection statistics
    console.log('📈 Collection Statistics:');
    const statsResult = await db.command({ collStats: 'visitors' });
    console.log(`  Total documents: ${statsResult.count}`);
    console.log(`  Collection size: ${(statsResult.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Average document size: ${(statsResult.avgObjSize / 1024).toFixed(2)} KB\n`);

    // Display all indexes
    console.log('📑 Active Indexes:');
    const indexes = await visitorsCollection.listIndexes().toArray();
    indexes.forEach((index, i) => {
      console.log(`  ${i}. ${index.name}`);
    });

    console.log('\n✨ MongoDB initialization completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('  1. Start development server: pnpm dev');
    console.log('  2. Visit a project page to test tracking');
    console.log('  3. Check MongoDB to see visitor data\n');

  } catch (error) {
    console.error('❌ Error initializing MongoDB:', error);
    process.exit(1);
  } finally {
    // Close connection
    try {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    } catch (closeError) {
      console.error('Error closing connection:', closeError);
    }
  }
}

// Run initialization
initializeMongoDB();
