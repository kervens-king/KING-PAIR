// gen-id.js - Version simplifiée et garantie sans erreur
function makeid(num = 4) {
  return Math.random().toString(36).substring(2, 2 + num).toUpperCase();
}

function makePatersonId(num = 6) {
  return "PATERSON-" + makeid(num);
}

function displayPatersonInfo() {
  console.log("🚀 PATERSON-MD démarré avec succès");
}

module.exports = { makeid, makePatersonId, displayPatersonInfo };
