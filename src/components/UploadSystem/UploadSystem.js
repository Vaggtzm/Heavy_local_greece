import { ref, uploadBytes, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { auth, storage } from '../../firebase'; // Import Firebase auth
import Navigation from '../AppNav/Navigation';

const ArticleUpload = () => {
    const [articleContent, setArticleContent] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // State to hold current user

    const [socials, setSocials] = useState({
        facebook: '',
        instagram: '',
        spotify: '',
        youtube: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Set up Firebase authentication listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                setCurrentUser(user);
            } else {
                // No user is signed in
                setCurrentUser(null);
                navigate('/upload/login');
            }
        });

        return () => unsubscribe(); // Cleanup the listener on component unmount
    }, []);

    const formatSocialsAsString = () => {
        const socialLinks = [];
        if (socials.facebook) {
            socialLinks.push(`<a href='${socials.facebook}'><i class='bi bi-facebook'></i></a>`);
        }
        if (socials.instagram) {
            socialLinks.push(`<a href='${socials.instagram}'><i class='bi bi-instagram'></i></a>`);
        }
        if (socials.spotify) {
            socialLinks.push(`<a href='${socials.spotify}'><i class='bi bi-spotify'></i></a>`);
        }
        if (socials.youtube) {
            socialLinks.push(`<a href='${socials.youtube}'><i class='bi bi-youtube'></i></a>`);
        }
        return `<p class='lead'>${socialLinks.join(' ')}</p>`;
    };

    const handleArticleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);

            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            const articleData = {
                content: articleContent.replaceAll("<p>", "<p class='lead'>"),
                title,
                details,
                Socials: formatSocialsAsString(),
                img01: `https://heavy-local.com/assets/${image.name}`,
                sub: "From "+currentUser.displayName,
                date: new Date().toLocaleDateString('en-GB', options)
            };

            const articleDataRef = ref(storage, `upload_from_authors/${title.replaceAll(" ","-")}.json`);
            await uploadString(articleDataRef, JSON.stringify(articleData));

            setArticleContent('');
            setTitle('');
            setDetails('');
            setSocials({
                facebook: '',
                instagram: '',
                spotify: '',
                youtube: ''
            });
            setImage(null);

            setSubmitSuccess(true);
            setSubmitError(null);
        } catch (error) {
            console.error('Error submitting article:', error.message);
            setSubmitError('Error submitting article. Please try again.');
            setSubmitSuccess(false);
        }
    };

    return (
        <>
            <Navigation />
            <div className="container mt-4">
                <h3>Author Upload System</h3>
                <hr className="bg-dark" />
                <Form onSubmit={handleArticleSubmit}>
                    <Form.Group controlId="articleContent">
                        <Form.Label>Paste Article Content (use class 'lead' for paragraphs)</Form.Label>
                        <ReactQuill
                            theme="snow"
                            value={articleContent}
                            onChange={(value) => {
                                const sanitizedValue = value.replace(/<[^>]*style="[^"]*color:\s*[^";]*;?[^"]*"[^>]*>/g, '');
                                    setArticleContent(sanitizedValue)
                                }
                            }
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="details">
                                <Form.Label>Details <span className={"small"}>(Some details about the band to appear under the main picture on the right.)</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="socials">
                        <Form.Label>Social Media Links <span className={"small"}>(enter only those available)</span></Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Facebook"
                                    value={socials.facebook}
                                    onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Instagram"
                                    value={socials.instagram}
                                    onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Spotify"
                                    value={socials.spotify}
                                    onChange={(e) => setSocials({ ...socials, spotify: e.target.value })}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="YouTube"
                                    value={socials.youtube}
                                    onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Upload Article
                    </Button>

                    {/* Display success or error alert */}
                    {submitSuccess && (
                        <Alert variant="success" className="mt-3">
                            Article submitted successfully!
                        </Alert>
                    )}
                    {submitError && (
                        <Alert variant="danger" className="mt-3">
                            {submitError}
                        </Alert>
                    )}
                </Form>
            </div>
        </>
    );
};

export default ArticleUpload;
