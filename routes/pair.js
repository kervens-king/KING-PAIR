const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Kervens_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function KING_DIVIN_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Kervens_King = Kervens_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Safari')
            });

            if (!Pair_Code_By_Kervens_King.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Kervens_King.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Kervens_King.ev.on('creds.update', saveCreds);
            Pair_Code_By_Kervens_King.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    
                    // URL de l'image KING (remplacez par votre URL réelle)
                    const kingImageUrl = 'https://files.catbox.moe/usgvo9.jpg'; // ou une autre image KING
                    
                    let session = await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, { text: 'king~' + b64data });

                    // Envoyer d'abord l'image KING
                    try {
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                            image: { url: kingImageUrl },
                            caption: '👑 *BIENVENUE DANS LE ROYAUME KING DIVIN* 👑\n\nVotre session royale est maintenant active !'
                        });
                    } catch (imageError) {
                        console.log('Image non envoyée, continuation sans image:', imageError);
                    }

                    // Rejoindre automatiquement le canal et le groupe
                    try {
                        // Rejoindre le canal
                        const channelInvite = 'https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20';
                        
                        // Rejoindre le groupe
                        const groupInvite = 'https://chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh?mode=ac_t';
                        
                        // Envoyer les invitations avec image
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                            image: { url: kingImageUrl },
                            caption: '👑 *ACCÈS AU ROYAUME KING DIVIN* 👑\n\nRejoignez nos plateformes officielles pour ne rien manquer :',
                            templateButtons: [
                                {
                                    index: 1,
                                    urlButton: {
                                        displayText: '📢 Rejoindre le Canal Royal',
                                        url: channelInvite
                                    }
                                },
                                {
                                    index: 2,
                                    urlButton: {
                                        displayText: '🤝 Rejoindre le Royaume',
                                        url: groupInvite
                                    }
                                }
                            ]
                        });
                        
                        // Message de bienvenue supplémentaire
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                            text: '🌟 *INFORMATIONS IMPORTANTES* 🌟\n\nAssurez-vous de rejoindre nos plateformes pour :\n• Les dernières mises à jour\n• Le support technique\n• La communauté active\n• Les annonces exclusives'
                        });

                    } catch (inviteError) {
                        console.log('Erreur invitation royale:', inviteError);
                    }

                    let KING_DIVIN_TEXT = `

╔═══════════════════════════════╗
║         👑 KING DIVIN 👑      ║
║    LÉGENDE ÉTERNELLE v1.0     ║
╚═══════════════════════════════╝

▌ 🤴 SESSION ROYALE CONNECTÉE
▌ ✦ Session ID: ${id}
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

                    await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, { text: KING_DIVIN_TEXT });

                    // Envoyer un dernier message avec image de couronnement
                    try {
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                            image: { url: kingImageUrl },
                            caption: '👑 **FÉLICITATIONS !** 👑\n\nVotre initiation au royaume KING DIVIN est complète.\n\nQue votre légende commence... 🎭✨'
                        });
                    } catch (finalImageError) {
                        console.log('Image finale non envoyée:', finalImageError);
                    }

                    await delay(100);
                    await Pair_Code_By_Kervens_King.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    KING_DIVIN_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('🔄 Royaume redémarré');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Royale Temporairement Indisponible' });
            }
        }
    }
    
    return await KING_DIVIN_PAIR_CODE();
});

module.exports = router;
