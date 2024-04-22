import React from "react";
import Navigation from "../compoments/Navigation/Navigation";
import "./home.css";
import Severoth from './../assets/Hydra.jpg';
import Khavar from './../assets/review_picture.webp';
import Civeroud from './../assets/Civerous.webp'
import Holler from './../assets/Holler_Members.jpg';
import  Lloth from './../assets/Acyl.webp';
import Birds from './../assets/Birds.webp';
import ShadowImg from './../assets/AcidMammothSecond.jpg';
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
import SpotifyBanner from "../compoments/SpotifyBanner/SpotifyBanner";
import Youtube from "../compoments/YoutubeAPI/Youtube";
import InstallButton from "../compoments/PWAinstal/pwaInstall";
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
                  <InstallButton/>
                  <SocialBar/>
                  <hr className="bg-dark" />
                  <h5>Help us to grow </h5>
                   <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-50">Donate</a>
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <SpotifyBanner />
              <hr className="bg-dark" />
            </div>
            <div className="col-md-12">
              <Carousel />
            </div>
            <div className="col-md-12">
              <h3></h3>
            </div>
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container">
        <div className="row">
        <hr className="bg-white" />
        <Youtube />
        <hr className="bg-white" />
        <h3>Interviews:</h3>
         <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid Η" src={ShadowImg} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Interview: Acid Mammoth</h4>
          <p className="card-text lead">
          Welcome to our web magazine! Today, we have the honor of speaking with one of the most rad Mediterranean doom bands, known for their huge influence and their pride in their Sabbathian ancestry, Acid Mammoth—a prominent figure in the world of stoner doom and Sabbath worshiping. Thank you for joining us!
1. ACID MAMMOTH is more likely a family gathering and a strong musical bonds above all but we would love to know more of How did the band come together, Have there been any significant setbacks or obstacles you've faced as a band, and how did you overcome them?
Hi, Rawya! Thank you for this interview! I and our bassist formed the band in 2015. We have been friends for more than fifteen years, we are pretty much brothers, and we have been playing music together long before Acid Mammoth were formed. We formed the band because of our love for slow, heavy riffs, which we loved jamming together. It wasn’t long before my dad joined the band on guitar duty, and shortly after that, our drummer Marios. We’ve been together ever since. The line-up being comprised by the same four people has helped the band a lot in the shaping of our sound and the overall consistency from album to album. As for setbacks and obstacles, every band has had to face some, as they are part of everyday life. Thankfully, so far we haven’t faced an obstacle or setback to which there wasn’t a solution. No matter what might come up, we always strive to overcome it, we work together and we continue going forward. If I had to pick one obstacle, the covid pandemic was definitely a huge thorn on our side, as it put us on ice when it came to playing shows for two years. Thankfully these dark days seem to be in the past, and we can enjoy playing shows and interacting with people, hanging out together and having fun.
          </p>
          <a href="/Acid-Mammoth-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>
          <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Khavar} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Interview: Khavar          </h4>
          <p className="card-text lead">
          Welcome to our web magazine!  Today we have the pleasure of speaking with Khavar, a prominent figure in the world of death metal in Lebanon!  Thank you for joining us!

