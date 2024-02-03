import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import ScentOfThorns01 from './../../assets/DevourTheWill.jpg';
import ScentOfThornsLogo from './../../assets/ScentOfThornsFULL.jpg';
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import Footer from "../../compoments/footer/footer";
const ScentOfThorns = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Devour the will - Scent of Thorns
                    <hr className="bg-dark"></hr>
                    
                    <h4>Προεπισκόπηση τραγουδιού</h4> <p className="lead">Απο τον Μιχάλη Αντωνόπουλο</p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={ScentOfThorns01} className="img-fluid ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Credits</h4>
                    <p className="lead"> released January 16, 2024
                        Lyrics by Barbara Aggelidou
                        Music by Sravriana Previzi, Markos Karathanasis, Anastasis Kallistratos
                        Artwork by:Barbara Aggelidou
                         </p>
                         
                         <p className="lead-text-center">Βρες τους Scent Of Thorns <a href="https://www.instagram.com/scentofthorns/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"><i className="bi bi-instagram"></i></a> <a href="https://web.facebook.com/scentofthorns/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0"><i className="bi bi-facebook"></i></a></p>
                         <p className="lead-text-center">Digital copy του Devour the will <a href="https://scentofthorns.bandcamp.com/track/devour-the-will">Εδω</a></p>
                         <ReadMore />
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Οι Scent of Thorns είναι μια νέα μπάντα αποτελούμενη από φοιτητές - μέλη της ομάδας της Μουσικής Συντροφιάς του Πανεπιστημίου Ιωαννίνων (ΜΟΥ.ΣΥ.ΠΙ εν συντομία). Συστάθηκαν μόλις το 2022 και το μουσικό είδος στο οποίο εντάσσουν τους εαυτούς τους είναι η Melodic Death. Στα πρώτα του βήματα το συγκεκριμένο συγκρότημα κατάφερε στα lives των τοπικών venues να αποκομίσει αρκετά θετικές αξιολογήσεις από τους παρευρίσκοντες ακροατές και από τους ανταποκριτές άλλων ιστοσελίδων της μέταλ μουσικής που κάλυψαν το μέχρι στιγμής καλύτερο live των Scent of Thorns στις 21 Οκτωβρίου του 2023 με κατά κόρον διασκευές κομματιών από τους Dissection (Black Dragon) τους Mors Principium Est (Apprentice of Death), τους Gwendydd (A Hypocrite in a Child’s Eyes) και τους Amon Amarth (Guardians of Asgard) ενώ παρουσίασαν ανεπίσημα δυο αποκλειστικά δικά τους τραγούδια, το Devour the Will και το Death Foreseen. Το πρώτο κυκλοφόρησε μάλιστα προσφάτως και ο ίδιος οφείλω να παραδεχτώ πως χάρηκα πάρα πολύ για το αποτέλεσμα από μουσικής αλλά και στιχουργικής άποψης. 
                    </p>
                  <p className="text-center"> <img src={ScentOfThornsLogo} className=" img-fluid W-100 m-2 shadow-lg rounded-4"></img></p> 
                    <p className="lead">
                    Περνώντας στο κυρίως θέμα:

Παρά την νεότητα των μελών του συγκροτήματος ουδείς μπορεί να αρνηθεί την προσεγμένη και λεπτομερή δουλειά που έριξαν στις πρόβες και στις ηχογραφήσεις. Το συγκεκριμένο κομμάτι συνδυάζει άπταιστα την μελωδικότητα του φλάουτου με την δυναμική και την τεχνικότητα της κιθάρας που απαιτείται να υπάρχει στο υποείδος της death metal, μάλιστα κατά την δική μου άποψη tech στοιχεία μπορούν να διακριθούν κατά μήκος του τραγουδιού, ενώ τα ντραμς εναρμονίζονται πολύ καλά με τις στιγμές του φλάουτου και των καθαρά instrumental στιγμών των κιθάρων. Όσον αφορά τα φωνητικά, η τραγουδίστρια παραδόξως δίνει με την αύρα των harsh vocals της και ένα blackened στοιχείο που εύκολα καθηλώνει τον ακροατή. Δοθέντων αυτών λοιπόν των τεχνικών λεπτομερειών μπορώ να αναφέρω ο ίδιος πως δίνεται συνδυαστικά στο κομμάτι το στοιχείο της ατμοσφαιρικής αρμονικής ανατριχίλας που παρέχει το φλάουτο, της σκληρότητας (brutality) των κιθάρων και της απόγνωσης που φέρνει ο τρόμος ο οποίος πηγάζει από την τραχύτητα των vocals.
Στιχουργικά το τραγούδι θέλει να εκφράσει την σταδιακή θανάτωση του εγώ, του φωτεινού σημείου της βούλησης, που μας κάνει ανθρώπους, δηλαδή πραγματεύεται την κατάθλιψη που διαβρώνει τον άνθρωπο ψυχοσωματικά σε μια ατομικιστική “κανιβαλιστική” κοινωνία, και αβοήθητος καθώς μένει όπως και απομονωμένος κατακλύζεται από τους δαίμονες του οι οποίοι στο τέλος τον αφήνουν ένα νεκροζώντανο κουφάρι που ζει για να ζει δίχως νόημα, γιατρειά και συντροφιά, αναμένοντας καρτερικά την εξιλέωση μέσω του θανάτου.


                    </p>

                </div>
            </div>
           </div>

        </>
    )
}
export default ScentOfThorns;