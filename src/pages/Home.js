import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import WIckedWizard from './../assets/IdiotsCorrected.webp';
import Hexaban from './../assets/Hexaban.webp';
import Demande from './../assets/Demande.webp';
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
        <img className="card-img-top shadow-lg img-fluid" src={WIckedWizard} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Wicked Wizzard - Warlords of the Dark Realm (Album Review)</h4>
          <p className="card-text lead">
          Οι Ισπανοί Wicked Wizzard είναι μια μπάντα η οποία αντιπροσωπεύει τον αγνό ήχο του stoner των 70s όπως “πρωτοπλάστηκε” από τους αξεπέραστους Black Sabbath. Η τριάδα των Iñigo Jauregui, Unai Minguez και Mikel Bidaurrazaga, ιδρυμένοι το 2017 και ορμώμενοι από την Mungia της Βασκονίας, το 2020 συνέθεσε ένα άλμπουμ το οποίο μπορώ να ακούω προσωπικά με τις ώρες και το συστήνω ανεπιφύλακτα σε όλους τους αναγνώστες μας.

Τεχνικά οι Wicked Wizzard είναι πιστοί στις stoner αρχές, το μπάσο είναι το Α και το Ω, βαριά distortions με δυναμικά groovy riffs και clean vocals, ενώ τηρούν την προαναφερθείσα αγνότητα της πρωταρχικής stoner μορφής επιτυγχάνοντας στο να δημιουργήσουν έναν υπερβατικό και δυναμικό ήχο με σαφή δομή και μια εξαίσια σκοτεινή ατμοσφαιρικότητα, φουντώνοντας την φαντασία μας και φέρνοντάς μας στην πολυπόθητη έκσταση!          </p>
          <a href="/article/Wicked_wizzard-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Hexaban} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Spellbinding Soundscapes: “As the Night Approaches”Album Review(ΕNG)</h4>
          <p className="card-text lead">
          Prepare to be engulfed by the shadows as Hexenbann unleashes their sonic onslaught “As the Night Approaches”! From the explosive opening track to the haunting finale, the album is a masterclass in modern Metal, highlighting the band members’ skill and unwavering commitment to their artistry.
Embracing the Night: Hexenbann's Evocative Ode to Darkness

Hexenbann wastes no time in grabbing your attention with the spellbinding album. From the moment the first note hits, you're thrust into a whirlwind of frenetic energy and unrelenting aggression. The blistering guitar riffs and thunderous drums set the stage for an auditory assault that refuses to let up. With its relentless intensity and haunting atmosphere, “As the Night Approaches” serves as the perfect introduction to the dark and mysterious world of Hexenbann. The album delves into realms of mysticism, painting vivid scenes of nature's majesty and exploring the darkest recesses of human existence. Through enchanting narratives and thought-provoking introspection, the band navigates themes of life's complexities, juxtaposing dark, dissonant atmospheres with moments of luminous optimism. Much like the cycle of day and night, the album’s message resonates—where light and warmth flourish by day, only to fade into the cold embrace of darkness as dusk falls.
          </p>
          <a href="/article/Hexaban-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Demande} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">The Depths of Human Torment: Demande à la Poussière Presents “Kintsugi” (ENG)</h4>
          <p className="card-text lead">
          In a melodic cascade that echoes through the shadows, Demande à la Poussière introduces “Kintsugi”, providing a window into the haunting depths of the forthcoming album. The song masterfully blends elements of Black Metal, Doom, and Sludge, crafting a narrative steeped in anguish and introspection.
Of Darkness, Wounds and Symphonies

“Kintsugi” draws the listeners into a realm cloaked in darkness, where apocalyptic atmospheres and anguished voices hold sway. It unravels like a sinister tableau, each note carving deeper into the psyche, trailing haunting melodies in its wake.Despite its bleak landscape, “Kintsugi” is not devoid of light. Amidst the gloomy sludge scenery, melodic sparks emerge, piercing through the darkness like distant stars in an endless night. These fleeting moments of brightness add depth and dimension to the sonic tapestry woven by Demande à la Poussière. With “Kintsugi”, Demande à la Poussière invites the listeners on an introspective journey. Delving into the wounds of the human condition, the song serves as a mirror reflecting the depths of despair and melancholy. Through their music, the Parisian ensemble navigates the complexities of existence with raw honesty and unflinching authenticity.
          </p>
          <a href="/article/Demande_a_la_poussiere-archive" className="btn btn-primary">Read More</a>
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
              "Ο Σκοτεινός Μύθος Που κρυβει το ονομα των NightStalker"</p>
              <p className="lead text-white">
              Nightstalker, η εμβληματική μπάντα. Ποιος δεν έχει τύχει να τους ακούσει έστω και για μια φορά; Μια stoner μπάντα με αρκετά χρόνια στο ενεργητικό της και κλασικές συνθέσεις όπως το “Dead Rock Commandos” και το “Children of the Sun”, οι οποίες έχουν την τιμητική τους σε αρκετές Ελληνικές playlist.

Παίρνοντας τα πράγματα από την αρχή, το όνομα Nightstalker προέκυψε από από τα Αμερικανικά ΜΜΕ ως παρατσούκλι για τον κατά συρροή δολοφόνο Ρίτσαρντ Ραμίρεζ (1960-2013) που καταδικάστηκε για 13 δολοφονίες, 5 απόπειρες και 11 βιασμούς.
              </p>
                            <a href="/legends-4-archive" className="btn btn-primary">
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
