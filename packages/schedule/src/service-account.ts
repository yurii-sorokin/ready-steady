import { config } from './config';

const parseServiceAccount = (string: any) =>
  JSON.parse(Buffer.from(string, 'base64').toString());

export const serviceAccount = () =>
  parseServiceAccount(config().gcloud.credentials);
