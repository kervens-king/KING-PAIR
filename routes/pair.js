const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { DisconnectReason } = require('@whiskeysockets/baileys');
const logger = require('../logger');

// Configuration
const TEMP_DIR = path.join(__dirname, 'temp');
const SESSION_TIMEOUT = 120000; // 2 minutes au lieu de 3

// Créer le répertoire temp s'il n'existe pas
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    logger.info('❄️ Répertoire de sessions temporaires créé');
}

// Fonction pour générer un ID de session
function makeid(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Fonction pour supprimer les fichiers temporaires
function removeSessionFiles(sessionPath) {
    if (fs.existsSync(sessionPath)) {
        try {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            logger.info(`🧊 Session nettoyée: ${path.basename(sessionPath)}`);
        } catch (error) {
            logger.error(`❌ Erreur nettoyage: ${error.message}`);
        }
    }
}

// Route principale pour la génération de pairing code
router.get('/', async (req, res) => {
    const sessionId = makeid();
    const sessionPath = path.join(TEMP_DIR, sessionId);
    let num = req.query.number;
    
    // Vérification du numéro
    if (!num) {
        return res.status(400).json({ 
            error: "Numéro manquant", 
            message: "Le paramètre 'number' est requis (ex: ?number=50942737567)" 
        });
    }

    // Nettoyage du numéro
    num = num.replace(/\D/g, '');
    
    if (num.length < 8) {
        return res.status(400).json({ 
            error: "Numéro invalide", 
            message: "Le numéro doit contenir au moins 8 chiffres (incluant l'indicatif pays)" 
        });
    }

    logger.info(`🔗 Tentative de pairing pour: ${num}`);

    try {
        // Création du répertoire de session
        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }

        // Importation dynamique de Baileys
        const { makeWASocket, useMultiFileAuthState, Browsers, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys');
        
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

        const sock = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger),
            },
            printQRInTerminal: false,
            logger: logger,
            browser: Browsers.macOS("Safari"),
            syncFullHistory: false,
            generateHighQualityLinkPreview: true,
            getMessage: async () => null,
            connectTimeout: 30000 // 30 secondes de timeout de connexion
        });

        // Timeout pour éviter les sessions bloquées
        const sessionTimer = setTimeout(async () => {
            logger.warn(`⏰ Timeout session: ${sessionId}`);
            try {
                await sock.ws.close();
            } catch (e) {
                logger.error(`❌ Erreur fermeture timeout: ${e.message}`);
            }
            removeSessionFiles(sessionPath);
            if (!res.headersSent) {
                res.status(504).json({ 
                    error: "Timeout", 
                    message: "La session a expiré (2 minutes)" 
                });
            }
        }, SESSION_TIMEOUT);

        // Gestion des mises à jour des credentials
        sock.ev.on('creds.update', saveCreds);

        // Gestion des événements de connexion
        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, qr } = update;

            // Log des états de connexion
            if (connection) {
                logger.info(`📶 État connexion: ${connection}`);
            }

            if (connection === "open") {
                logger.info(`✅ Connexion ouverte: ${sessionId}`);
                clearTimeout(sessionTimer);
                
                try {
                    // Vérification d'enregistrement
                    if (!sock.authState.creds.registered) {
                        logger.info(`🔢 Demande code pairing pour: ${num}`);
                        
                        const code = await sock.requestPairingCode(num);
                        logger.info(`✅ Code pairing généré: ${code} pour ${num}`);
                        
                        if (!res.headersSent) {
                            res.json({ 
                                success: true,
                                code: code,
                                message: "Code de pairing généré avec succès",
                                timestamp: new Date().toISOString(),
                                expires_in: "120 secondes"
                            });
                        }
                    } else {
                        logger.warn(`⚠️ Session déjà enregistrée: ${sessionId}`);
                        if (!res.headersSent) {
                            res.status(400).json({ 
                                error: "Déjà enregistré", 
                                message: "Ce numéro est déjà enregistré" 
                            });
                        }
                    }
                } catch (pairingError) {
                    logger.error(`❌ Erreur pairing: ${pairingError.message}`);
                    if (!res.headersSent) {
                        res.status(500).json({ 
                            error: "Erreur WhatsApp", 
                            message: "Impossible de générer le code de pairing",
                            details: pairingError.message
                        });
                    }
                } finally {
                    // Fermeture propre
                    try {
                        await sock.ws.close();
                        removeSessionFiles(sessionPath);
                        logger.info(`🔒 Session fermée: ${sessionId}`);
                    } catch (closeError) {
                        logger.error(`❌ Erreur fermeture: ${closeError.message}`);
                    }
                }
            } 
            else if (connection === "close" && lastDisconnect?.error) {
                clearTimeout(sessionTimer);
                removeSessionFiles(sessionPath);
                
                const statusCode = lastDisconnect.error.output?.statusCode;
                let errorMessage = "Connexion fermée inopinément";
                
                if (statusCode === DisconnectReason.loggedOut) {
                    errorMessage = "Déconnecté - session expirée";
                    logger.warn(`🔒 Déconnecté: ${sessionId}`);
                } else if (statusCode === DisconnectReason.connectionLost) {
                    errorMessage = "Connexion perdue";
                    logger.warn(`📡 Connexion perdue: ${sessionId}`);
                } else if (statusCode === DisconnectReason.connectionReplaced) {
                    errorMessage = "Connexion remplacée";
                    logger.warn(`🔄 Connexion remplacée: ${sessionId}`);
                } else if (statusCode !== 401) {
                    errorMessage = "Reconnexion nécessaire";
                    logger.warn(`🔄 Reconnexion nécessaire: ${sessionId}`);
                }
                
                if (!res.headersSent) {
                    res.status(500).json({ 
                        error: "Connexion échouée", 
                        message: errorMessage,
                        error_code: statusCode
                    });
                }
            }
            else if (qr) {
                logger.info(`📋 QR code reçu pour: ${sessionId}`);
            }
        });

        // Gestion des erreurs non capturées
        sock.ev.on("connection.update", (update) => {
            if (update.lastDisconnect?.error) {
                logger.error(`💥 Erreur connexion: ${update.lastDisconnect.error.message}`);
            }
        });

    } catch (mainError) {
        logger.error(`💥 Erreur principale: ${mainError.message}`);
        
        // Nettoyage en cas d'erreur
        removeSessionFiles(sessionPath);
        
        if (!res.headersSent) {
            res.status(500).json({ 
                error: "Erreur serveur", 
                message: "Impossible de traiter la demande",
                details: process.env.NODE_ENV === 'development' ? mainError.message : undefined
            });
        }
    }
});

// Middleware de gestion d'erreurs
router.use((err, req, res, next) => {
    logger.error(`💥 Erreur route pair: ${err.stack}`);
    res.status(500).json({
        error: 'Erreur interne',
        message: 'Une erreur est survenue lors du pairing',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
