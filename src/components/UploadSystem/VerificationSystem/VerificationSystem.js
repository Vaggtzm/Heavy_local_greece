import {deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadString} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, ListGroup, Modal} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';
import {auth, storage} from '../../../firebase';
import Navigation from '../../AppNav/Navigation';
import {signOut} from "firebase/auth";

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
        translations: {}
    });

    const [translationData, setTranslationData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        translations: {}
    });

    const fetchArticlesCategory=async (folder) => {
        try {
            let publishedListRef = ref(storage, folder);
            let {items: publishedItems} = await listAll(publishedListRef);

            return await Promise.all(
                publishedItems.map(async (item) => {
                    const downloadUrl = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    let fileContent = await fetch(downloadUrl);

                    try {
                        fileContent = await fileContent.json();
                    } catch (e) {
                        if(isEarlyReleasedArticles){
                            setEarlyReleasesError('Error fetching files: file: '+item.name+" : "+error);
                        } else if(isAlreadyPublished){
                            setAlreadyPublishedError('Error fetching files: file: '+item.name+" : "+error);
                        }else {
                            setError('Error fetching files: ' + error.message);
                        }
                        console.log(e);
                        console.log(item);
                    }

                    return {name: item.name, downloadUrl, metadata, fileContent};
                })
            ); // Ensure filesData is always an array
        } catch (error) {
            if(isEarlyReleasedArticles){
                setEarlyReleasesError('Error fetching files: file: '+error);
            } else if(isAlreadyPublished){
                setAlreadyPublishedError('Error fetching files: file: '+error);
                
            }else {
                setError('Error fetching files: file: '+error);
            }
            console.log(error);
        }
    }

    const fetchFiles = async () => {
        try {


            fetchArticlesCategory('upload_from_authors').then((publishedFilesData) => {
                setFiles(publishedFilesData);
            });

            fetchArticlesCategory('articles').then((publishedFilesData) => {
                setAlreadyPublishedArticles(publishedFilesData);
            });

            fetchArticlesCategory('early_releases').then((publishedFilesData) => {
                setEarlyReleasedArticles(publishedFilesData);
            });

        }catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        const userList=['pavlos@orfanidis.net.gr','heavylocalgreece@gmail.com', 'tzimasvaggelis02@gmail.com'];
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && userList.includes(user.email)){
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                navigate('/upload/admin/login');
                signOut(auth).then();
            }
        });

        fetchFiles();

        return () => unsubscribe();
    }, [navigate]);

    const handleEdit = (file, isAlreadyPub, isEarlyReleased) => {
        setSelectedFile(file);
        setFileData({
            ...file.fileContent,
        });
        setIsAlreadyPublished(isAlreadyPub);
        setIsEarlyReleasedArticles(isEarlyReleased);
        setShowModal(true);
    };


    const handleSave = async () => {
        if (!selectedFile || !fileData) return;
        try {
            let fileRef;
            let newFileName = selectedFile.name;
            let translationFileRef;
            let translationFileName;

            if (isTranslating) {
                // Check if the title has changed
                if (translationData.title) {
                    newFileName = `${translationData.title.replace(/\s+/g, '_')}.json`;
                } else {
                    newFileName = `${selectedFile.name.replace('.json', '')}-eng.json`;
                }
                fileRef = ref(storage, `articles/${newFileName}`);
                translationFileRef = ref(storage, `articles/${selectedFile.name}`);

                // Set translations for both files
                translationData.translations = { ...translationData.translations, eng: newFileName };
                fileData.translations = { ...fileData.translations, eng: newFileName };

            } else {
                if (isAlreadyPublished) {
                    fileRef = ref(storage, `articles/${selectedFile.name}`);
                } else if (isEarlyReleasedArticles) {
                    fileRef = ref(storage, `early_releases/${selectedFile.name}`);
                } else {
                    fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
                }
            }

            const contentToSave = isTranslating ? translationData : fileData;
            contentToSave.content = contentToSave.content.replaceAll('<p>', "<p class='lead'>");

            await uploadString(fileRef, JSON.stringify(contentToSave));

            // Save the translation file if translating
            if (isTranslating) {
                await uploadString(translationFileRef, JSON.stringify(fileData));
            }

            // Update local files state
            const updatedFiles = files.map((file) =>
                file.name === selectedFile.name ? { ...file, fileContent: fileData } : file
            );
            setFiles(updatedFiles);

            setShowModal(false);
            fetchFiles();
        } catch (error) {
            setError('Error saving file data: ' + error.message);
        }
    };


    const handleTranslate = (file) => {
        setSelectedFile(file);
        setTranslationData({
            ...file.fileContent,
        });
        setIsTranslating(true);
        setShowModal(true);
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
            <Navigation />
            <div className="container mt-4">
                <h3>Admin Publish System</h3>
                <hr className="bg-dark"/>
                <h3>Uploaded Files</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <ListGroup>
                    {files.map((file, index) => (
                        <ListGroup.Item key={index}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, false, false)}>
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>


                <h3>Early Releases</h3>
                {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                <ListGroup>
                    {earlyReleasedArticles.map((file, index) => (
                        <ListGroup.Item key={index}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, false, true)}>
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <h3>Already Published</h3>
                {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                <ListGroup>
                    {alreadyPublishedArticles.map((file, index) => (
                        <ListGroup.Item key={index}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, true, false)}>
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Modal for editing file data */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isTranslating ? "Translate File" : "Edit File Data"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Original Content */}
                            <Form.Group controlId="originalContent">
                                <Form.Label>Original Content</Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    value={fileData.content}
                                    readOnly={true}
                                />
                            </Form.Group>

                            {/* Translated Content */}
                            <Form.Group controlId="translatedContent">
                                <Form.Label>Translated Content</Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    value={translationData.content}
                                    onChange={(value) => handleTranslationChange({ target: { value } }, 'content')}
                                />
                            </Form.Group>

                            {/* Other fields like title, details, etc. */}
                            {/* Repeat for both original and translated fields */}

                            {/* Translations Field */}
                            <Form.Group controlId="translations">
                                <Form.Label>Translations</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={JSON.stringify(fileData.translations)}
                                    readOnly={true}
                                />
                            </Form.Group>
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
