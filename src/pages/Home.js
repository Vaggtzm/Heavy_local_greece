import React  from "react";
import Navigation from "../compoments/Navigation/Navigation";
import './home.css';
<<<<<<< Updated upstream
import Reka from './../assets/aherusia-bacchus.jpg';
import klage from './../assets/funeralChasm.jpg';
import Necrosis from './../assets/Asomata.jpg';
=======
import Reka from './../assets/Aherusia01.jpg';
import klage from './../assets/Funeral01.jpg';
import Vapa from './../assets/tortuga02.jpg';
import Necrosis from './../assets/sado03.jpg';
import infernal from './../assets/infernalstorm.JPEG';
>>>>>>> Stashed changes
import Monkey from './../assets/startTheMonkey.jpg';
import Anorimoi from './../assets/Events/anorimoi.jpg';
import Cyanide4 from './../assets/Events/cyanide.jpg';
import Chronicle02 from './../assets/chronicles/chronicle-02/yothiria-02.jpg';
import ScentOfThornsLogo from './../assets/Asomata.jpg';

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
                    <h4>Heavy Local  GR:</h4>
                    <hr className="bg-dark" />
                    <div className="row mt-4">
                    <div className="col-md-4">
                            <div className="card">
                                <img src={ScentOfThornsLogo} className=" card-img-top w-100" alt="News Image" />
                                <div className="card-body">
                                <h5 className="card-title">Asomata:Review</h5>
                                    <p>
                                    Οι Asomata είναι μια ροκ μπάντα από την Αθήνα που προσδιορίζει τη μουσική της ως "ροκ με σκληρά ριφ, επιβλητικά φωνητικά και έντονο ρυθμό!" Ακούγοντας το πρώτο τους EP, μπορώ να επιβεβαιώσω αυτήν τη δήλωση. Αναδεικνύουν τις ροκ ρίζες τους με μια αισθητική που μας επιστρέφει στα '90s
                                    </p>
                                    <a href="/Asomata-Review-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <img src={Reka} className="img-fluid" alt="News Image" />
                                <div className="card-body">
<<<<<<< Updated upstream
                                    <h5 className="card-title">Aherusia - Bacchus ~ Epiphanies of The Crazy God (2022):Review</h5>
                                    <p className="card-text">Οι Aherusia είναι μια από τις πιο DIY μπάντες που θα μπορούσε να ακούσει κανείς αλλά επίσης και μια από τις πιο πρωτοποριακές 
                                    και περίπλοκες στο στιχουργικό και ορχηστρικό κομμάτι της metal. 
                                    Από το 1997 ως τις μέρες μας παράγουν ένα υπέροχο έργο, το αμάλγαμα της σύνθεσης μεταξύ folk και black metal, 
                                    καθώς η μυστηριακότητα της ίδιας της παράδοσης και των παραδοσιακών οργάνων και η περιπετειώδης μυθολογία συναντούν το σύγχρονο μυστικιστικό και πνευματικό στοιχείο</p>
                                    <a href="/article/Aherusia-archive" className="btn btn-primary">Read More</a>
=======
                                    <h5 className="card-title">Aherusia - Bacchus epiphanies of the crazy god:Review</h5>
                                    <p className="card-text">
                                    Οι Aherusia είναι μια από τις πιο DIY μπάντες που θα μπορούσε να ακούσει κανείς αλλά επίσης και μια από τις πιο πρωτοποριακές και περίπλοκες στο στιχουργικό και ορχηστρικό κομμάτι της metal. Από το 1997 ως τις μέρες μας παράγουν ένα υπέροχο έργο.
                                         </p>
                                    <a href="/Αheusia-Bacchus-epiphanies-of-the-crazy-god-archive" className="btn btn-primary">Read More</a>
>>>>>>> Stashed changes
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={klage} className="card-img-top  w-100" alt="News Image" />
                                <div className="card-body">
<<<<<<< Updated upstream
                                    <h5 className="card-title">Funeral Chasm - Omniversal Existence:Review</h5>
                                    <p className="card-text">
                                    Οι Funeral Chasm είναι μια πρόσφατα ιδρυθείσαι μπάντα (2020) funeral doom metal από τη Φινλανδία, με έντονες επιρροές από τη gothic σκηνή των 90s, όπως αναφέρουν οι ίδιοι. Αυτό προσέθεσε έναν ποιητικό τόνο στον ήχο τους, τον οποίο πρόσεξα κατά την πρώτη ακρόαση του Omniversal Existence, που κυκλοφόρησε το 2022. Η μπάντα αποτελείται από δύο μέλη (Sjaelepest, Dany Woe) με βάση τη Φινλανδία και έχει στο ενεργητικό της ένα άλμπουμ, το οποίο επέλεξα να αναθεωρήσω σήμερα.
                                    </p>
                                    <a href="/article/FuneralChasm-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={Necrosis} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title"></h5>
                                    <p className="card-text">
                                    Οι Asomata είναι μια ροκ μπάντα από την Αθήνα που προσδιορίζει τη μουσική της ως ροκ με σκληρά ριφ, επιβλητικά φωνητικά και έντονο ρυθμό! Ακούγοντας το πρώτο τους EP, μπορώ να επιβεβαιώσω αυτήν τη δήλωση. Αναδεικνύουν τις ροκ ρίζες τους με μια αισθητική που μας επιστρέφει στα '90s, διατηρώντας παράλληλα επιρροές από το Pop Punk, όπως αυτές μας έγιναν γνωστές από τους Green Day
                                    </p>
                                    <a href="/article/Asomata-archive" className="btn btn-primary">Read More</a>
