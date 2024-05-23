import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    listAll,
    ref,
    uploadString,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Form,
    ListGroup,
    Modal,
} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { auth, config, storage } from '../../../firebase';
import Navigation from '../../AppNav/Navigation';
import { signOut } from 'firebase/auth';
import { fetchAndActivate, getValue } from "firebase/remote-config";
import UserNav from "../../Users/UserNav";

const TranslationSystem = () => {
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);
    const [isEarlyReleasedArticles, setIsEarlyReleasedArticles] = useState([]);
    const [isAlreadyPublished, setIsAlreadyPublished] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [fileData, setFileData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        translations: {},
        lang: '',
    });
    const [translationData, setTranslationData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        translations: {},
    });
    const [newLanguage, setNewLanguage] = useState('en');
    const [originalLanguage, setOriginalLanguage] = useState('');

    const fetchArticlesCategory = async (folder) => {
        try {
            let publishedListRef = ref(storage, folder);
            let { items: publishedItems } = await listAll(publishedListRef);

            return await Promise.all(
                publishedItems.map(async (item) => {
                    try {
                        const downloadUrl = await getDownloadURL(item);
                        const metadata = await getMetadata(item);
                        let fileContent = await fetch(downloadUrl);

                        try {
                            fileContent = await fileContent.json();
                        } catch (e) {
                            console.error(e);
                        }

                        return { name: item.name, downloadUrl, metadata, fileContent };
                    } catch (error) {
                        console.error(error);
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFiles = async () => {
        try {
            const publishedFilesData = await fetchArticlesCategory('upload_from_authors');
            setFiles(publishedFilesData);

            const publishedFilesData2 = await fetchArticlesCategory('articles');
            setAlreadyPublishedArticles(publishedFilesData2);

            const publishedFilesData3 = await fetchArticlesCategory('early_releases');
            setEarlyReleasedArticles(publishedFilesData3);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                await fetchAndActivate(config);
            } catch (err) {
                console.log(err);
            }

            const userList = JSON.parse(getValue(config, "translationSystem").asString());
            console.log(userList);
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user && userList.includes(user.email)) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                    navigate('/upload');
                    signOut(auth).then();
                }
            });

            await fetchFiles();

            return () => unsubscribe();
        };

        initialize();
    }, [navigate]);

    const handleSave = async () => {
        let originalFolder, translationFolder;
        if (isAlreadyPublished) {
            originalFolder = `articles`;
        } else if (isEarlyReleasedArticles) {
            originalFolder = `early_releases`;
        } else {
            originalFolder = `upload_from_authors`;
        }

        translationFolder = `upload_from_authors`;

        if (!selectedFile || !fileData) return;

        let newFileName = selectedFile.name;
        let fileRef;
        let translationFileRef;

        if (!fileData.translations) {
            fileData.translations = {};
        }

        if (isTranslating) {
            // Ensure the new translation file name is based on the translation data title
            newFileName = `${translationData.title.replace(/\s+/g, '_')}-${newLanguage}.json`;

            fileRef = ref(storage, `${translationFolder}/${newFileName}`);
            translationFileRef = ref(storage, `${originalFolder}/${selectedFile.name}`);



            fileData.translations[newLanguage] = newFileName;
            fileData.translations[originalLanguage] = selectedFile.name;
            fileData.lang = originalLanguage;

            translationData.translations = fileData.translations;

            translationData.lang = newLanguage;

            // Add the original file name to the translations object in the new translation data
            translationData.translations[originalLanguage] = selectedFile.name;

            // Upload the new translation file
            await uploadString(fileRef, JSON.stringify(translationData));

            // Update related files without fetching them by using existing references
            const relatedTranslations = { ...fileData.translations, [newLanguage]: newFileName };

            await Promise.all(
                Object.keys(relatedTranslations).map(async (lang) => {
                    const relatedFileName = relatedTranslations[lang];
                    if (relatedFileName === newFileName) return;
                    const relatedFileRef = ref(storage, `${originalFolder}/${relatedFileName}`);

                    // Fetch existing content to update it
                    try {
                        const downloadUrl = await getDownloadURL(relatedFileRef);
                        const fileContent = await fetch(downloadUrl).then((res) => res.json());
                        fileContent.translations[newLanguage] = newFileName;
                        await uploadString(relatedFileRef, JSON.stringify(fileContent));
                    } catch (e) {
                        console.error(`Failed to update related file ${relatedFileName}: `, e);
                    }
                })
            );
        } else {
            fileRef = ref(storage, `${originalFolder}/${selectedFile.name}`);
        }

        const contentToSave = isTranslating ? translationData : fileData;
        contentToSave.content = contentToSave.content.replaceAll('<p>', "<p class='lead'>");

        // Upload the original file content
        await uploadString(fileRef, JSON.stringify(contentToSave));

        if (!isTranslating) {
            await uploadString(ref(storage, `${originalFolder}/${selectedFile.name}`), JSON.stringify(fileData));
        }

        if (isTranslating) {
            await uploadString(translationFileRef, JSON.stringify(fileData));
        }

        const updatedFiles = files.map((file) =>
            file.name === selectedFile.name ? { ...file, fileContent: fileData } : file
        );
        setFiles(updatedFiles);

        setShowModal(false);
        fetchFiles();

        setTranslationData({
            content: '',
            title: '',
            details: '',
            Socials: '',
            img01: '',
            sub: '',
            date: '',
            translations: {},
        });
    };


    const handleTranslate = (file, isAlreadyPub, isEarlyReleased) => {
        setSelectedFile(file);
        setFileData({
            ...file.fileContent,
        });
        setIsAlreadyPublished(isAlreadyPub);
        setIsEarlyReleasedArticles(isEarlyReleased);
        setShowModal(true);

        setSelectedFile(file);
        setTranslationData({
            ...file.fileContent,
        });
        setIsTranslating(true);
        setOriginalLanguage(file.fileContent.lang);
    };

    const handleTranslationChange = (e, field) => {
        const { value } = e.target;
        setTranslationData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <>
            <UserNav />
            <div className="container mt-4">
                <h2 className={"text-white"}>Translation System</h2>
                <hr className="bg-white" />
                <h3 className={"text-white"}>Uploaded Files</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <ListGroup>
                    {files.map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-light"}>
                            {file.name}

                            {
                                (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                    Object.keys(file.fileContent.translations).map((lang) => {
                                        return (<p key={lang} className="form-label badge bg-dark-subtle text-dark m-1">{lang}</p>);
                                    })
                                ) : (
                                    <p>No translations available</p>
                                )
                            }
                            <Button variant="warning" onClick={() => handleTranslate(file, false, false)}>
                                Translate
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <h3 className={"text-white"}>Early Releases</h3>
                {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                <ListGroup>
                    {earlyReleasedArticles.map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-light"}>
                            {file.name}
                            {
                                (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                    Object.keys(file.fileContent.translations).map((lang) => {
                                        return (<p key={lang} className="form-label badge bg-dark-subtle text-dark m-1">{lang}</p>);
                                    })
                                ) : (
                                    <p>No translations available</p>
                                )
                            }
                            <Button variant="warning" onClick={() => handleTranslate(file, false, true)}>
                                Translate
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <h3 className={"text-white"}>Already Published</h3>
                {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                <ListGroup>
                    {alreadyPublishedArticles.map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-light"}>
                            {file.name}
                            {
                                (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                    Object.keys(file.fileContent.translations).map((lang) => {
                                        return (<p key={lang} className="form-label badge bg-dark-subtle text-dark m-1">{lang}</p>);
                                    })
                                ) : (
                                    <p>No translations available</p>
                                )
                            }
                            <Button variant="warning" onClick={() => handleTranslate(file, true, false)}>
                                Translate
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Modal
                    width={'300vh'}
                    className={'d-flex justify-content-center'}
                    show={showModal}
                    onHide={() => {
                        setShowModal(false);
                        setTranslationData({
                            content: '',
                            title: '',
                            details: '',
                            Socials: '',
                            img01: '',
                            sub: '',
                            date: '',
                            translations: {},
                            lang: '',
                        });

                        setFileData({
                            content: '',
                            title: '',
                            details: '',
                            Socials: '',
                            img01: '',
                            sub: '',
                            date: '',
                            translations: {},
                            lang: '',
                        });
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isTranslating ? 'Translate File' : 'Edit File Data'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'d-flex justify-content-center'}>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Original</h5>
                                    <Form.Group controlId="originalContent">
                                        <Form.Label>Content</Form.Label>
                                        <ReactQuill key={`original-${selectedFile?.name}`} theme="snow" value={fileData.content} readOnly={true} />
                                    </Form.Group>
                                    <Form.Group controlId="originalTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={fileData.title} readOnly={true} />
                                    </Form.Group>
                                    <Form.Group controlId="originalDetails">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control type="text" value={fileData.details} readOnly={true} />
                                    </Form.Group>
                                    <Form.Group controlId="originalImg01">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control type="text" value={fileData.img01} readOnly={true} />
                                    </Form.Group>
                                    <Form.Group controlId="originalSub">
                                        <Form.Label>Subtitle</Form.Label>
                                        <Form.Control type="text" value={fileData.sub} readOnly={true} />
                                    </Form.Group>
                                    <Form.Group controlId="originalDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="text" value={fileData.date} readOnly={true} />
                                    </Form.Group>
                                    <Form.Group controlId="originalLanguage">
                                        <Form.Label>Original Language</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={originalLanguage}
                                            onChange={(e) => setOriginalLanguage(e.target.value)}
                                            disabled={!!fileData.lang}
                                        >
                                            <option value="">Select Language</option> {/* Placeholder option */}
                                            <option value="en">English</option>
                                            <option value="el">Greek</option>
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            Enter the original language code (e.g., 'en' for English, 'gr' for Greek).
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <h5>Translation</h5>
                                    <Form.Group controlId="translatedContent">
                                        <Form.Label>Content</Form.Label>
                                        <ReactQuill
                                            key={`translation-${selectedFile?.name}`}
                                            theme="snow"
                                            value={translationData.content}
                                            onChange={(value) =>
                                                handleTranslationChange({ target: { value } }, 'content')
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.title}
                                            onChange={(e) => handleTranslationChange(e, 'title')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedDetails">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.details}
                                            onChange={(e) => handleTranslationChange(e, 'details')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedImg01">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.img01}
                                            onChange={(e) => handleTranslationChange(e, 'img01')}
                                            readOnly={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedSub">
                                        <Form.Label>Subtitle</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.sub}
                                            onChange={(e) => handleTranslationChange(e, 'sub')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.date}
                                            onChange={(e) => handleTranslationChange(e, 'date')}
                                        />
                                    </Form.Group>
                                    {isTranslating && (
                                        <>
                                            <Form.Group controlId="translatedLanguage">
                                                <Form.Label>Language</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={newLanguage}
                                                    onChange={(e) => setNewLanguage(e.target.value)}
                                                >
                                                    <option value="">Select Language</option> {/* Placeholder option */}
                                                    <option value="en">English</option>
                                                    <option value="el">Greek</option>
                                                </Form.Control>
                                                <Form.Text className="text-muted">
                                                    Enter the language code (e.g., 'en' for English, 'el' for Greek).
                                                </Form.Text>
                                            </Form.Group>
                                        </>

                                    )}
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default TranslationSystem;
