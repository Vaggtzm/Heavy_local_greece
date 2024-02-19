import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import order02 from './../../assets/Funeral02.jpg';
import order01 from './../../assets/Funeral01.jpg';
import ReadMore from "../../compoments/ReadMore/ReadMore";
import PageWithComments from "../../compoments/Comments/comment";

const Funeral = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Funeral Chasm - Omniversal Existence:Review
                    <hr className="bg-dark"></hr>
                    
                    <h4>Review</h4> <p className="lead">Απο τον Bαγγελη Τζιμα</p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={order01} className="img-fluid ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Details</h4>
                    <p className="lead">
                        Track List
                    </p>
                    <p className="lead">
                    Embellishment of Inception
                    </p>
                    <p className="lead">
                    The Truth That Never Was 
                    </p>
                    <p className="lead">
                    Mesmerising Clarity 
                    </p>
                    <p className="lead">
                    Extracting the Flesh from the Gods 
                    </p>
                    <p className="lead">
                    Sunrise Vertigo 
                    </p>
                    <p className="lead">
                    The Skeleton Secret 
                    </p>
                    <p className="lead">
                    Astral Reality 
                    </p>

                    <p className="lead">
                    line-up
                    </p>
                    <p className="lead">
                    Sjaelepest-Guitars 
                    </p>
                    <p className="lead">
                    Danny Woe - Vocals, Bass, Drums, Keyboards              
                       </p>                    
                         
                         <p className="lead-text-center">Βρες τους Funeral Chasm <a href="https://www.instagram.com/funeralchasm/"><i className="bi bi-instagram"></i></a> <a href="https://web.facebook.com/Funeralchasm"><i className="bi bi-facebook"></i></a><a href="https://open.spotify.com/artist/2Mvoqz8w1u54SIAOsT3MAk?si=IWcMSw60RXyXLbs3vsRt2Q&nd=1&dlsi=9e6b0d18e4dd476f"><i className="bi bi-spotify"></i></a></p>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Οι Funeral Chasm είναι μια πρόσφατα ιδρυθείσαι μπάντα (2020) funeral doom metal από τη  Δανία, με έντονες επιρροές από τη gothic σκηνή των 90s, όπως αναφέρουν οι ίδιοι. Αυτό προσέθεσε έναν ποιητικό τόνο στον ήχο τους, τον οποίο πρόσεξα κατά την πρώτη ακρόαση του "Omniversal Existence", που κυκλοφόρησε το 2022. Η μπάντα αποτελείται από δύο μέλη (Sjaelepest, Dany Woe) με βάση τη Φινλανδία και έχει στο ενεργητικό της ένα άλμπουμ, το οποίο επέλεξα να αναθεωρήσω σήμερα.
                    
                    </p>
                  <p className="text-center"> <img src={order02} className=" img-fluid W-100 m-2 shadow-lg rounded-4"></img></p> 
                    <p className="lead">
                    Το "Omniversal Existence" είναι ένα κλασικό άλμπουμ funeral doom metal, με κύρια χαρακτηριστικά την αργή και βαριά κιθάρα και τα σκοτεινά πλήκτρα, δημιουργώντας μια βαριά και θλιμμένη ατμόσφαιρα που αγαπούν οι φαν του funeral doom. Πέρα ​​από την κλασικότητα του άλμπουμ, θα συναντήσετε επίσης καθαρά gothic φωνητικά με εκκλησιαστικό ύφος, που μας θυμίζουν τους 69 Eyes και τους Type O Negative. Θα έλεγα ότι το "Omniversal Existence" είναι ένα ατμοσφαιρικό έργο που, όταν ακούγεται στο κατάλληλο περιβάλλον, μας ταξιδεύει σε ένα χιονισμένο δάσος, όπου η επαφή μας με τον φυσικό κόσμο χάνεται και η φαντασία μας απογειώνεται.
                    </p>
                    <PageWithComments />

                </div>
                <ReadMore />
            </div>
           </div>

        </>
    )
}
export default Funeral;