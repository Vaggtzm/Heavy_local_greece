import React, {useEffect, useState} from 'react';
import {auth, database, storage} from '../../../firebase';
import {push, ref, update} from 'firebase/database';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import ImageUpload from "../../../components/UploadSystem/components/fancyImage/ImageUpload";
import {ref as storageRef, uploadBytes} from "firebase/storage";
import useNavigate from "../../../components/LanguageWrapper/Navigation";
import {getImageDimensions} from "../../../components/UploadSystem/articleData/articleData";
import NavLink from "../../../components/LanguageWrapper/NavLink";
import {getIdTokenResult} from "firebase/auth";

const UploadGalleryItem = () => {
    const [user, setUser] = useState(null);
    const [descriptionEl, setDescriptionEl] = useState('');
    const [descriptionEng, setDescriptionEng] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleUpload = async () => {
        if (user) {

            const idTokenResult =  await getIdTokenResult(user);
            let userFolder;
            if (idTokenResult.claims && idTokenResult.claims.admin) {
                userFolder = 'authors';
            } else {
                userFolder = 'users';
            }

            const userRef = ref(database, `${userFolder}/${user.uid}`);

            await update(userRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL || ''
            });

            const imageRef = storageRef(storage, `images/gallery/review/${image.name}`);
            const dimensions = await getImageDimensions(image);
            const metadata = {
                customMetadata: dimensions
            };
            const test =await uploadBytes(imageRef, image, metadata);

            console.log(test);

            const newItem = {
                image:`/images/gallery/review/${image.name}`,
                title: user.uid,
                descriptionEl,
                descriptionEng
            };

            push(ref(database, 'gallery/review'), newItem)
                .then(() => {
                    setDescriptionEl('');
                    setDescriptionEng('');
                    setImage('');
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

                <Button className={"m-3"} variant="primary" onClick={handleUpload}>
                    Upload
                </Button>

                <NavLink className={"btn btn-danger m-3"} to={"/Art-Gallery-page"}>BACK</NavLink>
            </Form>
        </Container>
    );
};

export default UploadGalleryItem;
