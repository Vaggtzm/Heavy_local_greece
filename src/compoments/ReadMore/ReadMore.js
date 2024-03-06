import React from "react";
import SacrificeInFire from "./../../assets/SIF.jpg";
import BluesCondors from "./../../assets/BluesCondors01.jpg";
import ADE from "./../../assets/Udad01.jpg";
const ReadMore = ()=>{
    return(
        <>
    <div className="container">
        <h4>Heavy Local Reviews</h4>
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg " src={SacrificeInFire}></img>
                <h4 className="card-title">Sacrifice In Fire:Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Οι Sacrifice in Fire είναι μια death metal μπάντα από τη Γερμανία που ανακάλυψα εντελώς τυχαία μέσω του Instagram. Μπορώ να πω πως πρόκειται για ένα από τα ακατέργαστα διαμάντια που έχω ανακαλύψει. Με μια ματιά στη μουσική τους, αναδεικνύεται ένας δυστοπικός στίχος με την συνοδεία απόκοσμων πλήκτρων, ενώ τα ντραμς με τις κιθάρες προσδίδουν ένα ορμητικό ύφος. Κομμάτια όπως το Concrete Grave και το Weapons of Mass Destruction μας μιλούν για το σκληρό πρόσωπο της ανθρωπότητας και για το τι είναι ικανός να κάνει ο άνθρωπος.


                        </p>
                       <a href="/article/Sacrifice-In-Fire-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
            <div className="card h-100 w-100">
                <img className=" card-img-top shadow-lg" src={BluesCondors}></img>
                <h4 className="card-title"> Blues Condors - 45 Blues:Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Οι Blues Condors είναι μια μπάντα blues/rock από τη Θεσσαλονίκη. Πριν από δύο χρόνια κυκλοφόρησαν το πρώτο τους EP με τίτλο '45 Blues', το οποίο είχα την ευκαιρία να αποκτήσω σε μορφή hard copy από τον Vapa (μέλος των Blues Condors και των Lioneye).Καθώς εισέρχεται το EP, από τα πρώτα δευτερόλεπτα ακούμε μια παλιά αισθητική σχεδόν από τη δεκαετία του '70. Ο τρόπος με τον οποίο ο τραγουδιστής ερμηνεύει τους στίχους, συνοδευόμενος από επιρροές από το στιλ του Jim Morrison (The Doors), είναι εμφανής. Οι κιθάρες δεν είναι τόσο βαριές και παραμορφωμένες, διατηρώντας έναν χορευτικό ρυθμό, ενώ ταυτόχρονα δημιουργούν έναν μυστηριώδη αέρα.
                        </p>
                       <a href="/article/Blues-Condors-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
            <div className="card text-center h-100 w-100">
            <img className=" card-img-top shadow-lg" src={ADE}></img>
                <h4 className="card-title">Veins of Darkness: Udåd Emerges with Raw Norwegian Black Metal</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Udåd emerges from the shadowy depths, delivering a primal offering steeped in the essence of Norwegian Black Metal. Spearheaded by Thomas Eriksen, the mastermind behind Mork, this debut release ignites a blazing trail back to the genre’s raw and uncompromising origins. Udåd stands as a stark departure from the intricate tapestries woven by Mork, instead embracing a primal ethos reminiscent of the early 1990s Black Metal movement. Drawing inspiration from the bone-chilling atmospheres </p>
                       <a href="/article/Udad-archive" className="btn btn-primary">Read More</a>

                    </div>

            </div>

          </div>
        <hr className="bg-dark" />

        </div>
        </div>        </>
    )
}
export default ReadMore;