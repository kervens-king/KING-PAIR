const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

// Route pour PATERSON-MD
app.use('/paterson', code);

// Page d'accueil
app.use('/', async (req, res, next) => {
  res.sendFile(__path + '/pair.html')
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
PATERSON-MD Deployment Successful!

Session-Server Running on http://localhost:` + PORT)
});

module.exports = app
