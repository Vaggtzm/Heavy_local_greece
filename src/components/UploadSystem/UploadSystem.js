import {ref, uploadBytes, uploadString} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Row} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';
import {auth, config, storage} from '../../firebase';
import {getIdTokenResult, signOut} from 'firebase/auth';
import {fetchAndActivate, getValue} from 'firebase/remote-config';
import ImageUpload from './components/fancyImage/ImageUpload';
import CategoryDropdown from './components/CategoryDropdown/CategoryDropdown';
import ImageUploader from 'quill-image-uploader';
import {useTranslation} from 'react-i18next';
import useNavigate from "../LanguageWrapper/Navigation";
import {getImageDimensions} from "./articleData/articleData";

const ArticleUpload = () => {
    const { t, i18n } = useTranslation();
    const [articleContent, setArticleContent] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [language, setLanguage] = useState('');
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [category, setCategory] = useState('');

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
                const serverLanguages = getValue(config, "languages").asString();
                setAvailableLanguages(JSON.parse(serverLanguages));
            });
        } catch (err) {
            console.log(err);
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getIdTokenResult(user).then((idTokenResult) => {
                    if (idTokenResult.claims && idTokenResult.claims.admin) {
                        console.log("the user is an admin");
                    } else {
                        signOut(auth).then(() => {
                            console.log("Trying to login again");
                            navigate('/upload/login');
                        });
                    }
                });

                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                navigate('/upload/login');
            }
        });

        return () => unsubscribe();
    }, []);

    function replaceSpecialCharsWithDashes(text) {
        const regex = /[.$#[\]/\u0000-\u001F\u007F-\uFFFF]/g;
        return text.replace(regex, '');
    }



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
                socials: socials,
                img01: `https://pulse-of-the-underground.com/assets/${image.name}`,
                sub: currentUser.uid,
                date: new Date().toLocaleDateString('en-GB', options),
                lang: 'en', // Store language as English
                translations: {},
                category: category
            };

            articleData.translations['en'] = newFileName;

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
                <h2 className="h2 text-white">{t('authorUploadSystem')}</h2>
                <hr className="bg-dark" />
                <Form className="card w-100 bg-dark p-5" onSubmit={handleArticleSubmit}>
                    <Form.Group controlId="articleContent">
                        <Form.Label className="text-light">{t('pasteArticleContent')}</Form.Label>
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
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
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
                                <Form.Label className="text-light">{t('title')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    className={"bg-dark text-light"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="details">
                                <Form.Label className="text-light">{t('details')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    className={"bg-dark text-light"}
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="socials">
                        <Form.Label className="text-light">{t('socialMediaLinks')}</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('facebook')}
                                    className={"bg-dark text-light"}
                                    value={socials.facebook}
                                    onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('instagram')}
                                    className={"bg-dark text-light"}
                                    value={socials.instagram}
                                    onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('spotify')}
                                    className={"bg-dark text-light"}
                                    value={socials.spotify}
                                    onChange={(e) => setSocials({ ...socials, spotify: e.target.value })}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('youtube')}
                                    className={"bg-dark text-light"}
                                    value={socials.youtube}
                                    onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="originalLanguage">
                        <Row className="d-flex align-items-center">
                            <Col>
                                <Form.Label className="text-light">{t('language')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={language}
                                    className={"form-control bg-dark text-light"}
                                    onChange={(e) => {
                                        setLanguage(e.target.value);
                                        i18n.changeLanguage(e.target.value); // Change UI language
                                    }}
                                    required={true}
                                >
                                    <option value="">{t('selectLanguage')}</option>
                                    {Object.keys(availableLanguages).map((langCode) => {
                                        return (
                                            <option value={langCode} key={langCode}>
                                                {availableLanguages[langCode]}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Col>
                            <Col className="">
                                <CategoryDropdown
                                    categories={categories}
                                    onSelectCategory={setCategory}
                                    required={true}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <ImageUpload setImage={setImage} image={image} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {t('uploadArticle')}
                    </Button>

                    {submitSuccess && (
                        <Alert variant="success" className="mt-3">
                            {t('articleSubmittedSuccessfully')}
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
