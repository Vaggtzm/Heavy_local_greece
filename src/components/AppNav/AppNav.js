import React, {useEffect, useState} from 'react';
import {auth, database} from "../../firebase";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InstallButton from "../PWAinstal/pwaInstall";
import {getIdTokenResult, signOut} from "firebase/auth";
import {Button} from "react-bootstrap";
import {onValue, ref} from "firebase/database";
import './Observer.css';
import NavLink from "../LanguageWrapper/NavLink";
import useNavigate from "../LanguageWrapper/Navigation";

const AppNavigation = ({menuVisible}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAuthor, setIsAuthor] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTranslator, setIsTranslator] = useState(false);
    const [isLeader, setIsLeader] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userList = ref(database, 'roles');
                onValue(userList, async (snapshot) => {
                    const roles = snapshot.val();

                    const userList = roles.translationSystem;
                    setIsTranslator(userList.includes(user.email));
                    const leaderList = roles.authorLeader;
                    setIsLeader(leaderList.includes(user.email));
                    const adminList = roles.admin;
                    setIsAdmin(adminList.includes(user.email));
                    setLoggedIn(true);
                    try {
                        const idTokenResult = await getIdTokenResult(user);
                        setIsAuthor(idTokenResult.claims && idTokenResult.claims.admin);
                        console.log("User is author:", idTokenResult.claims && idTokenResult.claims.admin);
                    } catch (e) {
                        console.error("Error getting ID token result:", e);
                    }
                });
            } else {
                console.log("User is null");
                setLoggedIn(false);
                setIsTranslator(false);
                setIsLeader(false);
                setIsAdmin(false);
                setIsAuthor(false);
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);




    return (
        <>
            <Navbar expand="lg" className={`sticky-top overflow-hidden ${menuVisible ? 'visible' : 'hidden'}`} variant="dark" style={{ backgroundColor: "rgba(0,0,0,0.85)" }}>
                <Container fluid>
                    <NavLink to={(loggedIn) ? "/User/home" : "/"} className="navbar-brand">
                        <img
                            src={"https://pulse-of-the-underground.com/assets/PulseOfTheUnderground.jpg"}
                            className="img-fluid rounded-circle"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                            alt="Navbar Brand"
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex justify-content-center justify-content-evenly w-100 table-hover">
                            <NavLink to={(loggedIn) ? "/User/home" : "/"}
                                     className='nav-link text-white '>Home</NavLink>
                            {(loggedIn) &&
                                <NavLink to="/User/Saved" className='nav-link text-white'>Saved Articles</NavLink>}
                            <NavLink to={"/articles-page"} className='nav-link text-white'>Articles</NavLink>
                            <NavLink to={"/Art-Gallery-page"} className='nav-link text-white'>Art Gallery</NavLink>
                            <NavLink to={"/gigs"} className='nav-link text-white'>Gigs</NavLink>
                            <NavLink to={"/ads"} className='nav-link text-white'>Search for bands</NavLink>
                            <NavLink to="/profile" className='nav-link text-white'>Profile</NavLink>
                            <InstallButton/>
                            {isAuthor && (
                                <>
                                    <NavLink to="/upload" className='nav-link text-white'>Upload</NavLink>
                                </>
                            )}

                            {(isAdmin) &&
                                <NavLink to="/admin" className='nav-link text-white'>User Administration</NavLink>
                            }

                            {(isAdmin || isLeader) &&
                                <NavLink to="/upload/admin" className='nav-link text-white'>Admin Dashboard</NavLink>
                            }
                            {isTranslator &&
                                <NavLink to={"/upload/translation"} className='nav-link text-white'>Translation
                                    System</NavLink>
                            }

                            {(loggedIn) ? (
                                <Nav.Link onClick={() => {
                                    signOut(auth).then(() => {
                                        navigate("/")
                                    })
                                }} className='nav-link text-white'><Button variant="outline-danger">Sign
                                    Out</Button></Nav.Link>
                            ) : (<>
                                    <NavLink to="/User/register" className='nav-link text-white link'>Create
                                        Account</NavLink>
                                    <NavLink to="/User/login" className='nav-link text-white link'>Log in</NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AppNavigation;
