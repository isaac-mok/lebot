import { MongoClient, ServerApiVersion } from 'mongodb';
import { DB_CONN_STRING, DB_DATABASE } from './setup';

export const client = new MongoClient(DB_CONN_STRING, {
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  if (typeof err !== 'undefined') throw new Error(JSON.stringify(err));
});

export default client;

// Collections
export const messageCreate = client.db(DB_DATABASE).collection('messageCreate');
export const messageUpdate = client.db(DB_DATABASE).collection('messageUpdate');
export const messageDelete = client.db(DB_DATABASE).collection('messageDelete');
