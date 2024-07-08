import {child, get, onValue, push, ref, remove, set, update} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Socials from "../../components/HomeCompoments/SocialMedia/socials";
import { auth, database, storage } from "../../firebase";
import './gallery.css';

import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { NavLink } from "react-router-dom";
import {deleteImage} from "../../components/UploadSystem/articleData/articleData";

const ArtGallery = () => {
    const { t } = useTranslation();
    const [galleryItems, setGalleryItems] = useState([]);
    const [reviewItems, setReviewItems] = useState([]);
    const [isGalleryAdmin, setIsGalleryAdmin] = useState(false);

    const getUserName = async (username) => {
        let snapshot = ref(database, `users/${username}`);
        snapshot = await get(snapshot);
        if (snapshot.exists()) {
            return { name: snapshot.val().displayName, id: username, wantToShow: snapshot.val().wantToShow };
        } else {
            snapshot = ref(database, `authors/${username}`);
            snapshot = await get(snapshot);
            if (snapshot.exists()) {
                return { name: snapshot.val().displayName, id: username, wantToShow: snapshot.val().wantToShow };
            } else {
                return { name: username, id: null, wantToShow: false };
            }
        }
    };

    const fetchGalleryImages = (galleryRef, setGalleryState) => {
        return onValue(galleryRef, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                console.log(data);

                // Remove the placeholder item if it exists
                if (data.placeholder) {
                    delete data.placeholder;
                }

                // First, create an array of promises
                const dataPromises = Object.keys(data).map(async (key) => {
                    const d = data[key];
                    const userData = await getUserName(d.title);
                    let downloadLink;
                    try {
                        const r = storageRef(storage, d.image);
                        downloadLink = await getDownloadURL(r);
                        d.storageRef = d.image;
                    } catch (e) {
                        console.log(e);
                        downloadLink = d.image;
                    }
                    return {
                        ...d,
                        title: userData.name,
                        id: key,
                        userImage: userData.wantToShow ? await getDownloadURL(storageRef(storage, `profile_images/${d.title}`)) : null,
                        wantToShow: userData.wantToShow,
                        image: downloadLink
                    };
                });

                // Use Promise.all to wait for all promises to resolve
                Promise.all(dataPromises).then((resolvedData) => {
                    console.log(resolvedData);
                    setGalleryState(resolvedData);
                }).catch((error) => {
                    console.error("Error resolving data promises:", error);
                });
            } else {
                // If data is null, set the state to an empty array
                setGalleryState([]);
            }
        });
    };


    const handleAcceptImage = async (imageData) => {
        const newImageRef = ref(database, `/gallery/uploaded`);
        const reviewImageRef = ref(database, `/gallery/review/${imageData.id}`);

        // Generate a unique key for the new image
        const newImageKey = push(child(ref(database), '/gallery/uploaded')).key;

        // Construct the update object
        const updates = {};
        updates[`/gallery/uploaded/${newImageKey}`] = imageData;

        try {
            // Perform the update
            await update(ref(database), updates);
            // Remove the image from the review path
            await remove(reviewImageRef);
        } catch (error) {
            console.error("Error transferring image:", error);
        }
    };

    const handleDeleteImage = async (imageId, galleryId) => {
        console.log("imageid: ",imageId);
        try {
            await deleteImage(`/gallery/review/${imageId}`)
        }catch(error){
                console.error("Error deleting image:", error);
        }
        console.log(`database: /gallery/review/${imageId}`)
        remove(ref(database, `/gallery/review/${imageId}`))
    };

    useEffect(() => {
        const checkAdminStatus = async (user) => {
            const rolesRef = ref(database, '/roles/galleryAdmin');
            const snapshot = await get(rolesRef);
            const adminEmails = snapshot.val() || [];
            const isAdmin = adminEmails.includes(user.email)
            setIsGalleryAdmin(isAdmin);

            if (user && isAdmin) {
                const reviewRef = ref(database, '/gallery/review');
                fetchGalleryImages(reviewRef, setReviewItems);
            }

        };

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await checkAdminStatus(user)
            } else {
                setIsGalleryAdmin(false);
            }
            const galleryRef = ref(database, '/gallery/uploaded');
            fetchGalleryImages(galleryRef, setGalleryItems);
        });
    }, [isGalleryAdmin]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="display-2 m-4 text-white">{t('galleryTitle')}</h3>
                        <hr className="bg-dark"/>
                        <p className="lead text-center text-white">{t('gallerySubtitle')}</p>
                        <div className={"w-100 d-flex justify-content-center mt-5"}>
                        <h3 className={"text-white"}>{t('submitArtTitle')}</h3>
                        </div>
                        <div className={"w-100 d-flex justify-content-center mb-5"}>
                            <NavLink className={"btn btn-primary"} to={"/gallery/upload"}>UPLOAD</NavLink>
                        </div>
                        <Socials/>
                    </div>
                    <div className="container gallery-container">
                    <div className="w-100">
                            <div className="row g-4 d-flex justify-content-evenly">
                                {galleryItems.map((item, index) => (
                                    <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
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
                                                    {(item.wantToShow) && <img src={item.userImage} alt={item.title} className="rounded-circle"
                                                                               style={{ width: "50px", height: "50px" }} />}
                                                    {(item.id) ? <NavLink className={"m-2 text-info nav-link"} to={`/author/${item.id}`}>{item.title}</NavLink> : <span className={`m-2`}>{item.title}</span>}
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

                    {isGalleryAdmin && (
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="display-4 m-4 text-white">{t('reviewGalleryTitle')}</h3>
                                    <hr className="bg-dark" />
                                </div>
                                <div className="container gallery-container">
                                    <div className="tz-gallery">
                                        <div className="row g-4">
                                            {reviewItems.map((item, index) => (
                                                <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
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
                                                                {(item.wantToShow) && <img src={item.userImage} alt={item.title} className="rounded-circle"
                                                                                           style={{ width: "50px", height: "50px" }} />}
                                                                {(item.id) ? <NavLink className={"m-2 text-info nav-link"} to={`/author/${item.id}`}>{item.title}</NavLink> : <span className={`m-2`}>{item.title}</span>}
                                                            </h5>
                                                            <p className="card-text">
                                                                {item.descriptionEl}
                                                            </p>
                                                            <p className="card-text">
                                                                {item.descriptionEng}
                                                            </p>
                                                            <div className="d-flex justify-content-between">
                                                                <button className="btn btn-success" onClick={() => handleAcceptImage(item)}>
                                                                    {t('accept')}
                                                                </button>
                                                                <button className="btn btn-danger" onClick={() => handleDeleteImage(item.id, item.id)}>
                                                                    {t('delete')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

};

export default ArtGallery;
