import {
    getIdTokenResult,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {auth} from '../../../firebase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import useNavigate from "../../LanguageWrapper/Navigation";

const Login = (props) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailVerification, setEmailVerification] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);
    const [showPassword, setShowPassword] = useState(false);

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
            setError(t('verifyEmail'));
        } else {
            if (props.admin && user.email === "tzimasvaggelis02@gmail.com") {
                navigate("/upload/admin")
            }

            // User is signed in and email is verified
            const idTokenResult = await user.getIdTokenResult(true);

            // Check if user has admin claims
            if (!idTokenResult.claims || !idTokenResult.claims.admin) {
                console.log("User is not an admin");
                navigate('/User/home');
            } else {
                console.log("User is an admin");
                navigate('/upload');
                // Navigate to admin-only page or perform admin-specific actions
            }
        }
    }

    const handleError = async (error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            setError(t("This email has logged in with a different provider"));
        } else {
            console.error(error);
            setError(error.message);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await handleUserLoggedIn(user);
        } catch (error) {
            await handleError(error);
        }
    };

    const sendVerification = async () => {
        try {
            await sendEmailVerification(user);
            setError(t("verifyEmail"));
            setEmailVerification(false);
        } catch (error) {
            setError(error.message);
        }
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            await handleUserLoggedIn(user.user);
        } catch (error) {
            await handleError(error);
        }
    };

    const signInWithGithub = async () => {
        try {
            const provider = new GithubAuthProvider();
            const user = await signInWithPopup(auth, provider);
            await handleUserLoggedIn(user.user);
            console.log("Hello")
        } catch (error) {
            await handleError(error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2 className="text-center mb-4 text-white">{t('login')}</h2>
                    {error &&
                        <Alert variant="danger" className={"d-flex justify-content-center"}>{error}{emailVerification &&
                            <Button onClick={sendVerification} className={"m-1 btn btn-sm btn-warning"}>{t('sendEmailVerification')}</Button>}</Alert>}
                    <Form className={"card bg-dark w-100 text-white p-4"} onSubmit={handleLogin}>
                        <Form.Group controlId="email">
                            <Form.Label>{t('email')}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t('enterEmail')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>{t('password')}</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t('enterPassword')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group className={"mt-4"}>
                            <Button variant={"danger"} onClick={signInWithGoogle}>
                                {t('loginWithGoogle')}
                            </Button>

                            <Button variant={"secondary"} className={"bg-dark"} onClick={signInWithGithub}>
                                {t('loginWithGithub')}
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="link" onClick={async () => {
                                try {
                                    await sendPasswordResetEmail(auth, email);
                                    setError(t('sendPasswordReset'));
                                    setEmailVerification(false)
                                } catch (error) {
                                    if (error.code === "auth/missing-email") {
                                        setError(t('enterEmail'));
                                    } else {
                                        setError(error.message);
                                    }
                                }
                                return false;
                            }}>{t('forgotPassword')}</Button>
                        </Form.Group>

                        <Button variant={"secondary"} type={"button"} onClick={() => {
                            navigate("/upload/register")
                        }}>{t('register')}</Button>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            {t('login')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
