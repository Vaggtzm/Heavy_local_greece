import NavLink from "../LanguageWrapper/NavLink";
import React, {useEffect, useState} from "react";
import "./profile-normal.css"
import {onValue, ref as dbRef} from "firebase/database";
import {getDownloadURL, ref} from "firebase/storage";
import {database, storage} from "../../firebase";

const AuthorOfArticle = ({authorCode}) => {

    const [author, setAuthor] = useState(null);


    const getAuthor = async ()=>{
        const usersRef = dbRef(database, `authors/${authorCode}`);
        if (usersRef) {
            onValue(usersRef, async (snapshot) => {
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    let userImage = ref(storage, `/profile_images/${authorCode}_600x600`);
                    usersData.photoURL = await getDownloadURL(userImage);
                    console.log(usersData);

                    setAuthor(usersData);
                } else {
                    setAuthor({
                        displayName: authorCode
                    })
                }
            });
        }
    }

    useEffect(()=>{
        getAuthor().then();
    },[authorCode]);

    if(!author) return null;

    return (
        <div className="d-flex align-items-center">
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