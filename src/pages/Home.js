import React from "react";
import AppNavigation from "../components/AppNav/AppNav";
import "./home.css";
import Footer from "../components/footer/footer";
import Socials from "../components/SocialMedia/socials";
import SocialBar from "../components/ShareBtns/SocialMediaBar";
import SpotifyBanner from "../components/SpotifyBanner/SpotifyBanner";
import Youtube from "../components/YoutubeAPI/Youtube";
import PrimaryCarousel from "../components/PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "../components/carousel/carousel";
import CasterFmPlayer from "../components/Users/CasterFmPlayer";
import { NavLink } from "react-router-dom";

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
          <a href="/article/Akral-Necrosis-and-Spinecrusher-Live-in-Hidden-10624" className="btn btn-danger">Read More</a>

            <hr className="bg-white"/>
            <h3>2024 Mindless Sinner X Marauder 25/5/24 @ Κύτταρο, Αθήνα</h3>
            <img src="https://pulse-of-the-underground.com/assets/20240525_232234.jpg" className="img-fluid w-75 rounded-2 m-2" />
            <p>
            Οι Σουηδοί heavy metallers Mindless Sinner, ήρθαν στη χώρα μας για μία και μοναδική εμφάνιση στην Αθήνα, με ποιότητα, συνέπεια, θετική ενέργεια και ήθος, ενώ οι έλληνες epic heavy metallers Marauder, έδωσαν τον καλύτερο εαυτό τους για να μας προθερμάνουν όσο καλύτερα μπορούσαν.

Αν και η βραδιά ξεκίνησε με καθυστέρηση (για άγνωστους λόγους), κανένας από τους παρευρισκόμενους δεν έδειξε ενοχλημένος, αφού κάθε χεβιμεταλλάς που σέβεται τον εαυτό του είναι πάντα έτοιμος για όλα.
</p> 
            <a href="/article/Mindless-Sinner-X-Marauder-25524---" className="btn btn-danger">Read More</a>
            <hr className="bg-white"/>
            <h3>Eldingar x Urza x Decemberance (25/05/24)</h3>

            <img src="https://pulse-of-the-underground.com/assets/decembrance.jpg" className="img-fluid w-75 rounded-2 m-2"/>
            <p>
            Δεύτερη φορά στο ιστορικό An Club στα Εξάρχεια των Αθηνών, αυτή την φορά για ανταπόκριση! Τα λόγια περιττεύουν όταν μπαίνεις σε αυτόν τον υπέροχο χώρο! Με ένα ποτήρι Captain Morgan για αρχή πήγα το Σάββατο αυτό σε ένα σκοτεινό, δυσοίωνο μα και ταυτόχρονα μελωδικό live! 4 σχεδόν ώρες ερέβους και ατμοσφαιρικών συνθέσεων με πρωταγωνιστές 3 underground έμπειρες μπάντες, τους Eldingar, τους Urza και τους Decemberance!</p> 
            <a href="/article/TestEldingar-x-Urza-x-Decemberance-250524" className="btn btn-danger">Read More</a>


            <hr className="bg-white"/>
            <h3>Thomas Libero’s Uplifting New Single “Questa Storia La Scrivo Io” Out Now</h3>
            <img src="https://pulse-of-the-underground.com/assets/Thomas_Libero.jpg" className="img-fluid w-75 h-75 rounded-2 m-2" />
            <p>
            Thomas Libero’s latest single, “Questa Storia La Scrivo Io” ("I Write My Own Story"), is now available on all streaming and digital download platforms. The track serves as a prelude to his highly anticipated album, “La Mia Guerra”, set to release in October 2024. Libero’s new single is a powerful anthem of self-actualization, designed to inspire listeners to overcome daily challenges and believe in their own potential.</p> 
            <a href="/article/Thomas-Libero’s-Uplifting-New-Single-“Questa-Storia-La-Scrivo-Io”-Out-Now" className="btn btn-danger">Read More</a>
            <hr className="bg-white"/>

            <h3>Delve into TumulTum Project Curtains </h3>
            <img src="https://heavy-local.com/assets/marwen.jpg" className="img-fluid w-75 h-75 rounded-2 m-2" />
            <p className="lead">
            TumulTum's journey is a testament to dedication, passion, and an unyielding commitment to artistic expression through the guitar. He is a courageous and distinctive guitarist who has been honing his craft for over 19 years. It is a thrilling opportunity.
            </p>
            <a href="/article/tumultum-archive" className="btn btn-danger">Read More</a>
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
                  <a
                    href="/article/Ποτέ-μην-τα-παρατάς---OYD---Caving-In-Single-Review-band-info-"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/JEHOVAH-ON-DEATH---Goyas-Witches-EP-review--------"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/NEW-ALBUM-Eva-Cant-Drops-Emisferi--An-Epic-Journey-in-Sound"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Cosmic-Riffs-and-Smoky-Dreams-The-Chained-The-Burned-The-Wounded"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Infektum-Walking-in-the-Path-of-Neue-Deutsche-Hrte---a-band-review-"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Διασχίζοντας-τις-Κρύπτες-του-Σύμπαντος---Blasteroid---Crypts-of-Mind-Album-Review"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Ξετυλίγοντας-την-ψυχή---Noiz-Ritual---Embrace-The-Noiz-(EP-review-+-band-info)"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Hard’n’-heavy--Blues---Rattlesquad---1233-(album-review-+-band-info)"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/INTERVIEW:-Häxenzijrkell-on-the-Mystical-Origins-and-Evolution-of-Their-Black-Metal-Sound"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Demande-à-la-Poussière’s-Journey:-An-In-Depth-Conversation-on-Evolution,-Inspiration,-and-“Kintsugi”"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Animamortua"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Exclusive-Interview-with-Lethargy-UA:-Harmonizing-Resilience-and-Melodic-Might"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/INTERVIEW -Get-to-Know-Thy-Legion"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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
                  <a
                    href="/article/Νέο-βίντεο-κλιπ-από-τους-Meden-Agan"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
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

  <div class="row text-center">
    <div class="col-md-4 mb-5 mb-md-0">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/profile_images%2FuSXH49YHlzT8vjQ94ZuJTOz351m2_600x600?alt=media&token=790b5543-cfdf-4855-b9e6-0ad90c7c92ca"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3 text-white">Daniela Palaiochorinou </h5>
      <h6 class="text-primary mb-3 text-white">Translator</h6>
      <p class="px-xl-3 text-white">
        <i class="fas fa-quote-left pe-2">
        </i>My name is Daniela, I am a half Greek and half Italian who lives in Thessaloniki. I studied Italian language & literature and obtained an advanced degree in translation studies. Professionally, I am a full-time back office agent in Teleperformance, and a part time teacher of Italian and translator. My hobbies include bellydancing, writing poetry, reading, creating YouTube playlists and AI artworks .
      </p>
      <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star-half-alt fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
    <div class="col-md-4 mb-5 mb-md-0">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/profile_images%2FgbK4OvgKbyYDfYCfIjboOqjA9Yv1_800x800?alt=media&token=cb71bba5-db24-4b99-af3d-a9ea3ecc3742"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3 text-white">Daria "Aeonia" Bratu</h5>
      <h6 class="text-primary mb-3 text-white">Chief Editor "ENG TEAM"</h6>
      <p class="px-xl-3 text-white">
        <i class="fas fa-quote-left pe-2 text-white"></i>
        Hailing from Bucharest, Romania, I'm a multi-disciplinary being fascinated by the convergence of geography and journalism. I pursued my academic interests concurrently, as both a visiting student at the University of Cambridge and a Ph.D. candidate in Geography at the University of Bucharest. Additionally, I hold degrees in Journalism from the Faculty of Journalism and Mass Communication Studies.

