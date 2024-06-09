import {signOut} from 'firebase/auth';
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate, NavLink} from "react-router-dom";
import {auth} from "../../firebase";
import InstallButton from '../PWAinstal/pwaInstall';
import './nav.css';
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
        <Navbar expand="lg" className="bg-dark navbar">
            <Container className='navbar'>
                <Navbar.Brand className='navbar-brand brand  text-white' href="#home">{<img
                    src={"https://heavy-local.com/assets/PulseOfTheUnderground.jpg"}
                    className='img-fluid rounded-circle'/>} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white'/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link text-white link'>Home</NavLink>
                        <NavLink to="/articles-page" className='nav-link text-white link'>Articles</NavLink>
                        <NavLink to="/Art-Gallery-page" className='nav-link text-white link'>Art Gallery</NavLink>
                        <InstallButton/>
                        <NavLink to="/User/register" className='nav-link text-white link'>Create Account</NavLink>
                        <NavLink to="/User/login" className='nav-link text-white link'>Log in</NavLink>

                        {(loggedIn) && <Nav.Link onClick={() => {
                            signOut(auth).then(() => {
                                navigate("/")
                            })
                        }} className='text-white link'><Button variant={"outline-danger"}>Sign Out</Button></Nav.Link>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
