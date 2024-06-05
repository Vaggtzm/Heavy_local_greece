import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'

const SecondaryCarousel = () => {
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

            <div className='bg-dark carousel-item'>
                <img src={"https://heavy-local.com/assets/gallery/Goth01.png"} alt="slide2"/>
            </div>
            <div className='bg-dark carousel-item'>
                <img src={'https://heavy-local.com/assets/gallery/gallery-item06.jpg'} alt="slide3"/>
            </div>
            <div className='bg-dark carousel-item'>
                <img src={'https://heavy-local.com/assets/gallery/art-item.jpg'} alt="slide4"/>
            </div>

        </Slider>
    );
};

export default SecondaryCarousel;
