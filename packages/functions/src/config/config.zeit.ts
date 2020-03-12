/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/camelcase */
import dotenv from 'dotenv';
import { Config } from './types';

dotenv.config();

export const config = (): Config => {
  return {
    api: {
      tmdb_key: process.env.TMDB_KEY!
    },
    gcloud: {
      credentials: process.env.GCLOUD_CREDENTIALS!
    }
  };
};
