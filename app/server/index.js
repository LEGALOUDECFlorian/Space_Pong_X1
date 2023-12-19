require('dotenv').config();
const express = require('express');
const { createServer } = require('http');

const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

app.use(express.static("client"));


// app.get("/",(req, res)=>{
//  res.send("<h1>Bordel de merde</h1>");
// });
// Récupère le port à partir de la variable d'environnement
const port = process.env.PORT || 4000;

 // Démarre le serveur et écoute sur le port spécifié
 server.listen(port, () => {
    console.log(`SpacePongServer => http://localhost:${port}/app/client/index.html`);
  });