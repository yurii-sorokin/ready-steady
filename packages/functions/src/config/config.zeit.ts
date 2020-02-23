/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/camelcase */
import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  api: {
    tmdb_key: string;
  };
}

export const config = (): Config => {
  return {
    api: {
      tmdb_key: process.env.TMDB_KEY!
    }
  };
};
