const Discord = require('discord.js');
const generateImage = require("./generateimage")
require("dotenv").config();


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})
const nikolaID ="308557421410910208"


client.on("ready",() =>{
    console.log(`Logged in as ${client.user.tag}`)
})

//define gamer(){
/*/client.on("messageCreate",(message)=>{
    if(message.content=="jsd"){
        message.reply(`Hello <@${message.member.id}>!`)
    }
/*/
client.on("messageCreate", (message) =>{
    if(message.content =="no u"){
        message.reply(`No,<@${message.member.id}> w :).`)
    }
})


client.on("messageCreate", (message) =>{
    if(message.content =="no w"){
        message.reply(`No,<@${message.member.id}> u :).`);
    }
})
//const welcomeChannelID = "273518625371979776";

client.on("guildMemberAdd", async(member)=>{
    const img = await generateImage(member);

    member.guild.channels.cache.get(welcomeChannelID).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})
client.login(process.env.TOKEN);
