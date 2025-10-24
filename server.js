console.log('🔍 Debug: Démarrage KING...');
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
console.log('🔍 PORT:', process.env.PORT);
console.log('👑 Démarrage de KING DIVIN...');
console.log('📦 Chargement des modules royaux...');

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
    
    // ⭐ FONCTIONS ROYALES INTÉGRÉES DIRECTEMENT ⭐
    function makeRoyalId(num = 6) {
      return Math.random().toString(36).substring(2, 2 + num).toUpperCase();
    }

    function makeKingCode(num = 8) {
      return "KING-" + makeRoyalId(num);
    }

    function generatePairCode() {
      const code = makeKingCode(6);
      const expires = Date.now() + 300000; // 5 minutes
      return { code, expires };
    }

    function displayKingInfo() {
      console.log(`
╔═══════════════════════════════════════════════════╗
║                  👑 KING DIVIN 👑                 ║
║               LÉGENDE ÉTERNELLE v1.0.0            ║
║                                                   ║
║  📸 Logo Royal: 👑                               ║
║  📢 Canal Royal: https://whatsapp.com/channel/    ║
║       0029Vb6KikfLdQefJursHm20                    ║
║                                                   ║
║  💡 Sagesse Royale: Le pouvoir se mérite,         ║
║                    ne se réclame pas 🤴           ║
║                                                   ║
║  👨‍💻 Créateur: Kervens Aubourg                   ║
║  📞 Support Divin: https://wa.me/50942737567      ║
╚═══════════════════════════════════════════════════╝
      `);
    }

    function generateQRData() {
      return {
        sessionId: makeKingCode(8),
        timestamp: Date.now(),
        expires: Date.now() + 120000 // 2 minutes
      };
    }

    console.log('✅ Fonctions royales intégrées directement');
    
    const app = express();
    console.log('✅ Application Express créée');

    // Charger les variables d'environnement
    dotenv.config();
    console.log('✅ Variables d\'environnement chargées');

    // ⭐ CRÉATION AUTOMATIQUE DES DOSSIERS ⭐
    function ensureDirectories() {
        const directories = [
            'views',
            'public',
            'public/css', 
            'public/js',
            'public/images',
            'temp',
            'routes'
        ];
        
        directories.forEach(dir => {
            const dirPath = path.join(__dirname, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                console.log(`📁 Dossier créé: ${dir}`);
            }
        });
    }
    ensureDirectories();

    // Middleware
    console.log('🔄 Configuration des middlewares royaux...');
    app.use(express.json());
    app.use(express.static('.')); // Servir la racine pour index.html
    app.use(express.static('public'));
    
    // MIDDLEWARE DE LOGGING ROYAL ✅
    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`👑 [${timestamp}] ${req.method} ${req.url} - ${req.ip}`);
        next();
    });
    
    // Middleware CORS pour les requêtes cross-origin
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });

    console.log('✅ Middlewares royaux configurés');

    // ⭐ ROUTES ROYALES ⭐

    // Route principale - Page d'accueil KING (index.html à la racine)
    app.get('/', (req, res) => {
        try {
            const indexPath = path.join(__dirname, 'index.html');
            
            if (fs.existsSync(indexPath)) {
                console.log('🏰 Servir index.html depuis la racine');
                res.sendFile(indexPath);
            } else {
                // Fallback HTML si index.html n'existe pas
                console.log('⚠️ index.html non trouvé, servir version basique');
                res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KING 🤴 - Légende Divine</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-family: Arial; 
            color: white;
        }
        .container { text-align: center; padding: 2rem; }
        .crown { font-size: 4rem; margin-bottom: 1rem; }
        .title { font-size: 2.5rem; color: gold; margin-bottom: 0.5rem; }
        .subtitle { color: #ccc; margin-bottom: 2rem; }
        .button { 
            display: inline-block; 
            background: gold; 
            color: black; 
            padding: 1rem 2rem; 
            margin: 0.5rem; 
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
        }
        .button:hover { background: orange; transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="container">
        <div class="crown">👑</div>
        <h1 class="title">KING DIVIN</h1>
        <p class="subtitle">Légende Éternelle - Créé par Kervens Aubourg</p>
        
        <a href="/qr-page" class="button">🌟 QR CODE SACRÉ</a>
        <a href="/pair-page" class="button">⚡ CODE D'UNION</a>
        <a href="/status" class="button">📊 STATUT CÉLESTE</a>
        <a href="https://wa.me/50942737567" class="button">🛡️ SUPPORT DIVIN</a>
    </div>
</body>
</html>
                `);
            }
        } catch (error) {
            console.error('❌ Erreur chargement accueil:', error);
            res.status(500).json({ 
                error: 'Erreur de chargement du royaume',
                message: 'Le royaume est en maintenance'
            });
        }
    });

    // Route pour la page QR Code Royal
    app.get('/qr-page', (req, res) => {
        try {
            const qrPagePath = path.join(__dirname, 'views', 'qr-royal.html');
            if (fs.existsSync(qrPagePath)) {
                console.log('📱 Servir la page QR code royal');
                res.sendFile(qrPagePath);
            } else {
                // Fallback pour QR page
                res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>QR Code Royal - KING DIVIN</title>
    <style>
        body { background: #000; color: gold; text-align: center; padding: 3rem; }
        h1 { margin-bottom: 2rem; }
        .info { background: rgba(255,215,0,0.1); padding: 2rem; border-radius: 10px; }
    </style>
</head>
<body>
    <h1>👑 QR CODE ROYAL</h1>
    <div class="info">
        <p>Page QR Code en construction...</p>
        <p>Accédez directement à: <a href="/qr" style="color:gold;">/qr</a></p>
    </div>
</body>
</html>
                `);
            }
        } catch (error) {
            console.error('❌ Erreur chargement QR page:', error);
            res.status(500).json({ error: 'Erreur de chargement du QR code royal' });
        }
    });

    // Route pour la page Pair Code
    app.get('/pair-page', (req, res) => {
        try {
            const pairPagePath = path.join(__dirname, 'views', 'pair.html');
            if (fs.existsSync(pairPagePath)) {
                console.log('⚡ Servir la page pair code');
                res.sendFile(pairPagePath);
            } else {
                // Fallback pour Pair page
                res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Pair Code - KING DIVIN</title>
    <style>
        body { background: #000; color: gold; text-align: center; padding: 3rem; }
        h1 { margin-bottom: 2rem; }
        .info { background: rgba(255,215,0,0.1); padding: 2rem; border-radius: 10px; }
    </style>
</head>
<body>
    <h1>⚡ CODE D'UNION</h1>
    <div class="info">
        <p>Page Pair Code en construction...</p>
        <p>Utilisez: <a href="/pair?number=VOTRE_NUMERO" style="color:gold;">/pair?number=509XXXXXXX</a></p>
    </div>
</body>
</html>
                `);
            }
        } catch (error) {
            console.error('❌ Erreur chargement pair page:', error);
            res.status(500).json({ error: 'Erreur de chargement du code d\'union' });
        }
    });

    // ⭐ CHARGEMENT DES ROUTES DYNAMIQUES ⭐
    console.log('🔄 Chargement des routes...');
    
    // Charger les routes avec gestion d'erreur
    function loadRoute(routePath, routeName) {
        try {
            if (fs.existsSync(routePath)) {
                const route = require(routePath);
                app.use('/' + routeName.toLowerCase(), route);
                console.log(`✅ Route ${routeName} chargée`);
                return true;
            } else {
                console.log(`⚠️ Route ${routeName} non trouvée: ${routePath}`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Erreur chargement route ${routeName}:`, error.message);
            return false;
        }
    }

    // Charger les routes principales
    const qrLoaded = loadRoute('./routes/qr.js', 'qr');
    const pairLoaded = loadRoute('./routes/pair.js', 'pair');
    const mainLoaded = loadRoute('./routes/main.js', 'main');

    // ⭐ API ROYALE ⭐

    // API pour générer un Pair Code
    app.post('/api/pair/generate', (req, res) => {
        try {
            console.log('👑 Génération pair code royal via API...');
            const pairData = generatePairCode();
            
            console.log(`🎯 Pair code généré: ${pairData.code}`);
            res.json({
                success: true,
                code: pairData.code,
                expires: pairData.expires,
                message: 'Code d\'union divine généré avec succès',
                expiresIn: '5 minutes'
            });

        } catch (error) {
            console.error('❌ Erreur génération pair code API:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de la génération du code d\'union' 
            });
        }
    });

    // API pour vérifier le statut
    app.get('/api/status', (req, res) => {
        res.json({
            status: 'online',
            service: 'KING DIVIN',
            version: '1.0.0 Royale',
            uptime: process.uptime(),
            timestamp: Date.now(),
            message: 'Le royaume fonctionne parfaitement 👑',
            routes: {
                qr: qrLoaded,
                pair: pairLoaded,
                main: mainLoaded
            }
        });
    });

    // API pour les informations du système
    app.get('/api/system/info', (req, res) => {
        res.json({
            system: {
                platform: process.platform,
                arch: process.arch,
                nodeVersion: process.version,
                memory: process.memoryUsage(),
                uptime: process.uptime()
            },
            king: {
                name: 'KING DIVIN',
                version: '1.0.0',
                creator: 'Kervens Aubourg',
                description: 'Légende Éternelle'
            }
        });
    });

    // Route pour le statut céleste
    app.get('/status', (req, res) => {
        res.json({
            status: 'online',
            king: 'DIVIN',
            version: '1.0.0',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            message: '🎭 Au stade le plus tragique et plus belle'
        });
    });

    // Route pour le support divin
    app.get('/support', (req, res) => {
        res.json({
            support: {
                whatsapp: 'https://wa.me/50942737567',
                canal: 'https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20',
                createur: 'Kervens Aubourg',
                message: 'Support divin disponible 24/7'
            }
        });
    });

    // Gestion des erreurs 404 - Route non trouvée
    app.use((req, res) => {
        console.log(`⚠️ Route non trouvée: ${req.method} ${req.url}`);
        res.status(404).json({
            error: 'Route royale non trouvée',
            message: 'Cette route n\'existe pas dans le royaume',
            availableRoutes: ['/', '/qr-page', '/pair-page', '/status', '/support', '/api/status']
        });
    });

    // Gestion des erreurs globales
    app.use((err, req, res, next) => {
        console.error(`❌ Erreur royale: ${err.stack}`);
        res.status(500).json({
            error: 'Erreur interne du royaume',
            message: 'Une erreur divine s\'est produite'
        });
    });

    console.log('✅ Routes royales configurées');

    // Nettoyage royal au démarrage
    function cleanupRoyalSessions() {
        console.log('🧹 Nettoyage des sessions royales...');
        const tempDir = path.join(__dirname, 'temp');
        if (fs.existsSync(tempDir)) {
            try {
                fs.readdirSync(tempDir).forEach(file => {
                    const filePath = path.join(tempDir, file);
                    try {
                        const stat = fs.statSync(filePath);
                        
                        // Supprimer les sessions vieilles de plus d'1 heure
                        if ((Date.now() - stat.mtimeMs) > 3600000) {
                            fs.rmSync(filePath, { recursive: true, force: true });
                            console.log(`🗑️ Session royale ancienne supprimée: ${file}`);
                        }
                    } catch (error) {
                        console.error(`❌ Erreur nettoyage session ${file}:`, error);
                    }
                });
            } catch (error) {
                console.error('❌ Erreur accès dossier temp:', error);
            }
        }
    }

    // Démarrer le serveur royal
    const PORT = process.env.PORT || 10000;
    const server = app.listen(PORT, () => {
        // ⭐ AFFICHAGE DES INFOS ROYALES ⭐
        displayKingInfo();
        
        console.log(`✅ Serveur royal démarré sur le port ${PORT}`);
        console.log(`🏰 Accès: http://localhost:${PORT}`);
        console.log(`📱 QR Code: http://localhost:${PORT}/qr`);
        console.log(`⚡ Pair Code: http://localhost:${PORT}/pair`);
        console.log(`📊 Statut: http://localhost:${PORT}/status`);
        
        // ⭐ EXEMPLE D'UTILISATION DES FONCTIONS ROYALES ⭐
        const sessionId = makeKingCode(8);
        console.log(`🎯 Session royale générée: ${sessionId}`);
        
        const pairCode = generatePairCode();
        console.log(`⚡ Code d'union généré: ${pairCode.code}`);
        
        // Nettoyer les anciennes sessions
        cleanupRoyalSessions();
        
        // Planifier le nettoyage régulier
        setInterval(cleanupRoyalSessions, 3600000); // Toutes les heures
        
        console.log('🎭 "Au stade le plus tragique et plus belle"');
    });

} catch (error) {
    console.error('❌ ERREUR CRITIQUE ROYALE:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
}

// Gestion propre de l'arrêt royal
process.on('SIGINT', () => {
    console.log('\n🛑 Arrêt du royaume KING...');
    console.log('👑 Merci d\'avoir visité le royaume KING DIVIN');
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Arrêt demandé du royaume...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Exception royale non capturée:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Rejet royal non géré:', reason);
    process.exit(1);
});

console.log('👑 Configuration royale terminée - Prêt au lancement!');
