import type { Message } from 'discord.js';

export default function removeCyclicReactions(message: Message) {
  const { reactions, ...filteredMessage } = message;
  return filteredMessage;
}
