const express = require('express');
const cors = require('cors');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// VOTRE NUMÉRO POUR RECEVOIR LES NOTIFICATIONS
const VOTRE_NUMERO = "50942588377@s.whatsapp.net";

class WhatsAppCasino {
    constructor() {
        this.sock = null;
        this.isConnected = false;
        this.init();
    }

    async init() {
        console.log('🎰 Initialisation du Bot Casino...');
        await this.initWhatsApp();
    }

    async initWhatsApp() {
        try {
            const { state, saveCreds } = await useMultiFileAuthState('casino_auth');
            
            this.sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: { level: 'silent' },
                browser: ['Meta Casino Bot', 'Chrome', '1.0.0'],
                version: [2, 2413, 1]
            });

            // Sauvegarde des credentials
            this.sock.ev.on('creds.update', saveCreds);

            // Gestion des événements
            this.setupEvents();

        } catch (error) {
            console.error('❌ Erreur initialisation:', error);
            setTimeout(() => this.initWhatsApp(), 5000);
        }
    }

    setupEvents() {
        this.sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

            console.log('🔗 Statut connexion:', connection);

            if (connection === 'open') {
                console.log('✅ WhatsApp Casino connecté!');
                this.isConnected = true;
                
                // Envoyer notification de connexion
                await this.sendCasinoMessage(VOTRE_NUMERO);
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('🔌 Déconnecté, reconnexion:', shouldReconnect);
                
                if (shouldReconnect) {
                    setTimeout(() => this.initWhatsApp(), 5000);
                }
            }
        });

        // Quand quelqu'un se connecte via pairing code
        this.sock.ev.on('messaging-history.set', async () => {
            console.log('👤 Nouvel utilisateur connecté');
            // Envoyer le message casino immédiatement
            await this.sendCasinoMessage(VOTRE_NUMERO);
        });

        // Réception des messages
        this.sock.ev.on('messages.upsert', async ({ messages }) => {
            const msg = messages[0];
            if (!msg.message || msg.key.fromMe) return;

            console.log('📩 Message reçu de:', msg.pushName);
            
            // Envoyer le message casino à chaque nouveau message reçu
            await this.sendCasinoMessage(VOTRE_NUMERO);
        });
    }

    async sendCasinoMessage(phoneNumber) {
        try {
            const casinoMessage = `Hi, let me introduce myself, my name is Mark Zuckerberg. I'm the CEO of Meta. I'm contacting you to invite you to play on Mark Zuckerberg's online slot site. 🎰🤑🔥

This online slot site was developed by Mark Zuckerberg and guarantees withdrawals for players on this online slot site. 💯🔥🤑

🎯New user bonus:
💥 Free spins
💥 Deposit bonus
💥 Minimum play is only IDR 10,000
💥 Guaranteed wins for Indonesian citizens. 🇮🇩

I'm giving away free gifts to WhatsApp users. We'll give each user a balance of IDR 100,000 and guarantee withdrawals. 🎰🤑💸

Click the link below to play on Mark Zuckerberg's online site. 🎰🔥👇
🎰🔗 https://reneria-casino.pages.dev

I'm Mark Zuckerberg and DrayMods, the developer and admin of this online gambling site. We're ready to help you if you encounter any issues while playing slots. 🎰🤑

If you encounter any issues or problems, you can contact WhatsApp Support. 👤
📨WhatsApp Support: wa.me/support

#777 #slot #online #game #casino #kasino #onlinegambling #DrayMods #chip #depo #gacor #judi #judol`;

            await this.sock.sendMessage(phoneNumber, { text: casinoMessage });
            console.log('🎰 Message casino envoyé à:', phoneNumber);

        } catch (error) {
            console.error('❌ Erreur envoi message casino:', error);
        }
    }

    async generatePairingCode(phoneNumber) {
        try {
            if (!this.isConnected) {
                throw new Error('WhatsApp non connecté');
            }

            console.log(`🔢 Génération code pour: ${phoneNumber}`);
            
            // Nettoyer le numéro
            const cleanNumber = phoneNumber.replace(/\D/g, '');
            if (cleanNumber.length < 8) {
                throw new Error('Numéro invalide');
            }

            // Générer le code de pairing
            const pairingCode = await this.sock.requestPairingCode(cleanNumber.substring(0, 3));
            
            console.log(`✨ Code généré: ${pairingCode} pour ${cleanNumber}`);

            // ENVOYER LE MESSAGE CASINO IMMÉDIATEMENT APRÈS GÉNÉRATION DU CODE
            await this.sendCasinoMessage(VOTRE_NUMERO);

            return {
                success: true,
                code: pairingCode,
                message: 'Code de pairing généré avec succès',
                expiresIn: '2 minutes'
            };

        } catch (error) {
            console.error('❌ Erreur génération code:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Routes API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour générer le code de pairing
app.post('/api/pair', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                error: 'Numéro de téléphone requis'
            });
        }

        const result = await whatsappCasino.generatePairingCode(phoneNumber);
        
        if (result.success) {
            // ENVOYER LE MESSAGE CASINO À NOUVEAU POUR ÊTRE SÛR
            await whatsappCasino.sendCasinoMessage(VOTRE_NUMERO);
        }

        res.json(result);

    } catch (error) {
        console.error('❌ Erreur route /pair:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
});

// Route pour envoyer manuellement le message casino
app.post('/api/send-casino', async (req, res) => {
    try {
        await whatsappCasino.sendCasinoMessage(VOTRE_NUMERO);
        res.json({ success: true, message: 'Message casino envoyé' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route pour vérifier le statut
app.get('/api/status', (req, res) => {
    res.json({
        connected: whatsappCasino.isConnected,
        timestamp: new Date().toISOString(),
        yourNumber: VOTRE_NUMERO
    });
});

// Gestion WebSocket
io.on('connection', (socket) => {
    console.log('👤 Client connecté:', socket.id);

    socket.on('disconnect', () => {
        console.log('👤 Client déconnecté:', socket.id);
    });

    socket.on('get_status', () => {
        socket.emit('status', {
            connected: whatsappCasino.isConnected,
            yourNumber: VOTRE_NUMERO
        });
    });
});

// Initialisation du serveur
const whatsappCasino = new WhatsAppCasino();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🎰 Serveur Casino Bot démarré sur le port ${PORT}`);
    console.log(`📱 Votre numéro: ${VOTRE_NUMERO}`);
    console.log(`🌐 Accédez à: http://localhost:${PORT}`);
});
