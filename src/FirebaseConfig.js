import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBgtU1g6WHNiYqzjU-Ew-Lupl7VZXXisXY",
    authDomain: "tasks-d6ab8.firebaseapp.com",
    projectId: "tasks-d6ab8",
    storageBucket: "tasks-d6ab8.appspot.com",
    messagingSenderId: "1020031628697",
    appId: "1:1020031628697:web:da607865b6b17edca78f08"
};

var fire = firebase.initializeApp(firebaseConfig);
var db = fire.firestore();
let inc = firebase.firestore.FieldValue.increment(1)
let dec = firebase.firestore.FieldValue.increment(-1)
let del = firebase.firestore.FieldValue.delete()
let Timestamp = firebase.firestore.Timestamp

export { db, inc, dec, del, Timestamp };