import { firestore } from '../app';
import { SubscriptionType } from './types';

export interface RemoveSubscriptionOptions {
  uid: string;
  id: string | number;
  type: SubscriptionType;
}

export const removeSubscription = ({
  uid,
  id,
  type
}: RemoveSubscriptionOptions) => {
  firestore
    .collection('users')
    .doc(uid)
    .collection(type)
    .doc(String(id))
    .delete();
};
