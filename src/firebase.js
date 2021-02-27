import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCZfCCf3Mz72-IQRj33pk2KsuXo5EXWR0c",
  authDomain: "azka-movie-list.firebaseapp.com",
  projectId: "azka-movie-list",
  storageBucket: "azka-movie-list.appspot.com",
  messagingSenderId: "449590922757",
  appId: "1:449590922757:web:1002d66e5de182022d166c"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;