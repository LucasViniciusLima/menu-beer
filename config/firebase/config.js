import firebase from 'firebase';
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBaqsj0H5lhIp0NAWYJCNs1T_0o50dL7cg",
    authDomain: "menu-beer.firebaseapp.com",
    databaseURL: "https://menu-beer-default-rtdb.firebaseio.com",
    projectId: "menu-beer",
    storageBucket: "menu-beer.appspot.com",
    messagingSenderId: "155009010583",
    appId: "1:155009010583:web:46440ce587ad7df9a752d2"
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
