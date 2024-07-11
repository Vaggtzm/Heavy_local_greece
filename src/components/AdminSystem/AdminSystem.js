import React, {useEffect, useState} from "react";
import {auth, database, storage} from "../../firebase";
import {signOut} from "firebase/auth";
import {get, onValue, ref, update} from "firebase/database";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {Button, Card, Form, Modal} from "react-bootstrap";
import useNavigate from "../LanguageWrapper/Navigation";
import {setAuthor} from "../UploadSystem/articleData/articleData";

const AdminSystem = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const [newUserEmail, setNewUserEmail] = useState("");
    const userList = ref(database, "roles");

    /**
     * Code for the remove User
     */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (email) => {
        setNewUserEmail(email);
        setShow(true);
    }
    const handleConfirm = () => {
        console.log(newUserEmail);
        setAuthor(newUserEmail, true, false).then(()=>{
            handleClose();
        }).catch((e)=>{
            alert(e.message)
        });
    };



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

        Object.keys(roles).forEach((role)=>{
            let emails = roles[role];
            if(!emails){
                emails = [];
            }
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
            <div className={"row d-flex justify-content-center mb-4"}>
                <div className={"col-6 d-flex  justify-content-between"}>
                    <Form.Control className={"bg-dark text-white m-1 "} type={"text"} value={newUserEmail} onChange={(event)=>{setNewUserEmail(event.target.value)}} placeholder={"Enter the email for the new author"}/>
                    <Button className={"m-1"} variant={"primary"} onClick={async ()=>{
                        try {
                            const result = await setAuthor(newUserEmail, true, true).then()
                            alert(result.data.message);
                        }catch (e) {
                            alert(e.message)
                        }
                    }}>Make Author</Button>
                </div>
            </div>
            <hr className={"bg-dark text-white"}/>
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
                                            variant={userRoles.includes("galleryAdmin") ? "secondary" : "outline-secondary"}
                                            onClick={() => handleRoleChange("galleryAdmin", email)}
                                        >
                                            Gallery
                                        </Button>
                                    </div>
                                    <div className="d-flex justify-content-around mt-3">
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
                                        <Button variant="danger" onClick={()=>handleShow(email)}>
                                            Remove
                                        </Button>

                                        <Modal size={"md"} className={"bg-transparent"} show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm Removal</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to remove this user from the authors?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button variant="danger" onClick={handleConfirm}>
                                                    Remove
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

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
