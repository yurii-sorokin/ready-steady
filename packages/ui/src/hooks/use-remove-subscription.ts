import { useCurrentUser } from './use-current-user';

import { useCallback } from 'react';
import {
  removeSubscription,
  RemoveSubscriptionOptions
} from '../firebase/store';

export const useRemoveSubscription = ({
  id,
  type
}: Omit<RemoveSubscriptionOptions, 'uid'>) => {
  const user = useCurrentUser();

  return useCallback(() => {
    if (!user) {
      return;
    }

    removeSubscription({ uid: user.uid, id, type });
  }, [id, type, user]);
};
