import { useState, useEffect } from 'react';
import { auth } from '../firebase';

export const useCurrentUser = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => auth.onAuthStateChanged(setUser, () => setUser(null)), []);

  return user;
};
