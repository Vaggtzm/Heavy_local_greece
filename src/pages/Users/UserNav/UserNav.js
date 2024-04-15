import React from "react";
import { Container , Nav , Navbar } from "react-bootstrap";
import Logo from "./../../../assets/HeavyLocalLogo.jpg";
const UserNav =() =>{
    return(
        <>
                <Navbar  expand="lg" className="bg-dark navbar">
      <Container className='navbar'>
        <Navbar.Brand className='navbar-brand brand  text-white' href="#home"><img src={Logo} className='img-fluid rounded-circle' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-white link'>Home</Nav.Link>
            <Nav.Link href="/articles-page" className='text-white link'>Saved Articles</Nav.Link>
            <Nav.Link href="/Art-Gallery-page" className='text-white link'>Art Gallery</Nav.Link>
            <a href="/SignUp" className='btn btn-outline-danger text-white link'>Log Out</a>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        </>
    )
}

export default UserNav