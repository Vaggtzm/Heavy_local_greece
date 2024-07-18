import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';
import NavLink from "../../components/LanguageWrapper/NavLink";
import "./Gigs.css";
import {getFirebaseStorageUrlFull} from "../../systems/UploadSystem/articleData/articleData";

const GigsPage = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getThumbnailUrl = async (gig, thumbnail) => {
        try {
            return getFirebaseStorageUrlFull(`/gigs/${gig}/${thumbnail}`, false);
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    useEffect(() => {
        const gigsRef = ref(database, '/gigs');
        console.log("Waiting for gigs");
        get(gigsRef).then(async (snapshot) => {
            console.log("data downloaded")
            const data = snapshot.val();
            if (data) {
                const gigsList = await Promise.all(Object.keys(data).map(async (key) => {
                    return {
                        date: key,
                        thumbnailURL: await getThumbnailUrl(key, data[key].thumbnail),
                        ...data[key],
                    }
                }));
                setGigs(gigsList);
            }
            setLoading(false);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return (
        <section className='gigs'>
            <div className="container">
                <h1 className="text-center mb-5 text-white">Gigs</h1>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {gigs.map((gig) => (
                            <div key={gig.date} className="col-md-6">
                                <div className="card w-100  rounded-2">
                                    <div className="card-inner">
                                        <div className="card-front">
                                            <img
                                                className="img-fluid h-75"
                                                src={gig.thumbnailURL || 'placeholder.jpg'}
                                                alt={gig.title}
                                            />
                                            <div className="hover-message">
                                                Hover me
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{gig.title}</h5>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="card-details">
                                                {gig.description}
                                                <NavLink to={`/gigs/${gig.date}`} className="btn text-white" style={{ backgroundColor: "#05021f" }}>
                                                    View Gig
                                                </NavLink>

                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default GigsPage;
