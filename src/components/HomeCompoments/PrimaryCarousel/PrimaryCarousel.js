import React, {useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../carousel/carousel.css'
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../../../firebase";

const PrimaryCarousel = () => {

    const [images, setImages] = React.useState([]);

    useEffect(() => {
        Promise.all([
            getImageSource("images/Concerts/workInProgress/DSC_0016_800x600.JPG"),
            getImageSource("images/Concerts/workInProgress/DSC_0058_800x600.JPG"),
            getImageSource("images/Concerts/workInProgress/DSC_0028_800x600.JPG"),
        ]).then((imageUrls) => {
            setImages(imageUrls);
        })
    }, []);

    const getImageSource = async (imagepath) => {
        const imageRef = ref(storage, imagepath);
        return await getDownloadURL(imageRef)
    }

    const settings = {
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
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <Slider {...settings} >

            {images.map((image, index) => {
                return (<div className='bg-dark carousel-item'>
                    <img src={image} alt={`slide${index}`}/>
                </div>)
            })}
        </Slider>
    );
};

export default PrimaryCarousel;
