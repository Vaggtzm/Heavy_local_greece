
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging ,getToken ,onMessage } from 'firebase/messaging';
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
export const messaging = getMessaging(app);

export const db = getFirestore(app);

export const requestPermission = () => {

  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {

    if (permission === "granted") {

      console.log("Notification User Permission Granted."); 
      return getToken(messaging, { vapidKey: ` BH6mVEsEd5LCloBMfYKte9lf3AAA9kw367Deb-_NYosgAk6_xP3d5R_YFGQSXYKdI1sDjdS3ZycB-qvyoHi-kUY  ` })
        .then((currentToken) => {

          if (currentToken) {

            console.log('Client Token: ', currentToken);
          } else {
            
            console.log('Failed to generate the app registration token.');
          }
        })
        .catch((err) => {

          console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {

      console.log("User Permission Denied.");
    }
  });

}

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});