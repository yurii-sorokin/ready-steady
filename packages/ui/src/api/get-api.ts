import { getApi as getApiFirebase } from './get-api.firebase';
import { getApi as getApiZeit } from './get-api.zeit';

export interface ApiResponse<T extends any> {
  readonly data: T;
}

export const getApi = () => {
  return process.env.REACT_APP_HOST === 'zeit'
    ? getApiZeit()
    : getApiFirebase();
};
