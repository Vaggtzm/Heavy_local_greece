
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
//import { getMessaging ,getToken ,onMessage } from 'firebase/messaging';
import {getFirestore} from 'firebase/firestore';
import {getMessaging} from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvKorfS7r3u8PVcq4O3jWf_yF--mYsZ6c",
  authDomain: "heavy-local-12bc4.firebaseapp.com",
  projectId: "heavy-local-12bc4",
  storageBucket: "heavy-local-12bc4.appspot.com",
  messagingSenderId: "1095342862820",
  appId: "1:1095342862820:web:641656e6dff630f438d7f1",
  measurementId: "G-K1TR05V7PB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//export const messaging = getMessaging(app);

export const db = getFirestore(app);

export const messaging = getMessaging(app);

