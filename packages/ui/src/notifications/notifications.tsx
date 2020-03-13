import { useEffect, memo } from 'react';
import { messaging } from '../firebase';
import { addToken } from '../firebase/store';
import { useCurrentUser } from '../hooks/use-current-user';

export const requestPermission = () => {
  console.log('Requesting permission...');
  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Unable to get permission to notify.');
      throw new Error('Notification permission declined.');
    }
  });
};

const updateToken = (user: firebase.User | null) => {
  return (
    user &&
    messaging
      ?.getToken()
      .then(token => {
        addToken({ uid: user.uid, token });
      })
      .catch(console.error)
  );
};

export const Notifications = memo(() => {
  const user = useCurrentUser();

  useEffect(() => {
    updateToken(user);
    return messaging?.onTokenRefresh(() => updateToken(user));
  }, [user]);

  return null;
});
