import React, { useEffect, useState } from 'react';
import { get, getDatabase, onValue, ref, update } from 'firebase/database';
import { Badge, Container, ListGroup } from 'react-bootstrap';
import './NotificationsPage.css'; // Import updated CSS file
import { auth } from "../../firebase";

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }
        const db = getDatabase();
        const notificationUserRef = ref(db, `/authors/${user.uid}/notifications`);

        get(notificationUserRef).catch((error) => {
            alert(error);
        });

        return onValue(notificationUserRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notificationList = Object.entries(data)
                    .map(([id, notification]) => ({
                        id,
                        ...notification,
                        sentOn: new Date(notification.sentOn),
                    }))
                    .sort((a, b) => b.sentOn - a.sentOn);

                setNotifications(notificationList);
            }
        });
    }, [user]);

    const markAsRead = (notificationId) => {
        const db = getDatabase();
        const notificationRef = ref(db, `/authors/${user.uid}/notifications/${notificationId}`);

        update(notificationRef, { read: true }).then();
    };

    return (
        <Container className="notifications-container">
            <h1 className="mb-4">Notifications</h1>
            <ListGroup variant="flush">
                {notifications.map((notification) => (
                    <ListGroup.Item
                        key={notification.id}
                        className={`notification-item bg-dark border-2 rounded-3 ${!notification.read ? 'bg-unread' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                    >
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 className="mb-1">{notification.title}</h5>
                                <p className="mb-1">{notification.message}</p>
                                <small className="text-muted">{notification.sentOn.toLocaleString()}</small>
                            </div>
                            {!notification.read && <Badge bg="primary" className="align-self-start">New</Badge>}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default NotificationsPage;
