import React, { useState, useEffect } from "react";
import { requestPermission, onMessageListener } from "./../../firebase";
import { Toaster, toast } from "react-hot-toast";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      toast.success(`${payload.notification?.title}: ${payload?.notification?.body}`, {
        duration: 6000,
        position: "top-right",
      });
    });

    return () => {
      unsubscribe.catch((err) => console.log("failed :", err));
    };
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default Notification;
