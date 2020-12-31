import firebase from 'firebase';
import "firebase/auth";

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
var auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    promt: "select_account",
})

function signout() {
    auth.signOut()
}

function signUpWithEmail(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            console.log("new user")
            console.log(user)
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
}

function signInWithEmail(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
let inc = firebase.firestore.FieldValue.increment(1)
let dec = firebase.firestore.FieldValue.increment(-1)
let del = firebase.firestore.FieldValue.delete()
let Timestamp = firebase.firestore.Timestamp



export { db, inc, dec, del, auth, signUpWithEmail, signInWithEmail, signout, signInWithGoogle, Timestamp };