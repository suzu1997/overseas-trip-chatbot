import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './config';

//firebaseの初期化
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
