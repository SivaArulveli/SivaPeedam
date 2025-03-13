// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBXFxHEzF6qQmWA6_pODqRoJqEwXn4Jxwo',
  authDomain: 'siva-peedam.firebaseapp.com',
  projectId: 'siva-peedam',
  storageBucket: 'siva-peedam.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef0123456789'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();