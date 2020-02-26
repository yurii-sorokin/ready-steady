import { config as zeitConfig } from './config.zeit';
import { config as firebaseConfig } from './config.firebase';

export const config = () => {
  return process.env.REACT_APP_HOST === 'zeit'
    ? zeitConfig()
    : firebaseConfig();
};
