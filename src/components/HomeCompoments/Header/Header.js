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
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0 && !scrolled) {
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
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      <div className="container mt-4 main">
        <div className="row text-center p-3 m-2 shadow-lg">
          <div className="col-md-12">
            <div className="jumbotron jumbotron-fluid">
              <div className="container-fluid">
                <h1 className="display-4">
                  {t("welcomeMessage")}{" "}
                  <span className="font-1">Pulse Of The Underground</span>{" "}
                </h1>
                <PrimaryCarousel />
                <p className="lead">{t("subtitle")}</p>
                <hr className="bg-dark" />
              </div>
            </div>
            <Socials />
            <hr className="bg-white"/>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
