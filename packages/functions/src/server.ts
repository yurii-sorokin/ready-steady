import { getServer as getZeitServer } from './server.zeit';
import { getServer as getFirebaseServer } from './server.firebase';

export const getServer = () => {
  return process.env.REACT_APP_HOST === 'zeit'
    ? getZeitServer()
    : getFirebaseServer();
};
