import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCyR_zMAI8jKUiEUcgfmi5OBLJFDLlpEvQ",
    authDomain: "furappweb.firebaseapp.com",
    databaseURL: "https://furappweb.firebaseio.com",
    projectId: "furappweb",
    storageBucket: "furappweb.appspot.com",
    messagingSenderId: "715319395621"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
