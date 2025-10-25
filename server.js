console.log('🔍 Debug: Démarrage...');
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
console.log('🔍 PORT:', process.env.PORT);
console.log('👑 Démarrage de KING DIVIN...');
console.log('📦 Chargement des modules...');

try {
    const express = require('express');
    console.log('✅ Express chargé');
    
    const path = require('path');
    console.log('✅ Path chargé');
    
    const fs = require('fs');
    console.log('✅ FS chargé');
    
    const logger = require('./logger');
    console.log('✅ Logger chargé');
    
    const dotenv = require('dotenv');
    console.log('✅ Dotenv chargé');
    
    // ⭐ FONCTIONS KING INTÉGRÉES DIRECTEMENT ⭐
    function makeid(num = 4) {
      return Math.random().toString(36).substring(2, 2 + num).toUpperCase();
    }

    function makeKingId(num = 6) {
      return "KING-" + makeid(num);
    }

    function displayKingInfo() {
      console.log(`
╔═══════════════════════════════════════════════════╗
║                  👑 KING DIVIN 👑                 ║
║               LÉGENDE ÉTERNELLE v1.0.0            ║
║                                                   ║
║  📸 Logo: https://files.catbox.moe/ndj85q.jpg     ║
║  📢 Canal: https://whatsapp.com/channel/          ║
║       0029Vb6KikfLdQefJursHm20                    ║
║                                                   ║
║  💡 Sagesse: Le pouvoir se mérite,                ║
║              ne se réclame pas 🤴                 ║
║                                                   ║
║  👨‍💻 Créateur: Kervens Aubourg                   ║
║  📞 Support: https://wa.me/50942737567            ║
╚═══════════════════════════════════════════════════╝
      `);
    }

    console.log('✅ Fonctions King intégrées directement');
    
    const app = express();
    console.log('✅ Application Express créée');

    // Charger les variables d'environnement
    dotenv.config();
    console.log('✅ Variables d\'environnement chargées');

    // ⭐ ROUTE POUR pair.html ⭐
    app.get('/pair-page', (req, res) => {
        try {
            console.log('📄 Servir la page pair.html');
            res.sendFile(path.join(__dirname, 'pair.html'));
        } catch (error) {
            console.error('❌ Erreur chargement pair.html:', error);
            res.status(500).send('Erreur de chargement de la page');
        }
    });

    // Routes
    console.log('🔄 Chargement des routes...');
    const pairRouter = require('./routes/pair');
    console.log('✅ Routes pair chargées');
    
    const qrRouter = require('./routes/qr');
    console.log('✅ Routes QR chargées');
    
    const mainRouter = require('./routes/main');
    console.log('✅ Routes main chargées');

    // Middleware
    console.log('🔄 Configuration des middlewares...');
    app.use(express.json());
    app.use(express.static('public'));
    
    // MIDDLEWARE DE LOGGING
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    });
    
    console.log('✅ Middlewares configurés');

    // Routes
    app.use('/pair', pairRouter);
    app.use('/qr', qrRouter);
    app.use('/', mainRouter);
    console.log('✅ Routes attachées');

    // Gestion des erreurs
    app.use((err, req, res, next) => {
        logger.error(err.stack);
        res.status(500).send('Erreur serveur!');
    });

    // Nettoyage au démarrage
    function cleanupOldSessions() {
        console.log('🧹 Nettoyage des sessions...');
        const tempDir = path.join(__dirname, 'temp');
        if (fs.existsSync(tempDir)) {
            fs.readdirSync(tempDir).forEach(file => {
                const filePath = path.join(tempDir, file);
                const stat = fs.statSync(filePath);
                
                // Supprimer les sessions vieilles de plus d'1 heure
                if (stat.isDirectory() && (Date.now() - stat.mtimeMs) > 3600000) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                    logger.info(`Session ancienne supprimée: ${file}`);
                }
            });
        }
    }

    // Démarrer le serveur
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
        // ⭐ AFFICHAGE DES INFOS KING ⭐
        displayKingInfo();
        
        console.log(`✅ Serveur KING démarré sur le port ${PORT}`);
        logger.info(`Serveur KING démarré sur le port ${PORT}`);
        
        // ⭐ EXEMPLE D'UTILISATION DES FONCTIONS ⭐
        const sessionId = makeKingId(8);
        console.log(`🎯 Session King générée: ${sessionId}`);
        
        // Nettoyer les anciennes sessions
        cleanupOldSessions();
        
        // Planifier le nettoyage régulier
        setInterval(cleanupOldSessions, 3600000); // Toutes les heures
    });

} catch (error) {
    console.error('❌ ERREUR CRITIQUE:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
}

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
    console.log('\n🛑 Arrêt du serveur KING...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Exception non capturée:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Rejet non géré:', reason);
    process.exit(1);
});
