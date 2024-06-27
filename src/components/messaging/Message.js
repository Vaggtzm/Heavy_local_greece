import toast, {Toaster} from "react-hot-toast";
import {onMessage} from 'firebase/messaging';
import {messaging} from "../../firebase";
import {useEffect} from "react";

function NotificationToast() {
    useEffect(() => {

    }, []);


    onMessage(messaging, (payload) => {
        console.log("New message", payload.notification.body);
        toast(payload.notification.title + "\n\n\n\n" + payload.notification.body);
        console.log(payload);
    });
    return (
        <div>
            <Toaster/>
        </div>
    );
}

export default NotificationToast;
