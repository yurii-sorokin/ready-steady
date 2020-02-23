import * as functions from 'firebase-functions';
import { app } from './app';

const getServer = () => {
  return functions.https.onRequest(app);
};

export const api = getServer();
