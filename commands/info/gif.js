const Discord = require("discord.js");
require("dotenv").config();
const fetch = require("node-fetch");
module.exports = {
  name: "gif",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    let TENOR_KEY = "AIzaSyCBfsSBnWmFJZB0OZaGbevecaeayWJHQmc";
    let text = message.toString();
    const tokens = message.content.split(" ");
    const keywords = tokens.slice(1, tokens.length).join(" ");
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
      message.reply(result.results[index].url);
    } else if (keywords.includes("no u")) {
      message.reply(`No,<@${message.member.id}> w :).`);
    } else if (keywords.includes("no w")) {
      message.reply(`No,<@${message.member.id}> u :).`);
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
      message.reply(`<@${message.member.id}> ` + repeat);
    }
  },
};
