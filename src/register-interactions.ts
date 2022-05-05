import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v9';
import { TOKEN, APP_ID } from './setup';

const snipeOptions: APIApplicationCommandOption[] = [
  {
    name: 'target',
    type: 6, // USER
    description: 'The user to snipe.',
  },
  {
    name: 'channel',
    type: 7, // CHANNEL
    description: 'The channel to snipe from.',
  },
];

const singleSnipeOptions = [
  ...snipeOptions,
  {
    name: 'pastindex',
    type: 4,
    description: 'Which message to get (i.e. 0 = latest message, 1 = 1st message before latest, 2 = 2nd, etc.). Max 14',
    max_value: 14,
  },
];

const listSnipeOptions = [
  ...snipeOptions,
  {
    name: 'count',
    type: 4,
    description: 'How many messages to get. Min 1, max 15',
    min_value: 1,
    max_value: 15,
  },
];

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [
  {
    name: 'snipe',
    type: 1, // CHAT_INPUT
    description: 'Shows the last deleted message.',
    options: singleSnipeOptions,
  },
  {
    name: 'editsnipe',
    type: 1, // CHAT_INPUT
    description: 'Shows the last edited message.',
    options: singleSnipeOptions,
  },
  {
    name: 'snipelist',
    type: 1, // CHAT_INPUT
    description: 'Shows a list of deleted messages.',
    options: listSnipeOptions,
  },
  {
    name: 'editsnipelist',
    type: 1, // CHAT_INPUT
    description: 'Shows a list of edited messages.',
    options: listSnipeOptions,
  },
];

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(APP_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
