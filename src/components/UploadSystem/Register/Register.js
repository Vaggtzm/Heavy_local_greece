import React, {useState} from 'react';
import {Alert, Button, Col, Form, Row} from 'react-bootstrap';
import {auth} from '../../../firebase';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import {useTranslation} from 'react-i18next';
import useNavigate from "../../LanguageWrapper/Navigation";

const Register = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            await sendEmailVerification(user);
            setSuccess(t('successMessage'));
        } catch (error) {
            setError(error.message);
        }
    };

    const registerWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            setSuccess(t('googleSuccessMessage'));
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2 className="text-center mb-4 text-white">{t('register')}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form className={"card bg-dark w-100 text-white p-4"} onSubmit={handleRegister}>
                        <Form.Group controlId="name">
                            <Form.Label>{t('name')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('name')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>{t('email')}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t('email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t('password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group className={"row mt-4"} controlId="buttons">
                            <Button className={"col-4"} variant="danger" type="button" onClick={registerWithGoogle}>
                                {t('registerWithGoogle')}
                            </Button>

                            <Button className={"col-3"} style={{ marginRight: "3vh", marginLeft: "3vh" }} variant="secondary" type="button" onClick={() => {
                                navigate("/upload/login")
                            }}>
                                {t('login')}
                            </Button>

                            <Button className={"col-3"} variant="primary" type="submit">
                                {t('register')}
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
