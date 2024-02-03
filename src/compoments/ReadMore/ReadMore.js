import React from "react";
import RekaReadmore from "./../../assets/reka.png";
import KlageReadMore from "./../../assets/klage.jpg";
import NecrosisReadMore from "./../../assets/akral-necrosis.jpg";
const ReadMore = ()=>{
    return(
        <>
        <div className="containter">
        <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card">
                                <img src={RekaReadmore} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Reka: Το διεθνές ατμοσφαιρικό δυστοπικό “Ποτάμι” της Ρωσίας</h5>
                                    <p className="card-text">Οι Reka είναι όπως λένε και οι ίδιοι μια παρέα καθημερινών ανθρώπων δίχως σταθερή βάση, είναι σαν μια διεθνής ιδέα, η οποία εδράζει στην Ρωσία</p>
                                    <a href="/article/Reka-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={KlageReadMore} className="card-img-top  w-100" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Klage: Die Weihe des Eises</h5>
                                    <p className="card-text">Έπεσα πάνω σε αυτό το CD σε τοπικό δισκάδικο στα Ιωάννινα και από την πρώτη στιγμή με τράβηξε το μινιμαλιστικό design και το μυστηριώδες album cover. Ήταν αυτό που λέμε μια εικόνα, χίλιες λέξεις.</p>
                                    <a href="/article/klage-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={NecrosisReadMore} className="card-img-top" alt="News Image" />
                                <div className="card-body">
                                    <h5 className="card-title">Akral Necrosis: Αψηφώντας τις συμβάσεις και χαράσσοντας ένα μονοπάτι στην Ρουμανική Black Metal</h5>
                                    <p className="card-text">Στην καρδιά της underground Ρουμανικής σκηνής μπορεί να εντοπιστεί μια μπάντα η οποία αδιάκοπα προκαλεί τις νόρμες και έχει από το 2006 βρει την δική της θέση, αυτή η μπάντα ακούει στο όνομα Akral Necrosis. Έχοντας αναδειχθεί ως μια ανυπέρβλητη δύναμη αψηφούν το status quo της κλασικής black metal με τον αιχμηρό τους ήχο και την αλύγιστη αποφασιστικότητά τους.</p>
                                    <a href="/article/Akral-archive" className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>

        </div>
        </>
    )
}
export default ReadMore;