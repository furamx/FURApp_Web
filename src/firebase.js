import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyARaUyPLbss1R4zD7z5d4996MfZp92esOQ",
    authDomain: "furapp-f835b.firebaseapp.com",
    databaseURL: "https://furapp-f835b.firebaseio.com",
    projectId: "furapp-f835b",
    storageBucket: "furapp-f835b.appspot.com",
    messagingSenderId: "408910772025"
  };

firebase.initializeApp(config);

export default firebase;