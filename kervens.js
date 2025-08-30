const express = require('express');
const app = express();
const __path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

// Vérification de l'existence du fichier pair.js
let code;
try {
  code = require('./pair');
} catch (error) {
  console.error("Erreur lors du chargement de pair.js:", error.message);
  // Fallback simple si pair.js n'est pas disponible
  code = require('express').Router();
  code.get('/', (req, res) => {
    res.json({ code: "Service temporairement indisponible" });
  });
}

require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(__path));

// Route pour PATERSON-MD
app.use('/paterson', code);

// Routes pour les pages
app.get('/', (req, res) => {
  res.sendFile(__path + '/pair.html');
});

app.get('/qr', (req, res) => {
  res.sendFile(__path + '/qr.html');
});

// Route de santé pour vérifier que le serveur fonctionne
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'PATERSON-MD est en ligne' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
PATERSON-MD Deployment Successful!

Session-Server Running on http://localhost:${PORT}
`);
  console.log('Routes disponibles:');
  console.log('- GET /          -> Interface de pairing');
  console.log('- GET /qr        -> Interface QR code');
  console.log('- GET /paterson  -> API de génération de codes');
  console.log('- GET /health    -> Vérification de santé');
});

module.exports = app;
