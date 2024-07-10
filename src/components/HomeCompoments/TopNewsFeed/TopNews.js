import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import "./Animation.css";
import NavLink from "../../LanguageWrapper/NavLink";
import ReviewsBanner from "./NewsCompoments/ReviewsBanner";
import POUtransparent from "./../../../assets/PulseOfTheUnderground-removebg-preview.png"
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
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F241755542_342487367665042_8867841272429406816_n_800x800.jpg?alt=media&token=6d7eae80-83c8-4fa7-a343-13d23b1384ec"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">INTERVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                            An Interview with Znous
                                            <br/>
                                            The Sound of Dissent: Tunisian Metalcore's Post-Revolution Roar
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/The-Sound-of-Dissent-Tunisian-Metalcores-Post-Revolution-Roar"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FMedusas_800x600.jpg?alt=media&token=dc4ff73d-ddb0-433e-8d62-db9a4c692c93"
                                        className="img-fluid m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">INTERVIEW(GR):</span></h3>
                                        <p className="lead text-white">Αποκαλύπτοντας την ιστορία πίσω από την Οργή της
                                            Μέδουσας - Συνέντευξη με τους Medusa's Wrath</p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/--------------Medusa's-Wrath"}>
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
                                        src="https://pulse-of-the-underground.com/assets/1.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                            SINGLE REVIEW: “Silent Disco” by Senses – A Healing Dance of Freedom
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/SINGLE-REVIEW:-Silent-Disco-by-Senses--A-Healing-Dance-of-Freedom"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/R-16062496-1602771752-6382.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                            Single Review + News - Μια Δυσοίωνη Βραδιά - Piranha - Eternal Night
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Single-Review-+-News--------Piranha---Eternal-Night"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/Sirius-1068x801.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                            Single Review + info - Μια πορεία δικαίωσης και εξιλέωσης - Sirius - Desdichado
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Single-Review-+-info----------Sirius---Desdichado"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/450259163_461419796829012_4244951595615502782_n.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                            Single Review - Ενώπιον της Αγνότητας - Silent Cries - Face The Innocence
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Single-Review--------Silent-Cries---Face-The-Innocence"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            {/**Reviews End */}
                        </div>

                        {/** Sidebar Column */}
                        <div className="col-md-4">
                            <div className="sidebar">
                                <h3 className="text-white"><span className="image"><img src={POUtransparent}
                                                                                        className="img-fluid w-25 h-25"/></span>Communication
                                    Form</h3>
                                <Contact/>
                            </div>
                        </div>
                    </div>

                    {/**News Start */}
                    {/* Empty For Now */}
                    {/**News End */}
                </div>
            </div>
        </div>
    );
};

export default TopNews;
