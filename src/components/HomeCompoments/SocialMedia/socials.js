import React from "react";
import "./Socials.css";

const Socials = () => {
    return (
        <div className="socials-container text-center text-white d-flex justify-content-evenly">
            <h3 className="socials-title fancy-text text-white">Find Us on Social Media: </h3>
            <div className="social-icons">
                <a href="https://web.facebook.com/heavylocalgreece/" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook m-3 neon-icon text-white"></i>
                </a>
                <a href="https://www.instagram.com/heavy_local_greece/" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram m-3 neon-icon text-white"></i>
                </a>
                <a href="https://www.youtube.com/@eavyLocalMagazine" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-youtube m-3 neon-icon text-white"></i>
                </a>
                <a href="https://www.reddit.com/r/heavy_local_magazine/?share_id=PPNGMdjIbXT28dGOlo45r&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-reddit m-3 neon-icon text-white"></i>
                </a>
            </div>
        </div>
    );
};

export default Socials;
