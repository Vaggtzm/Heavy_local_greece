import React from "react";
import { NavLink } from "react-router-dom";


const EarlyBirds = ()=>{
    return(
        <div className="container">
            <div className="row text-center">
            <hr className="bg-white" />
            <h3 className="text-white">
            Early Birds

            </h3>
            <hr className="bg-white" />

                <div className="col-md-6">
                <h3 className="text-white">ALBUM REVIEW: Suffering Souls’ “An Iconic Taste of Demise” — Aggression Meets Elegance</h3>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2FMedusas.jpg?alt=media&token=665df9dc-3b5f-4c9b-805f-a08849e08c6d"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
                
             <p className="lead text-white">
             Suffering Souls triumphantly return to the symphonic black metal scene with their latest release, “An Iconic Taste of Demise”. The album, written entirely by Tobias “Lord Esgaroth” Micko, showcases an evolution in their sound that is both aggressive and expansive, setting a new standard in their already illustrious career.              </p>
            
               <NavLink
                to="/article/early/ALBUM-REVIEW-Suffering-Souls-An-Iconic-Taste-of-Demise---Aggression-Meets-Elegance"
                className="btn btn-danger pb-2"
              >
              Read More
              </NavLink>
                </div>
                <div className="col-md-6">
                <h3 className="text-white">ALBUM REVIEW: Unearthing the Shamanic Depths of Wounded Funeral’s Latest Masterpiece, “Skaalp”</h3>
              <img
                src="https://pulse-of-the-underground.com/assets/a1160982583_5.jpg"
                className="img-fluid w-75 rounded-2 m-2"
                alt="Top News Image"
              />
                
             <p className="lead text-white">
             Canadian black metal outfit Wounded Funeral emerges from the mystical depths of the Monteregian woods with their latest offering, “Skaalp”. This third opus from the enigmatic project delves deep into shamanic narratives inspired by the dark legends of the First Nations.
             </p>            
               <NavLink
                to="/article/early/ALBUM-REVIEW-Unearthing-the-Shamanic-Depths-of-Wounded-Funerals-Skaalp"
                className="btn btn-danger pb-2"
              >
              Read More
              </NavLink>
                </div>
            <hr className="bg-white" />
            <h3 className="text-white">Regular Stream</h3>
            <hr className="bg-white" />


            </div>
        </div>
    )
}

export default EarlyBirds