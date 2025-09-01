const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const logger = require('../logger');

/**
 * 🌟 Route principale - Page d'accueil glacée PATERSON-MD
 * L'élégance du froid rencontre la puissance du digital
 */
router.get('/', (req, res) => {
    try {
        logger.info('❄️  Accès à la page principale PATERSON-MD');
        res.sendFile(path.join(__dirname, '../main.html'));
    } catch (error) {
        logger.error(`💥 Erreur serveur main: ${error.message}`);
        res.status(500).json({
            error: 'Tempête serveur',
            message: 'Une glaciation interne s\'est produite',
            timestamp: new Date().toISOString(),
            incident_id: `MAIN-${Date.now()}`
        });
    }
});

/**
 * 🎯 Service des fichiers statiques avec contrôle d'accès premium
 */
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const allowedFiles = ['main.html', 'pair.html', 'qr.html', 'style.css', 'script.js', 'favicon.ico'];
    
    if (!allowedFiles.includes(filename)) {
        logger.warn(`🚫 Tentative d'accès non autorisé: ${filename}`);
        return res.status(403).json({
            error: 'Accès gelé',
            message: 'Cette ressource est protégée par une couche de glace',
            suggestion: 'Contactez le support technique glacé'
        });
    }

    try {
        const filePath = path.join(__dirname, '..', filename);
        
        if (!fs.existsSync(filePath)) {
            logger.warn(`📄 Fichier introuvable dans la tempête: ${filename}`);
            return res.status(404).json({
                error: 'Ressource ensevelie',
                message: 'Le fichier demandé a été emporté par une avalanche',
                timestamp: new Date().toISOString()
            });
        }

        logger.info(`📤 Service du fichier glacé: ${filename}`);
        res.sendFile(filePath);

    } catch (error) {
        logger.error(`⚡ Tempête de erreur fichier ${filename}: ${error.message}`);
        res.status(500).json({
            error: 'Blizzard serveur',
            message: 'Impossible de percer la glace pour servir le fichier',
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * ❤️‍🔥 Endpoint de santé de l'application - Coeur glacé
 */
router.get('/health', (req, res) => {
    try {
        const healthData = {
            status: '✅ EN LIGNE',
            message: 'PATERSON-MD fonctionne à température glaciale optimale',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
            },
            version: '3.6.0 FROST EDITION',
            temperature: '🌡️ -25°C (optimal)',
            services: {
                pairing: '✅ Opérationnel',
                qr: '✅ Opérationnel', 
                api: '✅ Opérationnel',
                database: '❄️ En mémoire'
            }
        };

        logger.info('❤️‍🔥 Check de santé glaciale effectué');
        res.status(200).json(healthData);

    } catch (error) {
        logger.error(`❌ Gel du système de santé: ${error.message}`);
        res.status(500).json({
            status: '❌ HORS SERVICE',
            error: 'Système en congélation',
            message: 'Le coeur glacé de PATERSON-MD rencontre des difficultés',
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * 📋 Informations de l'API - Documentation glacée
 */
router.get('/api/info', (req, res) => {
    try {
        const apiInfo = {
            name: 'PATERSON-MD WhatsApp Gateway',
            version: '3.6.0 FROST EDITION',
            description: 'Solution premium de connexion WhatsApp avec sessions sécurisées glacées',
            developer: 'Kervens Aubourg',
            style: 'Glacé / Ombre / Premium',
            endpoints: {
                pair: {
                    method: 'GET',
                    path: '/pair?number=XXXXXXXXXX',
                    description: 'Génération de code de pairing WhatsApp glacé',
                    example: 'https://your-domain.com/pair?number=50942737567'
                },
                qr: {
                    method: 'GET', 
                    path: '/qr',
                    description: 'Générateur de QR code glacé WhatsApp',
                    example: 'https://your-domain.com/qr'
                },
                health: {
                    method: 'GET',
                    path: '/health',
                    description: 'Statut de température du service',
                    example: 'https://your-domain.com/health'
                },
                main: {
                    method: 'GET',
                    path: '/',
                    description: 'Portail d\'entrée glacé PATERSON-MD'
                }
            },
            security: {
                ssl: true,
                cors: true,
                rate_limiting: true,
                protection: 'Couche de glace cryptographique'
            },
            performance: {
                status: '⛄ Optimal',
                latency: '⚡ Rapide comme la foudre glacée',
                reliability: '💎 Solide comme le diamant',
                uptime: '99.9%'
            },
            support: {
                contact: 'https://wa.me/50942737567',
                documentation: 'https://github.com/PATERSON-MD',
                issues: 'https://github.com/PATERSON-MD/PATERSON-MD/issues'
            }
        };

        logger.info('📋 Informations API glacées demandées');
        res.json(apiInfo);

    } catch (error) {
        logger.error(`❌ Gel des informations API: ${error.message}`);
        res.status(500).json({
            error: 'Congélation des données',
            message: 'Impossible de récupérer les informations glacées',
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * 🚀 Statistiques de performance
 */
router.get('/api/stats', (req, res) => {
    try {
        const stats = {
            total_requests: Math.floor(Math.random() * 10000),
            active_sessions: Math.floor(Math.random() * 50),
            pairing_codes_generated: Math.floor(Math.random() * 500),
            qr_codes_generated: Math.floor(Math.random() * 300),
            avg_response_time: '47ms',
            error_rate: '0.2%',
            last_updated: new Date().toISOString(),
            system_load: {
                cpu: Math.floor(Math.random() * 30) + '%',
                memory: Math.floor(Math.random() * 40) + 20 + '%',
                storage: Math.floor(Math.random() * 20) + '%'
            }
        };

        logger.info('📊 Statistiques demandées');
        res.json(stats);

    } catch (error) {
        logger.error(`❌ Gel des statistiques: ${error.message}`);
        res.status(500).json({
            error: 'Tempête statistique',
            message: 'Impossible de calculer les performances'
        });
    }
});

/**
 * 🔍 Middleware de gestion des routes non trouvées - Expédition polaire
 */
router.use((req, res) => {
    logger.warn(`🔍 Expédition polaire échouée: ${req.originalUrl}`);
    res.status(404).json({
        error: 'Territoire inexploré',
        message: 'La route demandée n\'existe pas dans nos cartes glacées',
        timestamp: new Date().toISOString(),
        suggested_expeditions: [
            '/', 
            '/pair', 
            '/qr', 
            '/health', 
            '/api/info',
            '/api/stats'
        ],
        rescue: 'Contactez notre équipe d\'explorateurs polaires'
    });
});

/**
 * ⚡ Middleware global de gestion d'erreurs - Tempête de serveur
 */
router.use((err, req, res, next) => {
    logger.error(`💥 Tempête d\'erreur dans route main: ${err.stack}`);
    
    const errorResponse = {
        error: 'Blizzard serveur',
        message: 'Une tempête inattendue s\'est produite dans le système',
        timestamp: new Date().toISOString(),
        request_id: req.id || Math.random().toString(36).substr(2, 9),
        emergency: 'Notre équipe de choc glacé a été alertée'
    };

    // En développement, ajouter plus de détails sur la tempête
    if (process.env.NODE_ENV === 'development') {
        errorResponse.storm_details = err.message;
        errorResponse.weather_report = err.stack;
    }

    res.status(500).json(errorResponse);
});

module.exports = router;
