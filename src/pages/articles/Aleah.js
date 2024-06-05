import React from "react";
import Navigation from "../../components/AppNav/Navigation";
import PageWithComments from "../../components/Comments/comment";
import ReadMore from "../../components/ReadMore/ReadMore";
import './articles.css';

const Aleah = () => {
    return (
        <>
            <Navigation/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3 className="display-4">Αleah Liane Stanbridge – Το Κύκνειο Άσμα

                            <p className="lead">Ιστορία/Παρελθόν</p>
                            <hr className="bg-dark"></hr>
                        </h3>
                    </div>
                    <hr className="bg-dark"></hr>
                    <div className="col-md-6 credits-box">
                        <img src={"/assets/aleah.jpg"}
                             className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                        <h4>Πηγες</h4>
                        <p className="lead d-flex justify-content-evenly">
                            <a href="https://en.wikipedia.org/wiki/Aleah_Stanbridge">Bικιπαιδεια</a>
                        </p>
                        <ReadMore/>
                    </div>
                    <div className="col-md-6">
                        <p className="lead">
                            Σήμερα είναι μια ημέρα αρκετά μελαγχολική, θα έλεγα. Η Aleah Liane Stanbridge είναι το θέμα
                            που αγγίζουμε σήμερα στο "Legends", γνωστή απλώς ως "Aleah". Η βαρύτητα των στίχων της και η
                            σχεδόν αγγελική της φωνή... είναι κάτι που σίγουρα αρμόζει στο περιβάλλον μέσα στο οποίο
                            γράφω αυτό το άρθρο. Ας ξεκινήσουμε λοιπόν από την αρχή.

                        </p>
                        <p className="lead">
                            Η Aleah γεννήθηκε κατά την πρώτη μέρα του Ιουλίου του 1976 στο Cape Town της Νότιας Αφρικής
                            και έζησε στο Örebro της Σουηδίας μέχρι το τέλος της ζωής της στις 18 Απριλίου του 2016,
                            στην ηλικία των 39 ετών. Ήταν κάπου το 2009 όταν θα γνώριζε τον Φινλανδό κιθαρίστα-συνθέτη,
                            Juha Raivio (Swallow the Sun), (Trees of Eternity) και (Hallatar), και θα ίδρυαν τους Trees
                            of Eternity, ένα death/doom συγκρότημα που αναδείκνυε τη μελωδία και τη βαρύτητα τόσο στους
                            στίχους όσο και στη μουσική. Η δουλειά των Trees of Eternity στους περισσότερους ακροατές
                            δίνει την εικόνα μιας ψυχής που βρίσκεται έξω από το ανθρώπινο σώμα, ενός θλιμμένου αγγέλου
                            ή και ενός ανθρώπου που αγκαλιάζει τη μαυρίλα του θανάτου, νιώθοντας την ζεστασιά του.
                        </p>
                        <p className="lead">
                            Οι Trees of Eternity απαρτίζονταν από πλέον βετεράνους στον χώρο του είδους, όπως δύο πρώην
                            μέλη των γνωστών σε όλους μας Σουηδών doomer Katatonia και φυσικά τον πρώην ντράμερ των
                            Swallow the Sun (Kai Hahto). Στο χρονικό διάστημα του 2009-2016, οι Trees of Eternity
                            κυκλοφόρησαν το EP "Black Ocean" και το άλμπουμ "Hour of the Nightingale", το οποίο ήταν και
                            το κύκνειο άσμα της ηρωίδας μας.

                        </p>
                        <p className="lead">
                            Εύκολα θα διαπιστώσει κανείς με μια μικρή ανάλυση του στίχου κάθε κομματιού από το "Hour of
                            the Nightingale" το μήνυμα που μας δίνει η Aleah μέσα από τη μουσική. Σε κάθε τραγούδι λέει
                            στον ακροατή τη φράση "πεθαίνω, ακούστε το μέχρι τέλος". Λίγους μήνες έπειτα από την
                            κυκλοφορία του εκείνη θα υπέκυπτε, ηττημένη στην μάχη με την μάστιγα που ακούσει στο όνομα
                            καρκίνος. Αυτό που με κάνει να αναρωτιέμαι είναι το εάν θα πρόλαβε να απολαύσει αυτό το
                            άλμπουμ, ένα άλμπουμ το οποίο συχνά πυκνά με συντροφεύει όταν φοράω τα ακουστικά μου σε
                            μέρες όπως αυτή.

                        </p>
                        <PageWithComments/>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Aleah;