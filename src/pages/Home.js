import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import SleapDealer from './../assets/SleepDealer.webp';
import Holler from './../assets/Holler_Members.jpg';
import ECR from './../assets/ECR_LIMF_album.jpg';
import  Vertigo from './../assets/Vertigo.jpg'
import Astronomica from './../assets/Astronomica_response.jpg';
import Yothiria from "./../assets/chronicles/chronicle-02/yothiria-02.jpg";
import Contact from "../compoments/ContactForm/contact";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import Carousel from "./../compoments/carousel/carousel";
import SocialBar from "../compoments/ShareBtns/SocialMediaBar";
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
                  <SocialBar/>
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
  <h4>Heavy Local Reviews(ENG)</h4>
  <div className="row mt-4 text-center">
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={SleapDealer} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Band Review: Sleep Dealer </h4>
          <p className="card-text lead">
          If I were asked about the best album or song that Sleep Dealer has produced, I definitely couldn’t provide an exact or proper answer that would suit the question.You can also choose your best song or best album, but I would certainly opt for the complete discography without skipping any albums. Eventually, you wouldn’t want to skip any songs from each album either.Every single note in each song has its own charming vibration. Sleep Dealer’s music speaks volumes, resonating deeply and offering solace during dark times.How is it possible for someone to fluently communicate in complex languages like JavaScript while simultaneously nurturing our immune system with assurance and self-love?          </p>
          <a href="/article/Sleep-Dealer-review" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Holler} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Bright Rejuvenation: Terence Holler’s “Reborn” Soars into the Rock Stratosphere</h4>
          <p className="card-text lead">
          Bright Rejuvenation: Terence Holler’s “Reborn” Soars into the Rock Stratosphere

Terence Holler’s “Reborn” pulsates with an electrifying energy, a testament to his unyielding spirit and artistic resurgence. Under the esteemed banner of Scarlet Records, Holler’s journey through the realms of rock is accompanied by a vibrant visual narrative. The album cover, adorned with radiant hues and a cyberpunk allure, serves as a prelude to the sonic odyssey awaiting listeners.
Unveiling a New Era

Terence Holler, the enigmatic Brooklyn-born rock luminary, strides boldly into the limelight with his inaugural solo endeavor, “Reborn”. Departing from the labyrinthine soundscape of Eldritch, Holler charts a new course, drawing inspiration from the timeless allure of classic rock. This album marks not only a musical evolution but a deeply personal journey for Holler, whose raw emotion and unabashed influences are palpable throughout.            </p>
          <a href="/article/Holler-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={ECR} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Philosophical Reverberations: ECR.LINF’s “Belluaires” Reviewed</h4>
          <p className="card-text lead">
          Chaos and Melancholy Intertwined

From the tumultuous depths of “Le Désespoir du Prophète” to the haunting corridors of “Tribunal de l’Âme”, ECR.LINF navigates a labyrinth of emotions with prowess. The French vocals, intense and vindictive, have an immense power of guiding the listeners through a journey that oscillates between chaos and melancholy, echoing the existential ponderings of philosophers past..
          </p>
          <a href="/article/ECR-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <h4>Heavy Local Reviews (GR)</h4>
    <div className="col-md-12">
    <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Vertigo} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Psyanide-Vertigo:review</h4>
          <p className="card-text lead">
          Τον Γενάρη του 2020 βρισκόμουν παρών σε συναυλία των Suicidal Angels (απλά επικοί) και μαζί τους ως support band βρίσκονταν και οι Θεσσαλονικείς Psyanide. Αυτή ήταν και η πρώτη μου επαφή με την μουσική τους. Μετά την συναυλία το πρώτο πράγμα το οποίο αναζήτησα στο internet ήταν φυσικά το συγκρότημα Psyanide. Η μουσική τους και περισσότερο η ενέργεια που ξεχείλιζε από αυτήν είχαν κατακλύσει την ψυχή μου. Χρειαζόμουν περισσότερο Psyanide. 
	Φυσικά, δεν χρειάζεται να μπω σε λεπτομέρειες λέγοντας ότι άκουσα κατευθείαν το άλμπουμ τους I Declare War (ακούστε το χθες). Από τότε οι Θεσσαλονικείς Melodeath/Groove Metalers κατέχουν θέση ανάμεσα στα αγαπημένα μου -τουλάχιστον ελληνικά- συγκροτήματα. 
	Λίαν προσφάτως εξεπλάγην ευχάριστα μαθαίνοντας για την νέα τους κυκλοφορία υπό τον τίτλο Vertigo. Περιττό να σας πω ότι το έχω ήδη ακούσει αρκετές φορές και ότι η εντύπ- μισό λεπτό. Βιάζομαι χωρίς λόγο.
	Λοιπόν, το άλμπουμ Vertigo των Psyanide διαρκεί 51 λεπτά και 13 δευτερόλεπτα. Η αλήθεια είναι ότι όσες φορές το άκουσα κατέληξα να ομολογώ «Τελείωσε κιόλας;». Ο δίσκος αποτελείται από δέκα κομμάτια. Ξεκινά με το τραγούδι Vertigo το οποίο δίνει και το όνομα στο άλμπουμ. Έξυπνο και ατμοσφαιρικό intro το οποίο αμέσως διαδέχεται ένα κύμα ενέργειας το οποίο σε ταρακουνάει για τα καλά. Σοφή επιλογή να ξεκινάει ο δίσκος με το συγκεκριμένο κομμάτι. Οι Θεσσαλονικείς από την αρχή δείχνουν πως έχουν μεγάλα κότσια. Οι μελωδίες, τα riffs, οι στίχοι και φυσικά τα φωνητικά σε ταξιδεύουν. Σε ταξιδεύουν σε ένα κόσμο με τα αστέρια από πάνω σου και να ονειρεύεσαι ότι ταξιδεύεις με ταχύτητα φωτός όπως λένε και οι στίχοι.
	Ο δίσκος συνεχίζει να κινείται με το ίδιο σκληρό ανάλογο ύφος. Το κομμάτι Vertigo το διαδέχεται το εξίσου φαντασμαγορικό Empires Down το οποίο από την αρχή σε εκτοξεύει σε ακτίνα χιλιομέτρων. Το συγκεκριμένο κομμάτι καταφέρνει να περάσει το επαναστατικό του μήνυμα χωρίς όμως να φανεί ιδιαίτερα πολιτικό συνάμα αλλά έμμεσα και ποιητικά. Περιττό να σχολιάσουμε ότι στο τεχνικό κομμάτι παραμένουν τρομεροί

          </p>
          <a href="/Vertigo-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>










    <hr className="bg-white"></hr>
    <h3>Ανταποκριση Astronomica x Dark Parrot x Sense of Fear live στα Ιωαννινα </h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
<img src={Astronomica} className="img-fluid"></img>
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
