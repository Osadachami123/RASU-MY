const { cmd, commands } = require('../lib/command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "setting",
    alias: ["st", "setting", "change"],
    desc: "Check uptime and system status",
    category: "owner",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        // Generate system status message
        const status = `*⚙️ 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Settings Control ...*

*🍒 CHANGE PRIFIX :*
> *USE :* .setprifix #

*🍒 CHANGE MODE :*
> *USE :* .mode private/public/inbox/group

*🍒 AUTO TYPING :*
> *USE :* autotyping on/off

*🍒 ALWAYS ONLINE :*
> *USE :* alwaysonline on/off

*🍒 FAKE RACORDING  :*
> *USE :* .fakerecording on/off

*🍒  AUTO READ STATUS :*
> *USE :* .autoreadstatus on/off

*🍒  STATUS REACT :*
> *USE :* .statusreact on/off

*🍒  ANTI CALL :*
> *USE :* .anticall on/off

*🍒  READ MASSAGE :*
> *USE :* .readmessage on/off 

*🍒  STATUS REPLY :*
> *USE :* .statusreply on/off

*🍒  INBOX BLOCK :*
> *USE :* .inboxblock on/off

*🍒  ANTI BAD :*
> *USE :* .antibad on/off

*🍒  ANTI DELETE :*
> *USE :* .antidelete on/off

*🍒  AUTO STICKER :*
> *USE :* .autosticker on/off

*🍒  AUTO REPLY :*
> *USE :* .autoreply on/off

*🍒  AUTO REACT :*
> *USE :* .autoreact on/off

*🍒  ANTI LINK 01:*
> *USE :* .antilink1 warn/delete/kick/off

*🍒  ANTI BOT :*
> *USE :* .antibot on/off

*🍒  ANTI LINK 02:*
> *USE :* . antilink on/off

*🍒  AUTO AI CHAT BOT:*
> *USE :* .autoai on/off 
ඔයාට අදාල CHAT එකෙහි පමනක් AI CHAT BOT ON කරගන්න 🤕

*ඔයාට වෙනස් කරන්න ඕනි SETTINGS උඩ විදිහට වෙනස් කරගන්න පුලුවන් 💗👋*

> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/gM4mK7cw/image-1741255711641.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363368882758119@newsletter',
                    newsletterName: '※ 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ※',
                    serverMessageId: 190
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in menu command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
