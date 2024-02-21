import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import AcidMammoth from './../assets/AcidMammoth_main.jpg';
import ThyDarkenedShade from './../assets/thyDarkenedShade01.jpg';
import ADE from './../assets/ADE01.jpg';
import Yothiria from "./../assets/chronicles/chronicle-02/yothiria-02.jpg";
import Contact from "../compoments/ContactForm/contact";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import Carousel from "./../compoments/carousel/carousel";
import Notification from "../compoments/messaging/Message";
const Home = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <header>

        <div className="container mt-4">
          <div className="row text-center bg-secondary p-3 m-2 shadow-lg">
            <div className="col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                  <h1 className="display-4">
                    Welcome to <span className="font-1">Heavy Local</span>{" "}
                  </h1>
                  <p className="lead">
                    Stay brutal and explore the unknown metal news, reviews, and
                    features!
                  </p>
                  <hr className="bg-dark" />
                  <Contact />
                  <Socials />
                  <hr className="bg-dark" />
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <Carousel />
            </div>
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container">
        <h4>Heavy Local Reviews</h4>
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="card p-4">
                <img className="card-img-top shadow-lg " src={AcidMammoth}></img>
                <h4 className="card-title">Echoes of Doom: Reflecting on Acid Mammoth's “Caravan”:Review(Eng)</h4>
                    <div className="card-body text-center">
                        <p className="lead">Intrigued by the sound of Acid Mammoth’s previous endeavor, “Under Acid Hoof”, I found myself drawn once more into the cavernous depths of their third big offering, “Caravan”.
Originating from Greece, a land more synonymous with stoner rock anthems than the brooding depths of heavy doom, Acid Mammoth defies expectations with their sophomore release.</p>
                       <a href="/article/Acid-Mammoth-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
            <div className="card p-4">
                <img className=" card-img-top shadow-lg" src={ThyDarkenedShade}></img>
                <h4 className="card-title"> Thy Darkened Shade:Review (Eng)</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        “Liber Lvcifer II: Mahapralaya” marks the highly anticipated second installment of Thy Darkened Shade’s theosophic trilogy, following their acclaimed debut “Liber Lvcifer I: Khem Sedjet.”
                        </p>
                       <a href="/article/Thy-Darkened-Shade-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
            <div className="card text-center">
            <img className=" card-img-top shadow-lg" src={ADE}></img>
                <h4 className="card-title">ADE - Obolus :Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Οι Ade είναι μια tech death metal μπάντα από την Ρώμη, την Ιταλική πρωτεύουσα,  η οποία ιδρύθηκε το 2007 και ασχολείται στα τραγούδια της με την αρχαία Ρωμαϊκή ιστορία. στοιχείο της παραδοσιακής πολεμικής Ρωμαϊκής μουσικής με την ταχύτητα, την τεχνικότητα και το brutal στοιχείο της death οι Ade δημιουργούν έναν επικό και σκληρό αλλά ταυτόχρονα προσεγμένο ήχο, ο οποίος παράλληλα και ψυχαγωγεί το αυτί και κάνει τον νου να μαθαίνει.
                        </p>
                       <a href="/article/ADE-Obulus-archive" className="btn btn-primary">Read More</a>

                    </div>

            </div>

          </div>
        <hr className="bg-dark" />

        </div>
        </div>
      </header>
      <section className="live-chornicles">
        <div className="container">
          <h4>Live Chronicles by Daria (ENG)</h4>
          <div className="row text-center mt-4">
            <div className="col-md-6">
              <img src={Yothiria} className="img-fluid" />
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
                Αleah Liane Stanbridge – Το Κύκνειο Άσμα
              </p>
              <p className="lead text-white">
                Σήμερα είναι μια ημέρα αρκετά μελαγχολική, θα έλεγα. Η Aleah
                Liane Stanbridge είναι το θέμα που αγγίζουμε σήμερα στο
                "Legends", γνωστή απλώς ως "Aleah". Η βαρύτητα των στίχων της
                και η σχεδόν αγγελική της φωνή... είναι κάτι που σίγουρα αρμόζει
                στο περιβάλλον μέσα στο οποίο γράφω αυτό το άρθρο. Ας
                ξεκινήσουμε λοιπόν από την αρχή.
              </p>

              <a href="/legends-2-archive" className="btn btn-primary">
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
