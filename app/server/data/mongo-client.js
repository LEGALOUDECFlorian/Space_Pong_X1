const mongoose = require('mongoose') ;

async function connectToMongo(mongoUri) {
  try {
    mongoose.connect(mongoUri)
       .then(() => console.log('Connexion à MongoDB réussie !'))
       .catch(() => console.log('Connexion à MongoDB échouée !'));
       return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToMongo };
