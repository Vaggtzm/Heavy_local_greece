import React from "react";
import './Banner.css';
import SpotifyLogo from "./../../assets/Spotify.png"


const SpotifyBanner = ()=>{
    return(
    <>
<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-12">
      <div className="spotify-banner">
      <img src={SpotifyLogo} className="rounded-circle img-fluid" />
        <h2>Follow us on Spotify</h2>
        <p>Discover our latest playlists and releases!</p>
        <a href="https://open.spotify.com/user/31jqbodkuombc2qxyntusb3thhni" className="btn btn-danger">Follow</a>
      </div>
    </div>
  </div>
</div>
     </>
    );
}

export default SpotifyBanner;