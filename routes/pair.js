const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
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
    
    async function KING_DIVIN_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Kervens_King = KING_MD({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, {
                        level: 'silent',
                        info: () => {},
                        error: () => {},
                        warn: () => {},
                        debug: () => {}
                    }),
                },
                printQRInTerminal: false,
                logger: {
                    level: 'silent',
                    info: () => {},
                    error: () => {},
                    warn: () => {},
                    debug: () => {}
                },
                browser: Browsers.macOS('Safari')
            });

            if (!Pair_Code_By_Kervens_King.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                console.log('🔢 Numéro formaté:', num);
                const code = await Pair_Code_By_Kervens_King.requestPairingCode(num);
                console.log('📟 Pair Code généré:', code);
                
                if (!res.headersSent) {
                    await res.send({ code });
                    console.log('✅ Pair Code envoyé au client');
                }
            }

            Pair_Code_By_Kervens_King.ev.on('creds.update', saveCreds);
            Pair_Code_By_Kervens_King.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    console.log('✅ Connexion KING établie');
                    await delay(5000);
                    
                    try {
                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                        await delay(800);
                        let b64data = Buffer.from(data).toString('base64');
                        let session = await Pair_Code_By_Kervens_King.sendMessage(
                            Pair_Code_By_Kervens_King.user.id, 
                            { text: 'king~' + b64data }
                        );

                        // 1. Envoyer l'image de bienvenue KING
                        console.log('🖼️ Envoi image de bienvenue...');
                        try {
                            await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                                image: { url: KING_IMAGE_URL },
                                caption: '👑 *CONNEXION ROYALE ÉTABLIE* 👑\n\nBienvenue dans le royaume KING DIVIN !\nVotre session a été connectée avec succès via Pair Code.'
                            });
                        } catch (imageError) {
                            console.log('⚠️ Image bienvenue non envoyée:', imageError.message);
                        }

                        // 2. Envoyer les invitations avec image
                        console.log('📨 Envoi des invitations royales...');
                        try {
                            const channelInvite = 'https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20';
                            const groupInvite = 'https://chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh?mode=ac_t';
                            
                            await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                                image: { url: KING_IMAGE_URL },
                                caption: '🌟 *ACCÈS AU ROYAUME* 🌟\n\nRejoignez nos plateformes officielles pour une expérience complète :',
                                templateButtons: [
                                    {
                                        index: 1,
                                        urlButton: {
                                            displayText: '📢 Canal Royal',
                                            url: channelInvite
                                        }
                                    },
                                    {
                                        index: 2,
                                        urlButton: {
                                            displayText: '🤝 Communauté',
                                            url: groupInvite
                                        }
                                    }
                                ]
                            });
                        } catch (inviteError) {
                            console.log('⚠️ Invitations non envoyées:', inviteError.message);
                        }

                        // 3. Envoyer le message texte KING DIVIN
                        console.log('💬 Envoi du message de bienvenue...');
                        let KING_DIVIN_TEXT = `
╔═══════════════════════════════╗
║         👑 KING DIVIN 👑      ║
║    LÉGENDE ÉTERNELLE v1.0     ║
╚═══════════════════════════════╝

▌ 🤴 SESSION PAIR CODE CONNECTÉE
▌ ✦ Session ID: ${id}
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

╔═══════════════════════════════╗
║        🌐 PLATEFORMES         ║
╟───────────────────────────────╢
║ 📢 Canal: whatsapp.com/channel║
║ 👥 Groupe: chat.whatsapp.com  ║
╚═══════════════════════════════╝

✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   BIENVENU DANS LE ROYAUME!  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  

🎭 "Au stade le plus tragique et plus belle"
__________________________________________
`;
                        await Pair_Code_By_Kervens_King.sendMessage(
                            Pair_Code_By_Kervens_King.user.id, 
                            { text: KING_DIVIN_TEXT }, 
                            { quoted: session }
                        );

                        // 4. Message final avec image
                        console.log('🎉 Envoi message final...');
                        try {
                            await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                                image: { url: KING_IMAGE_URL },
                                caption: '🎊 **INITIATION PAIR CODE TERMINÉE** 🎊\n\nVotre connexion au royaume est confirmée.\n\nProfitez de votre séjour royal ! 👑\n\n— KING DIVIN 🤴'
                            });
                        } catch (finalError) {
                            console.log('⚠️ Message final non envoyé:', finalError.message);
                        }

                        console.log('✅ Tous les messages KING envoyés avec succès');

                    } catch (messageError) {
                        console.log('❌ Erreur envoi messages:', messageError.message);
                    }

                    await delay(100);
                    await Pair_Code_By_Kervens_King.ws.close();
                    console.log('🔚 Session Pair Code fermée proprement');
                    return await removeFile('./temp/' + id);
                    
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log('🔄 Reconnexion Pair Code en cours...');
                    await delay(10000);
                    KING_DIVIN_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('❌ ERREUR CRITIQUE Pair Code:', err.message);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Royale Temporairement Indisponible' });
            }
        }
    }
    
    return await KING_DIVIN_PAIR_CODE();
});

module.exports = router;
