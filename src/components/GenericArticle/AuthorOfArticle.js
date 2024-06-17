import {NavLink} from "react-router-dom";
import React from "react";
import "./profile-normal.css"
//import "./profile-animation.css";

const AuthorOfArticle = ({author, authorCode}) => {

    if(!author) return null;

    return (
        <div className="col-6 w-50 d-flex align-items-center">
            {(author.wantToShow && author.photoURL) && (
                <div className="image-container ms-1 profile-card">
                    <img
                        src={author.photoURL}
                        alt={author.displayName}
                        className="profile-image"
                    />
                    <div className="profile-image-overlay"></div>
                </div>
            )}
            <NavLink to={`/author/${authorCode}`} className="nav-link profile-details">
                <div className="row m-0">
                    <span className="text-info text-center h4">{author.displayName}</span>
                </div>
                <div className="row m-0">
                    <span className="text-white text-center h6">{author.role}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default AuthorOfArticle;