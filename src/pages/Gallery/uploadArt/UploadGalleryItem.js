import React, {useEffect, useState} from 'react';
import {auth, database, storage} from '../../../firebase';
import {push, ref} from 'firebase/database';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import ImageUpload from "../../../components/UploadSystem/components/fancyImage/ImageUpload";
import {ref as storageRef, uploadBytes} from "firebase/storage";

const UploadGalleryItem = () => {
    const [user, setUser] = useState(null);
    const [descriptionEl, setDescriptionEl] = useState('');
    const [descriptionEng, setDescriptionEng] = useState('');
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                if (user.displayName) {
                    setTitle(user.uid);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

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

    const handleUpload = async () => {
        if (user) {

            const imageRef = storageRef(storage, `images/gallery/review/${image.name}`);

            const dimensions = await getImageDimensions(image);
            const metadata = {
                customMetadata: dimensions
            };

            await uploadBytes(imageRef, image, metadata);

            const newItem = {
                image:`/assets/gallery/review/${image.name}`,
                title: user.uid,
                descriptionEl,
                descriptionEng
            };

            push(ref(database, 'gallery/review'), newItem)
                .then(() => {
                    setDescriptionEl('');
                    setDescriptionEng('');
                    setImage('');
                    setTitle('');
                    setSuccess("Upload successful!");
                    setError('');
                })
                .catch((error) => {
                    console.error("Error uploading data: ", error);
                    setError("Error uploading data.");
                    setSuccess('');
                });
        } else {
            setError("You must be logged in to upload items.");
            setSuccess('');
        }
    };

    return (
        <Container className={"mb-5 mt-5 pb-5"}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <ImageUpload image={image} setImage={setImage}></ImageUpload>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Description in Greek</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description in Greek"
                        value={descriptionEl}
                        onChange={(e) => setDescriptionEl(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Description in English</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description in English"
                        value={descriptionEng}
                        onChange={(e) => setDescriptionEng(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </Form>
        </Container>
    );
};

export default UploadGalleryItem;
