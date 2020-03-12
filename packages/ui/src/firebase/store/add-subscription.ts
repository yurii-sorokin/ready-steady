import { firestore } from '../app';
import { SubscriptionType } from './types';

export interface AddSubscriptionOptions {
  uid: string;
  id: string | number;
  title: string;
  date: string;
  type: SubscriptionType;
}

export const addSubscription = ({
  uid,
  id,
  title,
  date,
  type
}: AddSubscriptionOptions) => {
  firestore
    .collection('users')
    .doc(uid)
    .collection(type)
    .doc(String(id))
    .set({ title, date });
};
