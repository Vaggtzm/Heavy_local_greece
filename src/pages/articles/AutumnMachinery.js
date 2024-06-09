import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import './articles.css'
import PageWithComments from "../../components/Comments/comment";

const AutumnMachinery = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3 className="display-4">Φθινοπωρινά ταξίδια αντισυμβατικότητας και διαφορετικότητας - Autumn
                            Machinery - Never looked so good (Album Review)
                            <p className="lead">Απο τον Μιχαλη</p>

                        </h3>
                    </div>
                    <hr className="bg-dark"></hr>
                    <div className="col-md-6 credits-box">
                        <img src={"/assets/AutumnMachinery.webp"}
                             alt={"Autumn Machinery"}
                             className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                        <p><a href="https://www.facebook.com/autumnmacmusic"><i className="bi bi-facebbok"></i></a> <a
                            href="https://www.instagram.com/autumnmacmusic/ "><i className="bi bi-instagram"></i></a><a
                            href="https://www.youtube.com/@autumnmachinery6415 "><i className="bi bi-youtube"></i></a>
                        </p>
                        <p>
                            <br></br>
                            Σχήμα:
                            <br></br>

                            Κωνσταντίνος Κιλάζογλου (κιθάρες, φωνητικά)
                            <br></br>

                            Σωτήρης Μαλεζίδης (κιθάρες)
                            <br></br>

                            Δημήτρης Κιβέλοβ (πλήκτρα)
                            <br></br>

                            Βασίλης “Μπίλιας” Σερδενιώτης (ντραμς)
                            <br></br>

                            Γιώργος Ρόκκας (μπάσο)
                            <br></br>

                            Αδαμαντίνη Αρβανίτη (φωνητικά) - (guest)
                            <br></br>
                            <br></br>
                            Album (32:06):
                            <br></br>

                            1) Ileenium System (05:20) - (instrumental)
                            <br></br>

                            2) Never looked so good (05:07)
                            <br></br>

                            3) Omega Minor (04:37) - (instrumental)
                            <br></br>

                            4) Soyuz (05:55) - (instrumental)
                            <br></br>

                            5) Hawkers feat. Adamantini Arvaniti (05:30)


                        </p>
                    </div>

                    <div className="col-md-6">
                        <p className="lead">
                            Κυκλοφορώντας μόλις πριν 2 περίπου, τον Γενάρη δηλαδή, στις διαδικτυακές πλατφόρμες και στα
                            venues των Αθηνών το νέο τους άλμπουμ με όνομα Never looked so good οι Autumn Machinery
                            δημιούργησαν ένα πολύ αξιότιμο άλμπουμ το οποίο είναι ό,τι πιο ιδανικό για όποι@ θέλει να
                            πάει μια βόλτα με το αμάξι ένα Οκτωβριανό απόγευμα σε ένα ορεινό τοπίο με τα φύλλα των
                            δέντρων σε γήινα χρώματα, που αναμένει τον ερχομό του σκληρού χειμώνα. Οι Αθηναίοι Autumn
                            Machinery συμφωνούν με αυτή την άποψη έμμεσα, καθώς οι ίδιοι υποστηρίζουν ότι έχουν ως
                            σκοπό, όπως έκαναν και με το πρώτο τους άλμπουμ το “The Lake Tahoe Incident” (Μάιος 2020) το
                            οποίο έργο τους αποτελεί ένα αμάλγαμα alternative με post rock!
                        </p>
                        <p className="lead">
                            Πάμε τώρα για το άλμπουμ! Το άλμπουμ αποτελείται από 5 tracks και έχει διάρκεια 32 λεπτά και
                            06 δευτερόλεπτα. Κυρίαρχο είναι το instrumental κομμάτι με ambient στοιχεία που δημιουργούν
                            μια νοσταλγική αίσθηση των 80s με σύγχρονες post συγχορδίες στις κιθάρες ενώ σε ένα κομμάτι
                            υπάρχει και folk στοιχείο (Omega Minor) δημιουργώντας πράγματι ένα εύηχο και εύπεπτο μείγμα
                            συνολικά στο άλμπουμ! Ενώ σε 2 tracks εμφανίζονται και ηχητικά όπως και κατ’επέκταση στίχοι!
                            Αυτά τα δύο κομμάτια είναι το Never looked so good και το Hawkers τα οποία έκαστα είναι
                            γεμάτα στους στίχους από κοινωνικά και ενθαρρυντικά μηνύματα όπως το να είσαι ο εαυτός σου,
                            να ορθώσεις ανάστημα σε ένα σύστημα που κυβερνάται από γηραιούς, να μην πάψεις να προσπαθείς
                            να εκπληρώνεις τα όνειρα και την φαντασία σου αλλά πάνω απ’όλα να αγαπάς, να ερωτεύεσαι και
                            να μην πέφτεις ποτέ από τις όποιος δυσκολίες της ζωής προκύψουν μέσα από ένα συμβολικό
                            sci-fi πλαίσιο! Το ιδιαίτερο στοιχείο του άλμπουμ αυτού είναι το τελευταίο κομμάτι της
                            λίστας το Hawkers καθώς εμφανίζεται ως guest στα φωνητικά του Hawkers η Αδαμαντίνη Αρβανίτη
                            η οποία αποτελεί το κερασάκι στην τούρτα με την υπέροχη “αδαμάντινη” φωνή της και την
                            αρμονική σύμπτυξη των συγχορδιών της ενορχήστρωσης με τα πλήκτρα της ambient!
                        </p>
                        <PageWithComments/>

                    </div>
                </div>
            </div>
        </>
    )
}
export default AutumnMachinery;