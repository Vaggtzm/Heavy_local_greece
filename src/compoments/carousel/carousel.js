import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselItem from './../../pages/Gallery/GalleryItems/gallery-item06.jpg';
import CarouselItem01 from './../../pages/Gallery/GalleryItems/gallery-item07.jpg';
import CarouselItem02 from './../../pages/Gallery/GalleryItems/art-item02.jpg';
import "./carousel.css";

const Carousel = ()=>{
    const settings = {
        dots:true ,
        infinite:true,
        speed:500 ,
        slidesToShow: 1 ,
        slidesToScroll:1
    }
    return(
        <>
                                            <h4>Take a look at our Art Gallery</h4>
                                    <p className="lead">Metal inspired artworks by YOU</p>
                                    <p className="lead">Submit your art at: heavylocalgreece@gmail.com</p>

       <Slider{...settings}>
        <div>
             <img src={CarouselItem} alt="Slide 1" />
             
        </div>
        <div>
                <img src={CarouselItem01} alt="Slide 1" />
         </div>
        <div>
                 <img src={CarouselItem02} alt="Slide 1" />
        </div>
    
   
        </Slider>
                                    <a href="/Art-Gallery-page" className="btn btn-danger w-100">Our gallery</a>

        </>
    )
}

export default Carousel;