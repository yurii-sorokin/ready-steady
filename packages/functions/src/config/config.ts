/* eslint-disable @typescript-eslint/camelcase */
import * as functions from 'firebase-functions';

export interface Config {
  api: {
    tmdb_key: string;
  };
}

export const config = (): Config => {
  return functions.config() as Config;
};
