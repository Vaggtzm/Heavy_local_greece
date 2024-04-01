import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import Beast01 from './../../assets/NightStalker.jpg';
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import Footer from "../../compoments/footer/footer";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import PageWithComments from "../../compoments/Comments/comment";

const NightStalker = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Ο Σκοτεινός Μύθος Που κρυβει το ονομα των NightStalker

                    <p className="lead">Ιστορία/Παρελθόν</p>
                    <hr className="bg-dark"></hr>
                </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={Beast01} className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Πηγες</h4>
                    <p className="lead d-flex justify-content-evenly"> 
                          <a href="https://en.wikipedia.org/wiki/Richard_Ramirez">Bικιπαιδεια</a>
                     </p>
                    <ReadMore />
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Nightstalker, η εμβληματική μπάντα. Ποιος δεν έχει τύχει να τους ακούσει έστω και για μια φορά; Μια stoner μπάντα με αρκετά χρόνια στο ενεργητικό της και κλασικές συνθέσεις όπως το “Dead Rock Commandos” και το “Children of the Sun”, οι οποίες έχουν την τιμητική τους σε αρκετές Ελληνικές playlist.

Παίρνοντας τα πράγματα από την αρχή, το όνομα Nightstalker προέκυψε από από τα Αμερικανικά ΜΜΕ ως παρατσούκλι για τον κατά συρροή δολοφόνο Ρίτσαρντ Ραμίρεζ (1960-2013) που καταδικάστηκε για 13 δολοφονίες, 5 απόπειρες και 11 βιασμούς.
                    </p>
                    <p className="lead">
                    Ο Ρίτσαρντ γεννήθηκε στο Ελ Πάσο του Τέξας, στις 29 Φλεβάρη του 1960, ενώ ήταν το 5ο παιδί της οικογένειάς του. Κατά την διάρκεια της παιδικής του ηλικίας υπέστη 2 σοβαρά ατυχήματα στο κεφάλι, ένα από τα οποία τον άφησε αναίσθητο, ενώ στα 6 του συχνές ήταν οι επιληπτικές κρίσεις. Ως παιδί συνήθιζε να πηγαίνει συχνά στην εκκλησία και να προσφέρει βοηθητικές υπηρεσίες, αλλά η “κατρακύλα” άρχισε να έρχεται στην τρυφερή ηλικία των 10, καθώς βρέθηκε συχνά - πυκνά να κοιμάται στο νεκροταφείο της πόλης για να αποφεύγει τον αυταρχικό πατέρα του.

Στην ηλικία των 14 μετακόμισε στο Los Angeles ενώ η πρώτη του εγκληματική πράξη έγινε στην ηλικία των 17, καθώς συνελήφθη για παράνομη κατοχή ναρκωτικών από την τοπική αστυνομία.                    </p>
                    <p className="lead">
                    Στα επόμενα χρόνια θα ξεκινήσει να πέφτει ακόμη περισσότερο, περνώντας από την μια δολοφονία στην άλλη. Ένα από τα διακριτά χαρακτηριστικά του Ρίτσαρντ το οποίο τον έκανε να ξεχωρίζει από τους άλλους δολοφόνους, σύμφωνα με το FBI, ήταν το γεγονός ότι δεν ακολουθούσε κάποιο συγκεκριμένο μοτίβο. Ουκ ολίγες φορές εξανάγκαζε τα θύματα του να ορκιστούν στον Σατανά ώστε να τα αφήσει να ζήσουν, ενίοτε προτού τα δολοφονήσει έπαιζε σαδιστικά παιχνίδια μαζί τους και πιο σπάνια τα βίαζε ή τα έκλεβε, Μπορούμε να πούμε συνοπτικά ότι ήταν μια πολυσχιδής και χαώδης προσωπικότητα δολοφόνου.
                    </p>
                    <p className="lead">
                    Ωστόσο, καθώς τέλειο έγκλημα δεν υπάρχει, το γεγονός ότι άφηνε τα θύματά του να ζήσουν έπαιξε και καθοριστικό ρόλο στην σύλληψή του, οδηγώντας τον έτσι στο να εκτίσει 27 χρόνια στην φυλακή και στην θανατική ποινή. Παρότι ήταν ένας από τους πιο βίαιους δολοφόνους, όσο ήταν κρατούμενος, λάμβανε συχνά ερωτικά γράμματα και αξιοσημείωτο μάλιστα ήταν πως παντρεύτηκε μια από τις θαυμάστριες του το 1996, την Doreen Lioy.
                    </p>
                    <PageWithComments />

                </div>
            </div>
           </div>
        </>
    )
}
export default NightStalker;