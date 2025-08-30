const { patersonid } = require('./id'); 
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");

const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

// Function to remove a file
function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// Router to handle pairing code generation
router.get('/', async (req, res) => {
    const id = patersonid(); 
    let num = req.query.number;

    // Create temp directory if it doesn't exist
    if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp', { recursive: true });
    }

    async function PATERSON_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let PATERSON = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari")
            });

            if (!PATERSON.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await PATERSON.requestPairingCode(num);
                console.log(`Pairing Code: ${code}`);

                if (!res.headersSent) {
                    res.send({ code });
                }
            }

            PATERSON.ev.on('creds.update', saveCreds);
            PATERSON.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    console.log("WhatsApp connection established successfully!");
                    
                    // Send welcome message only, no session ID
                    const PATERSON_TEXT = `
🎉 *Welcome to PATERSON-MD !* 🚀  

✅ *Connection established successfully!*

💡 *What's Next?* 
1️⃣ Start using all the features of PATERSON-MD.
2️⃣ Stay updated with our latest releases.
3️⃣ Enjoy seamless WhatsApp automation! 🤖  

🔗 *Join Our Support Channel:* 👉 [Click Here to Join](https://whatsapp.com/channel/0029Vb6KikfLdQefJursHm20) 

⭐ *Show Some Love!* Give us a ⭐ on GitHub: 👉 [PATERSON-MD GitHub](https://github.com/PATERSON-MD/)  

🚀 _Thanks for choosing PATERSON-MD — Let the automation begin!_ ✨`;

                    await PATERSON.sendMessage(PATERSON.user.id, { text: PATERSON_TEXT });
                    
                    await delay(100);
                    // Keep the connection open for ongoing use
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    console.log("Connection closed, cleaning up...");
                    removeFile('./temp/' + id);
                    
                    // Optional: attempt to reconnect after a delay
                    await delay(10000);
                    console.log("Attempting to reconnect...");
                    PATERSON_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Error in pairing process:", err);
            removeFile('./temp/' + id);

            if (!res.headersSent) {
                res.send({ code: "Service is Currently Unavailable" });
            }
        }
    }

    await PATERSON_PAIR_CODE();
});

module.exports = router;
