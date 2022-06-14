const Discord = require("discord.js");
const generateImage = require("./generateimage");
require("dotenv").config();
const Giphy = require("");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
  client,
  prefix: "n.",
  owners: [" "],
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

module.exports = bot;

const nikolaID = "308557421410910208";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  let text = message.toString();
  const tokens = msg.content.split(" ");
  if (text.includes(text.includes("rado!"))){
    if (message.content == "no u") {
      message.reply(`No,<@${message.member.id}> w :).`);
    } else if(text.includes("rado!gif")){
      const keywords = tokens.slice(1, tokens.length).join(" ")

      const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&limit10`;
      const response = await fetch(url);
      const result = await response.json();
      const index = Math.floor(Math.random() * result.results.length);
      message.reply(result.results[index].url);
    }
    else if (message.content == "no w") {
      message.reply(`No,<@${message.member.id}> u :).`);
    }
     else {
      let izrecheniq = [
        "Shte te izsipq palqcho.",
        "Smrudlio.",
        "Kaji mu Nikola i ne go obijdai poveche.",
        "Shibai se.",
        "Liglio.",
        "Cum.",
        "A da se shibash?",
      ];
      let repeat = izrecheniq[Math.floor(Math.random() * izrecheniq.length)];
      message.reply(`<@${message.member.id}> ` + repeat);
    }
  }
});
client.on("messageCreate", (message) => {
  if (message == "gif") {
    message.reply("I do not have that implemented yet.");
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
