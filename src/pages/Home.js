import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Severoth from './../assets/Severoth.webp';
import Khavar from './../assets/review_picture.webp';
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
  <a href="/Primordial-black-archive" className="btn btn-danger">Read More</a>
</div>
        </div>
  <h4>Heavy Local Reviews(ENG)</h4>
  <div className="row mt-4 text-center">
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Severoth} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Ethereal Triumph: Reviewing Severoth’s “By the Way of Light </h4>
          <p className="card-text lead">
          In the throes of turmoil and strife, Severoth, the enigmatic force behind the atmospheric black metal project with same name, emerges with his latest creation: “By the Way of Light”. Crafted amidst personal tribulations and the tumult of life’s trials, Severoth’s latest creation, emerges as a testament to resilience and inner strength. Recorded and mixed meticulously by Severoth at Nordlys Home Studio across 2021 and 2023, the album exemplifies fastidious craftsmanship. “By the Way of Light” goes beyond conventional music, plumbing the depths of human emotion with every expertly executed detail.
Delving into Haunting Melodies
Severoth’s “By the Way of Light” presents five mesmerizing tracks that delve into the depths of the mind. Each composition stands as a poignant reflection on life’s struggles and triumphs, resonating with haunting melodies and raw emotion. Each song is meticulously crafted to evoke a range of emotions, from sorrow to defiance, from despair to hope. The melodies resonate with a raw authenticity. Throughout the album, Severoth demonstrates a mastery of musical storytelling, using melodies as a vehicle to express the complexities of the human experience. Whether through somber, introspective passages or blistering bursts of sonic aggression, each melody serves as a window into the artist's soul, inviting listeners to share in his journey of self-discovery and emotional catharsis.
          </p>
          <a href="/article/Severoth-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Khavar} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Band Review Khavar</h4>
          <p className="card-text lead">
          In the the tumultuous landscape of Heavy metal, where innovation is both revered and rare, KHAVAR emerges as a titan in the middle east death metal scene. Their journey, marked by relentless passion and musical prowess, has not only defined a genre but also paved the way for countless others to follow.This band's discography is not just a collection of albums but a sonic manifesto that reshaped the very foundations of extreme music. Their relentless passion for music reverberates through every riff, growl, and thunderous beat, cementing their status as trailblazers and masters of their craft.From their debut In Aabsence Of Light album, a raw and unbridled onslaught of ferocious guitar work and guttural vocals, to their sophomore release 'sun swallow Earth,' where they delved deeper into atmospheric nuances while maintaining their signature brutality, this band has consistently pushed boundaries and defied expectations.Tracks like 'SLAVERY IS STILL' showcase their technical prowess and ability to seamlessly blend intricate melodies with savage aggression. Their lyrics, steeped in themes of existential dread and societal decay, resonate with a raw authenticity that is both haunting and cathartic.
           </p>
          <a href="/article/Khavar-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={PrimoridalBand} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Band Review: Primordial Black</h4>
          <p className="card-text lead">
          From the North African continent, four young talented musicians gathered under the roof of a communal passion for metal music and embarked on their musical journey. Let us delve deeper and explore this path together. Primordial Black is a Tunisian death metal band formed in 2022 by four talented musicians, united by a singular commitment: to give birth to the name 'Primordial Black,' drawing inspiration from HP Lovecraft, Celtic Frost, and John Dee's philosophy. Their aim is to deliver challenges that resonate with the fundamentals of metal music.Thus, Primordial has always embodied the essence of sensitive rhythms combined with cruel sounds, speaking the truth of their existence. They manifest their influences from various legendary artists they have delved into.Their debut album, “The Worm that Gnaws at Night”, has plunged my soul into the void, bringing forth questions essential to our existence as humans.I started digging into their entire discography; the guitar riffs and strong vocals in “Only Death is Real” have sunk my soul and brought me back to where I belong, amidst the darkness that entirely covers the sky. Crossing fingers for a while, healing for all the non-targeted paths. 
          </p>
          <a href="/article/Primordial-black" className="btn btn-primary">Read More</a>
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
