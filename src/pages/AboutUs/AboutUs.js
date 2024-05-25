import React, { useState, useEffect } from "react";
import { database } from "../../firebase"; // Import the Firebase database object
import { onValue, ref } from "firebase/database"; // Import the Firebase database reference function

const AboutUs = ({ userIds }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const fetchedUsers = await Promise.all(
                    userIds.map(async (userId) => {
                        const snapshot = await ref(database,`/authors/${userId}`);
                        const userData = onValue(snapshot,()=>{

                        });
                        console.log(userData)
                        return userData;
                    })
                );
                return fetchedUsers.filter(user => user !== null);
            } catch (error) {
                console.error("Error fetching user data:", error);
                return [];
            }
        };

        fetchUserData().then(fetchedUsers => {
            setUsers(fetchedUsers);
        });
    }, [userIds]);

    return (
        <div>
            <h2>About Us</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <strong>{user.displayName}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AboutUs;
