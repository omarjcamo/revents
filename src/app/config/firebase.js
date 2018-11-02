import firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGTt9B1JmsetFCZrgyclS7U88zdZBym84",
  authDomain: "revents-221109.firebaseapp.com",
  databaseURL: "https://revents-221109.firebaseio.com",
  projectId: "revents-221109",
  storageBucket: "",
  messagingSenderId: "334545231743"
};

firebase.initializeApp(firebaseConfig);
const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

export default firebase;