require('dotenv').config();
let key = process.env.API_KEY;
let token = process.env.DISCORD_TOKEN;
let channel = process.env.CHANNEL_ID;
const { Configuration, OpenAIApi } = require("openai");
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

const config = new Configuration({
    apiKey: key,
  });

const openai = new OpenAIApi(config);

client.once('ready', async() => {
  console.log("The Bot Iz Ready");
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from other bots
    if (message.channel.id !== channel) return; // Only respond in a particular channel
    const ask = message.content; // Get the message content
  
    const reply = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ask,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        }); //getting reply from chat gpt
        message.reply(reply.data.choices[0].text); //posting the gathered reply in the channel
    });

client.login(token); //discord bot login
