import React, { useEffect, useState } from "react";
import PrimaryCarousel from "../PrimaryCarousel/PrimaryCarousel";
import Socials from "../SocialMedia/socials";
import { useTranslation } from "react-i18next";
import "./../home.css";
import "./Animation.css";

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
        <div className="parallax-bg bg-dark"></div>
        <div className="container mt-2 main">
          <div className="row text-center p-3 m-2 shadow-lg header-content bg-dark">
            <div className="col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                  <h1 className="display-4 fancy-text text-white">
                    <span className="small m-0">{t("welcomeMessage")}</span>
                    <br/>
                    <span className="font-1">Pulse Of The Underground</span>
                  </h1>
                  <PrimaryCarousel />
                  <p className="small neon-subtitle text-light">{t("subtitle")}</p>
                  <hr className="bg-dark" />
                  <Socials/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
