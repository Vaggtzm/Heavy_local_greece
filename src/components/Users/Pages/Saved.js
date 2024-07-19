import React, {useState, useEffect} from "react";
import {database} from "../../../firebase";
import {ref as databaseRef, onValue} from "firebase/database";
import {auth} from "../../../firebase";
import SavedArticleData from "../SavedArticleData";


const SavedArtciles = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log(user, "User logged in ");
                const dataRef = databaseRef(database, `users/${user.uid}/savedArticles/`);

                onValue(dataRef, (snapshot) => {
                    const fetchedData = snapshot.val();
                    console.log(fetchedData, "Fetched data");
                    setData(fetchedData);

                });
                setLoading(false);
            } else {
                console.log("Ο χρήστης δεν είναι συνδεδεμένος");
            }
        });
    }, [])


    return (
        <>
            <div className="container text-white">
                <h1>Saved Articles</h1>
                <div className="row mb-5">
                    {!loading ?((data)? (
                        Object.entries(data).map(([articleKey, articleData]) => (
                            <div className="col-md-4 mb-4" key={articleKey}>
                                <SavedArticleData article={articleKey} isSaved={articleData}/>
                            </div>
                        ))

                    ):<p>No data to fetch</p>) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    )
}
export default SavedArtciles;