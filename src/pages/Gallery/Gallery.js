import React, {useEffect, useState} from "react";
import Socials from "../../components/SocialMedia/socials";
import './gallery.css';
import {database} from "../../firebase";
import {onValue, ref} from "firebase/database";

const ArtGallery = () => {

    const [galleryItems, setGalleryItems] = useState([]);


    useEffect(() => {
        const galleryRef = ref(database,'/gallery/uploaded');

        // Listen for data changes
        return onValue(galleryRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data);
                setGalleryItems(data);
            }
        });
    }, []);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="display-2 m-4 text-white">Art Gallery</h3>
                        <hr className="bg-dark"/>
                        <p className="lead text-center text-white">Metal inspired artworks by YOU</p>
                        <Socials/>
                    </div>
                    <div className="container gallery-container">
                        <div className="tz-gallery">
                            <div className="row">
                                {galleryItems.map((item, index) => (
                                    <div className="col-sm-12 col-md-4" key={index}>
                                        <div className="card mb-3">
                                            <a
                                                className="lightbox"
                                                href={`${item.image}?fullScale=true`}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.description}
                                                    className="card-img-top"
                                                />
                                            </a>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
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
                <h3 className={"text-white"}>Submit your art at </h3>
                <p className={"text-white"}>heavylocalgreece@gmail.com</p>
            </div>
        </>
    );
};

export default ArtGallery;
