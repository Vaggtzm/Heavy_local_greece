import NavLink from "../LanguageWrapper/NavLink";
import React, {useEffect, useState} from "react";
import "./profile-normal.css"
import {get, onValue, ref as dbRef} from "firebase/database";
import {getDownloadURL, ref} from "firebase/storage";
import {database, storage} from "../../firebase";

const AuthorOfArticle = ({authorCode}) => {

    const [author, setAuthor] = useState(null);


    const getAuthor = async ()=>{
        /**
         * Find the correct user ref
         * @type {DatabaseReference}
         */
        let usersRef = dbRef(database, `authors/${authorCode}`);
        console.log(`authors/${authorCode}`)
        const tempRef = await get(usersRef);
        console.log("Test 131")
        if(!tempRef.exists()){
            usersRef = dbRef(database, `users/${authorCode}`);
            const tempRef = await get(usersRef);
            if(!tempRef.exists()){
                setAuthor({
                    displayName: authorCode
                });
                console.log(`users/${authorCode}`)
            }
            console.log("Test 133")
        }

        // Set the author based on the ref

        if (usersRef) {
            onValue(usersRef, async (snapshot) => {
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    let userImage = ref(storage, `/profile_images/${authorCode}_600x600`);
                    try{
                        usersData.photoURL = await getDownloadURL(userImage);
                    }catch (e) {
                        usersData.wantToShow = false;
                    }

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