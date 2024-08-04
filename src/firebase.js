import {connectAuthEmulator, getAuth, signOut} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {connectDatabaseEmulator, getDatabase} from 'firebase/database';
import {getMessaging} from 'firebase/messaging';
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';
import {connectStorageEmulator, getStorage} from 'firebase/storage';
import {getRemoteConfig} from 'firebase/remote-config';
import {connectFunctionsEmulator, getFunctions} from 'firebase/functions';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);

const config = getRemoteConfig(app);
config.settings = {
    minimumFetchIntervalMillis: 3600000, // 1 hour
    fetchTimeoutMillis: 60000, // 1 minute
};

const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);
const functions = getFunctions(app);

const isServiceWorkerSupported = () => 'serviceWorker' in navigator;
const isNotificationSupported = () => 'Notification' in window;

let firebaseMessaging;
try {
    firebaseMessaging = isServiceWorkerSupported() && isNotificationSupported() ? getMessaging(app) : undefined;
} catch (e) {
    firebaseMessaging = undefined;
}

// Connect to emulators if in development mode
export const isDev = process.env.NODE_ENV === 'development';
const useEmulators = process.env.REACT_APP_USE_EMULATORS === 'true';

if (isDev&&useEmulators) {
    console.log("Dev env");
    connectAuthEmulator(auth, "http://localhost:9099");
    connectDatabaseEmulator(database, "localhost", 9001);
    connectFirestoreEmulator(firestore, "localhost", 8081);
    connectStorageEmulator(storage, "localhost", 9199);
    connectFunctionsEmulator(functions, "localhost", 8443);
}

export {
    app,
    config,
    firestore,
    analytics,
    storage,
    auth,
    database,
    functions,
    firebaseMessaging as messaging
};
