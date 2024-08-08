/// Thanks to Enzo Testa for these magnificent sponsors in English ;-) ///

// Load env variables
require("dotenv").config();

// Import deps
const { createServer } = require("node:http");
const path = require("node:path");
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./data/mongo-client.js");

// Create app
const app = express();

const mongoUri = process.env.MONGO_URI;

// Serve static assets
app.use(express.static(path.join(__dirname, "../client")));

// Add body parser
app.use(bodyParser.json());

// Start server asynchronously after database connexion is established
(async () => {
  try {
    const database = await db.connectToMongo(mongoUri);
    const highScoresCollection = database.collection("highScores");
    app.post("/highscores", async (req, res) => {
      try {
        const newScore = req.body;
        const result = await highScoresCollection.insertOne(newScore);
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
          .sort({ time: -1 }) // Sorts by descending time
          .limit(limit)
          .toArray();
       //   console.log({highScores});
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
  } catch (error) {
    console.error("Error setting up the server:", error);
  }
})();
