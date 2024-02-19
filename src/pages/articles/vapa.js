import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import vapa from "./../../assets/vapa.jpg";
import vapa02 from "./../../assets/Vapa02.jpg";
import PageWithComments from "../../compoments/Comments/comment";

const Vapa = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Vapa - Memories of a Flawless World"
                    <hr className="bg-dark"></hr>
                    
                    <h4>Κριτική</h4> <p className="lead">Απο τον Βαγγελη Τζιμα</p>

                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={vapa} className="img-fluid ScentAlbumCover shadow-lg rounded-4"></img>
                    <hr className="bg-dark"></hr>
                    <h4>Track List</h4>
                    <p className="lead"> 
                    1. Autumn Fall
                    2. Take Over
                    3. Nite Rain
                    4. No Limits
                    5. Sirens

                         </p>
                         
                         <p className="lead-text-center">Βρες των vapa <a href="https://www.instagram.com/_vapa__/"><i className="bi bi-instagram"></i></a> <a href="https://web.facebook.com/search/top?q=vapa%20music"><i className="bi bi-facebook"></i></a><a href="https://open.spotify.com/artist/6Z3BwpBOPDigMB8A1LisvH?si=w9XevPCsRhKqrMMIjj6Q3w"><i className="bi bi-spotify"></i></a></p>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Κατά τη διάρκεια ενός χαλαρού πρωινού, αποφάσισα να αφιερώσω χρόνο στο νέο EP με τίτλο "Memories of a Flawless World" από τον Vapa ( Lioneye). Καθώς έπινα τον καφέ μου, βυθίστηκα στις σκέψεις και τα συναισθήματα που προκλήθηκαν από αυτή την ακρόαση.                    </p>
                    <img src={vapa02} className=" img-fluid w-100 h-25 m-4 shadow-lg rounded-4"></img>

                    <p className="lead">
                    Συνολικά, το "Memories of a Flawless World" αναδεικνύεται ως ένα ενδιαφέρον έργο με έντονες επιρροές από το heavy metal και το ροκ. Ακόμα και οι πιο απαιτητικοί ακροατές θα νιώσουν τη νοσταλγία που προκαλούν οι μελωδίες, εισβάλλοντας σε έναν "κόσμο" που ο συνθέτης μας παρουσιάζει.
                    </p>
                    <p className="lead">
                    Δομικά, το EP φαίνεται να μας αφηγείται μια ιστορία, αυξάνοντας την ένταση σταδιακά και οδηγώντας μας σε κάθε γωνιά αυτού του "άψογου κόσμου", όπως υποδηλώνει ο τίτλος. Ανάμεσα στα κομμάτια, ξεχωρίζει ιδιαίτερα το τρίτο στη σειρά, "Nite Rain", ενώ δεν πρέπει να παραβλέπονται και οι πιο ενεργητικές συνθέσεις όπως το "No Limits" και το "Sirens," το οποίο αποτελεί ένα τέλειο κλείσιμο στην ιστορία που εκφράζει το EP.

                    Πώς θα συνεχίσει αυτό το μουσικό ταξίδι; Μόνο ο Vapa γνωρίζει, και αυτή η αβεβαιότητα προσθέτει μια προκλητική πτυχή στην εμπειρία του "Memories of a Flawless World."
                    </p>
                    <PageWithComments />

                </div>
                <ReadMore />

            </div>
           </div>

        </>
    )
}
export default Vapa;