=======
                                    <h5 className="card-title">Funeral Chasm - Omniversal Existence:Review </h5>
                                    <p className="card-text">
                                    Οι Funeral Chasm είναι μια πρόσφατα ιδρυθείσαι μπάντα (2020) funeral doom metal από τη  Δανία, με έντονες επιρροές από τη gothic σκηνή των 90s, όπως αναφέρουν οι ίδιοι. Αυτό προσέθεσε έναν ποιητικό τόνο στον ήχο τους, τον οποίο πρόσεξα κατά την πρώτη ακρόαση του "Omniversal Existence"
                                    που κυκλοφόρησε το 2022. Η μπάντα αποτελείται από δύο μέλη (Sjaelepest, Dany Woe) με βάση τη Φινλανδία και έχει στο ενεργητικό της ένα άλμπουμ, το οποίο επέλεξα να αναθεωρήσω σήμερα.
                                    Το "Omniversal Existence" είναι ένα κλασικό άλμπουμ funeral doom metal, με κύρια χαρακτηριστικά την αργή και βαριά κιθάρα και τα σκοτεινά πλήκτρα
                                    </p>
                                    <a href="/Funeral-chasm-review-archive" className="btn btn-primary">Read More</a>
>>>>>>> Stashed changes
                                </div>
                            </div>
                        </div>
                        <hr className="bg-dark" />
                        <h4>Heavy Local  ENG:</h4>

                        <hr className="bg-dark" />
                        <div className="col-md-6 p-4 h-25 bg-secondary">
                        <img src={Vapa} className="card-img-top  shadow-lg w-100" alt="News Image" />
                        <h5 className="card-title">Unveiling the Brutal Essence: An Exclusive Interview with Tortugal Sacrifice </h5>
                                <div className="card-body">
                                    <p className="card-text">
                                    As the thunderous drums and shredding guitars of Tortugal Sacrifice echo through the underground metal scene, the world braces for a sonic assault unlike any other. Hailing from the vibrant city of Guelph, Ontario, Canada, Tortugal Sacrifice has emerged as a formidable force in the realm of Death Metal. Led by the enigmatic vocalist and instrumentalist, Alex Shellington, the band’s raw energy and unbridled passion have captivated audiences worldwide. Tortugal Sacrifice means Alex Shellington (vocals), Tanner Ravazzolo (guitars, lead), Cole Williamson (drums), Conner Williamson (bass) and Evan Wiggins (guitars, rhythm).
                                    </p>
                                    <a href="/Totrugal-Sacrifice-Interview-archive" className="btn btn-primary">Read More</a>
                                </div>

                        </div>
                        <div className="col-md-6 p-4 h-50 bg-secondary">
                        <img src={Necrosis} className="card-img-top  w-100" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Sado Sathanas: A Journey Through the Abyss of Black Metal</h5>
                                    <p className="card-text p-1">
                                    Sado Sathanas started its journey with the split called “Diabolische Inquisition” and continued with the demos “Vernichtungsschlag!” and “Bellum Omnia versus Omnes - Reich Anti I.N.R.I.”. In 2010 they released their first album entitled “Opus Diaboli”. 
In the shadowy realm of black metal, where darkness reigns supreme and the air is thick with the scent of brimstone, Sado Sathanas’ debut album, “Opus Diaboli” stands as a testament to the band’s mastery of the infernal arts. Intimidatingly satanic, the album is a successful one. Yet beneath its sinister veneer lies a tapestry of emotional depth and melodic intricacy that defies conventional expectations. From the haunting melodies of acoustic guitars to the thunderous roar of blast beats, “Opus Diaboli” ,</p>                                  
                               <a href="/SadoSathanas-Review-archive" className="btn btn-primary p-1">Read More</a>
                                </div>

                        </div>


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
                            <p className="lead text-white">Αleah Liane Stanbridge – Το Κύκνειο Άσμα</p>
                            <p className="lead text-white">Σήμερα είναι μια ημέρα αρκετά μελαγχολική, θα έλεγα. Η Aleah Liane Stanbridge είναι το θέμα που αγγίζουμε σήμερα στο "Legends", γνωστή απλώς ως "Aleah". Η βαρύτητα των στίχων της και η σχεδόν αγγελική της φωνή... είναι κάτι που σίγουρα αρμόζει στο περιβάλλον μέσα στο οποίο γράφω αυτό το άρθρο. Ας ξεκινήσουμε λοιπόν από την αρχή.</p>

                            <a href="/legends-2-archive" className="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
