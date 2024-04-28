import React from "react";
import UserNav from "./UserNav";
import Footer from "./../footer/footer";
import Socials from "./../SocialMedia/socials";
import SocialBar from "./../../compoments/SocialMedia/socials";
import SpotifyBanner from "./../../compoments/SpotifyBanner/SpotifyBanner";
import Youtube from "./../../compoments/YoutubeAPI/Youtube";
import PrimaryCarousel from "./../PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "./../carousel/carousel";
const UserHome = () => {
  
  return (
    <>

      <UserNav />
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
        <img className="card-img-top shadow-lg img-fluid" src={"https://heavy-local.com/assets/AcidMammothSecond.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Interview: Acid Mammoth</h4>
          <a href="/Acid-Mammoth-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>
          <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={"https://heavy-local.com/assets/review_picture.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Interview: Khavar</h4>
          <a href="/Khavar-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>
          <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={"https://heavy-local.com/assets/Holler_Members.jpg"} alt="Disimulator"></img>
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
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/Hydra.jpg"} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Acid Mammoth:Review </h4>
          <a href="/article/Acid-mammoth_supersonic-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/Civerous.webp"} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Unleashing Eastern Metal Fury: Lethargy’s “Our Life Belongs to Us”</h4>
          <a href="/article/Lethargy-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100"  alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">TumulTum Project Review</h4>
          <a href="/article/tumultum-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

    <h4>Heavy Local Reviews (GR)</h4>
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



    <h3 className="m-2 p-3">Into the Darkness: A Chronicle of Underground for the Masses </h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
<img src={"https://heavy-local.com/assets/Astronomica_response.jpg"} className="img-fluid"></img>
      </div>

      <div className='col-md-6'>
        <p className="lead">
        In the depths of Quantic Pub, on the 5th and 6th of April 2024, the inaugural edition of the festival dedicated to Black Metal unfolded its wings: “Underground for the Masses”. Over the course of two nights, thirteen diverse bands from across Europe and beyond took to the stage, bringing with them a spectrum of Black Metal styles, from Classic to Suicidal, Atmospheric to Melodic, and Black Death Metal, among others. The air was thick with anticipation as the clock struck 18:00, marking the commencement of an auditory journey into the abyss.
        </p>
        <a className="btn btn-danger" href="/article/Undeground-for-the-masses_archive">Read More</a>
      </div>
    <hr className="bg-white"/>
    <h3 className="m-2 p-3">Anormoi X EN STIGMA</h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
      <img src={"https://heavy-local.com/assets/ANORMOI01.jpg"} className="img-fluid" />
      </div>

      <div className='col-md-6'>
        <p className="lead">
        Γενικώς για τη συγκεκριμένη βραδιά ένα έχω να πω: ενώ πίστευα πως είχα προετοιμαστεί σχετικά καλά για το τι θα παιζόταν, και πάλι αιφνιδιάστηκα.

Τη συναυλία άνοιξαν οι En-Stigma, μία folk progressive metal μπάντα με έδρα τα Ιωάννινα, που μας εντυπωσίασαν με τα ηλεκτρικά μπουζούκια τους και τα φωνητικά της Αίγλης.        </p>
        <a className="btn btn-danger" href="/article/Anorimoi-response-archive">Read More</a>
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
