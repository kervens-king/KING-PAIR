const express = require('express');
const app = express();
const __path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares (doivent être définis avant les routes)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour PATERSON-MD
app.use('/paterson', code);

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(__path));

// Page d'accueil - doit être après les middlewares
app.get('/', (req, res) => {
  res.sendFile(__path + '/pair.html');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
PATERSON-MD Deployment Successful!

Session-Server Running on http://localhost:${PORT}
`);
});

module.exports = app;const express = require('express');
const app = express();
const __path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares (doivent être définis avant les routes)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour PATERSON-MD
app.use('/paterson', code);

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(__path));

// Page d'accueil - doit être après les middlewares
app.get('/', (req, res) => {
  res.sendFile(__path + '/pair.html');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
PATERSON-MD Deployment Successful!

Session-Server Running on http://localhost:${PORT}
`);
});

module.exports = app;
