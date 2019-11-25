//import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const FirebaseConfig = {
  apiKey: 'AIzaSyAIiLAT3FskK6XmULSw_213ydLgvESO0-g',
  authDomain: 'vacininha.firebaseapp.com',
  databaseURL: 'https://vacininha.firebaseio.com',
  projectId: 'vacininha',
  storageBucket: 'vacininha.appspot.com',
  messagingSenderId: '460356693208'
};

firebase.initializeApp(FirebaseConfig);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
const auth = firebase.auth();
const equipments = db.collection('equipments');

export {
  auth,
  equipments,
  db,
  firebase
};