import UserNav from "../Users/UserNav";
import React, {useEffect, useState} from "react";
import {auth, database, storage} from "../../firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {onValue, ref, update} from "firebase/database";
import {getDownloadURL, ref as storageRef} from "firebase/storage";

const AdminSystem = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [authorLeader, setAuthorLeader] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const userList = ref(database, 'roles');
        onValue(userList, (snapshot) => {
            const roles = snapshot.val();
            setRoles(roles);

            const userList = roles.admin;
            setAuthorLeader(roles.authorLeader);
            setAdmin(userList);

            const usersRef = ref(database, 'authors');

            auth.onAuthStateChanged((user) => {
                if (user && (userList.includes(user.email) || user.email === "pavlos@orfanidis.net.gr")) {
                    setCurrentUser(user);
                    onValue(usersRef, async (users) => {
                        users = users.val()
                        await Promise.all(
                            Object.keys(users).map(async key => {
                                const photoUrlRef = storageRef(storage, `profile_images/${key}_600x600`);
                                try {
                                    users[key].photoURL = await getDownloadURL(photoUrlRef);
                                } catch (e) {
                                    console.error(e);
                                }
                            }));

                        setUsers(users);
                    });
                } else {
                    setCurrentUser(null);
                    navigate('/upload');
                    signOut(auth).then();
                }
            });
        });
    }, [navigate]);


    const handleRoleChange = (role, email) => {
        if (role !== 'authors') {
            // Add email to the new role
            roles[role].push(email);
        }

        // Remove email from other roles
        ['admin', 'authorLeader', 'translationSystem'].forEach(r => {
            if (r !== role && roles[r].includes(email)) {
                roles[r].splice(roles[r].indexOf(email), 1);
            }
        });

        // Update the roles in the database
        update(ref(database, 'roles'), roles);
    };


    return (
        <div>
            <UserNav/>
            <div className="container mt-4">
                <h2 className={"h2 text-white"}>User Admin System</h2>
                <hr className="bg-white"/>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-dark table-striped">
                            <thead>
                            <tr className={"row"} style={{marginRight: "0.1vh"}}>
                                <th className={"col-2"}>Image</th>
                                <th className={"col-3"}>Email</th>
                                <th className={"col-3"}>Role</th>
                                <th className={"col-4"}>Change Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users && roles && Object.keys(users).map((key, index) => {
                                const email = users[key].email;


                                return (
                                    <tr key={index} className={"row"}>
                                        <td className={"col-2"}>{users[key].photoURL &&
                                            <img className={"w-75 m-4"} alt={users[key].displayName}
                                                 src={users[key].photoURL}/>}</td>
                                        <td className={"col-3"}>{users[key].displayName} ({users[key].email})</td>
                                        <td className={"col-3"}>{authorLeader.includes(users[key].email) ? "Author Leader" : admin.includes(users[key].email) ? "Admin" : roles.translationSystem.includes(users[key].email) ? "Translator" : "Author"}</td>
                                        <td className="row col-4">
                                            {!roles.admin.includes(email) && (
                                                <div className="col-4">
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleRoleChange('admin', email)}
                                                    >
                                                        Admin
                                                    </button>
                                                </div>
                                            )}
                                            {!roles.authorLeader.includes(email) && (
                                                <div className="col-4" style={{padding: "0"}}>
                                                    <button
                                                        disabled={roles.admin.includes(email) && currentUser.email !== "pavlos@orfanidis.net.gr" && currentUser.email !== "tzimasvaggelis02@gmail.com"}
                                                        className="btn btn-warning"
                                                        onClick={() => handleRoleChange('authorLeader', email)}
                                                    >
                                                        Author Leader
                                                    </button>
                                                </div>
                                            )}
                                            {!roles.translationSystem.includes(email) && (
                                                <div className="col-4" style={{padding: "0"}}>
                                                    <button
                                                        disabled={roles.admin.includes(email) && currentUser.email !== "pavlos@orfanidis.net.gr" && currentUser.email !== "tzimasvaggelis02@gmail.com"}
                                                        className="btn btn-info"
                                                        onClick={() => handleRoleChange('translationSystem', email)}
                                                    >
                                                        Translator
                                                    </button>
                                                </div>
                                            )}
                                            {['admin', 'authorLeader', 'translationSystem'].some(role => roles[role].includes(email)) && (
                                                <div className="col-4" style={{padding: "0"}}>
                                                    <button
                                                        disabled={roles.admin.includes(email) && currentUser.email !== "pavlos@orfanidis.net.gr" && currentUser.email !== "tzimasvaggelis02@gmail.com"}
                                                        className="btn btn-secondary"
                                                        style={{marginRight: "1vh", marginBottom: "1vh"}}
                                                        onClick={() => handleRoleChange('authors', email)}
                                                    >
                                                        Author
                                                    </button>
                                                </div>
                                            )}
                                        </td>

                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSystem;