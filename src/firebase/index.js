import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'


const firebaseConfig = {
apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
authDomain: "vuelist-f34fb.firebaseapp.com",
projectId: "vuelist-f34fb",
storageBucket: "vuelist-f34fb.appspot.com",
messagingSenderId: "420544776429",
appId: "1:420544776429:web:14cf63c45f29d64a06e4e4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

export {firebase, db, auth, storage};