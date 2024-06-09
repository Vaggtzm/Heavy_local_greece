import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getDatabase} from 'firebase/database';
import {getMessaging} from 'firebase/messaging';
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";
import {getStorage} from 'firebase/storage';
import {getRemoteConfig} from "firebase/remote-config";


const firebaseConfig = {
    apiKey: "AIzaSyAvKorfS7r3u8PVcq4O3jWf_yF--mYsZ6c",
    authDomain: "pulse-of-the-underground.com",
    databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
    projectId: "heavy-local-12bc4",
    storageBucket: "heavy-local-12bc4.appspot.com",
    messagingSenderId: "1095342862820",
    appId: "1:1095342862820:web:641656e6dff630f438d7f1",
    measurementId: "G-K1TR05V7PB",
};

export const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LdI_sMpAAAAADFJGDiXfkFW4VPap3M_YDFN2cwi'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});
export const config = getRemoteConfig(app);
config.settings = {
    minimumFetchIntervalMillis: 36000, // 1 minute
    fetchTimeoutMillis: 60000, // 1 minute
};


export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
