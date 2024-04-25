import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import SocialBar from "../compoments/ShareBtns/SocialMediaBar";
import SpotifyBanner from "../compoments/SpotifyBanner/SpotifyBanner";
import Youtube from "../compoments/YoutubeAPI/Youtube";
import PrimaryCarousel from "../compoments/PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "../compoments/carousel/carousel";
const Home = () => {
  
  return (
    <>

      <Navigation />
      <header>

        <div className="container mt-4 main ">
          <div className="row text-center  p-3 m-2 shadow-lg">
            <div className="col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                  <h1 className="display-4">
                    Welcome to <span className="font-1">Heavy Local</span>{" "}
                  </h1>
                  <PrimaryCarousel />
                  <p className="lead">
                    Stay brutal and explore the unknown metal news, reviews, and
                    features!
                  </p>
                  <hr className="bg-dark" />
                  <Socials />
                  
                  <SocialBar/>
                  <hr className="bg-dark" />
                  <h5>Help us to grow </h5>
                   <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-50">Donate</a>
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
            <div className="col-md-12">
              <h3></h3>
            </div>
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container materialcontainer shadow-lg  p-5 rounded-4">
        <div className="row">
        <hr className="bg-white" />
        <Youtube />
        <hr className="bg-white" />
        <h3>Interviews:</h3>
         <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid Η" src={"/assets/AcidMammothSecond.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Interview: Acid Mammoth</h4>
          <a href="/Acid-Mammoth-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>
          <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={"/assets/review_picture.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Interview: Khavar</h4>
          <a href="/Khavar-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>
          <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={"/assets/Holler_Members.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Harmonic Rebirth: Deciphering Holler’s Journey          </h4>
         
          <a href="/Holler-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>

        </div>
  <h4>Heavy Local Reviews(ENG)</h4>
  <div className="row mt-4 text-center">
    <div className="col-md-6 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={"/assets/Hydra.jpg"} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Veins of Obsidian: Luctus' Hydra's Menacing Ode to Black Metal </h4>
          <a href="/article/Lyctus-hydra-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-6 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={"/assets/Civerous.webp"} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Band Review: Civerous</h4>
          <a href="/article/Civerous-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    
    <h4>Heavy Local Reviews (GR)</h4>
    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={"/assets/korrection.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Παλαιάς κοπής ανταρσία - KorrectioN - Having Fun (single review + info)</h4>
          <a href="/article/korrection-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={'/assets/Degenerate.jpg'} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Μια αμφίρροπη μάχη - Degenerate Mind - Nothing Left (single review)</h4>
          <a href="/article/degenerate-mind-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>



    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg  h-100" src={"/assets/Herc.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Βουτιά στην περιπέτεια του Silmarillion- Herc - “Of Light and Darkness” (album review)</h4>
          <a href="/article/Silmarillion-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>



    <h3 className="m-2 p-3">Ανταποκριση Astronomica x Dark Parrot x Sense of Fear live στα Ιωαννινα </h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
<img src={"/assets/Astronomica_response.jpg"} className="img-fluid"></img>
      </div>

      <div className='col-md-6'>
        <p className="lead">
        Οι openers Dark Parrot, Γιαννιώτες, φρέσκο αίμα στον χώρο του μέταλ, είναι τέσσερις νεαροί με μπόλικο μεράκι και ταλέντο να μοιράσουν. Ο Φίλιππος (φωνή), ο Νότης (κιθάρα και δεύτερη φωνή), ο Νίο (μπάσο) και ο Δημήτρης (ντραμς) έχουν έρθει υποσχόμενοι να ταρακουνήσουν, να ξεσηκώσουν και να κρατήσουν αναμμένη την φλόγα στη μέταλ σκηνή των Ιωαννίνων και της Ελλάδας ευρύτερα. Με χιούμορ και καλή διάθεση, ο Φίλιππος μας καλωσόρισε στο event, αναγνωρίζοντας πρώτη από όλους τη μητέρα του στο κοινό, πράγμα υπέροχο να βλέπει κανείς τους γονείς να στηρίζουν τα παιδιά τους στο μουσικό ταξίδι τους. Συνεχίζοντας, ερμήνευσαν κομμάτια alt / punk rock / nu metal ρεπερτορίου, συμπεριλαμβανομένων και δύο δικών τους κομματιών, δίνοντας μας μια γεύση για τις επόμενες κυκλοφορίες τους. Το κλίμα ήταν θερμό, με την ενέργεια των παιδιών στη σκηνή αλλά και με το εύθυμο χιούμορ και τα πειράγματα των μελών της μπάντας, ιδιαίτερα του Φιλίππου και του Νότη ενδιάμεσα από κάθε τραγούδι. Τα παιδιά έκλεισαν με ένα δικό τους αντιπολεμικό κομμάτι, όπως είπαν 'in the making', αντιμετωπίζοντας την επικαιρότητα. Στη συνέχεια, αφού μας χάρισαν μια υπέροχη εισαγωγή, παρέδωσαν τη σκυτάλη στους…        </p>
        <a className="btn btn-danger" href="/article/astronomica-response-archive">Read More</a>
      </div>

  </div>
</div>
      </header>
      <section className="live-chornicles">
        <div className="container">
          <h4>Live Chronicles by Daria (ENG)</h4>
          <div className="row text-center mt-4">
            <div className="col-md-6">
              <img src={"/assets/chronicles/chronicle-02/yothiria-02.jpg"} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h3>
                Chronicles of the Underworld Vol 2: Yoth Iria's Epic Odyssey at
                Psychosounds Festival
              </h3>
              <a
                href="/Chronicles_of_the_underworld_vol-2_archive"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <hr className="bg-dark"></hr>
      <section className="MetalLegends">
        <div className="container-fluid">
          <div className="row mt-4 text-center">
            <div className="col-md-12 mt-4">
              <h3 className="display-3 mt-5 p-5 text-white">
                Σήμερα Στο Legends
              </h3>
              <p className="lead text-white">
              Γιώργος Κόλλιας - Από τα “αλώνια” της Κορινθίας στην κορυφή της Extreme Metal
                        </p>
              <p className="lead text-white">
              Σήμερα στο Legends θα γίνει μια ιδιαίτερη μνεία για έναν drummer, έναν Έλληνα drummer που έχει φτάσει να ανήκει στο πάνθεον της μέταλ και δη της death, τον Γιώργο Κόλλια! Παρόλο που πρόκειται για έναν βετεράνο καλλιτέχνη και λίαν καταξιωμένο, πασίγνωστο σε όλη την υφήλιο στους χώρους της Extreme Metal 
              </p>
                            <a href="/legends-5-archive" className="btn btn-primary">
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
