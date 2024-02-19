import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import summit from './../../assets/liquify.jpg';
import ReadMore from "../../compoments/ReadMore/ReadMore";
import PageWithComments from "../../compoments/Comments/comment";

const Liquify = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Liquify - Tales of the Turquoise Turtle

                    <hr className="bg-dark"></hr>
                    
                    <h4>Review</h4> <p className="lead">απο τον Μιχάλη Αντωνόπουλο </p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={summit} className="img-fluid ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Credits</h4>
                    <p className="lead">
                    Album (1ω. 4λ.): 

<p>1) Lucid Hallucinations (Instrumental) 5:13</p>
<p>2) Dandelion 5:13</p>
    <p>3) Into the Translucent Mirage (instrumental) 2:31</p>
    <p>  4) The Purple Jellyfish 6:07</p>    
    <p>            5) Where the Dragonflies Sleep (instrumental) 7:03</p>
    <p>            6) Emerald Lagoon 5:35</p>          
    <p>            7) Oceana (instrumental) 4:15</p>
    <p>            8) Mozzarella 6:52</p>
    <p>            9) The Turtle Song (instrumental) 5:41</p>
    <p>            10)  Gifts from the Frog King (instrumental) 3:37</p>
    <p>            11) Spirals (4:45)</p>
                    </p>
    
                         
                         <p className="lead-text-center">Βρες τους Liquify  <a href="https://www.instagram.com/liquifyofficial/?hl=el"><i className="bi bi-instagram"></i></a> <a href="https://www.youtube.com/channel/UCJjIGdWFInVHC7dC6G5QGQg"><i className="bi bi-youtube"></i></a></p>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Καθίστε ήρεμα, όπως κάθισα και εγώ αναπαυτικά, και ξαπλώστε στο κρεβάτι σας! Βγάλτε τα ρούχα και τα βάρη της καθημερινότητας και των κουραστικών ανθρώπων και φορέστε τα ακουστικά σας όσο βρίσκεστε κάτω από τα σκεπάσματα του κρεβατιού σας με την ξεχωριστή ζεστασιά τους!
                    </p>
                    <p className="lead">
                    Τώρα αναλαμβάνουν την ηρεμία και την χαλάρωση σας οι Liquify! Αυτή η Αμερικανική μπάντα εξ Ουάσιγκτον με το άλμπουμ της Tales of the Turquoise Turtle θα σας ταξιδέψει στα γαλήνια γαλάζια νερά ενός απέραντου ωκεανού παρέα με μια τιρκουάζ πάνσοφη γελαστή χελώνα 100 και βάλε ετών! Θα σας διηγηθεί όλες της τις περιηγήσεις!  
Μελωδίες που πιάνουν την επιτομή της ατμόσφαιρας μιας υπερβατικής νιρβάνας, γλυκός ήχος στις κιθάρες και χαλαρωτικά ξυσίματα τους, διατηρώντας ωστόσο το πατροπαράδοτο βαρύ τους ψυχεδελικό στοιχείο στα riffs! Οι εναλλαγές μεταξύ lead και rhythm κιθάρων κυλούν αρμονικά στον βυθό της Oceana (4:15) ενώ τα χαλαρωτικά cosmic φωνητικά σε πέντε εκ των 12 τραγουδιών του Tales of the Turquoise Turtle απογειώνουν την μαγική περιήγηση!  Ας τονίσω στο ενδιάμεσο πως είναι το πρώτο τους άλμπουμ στο οποίο μπορεί να εντοπίσει κάποιος φωνητικά, καθώς οι Liquify είναι μια αρχετυπική instrumental ψυχεδελική μπάντα! Όσο θα ακούτε, επιστρέφοντας, τις ιστορίες της χελώνας αυτής, όπως και το μυστηριώδες τραγούδι της - The Turtle Song (5:41) παράλληλα θα βλέπετε και στον ωκεανό Oceana διάφορα θαυμαστά σημεία! Όπως ασύμμετρους κυματισμούς στον πάτο -  Ripples on the Sea Floor (7:31) και μια αλλόκοτη μωβ μέδουσα με μάτια και στόμα - The Purple Jellyfish (6:07)! Παράξενος, όμως διασκεδαστικός ταυτόχρονα ωκεανός δεν είναι! Εε; Αα! Ξέχασα να αναφέρω πως εδώ μου είπε η χελώνα και είδα μάλιστα και ο ίδιος ένα μέρος όπου κοιμούνται λιβελούλες στην θάλασσα! Where the Dragonflies Sleep (7:03). Άλλες εκπλήξεις θα σας φανερωθούν έαν ακούσετε το άλμπουμ ολόκληρο! Δεν μπορώ να σας τα αποκαλύψω όλα από μια προεπισκόπηση!
                    </p>
                    <p className="lead">Θα είναι εν τέλει μια απολαυστική ξενάγηση σε αυτόν τον βυθό διάρκειας 1 ώρας και 4 λεπτών!  
Τουλάχιστον έτσι την βίωσα εγώ! Αλλά και πάλι μπορεί να ήταν απλώς οι διαυγείς παραισθήσεις μου - Lucid Hallucinations (5:13)!</p>
                    <PageWithComments />
                </div>
                <ReadMore />
            </div>
           </div>

        </>
    )
}
export default Liquify;