 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;',
"Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JCUjlqbVFmUnBjd1duYWIxWUNXMEpzU21Ka2dlaGFnZkpySHc1cXgzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVh0WkxSS1IwbHpFa0xyZS81VVVFWUJFRDR1MGFXVDV1SkNCYVBCY2VEWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQkpaT2tZaTh0bEYxY0FhY3VQSnNHc1E0UTdOK3pHaGp2WUdnZmk4MEhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHWElXMjZaTzBjKzE1QmY3amlOeGZTL1VBMlBzUEwrYlhvb1I0cEZqckVRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNQa2ZPL3RaelhKeFB4b1E4OXlUV1lpYU5YNGtNaU82SlVLd3h6OUpGWHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJaWjAvWXZMQjFFRXc3K2d2aE02aTJ2bXB0Y0k0NVZnY2EvMENzVUMvanc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUdpRmROa2IwWjYvTUFQMlFwNC9oeDVXb1ZvTkZTNGJMbm16U1RqSTBHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0liYTZuTUlBS0hVbS9PbVlNL250UUlPeFNhSktjOHk0dU16MjBHS3VRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkE0Mi9JMWErTzZpY3FvdlVTeVNRejBWcStkWTZFOHFCSUo1aFF2SnROVVkweWJhamE5R2JYL2prWW1panlkUGxraXVHSkZtTldDbWF4TE9tZEJuRmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUyLCJhZHZTZWNyZXRLZXkiOiJRaHQzSHY2UXdEb2kwZjAvWjlZTnhwcTUzY0RFa1ZlOUJJTjA1cjk0QnRrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU5MTM4MDcyNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCMERBRjY3RjM3NzMzNTJEQzdGNUM4MUQ3QTA4Mjg2QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI0NDcwMjUzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1OTEzODA3MjRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTE3Mjk3RTE4MjAxMEZEN0U3QjU5Q0JDMDY2QzIzMDQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDQ3MDI1M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYzE4T3BQVzZTNS1TUGxuY0pNTlJjdyIsInBob25lSWQiOiI1NWY5YjJiNy1mODBiLTQ0NTEtYjgwOC03OWJlNDU0MDdlYTIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDhFNDgwbHNJZkdSa2RwTVlQdjJHWVpFeVY0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko3VklkeWJqblR1RmV2ZUdJd0VkSXh0dGZiND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJRR0E4WlRUUCIsIm1lIjp7ImlkIjoiMjMzNTkxMzgwNzI0OjMyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKAlEJha2lb44OQ44KtXSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGI1bDhBQkVOMm5wYllHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibDY0OGRES015NzRKK0pqZ2xFczc5dXMvYlUxcGdXc3grTGdZTnNXbkxRdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZll2ZVEreHcxdTNySVU2MGJnVU54alVFK0FERFFRRTU2ZlpvaERGZGhSalpjU0o4MGE2b2V2aHJGSnhCTnVVQ3lvSUZQcUhvbUp2VitLZU1HZUw0QVE9PSIsImRldmljZVNpZ25hdHVyZSI6IllwTGJnTStnY0UwMTNJendRZTQyS1lQcVZWY21PS0Zhd1RGR3dYRFVTS2J3YVh4dlpKbFRTZTdHUWIxZFBmYi9MN3lidjN1d0loMDRNZnF2dmhwaWdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTkxMzgwNzI0OjMyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpldVBIUXlqTXUrQ2ZpWTRKUkxPL2JyUDIxTmFZRnJNZmk0R0RiRnB5ME0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ0NzAyNTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS3MrIn0="
////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
