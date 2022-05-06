import { onShutdown } from 'node-graceful-shutdown';
import { Client, Intents } from 'discord.js';
import { client as dbClient } from './mongodb';
import { DISCORD_TOKEN } from './setup';
import saveMessageCreate from './handlers/saveMessageCreate';
import saveMessageDelete from './handlers/saveMessageDelete';
import saveMessageUpdate from './handlers/saveMessageUpdate';

onShutdown(async () => {
  dbClient.close();
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  partials: [
    'MESSAGE',
    'USER',
  ],
});

client.once('ready', () => {
  console.log('Application started!');
});

client.on('messageCreate', async (message) => {
  try {
    await saveMessageCreate(message);
  } catch (err) {
    console.error(err);
  }
});

client.on('messageDelete', async (message) => {
  if (message.embeds.length && !message.content) return; // Content is null or embed is deleted.

  if (message.partial) {
    try {
      const fullMessage = await message.fetch();

      saveMessageDelete(fullMessage);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  saveMessageDelete(message);
});

client.on('messageUpdate', async (message) => {
  if (message.embeds.length && !message.content) return; // Content is null or embed is deleted.

  if (message.partial) {
    try {
      const fullMessage = await message.fetch();

      saveMessageUpdate(fullMessage);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  saveMessageUpdate(message);
});

client.login(DISCORD_TOKEN);
