const Discord = require("discord.js");
const generateImage = require("./generateimage");
require("dotenv").config();
const fetch = require("node-fetch");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

//push check
let bot = {
  client,
  prefix: "rado!",
  owners: [" "],
};

let TENOR_KEY = "AIzaSyCBfsSBnWmFJZB0OZaGbevecaeayWJHQmc";

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadEvents(bot, false);

module.exports = bot;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  let text = msg.toString();
  const tokens = msg.content.split(" ");
  const keywords = tokens.slice(1, tokens.length).join(" ");
  if (text.includes("rado!")) {
    if (tokens[0].toLowerCase() === "rado!gif") {
      const url = `https://tenor.googleapis.com/v2/search?q=${keywords}&key=${TENOR_KEY}&client_key=shindaru_bot&limit=8`;

      //FETCH THE RESULTS
      const response = await fetch(url);
      //CONVERT TO JSON
      const result = await response.json();
      //NOW WE CAN RANDOMLY SELECT THE GIF FROM THE RESULTS WE FETCHED
      const index = Math.floor(Math.random() * result.results.length);
      while (index > 8) {
        index = Math.floor(Math.random() * result.results.length);
      }
      //NOW SEND THE RESULT BACK TO SERVER
      msg.reply(result.results[index].url);
    } else if (keywords.includes("no u")) {
      msg.reply(`No,<@${msg.member.id}> w :).`);
    } else if (keywords.includes("no w")) {
      msg.reply(`No,<@${msg.member.id}> u :).`);
    } else if (keywords.includes("play")) {
    } else {
      let izrecheniq = [
        "Shte te izsipq palqcho.",
        "Smrudlio.",
        "Kaji mu Nikola i ne go obijdai poveche.",
        "Shibai se.",
        "Liglio.",
        "Cum.",
        "A da se shibash?",
        "Sounds like an iss-U not an iss-me",
      ];
      let repeat = izrecheniq[Math.floor(Math.random() * izrecheniq.length)];
      msg.reply(`<@${msg.member.id}> ` + repeat);
    }
  }
});

const welcomeChannelId = "273518625371979776";

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}> Your Journey Begins Here!`,
    files: [img],
  });
});
client.login(process.env.DISCORD_BOT_TOKEN);
