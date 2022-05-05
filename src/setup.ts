// Setup dotenv
import { config } from 'dotenv';

config();

// TOKEN
function getToken() {
  const token = process.env.TOKEN;

  if (typeof token === 'undefined') throw new Error('Token not set!');

  return token;
}

export const TOKEN = getToken();

// APP_ID
function getAppID() {
  const appID = process.env.APP_ID;

  if (typeof appID === 'undefined') throw new Error('Application ID not set!');

  return appID;
}

export const APP_ID = getAppID();
