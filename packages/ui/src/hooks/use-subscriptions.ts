import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Subscription, SubscriptionType } from '../firebase/store';
import { useCurrentUser } from './use-current-user';

export const useSubscriptions = ({
  date,
  type
}: {
  date: Date;
  type: SubscriptionType;
}): Subscription[] => {
  const [docs, setDocs] = useState<Subscription[]>([]);
  const user = useCurrentUser();

  useEffect(() => {
    if (user) {
      firestore
        .collection('users')
        .doc(user.uid)
        .collection(type)
        .where('date', '>=', format(date, 'yyyy-MM-01'))
        .onSnapshot(snapshot => {
          const docs = snapshot.docs.map(
            d => ({ ...d.data(), id: d.id } as Subscription)
          );
          setDocs(docs);
        });
    }
  }, [date, type, user]);

  return docs;
};
