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
    
    async function Kervens_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Kervens_King = Kervens_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
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
                    let session = await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, { text: 'patetson~' + b64data });

                    // Rejoindre automatiquement le canal et le groupe
                    try {
                        // Rejoindre le canal
                        const channelInvite = 'https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20';
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, { 
                            text: `Rejoignez notre canal officiel: ${channelInvite}` 
                        });
                        
                        // Rejoindre le groupe
                        const groupInvite = 'https://chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh?mode=ac_t';
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, { 
                            text: `Rejoignez notre groupe de support: ${groupInvite}` 
                        });
                        
                        // Envoyer les invitations sous forme de boutons cliquables
                        await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, {
                            text: '📢 *REJOIGNEZ NOS PLATEFORMES OFFICIELLES* 📢\n\nCliquez sur les liens ci-dessous pour nous rejoindre :',
                            templateButtons: [
                                {
                                    index: 1,
                                    urlButton: {
                                        displayText: '📢 Rejoindre le Canal',
                                        url: channelInvite
                                    }
                                },
                                {
                                    index: 2,
                                    urlButton: {
                                        displayText: '👥 Rejoindre le Groupe',
                                        url: groupInvite
                                    }
                                }
                            ]
                        });
                    } catch (inviteError) {
                        console.log('Erreur lors de l\'envoi des invitations:', inviteError);
                    }

                    let Patetson_MD_TEXT = `

╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─ 
╎   『 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 』   
╎  ✦ PATETSON-MD SESSION
╎  ✦  ʙʏ KERVENS KING
╰╴╴╴╴

▌   『 🔐 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 』   
▌  • Session ID:  
▌  ⛔ [ Please set your SESSION_ID ] 

╔═
╟   『 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 & 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』  
╟  👑 𝐎𝐰𝐧𝐞𝐫: 50942737567  
╟  💻 𝐑𝐞𝐩𝐨: github.com/PATERSON-MD/PATETSON-MD  
╟  👥 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: https://chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh?mode=ac_t 
╟  📢 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20 
╰  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   𝐄𝐍𝐉𝐎𝐘 𝐏𝐀𝐓𝐄𝐓𝐒𝐎𝐍-𝐌𝐃!  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
______________________________
★彡[ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!]彡★
`;

                    await Pair_Code_By_Kervens_King.sendMessage(Pair_Code_By_Kervens_King.user.id, { text: Patetson_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Kervens_King.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Kervens_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await Kervens_PAIR_CODE();
});

module.exports = router;
