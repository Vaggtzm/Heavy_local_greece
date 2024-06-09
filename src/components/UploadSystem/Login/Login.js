import {
    signInWithEmailAndPassword,
    sendEmailVerification,
    getIdTokenResult,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import {auth} from '../../../firebase';
import {useNavigate} from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

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
                    //User is signed in and email is verified
                    const idTokenResult = await getIdTokenResult(user);
                    if (idTokenResult.claims && idTokenResult.claims.admin) {
                        console.log("the user is an admin");
                        navigate('/upload');
                    } else {
                        console.log("the user is not an admin");
                        navigate('/User/home');
                    }
                }
            }
        });

        return () => unsubscribe(); // Clean up subscription
    }, [navigate]);

    const handleUserLoggedIn = async (user) => {
        setUser(user);

        if (!user.emailVerified) {
            setError('Please verify your email before logging in.');
        } else {

            if (props.admin && user.email === "tzimasvaggelis02@gmail.com") {
                navigate("/upload/admin")
            }


            // User is signed in and email is verified
            const idTokenResult = await user.getIdTokenResult(true);

            // Check if user has admin claims
            if (!idTokenResult.claims||!idTokenResult.claims.admin) {
                console.log("User is not an admin");
                navigate('/User/home');
            } else {
                console.log("User is an admin");
                navigate('/upload');
                // Navigate to admin-only page or perform admin-specific actions
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await handleUserLoggedIn(user);
        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };

    const sendVerification = async () => {
        try {
            await sendEmailVerification(user);
            setError("Email verification has been sent. Please check your inbox");
            setEmailVerification(false);
        } catch (error) {
            setError(error);

        }
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            await handleUserLoggedIn(user.user);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2 className="text-center mb-4 text-white">Login</h2>
                    {error &&
                        <Alert variant="danger" className={"d-flex justify-content-center"}>{error}{emailVerification &&
                            <Button onClick={sendVerification} className={"m-1 btn btn-sm btn-warning"}>Send Email
                                Verification</Button>}</Alert>}
                    <Form className={"card bg-dark w-100 text-white p-4"} onSubmit={handleLogin}>
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


                        <Form.Group className={"mt-4"}>
                            <Button variant={"danger"} onClick={signInWithGoogle}>
                                Log in with Google
                            </Button>


                        </Form.Group>
                        <Form.Group>
                            <Button variant="link" onClick={async () => {
                                try {
                                    await sendPasswordResetEmail(auth, email);
                                    setError("Password reset email has been sent to your email.");
                                    setEmailVerification(false)
                                } catch (error) {
                                    if (error.code === "auth/missing-email") {
                                        setError("Please enter your email first.");
                                    } else {
                                        setError(error.message);
                                    }
                                }
                                return false;
                            }}>Forgot Password?</Button>
                        </Form.Group>


                        <Button variant={"secondary"} type={"button"} onClick={() => {
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
