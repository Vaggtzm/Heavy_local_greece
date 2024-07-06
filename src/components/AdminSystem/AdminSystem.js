import React, { useEffect, useState } from "react";
import { auth, database, storage } from "../../firebase";
import { signOut } from "firebase/auth";
import { get, onValue, ref, update } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { Card, Button } from "react-bootstrap";
import useNavigate from "../LanguageWrapper/Navigation";

const AdminSystem = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});

    useEffect(() => {
        const userList = ref(database, "roles");
        get(userList).then((snapshot) => { console.log(snapshot.exists()) });
        onValue(userList, (snapshot) => {
            const rolesData = snapshot.val();
            setRoles(rolesData);

            const usersRef = ref(database, "authors");

            auth.onAuthStateChanged((user) => {
                if (user && (rolesData.admin.includes(user.email) || user.email === "pavlos@orfanidis.net.gr")) {
                    setCurrentUser(user);
                    onValue(usersRef, async (users) => {
                        users = users.val();
                        console.log("Hello", users);
                        await Promise.all(
                            Object.keys(users).map(async (key) => {
                                const photoUrlRef = storageRef(storage, `profile_images/${key}_600x600`);
                                try {
                                    users[key].photoURL = await getDownloadURL(photoUrlRef);
                                } catch (e) {
                                    console.error(e);
                                }
                            })
                        );

                        setUsers(users);
                    });
                } else {
                    setCurrentUser(null);
                    navigate("/upload");
                    signOut(auth).then();
                }
            });
        });
    }, [navigate]);

    const handleRoleChange = (role, email) => {
        const updatedRoles = { ...roles };

        if (updatedRoles[role].includes(email)) {
            updatedRoles[role] = updatedRoles[role].filter(userEmail => userEmail !== email);
        } else {
            updatedRoles[role].push(email);
        }

        // Update the roles in the database
        update(ref(database, "roles"), updatedRoles);
        setRoles(updatedRoles);
    };

    const getUserRoles = (email) => {
        const userRoles = [];
        for (const [role, emails] of Object.entries(roles)) {
            if (emails.includes(email)) {
                userRoles.push(role);
            }
        }
        return userRoles;
    };

    return (
        <div className="container mt-4">
            <h2 className={"h2 text-white"}>User Admin System</h2>
            <hr className="bg-white" />
            <div className="row">
                {users && roles && Object.keys(users).map((key, index) => {
                    const email = users[key].email;
                    const userRoles = getUserRoles(email);

                    return (
                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                            <Card className="text-center bg-dark">
                                <Card.Body>
                                    {users[key].photoURL && (
                                        <Card.Img
                                            variant="top"
                                            src={users[key].photoURL}
                                            className="w-75 m-4 rounded-circle"
                                            alt={users[key].displayName}
                                        />
                                    )}
                                    <Card.Title className={"text-white"}>
                                        {users[key].displayName} ({users[key].email})
                                    </Card.Title>
                                    <Card.Text className={"bg-secondary text-light badge"}>
                                        {userRoles.length>0?userRoles.join(", "):"Author"}
                                    </Card.Text>
                                    <div className="d-flex justify-content-around mt-3">
                                        <Button
                                            variant={userRoles.includes("admin") ? "danger" : "outline-danger"}
                                            onClick={() => handleRoleChange("admin", email)}
                                        >
                                            Admin
                                        </Button>
                                        <Button
                                            variant={userRoles.includes("authorLeader") ? "warning" : "outline-warning"}
                                            onClick={() => handleRoleChange("authorLeader", email)}
                                            disabled={
                                                userRoles.includes("admin") &&
                                                currentUser.email !== "pavlos@orfanidis.net.gr" &&
                                                currentUser.email !== "tzimasvaggelis02@gmail.com"
                                            }
                                        >
                                            Author Leader
                                        </Button>
                                        <Button
                                            variant={userRoles.includes("translationSystem") ? "info" : "outline-info"}
                                            onClick={() => handleRoleChange("translationSystem", email)}
                                            disabled={
                                                userRoles.includes("admin") &&
                                                currentUser.email !== "pavlos@orfanidis.net.gr" &&
                                                currentUser.email !== "tzimasvaggelis02@gmail.com"
                                            }
                                        >
                                            Translator
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminSystem;
