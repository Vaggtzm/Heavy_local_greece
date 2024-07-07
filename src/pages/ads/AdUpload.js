import React, {useEffect, useState} from 'react';
import {get, getDatabase, push, ref} from 'firebase/database';
import {getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import {auth} from "../../firebase";
import ImageUpload from "../../components/UploadSystem/components/fancyImage/ImageUpload";
import "../../components/UploadSystem/components/fancyImage/ImageUpload.css";
import {useTranslation} from "react-i18next";

const AdUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const db = getDatabase();
    const storage = getStorage();
    const [currentUser, setCurrentUser] = useState(null);

    const [t] = useTranslation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href = '/User/login';
                return;
            }
            setCurrentUser(user);

            // Check if user is admin
            const adminRef = ref(db, 'roles/admin');
            const snapshot = await get(adminRef);
            if (snapshot.exists()) {
                const admins = snapshot.val();
                if (admins.includes(user.email)) {
                    setIsAdmin(true);
                }
            }
        });

        return () => unsubscribe();
    }, [db]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            const imageRef = storageRef(storage, `ads/${image.name}`);
            await uploadBytes(imageRef, image);

            const adData = {
                title,
                description,
                imageURL:`ads/${image.name}`,
                userId: currentUser.uid,
                status: 'pending' // Set status to pending approval
            };

            const adsRef = ref(db, 'ads');
            await push(adsRef, adData);

            setTitle('');
            setDescription('');
            setImage(null);
            setMessage('Your ad has been submitted and is pending approval.');
        }
    };

    return (
        <Container className={"mb-5"}>

            {message && <div className={"d-flex justify-content-center"}><Alert className={"mt-4 mb-4 w-50 text-center"}
                                                                                variant="info">{message}</Alert></div>}
            <div className={"d-flex justify-content-center"}>
                <Form className={"card bg-dark p-4 w-75"} onSubmit={handleSubmit}>
                    <Form.Group controlId="formAdTitle">
                        <Form.Label className={"text-white"}>{t("Title")}</Form.Label>
                        <Form.Control
                            type="text"
                            className={"form-control"}
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAdDescription">
                        <Form.Label className={"text-white"}>{t("description")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            className={"form-control"}
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAdImage">
                        <ImageUpload setImage={setImage} image={image}/>
                    </Form.Group>
                    <div className={"d-flex justify-content-center"}>
                        <div className={"w-25"}>
                            <Button className={"btn-lg"} variant="primary" type="submit">
                                {t("submit")}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AdUpload;