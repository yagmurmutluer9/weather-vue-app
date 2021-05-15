import firebase from 'firebase/app';
import 'firebase/firestore';
import API_KEY from '../../config.js'

var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "weather-app-2172f.firebaseapp.com",
    projectId: "weather-app-2172f",
    storageBucket: "weather-app-2172f.appspot.com",
    messagingSenderId: "399442422786",
    appId: "1:399442422786:web:6f2be2329431d5f4e7cb1b",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();