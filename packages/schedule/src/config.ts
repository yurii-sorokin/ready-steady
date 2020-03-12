/* eslint-disable @typescript-eslint/camelcase */
import * as functions from 'firebase-functions';
import { Config } from './types';

export const config = (): Config => {
  return functions.config() as Config;
};
