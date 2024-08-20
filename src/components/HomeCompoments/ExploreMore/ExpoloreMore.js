import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SecondaryCarousel from "./../carousel/carousel";
import Author from "../../../pages/Authors/Author/Author";
import "./ExploreMore.css";

const ExploreMore = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const exploreMoreRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (exploreMoreRef.current) {
        const sectionTop = exploreMoreRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <section
          ref={exploreMoreRef}
          className={`explore-more-section mt-5 container rounded-3 ${visible ? "visible" : ""}`}
      >
        <div className="container text-center">
          <h2 className="section-title">{t("exploreMore")}</h2>
          <div className="gallery-section">
            <h3 className="sub-title">{t("galleryTitle")}</h3>
            <hr className="divider" />
            <div className={"m-0 mx-md-3 p-3 p-md-2"}>
              <SecondaryCarousel />
            </div>
          </div>

          <div className="team-section m-3">
            <h3 className="sub-title">{t("meetTheTeam")}</h3>
            <div className="row text-center justify-content-center">
              <Author
                  rating={4.5}
                  className="col-md-4 mb-4"
                  userId={"uSXH49YHlzT8vjQ94ZuJTOz351m2"}
              />
              <Author
                  rating={5}
                  className="col-md-4 mb-4"
                  userId={"gbK4OvgKbyYDfYCfIjboOqjA9Yv1"}
              />
              <Author
                  rating={4}
                  className="col-md-4 mb-4"
                  userId={"2219SdmiZHagjXDqmqDlBZ84mn22"}
              />
              <Author
                  rating={4}
                  className="col-md-4 mb-4"
                  userId={"mmQTo2rdEDZ7YsnpJn15gCuaWz93"}
              />
              <Author
                  rating={4}
                  className="col-md-4 mb-4"
                  userId={"VSGMmP7o4DWwimc0tZjHC02487B3"}
              />
              <Author
                  rating={4}
                  className="col-md-4 mb-4"
                  userId={"YnKl6Fza8kcshY5rTlmeQZAokIg1"}
              />
            </div>
          </div>
        </div>
      </section>
  );
};

export default ExploreMore;
