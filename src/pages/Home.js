import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Mnima from './../assets/ForeverFalling.jpg';
import Kroheim from './../assets/Nitritono_Band.webp';
import Passengers from './../assets/Ignis_Absconditus_Album.webp';
import  Bird from './../assets/BirdStone.jpg'
import Astronomica from './../assets/Astronomica_response.jpg';
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
  <h4>Heavy Local Reviews(ENG)</h4>
  <div className="row mt-4 text-center">
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Mnima} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">A Synth-Infused Dirge of Doom: “Suspended over the Immanent” by Forever Falling </h4>
          <p className="card-text lead">
          A Unique Blend: Doom, Death, and Synth

The album, released on 27/11/2021 via MSH Music Group, opens with the haunting instrumental track “Bless This Floor”, where Carleo’s masterful piano work and synth strings set a captivating tone. From there, the listener is immersed in a world of slow, heavy compositions, expertly crafted to avoid monotony. Carleo’s use of keyboards adds a unique dimension to the genre, seamlessly integrating with the powerful instrumentation to create a sound both familiar and fresh.
Powerful Instrumentation and Haunting Vocals

Throughout the album, the guitar and bass work together to create a formidable wall of sound, with clear bass tones complementing the powerful guitar riffs. While there are no guitar solos, the absence is hardly felt, as the strength of the compositions lies in their cohesion rather than flashy displays. The drumming, characterized by impactful snare hits and resonant cymbals, further bolsters the album’s intensity. However, it is John Suffering’s vocals that truly steal the spotlight. His deep growls, devoid of any artificial manipulation, convey an otherworldly presence that adds depth to each track. Particularly noteworthy are his performances on tracks like “Dark Friend”, “I Will Never Sleep”, “To Die in Silence”, and “Dark Painting of the I”, where his vocal prowess shines brightest.
          </p>
          <a href="/article/forever-falling-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Kroheim} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Nitritono Drops Explosive Single “Non È Questa La Vita Che Sognavo Da Bambina” from Upcoming Album “Cecità”</h4>
          <p className="card-text lead">
          Italian Post-Metal sensation Nitritono storms back into the limelight with their latest single “Non È Questa La Vita Che Sognavo Da Bambina”, offering a tantalizing preview of their forthcoming album “Cecità”. Evolving their signature sound into a captivating blend of atmospheric tranquility and thunderous intensity, Nitritono’s latest offering promises to push the boundaries of their craft further than ever before. Drawing inspiration from José Saramago’s literary masterpiece of the same name, the band delves deep into themes of existentialism, isolation, and the human condition, crafting an album that is as introspective as it is intense. “Non È Questa La Vita Che Volevo Da Bambina”          </p>
          <a href="/article/Nitriono-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Passengers} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Ethereal Descent: Unveiling Ignis Absconditus’ “Golden Horses of a Dying Future”</h4>
          <p className="card-text lead">
          From the Abyss… They Come!

“Golden Horses of a Dying Future” is a ten-track odyssey through the realms of metal, rock, doom, dark metal, and post-metal. Each composition is a portal, inviting listeners to immerse themselves in a hypnotic, magnetically charged experience. From the ethereal whispers of “Shadows” to the pulsating groove of “Mr. Smith”, the album unveils layers of darkness with theatrical flair.
The Gates of Horror Dimensions

In “Wolfheart”, Ignis Absconditus delves into the unpredictable territories of dark rock, while “Lucid Madness” captivates with its vibrancy, leaving listeners trembling in its wake. With “Carousel of the Departed” the gates to horror dimensions swing open, leading to an aggressive triumph of decadence in “Seagull's Laughter” The band’s Italian roots echo through the dark doom sounds of “Weight of Knowledge” culminating in the haunting conclusion of “Chasm Of Deceit”.
A Tapestry of Influence

Drawing inspiration from the greats of the ‘80s and the icons of doom, Ignis Absconditus crafts a narrative that is incisive. Their sound resonates with the echoes of Christian Death while embracing the extravagance of alternative, progressive, and avant-garde bands.           </p>
          <a href="/article/Ignis-Absconditus-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <h4>Heavy Local Reviews (GR)</h4>

    <div className="col-md-12 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Bird} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Birdstone - “Méandres” (Single Review)</h4>
          <p className="card-text lead">
          Ξεφεύγοντας για λίγο από τον σκληρό ήχο της extreme metal και πηγαίνοντας προς πιο αισθηματικά και τρυφερά εδάφια αυτή την περίοδο, έτυχε να πέσει στην αντίληψή μου κάτι που ιδιαιτέρως οι αναγνώστες μας του γυναικείου φύλου θα εκτιμήσουν δεόντως, ένεκεν και της Παγκόσμιας Ημέρας Ποίησης, και αυτό το κάτι είναι το “Méandres” των Γάλλων Birdstone, μια ελεγειακή progressive μπάντα η οποία αυτό τον Μάρτιο κυκλοφόρησε ένα single το οποίο ζέστανε το είναι μου και ξύπνησε ένα αίσθημα νοσταλγίας, έχοντας καιρό να ερωτευτώ.

Οι Birdstone είναι μια progressive rock μπάντα με έντονα heavy blues και mystic rock στοιχεία η οποία ιδρύθηκε το 2015 στην Γαλλία (διόλου τυχαία μια από τις πιο ρομαντικές και ερωτικές χώρες του πλανήτη) και αποτελείται από τους 1) Basile Chevalier-Coudrain (κιθάρα, πρώτα φωνητικά, μαντολίνο, πλήκτρα), 2) Edwige Thirion (μπάσο, κιθάρα, δεύτερα φωνητικά) και 3) Léo Gaufreteau (ντραμς, δεύτερα φωνητικά). Από το 2015 ως τώρα έχουν κυκλοφορήσει ένα EP (The Cage - 2017), δυο άλμπουμ (Seer - 2019 & Loss -2022) και 4 singles (Madness - 2022, The Trail - 2022, Hotline - 2023 & Méandres - 2024). Όπως οι ίδιοι δηλώνουν είναι μια μπάντα που οδηγείται από μια ακαταμάχητη επιθυμία να ενώσει την πνευματική δύναμη των Blues με τον πλούτο της progressive rock. Στα σταυροδρόμια των μυθολογικών θεμάτων, του εσωτερισμού και των απλών ανθρώπινων παθών, το τρίο αφηγείται τις εσώτερες διαμάχες των ανθρώπων, όπως επίσης και τους μυστικιστικούς τους στόχους. Κάθε συναυλία μετατρέπεται σε μια άγρια τελετουργία στην οποία οι ακροατές και οι μουσικοί με χρυσά πρόσωπα πολεμούν μαζί για την σωτηρία των ψυχών τους. Πράγματι ακούγοντάς τους επιβεβαιώνω την αυτοαναφορικότητα τους, καθώς με έκαναν να νιώσω ένα τρυφερό χάδι και μια γαλήνια αύρα μέσα μου ενώ τριγύρω τα πάντα βρίσκονται εντός ενός ταχύτατου και χαοτικού καταστροφικού τυφώνος.</p>          <a href="/article/Bird-stone-archive" className="btn btn-primary">Read More</a>
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