For over a decade, I've been deeply immersed in the underground metal scene, actively writing about bands and albums while attending countless events.
      </p>
      <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
    <div class="col-md-4 mb-0 text-white pb-2">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/profile_images%2FQY7GE8irSce3f4AFKW20DAWVxhr2_600x600?alt=media&token=f8946065-4188-4fae-b646-53bf179936f7"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3 text-white">	Michalis "Scholasticus"Antonopoulos </h5>
      <h6 class="text-primary mb-3 text-white">Chief Editor "GRE TEAM"</h6>
      <p class="px-xl-3 text-white">
        <i class="fas fa-quote-left pe-2 text-white"></i>
      </p>
      <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="far fa-star fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
    <hr className="bg-white"/>
    <div class="col-md-6 mb-0 text-white">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/profile_images%2FYnKl6Fza8kcshY5rTlmeQZAokIg1?alt=media&token=61697f62-4856-4eef-aab4-9083ff7136ba"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3 text-white">	Vaggelis Tzimas </h5>
      <h6 class="text-primary mb-3 text-white">Administrator/Project Owner</h6>
      <p class="px-xl-3 text-white">
        <i class="fas fa-quote-left pe-2 text-white"></i>Born and raised in Crete, I relocated to Ioannina, Greece at the tender age of 12. This move marked the start of my lifelong engagement with music and technology, beginning with my study of the guitar at a local music school. Upon completing my secondary education, I pursued further studies in Computer Engineering at a prestigious community college. It was during this formative period that my interest in programming and web development began to flourish. Today, I am proud to hold the position of a computer technician, supplemented by my ongoing education in programming
      </p>
      <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="far fa-star fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
    <div class="col-md-6 mb-0 text-white">
      <div class="d-flex justify-content-center mb-4">
        <img src={"https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/profile_images%2FVSGMmP7o4DWwimc0tZjHC02487B3_600x600?alt=media&token=f315cd30-ad6f-4876-875e-d4ca72c15e58"} className="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3 text-white">Porfanid </h5>
      <h6 class="text-primary mb-3 text-white">Developer/Co-Admin</h6>
        <p class="px-xl-3 text-white">
            <i className="fas fa-quote-left pe-2 text-white"></i>
            I am a student at the Computer Science Engineering department at the University of Ioannina. I am programming apps since I was a little kid and I have made a lot of projects.

            I have worked in many different programming languages.

            I started learning Fortran because that was what my father could teach me. Then I moved on to bash,html, css and javascript, when I created my first web site what I was in junior highschool since I wanted the server to update on its own without me having to do it manually. After that I started programming a few apps on .NET.
            <i className="fas fa-quote-right pe-2 text-white"></i>
        </p>
        <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="fas fa-star fa-sm text-warning"></i>
        </li>
        <li>
          <i class="far fa-star fa-sm text-warning"></i>
        </li>
      </ul>
    </div>
  </div>
  
</section>
       </section>

        {/**events */}
    </>
  );
};

export default Home;
