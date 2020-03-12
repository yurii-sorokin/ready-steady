import { useCurrentUser } from './use-current-user';

import { useCallback } from 'react';
import { addSubscription, AddSubscriptionOptions } from '../firebase/store';

export const useAddSubscription = ({
  id,
  date,
  title,
  type
}: Omit<AddSubscriptionOptions, 'uid'>) => {
  const user = useCurrentUser();

  return useCallback(() => {
    if (!user) {
      return;
    }

    addSubscription({ uid: user.uid, id, title, date, type });
  }, [date, id, title, type, user]);
};
