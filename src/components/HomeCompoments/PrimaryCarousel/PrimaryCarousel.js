import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../carousel/carousel.css';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import {getFirebaseStorageUrl, getFirebaseStorageUrlFull} from "../../UploadSystem/articleData/articleData";

const PrimaryCarousel = ({ customSettings, customImages, classNameImages, shouldResize }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async (imagePaths) => {
            const imageUrls = await Promise.all(imagePaths.map(imagePath => getFirebaseStorageUrlFull(imagePath, !shouldResize)));
            setImages(imageUrls);
        };

        if (customImages && customImages.length > 0) {
            fetchImages(customImages);
        } else {
            fetchImages([
                'images/Concerts/workInProgress/DSC_0016_800x600.JPG',
                'images/Concerts/workInProgress/DSC_0058_800x600.JPG',
                'images/Concerts/workInProgress/DSC_0028_800x600.JPG',
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

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className={`bg-dark carousel-item ${classNameImages}`}>
                    <img src={image} alt={`slide${index}`} />
                </div>
            ))}
        </Slider>
    );
};

export default PrimaryCarousel;
