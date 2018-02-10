import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyCeEjbQZMNkgLxN206TcrvWxLWxsV0Qk2c",
    authDomain: "timpantieteenlaitos.firebaseapp.com",
    databaseURL: "https://timpantieteenlaitos.firebaseio.com",
    projectId: "timpantieteenlaitos",
    storageBucket: "timpantieteenlaitos.appspot.com",
    messagingSenderId: "1027923203738"
  };
  firebase.initializeApp(firebaseConfig);
