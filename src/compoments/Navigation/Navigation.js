import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './../../assets/HeavyLocalLogo.jpg';
import './nav.css';

const Navigation = () => {
  return (
    <Navbar  expand="lg" className="bg-dark navbar">
      <Container className='navbar'>
        <Navbar.Brand className='navbar-brand brand  text-white' href="#home"><img src={Logo} className='img-fluid rounded-circle' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-white link'>Home</Nav.Link>
            <Nav.Link href="/articles-page" className='text-white link'>Articles</Nav.Link>
            <Nav.Link href="/Art-Gallery-page" className='text-white link'>Art Gallery</Nav.Link>
            <a href="/SignUp" className='btn btn-outline-danger text-white link'>Create Account</a>
            <a href="/" className='btn btn-outline-danger text-white link'>Sign Up</a>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
