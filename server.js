console.log('🚀 Démarrage de PATERSON-MD...');
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
    
    const app = express();
    console.log('✅ Application Express créée');

    // Charger les variables d'environnement
    dotenv.config();
    console.log('✅ Variables d\'environnement chargées');

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
    app.use(logger);
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
        console.log(`✅ Serveur démarré sur le port ${PORT}`);
        logger.info(`Serveur démarré sur le port ${PORT}`);
        
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
    console.log('\n🛑 Arrêt du serveur...');
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
