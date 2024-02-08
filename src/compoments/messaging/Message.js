import firebase from 'firebase/app';
import 'firebase/messaging';

const messaging = firebase.messaging();


messaging.requestPermission().then(()=>{
    console.log("uprove permission");
    return messaging.getToken()
}).then((token)=>{
    console.log("Fcm token is :" + token);
}) .catch((error)=> {
    console.log('Erorr while approving the notification');
});

export default messaging;