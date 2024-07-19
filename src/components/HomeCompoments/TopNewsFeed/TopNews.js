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
                                        src="https://pulse-of-the-underground.com/assets/51900619_2321203294791447_5989544280404787200_n.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        BAND REVIEW: Veritas — The Truth in Hard Rock and Metal
                                        </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/BAND-REVIEW:-Veritas--The-Truth-in-Hard-Rock-and-Metal"}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <img
                                        src="https://pulse-of-the-underground.com/assets/451020836_1025661109196004_3543762158773206324_n.jpg"
                                        className="img-fluid w-50 m-2"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="CustomBorder">
                                        <h3><span className="text-danger bold">REVIEW(ENG):</span></h3>
                                        <p className="lead text-white">
                                        SINGLE REVIEW: Gaerea’s “Hope Shatters” — A Dark Gem Unleashed
                                         </p>
                                        <NavLink className="btn btn-danger"
                                                 to={"/article/SINGLE-REVIEW:-Gaereas-Hope-Shatters--A-Dark-Gem-Unleashed"}>
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
