// UserCards.js
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './author.css';

const Author = ({ userId }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const usersRef = ref(database, `authors/${userId}`);

        const unsubscribe = onValue(usersRef, (snapshot) => {
            const usersData = snapshot.val();
            console.log(usersData);
            setUser(usersData);
        });

        return () => {
            off(usersRef, 'value', unsubscribe);
        };
    }, [userId]);

    return (
        <div className="card w-100">
            <div className="card-title d-flex align-items-center">
                <div className="image-container">
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                    />
                </div>
                <div className="ms-3">
                    <h4 className="mb-0">{user.displayName}</h4>
                    <p className={"text-start mt-2"}>{user.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Author;
