import React from "react";
import Navigation from './../../compoments/Navigation/Navigation';
import ScentOfThrons from './../../assets/DevourTheWill.jpg';
import UrbanPsyche from './../../assets/UrbanPshyce.jpg';
import Lioneye  from './../../assets/lioneye.jpg';
import Yothiria from './../../assets/liveYothiria.jpg';
import OrderOfTheEbonHand from './../../assets/order-02.jpg';
import SummitCatharsis from './../../assets/sumit-01.jpg';
import TorutugalSacrifice from './../../assets/tortuga02.jpg';
import Socials from "../../compoments/SocialMedia/socials";
import order from './../../assets/order.jpg';
import summit from './../../assets/sumit-01.jpg';
import tortuga from './../../assets/tortuga.jpg';
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
            <p className="lead">Update 05/02/2024</p>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Order Of The Ebon Hand:Review</h4>
                <img src={OrderOfTheEbonHand} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Αφού έμεινα μαγεμένος από τη συναυλία των Yoth Iria (27/01/2024) στα Ιωάννινα, και ιδιαιτέρως από την ενέργεια και τη παραστατικότητα του Merkaal (Ορέστη) θέλησα να μάθω περισσότερα για τη δουλειά του στο χώρο του Μέταλ και έτσι ανακάλυψα τους Order of the Ebon Hand</p>
                <a href="/article/Order-Of-The-Ebon-Hand-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
<<<<<<< Updated upstream
            <div className="col-md-6 bg-secondary p-4">
                <h4>Summit - Catharsis: Μια δυσοίωνη εφιαλτική τελετουργία (προεπισκόπηση/κριτική τραγουδιού) + πληροφορίες για την μπάντα</h4>
                <img src={SummitCatharsis} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Summit: Αργοί, ερεβώδεις και πεσσιμιστές! Οι Νορβηγοί αυτοί αγγελιαφόροι του νιχιλισμού ορμώμενοι εκ Τρόντχαϊμ , αποτελούν μια αξιοσημείωτη πινελιά στο παραδοσιακό epic doom metal. Ποιοι είναι οι Summit; Ξεκίνησαν το 2007 ως μια παλιάς σχολής death metal μπάντα με το όνομα Funeralopolis, ενώ το 2009 άλλαξαν το όνομα σε Summit. Η περίοδος αυτή διήρκεσε ως το 2010 κυκλοφορώντας τρία demos: τα Arche, Ontos και Apeiron. Έπειτα οι Summit ξεκίνησαν να εξερευνούν τα εδάφη της doom με διάφορες αλλαγές στο σχήμα. Κυκλοφόρησαν για την πρώτη τους περίοδο ως αμιγώς doomers ένα demo με 3 κομμάτια</p>
                <a href="/article/Summit-catharsis-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Tortugal Sacrifice: The Many Faces Of Death Review</h4>
                <img src={TorutugalSacrifice} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Όλα ξεκίνησαν όταν τις προάλλες μου έστειλε μήνυμα ο συνμεταλλάς αδερφός Μιχάλης (See: Μιχάλης Αντωνόπουλος: Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας) και με ρώτησε αν θα ήθελα να γράψω κριτική για μικρές μπάντες εγχώριες και εξωτερικού. Αρχικά, ήμουν σκεπτικός λόγω πιεσμένου χρόνου αλλά αμέσως του είπα να μου στείλει σύνδεσμο να ακούσω και να γράψω έστω και δοκιμαστικά.Όπως είπα και στον ίδιο, τον τελευταίο καιρό είχα καιρό να ακούσω νέα μουσική και μου φάνηκε πρώτης τάξεως ευκαιρία.ακούσω νέες Underground παραγωγές. Και κάπως έτσι ξεκινά και η ένταξή μου στο περιοδικό Heavy Local. Αλλά ας αφήσουμε στην άκρη αυτές τις λεπτομέρειες και πάμε κατευθείαν στο ψητό. Λίγες ώρες αργότερα, τα ξημερώματα με βρήκαν να ακούω το άλμπουμ The Many Faces Of Death του 2022 των νεαρών Brutal Death Metallers Καναδών Tortugal Sacrifice ύστερα από μια ταινία θρίλερ που είχα παρακολουθήσει τα μεσάνυχτα</p>
                <a href="/Tortuga-Sacrifice-archive" className="btn btn-danger">Read More</a>
=======
            <p className="lead">Update 5/02/2024</p>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Order Of The Ebon Hand:Review απο τον ριν</h4>
                <img src={order} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Αφού έμεινα μαγεμένος από τη συναυλία των Yoth Iria (27/01/2024) στα Ιωάννινα, και ιδιαιτέρως από την ενέργεια και τη παραστατικότητα του Merkaal (Ορέστη) θέλησα να μάθω περισσότερα για τη δουλειά του στο χώρο του Μέταλ και έτσι ανακάλυψα τους Order of the Ebon Hand</p>
                <a href="/Order-Of-The-Ebon-Hand-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Summit Catharsis: Review από τον Μιχάλη Αντωνόπουλο </h4>
                <img src={summit} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Summit: Αργοί, ερεβώδεις και πεσσιμιστές! Οι Νορβηγοί αυτοί αγγελιαφόροι του νιχιλισμού ορμώμενοι εκ Τρόντχαϊμ , αποτελούν μια αξιοσημείωτη πινελιά στο παραδοσιακό epic doom metal</p>
                <a href="/Summit-catharsis-archive" className="btn btn-danger">Read More</a>
                <Socials />
            </div>
            <div className="col-md-6 bg-secondary p-4">
                <h4>Tortugal Sacrifice: The Many Faces Of Death Review από τον Vladu K.</h4>
                <img src={tortuga} className="img-fluid" />
            </div>
            <div className="col-md-6 bg-secondary p-4 text-center">
                <p className="lead">Όλα ξεκίνησαν όταν τις προάλλες μου έστειλε μήνυμα ο συνμεταλλάς αδερφός Μιχάλης (See: Μιχάλης Αντωνόπουλος: Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας) και με ρώτησε αν θα ήθελα να γράψω κριτική για μικρές μπάντες εγχώριες και εξωτερικού. Αρχικά, ήμουν σκεπτικός λόγω πιεσμένου χρόνου αλλά αμέσως του είπα να μου στείλει σύνδεσμο να ακούσω και να γράψω έστω και δοκιμαστικά.</p>
                <a href="/Tortuga-sacrifice-archive" className="btn btn-danger">Read More</a>
>>>>>>> Stashed changes
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
