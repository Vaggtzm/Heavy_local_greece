import React from "react";
import Footer from "./../footer/footer";
import Socials from "./../SocialMedia/socials";
import SocialBar from "../SocialMedia/socials";
import AppNavigation from "../AppNav/AppNav";
import SpotifyBanner from "../SpotifyBanner/SpotifyBanner";
import Youtube from "../YoutubeAPI/Youtube";
import PrimaryCarousel from "./../PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "./../carousel/carousel";
import CasterFmPlayer from "./CasterFmPlayer";
const UserHome = () => {
  
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
                    Welcome to <span className="font-1">Pulse Of The Underground</span>{" "}
                  </h1>
                  <PrimaryCarousel />
                  <p className="lead">
                    Stay brutal and explore the unknown metal news, reviews, and
                    features!
                  </p>
                  <hr className="bg-dark" />
                  <Socials />
                  
                  <hr className="bg-dark" />
                  <div className="col-md-12">
            <h3>Our Radio Station:</h3>
              <CasterFmPlayer />
              <hr className="bg-dark" />
            </div>
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>Early Bird realeses</h3>
                </div>
                <div className="col-md-4">
                <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/SuperHorror.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">R’n’R απ’το μνήμα - Superhorror - Church of I.D.G.A.F. (single review)</h4>
          <a href="/article/RNR-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>

                </div>
                <div className="col-md-4">
                <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/NightPleasure.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Single Review: Night Pleasure Hotel Reveals Heartfelt “Niko”</h4>
          <a href="/article/Night-pleasure-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>

                </div>
                <div className="col-md-4">
                <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/kokkinia2.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Το Μιαρό Δέντρο - Kokkinià - Arboreal (single review+band info)</h4>
          <a href="/article/KOKKINIA-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>

                </div>

              </div>
            </div>
            <h3>Artworks Gallery</h3>
            <SecondaryCarousel />
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container materialcontainer shadow-lg  p-5 rounded-4">
        <div className="row">

        </div>
  <h4>Regular Stream</h4>
  <div className="row mt-4 text-center">
  <div className="col-md-6 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/Hydra.jpg"} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Veins of Obsidian: Luctus' Hydra's Menacing Ode to Black Metal </h4>
          <a href="/article/Lyctus-hydra-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-6 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/Civerous.webp"} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Unleashing Eastern Metal Fury: Lethargy’s “Our Life Belongs to Us”</h4>
          <a href="/article/Lethargy-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/korrection.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Παλαιάς κοπής ανταρσία - KorrectioN - Having Fun (single review + info)</h4>
          <a href="/article/korrection-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={'https://heavy-local.com/assets/Degenerate.jpg'} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Μια αμφίρροπη μάχη - Degenerate Mind - Nothing Left (single review)</h4>
          <a href="/article/degenerate-mind-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>



    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg  h-100" src={"https://heavy-local.com/assets/Herc.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Βουτιά στην περιπέτεια του Silmarillion- Herc - “Of Light and Darkness” (album review)</h4>
          <a href="/article/Silmarillion-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

  </div>
</div>
      </header>
      <section className="live-chornicles">
        <div className="container">
          <h4>Live Chronicles by Daria (ENG)</h4>
          <div className="row text-center mt-4">
            <div className="col-md-6">
              <img src={"https://heavy-local.com/assets/chronicles/chronicle-02/yothiria-02.jpg"} className="img-fluid" />
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

export default UserHome;
