// @ts-nocheck
/* eslint-env serviceworker */
/* global firebase */

importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

if (firebase) {
  console.log(`Yay! Firebase is loaded 🎉`);

  firebase.initializeApp({
    apiKey: 'AIzaSyD0Gx8m_fc2O9kN2Z2yxUhqcQs9d10n2EE',
    authDomain: 'ready-steady-release.firebaseapp.com',
    databaseURL: 'https://ready-steady-release.firebaseio.com',
    projectId: 'ready-steady-release',
    storageBucket: 'ready-steady-release.appspot.com',
    messagingSenderId: '841122140278',
    appId: '1:841122140278:web:1d4dee8b83d05c7343cf57',
    measurementId: 'G-90VCTQ1PFJ'
  });

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(payload => {
    console.log('Received background message ', payload);

    return self.registration.showNotification('Title', { body: 'Message.' });
  });
} else {
  console.log(`Boo! Firebase didn't load 😬`);
}
