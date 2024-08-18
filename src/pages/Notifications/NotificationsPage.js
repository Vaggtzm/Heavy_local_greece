/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, {useEffect, useState} from 'react';
import {get, getDatabase, onValue, ref, update} from 'firebase/database';
import {Badge, Container, ListGroup} from 'react-bootstrap';
import './NotificationsPage.css';
import {auth} from "../../firebase"; // Import custom CSS

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);


    useEffect(() => {
        if(!user){
            return ;
        }
        const db = getDatabase();
        const notificationUserRef = ref(db, `/authors/${user.uid}/notifications`);

        get(notificationUserRef).catch((error) => {
            alert(error);
        })

        return onValue(notificationUserRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notificationList = Object.entries(data)
                    .map(([id, notification]) => ({
                        id,
                        ...notification,
                        sentOn: new Date(notification.sentOn),
                    }))
                    .sort((a, b) => b.date - a.date);

                setNotifications(notificationList);
            }
        });
    }, [user]);

    const markAsRead = (notificationId) => {
        const db = getDatabase();
        const notificationRef = ref(db, `/authors/${user.uid}/notifications/${notificationId}`);

        update(notificationRef, {read: true}).then();
    };

    return (
        <Container className="notifications-container">
            <h1 className="mb-4">Notifications</h1>
            <ListGroup variant="flush">
                {notifications.map((notification) => (
                    <ListGroup.Item
                        key={notification.id}
                        className={`notification-item ${!notification.read ? 'bg-unread' : ''}`}
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
