import React from "react";
import AppNavigation from "../components/AppNav/AppNav";
import "./home.css";
import Socials from "../components/SocialMedia/socials";
import SpotifyBanner from "../components/SpotifyBanner/SpotifyBanner";
import PrimaryCarousel from "../components/PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "../components/carousel/carousel";
import CasterFmPlayer from "../components/Users/CasterFmPlayer";
import {getDownloadURL, ref} from "firebase/storage";
import Author from "./Authors/Author/Author";
import Footer from "../components/footer/footer";
import {NavLink} from "react-router-dom";

const Home = () => {



  return (
    <>
      <AppNavigation />
      <header>
        <div className="container mt-4 main ">
          <div className="row text-center  p-3 m-2 shadow-lg">
            <div className="col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                  <h1 className="display-4">
                    Welcome to{" "}
                    <span className="font-1">Pulse Of The Underground</span>{" "}
                  </h1>
                  <PrimaryCarousel />
                  <p className="lead">
                    Stay brutal and explore the unknown metal news, reviews, and
                    features!
                  </p>
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-5 bg-transparent">
        <div className="row text-white text-center">
          {/* Main Article Section */}
          <div className="col-md-8 ">
          <div className="CenterSection">
          <h2>Top News</h2>
          <h3>2024Akral Necrosis and Spinecrusher Live in Hidden (1/06/24)</h3>
          <img src="https://pulse-of-the-underground.com/assets/436109394_905826201552525_5669456048747792072_n.jpg" className="img-fluid w-75 rounded-2 m-2" />
          <p className="lead">
          On the evening of June 1st, 2024, Hidden – The Social Space from Bucharest transformed into a sanctum of metal, hosting an exclusive concert featuring two titans of the Romanian metal scene: Akral Necrosis and Spinecrusher. This event not only marked a monumental occasion for the Romanian underground movement but also celebrated a significant milestone for Akral Necrosis. The band members decided to release their first live album at the very place it was recorded, adding an extra layer of importance to the evening.
          </p>
              <NavLink to="/article/Akral-Necrosis-and-Spinecrusher-Live-in-Hidden-10624" className="btn btn-danger">Read More</NavLink>

            <hr className="bg-white"/>
            <h3>2024 Mindless Sinner X Marauder 25/5/24 @ Κύτταρο, Αθήνα</h3>
            <img src="https://pulse-of-the-underground.com/assets/20240525_232234.jpg" className="img-fluid w-75 rounded-2 m-2" />
            <p>
            Οι Σουηδοί heavy metallers Mindless Sinner, ήρθαν στη χώρα μας για μία και μοναδική εμφάνιση στην Αθήνα, με ποιότητα, συνέπεια, θετική ενέργεια και ήθος, ενώ οι έλληνες epic heavy metallers Marauder, έδωσαν τον καλύτερο εαυτό τους για να μας προθερμάνουν όσο καλύτερα μπορούσαν.

Αν και η βραδιά ξεκίνησε με καθυστέρηση (για άγνωστους λόγους), κανένας από τους παρευρισκόμενους δεν έδειξε ενοχλημένος, αφού κάθε χεβιμεταλλάς που σέβεται τον εαυτό του είναι πάντα έτοιμος για όλα.
</p> 
              <NavLink to="/article/Mindless-Sinner-X-Marauder-25524---" className="btn btn-danger">Read More</NavLink>
            <hr className="bg-white"/>
            <h3>Eldingar x Urza x Decemberance (25/05/24)</h3>

            <img src="https://pulse-of-the-underground.com/assets/decembrance.jpg" className="img-fluid w-75 rounded-2 m-2"/>
            <p>
            Δεύτερη φορά στο ιστορικό An Club στα Εξάρχεια των Αθηνών, αυτή την φορά για ανταπόκριση! Τα λόγια περιττεύουν όταν μπαίνεις σε αυτόν τον υπέροχο χώρο! Με ένα ποτήρι Captain Morgan για αρχή πήγα το Σάββατο αυτό σε ένα σκοτεινό, δυσοίωνο μα και ταυτόχρονα μελωδικό live! 4 σχεδόν ώρες ερέβους και ατμοσφαιρικών συνθέσεων με πρωταγωνιστές 3 underground έμπειρες μπάντες, τους Eldingar, τους Urza και τους Decemberance!</p> 
              <NavLink to="/article/TestEldingar-x-Urza-x-Decemberance-250524" className="btn btn-danger">Read More</NavLink>


            <hr className="bg-white"/>
            <h3>Thomas Libero’s Uplifting New Single “Questa Storia La Scrivo Io” Out Now</h3>
            <img src="https://pulse-of-the-underground.com/assets/Thomas_Libero.jpg" className="img-fluid w-75 h-75 rounded-2 m-2" />
            <p>
            Thomas Libero’s latest single, “Questa Storia La Scrivo Io” ("I Write My Own Story"), is now available on all streaming and digital download platforms. The track serves as a prelude to his highly anticipated album, “La Mia Guerra”, set to release in October 2024. Libero’s new single is a powerful anthem of self-actualization, designed to inspire listeners to overcome daily challenges and believe in their own potential.</p> 
              <NavLink to="/article/Thomas-Libero’s-Uplifting-New-Single-“Questa-Storia-La-Scrivo-Io”-Out-Now" className="btn btn-danger">Read More</NavLink>
            <hr className="bg-white"/>

            <h3>Delve into TumulTum Project Curtains </h3>
            <img src="https://heavy-local.com/assets/marwen.jpg" className="img-fluid w-75 h-75 rounded-2 m-2" />
            <p className="lead">
            TumulTum's journey is a testament to dedication, passion, and an unyielding commitment to artistic expression through the guitar. He is a courageous and distinctive guitarist who has been honing his craft for over 19 years. It is a thrilling opportunity.
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
                    "https://pulse-of-the-underground.com/assets/unnamed (2).jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Ποτέ μην τα παρατάς - O.Y.D. - Caving In (Single Review +band info)                                     </h4>
                  <NavLink to="/article/Ποτέ-μην-τα-παρατάς---OYD---Caving-In-Single-Review-band-info-"
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
                    "https://pulse-of-the-underground.com/assets/a2116733161_65.jpeg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  JEHOVAH ON DEATH - Goya's Witches (EP review) - Μια Βουτιά σε Σκοτεινές Εποχές                                     </h4>
                  <NavLink to="/article/JEHOVAH-ON-DEATH---Goyas-Witches-EP-review--------"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
             </div>
          </div>
            <hr />
            <h3>Latest Reviews(ENG)</h3>
            <hr className="bg-dark" />

             <div className="ReviewBox">
             <div className="col-md-4 m-2">
             <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100 "
                  src={
                    "https://pulse-of-the-underground.com/assets/441525811_10225432808742940_248116143813906946_n.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  NEW ALBUM: Eva Can’t Drops “Emisferi” — A Spectacular Quest in Sound </h4>
                  <NavLink to="/article/NEW-ALBUM-Eva-Cant-Drops-Emisferi--An-Epic-Journey-in-Sound"
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
                    "https://pulse-of-the-underground.com/assets/occult.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Cosmic Riffs and Smoky Dreams: “The Chained, The Burned, The Wounded”                  </h4>
                  <NavLink to="/article/Cosmic-Riffs-and-Smoky-Dreams-The-Chained-The-Burned-The-Wounded"
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
                    "https://pulse-of-the-underground.com/assets/264x264.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Infektum: Walking in the Path of Neue Deutsche Härte - A Band Review 
                  </h4>
                  <NavLink to="/article/Infektum-Walking-in-the-Path-of-Neue-Deutsche-Hrte---a-band-review-"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
             </div>
             
            

             </div>
             <hr className="bg-dark" />

             <h3>Latest Reviews(GRE)</h3>
             <hr className="bg-dark" />
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
                  Διασχίζοντας τις Κρύπτες του Σύμπαντος - Blasteroid - Crypts of Mind (Album Review)
                  </h4>
                  <NavLink to="/article/Διασχίζοντας-τις-Κρύπτες-του-Σύμπαντος---Blasteroid---Crypts-of-Mind-Album-Review"
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
                    "https://pulse-of-the-underground.com/assets/Noiz-Ritual-Band-1.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Ξετυλίγοντας την ψυχή - Noiz Ritual - Embrace The Noiz (EP review + band info)
                                    </h4>
                  <NavLink to="/article/Ξετυλίγοντας-την-ψυχή---Noiz-Ritual---Embrace-The-Noiz-(EP-review-+-band-info)"
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
                    "https://pulse-of-the-underground.com/assets/images.png"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Hard’n’ heavy  Blues - Rattlesquad - 1233 (album review + band info)                  </h4>
                  <NavLink to="/article/Hard’n’-heavy--Blues---Rattlesquad---1233-(album-review-+-band-info)"
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
                  INTERVIEW: Häxenzijrkell on the Mystical Origins and Evolution of Their Black Metal Sound                  </h4>
                  <NavLink to="/article/INTERVIEW:-Häxenzijrkell-on-the-Mystical-Origins-and-Evolution-of-Their-Black-Metal-Sound"
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
                  <NavLink to="/article/Demande-à-la-Poussière’s-Journey:-An-In-Depth-Conversation-on-Evolution,-Inspiration,-and-“Kintsugi”"
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
                  Exclusive Interview with Lethargy UA: Harmonizing Resilience and Melodic Might                  </h4>
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
                  INTERVIEW: Get to Know Thy Legion                  </h4>
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
                  Νέο βίντεο κλιπ από τους Meden Agan                  </h4>
                  <NavLink to="/article/Νέο-βίντεο-κλιπ-από-τους-Meden-Agan"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>

             </div>

            <ul className="list-unstyled">
              <li> <Socials /></li>
              <hr className="bg-white"/>

              <h3>Listen Our Radio</h3>
              <li><CasterFmPlayer /></li>
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

        </header>
       <section className="ExploreMore">
        <h2 className="text-center text-white">Explore More</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <h3 className="text-white">Artworks Gallery</h3>
            <hr className="bg-white" />
              <SecondaryCarousel />
            </div>
            <div className="col-md-12">
            <h3 className="text-white">Spotify Latest</h3>
            <hr className="bg-white" />
              <SpotifyBanner />
            </div>
            <div className="col-md-12">
              <h3 className="text-white">Meet the team</h3>
              </div>
              

          </div>
        </div>
        <section className="testinomial">
  <div class="row d-flex justify-content-center">
    <div class="col-md-10 col-xl-8 text-center">
      <h3 class="mb-4 text-white">Testimonials</h3>
    </div>
  </div>

            <div className="row text-center">


                <Author rating={4.5} className={"col-md-4 mb-5 mb-md-0"} userId={'uSXH49YHlzT8vjQ94ZuJTOz351m2'}/>

                <Author rating={5} className={"col-md-4 mb-5 mb-md-0"} userId={'gbK4OvgKbyYDfYCfIjboOqjA9Yv1'}/>

                <Author rating={4} className={"col-md-4 mb-0 text-white pb-2"} userId={'QY7GE8irSce3f4AFKW20DAWVxhr2'}/>



                <hr className="bg-white"/>

                <Author rating={4} className={"col-md-6 mb-0 text-white"} userId={"VSGMmP7o4DWwimc0tZjHC02487B3"}/>

                <Author rating={4} className={"col-md-6 mb-0 text-white"} userId={"YnKl6Fza8kcshY5rTlmeQZAokIg1"}/>




            </div>

        </section>
       </section>

        {/**events */}
    </>
  );
};

export default Home;
