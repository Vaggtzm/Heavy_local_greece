importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBloW4BFTb3Q4RmW95ctPNAl67uh7h9G2M",

  authDomain: "heavylocal-2257a.firebaseapp.com",

  projectId: "heavylocal-2257a",

  storageBucket: "heavylocal-2257a.appspot.com",

  messagingSenderId: "352508897996",

  appId: "1:352508897996:web:ce85937a30f8cba8a53069",

  measurementId: "G-YF150V0NVQ"

};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
