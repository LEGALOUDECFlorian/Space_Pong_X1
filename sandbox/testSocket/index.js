// Importation des modules requis
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { availableParallelism } = require('node:os');
const cluster = require('node:cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

// Vérifie si le processus en cours est le processus principal dans un cluster
if (cluster.isPrimary) {
  // Détermine le nombre de CPU disponibles et crée un worker pour chaque CPU
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({
      PORT: 4000 + i
    });
  }

  // Configure le processus principal pour gérer la communication du cluster
  return setupPrimary();
}

// Fonction asynchrone pour configurer l'application principale
async function main() {
  // Ouvre la base de données SQLite
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });

  // Crée la table 'messages' si elle n'existe pas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  // Crée une application Express
  const app = express();
  // Crée un serveur HTTP en utilisant Express
  const server = createServer(app);
  // Crée un serveur Socket.IO et le configure avec un adaptateur de cluster
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter()
  });

  // Définit une route pour servir le fichier index.html
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  // Gère les connexions de socket
  io.on('connection', async (socket) => {
    // Gère l'événement 'chat message'
    socket.on('chat message', async (msg, clientOffset, callback) => {
      let result;
      try {
        // Insère un nouveau message dans la table 'messages'
        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
      } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {
          // En cas de violation de contrainte unique, invoque le callback
          callback();
        } else {
          // S'il y a une autre erreur que la violation de contrainte unique, laisse le client réessayer
        }
        return;
      }
      // Émet l'événement 'chat message' à tous les clients connectés avec le nouveau message et son ID
      io.emit('chat message', msg, result.lastID);
      // Invoque le callback
      callback();
    });

    // Si le socket n'est pas marqué comme récupéré, tente de récupérer les messages manqués
    if (!socket.recovered) {
      try {
        // Interroge les messages dans la table 'messages' en fonction du dernier offset connu du client
        await db.each('SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            // Émet chaque message au client connecté
            socket.emit('chat message', row.content, row.id);
          }
        )
      } catch (e) {
        // Gère les erreurs survenues lors de la récupération des messages manqués
      }
    }
  });

  // Récupère le port à partir de la variable d'environnement
  const port = process.env.PORT;

  // Démarre le serveur et écoute sur le port spécifié
  server.listen(port, () => {
    console.log(`serveur en cours d'exécution à l'adresse http://localhost:${port}`);
  });
}

// Appelle la fonction principale pour démarrer l'application
main();


