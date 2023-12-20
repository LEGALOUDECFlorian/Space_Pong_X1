require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
// const { join } = require('node:path');
const path = require('path');

// const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

// Définit une route pour servir le fichier index.html
// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, './index.html'));
// });
const staticClient = path.join(__dirname, '../client');
app.use(express.static(staticClient));

// Définir une route pour servir le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(staticClient, 'index.html'));
});

// app.get("/",(req, res)=>{
//  res.send("<h1>Bordel de merde</h1>");
// });
// Récupère le port à partir de la variable d'environnement
const port = process.env.PORT || 4000;

// Démarre le serveur et écoute sur le port spécifié
server.listen(port, () => {
  console.log(`SpacePongServer => http://localhost:${port}`);
});
