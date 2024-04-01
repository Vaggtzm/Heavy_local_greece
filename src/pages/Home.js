import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import SleapDealer from './../assets/SleepDealer.webp';
import Holler from './../assets/Holler_Members.jpg';
import ECR from './../assets/ECR_LIMF_album.jpg';
import  AutumnMachineryImg from './../assets/AutumnMachinery.webp'
import ShadowImg from './../assets/434074293_849333507205481_2363706038138989976_n.webp';
import PrimoridalBand from './../assets/Primordial.webp';
import Astronomica from './../assets/Astronomica_response.jpg';
import Yothiria from "./../assets/chronicles/chronicle-02/yothiria-02.jpg";
import Contact from "../compoments/ContactForm/contact";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import Carousel from "./../compoments/carousel/carousel";
import SocialBar from "../compoments/ShareBtns/SocialMediaBar";
import MetaTags from "../compoments/MetaTags/Meta";
import Logo from "./../assets/HeavyLocalLogo.jpg";
const Home = () => {
  return (
    <>
    <MetaTags title="Heavy Local Magazine" image={Logo} ></MetaTags>
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
        <div className="row">
        <div className="col-md-6">
        <h3>Primordial Black Interview on heavy local(ENG)</h3>
        <img src={PrimoridalBand}  className="img-fluid shadow-lg rounded-2"/>
        </div>
<div className="col-md-6">
  <p className="lead">
  </p>
  <a href="/Falooda-archive" className="btn btn-danger">Read More</a>
</div>
        </div>
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
    <div className="col-md-6">
    <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={AutumnMachineryImg} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Φθινοπωρινά ταξίδια αντισυμβατικότητας και διαφορετικότητας - Autumn Machinery - Never looked so good (Album Review)</h4>
          <p className="card-text lead">
          Κυκλοφορώντας μόλις πριν 2 περίπου, τον Γενάρη δηλαδή, στις διαδικτυακές πλατφόρμες και στα venues των Αθηνών το νέο τους άλμπουμ με όνομα Never looked so good οι Autumn Machinery δημιούργησαν ένα πολύ αξιότιμο άλμπουμ το οποίο είναι ό,τι πιο ιδανικό για όποι@ θέλει να πάει μια βόλτα με το αμάξι ένα Οκτωβριανό απόγευμα σε ένα ορεινό τοπίο με τα φύλλα των δέντρων σε γήινα χρώματα, που αναμένει τον ερχομό του σκληρού χειμώνα. Οι Αθηναίοι Autumn Machinery συμφωνούν με αυτή την άποψη έμμεσα, καθώς οι ίδιοι υποστηρίζουν ότι έχουν ως σκοπό, όπως έκαναν και με το πρώτο τους άλμπουμ το “The Lake Tahoe Incident” (Μάιος 2020) ότι το έργο τους αποτελεί ένα αμάλγαμα alternative με post rock!

          </p>
          <a href="/Autumn-Machinery-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>


    <div className="col-md-6">
    <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={ShadowImg} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Το άδειο δοχείο του δόγματος - Shadows Dance - Lifeless of the Sins (single review+πληροφορίες)
          </h4>
          <p className="card-text lead">
          Τυχαία τελείως βρέθηκα μπροστά σε ένα κομμάτι γεμάτο από σκοτεινή γοτθική αισθητική, συμφωνικά και μελωδικά στοιχεία αλλά και πολλή επιρροή από death στοιχεία. Οι Αθηναίοι Shadows Dance μετά από πολλά χρόνια αποχής επανεμφανίστηκαν με ένα single το οποίο θα τραντάξει με τον θετικότερο τρόπο όποιον/α θελήσει να το ακούσει! Μερικά λόγια για την μπάντα… Οι Shadows Dance σχηματίστηκαν στην Αθήνα το 1998 από τον Δημήτρη Θεοδωρόπουλο (Dimi), τον κιθαρίστα, ο οποίος συνέθετε σκοτεινά κομμάτια με οπερατικά/συμφωνικά στοιχεία ενώ αργότερα ήρθαν μαζί του ο Βασίλης Ζαννιάς ο μπασίστας και ο πρώτος τραγουδιστής, ο Sahmor Naar ο οποίος προσέθεσε ένα πιο γοτθικό ηχόχρωμα. Την περίοδο 2000 με 2002 ηχογράφησαν 3 demo (Last Kiss - 2000/ Lilith - 2001 και The Moor Reflected Heretic Innocence - 2002) βοηθώντας τους έτσι να αποκτήσουν την δυνατότητα να ηχογραφήσουν με την Ολλανδική δισκογραφική Ebony Tears το 2003 το πρώτο τους πλήρες άλμπουμ, το A Quatrain for the damned διάρκειας 37 λεπτών και 55 δευτερολέπτων! Όμως αυτή η άνοδος έπαψε απότομα καθώς λόγω της αποχώρησης του Sahmor και προσωπικών κωλυμάτων της μπάντας τα πάντα τέθηκαν στον πάγο, ώσπου 20 χρόνια αργότερα έγινε η έκπληξη και επανήλθαν δυναμικά με την προσθήκη του Μπάμπη Οικονομόπουλου στα φωνητικά, χάρη στον οποίο κατάφεραν οι Shadows Dance μέσω της βοήθειας της Zero Gravity Studios να ηχογραφήσουν το εν λόγω κομμάτι! 
          </p>
          <a href="/Shadows-dance-archive" className="btn btn-primary">Read More</a>
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

export default Home;
