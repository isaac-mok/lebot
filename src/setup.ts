// Setup dotenv
import { config } from 'dotenv';

config();

// Reusable function
function getFromEnv(key: string, errorMessage?: string) {
  const value = process.env[key];

  if (typeof value === 'undefined') {
    const finalErrorMessage = typeof errorMessage !== 'undefined'
      ? errorMessage
      : `${key} not set!`;

    throw new Error(finalErrorMessage);
  }

  return value;
}

// Constants
export const DISCORD_TOKEN = getFromEnv('DISCORD_TOKEN');
export const APP_ID = getFromEnv('APP_ID');
export const DB_CONN_STRING = getFromEnv('DB_CONN_STRING');
export const DB_DATABASE = getFromEnv('DB_DATABASE');
