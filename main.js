const Discord = require("discord.js");
const generateImage = require("./generateimage");

require("dotenv").config();
const fetch = require("node-fetch");

const slashcommands = require("./handlers/slashcommands");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"],
  partials: ["CHANNEL"],
});

//push check
let bot = {
  client,
  prefix: "rado!",
  owners: [" "],
};


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashcommands = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) =>
  require("./handlers/commands")(bot, reload);
client.loadSlashCommands = (bot, reload) =>
  require("./handlers/slashcommands")(bot, reload);

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.inGuild())
    return interaction.reply("This command can only be used in server.");

  const slashcmd = client.slashcommands.get(interaction.commandName);

  if (!slashcmd) return interaction.reply("Invalid slash command.");

  if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
    return interaction.reply("You do not have permission for this command.");
    slashcmd.run(client,interaction);
});

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadSlashCommands(bot, false);

module.exports = bot;

const welcomeChannelId = "273518625371979776";

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}> Your Journey Begins Here!`,
    files: [img],
  });
});
client.login(process.env.DISCORD_BOT_TOKEN);
