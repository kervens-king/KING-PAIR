function makeid(num = 4) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var characters9 = characters.length;
  for (var i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters9));
  }
  return result;
}

// Fonction pour afficher les informations PATERSON-MD
function displayPatersonInfo() {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                  🚀 PATERSON-MD 🚀                ║
║               Version 3.6.0 FROST EDITION         ║
║                                                   ║
║  📸 Photo: https://files.catbox.moe/usgvo9.jpg    ║
║  📢 Chaîne: https://whatsapp.com/channel/         ║
║       0029Vb6KikfLdQefJursHm20                    ║
║                                                   ║
║  💡 Conseil: ${"Ne partage pas la session à ta".padEnd(43)}║
║  ${"petite amie ok 😂".padEnd(47)}║
║                                                   ║
║  👨‍💻 Développeur: Kervens Aubourg                 ║
║  📞 Support: https://wa.me/50942737567            ║
╚═══════════════════════════════════════════════════╝
  `);
}

// Fonction pour générer un ID avec le préfixe PATERSON
function makePatersonId(num = 6) {
  const prefix = "PATERSON-";
  const randomPart = makeid(num);
  return prefix + randomPart;
}

// Afficher les informations au chargement
displayPatersonInfo();

module.exports = {
  makeid,
  makePatersonId,
  displayPatersonInfo
};
