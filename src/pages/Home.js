import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Dreariness from './../assets/Dawn_of_a_Dark_Age_Album.jpg';
import Zong from './../assets/They_Came_from_Visions_Album.jpg';
import Disimulator from './../assets/Exogalactic.jpg';
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
                <img className="card-img-top shadow-lg " src={Dreariness}></img>
                <h4 className="card-title">Of Mystical Journeys, Eerie Realms and Ancient Traditions: “Transumanza” Album Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        In the eerie realm where ancient traditions converge with modern sonic fury, Dawn of a Dark Age’s latest opus, “Transumanza” serves as a bewitching portal to a realm of primeval wisdom and malevolent secrets. With a multitude of genres swirling amidst haunting melodies and ferocious Black Metal, this album, released under the imprint of “My Kingdom Music” label, is not merely music but a transcendental voyage through the heartlands of Italy's folklore and darkness.                         </p>
                       <a href="/article/Dawn_of_the_dark_Age-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
            <div className="card p-4">
                <img className=" card-img-top shadow-lg" src={Zong}></img>
                <h4 className="card-title"> They Came From Visions Review:Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        A Symphony of Despair
From the brooding depths of “Equinox Ablaze” to the haunting echoes of “Twilight Robes”, each track on the album unveils a sinister narrative, weaving a tapestry of fear and foreboding. While rooted in the traditions of Black Metal, the band members infuse their compositions with touches of melodicism, creating a soundscape that is both atmospheric and evocative.
What sets “The Twilight Robes” apart is its unapologetic embrace of folk horror. Through a series of vignettes
                             </p>
                       <a href="/article/they-came-from-visions-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
            <div className="card p-4">
                <img className=" card-img-top shadow-lg" src={Disimulator}></img>
                <h4 className="card-title"> Xoth:Review(ENG)</h4>
                    <div className="card-body text-center">
                    <p className="lead">
                    Upon pushing the play button on the very first song "Reptilian Bloodsport", I was immediately hit with a powerful, menacing riff that really felt like it came from outer space. Then came the thunderous blastbeats, the vocals that were shifting as quick as sound can get, the melodies that felt so alien and pompous. The exciting, dynamic choruses put the listener in the mood for adventure, battles, traveling among the cosmos. 
Similar to the music, the very well written and poetic lyrics are of epic galactic wars, legendary weapons, unusual invasive species with malicious plans,

                    </p>
                     
                       <a href="/article/Xoth-archive" className="btn btn-primary">Read More</a>
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
