import {ref, uploadBytes, uploadString} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Row} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css'
import {useNavigate} from "react-router-dom";
import {auth, config, storage} from '../../firebase'; // Import Firebase auth
import {getIdTokenResult, signOut} from "firebase/auth";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import ImageUpload from "./components/fancyImage/ImageUpload";
import CategoryDropdown from "./components/CategoryDropdown/CategoryDropdown";
import ImageUploader from "quill-image-uploader";

const ArticleUpload = () => {
    const [articleContent, setArticleContent] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // State to hold current user
    const [language, setLanguage] = useState('');
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [category, setCategory] = useState(''); // State to hold selected category

    const categories = [
        "Top News",
        "General News",
        "Interviews",
        "Collabs and Sponsorships",
        "Latest Reviews(ENG)",
        "Latest Reviews(GRE)",
        "Legends"
    ];

    const [socials, setSocials] = useState({
        facebook: '',
        instagram: '',
        spotify: '',
        youtube: ''
    });

    const navigate = useNavigate();

    useEffect(() => {

        try {
            fetchAndActivate(config).then(() => {
                const serverLanguages = getValue(config, "languages").asString()
                setAvailableLanguages(JSON.parse(serverLanguages))
            });
        } catch (err) {
            console.log(err);
        }

        // Set up Firebase authentication listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                getIdTokenResult(user).then((idTokenResult) => {
                    if (idTokenResult.claims && idTokenResult.claims.admin) {
                        console.log("the user is an admin");
                    } else {
                        signOut(auth).then(() => {
                            console.log("Trying to login again")
                            navigate('/upload/login');
                        });
                    }
                })

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

    function replaceSpecialCharsWithDashes(text) {
        // Regular expression to match any character that Firebase Realtime Database does not support in keys
        const regex = /[.$#[\]/\u0000-\u001F\u007F-\uFFFF]/g;
        // Replace matched characters with dashes
        return text.replace(regex, '');
    }

    const getImageDimensions = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({width: img.width, height: img.height});
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    };

    const handleArticleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageRef = ref(storage, `images/${image.name}`);
            const dimensions = await getImageDimensions(image);
            const metadata = {
                customMetadata: dimensions
            };
            await uploadBytes(imageRef, image, metadata);

            console.log(metadata);
            const newFileName = `${replaceSpecialCharsWithDashes(title.replaceAll(" ", "-"))}.json`;

            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            const articleData = {
                content: articleContent.replaceAll("<p>", "<p class='lead'>").replaceAll("<img", "<img class='img-fluid'"),
                title,
                details,
                Socials: formatSocialsAsString(),
                img01: `https://pulse-of-the-underground.com/assets/${image.name}`,
                sub: currentUser.uid,
                date: new Date().toLocaleDateString('en-GB', options),
                lang: language,
                translations: {},
                category: category
            };

            articleData.translations[language] = newFileName;

            const articleDataRef = ref(storage, `upload_from_authors/${newFileName}`);
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
            setCategory("");
        } catch (error) {
            console.error('Error submitting article:', error.message);
            setSubmitError('Error submitting article. Please try again.\n' + error.message);
            setSubmitSuccess(false);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <h2 className={"h2 text-white"}>Author Upload System</h2>
                <hr className="bg-dark"/>
                <Form className={"card bg-dark"} style={{width: "150vh"}} onSubmit={handleArticleSubmit}>
                    <Form.Group controlId="articleContent">
                        <Form.Label className={"text-light"}>Paste Article Content from the document that you have
                            written</Form.Label>
                        <ReactQuill
                            theme="snow"
                            className="text-light"
                            value={articleContent}
                            onChange={(value) => {
                                const sanitizedValue = value.replace(/<[^>]*style="[^"]*color:\s*[^";]*;?[^"]*"[^>]*>/g, '');
                                setArticleContent(sanitizedValue);
                            }}
                            modules={{
                                toolbar: {
                                    container: [
                                        [{'header': '1'}, {'header': '2'}, {'font': []}],
                                        [{size: []}],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{'list': 'ordered'}, {'list': 'bullet'},
                                            {'indent': '-1'}, {'indent': '+1'}],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                    handlers: {
                                        'image': ImageUploader.handler
                                    }
                                }
                            }}
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label className={"text-light"}>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="details">
                                <Form.Label className={"text-light"}>Details <span className={"small"}>(Some details about the band to appear under the main picture on the right.)</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="socials">
                        <Form.Label className={"text-light"}>Social Media Links <span className={"small"}>(enter only those available)</span></Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Facebook"
                                    value={socials.facebook}
                                    onChange={(e) => setSocials({...socials, facebook: e.target.value})}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Instagram"
                                    value={socials.instagram}
                                    onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Spotify"
                                    value={socials.spotify}
                                    onChange={(e) => setSocials({...socials, spotify: e.target.value})}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="YouTube"
                                    value={socials.youtube}
                                    onChange={(e) => setSocials({...socials, youtube: e.target.value})}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="originalLanguage">
                        <Row className={"d-flex align-items-center"}>
                            <Col>
                                <Form.Label>Original Language</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    required={true}
                                >
                                    <option value="">Select Language</option>
                                    {/* Placeholder option */}
                                    {Object.keys(availableLanguages).map((langCode) => {
                                        return (<option value={langCode}>{availableLanguages[langCode]}</option>)
                                    })}
                                </Form.Control>
                            </Col>
                            <Col className="">
                                <CategoryDropdown
                                    categories={categories}
                                    onSelectCategory={setCategory}
                                    required ={true}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <ImageUpload setImage={setImage} image={image}/>
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
        </div>
    );
};

export default ArticleUpload;
