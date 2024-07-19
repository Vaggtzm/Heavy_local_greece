import React, {useEffect, useState} from 'react';
import {auth, database} from "../../firebase";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InstallButton from "../PWAinstal/pwaInstall";
import {getIdTokenResult, signOut} from "firebase/auth";
import {Button, NavDropdown} from "react-bootstrap";
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
    const [isCommentAdmin, setIsCommentAdmin] = useState(false);

    const [isBand, setIsBand] = useState(false);

    const [displayName, setDisplayName] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setLoggedIn(true);

                getIdTokenResult(user).then((idTokenResult) => {
                    if (idTokenResult.claims && idTokenResult.claims.band) {
                        setIsBand(true);
                    }
                })


                setDisplayName(user.displayName?user.displayName:"Unknown");
                const userList = ref(database, 'roles');
                onValue(userList, async (snapshot) => {
                    const roles = snapshot.val();

                    const userList = roles.translationSystem;
                    setIsTranslator(userList.includes(user.email));
                    const leaderList = roles.authorLeader;
                    setIsLeader(leaderList.includes(user.email));
                    const adminList = roles.admin;
                    setIsAdmin(adminList.includes(user.email));

                    const commentAdminList = roles.comments?roles.comments:[];
                    setIsCommentAdmin(commentAdminList.includes(user.email));
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
            <Navbar expand="lg" className={`sticky-top ${menuVisible ? 'visible' : 'hidden'}`} variant="dark"
                    style={{backgroundColor: "rgba(0,0,0,0.85)", zIndex: 99999}}>
                <Container fluid >
                    <NavLink to={(loggedIn) ? "/User/home" : "/"} className="navbar-brand">
                        <img
                            src={"https://pulse-of-the-underground.com/assets/PulseOfTheUnderground.jpg"}
                            className="img-fluid rounded-circle"
                            style={{maxWidth: "100px", maxHeight: "100px"}}
                            alt="Navbar Brand"
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse style={{flexFlow: "column"}} id="basic-navbar-nav">
                        <Nav className="d-flex align-items-center justify-content-evenly w-100 table-hover">
                            <NavLink to={(loggedIn) ? "/User/home" : "/"}
                                     className='nav-link text-white '>Home</NavLink>

                            <NavDropdown className={"text-white"} title="Articles" >
                                {(loggedIn) &&
                                    <NavLink to="/User/Saved" className='nav-link bg-dark text-white'>Saved
                                        Articles</NavLink>}
                                <NavLink to={"/articles-page"}
                                         className='nav-link bg-dark text-white'>All Articles</NavLink>
                                {isAuthor && (
                                    <NavLink to="/upload" className='nav-link bg-dark text-white'>Upload</NavLink>
                                )}
                                {isTranslator &&
                                    <NavLink to={"/upload/translation"} className='nav-link bg-dark text-white'>Translation
                                        System</NavLink>
                                }
                            </NavDropdown>


                            <NavLink to={"/Art-Gallery-page"} className='nav-link text-white'>Art Gallery</NavLink>
                            <NavLink to={"/gigs"} className='nav-link text-white'>Gigs</NavLink>
                            <NavLink to={"/ads"} className='nav-link text-white'>Ads By You</NavLink>
                            {(loggedIn)&&<NavLink to="/profile" className='nav-link text-white'>Profile</NavLink>}
                            <InstallButton/>
                            {(isAdmin|| isLeader|| isCommentAdmin) &&
                            <NavDropdown className={"text-white"} title="Administration" >
                                {isCommentAdmin && (
                                    <NavLink to="/admin/comments" className='nav-link text-white bg-dark'>Reported
                                        Comments</NavLink>
                                )}

                                {(isAdmin) &&
                                    <NavLink to="/admin" className='nav-link text-white bg-dark'>User Administration</NavLink>
                                }

                                {(isAdmin || isLeader) &&
                                    <NavLink to="/upload/admin" className='nav-link text-white bg-dark'>Admin Dashboard</NavLink>
                                }
                            </NavDropdown>}


                            {(loggedIn) ? (

                                <div className='nav-link text-white d-flex flex-column align-items-center w-25'>
                                    <Navbar.Text className={"small w-100 m-0"}>
                                        Logged in as: <br/><span><NavLink to="/profile" className="nav-link small w-100">{displayName}</NavLink></span>
                                    </Navbar.Text>
                                    <div className=" w-100">
                                        <Button size={"sm"} onClick={() => {
                                            signOut(auth).then(() => {
                                                navigate("/")
                                            })
                                        }} variant="outline-danger">Sign Out</Button>
                                    </div>
                                </div>

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
