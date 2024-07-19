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
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fa0248265050_10_800x800.jpg?alt=media&token=9de31b7c-4d5c-46d7-9378-3af889a32085"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">INTERVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                            Συνέντευξη με τους Meden Agan
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/---Meden-Agan"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F1_800x600.png?alt=media&token=40f90fa7-bc07-45ba-95a2-fe9f28cf0f05"
                                        className="img-fluid m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">INTERVIEW(GR):</span></h3>
                                        <p className="lead text-white">Συνέντευξη εφ'όλης της ύλης με τους death/thrashers Piranha</p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/-'-----deaththrashers-Piranha"}>
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
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fab67616d0000b2731220a6ff8a929cd4743d1729_800x800.jpeg?alt=media&token=3d634d3c-4aa6-4b3a-87e1-f7cc737a83df"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                            ALBUM REVIEW: “As All Light Leaves Her” by Advent Sorrow — Of Somber Voices, Introspection and Death
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/ALBUM-REVIEW:-As-All-Light-Leaves-Her-by-Advent-Sorrow--Of-Somber-Voices,-Introspections-and-Death"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fa1941378762_16_800x800.jpg?alt=media&token=ad9fd32a-260b-4a99-a7b9-e6689dd836e9"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                            Album Review + info - Μια Αποτυχημένη Επιτόπια Επέμβαση - Pythagoras - Botched Field Surgery
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Album-Review-+-info---------Pythagoras---Botched-Field-Surgery"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fa3686591661_10_800x800.jpg?alt=media&token=955c5b54-5f5b-4267-95ba-97f5f485635e"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                            ALBUM REVIEW: “Krijtland” by Wurgilnõ — A Must-Have Piece of Work
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/ALBUM-REVIEW:-Krijtland-by-Wurgiln--A-Must-Have-Piece-of-Work"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F4_800x800.jpg?alt=media&token=2fe8c5ff-08f0-4adf-98a4-a4bc0410af46"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                            Single Review + info - Περιθωριακός Αγώνας - Nobody - Stronger Than Dead
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Single-Review-+-info--------Nobody---Stronger-Than-Dead"}>
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
