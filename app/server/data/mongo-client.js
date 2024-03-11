const { MongoClient } = require("mongodb");

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATABASE_NAME = process.env.DATABASE_NAME || "myponglikedb";

// if (!process.env.MONGO_URL) {
//   throw new Error("Missing environment variable: MONGO_URL");
// }

// if (!process.env.DATABASE_NAME) {
//   throw new Error("Missing environment variable: DATABASE_NAME");
// }

const client = new MongoClient(MONGO_URL);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db(DATABASE_NAME);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { client, connectToMongo };
