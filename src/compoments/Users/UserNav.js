import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InstallButton from '../PWAinstal/pwaInstall';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const UserNav = () => {

  return (
    <Navbar  expand="lg" className="bg-dark navbar">
      <Container className='navbar'>
        <Navbar.Brand className='navbar-brand brand  text-white' href="#home"><img src={"https://heavy-local.com/assets/HeavyLocalLogo.jpg"} className='img-fluid rounded-circle' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-white link'>Home</Nav.Link>
            <Nav.Link href="/articles-page" className='text-white link'>Saved Articles</Nav.Link>
            <Nav.Link href="/articles-page" className='text-white link'>Early Acces</Nav.Link>
            <Nav.Link href="/Art-Gallery-page" className='text-white link'>Art Gallery</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;
