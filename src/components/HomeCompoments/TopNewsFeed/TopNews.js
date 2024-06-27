import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./Animation.css";


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
              <h3>Μια βραδιά σκέτου τρόμου - Sarathiel - Night of Horror (album review + project info)</h3>
              <img
                src="https://pulse-of-the-underground.com/assets/sddefault.jpg"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
              <p className="lead">
              Αναμνήσεις από τους Ιταλούς Superhorror μου έρχονται όποτε ακούω αυτό το project του καλού μου φίλου Γιώργου Αρνιώτη που ακούει στο όνομα Sarathiel! Το Night of Horror το πρώτο άλμπουμ αυτού του one man project απέκτησε σάρκα και οστά 5 μέρες πριν και δεν γινόταν να μείνει στην απ’έξω! Πάμε να δούμε ποιος είναι ο Γιώργος Αρνιώτης και οι Sarathiel!              
              </p>
              <NavLink
                to="/article/------Sarathiel---Night-of-Horror-(album-review-+-project-info)"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white"/>
              <h3>Σκοτεινή Άνθιση- Ætheria Conscientia - The Blossoming (Album Review + Band Info)</h3>
              <img
                src="https://pulse-of-the-underground.com/assets/a0850474684_10.jpg"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
             <p className="lead">
             Οι Ætheria Conscientia είναι μια μπάντα που αγάπησα από το πρώτο λεπτό ακροάσεως! Είναι ένα ενδιαφέρον σχήμα που θα ήθελα να μοιραστώ με όλους τους αναγνώστες με αφορμή την κυκλοφορία του νέου άλμπουμ τους με τίτλο The Blossoming! Πάμε να δούμε πρώτα ποιοι είναι! 
              </p>
              <NavLink
                to="/article/---theria-Conscientia---The-Blossoming-(Album-Review-+-Band-Info)"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
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
           Moonseeds: A Cosmic Journey Through Elemental Soundscapes
           </h2>
           <p className="lead">
           The album opens with the track “EARTH”, a slow-burning psych odyssey that immediately transports the listener to vast, arid landscapes. Waterreus’ guitar work is mesmerizing, with languid, spacey riffs that shimmer like heat mirages across a sonic desert. The guitar tones are rich and textured, evoking the rugged beauty of our planet’s most desolate regions.
           </p>
           <NavLink
                to="/article/Moonseeds-A-Cosmic-Journey-Through-Elemental-Soundscapes"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>

              <h3>SINGLE REVIEW: “La Forca” by Eva Can’t — Vocal Majesty and Instrumental Intricacy</h3>
              <p className="lead">
              From the moment “La Forca” begins, Eva Can’t plunges you into a tumultuous journey where haunting melodies and powerful vocals dominate the musical panorama. The single’s gripping intensity and lush instrumental arrangement create an atmosphere that leaves you breathless, perfectly previewing the depth and artistry of their upcoming album, “Emisferi”.
              </p>
              <NavLink
                to="/article/SINGLE-REVIEW:-La-Forca-by-Eva-Cant--Vocal-Majesty-and-Instrumental-Intricacy"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>

              <h3>ALBUM REVIEW: Déhà’s “Agenesis” Delivers a Raw and Profound Experience</h3>
              <p className="lead">
              “It was needed, so it was done”, or so the story goes for Déhà’s latest album “Agenesis”, a raw and compelling immersion into the depths of depressive suicidal black metal (DSBM). The album was meticulously crafted over two intense days of recording, showcasing Déhà’s emotional depth by blending improvised drums with hauntingly improvised guitars and bass. This release exemplifies Déhà’s exceptional ability to channel profound despair and introspection into a powerful musical creation.
              </p>
              <NavLink
                to="/article/ALBUM-REVIEW:-Dhs-Agenesis-Delivers-a-Raw-and-Profound-Experience"
                className="btn btn-danger"
              >
                {t("readMore")}
              </NavLink>
              <hr className="bg-white m-3"/>

              <p className="lead">
              GR:
           </p>
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
