import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PrimaryCarousel.css'; // Προσθέτουμε το CSS εδώ
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import { Button, Modal } from "react-bootstrap";
import { getFirebaseStorageUrlFull } from "../../../systems/UploadSystem/articleData/articleData";

const PrimaryCarousel = ({ customSettings, customImages, classNameImages, shouldBeFull }) => {
    const [images, setImages] = useState([]);
    const [fullImages, setFullImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchImages = async (imagePaths) => {
            const imageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, !!shouldBeFull)));
            setImages(imageUrls);
            if (shouldBeFull) {
                setFullImages(imageUrls);
            } else {
                const fullImageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, true)));
                setFullImages(fullImageUrls);
            }
        };

        if (customImages && customImages.length > 0) {
            fetchImages(customImages);
        } else {
            fetchImages([
                'https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/gigs%2F2024_06_01%2FAkral_Necrosis.png?alt=media&token=642de363-5c0a-492f-88d2-c581d9c9281f',
                'https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/gigs%2F2024_06_01%2FSpinecrusher_5_800x800.png?alt=media&token=88ab6ade-0d30-43e1-b104-021179a9dc71',
                'https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/gigs%2F2024_05_26%2FDSC_0094.JPG?alt=media&token=cccd9c87-299b-4f0c-8217-dc0453005fc1',
            ]);
        }
    }, [customImages]);

    const defaultSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Δείχνει 1 εικόνα σε κάθε slide
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    const settings = { ...defaultSettings, ...customSettings };

    const handleImageClick = (index) => {
        setSelectedImage(fullImages[index]);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className={`carousel-item ${classNameImages}`} onClick={() => handleImageClick(index)}>
                        <img src={image} alt={`slide${index}`} />
                    </div>
                ))}
            </Slider>

           

            {/* Modal για την πλήρη εικόνα */}
            <Modal size={"lg"} show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header className="d-flex bg-dark p-0" style={{ position: 'relative' }}>
                    <Button variant="link" onClick={handleCloseModal} style={{ position: 'absolute', top: '0px', right: '-40px', zIndex: 1 }}>
                        <span aria-hidden="true" style={{ color: 'white', fontSize: '2.5rem' }}>&times;</span>
                    </Button>
                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                </Modal.Header>
            </Modal>
        </div>
    );
};

export default PrimaryCarousel;
