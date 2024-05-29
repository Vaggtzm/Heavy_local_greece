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
                  <Socials />

                  <SocialBar />
                  <hr className="bg-dark" />
                  <h5>Help us to grow </h5>
                  <a
                    href="https://www.buymeacoffee.com/tzimasvagg7"
                    className="btn btn-primary w-50"
                  >
                    Donate
                  </a>
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <h3>Top realeases</h3>
              <SpotifyBanner />
              <hr className="bg-dark" />
            </div>

            <h3>Artworks Gallery</h3>
            <SecondaryCarousel />
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container materialcontainer shadow-lg  p-5 rounded-4">
          <div className="row">
            <hr className="bg-white" />
            <Youtube />
            <div className="jumbotron">
              <h1 className="display-1">Sponsored By Angels PR </h1>
              <hr className="bg-white" />
            </div>
            <h2>ENG:</h2>
            <hr className="bg-white" />

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid w-100"
                  src={"https://heavy-local.com/assets/a1146581693_10.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Gather Round Everyone, and Step Inside Pete Rafael’s
                    “Elysian Citadel”(ENG VERSION)
                  </h4>
                  <NavLink
                    to="/article/Gather-Round-Everyone,-and-Step-Inside-Pete-Rafael’s-“Elysian-Citadel”"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid"
                  src={"https://heavy-local.com/assets/A Lil Louder EP3000.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Aaron Kusterer’s “A Little Louder”: Where Guitar Magic
                    Happens(ENG VERSION)
                  </h4>
                  <NavLink
                    to="/article/Aaron-Kusterer’s-“A-Little-Louder”:-Where-Guitar-Magic-Happens"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid"
                  src={
                    "https://heavy-local.com/assets/8f7067ea-e3cf-491b-b15e-c81460440c04.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Resilience in Sound: Dark Sky’s Latest Artistic Statement
                    “Signs of the Time” Unveiled(ENG VERSION)
                  </h4>
                  <NavLink
                    to="/article/Resilience-in-Sound:-Dark-Sky’s-Latest-Artistic-Statement-“Signs-of-the-Time”-Unveiled"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-6 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid w-100"
                  src={"https://heavy-local.com/assets/COVER FINAL.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Panic Chaos War - Medusa’s Wrath - Pavor Exilium Mors (album
                    review - ENG VERSION)
                  </h4>
                  <NavLink
                    to="/article/Panic-Chaos--War---Medusa’s-Wrath---Pavor-Exilium-Mors-(album-review)"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-6 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid w-100"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fimg_3_1716221383584.webp?alt=media&token=ee0160a5-01fc-4dac-86ab-f96e929a2de9"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Meden Agan - My name is Katherine(ENG VERSION)
                  </h4>
                  <NavLink to="/article/Meden-Agan" className="btn btn-primary">
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            <hr className="bg-white" />

            <h2>GREEK:</h2>
            <hr className="bg-white" />
            <div className="col-md-6  p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid w-100 h-100"
                  src={"https://pulse-of-the-underground.com/assets/a0404193695_16.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Vosar Strikes Back - Forbidden Myth - Zantea Chronicles: The Nightmare Awakens (Album Review)                  </h4>
                  <NavLink
                    to="/article/Vosar-Strikes-Back---Forbidden-Myth---Zantea-Chronicle-The-Nightmare-Awakens-Album-Review"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-6 pb-3">
              <div className="card h-100 w-100">
                <img
                  className=" shadow-lg img-fluid w-100 h-100 card-img-top"
                  src={
                    "https://pulse-of-the-underground.com/assets/a2116733161_65.jpeg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    JEHOVAH ON DEATH - Goya's Witches (EP review) - Μια Βουτιά
                    σε Σκοτεινές Εποχές{" "}
                  </h4>
                  <NavLink
                    to="/article/JEHOVAH-ON-DEATH---Goyas-Witches-EP-review--------"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid w-100"
                  src={"https://heavy-local.com/assets/COVER FINAL.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Πανικός Χάος Πόλεμος - Medusa’s Wrath - Pavor Exilium Mors
                    (album review - GREEK VERSION)
                  </h4>
                  <NavLink
                    to="/article/Πανικός-Χάος--Πόλεμος---Medusa’s-Wrath---Pavor-Exilium-Mors-(album-review)"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid w-100"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fimg_3_1716221383584.webp?alt=media&token=ee0160a5-01fc-4dac-86ab-f96e929a2de9"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Meden Agan – My name is Katherine: Η ιστορία μιας αθώας
                    ψυχής που κοίταξε στα μάτια τους δαίμονες του παρελθόντος
                    της(GREEK VERSION)
                  </h4>
                  <NavLink
                    to="/article/Meden-Agan-–-My-name-is-Katherine -Η-ιστορία-μιας-αθώας-ψυχής-που-κοίταξε-στα-μάτια-τους-δαίμονες-του-παρελθόντος-της"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid"
                  src={"https://heavy-local.com/assets/A Lil Louder EP3000.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Aaron Kusterer’s “A Little Louder”: Where Guitar Magic
                    Happens(GREEK VERSION)
                  </h4>
                  <NavLink
                    to="/article/Aaron-Kusterer’s-“A-Little-Louder”:-Where-Guitar-Magic-Happens-Greek"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid"
                  src={
                    "https://heavy-local.com/assets/8f7067ea-e3cf-491b-b15e-c81460440c04.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Resilience in Sound: Dark Sky’s Latest Artistic Statement
                    “Signs of the Time” Unveiled(GREEK VERSION)
                  </h4>
                  <NavLink
                    to="/article/Resilience-in-Sound:-Dark-Sky’s-Latest-Artistic-Statement-“Signs-of-the-Time”-Unveiled(GREEK-VERSION)"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg img-fluid"
                  src={"https://pulse-of-the-underground.com/assets/SOCIAL.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Μια φουτουριστική άγρια γη - Project Renegade - Ultra Terra
                    (album review)
                  </h4>
                  <NavLink
                    to="https://pulse-of-the-underground.com/article/%CE%9C%CE%B9%CE%B1-%CF%86%CE%BF%CF%85%CF%84%CE%BF%CF%85%CF%81%CE%B9%CF%83%CF%84%CE%B9%CE%BA%CE%AE-%CE%AC%CE%B3%CF%81%CE%B9%CE%B1-%CE%B3%CE%B7---Project-Renegade---Ultra-Terra-(album-review)"
                    className="btn btn-primary"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>

            <hr className="bg-white" />
            <div className="jumbotron">
              <h1 className="display-3">
                Pulse Of The Undeground:Web Radio{" "}
                <span>
                  <CasterFmPlayer />
                </span>
              </h1>
            </div>
            <hr className="bg-white" />
            <h3>Interviews:</h3>
            <div className="col-md-6 pb-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/Capture d'écran 2024-05-23 135957.png"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    INTERVIEW: Unmasking the Shadows with Ayyur
                  </h4>
                  <a
                    href="/article/Unmasking-the-Shadows"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 pb-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/DALP - logo.jpg"
                  }
                  alt="Disimulator"
                ></img>
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
            <div className="col-md-4">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/Animamortua Band Photo.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">Animamortua:Interview</h4>
                  <a href="/article/Animamortua" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/hemplifier.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    INTERVIEW: A Discussion with Hemplifier
                  </h4>
                  <a
                    href="/article/INTERVIEW:-A-Discussion-with-Hemplifier"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/435569225_813204937499166_5120930457689830732_n.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Exclusive Interview with Lethargy UA: Harmonizing Resilience
                    and Melodic Might
                  </h4>
                  <a
                    href="/article/Exclusive Interview with Lethargy UA: Harmonizing Resilience and Melodic Might"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-12 p-3">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={"https://pulse-of-the-underground.com/assets/images.jpg"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    INTERVIEW: Get to Know Thy Legion
                  </h4>
                  <a
                    href="/article/INTERVIEW -Get-to-Know-Thy-Legion"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h4> Reviews(ENG)</h4>
          <div className="row mt-4 text-center">
            <div className="col-md-6 pb-3 ">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top  h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/a2181404431_65.jpeg"
                  }
                  alt="Dreariness"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Nimbifer: Reviving the Raw Style - band review{" "}
                  </h4>
                  <a
                    href="/article/Nimbifer:-Reviving-the-Raw-Style---band-review"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 pb-3 ">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top  h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/Thomas_Libero.jpg"
                  }
                  alt="Dreariness"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Thomas Libero’s Uplifting New Single “Questa Storia La
                    Scrivo Io” Out Now{" "}
                  </h4>
                  <a
                    href="/article/Thomas-Libero’s-Uplifting-New-Single-“Questa-Storia-La-Scrivo-Io”-Out-Now"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top  h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/438146560_122106913652303851_8313006724310594386_n.jpg"
                  }
                  alt="Dreariness"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  The Battle of Good vs. Evil in Metal Form: “Immortal King” Reviewed{" "}
                  </h4>
                  <a
                    href="/article/The-Battle-of-Good-vs.-Evil-in-Metal-Form:-“Immortal-King”-Reviewed"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/a4286966306_65.jpeg"
                  }
                  alt="Zong"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Hoth - Oathbreaker (Album Review) - Star Wars Tales Told with Ominous Melodies
                    {" "}
                  </h4>
                  <a
                    href="/article/Hoth---Oathbreaker-album-review---Star-Wars-Tales-Told-With-Ominous-Melodies"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 w-100">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/marwen.jpg"
                  }
                  alt="Zong"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Delve into TumulTum Project Curtains{" "}
                  </h4>
                  <a
                    href="/article/Delve-into-TumulTum-Project-curtains"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <h4>Reviews (GR)</h4>
            <div className="col-md-4">
              <div className="card h-100 w-100 review-card">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/a3257823541_16.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Διασχίζοντας τις Κρύπτες του Σύμπαντος - Blasteroid - Crypts of Mind (Album Review){" "}
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

            <div className="col-md-4">
              <div className="card h-100 w-100 review-card">
                <img
                  className="card-img-top shadow-lg h-100"
                  src={
                    "https://pulse-of-the-underground.com/assets/Noiz-Ritual-Band-1.jpg"
                  }
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Ξετυλίγοντας την ψυχή - Noiz Ritual - Embrace The Noiz (EP
                    review + band info)
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

            <div className="col-md-4">
              <div className="card h-100 w-100 review-card">
                <img
                  className="card-img-top shadow-lg  h-100"
                  src={"https://pulse-of-the-underground.com/assets/images.png"}
                  alt="Disimulator"
                ></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Hard’n’ heavy Blues - Rattlesquad - 1233 (album review +
                    band info)
                  </h4>
                  <a
                    href="/article/Hard’n’-heavy--Blues---Rattlesquad---1233-(album-review-+-band-info)"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <hr className="bg-white" />
            <h3>Events:</h3>
            <hr className="bg-white" />
            <h3>2024 Mindless Sinner X Marauder 25/5/24 @ Κύτταρο, Αθήνα</h3>
            <div className="col-md-6">
              <img
                src={
                  "https://pulse-of-the-underground.com/assets/20240525_232234.jpg"
                }
                className="img-fluid m-2 p-1"
              />
            </div>
            <div className="col-md-6">
              <p className="lead">
              Οι Σουηδοί heavy metallers Mindless Sinner, ήρθαν στη χώρα μας για μία και μοναδική εμφάνιση στην Αθήνα, με ποιότητα, συνέπεια, θετική ενέργεια και ήθος, ενώ οι έλληνες epic heavy metallers Marauder, έδωσαν τον καλύτερο εαυτό τους για να μας προθερμάνουν όσο καλύτερα μπορούσαν.

Αν και η βραδιά ξεκίνησε με καθυστέρηση (για άγνωστους λόγους), κανένας από τους παρευρισκόμενους δεν έδειξε ενοχλημένος, αφού κάθε χεβιμεταλλάς που σέβεται τον εαυτό του είναι πάντα έτοιμος για όλα.                   {" "}
              </p>
              <a
                className="btn btn-danger m-2"
                href="/article/Mindless-Sinner-X-Marauder-25524---"
              >
                Read More
              </a>
            </div>


            <hr className="bg-white" />

            <h3>Eldingar x Urza x Decemberance (25/05/24)</h3>
            <div className="col-md-6">
              <img
                src={
                  "https://pulse-of-the-underground.com/assets/CV_EN.pdf"
                }
                className="img-fluid"
              />
            </div>

            <div className="col-md-6">
              <p className="lead">
              Δεύτερη φορά στο ιστορικό An Club στα Εξάρχεια των Αθηνών, αυτή την φορά για ανταπόκριση! Τα λόγια περιττεύουν όταν μπαίνεις σε αυτόν τον υπέροχο χώρο! Με ένα ποτήρι Captain Morgan για αρχή πήγα το Σάββατο αυτό σε ένα σκοτεινό, δυσοίωνο μα και ταυτόχρονα μελωδικό live! 4 σχεδόν ώρες ερέβους και ατμοσφαιρικών συνθέσεων με πρωταγωνιστές 3 underground έμπειρες μπάντες, τους Eldingar, τους Urza και τους Decemberance!
                   {" "}
              </p>
              <a
                className="btn btn-danger m-2"
                href="/article/TestEldingar-x-Urza-x-Decemberance-250524"
              >
                Read More
              </a>
            </div>
            <hr className="bg-white" />


            <h3>Tempted x Spellbound x Khirki (18/05/24)</h3>
            <div className="col-md-6">
              <img
                src={
                  "https://heavy-local.com/assets/437653253_1019652299623299_8618193590206532236_n.jpg"
                }
                className="img-fluid"
              />
            </div>

            <div className="col-md-6">
              <p className="lead">
                Σάββατο και τι καλύτερο από ένα βραδινό live στα ανοιξιάτικα
                Γιάννινα! Πήγαμε στο Studio 203 δίπλα από την Παμβώτιδα για μια
                πραγματικά υπέροχη rock βραδιά στην οποία υπό την αιγίδα της
                Bullet Productions έπαιξαν τρεις πολλά υποσχόμενες μπάντες! Οι
                Γιαννιώτες Tempted και Spellbound έδωσαν το έναυσμα και οι
                Αθηναίοι Khirki την ολοκλήρωσαν με απόλυτη επιτυχία! Οι πόρτες
                άνοιξαν στις 8:30, το live ξεκίνησε στις 9:15 και στις 12:30
                περίπου τελείωσε! Ο χώρος του Studio 203 γέμισε και το κλίμα
                ήταν ζεστό και οικογενειακό ενώ ο ήχος του χώρου πεντακάθαρος
                Πάμε να δούμε τις μπάντες μας! .{" "}
              </p>
              <a
                className="btn btn-danger"
                href="/article/Tempted-x-Spellbound-x-Khirki-(18-05-24)"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </header>
      <hr className="bg-dark"></hr>
      <section className="MetalLegends">
        <div className="container-fluid">
          <div className="row mt-4 text-center">
            <div className="col-md-12 mt-4">
              <h3 className="display-3 mt-5 p-5 text-white">
                Σήμερα Στο Legends
              </h3>
              <p className="lead text-white">
                Αγαπάτε τα άτομα με ειδικές ανάγκες - Ask Tomorrow - Special Kid{" "}
              </p>
              <a
                href="/article/Αγαπάτε-τα-άτομα-με-ειδικές-ανάγκες---Ask-Tomorrow---Special-Kid"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
