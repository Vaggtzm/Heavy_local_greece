importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");
const firebaseConfig = {
    apiKey: "AIzaSyAvKorfS7r3u8PVcq4O3jWf_yF--mYsZ6c",
    authDomain: "heavy-local-12bc4.firebaseapp.com",
    projectId: "heavy-local-12bc4",
    storageBucket: "heavy-local-12bc4.appspot.com",
    messagingSenderId: "1095342862820",
    appId: "1:1095342862820:web:641656e6dff630f438d7f1",
    measurementId: "G-K1TR05V7PB"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
