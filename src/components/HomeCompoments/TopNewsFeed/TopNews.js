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
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FNEW-ALBUM%3A-Finnish-Black-Metal-Band-Luuskki-to-Release-Self-Titled-Debut-Album-in-October--First-Single-%22Fifth-of-the-Fifth-Columns%22-Out-Now!_800x800?alt=media&token=54bbcc05-b649-4521-94ba-ed543badd511"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        SINGLE REVIEW: Denigrate's "Crystal Rest" — A Dark Fusion of Crushing Metal and Stunning Visuals                                        
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"https://pulse-of-the-underground.com/article/NEW-ALBUM:-Finnish-Black-Metal-Band-Luuskki-to-Release-Self-Titled-Debut-Album-in-October--First-Single-%22Fifth-of-the-Fifth-Columns%22-Out-Now!"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/Kreyl:-Medusa's-Death-(Single-Review)"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        SIGNLE REVIEW :Kreyl- Medusa's Death                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Kreyl:-Medusa's-Death-(Single-Review)"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/REVIEW:--ORKRIST----single-Prince-of-Melancholy----LUEA"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                        SINGLE REVIEW: Οι ORKRIST παρουσιάζουν το  single “Prince of Melancholy” από το άλμπουμ “LUEA”.                                       </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/REVIEW:--ORKRIST----single-Prince-of-Melancholy----LUEA"}>
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
                                        src="https://pulse-of-the-underground.com/assets/Band-Review:-Selofan   "
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(GR):</span></h3>
                                        <p className="lead text-white">
                                        Band Review: Selofan
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/Band-Review:-Selofan"}>
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
                                        src="https://pulse-of-the-underground.com/assets/NEWS:Vision-Bleak--Weird-Tales"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">NEWS(ENG):</span></h3>
                                        <p className="lead text-white">
                                        NEWS:Vision Bleak -Weird Tales                                       
                                         </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/NEWS:Vision-Bleak--Weird-Tales"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FGlassCare.jpg?alt=media&token=f5e4d929-68b3-44f8-bf99-da8d2f9498b2"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">NEWS(GR):</span></h3>
                                        <p className="lead text-white">
                                        NEWS: DECAIR – single “Glasscase”
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/GLASSCASE"}>
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
                                        <h3><span className="text-danger bold">NEWS(ENG):</span></h3>
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
