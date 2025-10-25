const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('../gen-id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: KING_MD,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")

// URL de l'image KING
const KING_IMAGE_URL = 'https://files.catbox.moe/ndj85q.jpg';

router.get('/', async (req, res) => {
	const id = makeid();
	async function KING_DIVIN_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Kervens_King = KING_MD({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Kervens_King.ev.on('creds.update', saveCreds)
			Qr_Code_By_Kervens_King.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, { text: 'king~' + b64data });

				   // Envoyer l'image KING en premier
				   try {
					   await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, {
						   image: { url: KING_IMAGE_URL },
						   caption: '👑 *SESSION ROYALE CONNECTÉE* 👑\n\nBienvenue dans le royaume KING DIVIN !'
					   });
				   } catch (imageError) {
					   console.log('Image KING non envoyée:', imageError);
				   }

				   // Envoyer les invitations avec image
				   try {
					   const channelInvite = 'https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20';
					   const groupInvite = 'https://chat.whatsapp.com/GIIGfaym8V7DZZElf6C3Qh?mode=ac_t';
					   
					   await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, {
						   image: { url: KING_IMAGE_URL },
						   caption: '🌟 *REJOIGNEZ LE ROYAUME* 🌟\n\nAccédez à nos plateformes officielles :',
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
					   console.log('Erreur invitations:', inviteError);
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
	 await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id,{text:KING_DIVIN_TEXT},{quoted:session})

	 // Message final avec image
	 try {
		 await Qr_Code_By_Kervens_King.sendMessage(Qr_Code_By_Kervens_King.user.id, {
			 image: { url: KING_IMAGE_URL },
			 caption: '🎉 **INITIATION ROYALE TERMINÉE** 🎉\n\nVotre place dans le royaume est confirmée.\n\nQue votre légende commence... ✨'
		 });
	 } catch (finalError) {
		 console.log('Message final non envoyé:', finalError);
	 }



					await delay(100);
					await Qr_Code_By_Kervens_King.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					KING_DIVIN_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Royale Temporairement Indisponible"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await KING_DIVIN_QR_CODE()
});
module.exports = router
