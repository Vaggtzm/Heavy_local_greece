import React, { useEffect, useState } from "react";
import "./home.css";
import Socials from "../components/SocialMedia/socials";
import SpotifyBanner from "../components/SpotifyBanner/SpotifyBanner";
import PrimaryCarousel from "../components/PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "../components/carousel/carousel";
import CasterFmPlayer from "../components/Users/CasterFmPlayer";
import Author from "./Authors/Author/Author";
import {NavLink} from "react-router-dom";
import AutoMusic from "../components/AutoMusic/AutoMusic";

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
    }, [scrolled]);         return (
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
                            <Socials/>
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
                                <h3>Blind Sun x Rattlesquad x WiderSin (07/06/24)</h3>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F7JuneIlion_800x800.jpg?alt=media&token=fbbceafd-78f6-4c43-a724-77b3316917f2"
                                    className="img-fluid w-75 rounded-2 m-2"/>
                                <p className="lead">
                                Μπαίνει ζεστά το καλοκαίρι με τον καύσωνα να αγγίζει κόκκινα και πήγαμε σε ένα μικρό live όαση στο ΙΛΙΟΝ Plus την Παρασκευή δίπλα από το Πεδίο του Άρεως στην Αθήνα, σε ένα μικρό live στο οποίο για ένα τετράωρο σχεδόν δόθηκε κατάθεση ψυχής από όλους τους συμμετέχοντες! Φτάνει 9 το βράδυ και περνάμε τις πόρτες του venue. Πρώτη παρατήρηση; Ένας χώρος μικρός και παράλληλα άνετος και με καταπληκτικό ήχο! Κόσμος; Λίγος και καλός! Μακάρι να ήταν περισσότερος, αλλά και αυτός που ήταν ήταν θερμός, δημιουργώντας έτσι με τον τρόπο του ένα οικείο και φιλόξενο κλίμα! Πάμε να δούμε την βραδιά και τους συμμετέχοντες!
                                </p>
                                <NavLink to="https://pulse-of-the-underground.com/article/Blind-Sun-x-Rattlesquad-x-WiderSin-070624"
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
                            <br/>
                                <div className="col-md-6 m-2">
                                    <div className="card h-100 w-100">
                                        <img
                                            className="card-img-top shadow-lg h-100 "
                                            src={
                                                "https://pulse-of-the-underground.com/assets/Dark_Sky.jpg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            SINGLE REVIEW: Dark Sky’s "Forgiveness" — A Soulful Cry for Justice
                                            </h4>
                                            <NavLink
                                                to="https://pulse-of-the-underground.com/article/SINGLE-REVIEW:-Dark-Skys-%22Forgiveness%22--A-Soulful-Cry-for-Justice"
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
                                                "https://pulse-of-the-underground.com/assets/a1198068602_65.jpeg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            ALBUM REVIEW: Lilita Arndt’s “When the Darkness Comes” Delivers Unyielding Intensity
                                            </h4>
                                            <NavLink
                                                to="/article/ALBUM-REVIEW-Lilita-Arndts-When-the-Darkness-Comes-Delivers-Unyielding-Intensity"
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
                                                "https://pulse-of-the-underground.com/assets/Necrovile.jpg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            ALBUM REVIEW: Necrovile’s “Engorging the Devourmental Void” — A Death Metal Masterpiece                                            </h4>
                                            <NavLink
                                                to="/article/ALBUM-REVIEW-Necroviles-Engorging-the-Devourmental-Void--A-Death-Metal-Masterpiece"
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
                                                "https://pulse-of-the-underground.com/assets/Of_the_Muses.jpeg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            ALBUM REVIEW: “Senhal” by Of the Muses Delivers an Emotional Odyssey
                                            </h4>
                                            <NavLink
                                                to="/article/ALBUM-REVIEW-Senhal-by-Of-the-Muses-Delivers-an-Emotional-Odyssey"
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
                                                "https://pulse-of-the-underground.com/assets/a3346669757_16.jpg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            Μαγεία και Σαγόνια - Asasara - The Jaws of Life (Single Review + band Info)                                            </h4>
                                            <NavLink
                                                to="/article/-----Asasara---The-Jaws-of-Life-(Single-Review-+-band-Info)"
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
                                                "https://pulse-of-the-underground.com/assets/a2954421661_16.jpg"
                                            }
                                            alt="Disimulator"
                                        ></img>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            Μελωδικά Άχθη - REZN - Burden (Album Review + band info)                                             </h4>
                                            <NavLink
                                                to="/article/----REZN---Burden-(Album-Review-+-band-info)-"
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
                            <div className="col-md-12 m-2">
                                <div className="card h-100 w-100">
                                    <div className="card-body">
                                        <h4 className="card-title">
                                        Dreamer (22 years anniversary) </h4>
                                        <NavLink to="/article/Dreamer-22-years-anniversary"
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
                                <hr className="bg-white"/>

                                <li>
                                  <AutoMusic />

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


                            <Author rating={4.5} className={"col-md-4 mb-5 mb-md-0"}
                                    userId={'uSXH49YHlzT8vjQ94ZuJTOz351m2'}/>

                            <Author rating={5} className={"col-md-4 mb-5 mb-md-0"}
                                    userId={'gbK4OvgKbyYDfYCfIjboOqjA9Yv1'}/>

                            <Author rating={4} className={"col-md-4 mb-5 text-white pb-2"}
                                    userId={'QY7GE8irSce3f4AFKW20DAWVxhr2'}/>


                            <hr className="bg-white"/>

                            <Author rating={4} className={"col-md-6 mb-5 text-white"}
                                    userId={"2219SdmiZHagjXDqmqDlBZ84mn22"}/>

                            <Author rating={4} className={"col-md-6 mb-5 text-white"}
                                    userId={"mmQTo2rdEDZ7YsnpJn15gCuaWz93"}/>
                            <hr className="bg-white"/>

                            <Author rating={4} className={"col-md-6 mb-0 text-white"}
                                    userId={"VSGMmP7o4DWwimc0tZjHC02487B3"}/>

                            <Author rating={4} className={"col-md-6 mb-0 text-white"}
                                    userId={"YnKl6Fza8kcshY5rTlmeQZAokIg1"}/>

                        </div>

                    </div>
                    
                </div>
            </section>

            {/**events */}
        </>
    );
};

export default Home;
