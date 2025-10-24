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
    
    const { WebSocketServer } = require('ws');
    console.log('✅ WebSocket chargé');
    
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

    // WebSocket Server pour temps réel
    const wss = new WebSocketServer({ noServer: true });
    const activeConnections = new Set();

    wss.on('connection', (ws) => {
      activeConnections.add(ws);
      console.log('👑 Nouvelle connexion WebSocket royale');
      
      ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Bienvenue dans le royaume KING DIVIN',
        timestamp: Date.now()
      }));

      ws.on('close', () => {
        activeConnections.delete(ws);
        console.log('👑 Connexion WebSocket fermée');
      });

      ws.on('error', (error) => {
        console.error('❌ Erreur WebSocket:', error);
      });
    });

    // Charger les variables d'environnement
    dotenv.config();
    console.log('✅ Variables d\'environnement chargées');

    // Middleware
    console.log('🔄 Configuration des middlewares royaux...');
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static(path.join(__dirname, 'views')));
    
    // MIDDLEWARE DE LOGGING ROYAL ✅
    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        logger.info(`👑 [${timestamp}] ${req.method} ${req.url} - ${req.ip}`);
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

    // Route principale - Page d'accueil KING
    app.get('/', (req, res) => {
        try {
            console.log('🏰 Servir la page d\'accueil royale');
            res.sendFile(path.join(__dirname, 'views', 'index.html'));
        } catch (error) {
            console.error('❌ Erreur chargement accueil:', error);
            res.status(500).json({ error: 'Erreur de chargement du royaume' });
        }
    });

    // Route pour la page QR Code Royal
    app.get('/qr-page', (req, res) => {
        try {
            console.log('📱 Servir la page QR code royal');
            res.sendFile(path.join(__dirname, 'views', 'qr-royal.html'));
        } catch (error) {
            console.error('❌ Erreur chargement QR page:', error);
            res.status(500).json({ error: 'Erreur de chargement du QR code royal' });
        }
    });

    // Route pour la page Pair Code
    app.get('/pair-page', (req, res) => {
        try {
            console.log('⚡ Servir la page pair code');
            res.sendFile(path.join(__dirname, 'views', 'pair.html'));
        } catch (error) {
            console.error('❌ Erreur chargement pair page:', error);
            res.status(500).json({ error: 'Erreur de chargement du code d\'union' });
        }
    });

    // ⭐ API ROYALE ⭐

    // API pour générer un QR Code
    app.post('/api/qr/generate', (req, res) => {
        try {
            console.log('👑 Génération QR code royal...');
            const qrData = generateQRData();
            
            // Simuler la génération d'un QR code
            const qrCode = {
                data: `KING-DIVIN-${qrData.sessionId}`,
                sessionId: qrData.sessionId,
                expires: qrData.expires,
                timestamp: qrData.timestamp
            };

            // Notifier toutes les connexions WebSocket
            activeConnections.forEach(ws => {
                ws.send(JSON.stringify({
                    type: 'qr_generated',
                    sessionId: qrData.sessionId,
                    timestamp: qrData.timestamp
                }));
            });

            logger.info(`QR code royal généré: ${qrData.sessionId}`);
            res.json({
                success: true,
                qrCode: qrCode,
                message: 'QR code royal généré avec succès',
                expiresIn: '2 minutes'
            });

        } catch (error) {
            console.error('❌ Erreur génération QR:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de la génération du QR code royal' 
            });
        }
    });

    // API pour générer un Pair Code
    app.post('/api/pair/generate', (req, res) => {
        try {
            console.log('👑 Génération pair code royal...');
            const pairData = generatePairCode();
            
            // Notifier toutes les connexions WebSocket
            activeConnections.forEach(ws => {
                ws.send(JSON.stringify({
                    type: 'pair_generated',
                    code: pairData.code,
                    timestamp: Date.now()
                }));
            });

            logger.info(`Pair code royal généré: ${pairData.code}`);
            res.json({
                success: true,
                code: pairData.code,
                expires: pairData.expires,
                message: 'Code d\'union divine généré avec succès',
                expiresIn: '5 minutes'
            });

        } catch (error) {
            console.error('❌ Erreur génération pair code:', error);
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
            activeConnections: activeConnections.size,
            timestamp: Date.now(),
            message: 'Le royaume fonctionne parfaitement 👑'
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
        try {
            console.log('📊 Servir la page de statut céleste');
            res.sendFile(path.join(__dirname, 'views', 'status.html'));
        } catch (error) {
            console.error('❌ Erreur chargement statut:', error);
            res.status(500).json({ error: 'Erreur de chargement du statut céleste' });
        }
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
        logger.warn(`Route non trouvée: ${req.method} ${req.url}`);
        res.status(404).json({
            error: 'Route royale non trouvée',
            message: 'Cette route n\'existe pas dans le royaume',
            availableRoutes: ['/', '/qr-page', '/pair-page', '/status', '/support']
        });
    });

    // Gestion des erreurs globales
    app.use((err, req, res, next) => {
        logger.error(`Erreur royale: ${err.stack}`);
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
            fs.readdirSync(tempDir).forEach(file => {
                const filePath = path.join(tempDir, file);
                try {
                    const stat = fs.statSync(filePath);
                    
                    // Supprimer les sessions vieilles de plus d'1 heure
                    if (stat.isDirectory() && (Date.now() - stat.mtimeMs) > 3600000) {
                        fs.rmSync(filePath, { recursive: true, force: true });
                        logger.info(`Session royale ancienne supprimée: ${file}`);
                    }
                } catch (error) {
                    console.error(`❌ Erreur nettoyage session ${file}:`, error);
                }
            });
        }
    }

    // Fonction pour broadcaster des mises à jour
    function broadcastToAll(message) {
        activeConnections.forEach(ws => {
            try {
                ws.send(JSON.stringify({
                    type: 'broadcast',
                    message: message,
                    timestamp: Date.now()
                }));
            } catch (error) {
                console.error('❌ Erreur broadcast:', error);
            }
        });
    }

    // Démarrer le serveur royal
    const PORT = process.env.PORT || 10000;
    const server = app.listen(PORT, () => {
        // ⭐ AFFICHAGE DES INFOS ROYALES ⭐
        displayKingInfo();
        
        console.log(`✅ Serveur royal démarré sur le port ${PORT}`);
        logger.info(`👑 Royaume KING DIVIN démarré sur le port ${PORT}`);
        
        // ⭐ EXEMPLE D'UTILISATION DES FONCTIONS ROYALES ⭐
        const sessionId = makeKingCode(8);
        console.log(`🎯 Session royale générée: ${sessionId}`);
        
        const pairCode = generatePairCode();
        console.log(`⚡ Code d'union généré: ${pairCode.code}`);
        
        // Nettoyer les anciennes sessions
        cleanupRoyalSessions();
        
        // Planifier le nettoyage régulier
        setInterval(cleanupRoyalSessions, 3600000); // Toutes les heures
        
        // Broadcast de bienvenue
        setTimeout(() => {
            broadcastToAll('Le royaume KING DIVIN est maintenant opérationnel 👑');
        }, 2000);
    });

    // Attacher WebSocket au serveur HTTP
    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

} catch (error) {
    console.error('❌ ERREUR CRITIQUE ROYALE:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
}

// Gestion propre de l'arrêt royal
process.on('SIGINT', () => {
    console.log('\n🛑 Arrêt du royaume KING...');
    broadcastToAll('Le royaume s\'éteint... À bientôt 👑');
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Arrêt demandé du royaume...');
    broadcastToAll('Maintenance royale en cours...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Exception royale non capturée:', error);
    logger.error(`Exception royale: ${error.message}`, error.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Rejet royal non géré:', reason);
    logger.error(`Rejet royal: ${reason}`);
    process.exit(1);
});

console.log('👑 Configuration royale terminée - Prêt au lancement!');