1. How did the band come together, and what inspired you to create Death metal music?
Hello, my name is Garo Gdanian, guitarist and founder of Khavar. Alongside my brothers, we were previously known as The Weeping Willow, the first Death Metal band in the Middle East with more than 40 songs and 5 albums climbing to the 6th in a few months.          </p>
          <a href="/Khavar-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>
          <div className="col-md-4">
         <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid" src={Holler} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">
          Harmonic Rebirth: Deciphering Holler’s Journey          </h4>
          <p className="card-text lead">
          Holler Band, the dynamic musical force born from the ashes of Eldritch, unveils their highly anticipated debut album, “Reborn”. With a fusion of classic rock nostalgia and modern sensibilities, Holler redefines the genre landscape, delivering an electrifying sonic experience that resonates with audiences worldwide. Led by the incomparable Terence Holler, the band’s genesis traces back to a pivotal moment of separation, igniting a journey of introspection and renewal. Following a storied career with Eldritch, Terence took a hiatus to refocus, eventually joining forces with Denis and Matteo Chimenti, laying the foundation for a new musical odyssey. Later on, Leonardo Peruzzi (bass) and Alex Gasperini (drums) joined the band, marking a significant evolution in their sound and dynamics. In 2023, their collective efforts culminated in a harmonious fusion of talent, propelling the band towards new heights of creativity and expression.
                   </p>
          <a href="/Holler-interview-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
          </div>

        </div>
  <h4>Heavy Local Reviews(ENG)</h4>
  <div className="row mt-4 text-center">
    <div className="col-md-6 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={Severoth} alt="Dreariness"></img>
        <div className="card-body">
          <h4 className="card-title">Veins of Obsidian: Luctus' Hydra's Menacing Ode to Black Metal </h4>
          <p className="card-text lead">
          Hellish hymns echoing through the void, powerful lyrics, unlimited passion - these are some of the things one needs to remember after listening to this band. From the depths of despair to the pinnacle of blasphemy, the discography of Luctus’ Hydra serves as a resolute embodiment of black metal’s enduring spirit. With albums such as “Screams and Laments from the Deepest of the Soul” and “Brutal Black”, the band has consistently pushed the boundaries of sonic extremity, delivering a relentless onslaught of aggression and despair. 
The lyrics of Luctus’ Hydra delve into themes of disdain for organized religion, societal hypocrisy, and internal struggles with misanthropy and mental anguish. In “I Hate Your Faith”, the band expresses contempt for blind faith and the institutions that propagate it, condemning the idea of an afterlife and denouncing the hypocrisy of those who claim moral superiority. This sentiment is echoed in “My Damn Misanthropy”, where the protagonist grapples with his own disdain for humanity and the overwhelming sense of isolation it brings. Additionally, “Once Again I Have Changed” delves into the inner turmoil of personal transformation, portraying a struggle with insecurity, violence, and the haunting presence of inner demons. Throughout these lyrical journeys, Luctus’ Hydra confronts the darkness within and without, painting a visceral portrait of existential conflict and societal disillusionment          </p>
          <a href="/article/Lyctus-hydra-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    <div className="col-md-6 mb-4">
      <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={Civeroud} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Band Review: Civerous</h4>
          <p className="card-text lead">
          Maze Envy: A very unique, different album by the rapidly ascending Death Doom band Civerous, which puts us inside a twisted labyrinth coated in a bright, pale, otherworldly violet light that creates an off-putting, intriguing sense. The US-based Civerous made their debut in 2019 with their EPs "Raw Demo 1" and "Demo Mmxix" and continued the next year with a split together with Stygian Obsession (Heralds of Affliction). Keeping up with their annual streak, they presented us with their first full-length album titled "Decrepit Flesh Relic" in 2021.
