import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import Socials from "../../components/SocialMedia/socials";
import './gallery.css';
import {database, storage} from "../../firebase";
import {get, onValue, ref} from "firebase/database";

import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {NavLink} from "react-router-dom";

const ArtGallery = () => {
    const { t } = useTranslation();
    const [galleryItems, setGalleryItems] = useState([]);

    const getUserName = async (username)=>{
        let snapshot = ref(database, `users/${username}`);
        snapshot = await get(snapshot);
        if(snapshot.exists()){
            return {name: snapshot.val().displayName, id: username, wantToShow: snapshot.val().wantToShow}
        }else{
            snapshot = ref(database, `authors/${username}`);
            snapshot = await get(snapshot);
            if(snapshot.exists()) {
                return {name: snapshot.val().displayName, id: username, wantToShow: snapshot.val().wantToShow};
            }
            else {
                return {name: username, id:null, wantToShow: false};
            }
        }
    }

    useEffect(() => {
        const galleryRef = ref(database, '/gallery/uploaded');

        // Listen for data changes
        return onValue(galleryRef, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                console.log(data);

                // First, create an array of promises
                const dataPromises = data.map(async (d) => {
                    const userData = await getUserName(d.title)
                    return {
                        ...d,
                        title: userData.name,
                        id: userData.id,
                        userImage: userData.wantToShow? await getDownloadURL(storageRef(storage, `profile_images/${d.title}`)): null,
                        wantToShow: userData.wantToShow
                    };
                });

                // Use Promise.all to wait for all promises to resolve
                Promise.all(dataPromises).then((resolvedData) => {
                    console.log(resolvedData);
                    setGalleryItems(resolvedData);
                }).catch((error) => {
                    console.error("Error resolving data promises:", error);
                });
            }
        });
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="display-2 m-4 text-white">{t('galleryTitle')}</h3>
                        <hr className="bg-dark"/>
                        <p className="lead text-center text-white">{t('gallerySubtitle')}</p>
                        <Socials/>
                    </div>
                    <div className="container gallery-container">
                        <div className="tz-gallery">
                            <div className="row">
                                {galleryItems.map((item, index) => (
                                    <div className="col-sm-12 col-md-4" key={index}>
                                        <div className="card mb-3">
                                            <NavLink
                                                className="nav-link lightbox"
                                                to={`${item.image}?fullScale=true`}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.descriptionEng}
                                                    className="card-img-top"
                                                />
                                            </NavLink>
                                            <div className="card-body">
                                                <h5 className="card-title d-flex">
                                                    {(item.wantToShow)&&<img src={item.userImage} alt={item.title} className="rounded-circle"
                                                                             style={{width: "50px", height: "50px"}}/>}
                                                    {(item.id)?<NavLink className={"m-2 text-info nav-link"} to={`/author/${item.id}`}>{item.title}</NavLink>:<span className={`m-2`}>{item.title}</span>}
                                                </h5>
                                                <p className="card-text">
                                                    {item.descriptionEl}
                                                </p>
                                                <p className="card-text">
                                                    {item.descriptionEng}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className={"text-white"}>{t('submitArtTitle')}</h3>
                <p className={"text-white"}>{t('submitArtEmail')}</p>
            </div>
        </>
    );
};

export default ArtGallery;
