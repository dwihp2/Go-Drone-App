// import * as firebase from 'firebase';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDGsFlxF2OGb3Wk065n-MYXRl4GNKu6NhU",
    authDomain: "go-drone-app-1555832629237.firebaseapp.com",
    databaseURL: "https://go-drone-app-1555832629237.firebaseio.com",
    projectId: "go-drone-app-1555832629237",
    storageBucket: "",
    messagingSenderId: "421705696625",
    appId: "1:421705696625:web:e3c038c46e7934fc"
};

// const Firebase = firebase.initializeApp(config);
// export default Firebase;

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

