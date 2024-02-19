import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import order02 from './../../assets/Asomata02.jpg';
import order01 from './../../assets/Asomata.jpg';
import ReadMore from "../../compoments/ReadMore/ReadMore";
import PageWithComments from "../../compoments/Comments/comment";

const Asomata = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Asomata:Review
                    <hr className="bg-dark"></hr>
                    
                    <h4>Review</h4> <p className="lead">Απο τον Bαγγελη Τζιμα</p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={order01} className="img-fluid ScentAlbumCover shadow-lg rounded-4"></img>
                    <h4>Details</h4>
                    <p className="lead">
                    Track List 
                    </p>
<p>Litle Man</p>
<p>My reincarnation</p>
<p>Rotten Fish </p>
<p>Torn Apart</p>
<p>Conundrum</p>



                    <p className="lead">
                    line-up
                    </p>
                    <p className="lead">
                        Laszlo - drums
                    </p>
                    <p className="lead">
                        Mike - bass
                    </p>                    
                    <p className="lead">
                        Theodore - guitar
                    </p>                         
                    <p className="lead">
                        Jaan - guitar/vocals
                    </p>                         

                         
                         <p className="lead-text-center">Βρες τους Asomata <a href="https://www.instagram.com/Asomata.official"><i className="bi bi-instagram"></i></a> <a href="https://web.facebook.com/asomata.band"><i className="bi bi-facebook"></i></a><a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fopen.spotify.com%2Fartist%2F624mP8fclZ84WnqUKkk6RK%3Ffbclid%3DIwAR1Wxd1VqFKA6h41-zEr1grsbWEQOTgt9n8TgEn05A26yAJAQ1mODLMry0M&h=AT26Lf7f012nZsn3SPWCbbOGvTeKD3ubk3hgvklXgGG9Oj6nAoATM2EYzYU2jwEosStOa5cXp6XobxTsjx_UMNo4JjGlgizsb29UVanxy5JgPcTakUWdRgkp2qSctA"><i className="bi bi-spotify"></i></a></p>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    Οι Asomata είναι μια ροκ μπάντα από την Αθήνα που προσδιορίζει τη μουσική της ως "ροκ με σκληρά ριφ, επιβλητικά φωνητικά και έντονο ρυθμό!" Ακούγοντας το πρώτο τους EP, μπορώ να επιβεβαιώσω αυτήν τη δήλωση. Αναδεικνύουν τις ροκ ρίζες τους με μια αισθητική που μας επιστρέφει στα '90s, διατηρώντας παράλληλα επιρροές από το Pop Punk, όπως αυτές μας έγιναν γνωστές από τους Green Day. Τα φωνητικά τους προσδίδουν μια ενέργεια και νεανικότητα, ενώ ο ρυθμός τους δίνει ένα αίσθημα κίνησης. Το μπάσο ενισχύει την εντασιακή ατμόσφαιρα, δημιουργώντας μια σταθερή "βάση" για μελωδικά σόλο και "βρώμικα ριφ". Με συνθέσεις γεμάτες νεανικό πνεύμα και εφηβική αίσθηση, το συνολικό τους έργο αναδεικνύει μια δυναμική ροκ εμπειρία.
                    </p>
                  <p className="text-center"> <img src={order02} className=" img-fluid W-100 m-2 shadow-lg rounded-4"></img></p> 
                    <p className="lead">
                    Σίγουρα ένα ιδανικό άλμπουμ για όσους δεν είναι τόσο "σκληροί" στα ακούσματα, αλλά για όσους αναζητούν την ενέργεια και το διακριτικό, ηπιό χάος του ροκ, όπως το μάθαμε από παλιά, συνοδευόμενο από μια κρύα μπύρα πάντα!
                    </p>
                    <PageWithComments />

                </div>
                <ReadMore />
            </div>
           </div>

        </>
    )
}
export default Asomata;