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

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { ListGroup, Container, Badge } from 'react-bootstrap';
import './NotificationsPage.css'; // Import custom CSS

const NotificationsPage = ({ uid }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const notificationUserRef = ref(db, `/authors/${uid}/notifications`);

        onValue(notificationUserRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notificationList = Object.entries(data)
                    .map(([id, notification]) => ({
                        id,
                        ...notification,
                        date: new Date(notification.date),
                    }))
                    .sort((a, b) => b.date - a.date);

                setNotifications(notificationList);
            }
        });
    }, [uid]);

    const markAsRead = (notificationId) => {
        const db = getDatabase();
        const notificationRef = ref(db, `/authors/${uid}/notifications/${notificationId}`);

        update(notificationRef, { read: true });
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
                                <small className="text-muted">{notification.date.toLocaleString()}</small>
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
