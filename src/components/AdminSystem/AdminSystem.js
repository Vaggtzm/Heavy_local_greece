import React, {useEffect, useState} from "react";
import {auth, database, storage} from "../../firebase";
import {signOut} from "firebase/auth";
import {get, onValue, ref, update} from "firebase/database";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {Button, Card} from "react-bootstrap";
import useNavigate from "../LanguageWrapper/Navigation";

const AdminSystem = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const userList = ref(database, "roles");

    useEffect(()=>{
        return auth.onAuthStateChanged(async (user) => {


            const rolesSnapshot = await get(userList);
            const roles = rolesSnapshot.val();
            setRoles(roles);

            if (user && (roles.admin.includes(user.email) || user.email === "pavlos@orfanidis.net.gr")) {
                setCurrentUser(user);
                const usersRef = ref(database, "authors");
                onValue(usersRef, async (users) => {
                    users = users.val();
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
    }, [])

    const handleRoleChange = (role, email) => {
        const updatedRoles = { ...roles };

        if(!updatedRoles[role]){
            updatedRoles[role] = [];
        }

        if (updatedRoles[role].includes(email)) {
            updatedRoles[role] = updatedRoles[role].filter(userEmail => userEmail !== email);
        } else {
            updatedRoles[role].push(email);
        }

        // Update the roles in the database
        update(ref(database, "roles"), updatedRoles).then();
        setRoles(updatedRoles);
    };

    const getUserRoles = (email) => {
        const userRoles = [];

        console.log("roles",roles)

        Object.keys(roles).forEach((role)=>{
            const emails = roles[role];
            console.log("Emails",emails);
            if (emails.includes(email)) {
                userRoles.push(role);
            }
        });
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
                                            disabled={
                                                userRoles.includes("admin") &&
                                                currentUser.email !== "pavlos@orfanidis.net.gr" &&
                                                currentUser.email !== "tzimasvaggelis02@gmail.com"
                                            }
                                        >
                                            Admin
                                        </Button>
                                        <Button
                                            variant={userRoles.includes("ads") ? "success" : "outline-success"}
                                            onClick={() => handleRoleChange("ads", email)}
                                        >
                                            Ads
                                        </Button>
                                        <Button
                                            variant={userRoles.includes("authorLeader") ? "warning" : "outline-warning"}
                                            onClick={() => handleRoleChange("authorLeader", email)}
                                        >
                                            Author Leader
                                        </Button>
                                        <Button
                                            variant={userRoles.includes("translationSystem") ? "info" : "outline-info"}
                                            onClick={() => handleRoleChange("translationSystem", email)}
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
