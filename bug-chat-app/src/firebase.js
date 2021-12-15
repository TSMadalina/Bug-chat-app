
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

//using firebase db to store the comments and real time users of the app
const firebaseConfig = {
    apiKey: "AIzaSyB36T3b3EXXvqpLJt3_X9FLMB0r426amlU",
    authDomain: "bug-chat-app.firebaseapp.com",
    projectId: "bug-chat-app",
    storageBucket: "bug-chat-app.appspot.com",
    messagingSenderId: "352366312746",
    appId: "1:352366312746:web:47f33495e76b5293313253",
    measurementId: "G-LCGW8HN74K"
  };

//connect front-end to back-end
const firebaseApp = firebase.initializeApp(firebaseConfig);
//to get access to the database
const db = firebaseApp.firestore();

//creating a log-in page
const auth = firebase.auth();
//authentification with google account
const provider = new firebase.auth.GoogleAuthProvider();


export {auth, provider};
export default db;