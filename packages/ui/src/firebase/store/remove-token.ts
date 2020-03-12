import { firestore } from '../app';

export interface RemoveTokenOptions {
  uid: string;
  token: string;
}

export const removeToken = ({ uid, token }: RemoveTokenOptions) =>
  firestore
    .collection('users')
    .doc(uid)
    .collection('token')
    .doc(token)
    .delete();
