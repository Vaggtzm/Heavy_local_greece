import toast,{Toaster} from "react-hot-toast";
import {onMessage} from 'firebase/messaging';
import {messaging} from "../../firebase";
import {useEffect} from "react";

function Notification() {
    useEffect(() => {
        onMessage(messaging, (payload) => {
            console.log("New message", payload);
            toast(payload.notification);
        });
    }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default Notification;
