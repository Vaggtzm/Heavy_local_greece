import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageUpload.css';
import {useTranslation} from "react-i18next"; // Custom CSS file for additional styling

const ImageUpload = ({image, setImage}) => {
    const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if(image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        }else{
            setPreview(null);
        }
    }, [image]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setPreview(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setPreview(null);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Form.Group controlId="image" className="mb-3">
                        <Form.Label className="text-light">Upload Image</Form.Label>
                        <div
                            className={`upload-box ${dragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                className="file-input"
                                onChange={handleImageChange}
                            />
                            {!preview && (
                                <div className="upload-message">
                                    <p>{t("uploadImage")}</p>
                                </div>
                            )}
                            {preview && (
                                <div className="image-preview">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="img-thumbnail"
                                    />
                                </div>
                            )}
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default ImageUpload;
