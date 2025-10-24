/**
 * 🎯 LOGGER.JS - Système de Logs Magistral pour KING
 * ⚡ Développé par Kervens King - kervens-king/KING
 * 📊 Logs optimisés pour performance et debugging
 * 🚫 VERSION SANS CHALK - Compatibilité garantie
 */

const pino = require('pino');

// 🎨 Configuration des couleurs pour KING (sans chalk)
const kingStyles = {
    success: '🟢 SUCCESS',
    warning: '🟡 WARN', 
    error: '🔴 ERROR',
    info: '🔵 INFO',
    debug: '🐛 DEBUG',
    king: '👑 KING',
    fatal: '💀 FATAL'
};

// 🎪 Formateurs personnalisés pour KING
const kingFormatters = {
    level: (label) => {
        const levels = {
            'success': kingStyles.success,
            'warn': kingStyles.warning,
            'error': kingStyles.error,
            'info': kingStyles.info,
            'debug': kingStyles.debug,
            'fatal': kingStyles.fatal
        };
        return { level: levels[label] || label.toUpperCase() };
    },
    bindings: (bindings) => {
        return {
            pid: bindings.pid,
            hostname: bindings.hostname,
            app: 'KING_BOT',
            version: '1.0.0'
        };
    }
};

// ⚡ Configuration principale du logger
const loggerConfig = {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
    
    // 🎨 Transport pour développement (coloré et lisible)
    transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
            ignore: 'pid,hostname',
            messageFormat: '{msg}',
            customLevels: {
                success: 35,
                warn: 40,
                error: 50,
                info: 30,
                debug: 20,
                fatal: 60
            }
        }
    } : undefined,

    // 📊 Formatters personnalisés KING
    formatters: kingFormatters,

    // ⏰ Timestamp optimisé
    timestamp: () => `,"time":"${new Date().toLocaleString('fr-FR', {
        timeZone: 'Africa/Porto-Novo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })}"`,

    // 🔧 Options supplémentaires
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res
    },

    // 🏷️ Métadonnées KING
    base: {
        app: 'KING_BOT',
        env: process.env.NODE_ENV || 'development',
        node_version: process.version
    },

    // 📈 Performance
    sync: false, // Asynchrone pour meilleure performance
    prettyPrint: process.env.NODE_ENV !== 'production'
};

// 🚀 Création du logger principal
const logger = pino(loggerConfig);

// 👑 Méthodes personnalisées KING
class KingLogger {
    constructor() {
        this.logger = logger;
    }

    /**
     * 🎯 Log de succès KING
     */
    success(message, data = {}) {
        this.logger.info({
            ...data,
            msg: `✅ ${message}`,
            type: 'SUCCESS'
        }, message);
    }

    /**
     * ⚡ Log de démarrage KING
     */
    startup(message, data = {}) {
        this.logger.info({
            ...data,
            msg: `👑 ${message}`,
            type: 'STARTUP'
        }, message);
    }

    /**
     * 🔧 Log technique KING
     */
    technical(message, data = {}) {
        this.logger.debug({
            ...data,
            msg: `🔧 ${message}`,
            type: 'TECHNICAL'
        }, message);
    }

    /**
     * 📱 Log WhatsApp KING
     */
    whatsapp(message, data = {}) {
        this.logger.info({
            ...data,
            msg: `📱 ${message}`,
            type: 'WHATSAPP'
        }, message);
    }

    /**
     * 💾 Log base de données KING
     */
    database(message, data = {}) {
        this.logger.debug({
            ...data,
            msg: `💾 ${message}`,
            type: 'DATABASE'
        }, message);
    }

    /**
     * 🎮 Log commande KING
     */
    command(cmd, user, data = {}) {
        this.logger.info({
            ...data,
            msg: `🎮 Commande: ${cmd} | User: ${user}`,
            type: 'COMMAND'
        }, `Commande exécutée: ${cmd}`);
    }

    /**
     * 📊 Log performance KING
     */
    performance(operation, duration, data = {}) {
        this.logger.debug({
            ...data,
            msg: `📊 ${operation} - ${duration}ms`,
            type: 'PERFORMANCE',
            duration: duration
        }, `Performance: ${operation}`);
    }

    /**
     * 🚨 Log critique KING
     */
    critical(message, data = {}) {
        this.logger.fatal({
            ...data,
            msg: `🚨 ${message}`,
            type: 'CRITICAL'
        }, message);
    }

    /**
     * 🔄 Méthodes standard (compatibilité)
     */
    info(message, data = {}) {
        this.logger.info({
            ...data,
            msg: `🔵 ${message}`,
            type: 'INFO'
        }, message);
    }

    error(message, data = {}) {
        this.logger.error({
            ...data,
            msg: `🔴 ${message}`,
            type: 'ERROR'
        }, message);
    }

    warn(message, data = {}) {
        this.logger.warn({
            ...data,
            msg: `🟡 ${message}`,
            type: 'WARN'
        }, message);
    }

    debug(message, data = {}) {
        this.logger.debug({
            ...data,
            msg: `🐛 ${message}`,
            type: 'DEBUG'
        }, message);
    }

    /**
     * 🎪 Log décoratif KING (pour le démarrage) - SANS CHALK
     */
    banner() {
        console.log(`
╔══════════════════════════════════════════════╗
║                👑 KING BOT                   ║
║           Développé par Kervens King         ║
║                 kervens-king/KING            ║
║                                              ║
║         🚀 Démarrage en cours...            ║
║         📊 Environnement: ${process.env.NODE_ENV || 'development'}              ║
║         ⏰ Timezone: Africa/Porto-Novo       ║
╚══════════════════════════════════════════════╝
        `);
    }

    /**
     * 🎭 Log spécial "Stade Tragique et Belle"
     */
    tragicBeautiful(message, data = {}) {
        this.logger.info({
            ...data,
            msg: `🎭 ${message}`,
            type: 'TRAGIC_BEAUTIFUL'
        }, message);
    }

    /**
     * 🤴 Log royal KING DIVIN
     */
    royal(message, data = {}) {
        this.logger.info({
            ...data,
            msg: `🤴 ${message}`,
            type: 'ROYAL'
        }, message);
    }
}

// 🎯 Instance globale du logger KING
const kingLogger = new KingLogger();

// 📦 Export pour compatibilité
module.exports = kingLogger;

// Export du logger Pino brut pour usage avancé
module.exports.pino = logger;

// Export de la classe pour extension
module.exports.KingLogger = KingLogger;

// 🎪 Mode test
if (require.main === module) {
    kingLogger.banner();
    
    // Tests des différents types de logs
    kingLogger.startup('Système de logs KING initialisé');
    kingLogger.success('Connexion WhatsApp établie');
    kingLogger.whatsapp('Message reçu de +50937277651');
    kingLogger.command('.ping', '+50937277651');
    kingLogger.technical('Session sauvegardée avec succès');
    kingLogger.database('Connexion MongoDB établie');
    kingLogger.performance('Chargement des commandes', 150);
    kingLogger.warn('Stockage faible - 85% utilisé');
    kingLogger.debug('Variable d\'environnement chargée: BOT_NAME=KING');
    kingLogger.error('Erreur de connexion API', { code: 500, url: 'https://api.example.com' });
    kingLogger.royal('Royaume KING DIVIN opérationnel');
    kingLogger.tragicBeautiful('Au stade le plus tragique et plus belle');
    
    console.log('\n🎯 Système de logs KING opérationnel !');
}
