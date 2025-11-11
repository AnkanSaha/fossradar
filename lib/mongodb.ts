import { MongoClient, MongoClientOptions } from 'mongodb';

const options: MongoClientOptions = {
  appName: "fossradar",
  maxIdleTimeMS: 5000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

let client: MongoClient;

try {
  client = new MongoClient(uri, options);
} catch (error) {
  console.error('Failed to create MongoDB client:', error);
  throw error;
}
// Export a module-scoped MongoClient to ensure the client can be shared across functions.
export default client;

/**
 * Get the MongoDB database instance
 * Database name is inferred from the connection URI
 */
export async function getDatabase() {
  try {
    await client.connect();
    // Get database name from URI or use default
    const dbName = process.env.MONGODB_DB_NAME || 'fossradar';
    return client.db(dbName);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

/**
 * Close the MongoDB connection
 */
export async function closeDatabase() {
  try {
    await client.close();
  } catch (error) {
    console.error('Failed to close MongoDB connection:', error);
    throw error;
  }
}
