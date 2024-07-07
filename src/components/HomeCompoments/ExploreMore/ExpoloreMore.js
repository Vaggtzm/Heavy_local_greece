import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SecondaryCarousel from "./../carousel/carousel";
import Author from "../../../pages/Authors/Author/Author";
import Footer from "../../footer/footer";
import "./Animation.css";

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
    <>
<section ref={exploreMoreRef} className={`ExploreMore ${visible ? "visible" : ""}`}>
      <h2 className="text-center text-white">{t("exploreMore")}</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-white">{t("galleryTitle")}</h3>
            <hr className="bg-white" />
            <SecondaryCarousel />
          </div>
       
        </div>
        <div className="col-md-12">
          <h3 className="text-white">{t("meetTheTeam")}</h3>
        </div>
        <div className="testinomial">
          <div className="row text-center">
            <Author
              rating={4.5}
              className={"col-md-4 mb-5 mb-md-0"}
              userId={"uSXH49YHlzT8vjQ94ZuJTOz351m2"}
            />
            <Author
              rating={5}
              className={"col-md-4 mb-5 mb-md-0"}
              userId={"gbK4OvgKbyYDfYCfIjboOqjA9Yv1"}
            />
            <Author
              rating={4}
              className={"col-md-4 mb-5 text-white pb-2"}
              userId={"QY7GE8irSce3f4AFKW20DAWVxhr2"}
            />
            <hr className="bg-white" />
            <Author
              rating={4}
              className={"col-md-6 mb-5 text-white"}
              userId={"2219SdmiZHagjXDqmqDlBZ84mn22"}
            />
            <Author
              rating={4}
              className={"col-md-6 mb-5 text-white"}
              userId={"mmQTo2rdEDZ7YsnpJn15gCuaWz93"}
            />
            <hr className="bg-white" />
            <Author
              rating={4}
              className={"col-md-6 mb-0 text-white"}
              userId={"VSGMmP7o4DWwimc0tZjHC02487B3"}
            />
            <Author
              rating={4}
              className={"col-md-6 mb-0 text-white"}
              userId={"YnKl6Fza8kcshY5rTlmeQZAokIg1"}
            />
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
};

export default ExploreMore;
