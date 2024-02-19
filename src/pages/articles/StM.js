import React from "react";
import './articles.css';
import UrbanPsychePic from './../../assets/UrbanPshyce.jpg';
import StartTheMonkey01 from './../../assets/startTheMonkey.jpg';
import StartTheMonkey02 from './../../assets/StartTheMonkey_second.jpg';
import Navigation from "../../compoments/Navigation/Navigation";
import Contact from "../../compoments/ContactForm/contact";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import Donate from "./../../compoments/donate/donate";
import Footer from "../../compoments/footer/footer";
import PageWithComments from "../../compoments/Comments/comment";

const StartTheMonkey = () => {
    return (
        <>
           <Navigation />
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 mt-4 p-2 text-center">Start The Monkey - Urban Psyche</h1>
                        <div className="details text-center">
                            <p className="lead">Track List:</p>
                            <p className="lead">01:Why</p>
                            <p className="lead">02:Cave</p>
                            <p className="lead">03:Follow Through</p>
                            <p className="lead">04:Deadly Crime</p>
                            <p className="lead">05:Passage I</p>
                            <p className="lead">06:Stength of Suicide</p>
                            <p className="lead">07:By the creek</p>
                            <p className="lead">Συνολική Ακρόαση: 35 λεπτά</p>
                        </div>
                        <hr className="bg-dark"></hr>
                    </div>
                  <div className="col-md-6 details-box">
                    <img src={UrbanPsychePic} className="img-fluid rounded-4 w-100 h-25 shadow-lg  p-2" />
                    <p className="lead p-2">
                                    released May 5, 2023

                Written and performed by StartTheMonkey
                Lyrics by Iasonas Gousas
                Recored at studio A11 Mixed and Mastered by Kostas Gerochristos
                Produced by StartTheMonkey and Dionisis Kiamos at A11 studios.
                Released via Electric Talon Records.

                StartTheMonkey are guitars Dionisis kiamos,bass Manos Analampidakis,drums George Papaioannou ,vocals/flute Iasonsas Gousas

                Artwork by Haris Tsikleas 
                    </p>
                    <hr className="bg-dark"></hr>
                  </div>
                  <div className="col-md-6">
                    <p className="lead">
                    Μουσικοί… Περίεργα πλάσματα! Ειδικά όσοι βρίσκονται σε μια μπάντα!
Τελειομανείς άνθρωποι με τόσες πολλές γνώμες να πέφτουν πάνω στο τραπέζι που καθιστούν την σύνθεση και την παραγωγή καλής μουσικής μια δύσκολη υπόθεση. 
Βέβαια από την σκοπιά των StartTheMonkey η προσέγγιση είναι διαφορετική, όπως και το είδος τους, “Post Doom”, με το οποίο αυτοπροσδιορίζονται. 
                    </p>
                    <hr className="bg-dark"></hr>
                    <img src={StartTheMonkey01} className="img-fluid rounded-4 w-100  shadow-lg  p-2" />
                    <hr className="bg-dark"></hr>
                    <p className="lead">
                    Καθώς ρίχνουμε μια ματιά στο πρώτους άλμπουμ με τίτλο “Urban Psyche”, είναι εύκολο να αναγνωρίσουμε μια μπάντα με λύσεις Do It Yourself (DIY) και underground πνεύμα. Τα κομμάτια εκφράζουν τους εφιάλτες παράλληλα με το αίσθημα/ την αίσθηση της λυρικής κατάθλιψης. Μια αξιοσημείωτη λεπτομέρεια που μπορεί να διακριθεί είναι η έλλειψη του συνηθισμένου κλασικού διπετάλου, δείχνοντας με αυτό τον τρόπο μια προτίμηση προς έναν πιο ροκ χαρακτήρα, ενώ οι βαριά κουρδισμένες κιθάρες, ενωμένες με σχεδόν black metal φωνητικά παρέχουν έναν σκοτεινό ήχο, μαζί με τις απόκοσμες μελωδίες στο background οδηγούν σε μονοπάτια doom.                     </p>
                    <hr className="bg-dark"></hr>
                    <img src={StartTheMonkey02} className="img-fluid rounded-4 w-100  shadow-lg  p-2" />
                    <p className="lead">
                    Ένα καινούργιο στοιχείο για το συγκρότημα είναι η προσθήκη του φλάουτου, το οποίο απουσίαζε από το προηγούμενο EP. Αυτό θα μπορούσε να υποδηλώσει μια στροφή προς πιο συμφωνικά μονοπάτια, διατηρώντας ταυτόχρονα εντούτοις την πρωτοτυπία και το DIY ύφος. Οι StartTheMonkey εξελίσσονται με το καινοτόμο πνεύμα τους στην δημιουργία ενός παράξενου και ενδιαφέροντος απόκοσμου ήχου.                     </p>
                    <PageWithComments />

                    <ReadMore />

                  </div>
                </div>
            </div>
        </>
    );
}

export default StartTheMonkey;
