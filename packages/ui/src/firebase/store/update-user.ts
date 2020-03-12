import { firestore } from '../app';

export const updateUser = (userId: string) => {
  return firestore
    .collection('users')
    .doc(userId)
    .set({
      uid: userId,
      tzOffset: (new Date().getTimezoneOffset() / 60) * -1
    });
};
