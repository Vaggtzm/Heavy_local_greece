import {signInWithEmailAndPassword, sendEmailVerification, getIdTokenResult, sendPasswordResetEmail, signOut} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailVerification, setEmailVerification] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Check if email is verified
                if (!user.emailVerified) {
                    await signOut(auth);
                } else {
                    // User is signed in and email is verified
                    const idTokenResult = getIdTokenResult(user);
                    if (idTokenResult.claims && idTokenResult.claims.admin) {
                        console.log("the user is an admin");
                        navigate('/upload');
                    }
                }
            }
        });

        return () => unsubscribe(); // Clean up subscription
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);

            if (!user.emailVerified) {
                setError('Please verify your email before logging in.');
            } else {

                /**
                 * Admin system for Vaggelis
                 */

                if(props.admin&&user.email==="tzimasvaggelis02@gmail.com"){
                    navigate("/upload/admin")
                }


                // User is signed in and email is verified
                const idTokenResult = await user.getIdTokenResult(true);

                // Log the entire ID token result for debugging
                console.log('ID Token Result:', idTokenResult);

                // Check if user has admin claims
                if (!!idTokenResult.claims.admin) {
                    console.log("User is an admin");
                    navigate('/upload');
                    // Navigate to admin-only page or perform admin-specific actions
                } else {
                    console.log("User is not an admin");
                    setError('You do not have permission to access this page');
                }
            }
        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };

    const sendVerification= async () => {
        try {
            await sendEmailVerification(user);
            setError("Email verification has been sent. Please check your inbox");
            setEmailVerification(false);
        }catch(error){
            setError(error);

        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger" className={"d-flex justify-content-center"}>{error}{emailVerification && <Button onClick={sendVerification} className={"m-1 btn btn-sm btn-warning"}>Send Email Verification</Button>}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="link" onClick={async ()=>{
                                try {
                                    await sendPasswordResetEmail(auth, email);
                                    setError("Password reset email has been sent to your email.");
                                    setEmailVerification(false)
                                }catch(error){
                                    if(error.code==="auth/missing-email"){
                                        setError("Please enter your email first.");
                                    }else{
                                        setError(error.message);
                                    }
                                }
                                return false;
                            }}>Forgot Password?</Button>
                        </Form.Group>


                            <Button variant={"secondary"} type={"button"} onClick={()=>{
                                navigate("/upload/register")
                            }}>Register</Button>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
