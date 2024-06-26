import React from "react";
import PageWithComments from "../../components/Comments/comment";
import './articles.css';

const Primordial = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3 className="display-4">Ηχητική Αλχημεία: Αποκωδικοποιώντας την Μουσική Εξέλιξη των Falooda
                            <p className="lead">Απο την Daria</p>

                        </h3>
                    </div>
                    <hr className="bg-dark"></hr>
                    <div className="col-md-6 credits-box">
                        <img src={"/assets/Falooda_Demo_2024_artwork.jpg"}
                             className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                        <p><a href="https://web.facebook.com/faloodasound?_rdc=1&_rdr"><i
                            className="bi bi-facebook"></i></a> <a href="https://www.instagram.com/faloodasound/"><i
                            className="bi bi-instagram"></i></a> <a
                            href="https://www.youtube.com/watch?v=dFX5CGVBF_Q"><i className="bi bi-youtube"></i></a></p>
                    </div>

                    <div className="col-md-6">
                        <p className="lead">
                            Στο ευρύ φάσμα της σύγχρονης μουσικής, μερικοί περφόρμερ δεν αναδύονται απλώς ως
                            καλλιτέχνες, αλλά ως αρχιτέκτονες της ηχητικής εξέλιξης. Μεταξύ αυτών των φωστήρων
                            βρίσκονται και οι Falooda, μια μπάντα της οποίας το όνομα έχει γίνει συνώνυμο με τον γενναίο
                            πειραματισμό και την πρωτοποριακή δημιουργικότητα. Καθώς προετοιμαζόμαστε να ταξιδέψουμε
                            μέσω των λαβυρινθωδών διαδρόμων του μουσικού σύμπαντος, σας προσκαλούμε να βουτήξετε βαθιά
                            στην γένεση, στην νοοτροπία και στις μελλοντικές βλέψεις αυτού του αινιγματικού σχήματος.
                            Ελάτε μαζί μας ενώ προσεγγίζουμε μια μια τις διαστάσεις του μουσικού σύμπαντος των Falooda,
                            αποκαλύπτοντας το πάθος, την έμπνευση και την αφοσίωση που τροφοδοτεί την τέχνη τους.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Χαίρετε, ευχαριστούμε που είστε μαζί μας! Καθώς αρχίζουμε
                            αυτό το ταξίδι στην ηχητική διάσταση των Falooda, θεωρούμενη ως μια από τις πιο καινοτόμες
                            και τολμηρές μπάντες των ημερών μας, το μόνο πρέπον είναι να πάρουμε τα πράγματα από την
                            αρχή. Μπορείτε να μας πάτε πίσω στον χρόνο; Στην γέννηση των Falooda;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Πρώτα απ’όλα, σας ευχαριστούμε, Ντάρια και Heavy Local Greece, για την
                            πρόσκληση! Ευχαρίστησή μας! Είμαι ο Loverman, ο τραγουδιστής των Falooda, και είμαι πολύ
                            χαρούμενος που θα μιλήσω για το ηχητικό μας ταξίδι.
                            Όλα ξεκίνησαν όταν ο Μανόλο και εγώ συζητούσαμε περί κοινού τζαμαρίσματος. Ο Μανόλο παίζει
                            μπάσο, έτσι προσκάλεσε τον Θέμη Βασιλείου να παίξει κιθάρα. Τότε έβγαζε μόνο νόημα επίσης να
                            προσκαλέσω τον φίλο μου Luku luku miu miu για να καλύψει το κενό του ντράμερ, με τον οποίο
                            είχαμε παίξει μαζί προηγουμένως στους Kalong από το 2015 ως το 2018. Πήρε λίγο χρόνο ώστε τα
                            πράγματα να μπουν στην θέση τους, καθώς δεν είχαμε τον δικό μας χώρο για να κάνουμε πρόβες
                            και έτσι πηδούσαμε από το ένα δωμάτιο στο άλλο. Έχοντας επιτέλους, από την προηγούμενη
                            χρονιά, βρει τον δικό μας χώρο αποφασίσαμε να ηχογραφήσουμε το πρώτο μας Demo στο B12 με τον
                            Γρηγόρη Σκούρα. Ο Γρηγόρης έκανε μια εξαιρετική δουλειά, όπως επίσης είχε ηχογραφήσει και
                            μιξάρει έκαστα τα EPs των Kalong στο παρελθόν, συνεπώς πλήρως τον εμπιστευτήκαμε. Για το
                            μιξάρισμα αποφασίσαμε να δουλέψουμε μαζί με έναν άλλο αγαπητό μας φίλο, τον πολυτάλαντο
                            Δημοσθένη Βαρίκο, τον οποίο μπορεί και να γνωρίζετε ως τον μπασίστα των ηχητικών γιγάντων
                            Acid Mammoth, των Nipenthis, τον Setherion και των Raw.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Καθένα από τα μέλη φέρει ένα μοναδικό background και
                            βάζει τις επιρροές του στο τραπέζι. Τι σας τράβηξε στο να πειραματιστείτε με την
                            noise/punk/experimental μουσική ως σύνολο;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Γενικά τείνουμε προς έναν πιο “dirty” ήχο, όχι απαραίτητα heavy, ας
                            πούμε. Το Noise είναι μια γαρνιτούρα η οποία θα μπορούσε να καλύψει πολλαπλά μουσικά
                            στρώματα, από τζαζ ως και d-beat. Νομίζω ότι ο όρος “experimental” μας δίνει περισσότερη
                            ελευθερία στο να δοκιμάσουμε πράγματα, χωρίς να χρειάζεται να κολλήσουμε σε ένα συγκεκριμένο
                            είδος. Αναπόφευκτα οι άνθρωποι τείνουν να κατηγοριοποιούν την μουσική που τους έλκει για
                            πολλούς λόγους, αν είναι έτσι ας τους αφήσουμε να σκεφτούν όπως θέλουν τους Falooda. Εμείς
                            αυτοπροσδιοριζόμαστε ως “fusion hardcore” ή “noise funk”. Ο ακροατής ωστόσο με τίποτα δεν θα
                            πρέπει να περιμένει την ακριβή πρόσμιξη των προαναφερθέντων όρων.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Τι βλέψεις ή στόχους θέσατε συλλογικά να πετύχετε όταν
                            σχηματίσατε τους Falooda και πως έχουν εξελιχθεί από τότε;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Οι πρόβες είναι όταν μπορούμε να δούμε το περισσότερο από τον καθένα
                            στην διάρκεια της ενήλικης ζωής μας και ταυτόχρονα να είμαστε δημιουργικοί. Αυτό είναι ένα
                            πολύτιμο αίσθημα και το λατρεύουμε. Το demo δίνει στον κόσμο μια γεύση για το πως ακούγονται
                            οι Falooda ή προς τα που κατευθύνονται αισθητικά. Σκοπός μας είναι να ηχογραφήσουμε ένα
                            πλήρους διάρκειας άλμπουμ και καλώς εχόντων των πραγμάτων να καταφέρουμε να παίξουμε και
                            εκτός Αθηνών κάποια στιγμή. Θα ήταν ιδανικό να είχαμε τα πάντα μονομιάς, αλλά η μουσική
                            θέλει χρόνο και οι Falooda είναι το μωρό μας, το οποίο τώρα έχει αρχίσει να περπατά στα δύο
                            (ή περισσότερα) πόδια του.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Έχουν υπάρξει κάποιες απροσδόκητες προκλήσεις ή εκπλήξεις
                            στην πάροδο του χρόνου που διαμόρφωσαν την πορεία της μπάντας;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Μετά την ηχογράφηση του demo ο Μανόλο και ο Θέμης Βασιλείου αποφάσισαν
                            να αποχωρήσουν ωστόσο από τους Falooda, αποφασίστηκε ωστόσο ότι δεν θα παρατούσαμε το
                            μουσικό μας εγχείρημα.
                            Κάποιοι μπορεί να τον αποκαλέσουν από μηχανής Θεό, προσωπικά θα το έλεγα τέλειο timing,
                            καθώς ο Grivoorm, ο ταλαντούχος μπασίστας και πολυ-οργανοπαίχτης (sic) του Luku luku miu miu
                            από τους Great Black Shark (δείτε το solo project του με το ίδιο όνομα), κάλυψε το κενό στο
                            μπάσο, έτσι μετατραπήκαμε σε τριάδα, χωρίς κιθαρίστα. Ο Grivoorm πρότεινε να ρωτήσουμε τον
                            Stavriky να τζαμάρει μαζί μας. Δίχως καμιά υπερβολή, μπορώ με κάθε βεβαιότητα εκ μέρους όλων
                            ακράδαντα να δηλώσω πως δεν θα μπορούσαμε να φανταστούμε έναν πιο ταιριαστό κιθαρίστα! Και
                            ιδού. Οι Falooda προβάρουν ξανά τακτικά.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Ως μια μπάντα γνωστή για το σπάσιμο των ορίων και την
                            εξερεύνηση νέων ηχητικών περιοχών, πως προσεγγίζετε την εισχώρηση της τεχνολογίας και των
                            αντισυμβατικών οργάνων στην συνθετική διαδικασία, και πως αυτή επηρεάζει τον τελικό ήχο των
                            Falooda;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Αντιλαμβανόμαστε την μουσική ως ένα ταξίδι. Αρχικά είχαμε το σχήμα
                            κιθάρα - μπάσο - ντραμς - φωνητικά, αλλά τότε το synthesizer προστέθηκε και τα πράγματα
                            πήραν μια απρόσμενη μα ευτυχή τροπή. Καθώς προχωρούμε με τον εφοδιασμό του χώρου πρόβας μας,
                            θα είμαστε ικανοί να πειραματιστούμε περισσότερο. Η τεχνολογία είναι ένα εργαλείο, όπως και
                            οτιδήποτε άλλο μπορεί να χρησιμοποιηθεί με τον σωστό τρόπο, έτσι δεν αποκλείουμε ό,τι μπορεί
                            να εκπέμψει ήχο και να μας βοηθήσει να αναπτύξουμε την μουσική μας προσωπικότητα, ατομικά
                            και ομαδικά.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Η ιδέα της μίξης noise/punk/instrumental μουσικής με την
                            εικόνα ενός Mughlai επιδορπίου (ινδική κουζίνα) σαν το Falooda είναι ενδιαφέρουσα. Μπορείτε
                            να μοιραστείτε με μας την έμπνευση πίσω από την επιλογή αυτού του θέματος για το όνομα της
                            μπάντας και την αισθητική της;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Η ιστορία πίσω από το νόημα του ονόματος της μπάντας είναι αστεία!
                            Φαντάσου ότι πασχίζαμε τόσο πολύ να βρούμε ένα ταιριαστό όνομα, που ονομάσαμε την ομαδική
                            συνομιλία μας “Monday Jams”, καθώς συνηθίζαμε να προβάρουμε τα απογεύματα της Δευτέρας.
                            Σε μια από τις σπάνιες φορές που βγαίνω έξω, δεν έχω πάντα την διάθεση να πιω αλκοόλ, λοιπόν
                            όταν επισκέφτηκα ένα ψιλικατζίδικο στο κέντρο της Αθήνας είδα ένα μικρό μπουκάλι με την
                            ετικέτα “Falooda”. “Τι στο διάολο είναι αυτό” σκέφτηκα από μέσα μου, έτσι το αγόρασα. Μετά
                            την πρώτη γουλιά, σπόροι βασιλικού και βερμιτσέλι κατέβηκαν στον λαιμό μου, μαζί με γλυκό
                            σιρόπι και γεύση μπανάνα ή κάτι τέτοιο. Δεν είναι ακριβώς ικανοποιητικό, αλλά σίγουρα αφήνει
                            μια καλή επίγευση. Να το δοκιμάσετε! Ξεκίνησα να μουρμουρίζω το όνομα επαναλαμβανόμενα, μου
                            κόλλησε. “Έχει έναν ωραίο δακτύλιο σε αυτό - θα μπορούσε να είναι το όνομα της μπάντας μας!’
                            Σκέφτηκα. Έχοντας το προτείνει στα υπόλοιπα μέλη της και κάνοντας μια έρευνα (ως τώρα νομίζω
                            ότι υπήρχε μια μπάντα που χρησιμοποιούσε το όνομα, ανενεργή από το 2019) δεν βρήκα τίποτα
                            σχετικό με την μουσική. Τα υπόλοιπα είναι ιστορία.
                            Επιπλέον το νόημα πίσω από το Mughlai επιδόρπιο ως ένα όνομα μπάντας είναι ακριβώς αυτό που
                            η συνταγή λέει: Σιρόπι τριαντάφυλλου, βερμιτσέλι, γάλα και γλυκοί σπόροι βασιλικού. Αυτό
                            επίσης απεικονίζει τον ηχητικό μας πειραματισμό και την μίξη διαφορετικών μουσικών στοιχείων
                            μαζί με τις διαφορετικές προσωπικότητες που τα αντιπροσωπεύουν.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Το εναρκτήριο σας demo εισάγει τους ακροατές σε έναν
                            “στρόβιλο” πειραματικών κομματιών όπως το “Orizuru 折鶴” και το “Boolean Religion”. Μπορείτε
                            να μας μιλήσετε για την δημιουργική διαδικασία πίσω από αυτές τις μοναδικές ηχητικές
                            εμπειρίες;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Από τις απαρχές μας συνειδητοποιήσαμε το πως να φέρνουμε έτοιμα
                            τραγούδια δεν θα δούλευε για το project. Όπως θυμάμαι, για το “Orizuru 折鶴” η ιδέα έμεινε
                            στο ράφι για λίγο και εκ των υστέρων ενθυμούμαι πως τα άλλα παιδιά δεν ήταν τόσο ψημένα να
                            βγάλουν ένα τραγούδι από αυτή. Η τελική έκβαση είναι το αποτέλεσμα συνεχών προβών και
                            δοκιμών, με την έννοια ότι το τραγούδι που έχουμε τώρα είναι αρκετά διαφορετικό από την
                            αρχική ιδέα. Το “Orizuru” λέει την ιστορία της Sado Sasaki, ένα θύμα της ατομικής βόμβας και
                            πως έθεσε στον εαυτό της ως στόχο να διπλώσει 1.000 χάρτινους γερανούς, το οποίο πιστευόταν
                            πως θα βοηθούσε εκείνον που θα τους δίπλωνε να αποκτήσει την δυνατότητα εκπλήρωσης μια
                            ευχής. Όσον αφορά το “Boolean Religion”, η έμπνευση ήρθε εν μέσω ενός άλλου τζαμαρίσματος.
                            Οι παύσεις προς το τέλος του τραγουδιού είναι κάτι που πραγματικά απολαμβάνουμε να
                            εκτελούμε, ιδιαιτέρως σε lives! Το τραγούδι μιλάει για την θρησκειοποίηση της τεχνολογίας, η
                            οποία μεταφράζεται σε μια δυαδική γλώσσα μηδέν και ένα στην μηχανή. Οι πιστοί γίνονται τόσο
                            εμμονικοί με την μηχανή στον βαθμό που δεν συνειδητοποιούν ότι σιγά σιγά τους σκοτώνει.
                            Όσον αφορά τους στίχους, τραγουδώ μαζί με την μελωδία και αρχίζω να πετώ μέσα λέξεις που
                            “ταιριάζουν” με τον ρυθμό. Αργότερα κάνω σημειώσεις, ακούω ξανά την μουσική και γεμίζω τα
                            κενά ανάλογα την θεματική που πρόκειται το τραγούδι να εκφράσει. Συνήθως έχω κάποιες ιδέες
                            στο κεφάλι μου και το τραγούδι θα φανερώσει αυτό καθαυτό ποιο στιχουργικό θέμα ταιριάζει
                            καλύτερα.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Με το “Bottleneck” και το “Disaster Recovery” φαίνεται
                            ότι κλιμακώνεται η ένταση και το χάος της μουσικής σας. Ποια συναισθήματα ή ποια μηνύματα
                            προσπαθείτε να μεταφέρετε μέσω αυτών των πιο έντονων tracks;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Είτε το πιστεύεις είτε όχι το “Bottleneck” συντέθηκε μονομιάς! Απλώς
                            ξεφύτρωσε, αν μπορώ να το πω αυτό. Είναι όντως έντονο, μια ένταση που κλιμακώνεται σε ένα
                            σύντομο χρονικό διάστημα. Η κλίμακα είναι σαν μια έκρηξη, όπως και οι στίχοι, καθώς μιλά για
                            την ικανότητα μιας εφαρμογής ή ενός συστήματος υπολογιστή, περιορισμένης/ου από ένα μόνο
                            εξάρτημα, όπως ο λαιμός ενός μπουκαλιού που επιβραδύνει την συνολική ροή του νερού. Το
                            “Disaster Recovery” είναι για την ικανότητα επαναφοράς της πρόσβασης και της
                            λειτουργικότητας. Αυτό το κομμάτι λειτουργεί ως ένα ηχοτοπίο καθώς η διαδικασία δυνητικά
                            αποτυγχάνει, ή και όχι, να επαναφέρει το σύστημα - είναι στην κρίση του ακροατή η ερμηνεία
                            και η απόφαση.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Θα μπορούσατε να μοιραστείτε κάποιες αξιοσημείωτες
                            στιγμές ή εμπειρίες από τις ηχογραφήσεις των τραγουδιών που περιλαμβάνονται στο demo;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Δεν θεωρούμε τους εαυτούς μας ως μια μπάντα του στούντιο με την έννοια
                            πως συνθέτουμε τραγούδια τα οποία προορίζονται να εκτελεστούν ζωντανά, έτσι η ηχογράφηση του
                            demo έγινε live ούτως ώστε να συλλάβουμε αυτό το αίσθημα της παρουσίας, όπως και θα γίνει με
                            το επερχόμενο LP. Μόνο τα φωνητικά ηχογραφήθηκαν αργότερα.
                            Μια στιγμή η οποία είναι άξιας αναφοράς είναι η διαδικασία ηχογράφησης του “Disaster
                            Recovery” όταν ηχογραφήσαμε τα πάντα στον δικό μας χώρο πρόβας. Πρώτα ηχογραφήσαμε τα ντραμς
                            με ένα μόνο μικρόφωνο και έπειτα συνέδεσα το synthesizer σε μια κάρτα ήχου για να το
                            ηχογραφήσουμε από πάνω. Ήταν μια διασκεδαστική διαδικασία σίγουρα!
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Το καλλιτέχνημα που συνοδεύει το demo σας είναι γλαφυρό
                            και σουρεαλιστικό, αντικατοπτρίζοντας το έντονο χάος της μουσικής σας. Πως η οπτική τέχνη
                            επηρεάζει την δημιουργική σας διαδικασία, και ποιος ο ρόλος της στην διαμόρφωση της
                            ταυτότητας των Falooda;
                            <br></br>
                            <br></br>


                            Falooda (Loverman): Το καλλιτέχνημα ως μια οπτική γλώσσα είναι σημαντικό για τον ακροατή
                            έτσι ώστε να έχει μια πλήρη οπτικοακουστική αντίληψη για οποιοδήποτε άλμπουμ. Δεν σχεδιάσαμε
                            να έχουμε τα ποτήρια του επιδορπίου Falooda ως τις μασκότ μας, προέκυψε αυθόρμητα όπως το
                            όνομα ήρθε σε μας εκ του δικού του φυσικού. Αυτή η έννοια μας άνοιξε έναν ολόκληρο κόσμο
                            πιθανοτήτων. Είμαστε πραγματικά χαρούμενοι που δουλεύουμε με τον Δημήτρη Αρμενάκη για τα
                            καλλιτεχνήματα, διότι η διορατικότητά του ενισχύει την ηχητική ταυτότητα των Falooda. Είναι
                            ειλικρινά πολύ σημαντικό για μας το ότι οποτεδήποτε κάποιος βλέπει μια από τις ζωγραφιές ή
                            τα καλλιτεχνήματά μας έξω να μπορεί να συνδέσει το σχέδιο με τον ήχο μας.
                            <br></br>
                            <br></br>


                            Heavy Local Greece (Daria Aeonia): Με την κυκλοφορία του demo σας, το οποίο κυκλοφορήσατε οι
                            ίδιοι, να τραβάει την προσοχή, οι οπαδοί σας με ανυπομονησία περιμένουν το εναρκτήριο σας
                            LP. Μπορείτε να μας δώσετε μια εικόνα για το τι να προσδοκούν οι ακροατές από αυτό;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Είμαστε χαρούμενοι που το ακούμε αυτό και είμαστε πραγματικά ευγνώμονες
                            για όλο το feedback μέχρι στιγμής. Σχετικά με το LP, γράφουμε νέο υλικό καθώς μιλάμε.
                            Μπορούμε να πούμε με μεγάλη βεβαιότητα πως σχεδόν κάθε κομμάτι θα διαφέρει το ένα από το
                            άλλο. Όπως ορίζει η συνταγή των Falooda, θα κάνουμε το καλύτερο για να βρεθεί η ισορροπία
                            μεταξύ των γλυκών μελωδιών και των γρήγορου ρυθμού blast-beats!
                            Το synthesizer θα είναι περισσότερο παρόν, καθώς πειραματιζόμαστε προς έναν περισσότερο
                            lo-fi ήχο. Θέματα όπως η ψηφιακή δυστοπία, το κοινωνικό άγχος, η αδικία, η καταδίκη του
                            πολέμου και ο στοχασμός της προσωπικής απώλειας είναι οι εμπνεύσεις πίσω από τους στίχους.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Η συνεργασία παίζει συχνά έναν σημαντικό ρόλο στην
                            experimental μουσική. Υπάρχουν κάποιοι καλλιτέχνες ή μπάντες που ονειρεύεστε να
                            συνεργαστείτε στο μέλλον;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Αυτό είναι αλήθεια, η συνεργασία είναι το μέσο για την περαιτέρω
                            εξερεύνηση της έκφρασης σου. Θα ενδιαφερόμασταν επίσης για την δημιουργία ενός split, αν
                            είναι πιθανόν. Η Ελλάδα έχει μια πολύ ταλαντούχα underground σκηνή, μερικά τοπικά σχήματα
                            που μου έρχονται κατά νου είναι η Rita Mosss, οι Chronoboros και οι Mammock. Πιστεύουμε ότι
                            η μουσική τους προσέγγιση θα έκανε μια ενδιαφέρουσα μουσική αντίθεση με τον ήχο μας.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Νωρίτερα αναφέρατε τις βλέψεις σας για μελλοντικές
                            συνεργασίες στην experimental μουσική. Δοθέντος του ποικιλόμορφου μουσικού background σας,
                            συμπεριλαμβανομένων των project, όπως οι Kalong και οι The Great Black Shark, πως νιώθετε
                            ότι αυτά τα μοναδικά εγχειρήματα έχουν διαμορφώσει την καλλιτεχνική σας πορεία και έχουν
                            επηρεάσει το διακριτό ηχοτοπίο των Falooda;
                            <br></br>
                            <br></br>


                            Falooda (Loverman): Οι Falooda είναι ένα φυσικό επακόλουθο αυτών των project. Είναι σαν μια
                            μίξη των καλύτερων στοιχείων, συμπεριλαμβανομένων και αυτών που έχουμε μάθει μέχρι τώρα να
                            αποφεύγουμε. Το γεγονός πως είμαστε όλοι πολλά χρόνια φίλοι είναι ένα μπόνους, κάνοντας την
                            μεταξύ μας επικοινωνία ακόμα καλύτερη. Επιπλέον, κάθε μέλος έχει αναπτύξει την δική του
                            τεχνική, έτσι κατά κάποιο τρόπο είναι σαν όλοι οι δρόμοι να οδηγούσαν εξ αρχής στους
                            Falooda.
                            <br></br>
                            <br></br>

                            Heavy Local Greece (Daria Aeonia): Τέλος, ποια συμβουλή θα δίνατε στους μουσικούς που
                            σκοπεύουν να εξερευνήσουν τον χώρο της experimental μουσικής και να χαράξουν το δικό τους
                            ξεχωριστό μονοπάτι, όπως έκαναν οι Falooda;
                            <br></br>
                            <br></br>

                            Falooda (Loverman): Μπορεί να ακουστεί τσιτάτο το να πω “Do It Yourself” αλλά δεν υπάρχει
                            καλύτερος τρόπος να εξερευνήσεις την μουσική. Θέλει χρόνο στις μικρές μπάντες, καθώς πρέπει
                            να τα οργανώσεις όλα ο ίδιος, αλλά αισθάνεσαι ότι ελέγχεις καλύτερα το πως εξελίσσονται τα
                            πράγματα και σε ποιον ρυθμό. Εκφράστε τις ιδέες σας και προσπαθήστε να το ευχαριστηθείτε όσο
                            περισσότερο γίνεται. Αν το κάναμε καταναγκαστικά δεν θα ακουγόμασταν όπως τώρα. Ακόμα
                            εξερευνούμε τον ήχο μας, είναι ένα όμορφο ταξίδι, καθώς δεν γνωρίζουμε ακόμη που θα μας
                            πάει!
                        </p>

                        <PageWithComments/>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Primordial;