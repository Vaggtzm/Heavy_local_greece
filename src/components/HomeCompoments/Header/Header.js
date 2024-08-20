import React, { useEffect, useState } from "react";
import PrimaryCarousel from "../PrimaryCarousel/PrimaryCarousel";
import Socials from "../SocialMedia/socials";
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
            <span className="font-1 fancy-text">Pulse Of The Underground</span>
          </h1>
      <div className="container">
      <hr className="bg-white" />
      <div className="socials">
      <Socials />
      </div>
      <hr className="bg-white" />

    </div>
        </div>
    
      </div>
    </div>
   
  </header>
     );
};

export default Header;
