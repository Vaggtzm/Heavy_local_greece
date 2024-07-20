// src/components/UploadComponent.js
import React, { useState } from 'react';
import { Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, update } from 'firebase/database';
import {database, storage} from "../../firebase";

const UploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [filesUploaded, setFilesUploaded] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...files]);
        setTotalFiles(files.length);
        setFilesUploaded(0);
    };

    const handleThumbnailChange = (event) => {
        setThumbnail(event.target.value);
    };

    const handleUpload = async () => {
        if (!date || !title || !description || !selectedFiles.length || !thumbnail) {
            setError('Please fill in all fields and select files.');
            return;
        }
        setUploading(true);
        setError(null);
        setSuccess(null);

        const formattedDate = date.replace(/-/g, '_');
        const uploads = [];

        // Upload files to Firebase Storage
        selectedFiles.forEach((file) => {
            const path = `gigs/${formattedDate}/${file.name}`;
            const fileRef = storageRef(storage, path);
            const uploadTask = uploadBytes(fileRef, file);

            uploads.push(
                uploadTask.then(async (snapshot) => {
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    setFilesUploaded(prev => prev + 1);
                    setUploadProgress((filesUploaded + 1) / totalFiles * 100);
                    return { fileName: file.name, downloadURL };
                })
            );
        });

        try {
            const results = await Promise.all(uploads);

            // Create JSON object
            const jsonData = {
                [formattedDate]: {
                    details: description,
                    thumbnail: thumbnail,
                    title: title,
                },
            };

            // Push to Firebase Realtime Database
            await update(dbRef(database, 'gigs'), jsonData);

            setUploadProgress(100);
            setSuccess('Upload and data update successful!');
        } catch (err) {
            setError('An error occurred during upload.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mt-4 card bg-dark text-white w-75 rounded-4">
            <div className={"card-title"}>
            <h2>Upload Images and Data</h2>
            </div>
            <div className={"card-body"}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form className={"row"}>

                <Form.Group controlId="formFile">
                    <Form.Label>Select Files</Form.Label>
                    <Form.Control type="file" multiple webkitdirectory="true" onChange={handleFileChange} />
                </Form.Group>
                <div className={"col-6"}>
                <Form.Group controlId="formThumbnail">
                    <Form.Label>Thumbnail</Form.Label>
                    <Form.Control as="select" onChange={handleThumbnailChange}>
                        <option value="">Select Thumbnail</option>
                        {Array.from(new Set(selectedFiles.map(file => file.name))).map((fileName) => (
                            <option key={fileName} value={fileName}>{fileName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                </div>
                <div className={"col-6"}>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                </div>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <div className={"card-footer d-flex justify-content-center w-100 mt-5 mb-3"}>
                <Button variant="primary" onClick={handleUpload} disabled={uploading}>
                    Upload
                </Button>
                </div>
                {uploading && (
                    <div className="mt-3">
                        <ProgressBar
                            animated
                            now={uploadProgress}
                            label={`${Math.round(uploadProgress)}%`}
                        />
                    </div>
                )}
            </Form>
            </div>
        </div>
    );
};

export default UploadComponent;
