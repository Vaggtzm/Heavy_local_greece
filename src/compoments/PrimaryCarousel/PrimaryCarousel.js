import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselItem02 from './../../Concerts/DSC_0016.JPG';
import CarouselItem03 from './../../Concerts/DSC_0058.JPG';
import CarouselItem04 from './../../Concerts/DSC_0028.JPG';
import './Carousel.css'
const PrimaryCarousel = () => {
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
        <img src={CarouselItem02}   alt="slide2" />
      </div>
      <div className='bg-dark carousel-item'>
        <img src={CarouselItem03}  alt="slide3" />
      </div>
      <div className='bg-dark carousel-item'>
        <img src={CarouselItem04}  alt="slide4" />
      </div>
      
    </Slider>
  );
};

export default PrimaryCarousel;
