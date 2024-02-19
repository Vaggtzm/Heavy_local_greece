import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import summit from './../../assets/Prisson.png';
import Prisson02 from './../../assets/prisson02.png';

import ReadMore from "../../compoments/ReadMore/ReadMore";
import PageWithComments from "../../compoments/Comments/comment";

const Prisson = () => {
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-evenly">
              <h3 className="display-4">The Dark Prison Massacre: Deformity of Human Consciousness</h3>
              <hr className="bg-dark" />
              <h4>Review</h4>
              <p className="lead">απο τον Ριν </p>
            </div>
            <hr className="bg-dark" />
            <div className="col-md-6 credits-box">
              <img src={summit} className="img-fluid ScentAlbumCover shadow-lg rounded-4" alt="Summit" />
              <h4>Credits</h4>
              <p className="lead">
                Καλλιτέχνης: The Dark Prison Massacre
                <br />
                Είδος: Slam / Brutal Death Metal
                <br />
                Χώρα: Κίνα
                <br />
                Έτος: 2017 (CD, digital), 2019 (κασέτα)
              </p>
              <p className="lead-text-center">
                Βρες τους The Dark Prison Massacre{' '}
                <a href="https://www.instagram.com/the.dark.prison.massacre?igsh=aWc3dXR5Y2NxYXg0">
                  <i className="bi bi-instagram"></i>
                </a>{' '}
                <a href="https://open.spotify.com/artist/5WJ2HzqjyCr5JzEHpELuq9?si=UDXYTR8WRLuXRdKVc9wNJw">
                  <i className="bi bi-spotify"></i>
                </a>
              </p>
            </div>
            <div className="col-md-6">
              <p className="lead">
                Καθώς έκανα ένα διαδικτυακό "scrolling", προς έκπληξή μου ανακάλυψα ένα Slam σχήμα από την Κίνα, συγκεκριμένα από το Tianjin, τους The Dark Prison Massacre. Κατευθείαν μου κίνησε το ενδιαφέρον το παράξενο, μακάβριο album cover του άλμπουμ τους, το "Deformity of Human Consciousness". Απεικονίζει μια φώκια περικυκλωμένη από χιόνι και αίμα, ενώ στο προσκήνιο εμφανίζεται ένα κομμάτι από κουφάρι, πιθανόν από ένα ανθρώπινο πόδι.
              </p>
              <img src={Prisson02} className="img-fluid ScentAlbumCover shadow-lg rounded-4" alt="Prisson02" />
              <p className="lead">
                Μουσικά είναι μια έκρηξη δυναμικότητας από το πρώτο κιόλας κομμάτι, το "Silence of Decay", το οποίο μάλιστα περιλαμβάνει παραδοσιακή κινεζική μουσική μαζί με τα επιθετικά blast beats και τα κλασικά guttural slam vocals. Ολόκληρο το άλμπουμ ισορροπεί μεταξύ της σκληρότητας του Slam, με τα βαριά ντραμς και τα pitch shifted φωνητικά, και μιας συναρπαστικής και σταθερής ορμής που κρατάει τον ακροατή σε ακραία ένταση.
              </p>
              <p className="lead">
                Οι εναλλαγές μέσα στα κομμάτια είναι απίστευτες, όχι μόνο σε θέμα ταχύτητας και "βαρύτητας", αλλά και η ενορχήστρωση η ίδια, καθώς εμφανίζονται μουσικά όργανα που παραπέμπουν σε άλλα είδη μουσικής, όπως πνευστά τα οποία για μερικά δευτερόλεπτα θυμίζουν τζαζ, όργανα της παραδοσιακής κινέζικης μουσικής που δίνουν ένα ήρεμο instrumental τόνο, ακόμα και στοιχεία της techno μουσικής μπορούν να διακριθούν στο τελευταίο κομμάτι. Οι The Dark Prison Massacre εν ολίγοις ξεγελούν τον ακροατή, παίζοντας με την ακοή του. Επίσης αξίζει να σημειωθεί ότι οι καλλιτέχνες έχουν και Nu Metal επιρροές, και αυτό μπορεί να φανεί από την διασκευή τους σε ένα κομμάτι των Korn, το "Faget".
              </p>
              <p className="lead">
                Γενικότερα μιλάμε για μια μουσική “πανδαισία”, ένα άλμπουμ αρκετά συναρπαστικό, γεμάτο αλλόκοτους συνδυασμούς. Πραγματικά μια ιδιαιτερότητα που αποδεικνύει το πόσο προσαρμόσιμη μπορεί να γίνει η metal. (5:13)!
              </p>
            </div>
            <PageWithComments />
            <ReadMore />
          </div>
        </div>
      </>
    );
  };
  
  export default Prisson;