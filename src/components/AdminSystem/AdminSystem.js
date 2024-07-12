import React, {useEffect, useState} from "react";
import {auth, database, storage} from "../../firebase";
import {signOut} from "firebase/auth";
import {get, onValue, ref, update} from "firebase/database";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {Button, Card, DropdownButton, Form, Modal, Dropdown} from "react-bootstrap";
import useNavigate from "../LanguageWrapper/Navigation";
import {disableUser, setAuthor, setClaims} from "../UploadSystem/articleData/articleData";

const AdminSystem = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const [newUserEmail, setNewUserEmail] = useState("");
    const userList = ref(database, "roles");

    const [role, setRole] = useState('admin');

    const roleMapping = {
        Author: "admin",
        Band: "band"
    };

    const [functionToRun, setFunctionToRun] = useState(null);
    const [functionArguments, setFunctionArguments] = useState(null);

    const [popupMessage, setPopupMessage] = useState("");

    const toggleDisableUser = async (user) => {
        const userRef = ref(database, `authors/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();
        userData.disabled = !userData.disabled;
        await update(userRef, userData);
        await disableUser(user.email, true, userData.disabled)
        alert(`The user has been ${userData.disabled?"disabled":"enabled"} successfully!`);
    }

    /**
     * Code for the remove User
     */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (args, functionToRun, message) => {
        setFunctionArguments(args);
        setPopupMessage(message);
        console.log(functionToRun);
        console.log(args);
        setFunctionToRun((prevValue)=>{return functionToRun});
        setShow(true);
    }
    const handleConfirm = () => {
        console.log(functionToRun);
        if(!functionArguments.email) {
            functionToRun(functionArguments, true, false).then(() => {
                handleClose();
            }).catch((e) => {
                alert(e.message)
            });
        }
        else{
            console.log(functionArguments)
            functionToRun(functionArguments).then(() => {
                handleClose();
            }).catch((e) => {
                alert(e.message)
            });
        }
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
            <div className={"row d-flex justify-content-center"}>
                <div className={"row col-8 col-md-12 d-flex  justify-content-center"}>
                    <div className={"col-12 col-md-6 m-1 m-md-4"}>
                    <Form.Control className={"bg-dark text-white"} type={"text"} value={newUserEmail} onChange={(event)=>{setNewUserEmail(event.target.value)}} placeholder={"Enter the email for the new author"}/>
                    </div>
                    <div className={"m-1 col-3 col-md-1 m-md-4"}>
                    <DropdownButton
                        id="dropdown-role-selector"
                        title={role}
                        className={"w-100"}
                        onSelect={(selectedRole) => {
                            console.log(selectedRole);
                            setRole(selectedRole)
                        }}
                    >
                        {Object.keys(roleMapping).map((roleName) => (
                            <Dropdown.Item key={roleName} eventKey={roleName} id={roleMapping[roleName]}>
                                {roleName}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    </div>
                    <div className={"m-1 col-6 col-md-2 m-md-4"}>
                    <Button variant={"primary"} onClick={async ()=>{
                        try {
                            const claims = {}
                            claims[roleMapping[role]] = true;
                            console.log(claims)
                            const result = await setClaims(newUserEmail, true, claims).then()
                            alert(result.data.message);
                        }catch (e) {
                            alert(e.message)
                        }
                    }}>
                        Set Role
                    </Button>
                    </div>
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
                                        <Button
                                            variant={userRoles.includes("comments") ? "success" : "outline-success"}
                                            onClick={() => handleRoleChange("comments", email)}
                                        >
                                            Comments Admin
                                        </Button>
                                    </div>
                                    <div className="d-flex justify-content-around mt-3">
                                        <Button variant="danger" onClick={()=>handleShow(email, setAuthor, `Do you really want to remove ${email} from the authors?`)}>
                                            Remove
                                        </Button>
                                        <Button variant={!users[key].disabled?"danger":"outline-danger"} onClick={()=>handleShow(users[key], toggleDisableUser, `Do you really want to ${!users[key].disabled?"disable":"dnable"} ${email}`)}>
                                            {!users[key].disabled?"Disable":"Enable"}
                                        </Button>

                                        <Modal size={"md"} className={"bg-transparent"} show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>{popupMessage}</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    No
                                                </Button>
                                                <Button variant="danger" onClick={handleConfirm}>
                                                    Yes
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
}  ;

export default AdminSystem;
