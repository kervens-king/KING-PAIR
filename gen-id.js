/**
 * 🎯 Générateur d'ID Sécurisé pour KING Bot
 * ⚡ Développé par Kervens King - kervens-king/KING
 * 👑 IDs optimisés pour performance et sécurité
 */

const crypto = require('crypto');

class KingIDGenerator {
    constructor() {
        this.prefix = 'KING';
    }

    /**
     * Génère un ID sécurisé pour KING
     */
    makeid(length = 12) {
        // Caractères optimisés sans ambiguïté
        const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Retirer I et O
        const lowercase = 'abcdefghjkmnpqrstuvwxyz';   // Retirer i, l, o
        const numbers = '23456789';                    // Retirer 0, 1
        
        // Combinaison de tous les caractères
        const allChars = uppercase + lowercase + numbers;
        
        // Version crypto-sécurisée
        let result = '';
        const randomBytes = crypto.randomBytes(length);
        
        // Toujours commencer par KING
        result = 'KING';
        
        // Générer le reste de manière sécurisée
        for (let i = 0; i < length - 4; i++) {
            result += allChars[randomBytes[i] % allChars.length];
        }
        
        return result;
    }

    /**
     * Génère un ID de fichier unique avec timestamp
     */
    generateFileId(prefix = 'file') {
        const timestamp = Date.now().toString(36);
        const randomPart = this.makeid(6).replace('KING', '');
        return `${this.prefix}_${prefix}_${timestamp}_${randomPart}`.toLowerCase();
    }

    /**
     * Génère un token d'authentification sécurisé
     */
    generateAuthToken(length = 24) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let token = this.prefix + '_';
        
        // Version crypto-sécurisée
        const randomBytes = crypto.randomBytes(length);
        for (let i = 0; i < length - 5; i++) {
            token += chars[randomBytes[i] % chars.length];
        }
        
        return token;
    }

    /**
     * Génère un ID de session pour KING
     */
    generateSessionId() {
        const timestamp = Date.now();
        const randomHash = crypto.randomBytes(8).toString('hex');
        return `${this.prefix}_SESSION_${timestamp}_${randomHash}`.toUpperCase();
    }

    /**
     * Génère un ID court pour partage
     */
    generateShortId(length = 8) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        const randomBytes = crypto.randomBytes(length);
        
        for (let i = 0; i < length; i++) {
            result += chars[randomBytes[i] % chars.length];
        }
        
        return `${this.prefix}_${result}`;
    }

    /**
     * Génère un code numérique pour les vérifications
     */
    generateNumericCode(length = 6) {
        let code = '';
        const randomBytes = crypto.randomBytes(length);
        
        for (let i = 0; i < length; i++) {
            code += randomBytes[i] % 10;
        }
        
        return code;
    }

    /**
     * Génère un ID pour les groupes temporaires
     */
    generateTempId() {
        const timestamp = Date.now().toString(36).slice(-4);
        const randomPart = this.makeid(4).replace('KING', '');
        return `${this.prefix}_TEMP_${timestamp}_${randomPart}`.toLowerCase();
    }

    /**
     * Génère un ID de message unique
     */
    generateMessageId() {
        const timestamp = Date.now();
        const randomPart = crypto.randomBytes(6).toString('hex');
        return `${this.prefix}_MSG_${timestamp}_${randomPart}`.toUpperCase();
    }

    /**
     * Vérifie si un ID est valide selon les critères KING
     */
    isValidId(id, minLength = 8, maxLength = 32) {
        if (typeof id !== 'string') return false;
        if (id.length < minLength || id.length > maxLength) return false;
        
        // Doit commencer par KING
        if (!id.startsWith('KING')) return false;
        
        // Expression régulière pour valider le format
        const regex = /^KING[A-Za-z0-9_]{4,28}$/;
        return regex.test(id);
    }

    /**
     * Génère un batch d'IDs pour tests
     */
    generateBatch(type = 'session', count = 5) {
        const results = [];
        for (let i = 0; i < count; i++) {
            switch (type) {
                case 'session':
                    results.push(this.generateSessionId());
                    break;
                case 'file':
                    results.push(this.generateFileId());
                    break;
                case 'message':
                    results.push(this.generateMessageId());
                    break;
                case 'short':
                    results.push(this.generateShortId());
                    break;
                default:
                    results.push(this.makeid());
            }
        }
        return results;
    }
}

// Instance globale
const kingID = new KingIDGenerator();

// Fonctions d'export direct (rétrocompatibilité)
function makeid(length) {
    return kingID.makeid(length);
}

function generateFileId(prefix) {
    return kingID.generateFileId(prefix);
}

function generateAuthToken(length) {
    return kingID.generateAuthToken(length);
}

function generateSessionId() {
    return kingID.generateSessionId();
}

function generateShortId(length) {
    return kingID.generateShortId(length);
}

function generateNumericCode(length) {
    return kingID.generateNumericCode(length);
}

function generateTempId() {
    return kingID.generateTempId();
}

function generateMessageId() {
    return kingID.generateMessageId();
}

function isValidId(id, minLength, maxLength) {
    return kingID.isValidId(id, minLength, maxLength);
}

// Export pour KING Bot
module.exports = {
    KingIDGenerator,
    makeid,
    generateFileId,
    generateAuthToken,
    generateSessionId,
    generateShortId,
    generateNumericCode,
    generateTempId,
    generateMessageId,
    isValidId,
    generateBatch: kingID.generateBatch.bind(kingID)
};

// Mode CLI - Démonstration
if (require.main === module) {
    console.log(`
╔══════════════════════════════════╗
║           KING ID GEN            ║
║     Développé par Kervens King   ║
╚══════════════════════════════════╝
    `);

    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // Démonstration de tous les types d'IDs
        console.log('🔐 SESSIONS:');
        console.log(`   ${generateSessionId()}`);
        
        console.log('\n📁 FICHIERS:');
        console.log(`   ${generateFileId('image')}`);
        console.log(`   ${generateFileId('video')}`);
        
        console.log('\n💬 MESSAGES:');
        console.log(`   ${generateMessageId()}`);
        
        console.log('\n🔗 COURTS:');
        console.log(`   ${generateShortId()}`);
        
        console.log('\n🔢 NUMÉRIQUES:');
        console.log(`   ${generateNumericCode()}`);
        
        console.log('\n⚡ TOKENS:');
        console.log(`   ${generateAuthToken()}`);
        
        console.log('\n💡 Usage: node gen-id.js [session|file|message|short|token|batch]');
    } else {
        const command = args[0].toLowerCase();
        switch (command) {
            case 'session':
                console.log(generateSessionId());
                break;
            case 'file':
                const prefix = args[1] || 'file';
                console.log(generateFileId(prefix));
                break;
            case 'message':
                console.log(generateMessageId());
                break;
            case 'short':
                const length = parseInt(args[1]) || 8;
                console.log(generateShortId(length));
                break;
            case 'token':
                const tokenLength = parseInt(args[1]) || 24;
                console.log(generateAuthToken(tokenLength));
                break;
            case 'batch':
                const count = parseInt(args[1]) || 5;
                const type = args[2] || 'session';
                const batch = kingID.generateBatch(type, count);
                batch.forEach(id => console.log(id));
                break;
            default:
                console.log('❌ Commande non reconnue');
                console.log('Commandes: session, file, message, short, token, batch');
        }
    }
}
