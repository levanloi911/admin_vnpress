import firebase from 'firebase'

import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyC6TDnZDOPKQNMsNf72c-S03XdlpaEJKAk",
  authDomain: "webexpress-389fc.firebaseapp.com",
  databaseURL: "https://webexpress-389fc-default-rtdb.firebaseio.com",
  projectId: "webexpress-389fc",
  storageBucket: "webexpress-389fc.appspot.com",
  messagingSenderId: "930584858510",
  appId: "1:930584858510:web:7297fdf51ec14450ac9edf"
};
// Initialize Firebase 
const firebaseApp = firebase.initializeApp(firebaseConfig);
 export const db = firebase.firestore();

