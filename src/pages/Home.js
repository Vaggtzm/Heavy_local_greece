import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import SacrificeInFire from './../assets/SIF02.jpg';
import BluesCondors from './../assets/BluesCondors02.jpg';
import ADE from './../assets/UDAD03.jpg';
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
            <div className="col-md-6">
                <div className="card p-4">
                <img className="card-img-top shadow-lg" alt={"Adrastial"} src={"https://heavy-local.com/assets/adrastia1.jpg"}></img>
                <h4 className="card-title">Απελευθερώνοντας το Ελληνικό μένος: “Αδράστεια” (Album Review)</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                            Η Ελληνική μέταλ σκηνή στέκεται ως μια αξιόλογη δύναμη, όχι μόνο ποσοτικά αλλά και ποιοτικά κυρίως. Ενώ μπάντες όπως οι Thy Darkened Shade και οι Septicflesh κυριαρχούν στις συζητήσεις, η διάσταση της Ελληνικής μέταλ...
                        </p>
                       <a href="/article/kawir_archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
            <div className="card p-4">
                <img className=" card-img-top shadow-lg" src={"https://heavy-local.com/assets/automn.jpeg"}></img>
                <h4 className="card-title"> Blood, Thunder, and the Roar of Italian Doom: “What's Done is Done” Album Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                            If you want blood, if you want uncontained rage, and if on top of that you want to see aggression of sound succeed, then in the period of autumn’s splendor shall you discover it...
                        </p>
                       <a href="/article/whats_done_is_done" className="btn btn-primary">Read More</a>
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
