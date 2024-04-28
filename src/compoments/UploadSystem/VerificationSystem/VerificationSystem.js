import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, ListGroup, Alert } from 'react-bootstrap';
import {auth, storage} from '../../../firebase';
import { listAll, getDownloadURL, getMetadata, ref, uploadString, deleteObject } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navigation from '../../Navigation/Navigation';
import {useNavigate} from "react-router-dom";

const FirebaseFileList = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // State to hold current user
    const navigate = useNavigate()
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
            const listRef = ref(storage, 'upload_from_authors');
            const { items } = await listAll(listRef);

            const fileData = await Promise.all(
                items.map(async (item) => {
                    const downloadUrl = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    const fileContent = await fetch(downloadUrl).then((res) => res.json());

                    return { name: item.name, downloadUrl, metadata, fileContent };
                })
            );

            setFiles(fileData);
        } catch (error) {
            setError('Error fetching files: ' + error.message);
        }
    };


    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                if(user.email!=="tzimasvaggelis02@gmail.com"){
                    navigate("/upload");
                }
                setCurrentUser(user);
            } else {
                // No user is signed in
                setCurrentUser(null);
                navigate('/upload/admin/login');
            }
        });
        fetchFiles();
    }, []);

    const handleEdit = (file) => {
        setSelectedFile(file);
        setFileData({
            ...file.fileContent,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!selectedFile || !fileData) return;

        try {
            // Save updated file data to Firebase
            const fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            fileData.content = fileData.content.replaceAll('<p>', "<p class='lead'>");
            await uploadString(fileRef, JSON.stringify(fileData));
            // Update the file data locally
            const updatedFiles = files.map((file) =>
                file.name === selectedFile.name ? { ...file, fileContent: fileData } : file
            );
            setFiles(updatedFiles);

            // Close modal
            setShowModal(false);
        } catch (error) {
            setError('Error saving file data: ' + error.message);
        }
    };

    const handleChange = (e, field) => {
        const value = e.target.value;
        setFileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleContentChange = (value) => {
        setFileData((prevData) => ({
            ...prevData,
            content: value,
        }));
    };

    const handlePublish = async () => {
        if (!selectedFile) return;

        try {
            // Get download URL for the selected file
            const fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            const downloadUrl = await getDownloadURL(fileRef);

            // Fetch file content
            const fileContent = await fetch(downloadUrl).then((res) => res.text());

            // Upload the file content to the 'early_release' folder
            const earlyReleaseRef = ref(storage, `early_releases/${selectedFile.name}`);
            await uploadString(earlyReleaseRef, fileContent);

            // Delete the original file from 'upload_from_authors'
            await deleteObject(fileRef);

            // Display success message
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
                            <Button variant="info" className="ms-2" onClick={() => handleEdit(file)}>
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
                        {/* Publish button */}
                        <Button variant="success" onClick={handlePublish} className="mt-3">
                            Publish
                        </Button>
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