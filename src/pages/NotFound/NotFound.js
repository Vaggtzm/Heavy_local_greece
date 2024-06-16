// NotFound.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
                <Col className="text-center">
                    <h1 className="display-1">404</h1>
                    <h2>Oops! Page not found.</h2>
                    <p className="lead">The page you are looking for doesn't exist or another error occurred.</p>
                    <Button variant="primary" as={Link} to="/">Go Back Home</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;