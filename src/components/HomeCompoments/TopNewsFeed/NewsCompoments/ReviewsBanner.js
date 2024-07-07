import React from "react";
import { NavLink } from "react-router-dom";
import SpotifyBannger from './../../SpotifyBanner/SpotifyBanner'
import './ReviewsBanner.css'

const ReviewsBanner = () => {
   return(
    <>
    <div className="jumbotron jumbotron-fluid ReviewsBanner">
    <div className="container ">
    <h2 className="display-4 text-white m-2">Latest Reviews:</h2>
        <div className="row">
        <div className="col-md-6">
        <div className="CollageBox d-flex flex-wrap">
            <div className="Img-box m-1">
                <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F286849395_673615767140147_5560296650843229742_n_800x600.jpg?alt=media&token=ecf484b5-fc3d-4877-b3a8-a122ca53f683" />
            </div>
            <div className="Img-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F286849395_673615767140147_5560296650843229742_n_800x600.jpg?alt=media&token=ecf484b5-fc3d-4877-b3a8-a122ca53f683" />

            </div>
            <div className="Img-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2F286849395_673615767140147_5560296650843229742_n_800x600.jpg?alt=media&token=ecf484b5-fc3d-4877-b3a8-a122ca53f683" />
            </div>

        </div>
     </div>
     <div className="col-md-6">
     <div className="ExpolreBox">
     <h3 className="text-white text-center">
     Take a look  at our  <span className="text-danger">latest</span>  reviews </h3>
     <p className="lead text-white text-center">
     new bands , singles and albums every week !

     </p>
     <div className="Button Box d-flex justify-content-center align-items-center">
     <NavLink  className="btn btn-danger">
      Explore 
     </NavLink>
     </div>

     </div>
     <h2 className=" text-white m-2 pb-4 text-center">Spotify Latest Releases:</h2>
    <SpotifyBannger  className="m-3"/>
     </div>
     <div className="col-md-4">

     </div>

        </div>
    </div>
    </div>
    
    </>
   )
}

export default ReviewsBanner