Following a three-year break, they made their powerful return with Maze Envy, the album that will be unfolded in front of your eyes (and ears) in the article you're now reading.
It's hard to miss it amongst others in a pile, due to its intense violet, almost ultraviolet purple color that dominates the cover, combined with the dreadful maze that spreads widely in the frame, drawing all the looks to it. That's how I discovered it too, in a list of new releases featured on Bandcamp, and clicked on without hesitation. At this point, I must express that Juanjo Castellano, the artist of this cover and many more, has done exceptional work for the band, without a doubt.
           </p>
          <a href="/article/Civerous-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
    
    <h4>Heavy Local Reviews (GR)</h4>
    <div className="col-md-6">
    <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg img-fluid h-100" src={Lloth} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">"Η Αύρα της Ερήμου - Acyl (band review)</h4>
          <p className="card-text lead">
          Τα λόγια περιττεύουν για αυτή την μπάντα! Όποτε ακούω τους Acyl το αίσθημα του ενθουσιασμού με κατακλύζει για τον μουσικό και στιχουργικό τους πλουραλισμό και πιστεύω πως διαβάζοντας μερικά δικά μου λόγια για τους ίδιους και το έργο τους αλλά και ακούγοντας τους με τα δικά σας αυτιά θα τους λατρέψετε από το πρώτο γρατζούνισμα της κιθάρας! Ιδιαιτέρως όσοι ψάχνετε για νέες άγνωστες μπάντες με εξωτικούς αντισυμβατικούς ήχους! Πάμε να δούμε λοιπόν ποιοι είναι συνοπτικά οι Acyl! Οι Acyl είναι ένα πενταμελές σχήμα το οποίο δημιουργήθηκε το 2007 στο Παρίσι! Πιο συγκεκριμένα τα μέλης είναι τα εξής: 1) Salah (μπάσο, δεύτερη φωνή, Bendir και Karkabou), 2) Mickey (ντραμς, δεύτερη φωνή), 3) Reda (κιθάρες, δεύτερη φωνή και Karkabou), 4) Amine (Φωνητικά, κιθάρες, Oud, Bendir, Derbouka και Karkabou) και 5) Abder (κιθάρες). Μουσικά βρίσκονται στα πεδία της progressive metal με πολλά experimental ethnic στοιχεία, αναμειγνύοντας την παραδοσιακή μουσική του Μαγκρέμπ (Βόρεια Αφρική) με την Αραβική/Μεσο Ανατολίτικη και το metal στοιχείο! Έχουν τρομερά ηχοτοπία καθώς στις συγχορδίες αναμειγνύονται το παραδοσιακό με το σύγχρονο και πλάθουν έναν χάρμα ιδέσθαι ήχο ακόμη και για το επιλεκτικό και αυστηρό αυτί! Όργανα όπως το Oud, το Bendir, το Karkabou και το Derbouka έχουν την τιμητική τους και είναι αναπόσπαστα από την ενορχήστρωση, η οποία, μην ξεχαστώ, συνολικά είναι σχολαστικά δουλεμένη και πολυσύνθετη, όπως αρμόζει σε ένα σωστό progressive σχήμα! Οι Acyl είναι από την Αλγερία, ομογενείς όλοι στην Γαλλία, και το όνομα τους στα Αραβικά σημαίνει ο “Αυθεντικός”. Πράγματι είναι αυθεντικοί στον ήχο τους και στον στίχο τους στις κυκλοφορίες τους! Καθώς οι Acyl λειτουργούν ως ένας σύγχρονος και πραγματικός φορέας της Αλγερινής ιστορίας και παράδοσης ενώ στα φωνητικά τους είναι ισχυρή επίσης η παρουσία έκαστος των clean με τον harsh vocals ενώ πέραν του Αγγλικού στίχου στα κομμάτια τους εμφανίζονται και τα Αραβικά!          </p>
          <a href="/article/Acyl-archinve" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

    <div className="col-md-6">
    <div className="card h-100 w-100">
        <img className="card-img-top shadow-lg h-100" src={Birds} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Υπερηχητικές πτήσεις ανά τη Γη - Birds of Nazca (band review)</h4>
          <p className="card-text lead">
          Πριν κάτι μήνες έπεσα πάνω σε ένα instrumental ντουέτο από την Γαλλία το οποίο με κέρδισε απευθείας! Αγαπώ την stoner και ως ένα ανήσυχο και εξερευνητικό πνεύμα αποφάσισα να βουτήξω απευθείας όταν μου εμφανίστηκε η ευκαιρία να το ακούσω και τους λάτρεψα απευθείας όχι μόνο για τις συγχορδίες τους αλλά και για την ιδιαίτερη και πρωτότυπη θεματολογία τους! Για αυτό και σήμερα θα μιλήσουμε για τους Birds of Nazca!Ποιοι είναι οι Birds of Nazca;Οι Birds of Nazca είναι λοιπόν όπως προανέφερα ένα διμελές σχήμα το οποίο δημιουργήθηκε το 2019 στην Ναντ της Γαλλίας, την πρωτεύουσα της rock'n'roll σκηνής της χώρας αυτής. Μέλη αυτού του σχήματος είναι ο Romauld (ντραμς) και ο Guillaume (κιθάρα)! Το αξιοπρόσεκτο και διακριτό χαρακτηριστικό τους είναι η απουσία του μπασίστα, καθώς το μπάσο σαν όργανο σε αυτό το είδος κατέχει μια εξέχουσα θέση στην μουσική σύνθεση! Ωστόσο δεν χάνουν σε τίποτα από την δυναμική των άλλων stoner και ψυχεδελικών συγκροτημάτων στην σύνθεση!Η μουσική που παίζουν βρίσκεται μεταξύ της stoner, της ψυχεδελικής και της doom, οπότε καταλαβαίνετε ότι πρόκειται για ένα σχήμα που έχει έναν βαρύ και fuzzy ήχο με μια κιθάρα μέσα στα distortions, ενώ τα φωνητικά απουσιάζουν! Είναι εξαιρετικοί πάντως, με καθηλωτικά solo στην κιθάρα μην ξεχάσω να αναφέρω, με τον Guillaume να καλύπτει αρκετά καλά την έλλειψη μπάσου! Οποιοσδήποτε αγαπάει τον stoner ήχο θα τους λατρέψει άμεσα από έναν σαγηνευτικό και αιθέριο ήχο που θα τον ταξιδέψει με μεγάλη βεβαιότητα! Μερικές επιρροές έχουν από τους King Buffalo και τους Queens of the Stone Age.Επιρροές και θεματολογίαΟι Birds of Nazca αντλούν το όνομά τους από την περίφημη Περουβιανή πόλη Nazca με τις διάσημες περίπλοκες και τεραστίων διαστάσεων γραμμές! Η Nazca σαν πόλη άκμασε από το 100 ως το 800 μ.Χ. στην προκολομβιανή αυτοκρατορία των Ίνκας και πέραν των προαναφερθεισών περίφημων γραμμών ήταν και από τις πιο εξελιγμένες, αφού οι ανασκαφές έδειξαν πως χρησιμοποιούσαν υπόγεια τροφοδοτούμενα από άνεμο υδραγωγεία! Πάμε να δούμε και μερικές επιρροές τους! 1) Πρώτο τους στοιχείο είναι τα πτηνά! Στο album τους το Bird of Nazca (2020) διάρκειας 40 λεπτών και 26 δευτερολέπτων και 8 κομματιών. Εστιάζουν κυρίως γύρω από τις πτήσεις των πτηνών και τους αιθέρες. Για παράδειγμα ένα κομμάτι, το Vulture Gryfus (6:02) μιλά για τον Κόνδορα των Άνδεων, ο οποίος αποτελεί εθνικό σύμβουλος για πολλούς λαούς της Λατινικής Αμερικής, ενώ ένα άλλο, το Almucantar, πραγματεύεται μια από τις παραλλήλους του υψόμετρου! Επίσης στο στο EP του 2023 H​é​liolite (19:46) κάνουν και σε ένα track το Spheniscus (4:52) την εμφάνισή τους οι μαυροπόδαροι πιγκουίνοι (Genus Spheniscus). Παράλληλα στις αρχές του Symposium από το album Birds of Nazca παρεμπιπτόντως παρουσιάζονται folk φωνητικά στην γλώσσα Quechua! Ιαπωνία - Περίοδος Έντο/Tokugawa (Kanagawa - single - 2019)2) Παρότι χρησιμοποίησαν την Nazca και τους Ίνκας κατ’επέκταση ως το όνομα της μπάντας ο Guillaume με τον Romauld στο πρώτο τους single το 2019, το Kanagawa
          </p>
          <a href="/article/Birds_of_nazca-archive" className="btn btn-primary">Read More</a>
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
