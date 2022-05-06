import type { Message } from 'discord.js';
import addDateCreatedAt from '../helpers/addDateCreatedAt';
import removeCyclicReactions from '../helpers/removeCyclicReactions';
import { messageDelete } from '../mongodb';

export default function saveMessageDelete(message: Message) {
  let messageToSave = Object.assign(message);
  messageToSave = removeCyclicReactions(messageToSave);
  messageToSave = addDateCreatedAt(messageToSave);
  return messageDelete.insertOne(messageToSave);
}
