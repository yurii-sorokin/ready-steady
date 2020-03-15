import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { serviceAccount } from './service-account';

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount())
});

const firestore = app.firestore();

const payload = (
  type: string,
  title: string
): Omit<admin.messaging.Message, 'token'> => ({
  webpush: {
    notification: {
      title: `${type} ${title} is out.`
    }
  }
});

const createMessage = (token: string, type: string) => (
  item: FirebaseFirestore.QueryDocumentSnapshot
): admin.messaging.Message => ({
  token,
  ...payload(type, item.data().title)
});

type Query = [string, FirebaseFirestore.WhereFilterOp, unknown];

const createQueryFrom = (date: Date): Query => [
  'date',
  '>=',
  format(date, 'yyyy-MM-dd')
];

const createQueryTo = (date: Date): Query => [
  'date',
  '<=',
  format(date, 'yyyy-MM-dd')
];

const docsByPeriod = (
  collection: FirebaseFirestore.CollectionReference,
  from: Date,
  to: Date
) =>
  collection
    .where(...createQueryFrom(from))
    .where(...createQueryTo(to))
    .get();

const notifyUser = async (
  userRef: FirebaseFirestore.DocumentReference,
  from: Date,
  to: Date
) => {
  const tokenCollection = userRef.collection('token');
  const gameCollection = userRef.collection('game');
  const movieCollection = userRef.collection('movie');
  const tvCollection = userRef.collection('tv');

  const tokenDos = await tokenCollection.listDocuments();
  const gameDocs = await docsByPeriod(gameCollection, from, to);
  const movieDocs = await docsByPeriod(movieCollection, from, to);
  const tvDocs = await docsByPeriod(tvCollection, from, to);

  const messages = tokenDos
    .map(({ id }) => id)
    .reduce((all, token) => {
      const gameMessages = gameDocs.docs.map(createMessage(token, 'Game'));
      const movieMessages = movieDocs.docs.map(createMessage(token, 'Movie'));
      const tvMessages = tvDocs.docs.map(createMessage(token, 'Tv Show'));

      return all.concat(gameMessages, movieMessages, tvMessages);
    }, [] as admin.messaging.Message[]);

  const cleanUpTokens = (batchResponse: admin.messaging.BatchResponse) =>
    Promise.all(
      batchResponse.responses.map(({ error }, i) => {
        if (
          error &&
          [
            'messaging/invalid-registration-token',
            'messaging/registration-token-not-registered',
            'messaging/invalid-argument'
          ].includes(error.code)
        ) {
          console.error(error);
          return tokenDos[i].delete();
        }
      })
    );

  if (messages.length) {
    return app
      .messaging()
      .sendAll(messages)
      .then(cleanUpTokens)
      .then(() => ({ ok: true }))
      .catch(() => ({ ok: false }));
  }

  return { ok: true };
};

const notifyUsers = async () => {
  const now = new Date();
  const tomorrow = addDays(now, 1);

  const userDocs = await firestore.collection('users').listDocuments();

  return Promise.all(
    userDocs.map(async userRef => notifyUser(userRef, now, tomorrow))
  );
};

export const schedule = functions.pubsub
  .schedule('0 15 * * *')
  .timeZone('EET')
  .onRun(() => notifyUsers());

export const update = functions.https.onRequest(() => notifyUsers());
