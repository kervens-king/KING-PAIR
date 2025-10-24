const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router();
const {
    default: KING_MD,
    useMultiFileAuthState,
    Browsers,
    delay,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
};

// URL de l'image KING
const KING_IMAGE_URL = 'https://files.catbox.moe/ndj85q.jpg';

router.get('/', async (req, res) => {
    const id = makeid();
    console.log('👑 Démarrage session KING DIVIN');
    console.log('🎯 Session ID:', id);
    
    async function KING_DIVIN_QR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Qr_Code_By_Kervens_King = KING_MD({
                auth: state,
                printQRInTerminal: false,
                logger: {
                    level: "silent",
                    info: () => {},
                    error: () => {},
                    warn: () => {},
                    debug: () => {}
                },
                browser: Browsers.macOS("Desktop"),
            });

            Qr_Code_By_Kervens_King.ev.on('creds.update', saveCreds);
            Qr_Code_By_Kervens_King.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;
                
                if (qr) {
                    console.log('📱 QR Code généré pour session:', id);
                    try {
                        await res.end(await QRCode.toBuffer(qr));
                    } catch (qrError) {
                        console.log('❌ Erreur génération QR:', qrError.message);
                    }
                }
                
                if (connection == "open") {
                    console.log('✅ Session KING connectée avec succès');
                    await delay(5000);
                    
                    try {
                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                        await delay(800);
                        let b64data = Buffer.from(data).toString('base64');
                        let session = await Qr_Code_By_Kervens_King.sendMessage(
                            Qr_Code_By_Kervens_King.user.id, 
                            { text: 'king~' + b64data }
                        );

                        // 1. Envoyer l'image de bienvenue KING
                        console.log('🖼️ Envoi image de bienvenue...');
                        try {
                            await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, {
                                image: { url: KING_IMAGE_URL },
                                caption: '👑 *SESSION ROYALE CONNECTÉE* 👑\n\nBienvenue dans le royaume KING DIVIN !\n\nVotre session a été établie avec succès.'
                            });
                        } catch (imageError) {
                            console.log('⚠️ Image bienvenue non envoyée:', imageError.message);
                        }

                        // 2. Envoyer les invitations avec image
                        console.log('📨 Envoi des invitations royales...');
                        try {
                            const channelInvite = 'https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20';
                            const groupInvite = 'https://chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh?mode=ac_t';
                            
                            await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, {
                                image: { url: KING_IMAGE_URL },
                                caption: '🌟 *REJOIGNEZ LE ROYAUME* 🌟\n\nAccédez à nos plateformes officielles pour ne rien manquer :',
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
                        await Qr_Code_By_Kervens_King.sendMessage(
                            Qr_Code_By_Kervens_King.user.id,
                            { text: KING_DIVIN_TEXT },
                            { quoted: session }
                        );

                        // 4. Message final avec image
                        console.log('🎉 Envoi message final...');
                        try {
                            await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, {
                                image: { url: KING_IMAGE_URL },
                                caption: '🎊 **INITIATION ROYALE TERMINÉE** 🎊\n\nVotre place dans le royaume est confirmée.\n\nQue votre légende commence... ✨\n\n— KING DIVIN 🤴'
                            });
                        } catch (finalError) {
                            console.log('⚠️ Message final non envoyé:', finalError.message);
                        }

                        console.log('✅ Tous les messages KING envoyés avec succès');

                    } catch (messageError) {
                        console.log('❌ Erreur envoi messages:', messageError.message);
                    }

                    await delay(100);
                    await Qr_Code_By_Kervens_King.ws.close();
                    console.log('🔚 Session KING fermée proprement');
                    return await removeFile("temp/" + id);
                    
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log('🔄 Reconnexion KING en cours...');
                    await delay(10000);
                    KING_DIVIN_QR_CODE();
                }
            });
        } catch (err) {
            console.log('❌ ERREUR CRITIQUE KING:', err.message);
            if (!res.headersSent) {
                await res.json({ 
                    code: "Service Royale Temporairement Indisponible",
                    message: "Le royaume connaît des difficultés techniques"
                });
            }
            await removeFile("temp/" + id);
        }
    }
    return await KING_DIVIN_QR_CODE();
});

module.exports = router;
