import React, { useEffect, useState } from "react";
import "./home.css";
import Socials from "../components/SocialMedia/socials";
import SpotifyBanner from "../components/SpotifyBanner/SpotifyBanner";
import PrimaryCarousel from "../components/PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "../components/carousel/carousel";
import CasterFmPlayer from "../components/Users/CasterFmPlayer";
import Author from "./Authors/Author/Author";
import {NavLink} from "react-router-dom";

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
        <>
            <header  className={scrolled ? "scrolled" : ""}>
                <div className="container mt-4 main ">
                    <div className="row text-center  p-3 m-2 shadow-lg">
                        <div className="col-md-12">
                            <div className="jumbotron jumbotron-fluid">
                                <div className="container-fluid">
                                    <h1 className="display-4">
                                        Welcome to{" "}
                                        <span className="font-1">Pulse Of The Underground</span>{" "}
                                    </h1>
                                    <PrimaryCarousel/>
                                    <p className="lead">
                                        Stay brutal and explore the unknown metal news, reviews, and
                                        features!
                                    </p>
                                    <hr className="bg-dark"/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                </header>
<section  className={`feed ${scrolled ? "scrolled" : ""}` }>
<div className="container my-5 bg-transparent">
                    <div className="row text-white text-center">
                        {/* Main Article Section */}
                        <div className="col-md-8 ">
                            <div className="CenterSection">
                                <h2>Top News</h2>
                                <h3>2024Akral Necrosis and Spinecrusher Live in Hidden (1/06/24)</h3>
                                <img
                                    src="https://pulse-of-the-underground.com/assets/436109394_905826201552525_5669456048747792072_n.jpg"
                                    className="img-fluid w-75 rounded-2 m-2"/>
                                <p className="lead">
                                    On the evening of June 1st, 2024, Hidden – The Social Space from Bucharest
                                    transformed into a sanctum of metal, hosting an exclusive concert featuring two
                                    titans of the Romanian metal scene: Akral Necrosis and Spinecrusher. This event not
                                    only marked a monumental occasion for the Romanian underground movement but also
                                    celebrated a significant milestone for Akral Necrosis. The band members decided to
                                    release their first live album at the very place it was recorded, adding an extra
                                    layer of importance to the evening.
                                </p>
                                <NavLink to="/article/Akral-Necrosis-and-Spinecrusher-Live-in-Hidden-10624"
                                         className="btn btn-danger">Read More</NavLink>

                                <hr className="bg-white"/>
                                <h3>2024 Mindless Sinner X Marauder 25/5/24 @ Κύτταρο, Αθήνα</h3>
                                <img src="https://pulse-of-the-underground.com/assets/20240525_232234.jpg"
                                     className="img-fluid w-75 rounded-2 m-2"/>
                                <p>
                                    Οι Σουηδοί heavy metallers Mindless Sinner, ήρθαν στη χώρα μας για μία και μοναδική
                                    εμφάνιση στην Αθήνα, με ποιότητα, συνέπεια, θετική ενέργεια και ήθος, ενώ οι έλληνες
                                    epic heavy metallers Marauder, έδωσαν τον καλύτερο εαυτό τους για να μας
                                    προθερμάνουν όσο καλύτερα μπορούσαν.

                                    Αν και η βραδιά ξεκίνησε με καθυστέρηση (για άγνωστους λόγους), κανένας από τους
                                    παρευρισκόμενους δεν έδειξε ενοχλημένος, αφού κάθε χεβιμεταλλάς που σέβεται τον
                                    εαυτό του είναι πάντα έτοιμος για όλα.
                                </p>
                                <NavLink to="/article/Mindless-Sinner-X-Marauder-25524---" className="btn btn-danger">Read
                                    More</NavLink>
                                <hr className="bg-white"/>
                                <h3>Eldingar x Urza x Decemberance (25/05/24)</h3>

                                <img src="https://pulse-of-the-underground.com/assets/decembrance.jpg"
                                     className="img-fluid w-75 rounded-2 m-2"/>
                                <p>
                                    Δεύτερη φορά στο ιστορικό An Club στα Εξάρχεια των Αθηνών, αυτή την φορά για
                                    ανταπόκριση! Τα λόγια περιττεύουν όταν μπαίνεις σε αυτόν τον υπέροχο χώρο! Με ένα
                                    ποτήρι Captain Morgan για αρχή πήγα το Σάββατο αυτό σε ένα σκοτεινό, δυσοίωνο μα και
                                    ταυτόχρονα μελωδικό live! 4 σχεδόν ώρες ερέβους και ατμοσφαιρικών συνθέσεων με
                                    πρωταγωνιστές 3 underground έμπειρες μπάντες, τους Eldingar, τους Urza και τους
                                    Decemberance!</p>
                                <NavLink to="/article/TestEldingar-x-Urza-x-Decemberance-250524"
                                         className="btn btn-danger">Read More</NavLink>


                                <hr className="bg-white"/>
                                <h3>Thomas Libero’s Uplifting New Single “Questa Storia La Scrivo Io” Out Now</h3>
                                <img src="https://pulse-of-the-underground.com/assets/Thomas_Libero.jpg"
                                     className="img-fluid w-75 h-75 rounded-2 m-2"/>
                                <p>
                                    Thomas Libero’s latest single, “Questa Storia La Scrivo Io” ("I Write My Own
                                    Story"), is now available on all streaming and digital download platforms. The track
                                    serves as a prelude to his highly anticipated album, “La Mia Guerra”, set to release
                                    in October 2024. Libero’s new single is a powerful anthem of self-actualization,
                                    designed to inspire listeners to overcome daily challenges and believe in their own
                                    potential.</p>
                                <NavLink
                                    to="/article/Thomas-Libero’s-Uplifting-New-Single-“Questa-Storia-La-Scrivo-Io”-Out-Now"
                                    className="btn btn-danger">Read More</NavLink>
                                <hr className="bg-white"/>

                                <h3>Delve into TumulTum Project Curtains </h3>
                                <img src="https://heavy-local.com/assets/marwen.jpg"
                                     className="img-fluid w-75 h-75 rounded-2 m-2"/>
                                <p className="lead">
                                    TumulTum's journey is a testament to dedication, passion, and an unyielding
                                    commitment to artistic expression through the guitar. He is a courageous and
                                    distinctive guitarist who has been honing his craft for over 19 years. It is a
                                    thrilling opportunity.
                                </p>
                                <NavLink to="/article/tumultum-archive" className="btn btn-danger">Read More</NavLink>
                            </div>
                            <h3>Collabs and Sponshorships : </h3>

                            <div className="ReviewBox">
                                <div className="col-md-6 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100 "
                                            src={
                                                "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Funnamed%20(3)_800x800.jpg?alt=media&token=9733d2d5-54af-4b32-a0b7-1f6adba86eb4"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Μονομάχοι εναντίον Τυράννων - Gentihaa - Butcher’s Nails (single review + info)
                                            </h4>
                                            <NavLink
                                                to="/article/Μονομάχοι-εναντίον-Τυράννων----Gentihaa---Butchers-Nails-single-review--info"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100 "
                                            src={
                                                "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FGANGSTA'S%20PARADISE%20-%20PROMO%20BANNER_800x600.jpg?alt=media&token=1c2a27b0-2dba-4d69-bf9c-37c16caedfb3"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                SINGLE REVIEW: Primal Roots Reinvents “Gangsta’s Paradise” with Explosive Metal Energy
                                            </h4>
                                            <NavLink to="/article/SINGLE-REVIEW-Primal-Roots-Reinvents-Gangstas-Paradise-with-Explosive-Metal-Energy"
                                                     className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <h3>Latest Reviews(ENG)</h3>
                            <hr className="bg-dark"/>

                            <div className="ReviewBox">
                                <div className="col-md-4 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100 "
                                            src={
                                                "https://pulse-of-the-underground.com/assets/Stroszek.jpeg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                ALBUM REVIEW: “About All the Bad Days in the World” by Stroszek — An Introspective Triumph
                                            </h4>
                                            <NavLink
                                                to="/article/ALBUM-REVIEW-About-All-the-Bad-Days-in-the-World-by-Stroszek--An-Introspective-Triumph"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100"
                                            src={
                                                "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fkarkara_800x800.jpg?alt=media&token=da7278f7-cd02-4827-a45a-a3542222c70b"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Navigate through the inner workings of the mind in the ambiance of fuzzrock!
                                            </h4>
                                            <NavLink
                                                to="/article/Navigate-through-the-inner-workings-of-the-mind-in-the-ambiance-of-fuzzrock"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-4 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100"
                                            src={
                                                "https://pulse-of-the-underground.com/assets/GD.png"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                SINGLE REVIEW: “Straight to Hell” by Garage Distillery — Old-School Metal for the Modern Age
                                            </h4>
                                            <NavLink
                                                to="/article/SINGLE-REVIEW-Straight-to-Hell-by-Garage-Distillery--Old-School-Metal-for-the-Modern-Age"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <hr className="bg-dark"/>

                            <h3>Latest Reviews(GRE)</h3>
                            <hr className="bg-dark"/>
                            <div className="ReviewBox">


                                <div className="col-md-4 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100 "
                                            src={
                                                "https://pulse-of-the-underground.com/assets/a3257823541_16.jpg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Διασχίζοντας τις Κρύπτες του Σύμπαντος - Blasteroid - Crypts of Mind
                                                (Album Review)
                                            </h4>
                                            <NavLink
                                                to="/article/Διασχίζοντας-τις-Κρύπτες-του-Σύμπαντος---Blasteroid---Crypts-of-Mind-Album-Review"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>



                                <div className="col-md-4 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100"
                                            src={
                                                "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fa1249967617_16_800x800.jpg?alt=media&token=f1d05ccb-c017-4c1d-8c7f-7886bf986b73"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Ατμοσφαιρικοί Αντίλαλοι - Orsak:Oslo - Iron Echoes (EP Review +band info)
                                            </h4>
                                            <NavLink
                                                to="/article/Ατμοσφαιρικοί-Αντίλαλοι---Orsak-Oslo---Iron-Echoes-EP-Review-band-info"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-4 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100"
                                            src={
                                                "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F441525811_10225432808742940_248116143813906946_n_800x800.jpg?alt=media&token=6bba8f87-aa73-4057-b5ba-04688d229b06"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                ΝΕΟ ΑΛΜΠΟΥΜ: Οι Eva Can’t Κυκλοφορούν το “Emisferi” — μια Μοναδική Ημισφαιρική Αναζήτηση!
                                            </h4>
                                            <NavLink
                                                to="/article/ΝΕΟΑΛΜΠΟΥΜ-ΟιEvaCan-tΚυκλοφορούντο-Emisferi--μιαΜοναδικήΗμισφαιρικήΑναζήτηση--el"
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        {/* Sidebar Section */}
                        <div className="col-md-4">
                            <h3>Interviews</h3>
                            <hr className="bg-white"/>
                            <ul className="list-unstyled">
                                <li><a href="#">
                                    <div className="col-md-12 m-2">
                                        <div className="card h-100 w-100">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    INTERVIEW: Häxenzijrkell on the Mystical Origins and Evolution of
                                                    Their Black Metal Sound </h4>
                                                <NavLink
                                                    to="/article/INTERVIEW:-Häxenzijrkell-on-the-Mystical-Origins-and-Evolution-of-Their-Black-Metal-Sound"
                                                    className="btn btn-primary"
                                                >
                                                    Read More
                                                </NavLink>
                                            </div>
                                        </div>

                                    </div>

                                </a></li>
                                <hr className="bg-white"/>

                                <li><a href="#">
                                    <div className="col-md-12 m-2">
                                        <div className="card h-100 w-100">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    INTERVIEW: Demande à la Poussière on Shaping Art from Chaos
                                                </h4>
                                                <NavLink
                                                    to="/article/Demande-à-la-Poussière’s-Journey:-An-In-Depth-Conversation-on-Evolution,-Inspiration,-and-“Kintsugi”"
                                                    className="btn btn-primary"
                                                >
                                                    Read More
                                                </NavLink>
                                            </div>
                                        </div>

                                    </div>

                                </a></li>
                                <hr className="bg-white"/>

                                <li><a href="#">
                                    <div className="col-md-12 m-2">
                                        <div className="card h-100 w-100">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    Animamortua:Interview
                                                </h4>
                                                <NavLink to="/article/Animamortua"
                                                         className="btn btn-primary"
                                                >
                                                    Read More
                                                </NavLink>
                                            </div>
                                        </div>

                                    </div>

                                </a></li>
                                <hr className="bg-white"/>

                                <li><a href="#">
                                    <div className="col-md-12 m-2">
                                        <div className="card h-100 w-100">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    Exclusive Interview with Lethargy UA: Harmonizing Resilience and
                                                    Melodic Might </h4>
                                                <NavLink
                                                    to="/article/Exclusive-Interview-with-Lethargy-UA:-Harmonizing-Resilience-and-Melodic-Might"
                                                    className="btn btn-primary"
                                                >
                                                    Read More
                                                </NavLink>
                                            </div>
                                        </div>

                                    </div>

                                </a></li>

                                <li><a href="#">
                                    <div className="col-md-12 m-2">
                                        <div className="card h-100 w-100">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    INTERVIEW: Get to Know Thy Legion </h4>
                                                <NavLink
                                                    to="/article/INTERVIEW -Get-to-Know-Thy-Legion"
                                                    className="btn btn-primary"
                                                >
                                                    Read More
                                                </NavLink>
                                            </div>
                                        </div>

                                    </div>

                                </a></li>
                            </ul>
                            <hr className="bg-white"/>
                            <h3>General News</h3>
                            <div className="col-md-12 m-2">
                                <div className="card h-100 w-100">
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            Νέο βίντεο κλιπ από τους Meden Agan </h4>
                                        <NavLink to="/article/Νέο-βίντεο-κλιπ-από-τους-Meden-Agan"
                                                 className="btn btn-primary"
                                        >
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>

                            </div>

                            <ul className="list-unstyled">
                                <li><Socials/></li>
                                <hr className="bg-white"/>

                                <h3>Listen Our Radio</h3>
                                <li><CasterFmPlayer/></li>
                                <hr className="bg-white"/>

                                <h3>Say Thanks</h3>
                                <li>
                                    <a
                                        href="https://buymeacoffee.com/tzimasvagg7"
                                        className="btn btn-danger 25 m-2 rounded-4"
                                    >
                                        Donate
                                    </a>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
</section>
                
            <section className="ExploreMore">
                <h2 className="text-center text-white">Explore More</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-white">Artworks Gallery</h3>
                            <hr className="bg-white"/>
                            <SecondaryCarousel/>
                        </div>
                        <div className="col-md-12">
                            <h3 className="text-white">Spotify Latest</h3>
                            <hr className="bg-white"/>
                            <SpotifyBanner/>
                        </div>
                        <div className="col-md-12">
                            <h3 className="text-white">Meet the team</h3>
                        </div>
                    </div>
                    <div className="testinomial">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10 col-xl-8 text-center">
                            
                                <h3 className="mb-4 text-white">Testimonials</h3>
                            </div>
                        </div>

                        <div className="row text-center">
                        {/**Daniela */}
                        <Author rating={4.5} className={"col-md-4 mb-5 mb-md-0 pb-4"}  userId={'uSXH49YHlzT8vjQ94ZuJTOz351m2'}/>
                        {/**Daria */}
                        <Author rating={5} className={"col-md-4 mb-5 mb-md-0"} userId={'gbK4OvgKbyYDfYCfIjboOqjA9Yv1'}/>
                        {/**ΜπετοΒλακας */}
                        <Author rating={4} className={"col-md-4 mb-0 text-white pb-2"}
                                    userId={'QY7GE8irSce3f4AFKW20DAWVxhr2'}/>
                     {/**Μπετονιερα */}
                     <Author rating={4} className={"col-md-6 mb-0 text-white"}
                                    userId={"mmQTo2rdEDZ7YsnpJn15gCuaWz93"}/>
                     {/**Παλουκι */}

                    <Author rating={4} className={"col-md-6 mb-0 text-white"}
                            userId={"2219SdmiZHagjXDqmqDlBZ84mn22"}/>
                       {/**Vaggelis */}

                         <Author rating={4} className={"col-md-6 mb-0 text-white"}
                                    userId={"YnKl6Fza8kcshY5rTlmeQZAokIg1"}/>
                        {/**Θα μπορουσε και ανθρωπος */}

                    <Author rating={4} className={"col-md-6 mb-0 text-white"}
                                    userId={"VSGMmP7o4DWwimc0tZjHC02487B3"}/>



                        </div>

                    </div>
                </div>
            </section>

            {/**events */}
        </>
    );
};

export default Home;
