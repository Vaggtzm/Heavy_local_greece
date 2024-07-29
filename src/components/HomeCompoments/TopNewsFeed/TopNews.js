import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import "./Animation.css";
import NavLink from "../../LanguageWrapper/NavLink";
import ReviewsBanner from "./NewsCompoments/ReviewsBanner";
import POUtransparent from "./../../../assets/PulseOfTheUnderground-removebg-preview.png"
import Sponshorbanner from "./NewsCompoments/SponshorBanner";
import Contact from "../../ContactForm/contact";


const TopNews = () => {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);
    const topNewsRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (topNewsRef.current) {
                const topNewsHeight = topNewsRef.current.getBoundingClientRect().top;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                setVisible(scrollTop > topNewsHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div ref={topNewsRef} className={`top-news-container ${visible ? "visible" : ""}`}>
            <ReviewsBanner/>
            <hr className="bg-white"/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-white">Latest News</h2>
                    </div>





                    <div className="row">
                        {/** Main Content Column */}
                        <div className="col-md-8">
                            {/**Interviews Start (ENG FIRST ) */}
                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FBlackreuss.jpg?alt=media&token=ef380d93-db0a-43f8-8716-fed00375447b"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">INTERVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        INTERVIEW: Inside the Mind of Black Reuss — The One-Man Musical Revolution
                                       </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/INTERVIEW:-Inside-the-Mind-of-Black-Reuss:-A-One-Man-Musical-Revolution"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                    
                            {/**Interviews END */}


                            {/**Reviews Start  (ENG FIRST) */}

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/a0089922294_10.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        ALBUM REVIEW:  "Silver Pulse" by BleakHeart — The Epitome of Emotional Metal</p>
                                        <NavLink className="btn btn-danger"
                                                 to={"https://pulse-of-the-underground.com/article/ALBUM-REVIEW:--%22Silver-Pulse%22-by-BleakHeart--The-Epitome-of-Emotional-Metal"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/none.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                        END OF AN ERA: None Bids Farewell After Four Albums                                         </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/END-OF-AN-ERA:-None-Bids-Farewell-After-Four-Albums"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/unnamed.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">News(ENG):</span></h3>
                                        <p className="lead text-white">
                                        SHINIGAMI | HELLPASS | PRIMAL ROOTS | JEHOVAH ON DEATH – live @ Temple Athens – Saturday September 21                                         </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/-SHINIGAMI-|-HELLPASS-|-PRIMAL-ROOTS-|-JEHOVAH-ON-DEATH--live-@-Temple-Athens--Saturday-September-21-"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                        </div>
                      
                    </div>


                    {/**News Start */}
                
                    {/* Empty For Now */}
                    {/**News End */}
                    <Sponshorbanner />

                </div>
            </div>
        </div>
    );
};

export default TopNews;
