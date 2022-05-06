import type { Message } from 'discord.js';
import addDateCreatedAt from '../helpers/addDateCreatedAt';
import removeCyclicReactions from '../helpers/removeCyclicReactions';
import { messageCreate } from '../mongodb';

export default function saveMessageCreate(message: Message) {
  let messageToSave = Object.assign(message);
  messageToSave = removeCyclicReactions(messageToSave);
  messageToSave = addDateCreatedAt(messageToSave);
  return messageCreate.insertOne(messageToSave);
}
