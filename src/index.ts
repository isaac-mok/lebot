import { onShutdown } from 'node-graceful-shutdown';
import { Client, Intents } from 'discord.js';
import { client as dbClient, messageCreate } from './mongodb';
import { DISCORD_TOKEN } from './setup';

onShutdown(async () => {
  dbClient.close();
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.once('ready', () => {
  console.log('Application started!');
});

client.on('messageCreate', async (message) => {
  messageCreate.insertOne(JSON.parse(JSON.stringify(message)));
});

client.login(DISCORD_TOKEN);
