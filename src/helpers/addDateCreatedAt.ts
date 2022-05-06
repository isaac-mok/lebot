import type { Message } from 'discord.js';

/**
 * Add a createdAt field for TTL indexing.
 */
export default function addDateCreatedAt(message: Message) {
  const { ...extracted } = message;
  extracted.createdAt = new Date();
  return extracted;
}
