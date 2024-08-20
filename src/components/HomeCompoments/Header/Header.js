import React, { useEffect, useState } from "react";
import PrimaryCarousel from "../PrimaryCarousel/PrimaryCarousel";
import Socials from "../SocialMedia/socials";
import VdeoBackground from './../../../assets/BlackBackground/flames-text-clip.mp4';
import { useTranslation } from "react-i18next";
import "./Animation.css";
import './Header.css';
const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50 && !scrolled) {
        setScrolled(true);
      } else if (scrollTop === 0 && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`header-container mb-5 ${scrolled ? "scrolled" : ""}`}>
    <div className="carousel-container">
      <PrimaryCarousel />
      <div className="carousel-overlay">
        <div className="text-container">
          <h1 className="fancy-text">
            <span className="small m-0">{t("welcomeMessage")}</span>
            <br />
            <span className="font-1  fancy-text">Pulse Of The Underground</span>
          </h1>
          <hr className="bg-white" />
      <div className="container">
      <h4 className="quickaccess">Quick Acces features:</h4>
      <hr className="bg-white" />

      <div className="row quickaccess">
        <div className="col-md-4">
          <div className="card bg-secondary">
          <h5 className="card-title m-3">Latest Reviews</h5>
          <div className="card-body">
          <p className="lead">
           the latest and the oldest of the Underground world 
          </p>
         <div className="btn btn-danger">Explore</div>
          </div>
          </div>
        </div>
        <div className="col-md-4">
        <div className="card bg-secondary ">
          <h5 className="card-title m-3">Latest Interviews</h5>
          <div className="card-body">
          <p className="lead">
           for a voice like thunder ! 
           explore what the Underground has to say  
          </p>
         <div className="btn btn-danger">Explore</div>
          </div>
          </div>
        </div>
        <div className="col-md-4">
        <div className="card bg-secondary ">
          <h5 className="card-title m-3">Artworks Gallery  </h5>
          <div className="card-body">
          <p className="lead">
           Metal inspired art by small artists  ! 
           like you 
          </p>
         <div className="btn btn-danger">Explore</div>
          </div>
          </div>
        </div>

      </div>
    </div>
        </div>
    
      </div>
    </div>
   
  </header>
     );
};

export default Header;
