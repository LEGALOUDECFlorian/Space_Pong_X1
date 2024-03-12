// Load env variables
require("dotenv").config();

// Import deps
const { createServer } = require("node:http");
const path = require("node:path");
const express = require("express");
const db = require("./data/mongo-client.js");

// Create app
const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, "../client")));

// Add body parser
app.use(express.json());

// Start server asynchronously after database connexion is established
(async () => {
  const database = await db.connectToMongo();
  const highScoresCollection = database.collection("highScores");

  app.post("/highscores", async (req, res) => {
    try {
      const newScore = req.body;
      console.log({ newScore });
      await highScoresCollection.insertOne(newScore);
      res.status(201).send("Score ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du score :", error);
      res.status(500).send("Erreur lors de l'ajout du score");
    }
  });

  app.get("/highscores", async (req, res) => {
    try {
      const limit = 5; // Limit of 5 scores.
      const highScores = await highScoresCollection
        .find()
        .sort({ time: 1 }) // Sorts by ascending time
        .limit(limit)
        .toArray();
      res.json(highScores);
    } catch (error) {
      console.error("Erreur lors de la récupération des scores élevés :", error);
      res.status(500).send("Erreur lors de la récupération des scores élevés");
    }
  });

  // Starts the server and listens on the specified port
  const server = createServer(app);
  const port = process.env.PORT || 4000;
  await server.listen(port);
  console.log(`SpacePongServer => http://localhost:${port}`);
})();
