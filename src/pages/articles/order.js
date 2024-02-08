import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import order02 from './../../assets/order.jpg';
import order01 from './../../assets/mysticpath.jpg';
import ReadMore from "../../compoments/ReadMore/ReadMore";

const Order = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Order Of The Ebon Hand:Review
                    <hr className="bg-dark"></hr>
                    
                    <h4>Review</h4> <p className="lead">Απο τον Ριν</p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={order01} className="img-fluid ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Credits</h4>
                    <p className="lead">
                    Καλλιτέχνης: Order of the Ebon Hand Άλμπουμ: The Mystic Path to the Netherworld Είδος: Black Metal Χώρα: Ελλάδα (Αθήνα)
                    </p>
                         
                         <p className="lead-text-center">Βρες τους Order Of The Ebon Hand <a href="https://www.instagram.com/order_of_the_ebon_hand?igsh=MXVoMnlnczB2ZGtkOA=="><i className="bi bi-instagram"></i></a> <a href="/profile.php/?id=100063675366008"><i className="bi bi-facebook"></i></a><a href="//open.spotify.com/artist/2YlzQu5RVqY3ATIHscXi2h?si=Kic0VCv3SWWgHam2wGwQrg"><i className="bi bi-spotify"></i></a></p>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Αφού έμεινα μαγεμένος από τη συναυλία των Yoth Iria (27/01/2024) στα Ιωάννινα, και ιδιαιτέρως από την ενέργεια και τη παραστατικότητα του Merkaal (Ορέστη) θέλησα να μάθω περισσότερα για τη δουλειά του στο χώρο του Μέταλ και έτσι ανακάλυψα τους Order of the Ebon Hand (est. 1994), την μπάντα στην οποία είναι lead vocalist. Άκουσα τα δύο άλμπουμ τα οποία περιλαμβάνονται στο Spotify της μπάντας (XV: the Devil, Vii: The Chariot), τα οποία ήταν απολαυστικότατα, όμως ήθελα περισσότερο, και έτσι βρήκα στο YouTube το full-length ντεμπούτο τους, The Mystic Path to the Netherworld (1997). https://youtu.be/BP3yDCgGYTY?si=-lSJV-g7FAX84Hio
Εκ πρώτης όψεως, το album cover art δημιουργεί μια ψυχρή και νοσταλγική αίσθηση λόγω του έντονου γαλάζιου της επιβλητικής φιγούρας που πρωταγωνιστεί στο κάδρο. Στο βάθος υπάρχει μόνο ένα αμφίβολο μαύρο. Η φιγούρα περικλείεται από αιχμηρά κρύσταλλα που μοιάζουν με πάγο.
                    </p>
                  <p className="text-center"> <img src={order02} className=" img-fluid W-100 m-2 shadow-lg rounded-4"></img></p> 
                    <p className="lead">
                    Σε μουσικό επίπεδο, πληρεί όλες τις προϋποθέσεις του κλασσικού Μπλάκ μέταλ όπως το ξέρουμε, φορτισμένη, μελαγχολική ατμόσφαιρα, γρήγορα ντραμς που ρέουν μαζί με τη μελωδία της κιθάρας και τα απόκοσμα φωνητικά. Τα πλήκτρα παραπέμπουν τον ακροατή σε ένα τελετουργικό κλίμα, που καθησυχάζει αλλά παράλληλα προκαλεί δέος και αναστατώνει τη ψυχή. Το νοσταλγικό συναίσθημα του εξωφύλλου συνεχίζει και στον ήχο, ταξιδεύοντας τον ακροατή σε κάποιον φανταστικό κόσμο που επικρατεί ο πόλεμος ανάμεσα στους ήρωες και τους εχθρούς τους, το σκοτάδι και το φως. Οι συναρπαστικές διακυμάνσεις σε κάθε κομμάτι ζωντανεύουν ακόμη περισσότερο την ιστορία τους.
Ιστορίες μάχης, μυστικισμού και επικής φαντασίας εκτυλίσσονται στους γλαφυρούς στίχους όλου του άλμπουμ, όπου αναφέρονται πόλεμοι, θεότητες, δαίμονες ακόμα και ένας δράκος με κατακόκκινα μάτια. Με μια ανάγνωση θα σε ταξιδέψουν στους συναρπαστικούς θρύλους τους.
                    </p>

                </div>
                <ReadMore />
            </div>
           </div>

        </>
    )
}
export default Order;