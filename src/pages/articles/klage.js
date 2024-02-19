import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import klageLogo from './../../assets/klage.jpg';
import KlageLive from './../../assets/klage-live.jpg';
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import Footer from "../../compoments/footer/footer";
import PageWithComments from "../../compoments/Comments/comment";

const Klage = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                  <h4>Under Construnction due Techinical problems</h4>
                </div>

                <ReadMore />

            </div>
           </div>
        </>
    )
}
export default Klage;
