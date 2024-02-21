
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';
import {getFirestore} from 'firebase/firestore';






const firebaseConfig = {
    apiKey: "AIzaSyBloW4BFTb3Q4RmW95ctPNAl67uh7h9G2M",
    authDomain: "heavylocal-2257a.firebaseapp.com",
    projectId: "heavylocal-2257a",
    storageBucket: "heavylocal-2257a.appspot.com",
    messagingSenderId: "352508897996",
    appId: "1:352508897996:web:ce85937a30f8cba8a53069",
    measurementId: "G-YF150V0NVQ"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const db = getFirestore(app);