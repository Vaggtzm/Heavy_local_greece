import { deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { auth, config, storage } from '../../../firebase';
import Navigation from '../../AppNav/Navigation';
import { signOut } from "firebase/auth";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import UserNav from "../../Users/UserNav";

const FirebaseFileList = () => {
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);

    const [isEarlyReleasedArticles, setIsEarlyReleasedArticles] = useState(false);
    const [isAlreadyPublished, setIsAlreadyPublished] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [fileData, setFileData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        translations: {},
    });
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');

    const fetchArticlesCategory = async (folder) => {
        try {
            let publishedListRef = ref(storage, folder);
            let { items: publishedItems } = await listAll(publishedListRef);

            return await Promise.all(
                publishedItems.map(async (item) => {
                    const downloadUrl = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    let fileContent = await fetch(downloadUrl);

                    try {
                        fileContent = await fileContent.json();
                    } catch (e) {
                        if (isEarlyReleasedArticles) {
                            setEarlyReleasesError('Error fetching files: file: ' + item.name + " : " + error);
                        } else if (isAlreadyPublished) {
                            setAlreadyPublishedError('Error fetching files: file: ' + item.name + " : " + error);
                        } else {
                            setError('Error fetching files: ' + error.message);
                        }
                        console.log(e);
                        console.log(item);
                    }

                    return { name: item.name, downloadUrl, metadata, fileContent };
                })
            );
        } catch (error) {
            if (isEarlyReleasedArticles) {
                setEarlyReleasesError('Error fetching files: file: ' + error);
            } else if (isAlreadyPublished) {
                setAlreadyPublishedError('Error fetching files: file: ' + error);

            } else {
                setError('Error fetching files: file: ' + error);
            }
            console.log(error);
        }
    };

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

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const initializeConfigAndAuth = async () => {
            try {
                await fetchAndActivate(config);
            } catch (err) {
                console.log(err);
            }

            const userList = JSON.parse(getValue(config, "admin").asString());
            console.log(userList);
            auth.onAuthStateChanged((user) => {
                if (user && userList.includes(user.email)) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                    navigate('/uploads');
                    signOut(auth).then();
                }
            });

            fetchFiles();
        };

        initializeConfigAndAuth();
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
            if (isAlreadyPublished) {
                fileRef = ref(storage, `articles/${selectedFile.name}`);
            } else if (isEarlyReleasedArticles) {
                fileRef = ref(storage, `early_releases/${selectedFile.name}`);
            } else {
                fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            }
            fileData.content = fileData.content.replaceAll('<p>', "<p class='lead'>");
            await uploadString(fileRef, JSON.stringify(fileData));

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

    const handleChange = (e, field, isObject) => {
        let { value } = e.target;
        if (isObject) {
            value = JSON.parse(value);
        }
        setFileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleContentChange = (value) => {
        const sanitizedValue = value.replace(/<[^>]*style="[^"]*color:\s*[^";]*;?[^"]*"[^>]*>/g, '');
        setFileData((prevData) => ({
            ...prevData,
            content: sanitizedValue,
        }));
    };

    const handleDelete = async (file, isAlreadyPub, isEarlyReleased) => {
        try {
            let fileRef;
            if (isAlreadyPub) {
                fileRef = ref(storage, `articles/${file.name}`);
            } else if (isEarlyReleased) {
                fileRef = ref(storage, `early_releases/${file.name}`);
            } else {
                fileRef = ref(storage, `upload_from_authors/${file.name}`);
            }

            await deleteObject(fileRef);
            fetchFiles();
        } catch (error) {
            setError('Error deleting file: ' + error.message);
        }
    };

    const handlePublish = async () => {
        if (!selectedFile) return;

        try {
            let originalFileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            let destinationFileRef = ref(storage, `early_releases/${selectedFile.name}`);

            if (isEarlyReleasedArticles) {
                originalFileRef = ref(storage, `early_releases/${selectedFile.name}`);
                destinationFileRef = ref(storage, `articles/${selectedFile.name}`);
            }

            const downloadUrl = await getDownloadURL(originalFileRef);
            const fileContent = await fetch(downloadUrl).then(res => res.text());

            await uploadString(destinationFileRef, fileContent);
            alert('File published successfully to the destination folder!');
            await deleteObject(originalFileRef);
            fetchFiles();

        } catch (error) {
            setError('Error publishing file: ' + error.message);
        }
    };

    return (
        <>
            <UserNav />
            <div className="container mt-4">
                <h2 className={"text-light"}>Admin Publish System</h2>
                <hr className="bg-dark" />
                <h3 className={"text-light"}>Uploaded Files</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <ListGroup>
                    {files.map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-white"}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, false, false)}>
                                Edit
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={() => handleDelete(file, false, false)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <h3 className={"text-light"}>Early Releases</h3>
                {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                <ListGroup>
                    {earlyReleasedArticles.map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-white"}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, false, true)}>
                                Edit
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={() => handleDelete(file, false, true)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <h3 className={"text-light"}>Already Published</h3>
                {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                <ListGroup>
                    {alreadyPublishedArticles.map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-white"}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, true, false)}>
                                Edit
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={() => handleDelete(file, true, false)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Modal show={showModal} onHide={() => setShowModal(false)} onExited={() => setFileData({})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit File Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="content">
                                <Form.Label>Content</Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    key={selectedFile ? selectedFile.name : ''}
                                    value={fileData.content}
                                    onChange={handleContentChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.title}
                                    onChange={(e) => handleChange(e, 'title', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="details">
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.details}
                                    onChange={(e) => handleChange(e, 'details', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="socials">
                                <Form.Label>Social Media Links</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.Socials}
                                    onChange={(e) => handleChange(e, 'Socials', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="img01">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.img01}
                                    onChange={(e) => handleChange(e, 'img01', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="sub">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.sub}
                                    onChange={(e) => handleChange(e, 'sub', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.date}
                                    onChange={(e) => handleChange(e, 'date', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="translations">
                                <Form.Label>Translations</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={JSON.stringify(fileData.translations)}
                                    onChange={(e) => handleChange(e, 'translations', true)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {(!isAlreadyPublished && !isEarlyReleasedArticles) && (
                            <Button variant="success" onClick={handlePublish} className="mt-3">
                                Publish
                            </Button>
                        )}
                        {(!isAlreadyPublished && isEarlyReleasedArticles) && (
                            <Button variant="success" onClick={handlePublish} className="mt-3">
                                Publish Normally
                            </Button>
                        )}
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

export default FirebaseFileList;
