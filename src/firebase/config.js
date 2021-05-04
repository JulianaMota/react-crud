import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw_gg5PYgvrs1H-vqc1BpLSMgzij7yB9s",
  authDomain: "test-database-806ef.firebaseapp.com",
  projectId: "test-database-806ef",
  storageBucket: "test-database-806ef.appspot.com",
  messagingSenderId: "190840877508",
  appId: "1:190840877508:web:e54bcb6c17383a8b1cf491",
  measurementId: "G-DDRCR2TTH8"
};

//init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectStorage = firebase.storage();

export { projectFirestore, timestamp, projectAuth, projectStorage };
