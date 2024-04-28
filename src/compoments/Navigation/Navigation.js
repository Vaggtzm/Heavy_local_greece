import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InstallButton from '../PWAinstal/pwaInstall';
import './nav.css';
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";
import {signOut} from 'firebase/auth';
import {useNavigate} from "react-router-dom";

const Navigation = () => {
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
        <Navbar.Brand className='navbar-brand brand  text-white' href="#home"><img src={"/assets/HeavyLocalLogo.jpg"} className='img-fluid rounded-circle' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-white link'>Home</Nav.Link>
            <Nav.Link href="/articles-page" className='text-white link'>Articles</Nav.Link>
            <Nav.Link href="/Art-Gallery-page" className='text-white link'>Art Gallery</Nav.Link>
            <Nav.Link className='text-white link'><InstallButton /></Nav.Link>

            {(loggedIn)&&<Nav.Link onClick={()=>{signOut(auth).then(()=>{navigate("/")})}} className='text-white link'><Button variant={"outline-danger"}>Sign Out</Button></Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
