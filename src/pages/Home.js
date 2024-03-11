import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Venus from './../assets/Venus.jpg';
import Faloda from './../assets/Falooda_Demo_2024_artwork.jpg';
import Disimulator from './../assets/InnerLord.webp';
import spell from './../assets/LiveSpell.jpg';
import Yothiria from "./../assets/chronicles/chronicle-02/yothiria-02.jpg";
import Contact from "../compoments/ContactForm/contact";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import Carousel from "./../compoments/carousel/carousel";
const Home = () => {
  return (
    <>
      <Navigation />
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
                  <h5>Help us to grow </h5>
                   <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-50">Donate</a>
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
  <div className="row mt-4 text-center">
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Venus} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Venus - Obscured Until Observed (Album Review)</h4>
          <p className="card-text lead">
          Ένα απόγευμα σαν το σημερινό ακούγοντας μουσική (πρωτότυπο!) υπέπεσε στην αντίληψή μου ένα κρυφό διαμάντι, το οποίο αδημονούσε να φανερωθεί. Αυτό το διαμαντάκι ήταν το άλμπουμ των Progressive Thrash Αθηναίων Venus που ακούει στο όνομα Obscured Until Observed και άξιζε πάρα πολύ στο να λάβει την δική του ξεχωριστή προεπισκόπηση στο ηλεκτρονικό περιοδικό μας!Οι Venus είναι όπως προείπα μια progressive thrash Αθηναϊκή μπάντα, η οποία συστάθηκε μόλις το 2021 από τους Γιώργο Βεργίνη (κιθάρες/φωνητικά) και Αντώνη Αβτζή (κιθάρες φωνητικά) και στα 3 χρόνια ύπαρξής της έχει ήδη καταφέρει να βγάλει ένα πλήρους διάρκειας άλμπουμ (Obscured Until Observed), ένα EP (Project Lamda) και 2 single (Artificially Prolonged Existence & Circus Strange). Θέματά τους είναι η επιστημονική φαντασία, η μυθολογία, η τεχνολογία και το horror. Πάμε για το άλμπουμ τώρα! 
          </p>
          <a href="/article/Venus-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Faloda} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">A Sonic Feast Like No Other: Falooda’s Demo Review(ΕNG)</h4>
          <p className="card-text lead">
          Step into a world where the musical boundaries dissolve, and chaos reigns supreme. Falooda, a noise/punk/experimental group hailing from Athens, Greece, takes inspiration from the exotic Mughlai dessert to concoct a sonic feast like no other. With their self-released demo hitting the airwaves, get ready to embark on a journey of auditory exploration that’s as mesmerizing as it is unpredictable!
Exploring the Unconventional</p>
          <a href="/article/Faloda-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Disimulator} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Summoning Malevolent Witchery: Innerload’s “Mater Tenebrarum” Review (ENG)</h4>
          <p className="card-text lead">
          If you choose to title your album after one of the Three Mothers, it ought to evoke a palpable aura of sinister witchcraft. Drawing inspiration from the works of Thomas De Quincey and the nightmarish visions of Dario Argento, Innerload’s third album, “Mater Tenebrarum”, a production done in collaboration with the French label “Great Dane Records” beckons the listeners into the realm of “Our Lady of Darkness”. But does this Venetian band truly capture the essence of horror within their music? Let’s find out!          </p>
          <a href="/article/InnerLord-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <hr className="bg-white"></hr>
    <h3>Ανταποκριση Spellbound x Ushala x Tuber live στα Ιωαννινα </h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
<img src={spell} className="img-fluid"></img>
      </div>

      <div className='col-md-6'>
        <p className="lead">
        Μια πολύ ωραία βραδιά γεμάτη από ενορχηστρώσεις, με Προεξάρχοντες τους μπασίστες όλων των συμμετεχόντων συγκροτημάτων οι οποίοι έδωσαν λαϊκιστί τα πάντα, στους χώρους της stoner, της ψυχεδέλειας και της post που ταξίδεψε κάθε ακροατή από την αρχή ως το τέλος η οποία διοργανώθηκε από την 3P LAB έλαβε μέρος την Κυριακή. Από τους Spellbound ως τους Tuber όλοι έδωσαν τον καλύτερο εαυτό τους στην απόδοση ενώ ο χώρος από θέμα ακουστικής ήταν ικανοποιητικός από την σκηνή ως τα πιο πίσω μέρη του σχεδόν κατάμεστου venue του Πολυχώρου. Πάμε να δούμε ξεχωριστά την κάθε μπάντα! Πριν προχωρήσω ωστόσο σε περαιτέρω ανάλυση ας προσθέσω ότι το live διήρκεσε σχεδόν 4 ώρες, από τις 8 το βράδυ ως κοντά μεσάνυχτα! 
        </p>
        <a className="btn btn-danger" href="/article/live-coreresponse-archive">Read More</a>
      </div>

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
              Into the Abyss: The Lifelover Story Unveiled(ENG)</p>
              <p className="lead text-white">
              Throughout the annals of music history, only a few bands have managed to imprint their genre as deeply as Lifelover. Hailing from Sweden, Lifelover emerged in 2005, crafting a unique sound, exploring themes of suicide, depression, nihilism, and cynicism.

              </p>
                            <a href="/legends-3-archive" className="btn btn-primary">
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
