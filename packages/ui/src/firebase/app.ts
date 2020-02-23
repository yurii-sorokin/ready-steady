import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/functions';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyD0Gx8m_fc2O9kN2Z2yxUhqcQs9d10n2EE',
  authDomain: 'ready-steady-release.firebaseapp.com',
  databaseURL: 'https://ready-steady-release.firebaseio.com',
  projectId: 'ready-steady-release',
  storageBucket: 'ready-steady-release.appspot.com',
  messagingSenderId: '841122140278',
  appId: '1:841122140278:web:1d4dee8b83d05c7343cf57',
  measurementId: 'G-90VCTQ1PFJ'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();
export const analytics = firebase.analytics();
export const functions = firebase.functions();

if (process.env.NODE_ENV === 'development') {
  functions.useFunctionsEmulator('http://localhost:3000');
}

analytics.setAnalyticsCollectionEnabled(process.env.NODE_ENV === 'production');

messaging.usePublicVapidKey(
  'BOBqSxO1Ko8DHJ2iu92ZuYN9c2ZC1oO-yBI_P9nYO4e-vrXLL6RY2KATYnUT04uPHC_zdbxwl8G6AyHudT-G2Is'
);
