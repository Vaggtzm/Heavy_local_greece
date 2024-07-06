import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Animation.css";
import NavLink from "../../LanguageWrapper/NavLink";


const TopNews = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const topNewsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (topNewsRef.current) {
        const topNewsHeight = topNewsRef.current.getBoundingClientRect().top;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setVisible(scrollTop > topNewsHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={topNewsRef} className={`top-news-container ${visible ? "visible" : ""}`}>
      <div className="container-fluid">
        <div className="row text-white text-center">
          <div className="col-md-6">
              <h2>{t("Top News")}</h2>
              <hr className="bg-white"/>
              <h3>Αποκαλύπτοντας την ιστορία πίσω από την Οργή της Μέδουσας - Συνέντευξη με τους Medusa's Wrath</h3>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FMedusas.jpg?alt=media&token=665df9dc-3b5f-4c9b-805f-a08849e08c6d"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
                
             <p className="lead">
             Σήμερα μαζί μας έχουμε μια μπάντα Ελληνική μπάντα η οποία παίζει έναν διαχρονικό, νοσταλγικό αλλά και παράλληλα απαράμιλλης δυναμικότητας ήχο! Χαίρετε, Medusa’s Wrath, είναι μεγάλη μας τιμή να σας έχουμε μαζί μας, έστω και γραπτώς, σήμερα στο περιοδικό! Ας μπούμε στο προκείμενο λοιπόν και να σας μάθουμε καλύτερα και εμείς αλλά και οι αναγνώστες μας! 


Είστε μια Heavy Metal μπάντα με την όλη έννοια αυτού του κλασικού ατσαλένιου ήχου που είναι διαχρονικά αγαπημένος για εκατομμύρια αυτιά! Πώς ξεκινήσατε το μουσικό σας ταξίδι στον χώρο αυτό και πώς σχηματιστήκατε σαν μπάντα;
              </p>
            
               <NavLink
                to="/article/--------------Medusa's-Wrath"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <h3>Reversed Chakra – Review “Game of Chess”!</h3>
              <img
                src="https://pulse-of-the-underground.com/assets/PROMO BANNER.jpg"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
              <p className="lead">
              The single showcases Reversed Chakra’s talent for crafting a rich sonic landscape, blending introspective indie rock with the moody allure of new wave and the expansive soundscapes of post-rock. This ambitious fusion creates a song that feels both familiar and refreshingly unique.              </p>
              <NavLink
                to="/article/Reversed-Chakra--Review-Game-of-Chess"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white"/>
           
             
              <hr className="bg-white" />
              <h3>Tunisian Metal Warriors — Znous</h3>
              <img
                src="https://pulse-of-the-underground.com/assets/znous.jpg"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
              <p className="lead">
              Formed in the heart of North Africa, Znous’s sound is a fierce amalgamation of hardcore, punk, and metal, genres known for their intensity and rebellion. Their music serves as both a reflection of and a reaction to the widespread social and political injustices that persist in Tunisia despite the revolution’s initial aspirations for change.
              </p>
             <NavLink
                to="/article/Tunisian-Metal-Warriors--Znous"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>

          </div>
          <div className="col-md-6">
            <h3>Latest Interviews/Reviews</h3>
            <hr className="bg-white m-3"/>

            <h4>Interviews</h4>
            <hr className="bg-white"/>
        <h3>The Sound of Dissent: Tunisian Metalcore's Post-Revolution Roar</h3>
         
              <p className="lead">
              Today, we have the distinct honour of speaking with Znous, a dynamic band from Tunisia. Renowned as the “Tunisian Metal Warriors”, Znous offers a powerful fusion of hardcore, punk, and metal. Their music embodies the intensity and rebellious spirit that defines these genres.

Welcome, Znous!
              </p>
              <NavLink
                to="/article/The-Sound-of-Dissent-Tunisian-Metalcores-Post-Revolution-Roar"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>
           <h4>Reviews</h4>
           <hr className="bg-white m-3"/>

           <p className="lead">
            ENG:
           </p>
           <h2>
           Frédéric D. Oberland “What On Earth (Que Diable) OISEAUX-TEMPÊTE” Album Review
                                            </h2>
           <p className="lead">
           For more than a decade, this band has been expanding its musical vision along the Mediterranean. Oiseaux-Tempête is known for its eclectic, cross-cultural approach to improv rock.           </p>
           <NavLink
                to="/article/Frdric-D-Oberland-What-On-Earth-(Que-Diable)-OISEAUX-TEMPTE-Album-Review"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>

              <h3>SINGLE REVIEW: Akhlys’ “Maze of Phobetor” — A Descent into Pure Black Metal Terror</h3>
              <p className="lead">
              Akhlys’ latest offering, “Maze of Phobetor”, sets a relentless pace into the heart of darkness. This tune, a veritable vortex of terror, showcases the band’s unwavering ability to conjure the most visceral of nightmares. Each riff, each chord, is a calculated descent into the abyss, leaving listeners teetering on the edge of sanity.
              </p>
              <NavLink
                to="/article/SINGLE-REVIEW-Akhlys-Maze-of-Phobetor--A-Descent-into-Pure-Black-Metal-Terror"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>

              <h3>NEW ALBUM: Pantheøn Band Reveals “Upswing” — A Tribute to Rock Gods Past and Present</h3>
              <p className="lead">
              ROME, June 22, 2024/ PRNewswire/ — The members of Pantheøn Band, stalwarts of Rome’s hard rock scene, have unveiled “Upswing”, their much-anticipated second album set for release on September 27th via Club Inferno Entertainment              </p>
              <NavLink
                to="/article/NEW-ALBUM:-Panthen-Band-Reveals-Upswing:-A-Tribute-to-Rock-Gods-Past-and-Present"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>

              <p className="lead">
              GR:
           </p>


           <h3>Δεν Είμαστε Μηχανές - Vaara - S/T (EP review + band info)</h3>
<p className="lead">
Και η μέρα κλείνει με μια Σουηδική μπάντα που έρχεται με ένα σημαντικό σύνθημα “Δεν Είμαστε Μηχανές” το οποίο αποτελεί ορόσημο για ένα γεγονός της Σουηδικής ιστορίας που κλόνισε τα θεμέλια της σύγχρονης πορείας της! Οι Vaara με το EP τους με τίτλο S/T έρχονται να υπενθυμίσουν στον κόσμο πως δεν είμαστε μηχανές! Πάμε να δούμε ποιοι είναι!
</p>             <NavLink
                to="/article/-----Vaara---ST-(EP-review-+-band-info)"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>


           <h3>Ένα Σκοτεινό Πεπρωμένο - Get A Grip - Destiny (Album Review + band info)</h3>
<p className="lead">
Επιστροφή μετά από ένα πενθήμερο ξεκούρασης με ένα άλμπουμ έκπληξη! Σήμερα θα πιάσω μια δυναμική μπάντα με ένα ακόμη πιο δυναμικό άλμπουμ εν ονόματι Destiny των Αμερικανών Get A Grip! Πάμε να δούμε ποιοι είναι!


Οι Get A Grip είναι μια hardcore punk μπάντα από το Τούσον της Πολιτείας Αριζόνα των ΗΠΑ η οποία αποτελείται από τους Gabriel, Alex , Ryan, Jacob και Cisco! Σχηματίστηκε το 2015 και έχει βγάλει μέχρι σήμερα 5 EPs 4 singles και το πρώτο τους άλμπουμ με τίτλο Destiny το οποίο θα μας απασχολήσει σήμερα! Πάμε να δούμε την δισκογραφία και το άλμπουμ!</p>
             <NavLink
                to="/article/-----Get-A-Grip---Destiny-(Album-Review-+-band-info)"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>


<h3>Απελπισία και Απομόνωση - Wroht - Beyond Salvation (single review + band info)</h3>
<p className="lead">
Συνεχίζουμε την περιήγησή μας στην Αμερική! Περνώντας από την Ανατολική Ακτή και τους Asasara της Μασαχουσέτης των ΗΠΑ προς την αντίθετη κατεύθυνση, την Δυτική, συναντούμε στο Όκλαντ της Καλιφόρνια μια μπάντα που δείχνει πως ανακατεύονται σωστά το death με το groove! Οι Wroht με το Beyond Salvation έρχονται να τα γκρεμίσουν όλα στο διάβα τους! Πάμε να δούμε ποιοι είναι πρώτα!
</p>
             <NavLink
                to="/article/-----Wroht---Beyond-Salvation-(single-review-+-band-info)"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNews;
