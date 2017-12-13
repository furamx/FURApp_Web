import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCyR_zMAI8jKUiEUcgfmi5OBLJFDLlpEvQ",
    authDomain: "furappweb.firebaseapp.com",
    databaseURL: "https://furappweb.firebaseio.com",
    projectId: "furappweb",
    storageBucket: "furappweb.appspot.com",
    messagingSenderId: "715319395621"
};
firebase.initializeApp(config);

// Firebase storage reference
// var storage = firebase.storage();

export default firebase;