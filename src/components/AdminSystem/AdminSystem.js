import UserNav from "../Users/UserNav";
import React, {useEffect, useState} from "react";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {auth, config, database} from "../../firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {onValue, ref, update} from "firebase/database";

const AdminSystem= () => {

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
                if (user && (userList.includes(user.email)||user.email==="pavlos@orfanidis.net.gr")){
                    setCurrentUser(user);
                    onValue(usersRef, (users)=>{
                        setUsers(users.val());
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
            <UserNav />
            <div className="container mt-4">
                <h2 className={"h2 text-white"}>User Admin System</h2>
                <hr className="bg-white" />
                <div className="row">
                    <div className="col-12">
                        <table className="table table-dark table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Change Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users && Object.keys(users).map((key, index) => {
                                const email = users[key].email;
                                return (
                                    <tr key={index}>
                                        <td>{users[key].email}</td>
                                        <td>{authorLeader.includes(users[key].email)? "Leader" : admin.includes(users[key].email)?"Admin":"Author"}</td>
                                        <td className="row">
                                            {!roles.admin.includes(email) && (
                                                <button
                                                    className="col-12 col-md-3 btn btn-danger"
                                                    style={{marginRight: "1vh", marginBottom: "1vh"}}
                                                    onClick={() => handleRoleChange('admin', email)}
                                                >
                                                    Admin
                                                </button>
                                            )}
                                            {!roles.authorLeader.includes(email) && (
                                                <button
                                                    disabled={roles.admin.includes(email) && currentUser.email !== "pavlos@orfanidis.net.gr"}
                                                    className="col-12 col-md-3 btn btn-warning"
                                                    style={{marginRight: "1vh", marginBottom: "1vh"}}
                                                    onClick={() => handleRoleChange('authorLeader', email)}
                                                >
                                                    Author Leader
                                                </button>
                                            )}
                                            {!roles.translationSystem.includes(email) && (
                                                <button
                                                    disabled={roles.admin.includes(email) && currentUser.email !== "pavlos@orfanidis.net.gr"}
                                                    className="col-12 col-md-3 btn btn-info"
                                                    style={{marginRight: "1vh", marginBottom: "1vh"}}
                                                    onClick={() => handleRoleChange('translationSystem', email)}
                                                >
                                                    Translator
                                                </button>
                                            )}
                                            {['admin', 'authorLeader', 'translationSystem'].some(role => roles[role].includes(email)) && (
                                                <button
                                                    disabled={roles.admin.includes(email) && currentUser.email !== "pavlos@orfanidis.net.gr"}
                                                    className="col-12 col-md-3 btn btn-secondary"
                                                    style={{marginRight: "1vh", marginBottom: "1vh"}}
                                                    onClick={() => handleRoleChange('authors', email)}
                                                >
                                                    Author
                                                </button>
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