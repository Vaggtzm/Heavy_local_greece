import React from "react";
import Navigation from './../../compoments/Navigation/Navigation';
import ScentOfThrons from './../../assets/DevourTheWill.jpg';
import UrbanPsyche from './../../assets/UrbanPshyce.jpg';
import Lioneye  from './../../assets/lioneye.jpg';
import Yothiria from './../../assets/liveYothiria.jpg';
import Socials from "../../compoments/SocialMedia/socials";
import "./../home.css"
const Articles =()=>{
    return(
        <>
        <Navigation />
        <header>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h3>Reviews:</h3>
            </div>
            <hr className="bg-dark" />
            <p className="lead">Update 30/01/2024</p>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Scent Of Thorns-Devour the Will: Κριτική από τον Μιχάλη Αντωνόπουλο</h4>
                <img src={ScentOfThrons} className="img-fluid w-100" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Οι Scent of Thorns είναι μια νέα μπάντα αποτελούμενη από φοιτητές - μέλη της ομάδας της Μουσικής Συντροφιάς του Πανεπιστημίου Ιωαννίνων (ΜΟΥ.ΣΥ.ΠΙ εν συντομία). Συστάθηκαν μόλις το 2022 και το μουσικό είδος στο οποίο εντάσσουν τους εαυτούς τους είναι η Melodic Death.</p>
                <a href="/Scent_of_thorns-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
            <hr className="bg-dark" />
            <div className="col-md-6 bg-secondary p-4">
                <h4>StartTheMonkey-Urban Psyche: Κριτική από τον Βαγγέλη Τζίμα</h4>
                <img src={UrbanPsyche} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Μουσικοί… Περίεργα πλάσματα! Ειδικά όσοι βρίσκονται σε μια μπάντα! Τελειομανείς άνθρωποι με τόσες πολλές γνώμες να πέφτουν πάνω στο τραπέζι που καθιστούν την σύνθεση και την παραγωγή καλής μουσικής μια δύσκολη υπόθεση. Βέβαια από την σκοπιά των StartTheMonkey η προσέγγιση είναι διαφορετική, όπως και το είδος τους, “Post Doom”, με το οποίο αυτοπροσδιορίζονται.</p>
                <a href="/Start_the_monkey-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
            <hr className="bg-dark" />
            <div className="col-md-6 bg-secondary p-4">
                <h4>Lioneye-S.E.X: Κριτική από τον Βαγγέλη Τζίμα</h4>
                <img src={Lioneye} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Ας ταξιδέψουμε λίγο πίσω στον χρόνο, σε μια περίοδο όπου αυτό το περιοδικό βρισκόταν ακόμη στον ψηφιακό κόσμο. Ήταν εκεί που οι τοπικοί μας Glam metallers, οι Lioneye, έκαναν το εντυπωσιακό τους ποδαρικό για το 2024 με το νέο τους άλμπουμ, το S.E.X. Η μπάντα παρουσιάζει ένα EP που φέρνει στο φως πέντε κομμάτια, όπου το καθένα από αυτά αποτελεί ένα ξεχωριστό μουσικό ταξίδι με την μοναδική υπογραφή της εν λόγω μπάντας. Το tracklist περιλαμβάνει τα “The Game”, “Sin City Blues”, “Grind Down”, “S.E.X.” και “I Can’t Miss You Anymore”, προσφέροντας συνολικά 20 λεπτά ακρόασης. .</p>
                <a href="/lioneye-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
            <hr className="bg-dark" />
            <div className="col-md-12">
                <h3>Live Reports:</h3>
            </div>
            <p className="lead">Update 30/01/2024</p>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Yoth Iria x Temple of Katharsis x Scent of Thorns</h4>
                <img src={Yothiria} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Χθες το βράδυ στην πόλη μας πραγματοποιήθηκε το live των Yoth Iria στο κλασικό μας Γιαννιώτικο στέκι, το Studio 203. Εκ πρώτης όψεως ο χώρος ήταν αρκετά μικρός! Χωρίς αυτό ωστόσο να μειώνει την αξία του. Σίγουρα δεν άγγιζε τις εποχές που τα live γίνονταν στο Stage. Παρόλα αυτά, ο ήχος ήταν αψεγάδιαστος και καθαρός, χωρίς τα τυπικά ηχοληπτικά προβλήματα. Στο μάτι, η χωρητικότητα ήταν περίπου 150 έως 200 άτομα, με τα εισιτήρια σχεδόν να τίθενται σε sold out.

                    Οι πόρτες άνοιξαν γύρω στις 9, ενώ λίγα λεπτά αργότερα ανέβηκε στη σκηνή του Studio 203 το πρώτο support, οι “Scent of Thorns”. Είχα την τύχη να τους απολαύσω και στην προηγούμενη εμφάνισή τους ως support στους Kawir. Παρά την απειρία των μελών μπροστά στους βετεράνους Yoth Iria, η εμφάνιση ήταν εξαιρετικά επαγγελματική, με ένα πλούσιο setlist που περιλάμβανε διασκευές από μπάντες όπως οι Φινλανδοί Ensiferum και οι Βούλγαροι Gwendydd. Φυσικά δεν έλειπε από το πρόγραμμα το πρώτο single της μπάντας, το "Devour the Will". Η εμφάνιση των Scent of Thorns ήταν ένα καλό ζέσταμα για αυτό που θα ακολουθούσε..
                </p>
                <a href="/lioneye-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
        </div>
    </div>
</header>;
        </>
    )
}

export default Articles;
