import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PrimaryCarousel.css';
import { Button, Modal } from "react-bootstrap";
import { getFirebaseStorageUrlFull } from "../../../systems/UploadSystem/articleData/articleData";
import { get, orderByChild, query, ref } from "firebase/database";
import { database } from "../../../firebase";
import MainBackground from "../../../assets/MainBackground.jpg";

const PrimaryCarousel = ({ customSettings, customImages, classNameImages, shouldBeFull }) => {
    const [images, setImages] = useState([MainBackground]);
    const [fullImages, setFullImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchImages = async (imagePaths) => {
            console.time("Fetching Images");

            try {
                console.time("Fetching Image URLs");
                const imageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, !!shouldBeFull)));
                console.timeEnd("Fetching Image URLs");

                setImages(imageUrls);

                if (!shouldBeFull) {
                    console.time("Fetching Full Image URLs");
                    const fullImageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, true)));
                    console.timeEnd("Fetching Full Image URLs");

                    setFullImages(fullImageUrls);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }

            console.timeEnd("Fetching Images");
        };

        const fetchData = async () => {
            const thumbnailsRef = query(ref(database, '/gigs'), orderByChild('thumbnail'));

            try {
                console.time("Carousel Loading");
                console.time("Firebase Get Request");
                const snapshot = await get(thumbnailsRef);
                console.timeEnd("Firebase Get Request");
                const data = snapshot.val();
                const thumbnailList = Object.keys(data).map(itemKey => `/gigs/${itemKey}/${data[itemKey].thumbnail}`);
                fetchImages(thumbnailList).then(() => {
                    console.timeEnd("Carousel Loading");
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (customImages && customImages.length > 0) {
            fetchImages(customImages).then();
        } else {
            fetchData().then();
        }
    }, [customImages]);

    const defaultSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
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