import React , {useEffect ,useState} from 'react';
import {getIdTokenResult, signOut} from 'firebase/auth';
import {auth, config, database} from '../../firebase';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InstallButton from '../PWAinstal/pwaInstall';
import {Button} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {onValue, ref} from "firebase/database";

const UserNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthor, setIsAuthor] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTranslator, setIsTranslator] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const navigate = useNavigate();

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
    <Navbar  expand="lg" className="bg-dark navbar">
      <Container className='navbar'>
        <Navbar.Brand className='navbar-brand brand  text-white' href="#home"><img src={"https://heavy-local.com/assets/HeavyLocalLogo.jpg"} className='img-fluid rounded-circle' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/User/home" className='text-white link'>Home</Nav.Link>
            <Nav.Link href="/User/Saved" className='text-white link'>Saved Articles</Nav.Link>
              {isAuthor && (
                  <>
                      <NavLink to="/upload" className='nav-link text-white link'>
                          Upload
                      </NavLink>
                      <NavLink to="/upload/profile" className='nav-link text-white link'>
                          Profile
                      </NavLink>
                      <NavLink to="/articles-page" className='nav-link text-white link'>
                          Article List
                      </NavLink>
                  </>
              )}

              {(isAdmin)&&
                  <NavLink to="/admin" className='nav-link text-white link'>
                      User Administration
                  </NavLink>
              }

              {(isAdmin||isLeader)&&
                  <NavLink to="/upload/admin" className='nav-link text-white link'>
                      Admin Dashboard
                  </NavLink>
              }
              {isTranslator&&
                <NavLink to={"/upload/translation"} className='nav-link text-white link'>
                    Translation System
                </NavLink>
              }

              {(loggedIn)&&<Nav.Link onClick={()=>{signOut(auth).then(()=>{navigate("/")})}} className='text-white link'><Button variant={"outline-danger"}>Sign Out</Button></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;
