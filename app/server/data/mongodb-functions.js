import { client } from "./mongo-client.js";

export async function addScoreToMongoDB(userData) {
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection("highscores");
  try {
    const result = await collection.insertOne(userData);
    console.log(`Score added successfully with ID: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error("Error adding score:", error);
    throw error;
  }
}

export async function getHighScoresFromMongoDB() {
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection("highscores");
  try {
    const scores = await collection.find().toArray();
    return scores;
  } catch (error) {
    console.error("Error getting high scores:", error);
    throw error;
  }
}
