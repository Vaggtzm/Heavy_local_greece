import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../carousel/carousel.css';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import {Button, Modal} from "react-bootstrap";
import {getFirebaseStorageUrlFull} from "../../../systems/UploadSystem/articleData/articleData";

const PrimaryCarousel = ({ customSettings, customImages, classNameImages, shouldBeFull }) => {
    const [images, setImages] = useState([]);
    const [fullImages, setFullImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchImages = async (imagePaths) => {
            const imageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, !!shouldBeFull)));
            setImages(imageUrls);
            if(shouldBeFull){
                setFullImages(imageUrls);
            }else{
                const fullImageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, true)));
                setFullImages(fullImageUrls);
            }
        };

        if (customImages && customImages.length > 0) {
            fetchImages(customImages);
        } else {
            fetchImages([
                'images/Concerts/workInProgress/DSC_0016.JPG',
                'images/Concerts/workInProgress/DSC_0058.JPG',
                'images/Concerts/workInProgress/DSC_0028.JPG',
            ]);
        }
    }, [customImages]);

    const getImageSource = async (imagePath) => {
        const imageRef = ref(storage, imagePath);
        return await getDownloadURL(imageRef);
    };

    const defaultSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
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
        <>
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className={`bg-dark carousel-item ${classNameImages}`} onClick={() => handleImageClick(index)}>
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

        </>
    );
};

export default PrimaryCarousel;
