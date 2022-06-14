const Discord = require("discord.js");
const generateImage = require("./generateimage");
require("dotenv").config();
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

client.on("message", async (msg) => {
  let text = msg.toString();
  const tokens = msg.content.split(" ");
  if (text.includes(text.includes("rado!"))){
  if(tokens[0].toLowerCase()==="rado!gif"){
    const keywords = tokens.slice(1,tokens.length).join(" ");

    const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}$limit=10`;
    const response = await fetch(url);
    const result = await response.json();
    const index = Math.floor(Math.random()*result.results.length);

    msg.reply(result.results[index.url])
  }
  if (msg.content == "no u") {
      msg.reply(`No,<@${message.member.id}> w :).`);
    } 

    else if (msg.content == "no w") {
      msg.reply(`No,<@${msg.member.id}> u :).`);
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
