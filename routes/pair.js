const { makeid } = require('../gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const {
    default: KING_MD,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// URL de l'image KING
const KING_IMAGE_URL = 'https://files.catbox.moe/ndj85q.jpg';

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    console.log('👑 Démarrage Pair Code KING DIVIN');
    console.log('🎯 Session ID:', id);
    console.log('📞 Numéro cible:', num || 'Non spécifié');
    
    // Vérification du numéro
    if (!num) {
        return res.status(400).json({ 
            success: false, 
            error: 'Numéro requis' 
        });
    }

    // Nettoyer le numéro
    num = num.replace(/[^0-9]/g, '');
    if (num.length < 10) {
        return res.status(400).json({ 
            success: false, 
            error: 'Numéro invalide' 
        });
    }

    async function KING_DIVIN_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        let Pair_Code_By_Kervens_King = null;
        
        try {
            Pair_Code_By_Kervens_King = KING_MD({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, {
                        level: 'silent'
                    }),
                },
                printQRInTerminal: false,
                logger: {
                    level: 'silent'
                },
                browser: Browsers.macOS('Safari'),
                markOnlineOnConnect: false
            });

            // Gestionnaire de mise à jour des credentials
            Pair_Code_By_Kervens_King.ev.on('creds.update', saveCreds);

            // Attendre que le client soit prêt
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout de connexion'));
                }, 30000);

                Pair_Code_By_Kervens_King.ev.on('connection.update', (update) => {
                    const { connection, lastDisconnect } = update;
                    
                    if (connection === 'open') {
                        clearTimeout(timeout);
                        console.log('✅ Connexion KING établie');
                        resolve();
                    }
                    
                    if (connection === 'close') {
                        clearTimeout(timeout);
                        const error = lastDisconnect?.error;
                        if (error?.output?.statusCode !== 401) {
                            reject(new Error(`Connexion fermée: ${error?.message || 'Raison inconnue'}`));
                        } else {
                            reject(new Error('Authentification échouée'));
                        }
                    }
                });
            });

            // Générer le code de pairing
            console.log('🔢 Numéro formaté:', num);
            const code = await Pair_Code_By_Kervens_King.requestPairingCode(num);
            console.log('📟 Pair Code généré:', code);
            
            // Envoyer la réponse IMMÉDIATEMENT
            res.json({ 
                success: true, 
                code: code,
                sessionId: id,
                message: 'Code généré avec succès! Vérifiez WhatsApp.'
            });
            console.log('✅ Pair Code envoyé au client');

            // Attendre que l'utilisateur utilise le code
            console.log('⏳ En attente de la confirmation de pairing...');
            await delay(10000);

            // Vérifier si le pairing a réussi
            let pairingConfirmed = false;
            const pairingPromise = new Promise((resolve) => {
                Pair_Code_By_Kervens_King.ev.on('connection.update', (update) => {
                    if (update.connection === 'open') {
                        pairingConfirmed = true;
                        resolve(true);
                    }
                });
            });

            // Timeout de 2 minutes pour le pairing
            await Promise.race([
                pairingPromise,
                delay(120000).then(() => false)
            ]);

            if (!pairingConfirmed) {
                console.log('❌ Pairing non confirmé - timeout');
                await Pair_Code_By_Kervens_King.ws.close();
                await removeFile('./temp/' + id);
                return;
            }

            console.log('🎉 Pairing confirmé! Envoi des messages...');

            // Envoyer les messages de bienvenue
            await sendWelcomeMessages(Pair_Code_By_Kervens_King, id);

            // Fermer proprement
            await delay(5000);
            await Pair_Code_By_Kervens_King.ws.close();
            console.log('🔚 Session Pair Code fermée proprement');
            
        } catch (err) {
            console.log('❌ ERREUR Pair Code:', err.message);
            
            // Nettoyer les fichiers temporaires
            await removeFile('./temp/' + id);
            
            // Fermer le client s'il existe
            if (Pair_Code_By_Kervens_King) {
                try {
                    await Pair_Code_By_Kervens_King.ws.close();
                } catch (closeError) {
                    // Ignorer les erreurs de fermeture
                }
            }
            
            // Envoyer une réponse d'erreur si pas déjà envoyée
            if (!res.headersSent) {
                res.status(500).json({ 
                    success: false, 
                    error: 'Erreur lors de la génération du code: ' + err.message 
                });
            }
        }
    }
    
    // Démarrer le processus
    KING_DIVIN_PAIR_CODE();
});

async function sendWelcomeMessages(client, sessionId) {
    try {
        // 1. Image de bienvenue
        console.log('🖼️ Envoi image de bienvenue...');
        await client.sendMessage(client.user.id, {
            image: { url: KING_IMAGE_URL },
            caption: '👑 *CONNEXION ROYALE ÉTABLIE* 👑\n\nBienvenue dans le royaume KING DIVIN !\nVotre session a été connectée avec succès via Pair Code.'
        });

        // 2. Message texte détaillé
        console.log('💬 Envoi du message de bienvenue...');
        const welcomeText = `
╔═══════════════════════════════╗
║         👑 KING DIVIN 👑      ║
║    LÉGENDE ÉTERNELLE v1.0     ║
╚═══════════════════════════════╝

▌ 🤴 SESSION PAIR CODE CONNECTÉE
▌ ✦ Session ID: ${sessionId}
▌ ✦ Méthode: 📱 Pair Code
▌ ✦ Statut: ✅ ACTIVE
▌ ✦ Créateur: Kervens Aubourg

╔═══════════════════════════════╗
║        📞 CONTACT ROYAL       ║
╟───────────────────────────────╢
║ 👑 Support: 50942737567       ║
║ 💻 GitHub: Kervens-King       ║
║ 🎭 Légende: Éternelle         ║
╚═══════════════════════════════╝

✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   BIENVENU DANS LE ROYAUME!  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  

🎭 "Au stade le plus tragique et plus belle"
__________________________________________
`;
        await client.sendMessage(client.user.id, { text: welcomeText });

        // 3. Message final avec invitations
        console.log('🎉 Envoi message final...');
        await client.sendMessage(client.user.id, {
            image: { url: KING_IMAGE_URL },
            caption: '🎊 **INITIATION PAIR CODE TERMINÉE** 🎊\n\nVotre connexion au royaume est confirmée.\n\nRejoignez nos communautés :\n📢 Canal: whatsapp.com/channel/0029Vb6KikfLdQefJursHm20\n👥 Groupe: chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh\n\nProfitez de votre séjour royal ! 👑\n— KING DIVIN 🤴'
        });

        console.log('✅ Tous les messages KING envoyés avec succès');

    } catch (error) {
        console.log('⚠️ Erreur envoi messages:', error.message);
    }
}

module.exports = router;
