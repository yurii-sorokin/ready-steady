import * as functions from 'firebase-functions';
import { app } from './app';

export const getServer = () => {
  console.log('FIREBASE NOW');

  return functions.https.onRequest(app);
};
