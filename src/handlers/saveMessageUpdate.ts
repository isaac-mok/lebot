import type { Message } from 'discord.js';
import addDateCreatedAt from '../helpers/addDateCreatedAt';
import removeCyclicReactions from '../helpers/removeCyclicReactions';
import { messageUpdate } from '../mongodb';

export default function saveMessageUpdate(message: Message) {
  let messageToSave = Object.assign(message);
  messageToSave = removeCyclicReactions(messageToSave);
  messageToSave = addDateCreatedAt(messageToSave);
  return messageUpdate.insertOne(messageToSave);
}
