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
                                        src="https://pulse-of-the-underground.com/assets/274805849_365444885584538_4848305611902603414_n.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">NEW ALBUM(ENG):</span></h3>
                                        <p className="lead text-white">
                                        NEW ALBUM: Crest of Darkness Unveils New Single and Prepares for October Album Release                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Crest-of-Darkness-Unveils-New-Single-and-Prepares-for-October-Album-Release"}>
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
                                        src="https://pulse-of-the-underground.com/assets/unnamed.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        SINGLE REVIEW: “The Flame” Ignites My Darkest Red’s Melancholic Majesty</p>
                                        <NavLink className="btn btn-danger"
                                                 to={"article/SINGLE-REVIEW:-The-Flame-Ignites-My-Darkest-Reds-Melancholic-Majesty"}>
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
                                        <h3><span className="text-danger bold">NEWS(ENG):</span></h3>
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
                                        src="https://pulse-of-the-underground.com/assets/a3422251798_10.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        EP REVIEW: Sorry… Dives Deep with “Never Fail to Disappoint”
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/EP-REVIEW:-Sorry-Dives-Deep-with-Never-Fail-to-Disappoint"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/Warfarer-heir.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                        Single Review + news - Αδελφικό Αίμα - Warfarer - Heir Uncrowned                                                                               
                                         </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Single-Review-+-news-------Warfarer---Heir-Uncrowned"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/3.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                        Single Review + info - Συγχώρεση - Autumn’s Grief - The Absolution                                       
                                         </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Single-Review-+-info--------Nobody---Stronger-Than-Dead"}>
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
