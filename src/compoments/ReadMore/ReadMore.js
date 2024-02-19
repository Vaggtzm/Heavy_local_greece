import React from "react";
import RekaReadmore from "./../../assets/order.jpg";
import KlageReadMore from "./../../assets/sumit-01.jpg";
import NecrosisReadMore from "./../../assets/tortuga.jpg";
const ReadMore = ()=>{
    return(
        <>
        <div className="containter">
        <div className="row mt-4">
        <div className="col-md-4">
        <div className="card">
            
            <img src={RekaReadmore} className="img-fluid" alt="News Image" />
            <div className="card-body">
                <h5 className="card-title">Order Of The Ebon Hand:Review</h5>
                <p className="card-text">Αφού έμεινα μαγεμένος από τη συναυλία των Yoth Iria (27/01/2024) στα Ιωάννινα, και ιδιαιτέρως από την ενέργεια και τη παραστατικότητα του Merkaal (Ορέστη) θέλησα να μάθω περισσότερα για τη δουλειά του στο χώρο του Μέταλ και έτσι ανακάλυψα τους Order of the Ebon Hand</p>
                <a href="/Order-Of-The-Ebon-Hand-archive" className="btn btn-primary">Read More</a>
            </div>
        </div>

        </div>
                            <div className="col-md-4">
                            <div className="card">
                                <img src={KlageReadMore} className="card-img-top  w-100" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Summit - Catharsis: Μια δυσοίωνη εφιαλτική τελετουργία (προεπισκόπηση/κριτική τραγουδιού) + πληροφορίες για την μπάντα</h5>
                                    <p className="card-text">Summit: Αργοί, ερεβώδεις και πεσσιμιστές! Οι Νορβηγοί αυτοί αγγελιαφόροι του νιχιλισμού ορμώμενοι εκ Τρόντχαϊμ , αποτελούν μια αξιοσημείωτη πινελιά στο παραδοσιακό epic doom metal. Ποιοι είναι οι Summit; Ξεκίνησαν το 2007 ως μια παλιάς σχολής death metal μπάντα με το όνομα Funeralopolis, ενώ το 2009 άλλαξαν το όνομα σε Summit. Η περίοδος αυτή διήρκεσε ως το 2010 κυκλοφορώντας τρία demos: τα Arche, Ontos και Apeiron. Έπειτα οι Summit ξεκίνησαν να εξερευνούν τα εδάφη της doom με διάφορες αλλαγές στο σχήμα. Κυκλοφόρησαν για την πρώτη τους περίοδο ως αμιγώς doomers ένα demo με 3 κομμάτια</p>
                                    <a href="/Summit-catharsis-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={NecrosisReadMore} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Tortugal Sacrifice: The Many Faces Of Death Review</h5>
                                    <p className="card-text">Όλα ξεκίνησαν όταν τις προάλλες μου έστειλε μήνυμα ο συνμεταλλάς αδερφός Μιχάλης (See: Μιχάλης Αντωνόπουλος: Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας) και με ρώτησε αν θα ήθελα να γράψω κριτική για μικρές μπάντες εγχώριες και εξωτερικού. Αρχικά, ήμουν σκεπτικός λόγω πιεσμένου χρόνου αλλά αμέσως του είπα να μου στείλει σύνδεσμο να ακούσω και να γράψω έστω και δοκιμαστικά.Όπως είπα και στον ίδιο, τον τελευταίο καιρό είχα καιρό να ακούσω νέα μουσική και μου φάνηκε πρώτης τάξεως ευκαιρία.ακούσω νέες Underground παραγωγές. Και κάπως έτσι ξεκινά και η ένταξή μου στο περιοδικό Heavy Local. Αλλά ας αφήσουμε στην άκρη αυτές τις λεπτομέρειες και πάμε κατευθείαν στο ψητό. Λίγες ώρες αργότερα, τα ξημερώματα με βρήκαν να ακούω το άλμπουμ The Many Faces Of Death του 2022 των νεαρών Brutal Death Metallers Καναδών Tortugal Sacrifice ύστερα από μια ταινία θρίλερ που είχα παρακολουθήσει τα μεσάνυχτα</p>
                                    <a href="/Tortuga-Sacrifice-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>


                        </div>
        </div>
        </>
    )
}
export default ReadMore;