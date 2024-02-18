import React  from "react";
import Navigation from "../compoments/Navigation/Navigation";
import './home.css';
import Reka from './../assets/mysticpath.jpg';
import klage from './../assets/sumit-01.jpg';
import Necrosis from './../assets/tortuga02.jpg';
import Monkey from './../assets/startTheMonkey.jpg';
import Anorimoi from './../assets/Events/anorimoi.jpg';
import Cyanide4 from './../assets/Events/cyanide.jpg';
import Chronicle02 from './../assets/chronicles/chronicle-02/yothiria-02.jpg';
import Contact from "../compoments/ContactForm/contact";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
import Carousel from './../compoments/carousel/carousel';
const Home = (props) => {
    return (
        <>
            <Navigation />
            <header>
                <div className="container mt-4">
                    <div className="row text-center bg-secondary p-3 m-2 shadow-lg">
                        <div className="col-md-12">
                            <div className="jumbotron jumbotron-fluid">
                                <div className="container-fluid">
                                    <h1 className="display-4">Welcome to <span className="font-1">Heavy Local</span> </h1>
                                    <p className="lead">Stay brutal and explore the unknown  metal news, reviews, and features!</p>
                                    <hr className="bg-dark" />
                                    <Contact />
                                    <Socials />
                                    <button className="btn btn-danger" onClick={props.notification}>Subscribe to Push Notifications</button>
                                    <hr className="bg-dark" />
                                    <hr className="bg-dark" />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-12">
                        <Carousel />

                        </div>
                    </div>
                    <hr className="bg-dark" />
                   <h4>Events:</h4>
                   <div className="row bg-secondary p-3">
                   <div className="col-md-6">
                    <h4>Start The monkey Tour</h4>
                    <hr className="bg-dark" />
                    <img src={Monkey} className="img-fluid" />
                   </div>
                   <div className="col-md-6 text-center">
                    <p className="lead">Tour Dates</p>
                    <hr className="bg-dark" />
                    <p className="lead">28/3 OldSkulls club Sofia</p>
                    <hr className="bg-dark" />
                    <p className="lead">29/3 Hope Live club Kazanluk</p>
                    <hr className="bg-dark" />
                    <p className="lead">29/3 Steki Peri Viou Karditsa</p>
                    <hr className="bg-dark" />
                    <p className="caption">Tickets only in hard copy </p>

                   </div>
                   <hr className="bg-dark" />

                   <div className="col-md-6">
                    <h4>Αnorimoi live at Ioannina</h4>
                    <hr className="bg-dark" />
                    <img src={Anorimoi} className="img-fluid" />
                   </div>

                   <div className="col-md-6 text-center">
                    <h4>Studio 203 </h4>
                    <hr className="bg-dark" />
                    <a className="nav-link" href="https://web.facebook.com/events/400855992360466"><i className="bi bi-facebook">Facebook Event</i></a>
                    <p className="lead">Pre sale at :Indian Rock Cafe , Manthos Optical </p>
                    <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.more.com%2Fmusic%2Fanorimoi-30-xronia-apotyxies-liveioannina%2F%3Ffbclid%3DIwAR1915F_-MPi5cRp6sC5LVjp9gT2JYG5tF7Rs0s0vQY0PcAZQ2fspYZ6vL8&h=AT01zSaTze3gNypOquOhnh6BqXMI0FU9w3rUYAut5dT4PuZptQd3A13TH0CM-cf_tu1d6DvxPB6dP6c-NGt1etnnsRlbsTIq1omsechZMm0I1MZ6mHPSRA8H-9jp&__tn__=q&c[0]=AT3jUUA3mCyDPknb3HOH648_hbjADxkngdQlIRKFiXeBzzj8c-L7yxpwKelwJYl-T9eMUIsZ7521mZgpleC5qCmmZDWPGTQQJtgtORW9YccWvo8i5ku03mkYssBwuyHjyb-kdTfBSFse1RGNgBl8Tvq1jgwd" className="btn btn-danger">Book Online</a>
                   </div>
                   <div className="col-md-6">
                    <h4>Cyanide 4 x Lucenthia X Felony Case live at ioannina </h4>
                    <hr className="bg-dark" />
                    <img src={Cyanide4} className="img-fluid" />
                   </div>

                   <div className="col-md-6 text-center">
                    <h4>Studio 203 </h4>
                    <hr className="bg-dark" />
                    <a className="nav-link" href="https://web.facebook.com/events/394208573082399/"><i className="bi bi-facebook">Facebook Event</i></a>
                    <p className="lead">Pre sale at :Indian Rock Cafe , Manthos Optical </p>
                    <a href="https://www.more.com/music/cyanide-4-live-in-ioannina-17/2/24/" className="btn btn-danger">Book Online</a>
                   </div>

                   </div>

                   <hr className="bg-dark" />
                    <h4>Heavy Local reviews GR:</h4>
                    <hr className="bg-dark" />
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card">
                                <img src={Reka} className="img-fluid" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Order Of The Ebon Hand:Review</h5>
                                    <p className="card-text">Αφού έμεινα μαγεμένος από τη συναυλία των Yoth Iria (27/01/2024) στα Ιωάννινα, και ιδιαιτέρως από την ενέργεια και τη παραστατικότητα του Merkaal (Ορέστη) θέλησα να μάθω περισσότερα για τη δουλειά του στο χώρο του Μέταλ και έτσι ανακάλυψα τους Order of the Ebon Hand</p>
                                    <a href="/article/Order-Of-The-Ebon-Hand-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={klage} className="card-img-top  w-100" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Summit - Catharsis: Μια δυσοίωνη εφιαλτική τελετουργία (προεπισκόπηση/κριτική τραγουδιού) + πληροφορίες για την μπάντα</h5>
                                    <p className="card-text">Summit: Αργοί, ερεβώδεις και πεσσιμιστές! Οι Νορβηγοί αυτοί αγγελιαφόροι του νιχιλισμού ορμώμενοι εκ Τρόντχαϊμ , αποτελούν μια αξιοσημείωτη πινελιά στο παραδοσιακό epic doom metal. Ποιοι είναι οι Summit; Ξεκίνησαν το 2007 ως μια παλιάς σχολής death metal μπάντα με το όνομα Funeralopolis, ενώ το 2009 άλλαξαν το όνομα σε Summit. Η περίοδος αυτή διήρκεσε ως το 2010 κυκλοφορώντας τρία demos: τα Arche, Ontos και Apeiron. Έπειτα οι Summit ξεκίνησαν να εξερευνούν τα εδάφη της doom με διάφορες αλλαγές στο σχήμα. Κυκλοφόρησαν για την πρώτη τους περίοδο ως αμιγώς doomers ένα demo με 3 κομμάτια</p>
                                    s<a href="/article/Summit-catharsis-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={Necrosis} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Tortugal Sacrifice: The Many Faces Of Death Review</h5>
                                    <p className="card-text">Όλα ξεκίνησαν όταν τις προάλλες μου έστειλε μήνυμα ο συνμεταλλάς αδερφός Μιχάλης (See: Μιχάλης Αντωνόπουλος: Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας) και με ρώτησε αν θα ήθελα να γράψω κριτική για μικρές μπάντες εγχώριες και εξωτερικού. Αρχικά, ήμουν σκεπτικός λόγω πιεσμένου χρόνου αλλά αμέσως του είπα να μου στείλει σύνδεσμο να ακούσω και να γράψω έστω και δοκιμαστικά.Όπως είπα και στον ίδιο, τον τελευταίο καιρό είχα καιρό να ακούσω νέα μουσική και μου φάνηκε πρώτης τάξεως ευκαιρία.ακούσω νέες Underground παραγωγές. Και κάπως έτσι ξεκινά και η ένταξή μου στο περιοδικό Heavy Local. Αλλά ας αφήσουμε στην άκρη αυτές τις λεπτομέρειες και πάμε κατευθείαν στο ψητό. Λίγες ώρες αργότερα, τα ξημερώματα με βρήκαν να ακούω το άλμπουμ The Many Faces Of Death του 2022 των νεαρών Brutal Death Metallers Καναδών Tortugal Sacrifice ύστερα από μια ταινία θρίλερ που είχα παρακολουθήσει τα μεσάνυχτα</p>
                                    <a href="/Tortuga-Sacrifice-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <hr className="bg-dark" />

                        <hr className="bg-dark" />

                    </div>

                </div>
            </header>
            <section className="live-chornicles">
                <div className="container">
                <h4>Live Chronicles by Daria (ENG)</h4>
                    <div className="row text-center mt-4">
                        <div className="col-md-6">
                            <img src={Chronicle02} className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h3>
                            Chronicles of the Underworld Vol 2: Yoth Iria's Epic Odyssey at Psychosounds Festival
                            </h3>
                            <a href="/Chronicles_of_the_underworld_vol-2_archive" className="btn btn-primary">Read More</a>

                        </div>

                    </div>
                </div>
            </section>
            <hr className="bg-dark"></hr>
            <section className="MetalLegends">
                <div className="container-fluid">
                    <div className="row mt-4 text-center">
                        <div className="col-md-12 mt-4">
                            <h3 className="display-3 mt-5 p-5 text-white">Σήμερα Στο Legends</h3>
                            <p className="lead text-white">Εξερευνούμε τους Infliction από το Μιλάνο</p>
                            <p className="lead text-white">Η ιστορία ξεκινάει τον Ιανουάριο του 1998 από τους δρόμους του Μιλάνου, όπου ένα έφηβο παιδί με το όνομα Fabio Tollis ζει την τυπική μέση ζωή ενός Ιταλού εφήβου. Αρχικά φαίνεται για έναν 16χρονο έφηβο με καλές επιδόσεις στο σχολείο και πάθος για την Death Metal</p>

                            <a href="/Beasts_of_satan-archive" className="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
