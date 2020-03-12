import { firestore } from '../app';

export interface AddTokenOptions {
  uid: string;
  token: string;
}

export const addToken = ({ uid, token }: AddTokenOptions) =>
  firestore
    .collection('users')
    .doc(uid)
    .collection('token')
    .doc(token)
    .set({});
