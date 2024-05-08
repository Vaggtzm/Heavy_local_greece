import { deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../../../firebase';
import Navigation from '../../AppNav/Navigation';

const FirebaseFileList = () => {
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [isAlreadyPublished, setIsAlreadyPublished] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [fileData, setFileData] = useState({
        content: '',
        title: '',
        details: '',
        socials: '',
        img01: '',
        sub: '',
        date: ''
    });
    const [error, setError] = useState('');

    const fetchFiles = async () => {
        try {
            let listRef = ref(storage, 'upload_from_authors');
            let { items } = await listAll(listRef);

            let filesData = await Promise.all(
                items.map(async (item) => {
                    const downloadUrl = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    const fileContent = await fetch(downloadUrl).then((res) => res.json());

                    return { name: item.name, downloadUrl, metadata, fileContent };
                })
            );
            setFiles(filesData);



            listRef = ref(storage, 'articles');
            items = (await listAll(listRef)).items;

            filesData = await Promise.all(
                items.map(async (item) => {
                    const downloadUrl = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    const fileContent = await fetch(downloadUrl).then((res) => {
                        try {
                            return res.json()
                        }catch (error){
                            console.log(error);
                        }
                    });

                    return { name: item.name, downloadUrl, metadata, fileContent };
                })
            );
            setAlreadyPublishedArticles(filesData);
        }catch (error) {
            setError('Error fetching files: ' + error.message);
            console.log(error);
        }
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                navigate('/upload/admin/login');
            }
        });

        fetchFiles();

        return () => unsubscribe();
    }, [navigate]);

    const handleEdit = (file, isAlreadyPub) => {
        setSelectedFile(file);
        setFileData({
            ...file.fileContent,
        });
        setIsAlreadyPublished(isAlreadyPub);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!selectedFile || !fileData) return;

        try {
            let fileRef;
            if (isAlreadyPublished) {
                fileRef = ref(storage, `articles/${selectedFile.name}`);
            } else {
                fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            }
            fileData.content = fileData.content.replaceAll('<p>', "<p class='lead'>");
            await uploadString(fileRef, JSON.stringify(fileData));

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

    const handleChange = (e, field) => {
        const { value } = e.target;
        setFileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleContentChange = (value) => {
        if(isAlreadyPublished){
            setAlreadyPublishedArticles((prevData) => ({
                ...prevData,
                content: value,
            }))
        } else {
            setFileData((prevData) => ({
                ...prevData,
                content: value,
            }));
        }
    };

    const handlePublish = async () => {
        if (!selectedFile) return;

        try {
            const fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            const downloadUrl = await getDownloadURL(fileRef);

            const fileContent = await fetch(downloadUrl).then((res) => res.text());

            const earlyReleaseRef = ref(storage, `early_releases/${selectedFile.name}`);
            await uploadString(earlyReleaseRef, fileContent);

            await deleteObject(fileRef);

            alert('File published successfully to early_release folder!');
            fetchFiles();
        } catch (error) {
            setError('Error publishing file: ' + error.message);
        }
    };

    return (
        <>
            <Navigation />
            <div className="container mt-4">
                <h3>Admin Publish System</h3>
                <hr className="bg-dark" />
                <h3>Uploaded Files</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <ListGroup>
                    {files.map((file, index) => (
                        <ListGroup.Item key={index}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, false)}>
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <h3>Already Published</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <ListGroup>
                    {alreadyPublishedArticles.map((file, index) => (
                        <ListGroup.Item key={index}>
                            {file.name}
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file, true)}>
                                Edit
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Modal for editing file data */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit File Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="content">
                                <Form.Label>Content</Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    value={fileData.content}
                                    onChange={handleContentChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.title}
                                    onChange={(e) => handleChange(e, 'title')}
                                />
                            </Form.Group>
                            <Form.Group controlId="details">
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.details}
                                    onChange={(e) => handleChange(e, 'details')}
                                />
                            </Form.Group>
                            <Form.Group controlId="socials">
                                <Form.Label>Social Media Links</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.socials}
                                    onChange={(e) => handleChange(e, 'socials')}
                                />
                            </Form.Group>
                            <Form.Group controlId="img01">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.img01}
                                    onChange={(e) => handleChange(e, 'img01')}
                                />
                            </Form.Group>
                            <Form.Group controlId="sub">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.sub}
                                    onChange={(e) => handleChange(e, 'sub')}
                                />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.date}
                                    onChange={(e) => handleChange(e, 'date')}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {isAlreadyPublished && (
                            <Button variant="success" onClick={handlePublish} className="mt-3">
                                Publish
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
