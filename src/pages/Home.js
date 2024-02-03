import React  from "react";
import Navigation from "../compoments/Navigation/Navigation";
import './home.css';
import Reka from './../assets/reka.png';
import klage from './../assets/klage.jpg';
import Vapa from './../assets/vapa.jpg';
import Necrosis from './../assets/akral-necrosis.jpg';
import infernal from './../assets/infernalstorm.JPEG';
import Contact from "../compoments/ContactForm/contact";
import Donate from "../compoments/donate/donate";
import Footer from "../compoments/footer/footer";
import Socials from "../compoments/SocialMedia/socials";
const Home = () => {
    return (
        <>
            <Navigation />
            <header>
                <div className="container mt-4">
                    <div className="row text-center bg-secondary p-3 m-2 shadow-lg">
                        <div className="col-md-6">
                            <div className="jumbotron jumbotron-fluid">
                                <div className="container-fluid">
                                    <h1 className="display-4">Welcome to <span className="font-1">Heavy Local</span> </h1>
                                    <p className="lead">Stay brutal and explore the unknown  metal news, reviews, and features!</p>
                                    <hr className="bg-dark" />
                                    <Contact />
                                    <Socials />
                                    <hr className="bg-dark" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>Vapa:"Memories of a Flawless World" - Κριτική </h3>
                            <img src={Vapa} alt="vapa " className="img-fluid  shadow-lg" />
                            <div className="content bg-dark opacity-50 p-4">
                                <p className="lead text-white   ">
                                Κατά τη διάρκεια ενός χαλαρού πρωινού, αποφάσισα να αφιερώσω χρόνο στο νέο EP με τίτλο "Memories of a Flawless World" από τον Vapa ( Lioneye). Καθώς έπινα τον καφέ μου, βυθίστηκα στις σκέψεις και τα συναισθήματα που προκλήθηκαν από αυτή την ακρόαση.
                                </p>
                                <a href="article/Vapa-archive" className="btn btn-danger">Read More</a>
                            </div>
                        </div>
                    </div> 
                    <hr className="bg-dark" />

                    <h4>Heavy Local reviews GR:</h4>
                    <hr className="bg-dark" />
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card">
                                <img src={Reka} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας</h5>
                                    <p className="card-text">Οι Reka είναι όπως λένε και οι ίδιοι μια παρέα καθημερινών ανθρώπων δίχως σταθερή βάση, είναι σαν μια διεθνής ιδέα, η οποία εδράζει στην Ρωσία</p>
                                    <a href="article/Reka-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={klage} className="card-img-top  w-100" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Klage: Die Weihe des Eises</h5>
                                    <p className="card-text">Έπεσα πάνω σε αυτό το CD σε τοπικό δισκάδικο στα Ιωάννινα και από την πρώτη στιγμή με τράβηξε το μινιμαλιστικό design και το μυστηριώδες album cover. Ήταν αυτό που λέμε μια εικόνα, χίλιες λέξεις.</p>
                                    <a href="article/klage-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={Necrosis} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Akral Necrosis: Αψηφώντας τις συμβάσεις και χαράσσοντας ένα μονοπάτι στην Ρουμανική Black Metal</h5>
                                    <p className="card-text">Στην καρδιά της underground Ρουμανικής σκηνής μπορεί να εντοπιστεί μια μπάντα η οποία αδιάκοπα προκαλεί τις νόρμες και έχει από το 2006 βρει την δική της θέση, αυτή η μπάντα ακούει στο όνομα Akral Necrosis. Έχοντας αναδειχθεί ως μια ανυπέρβλητη δύναμη αψηφούν το status quo της κλασικής black metal με τον αιχμηρό τους ήχο και την αλύγιστη αποφασιστικότητά τους.</p>
                                    <a href="article/Akral-archive" className="btn btn-primary">Read More</a>
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
                <h4>Live chornicles by Daria (ENG)</h4>
                    <div className="row text-center mt-4">
                        <div className="col-md-6">
                            <img src={infernal} className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h3>
                            Chronicles of the Underworld Vol 1: Infernal Storm's Eerie Enchantment at Psychosounds Festival 2023
                            </h3>
                            <a href="/Chronicles_of_the_underworld_part01-archive" className="btn btn-primary">Read More</a>

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
