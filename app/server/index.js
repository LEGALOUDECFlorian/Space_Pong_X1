// Load env variables
require("dotenv").config();

// Import deps
const { createServer } = require("node:http");
const path = require("node:path");
const express = require("express");
const db = require("./data/mongo-client.js");

// Create pp
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

  // Démarre le serveur et écoute sur le port spécifié
  const server = createServer(app);
  const port = process.env.PORT || 4000;
  await server.listen(port);
  console.log(`SpacePongServer => http://localhost:${port}`);
})();

// Définit une route pour servir le fichier index.html
// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, './index.html'));
// });
// Obtient le chemin du répertoire courant à l'aide de import.meta.url
// const __dirname = path.dirname(fileURLToPath(import.meta.url));


// app.get("/",(req, res)=>{
//  res.send("<h1>Bordel de merde</h1>");
// });
// Récupère le port à partir de la variable d'environnement


// Définir le chemin pour servir highScore.json
// app.get("/highScore.json", (req, res) => {
//   res.sendFile(path.join(__dirname, "app/client/data/highScore.json"));
// });

// // Charge les variables d'environnement à partir du fichier .env
// import * as dotenv from "dotenv";

// // Importe le module Express pour créer une application web
// import express from "express";

// // Importe la fonction createServer du module HTTP pour créer un serveur web
// import { createServer } from "http";
// import { fileURLToPath } from "url";
// // Importe le module Path pour manipuler les chemins de fichiers
// import path from "path";

// dotenv.config();
