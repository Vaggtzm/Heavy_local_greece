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
            <div className="col-md-4">
                <div className="card p-4">
                <img className="card-img-top shadow-lg " src={SacrificeInFire}></img>
                <h4 className="card-title">Sacrifice In Fire:Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Οι Sacrifice in Fire είναι μια death metal μπάντα από τη Γερμανία που ανακάλυψα εντελώς τυχαία μέσω του Instagram. Μπορώ να πω πως πρόκειται για ένα από τα ακατέργαστα διαμάντια που έχω ανακαλύψει. Με μια ματιά στη μουσική τους, αναδεικνύεται ένας δυστοπικός στίχος με την συνοδεία απόκοσμων πλήκτρων, ενώ τα ντραμς με τις κιθάρες προσδίδουν ένα ορμητικό ύφος. Κομμάτια όπως το Concrete Grave και το Weapons of Mass Destruction μας μιλούν για το σκληρό πρόσωπο της ανθρωπότητας και για το τι είναι ικανός να κάνει ο άνθρωπος.


                        </p>
                       <a href="/article/Sacrifice-In-Fire-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
            <div className="card p-4">
                <img className=" card-img-top shadow-lg" src={BluesCondors}></img>
                <h4 className="card-title"> Blues Condors - 45 Blues:Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Οι Blues Condors είναι μια μπάντα blues/rock από τη Θεσσαλονίκη. Πριν από δύο χρόνια κυκλοφόρησαν το πρώτο τους EP με τίτλο '45 Blues', το οποίο είχα την ευκαιρία να αποκτήσω σε μορφή hard copy από τον Vapa (μέλος των Blues Condors και των Lioneye).Καθώς εισέρχεται το EP, από τα πρώτα δευτερόλεπτα ακούμε μια παλιά αισθητική σχεδόν από τη δεκαετία του '70. Ο τρόπος με τον οποίο ο τραγουδιστής ερμηνεύει τους στίχους, συνοδευόμενος από επιρροές από το στιλ του Jim Morrison (The Doors), είναι εμφανής. Οι κιθάρες δεν είναι τόσο βαριές και παραμορφωμένες, διατηρώντας έναν χορευτικό ρυθμό, ενώ ταυτόχρονα δημιουργούν έναν μυστηριώδη αέρα.
                        </p>
                       <a href="/article/Blues-Condors-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
            <div className="card text-center">
            <img className=" card-img-top shadow-lg" src={ADE}></img>
                <h4 className="card-title">Veins of Darkness: Udåd Emerges with Raw Norwegian Black Metal</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Udåd emerges from the shadowy depths, delivering a primal offering steeped in the essence of Norwegian Black Metal. Spearheaded by Thomas Eriksen, the mastermind behind Mork, this debut release ignites a blazing trail back to the genre’s raw and uncompromising origins. Udåd stands as a stark departure from the intricate tapestries woven by Mork, instead embracing a primal ethos reminiscent of the early 1990s Black Metal movement. Drawing inspiration from the bone-chilling atmospheres </p>
                       <a href="/article/Udad-archive" className="btn btn-primary">Read More</a>

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
