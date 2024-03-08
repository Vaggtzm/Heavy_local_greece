import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Dreariness from './../assets/Dawn_of_a_Dark_Age_Album.jpg';
import Zong from './../assets/They_Came_from_Visions_Album.jpg';
import Disimulator from './../assets/Exogalactic.jpg';
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
        <img className="card-img-top shadow-lg img-fluid" src={Dreariness} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Of Mystical Journeys, Eerie Realms and Ancient Traditions: “Transumanza” Album Review</h4>
          <p className="card-text lead">
            In the eerie realm where ancient traditions converge with modern sonic fury, Dawn of a Dark Age’s latest opus, “Transumanza” serves as a bewitching portal to a realm of primeval wisdom and malevolent secrets. With a multitude of genres swirling amidst haunting melodies and ferocious Black Metal, this album, released under the imprint of “My Kingdom Music” label, is not merely music but a transcendental voyage through the heartlands of Italy's folklore and darkness.
          </p>
          <a href="/article/Dawn_of_the_dark_Age-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Zong} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">They Came From Visions Review</h4>
          <p className="card-text lead">
            A Symphony of Despair
            From the brooding depths of “Equinox Ablaze” to the haunting echoes of “Twilight Robes”, each track on the album unveils a sinister narrative, weaving a tapestry of fear and foreboding. While rooted in the traditions of Black Metal, the band members infuse their compositions with touches of melodicism, creating a soundscape that is both atmospheric and evocative.
          </p>
          <a href="/article/they-came-from-visions-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Disimulator} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Xoth Review (ENG)</h4>
          <p className="card-text lead">
            Upon pushing the play button on the very first song "Reptilian Bloodsport", I was immediately hit with a powerful, menacing riff that really felt like it came from outer space. Then came the thunderous blastbeats, the vocals that were shifting as quick as sound can get, the melodies that felt so alien and pompous. The exciting, dynamic choruses put the listener in the mood for adventure, battles, traveling among the cosmos.
          </p>
          <a href="/article/Xoth-archive" className="btn btn-primary">Read More</a>
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
        Μια πολύ ωραία βραδιά γεμάτη από ενορχηστρώσεις, με προεξέχοντες τους μπασίστες όλων των συμμετεχόντων συγκροτημάτων οι οποίοι έδωσαν λαϊκιστί τα πάντα, στους χώρους της stoner, της ψυχεδέλειας και της post που ταξίδεψε κάθε ακροατή από την αρχή ως το τέλος η οποία διοργανώθηκε από την 3P LAB έλαβε μέρος την Κυριακή. Από τους Spellbound ως τους Tuber όλοι έδωσαν τον καλύτερο εαυτό τους στην απόδοση ενώ ο χώρος από θέμα ακουστικής ήταν ικανοποιητικός από την σκηνή ως τα πιο πίσω μέρη του σχεδόν κατάμεστου venue του Πολυχώρου. Πάμε να δούμε ξεχωριστά την κάθε μπάντα! Πριν προχωρήσω ωστόσο σε περαιτέρω ανάλυση ας προσθέσω ότι το live διήρκεσε σχεδόν 4 ώρες, από τις 8 το βράδυ ως κοντά μεσάνυχτα! 
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
