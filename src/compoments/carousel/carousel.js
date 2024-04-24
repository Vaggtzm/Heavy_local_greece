import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GalleryItem01 from './../../pages/Gallery/GalleryItems/Goth01.png';
import GalleryItem02 from './../../pages/Gallery/GalleryItems/gallery-item06.jpg';
import GalleryItem03 from './../../pages/Gallery/GalleryItems/art-item.jpg';
import './carousel.css'
const SecondaryCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true ,
    autoplaySpeed:1000,
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
        <img src={GalleryItem01}   alt="slide2" />
      </div>
      <div className='bg-dark carousel-item'>
        <img src={GalleryItem02}  alt="slide3" />
      </div>
      <div className='bg-dark carousel-item'>
        <img src={GalleryItem03}  alt="slide4" />
      </div>
      
    </Slider>
  );
};

export default SecondaryCarousel;
