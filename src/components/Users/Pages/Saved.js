import React, {useState, useEffect} from "react";
import {database, storage} from "../../../firebase";
import {ref as databaseRef, onValue} from "firebase/database";
import {ref, getDownloadURL} from "firebase/storage";
import AppNavigation from "../../AppNav/AppNav";
import {auth} from "../../../firebase";
import SavedArticleData from "../SavedArticleData";


const SavedArtciles = () => {
    const [data, setData] = useState(null);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user)
                console.log(user, "User logged in ");
                const dataRef = databaseRef(database, `users/${user.uid}/savedArticles/`);
                onValue(dataRef, (snapshot) => {
                    const fetchedData = snapshot.val();
                    console.log(fetchedData, "Fetched data");
                    setData(fetchedData);

                });
            } else {
                console.log("Ο χρήστης δεν είναι συνδεδεμένος");
            }
        });
    }, [])


    return (
        <>
            <AppNavigation/>
            <div className="container">
                <h1>Saved Articles</h1>
                <div className="row">
                    {data ? (
                        Object.entries(data).map(([articleKey, articleData]) => (
                            <div className="col-md-4 mb-4" key={articleKey}>
                                <SavedArticleData article={articleKey} isSaved={articleData}/>
                            </div>
                        ))

                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    )
}
export default SavedArtciles;