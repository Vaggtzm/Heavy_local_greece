import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebase';
import { Container, Navbar, Nav, NavDropdown, Button, Badge } from 'react-bootstrap';
import { getIdTokenResult, signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import './Observer.css';
import NavLink from '../LanguageWrapper/NavLink';
import useNavigate from '../LanguageWrapper/Navigation';
import InstallButton from "../PWAinstal/pwaInstall";

const AppNavigation = ({ menuVisible }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTranslator, setIsTranslator] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [isCommentAdmin, setIsCommentAdmin] = useState(false);
    const [isBand, setIsBand] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [profilePic, setProfilePic] = useState('https://via.placeholder.com/50'); // Default profile picture
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setLoggedIn(true);

                getIdTokenResult(user).then((idTokenResult) => {
                    if (idTokenResult.claims && idTokenResult.claims.band) {
                        setIsBand(true);
                    }
                });

                setDisplayName(user.displayName ? user.displayName : 'Unknown');
                setProfilePic(user.photoURL ? user.photoURL : 'https://via.placeholder.com/50'); // Set profile picture

                const userListRef = ref(database, 'roles');
                onValue(userListRef, async (snapshot) => {
                    const roles = snapshot.val();
                    const userList = roles.translationSystem;
                    setIsTranslator(userList.includes(user.email));
                    const leaderList = roles.authorLeader;
                    setIsLeader(leaderList.includes(user.email));
                    const adminList = roles.admin;
                    setIsAdmin(adminList.includes(user.email));
                    const commentAdminList = roles.comments ? roles.comments : [];
                    setIsCommentAdmin(commentAdminList.includes(user.email));

                    try {
                        const idTokenResult = await getIdTokenResult(user);
                        setIsAuthor(idTokenResult.claims && idTokenResult.claims.admin);
                    } catch (e) {
                        console.error('Error getting ID token result:', e);
                    }
                });

                // Fetch notifications based on role
                const notificationsRef = isAuthor
                    ? ref(database, `/authors/${user.uid}/notifications`)
                    : ref(database, `/users/${user.uid}/notifications`);

                onValue(notificationsRef, (snapshot) => {
                    const notificationsData = snapshot.val();
                    if (notificationsData) {
                        const notificationsArray = Object.values(notificationsData).sort(
                            (a, b) => new Date(b.date) - new Date(a.date)
                        );
                        setNotifications(notificationsArray);
                    }
                });
            } else {
                setLoggedIn(false);
                setIsTranslator(false);
                setIsLeader(false);
                setIsAdmin(false);
                setIsAuthor(false);
                setNotifications([]);
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, [isAuthor]);

    const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;

    return (
        <Navbar expand="lg" className={`sticky-top ${menuVisible ? 'visible' : 'hidden'}`} variant="dark"
                style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 99999 }}>
            <Container fluid>
                <NavLink to={(loggedIn) ? '/User/home' : '/'} className="navbar-brand">
                    <img
                        src="https://pulse-of-the-underground.com/assets/PulseOfTheUnderground.jpg"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: '50px', maxHeight: '50px' }}
                        alt="Navbar Brand"
                    />
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse style={{ flexFlow: 'column' }} id="basic-navbar-nav">
                    <Nav className="d-flex align-items-center justify-content-evenly w-100 table-hover">
                        <NavLink to={(loggedIn) ? '/User/home' : '/'} className="nav-link text-white">
                            Home
                        </NavLink>

                        <NavDropdown data-bs-theme="dark" className="text-white" title="Articles" menuClassName="nav-dropdown-menu">
                            {loggedIn &&
                                <NavLink to="/User/Saved" className="nav-link text-white">Saved Articles</NavLink>}
                            <NavLink to="/articles-page" className="nav-link text-white">All Articles</NavLink>
                            {isAuthor && (
                                <NavLink to="/upload" className="nav-link text-white">Upload</NavLink>
                            )}
                            {isTranslator &&
                                <NavLink to="/upload/translation" className="nav-link text-white">Translation System</NavLink>
                            }
                        </NavDropdown>

                        <NavLink to="/youtube" className="nav-link text-white">YouTube Videos</NavLink>
                        <NavLink to="/Art-Gallery-page" className="nav-link text-white">Art Gallery</NavLink>
                        <NavLink to="/gigs" className="nav-link text-white">Gigs</NavLink>
                        <NavLink to="/ads" className="nav-link text-white">Ads By You</NavLink>

                        <NavDropdown data-bs-theme="dark" className="text-white" title={
                            <div className="profile-badge-container">
                                <img src={profilePic} alt="Profile" className="profile-image"/>
                                {unreadNotificationsCount > 0 &&
                                    <Badge pill bg="danger">{unreadNotificationsCount}</Badge>}
                            </div>
                        } align="end" menuClassName="nav-dropdown-menu">
                            <NavDropdown.Item as={NavLink} to="/profile" className="text-white">
                                <strong>{displayName}</strong>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/notifications" className="text-white">
                                Notifications {unreadNotificationsCount > 0 && <Badge pill bg="danger">{unreadNotificationsCount}</Badge>}
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => signOut(auth).then(() => navigate("/"))} className="text-danger">
                                Sign Out
                            </NavDropdown.Item>
                        </NavDropdown>

                        <InstallButton/>

                        {(isAdmin || isLeader || isCommentAdmin || isAuthor) &&
                            <NavDropdown data-bs-theme="dark" className="text-white" title="Administration" menuClassName="nav-dropdown-menu">
                                {isCommentAdmin && (
                                    <NavLink to="/admin/comments" className="nav-link text-white">Reported Comments</NavLink>
                                )}
                                {isAdmin &&
                                    <NavLink to="/admin" className="nav-link text-white">User Administration</NavLink>
                                }
                                {(isAdmin || isLeader || isAuthor) &&
                                    <NavLink to="/upload/admin" className="nav-link text-white">Admin Dashboard</NavLink>
                                }
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavigation;
