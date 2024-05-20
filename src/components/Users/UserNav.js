import React , {useEffect ,useState} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InstallButton from '../PWAinstal/pwaInstall';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const UserNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });
  });

  return (
    <Navbar  expand="lg" className="bg-dark navbar">
      <Container className='navbar'>
        <Navbar.Brand className='navbar-brand brand  text-white' href="#home"><img src={"https://heavy-local.com/assets/HeavyLocalLogo.jpg"} className='img-fluid rounded-circle' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/User/home" className='text-white link'>Home</Nav.Link>
            <Nav.Link href="/User/Saved" className='text-white link'>Saved Articles</Nav.Link>
            {(loggedIn)&&<Nav.Link onClick={()=>{signOut(auth).then(()=>{navigate("/")})}} className='text-white link'><Button variant={"outline-danger"}>Sign Out</Button></Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;
