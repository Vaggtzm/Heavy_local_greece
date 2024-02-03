import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import Footer from "../../compoments/footer/footer";
import Yothiria01 from './../../assets/liveYothiria.jpg';
import scentVarvara from './../../assets/scent-varvara.jpg';
import Katharsis from './../../assets/katharsis.jpg';
import yothirialive from './../../assets/yothirialive.jpg'
const Yothiria = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Yoth Iria x Temple of Katharsis x Scent of Thorns
                    <hr className="bg-dark"></hr>
                    
                    <h4> </h4> <p className="lead">Ανταπόκριση Studio 203 , 27.01.2024</p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={Yothiria01} className="img-fluid w-100"></img>
                    <hr className="bg-dark"></hr>
                    <p className="lead">Διοργάνωση:Bullet Productions</p> 
                    <p className="lead">Τιμη εισητηριου: 10 ευρω pre sale</p>
                    <ReadMore />
                    <hr className="bg-dark"></hr>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Χθες το βράδυ στην πόλη μας πραγματοποιήθηκε το live των Yoth Iria στο κλασικό μας Γιαννιώτικο στέκι, το Studio 203. Εκ πρώτης όψεως ο χώρος ήταν αρκετά μικρός!  Χωρίς αυτό ωστόσο να μειώνει την αξία του. Σίγουρα δεν άγγιζε τις εποχές που τα live γίνονταν στο Stage. Παρόλα αυτά, ο ήχος ήταν αψεγάδιαστος και καθαρός, χωρίς τα τυπικά ηχοληπτικά προβλήματα. Στο μάτι, η χωρητικότητα ήταν περίπου 150 έως 200 άτομα, με τα εισιτήρια σχεδόν να τίθενται σε sold out.

                    </p>
                    <p className="lead">
                    Οι πόρτες άνοιξαν γύρω στις 9, ενώ λίγα λεπτά αργότερα ανέβηκε στη σκηνή του Studio 203 το πρώτο support, οι “Scent of Thorns”. Είχα την τύχη να τους απολαύσω και στην προηγούμενη εμφάνισή τους ως support στους Kawir. Παρά την απειρία των μελών μπροστά στους βετεράνους Yoth Iria, η εμφάνιση ήταν εξαιρετικά επαγγελματική, με ένα πλούσιο setlist που περιλάμβανε διασκευές από μπάντες όπως οι Φινλανδοί Ensiferum και οι Βούλγαροι Gwendydd. Φυσικά δεν έλειπε από το πρόγραμμα το πρώτο single της μπάντας, το "Devour the Will". Η εμφάνιση των Scent of Thorns ήταν ένα καλό ζέσταμα για αυτό που θα ακολουθούσε.
                    </p>
                    <img src={scentVarvara} className="img-fluid shadow-lg rounded-3 w-100 m-2 p-1"></img>

                    <p className="lead">
                    Η βραδιά συνεχίστηκε με την εμφάνιση των 'Temple of Katharsis', που ήταν μια βουτιά στο κυρίως γεύμα, ετοιμάζοντας μας για την "τελετουργία" που επρόκειτο να ακολουθούσε. Προσωπικά, είχα ακούσει το όνομα των 'Temple of Katharsis', αλλά δεν είχα πάρει μια ιδέα για τη μουσική τους. Συνολικά, πρόκειται για μια raw black metal εμφάνιση με βαριές παραμορφωμένες κιθάρες, γρήγορα παλαιάς σχολής τύμπανα και παρανοϊκά φωνητικά. Ο Σατανάς ήταν πραγματικά μαζί μας με τους αγαπημένους του δαίμονες!                   
                     </p>
                     <img src={Katharsis} className="img-fluid shadow-lg rounded-3 w-100 m-2 p-1"></img>

                     <p className="lead">
                     Και κάπου  εδώ φτάνουμε στο κλείσιμο της βραδιάς, με τους Yoth Iria, κάτω από τα μπλε φώτα του Studio 203. Τι να πρωτοσχολιάσω για αυτήν την εμφάνιση; Αλήθεια, υπάρχουν πάρα πολλά! Οι ορμητικές συνθέσεις, γεμάτες από ενέργεια, και ο "θεατρινισμός" του αγαπημένου μας Ορέστη απογείωσαν πραγματικά τη βραδιά!  Στα κορυφαία highlights επίσης ήταν η εμφάνιση του "Άγνωστου Χ", του νέου τραγουδιστή των Yoth Iria, ο οποίος θα συμμετάσχει στο επόμενο άλμπουμ της μπάντας. Φυσικά,τέλος, δεν έλειπαν και οι διασκευές από παλαιότερες κυκλοφορίες των Rotting Christ, αποτίοντας έναν φόρο τιμής στο ενδοξο παρελθόν και τον θρυλικό Jim Mutilator (Δημήτρης Πατσούρης) που βρισκόταν πίσω στη σκηνή μετά από χρόνια απουσίας.
                     </p>
                     <img src={yothirialive} className="img-fluid shadow-lg rounded-3 w-100  pb-4"></img>



                </div>
            </div>
           </div>

        </>
    )
}
export default Yothiria;