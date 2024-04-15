import React, {useEffect, useState} from "react";
import Navigation from "./../Navigation/Navigation";
import ReadMore from "./../ReadMore/ReadMore";
import {useParams} from 'react-router-dom';
import { storage} from "../../firebase";
import PageWithComments from "../Comments/comment";
import MetaTags from "../MetaTags/Meta";
import SocialBar from "../ShareBtns/SocialMediaBar";
import {getDownloadURL, ref} from "firebase/storage"
import SaveBTN from "../../pages/Users/SaveBTN/Save";
const DefaultArticle = () => {
    const { name } = useParams();
    const [articles, setArticles] = useState([]);


    // Συνάρτηση για αποθήκευση του άρθρου στο Firestore

    const getFirebaseStorageUrl = async (imageUrl) => {
        // Parse imageUrl to extract filename (assuming imageUrl is in the format "https://example.com/images/filename.jpg")
        const fileName = imageUrl.split('/').pop(); // Extract filename from imageUrl
        const storageRef = ref(storage, `images/${fileName}`); // Construct Firebase Storage reference

        // Get download URL for the Firebase Storage object
        return await getDownloadURL(storageRef);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch JSON file from Firebase Storage
                const articleSnapshot = await getDownloadURL(ref(storage, `articles/${name}.json`));
                console.log(articleSnapshot);
                const response = await fetch(articleSnapshot);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                data.img01 = await getFirebaseStorageUrl(data.img01);
                setArticles(data);
                 // Καλούμε τη συνάρτηση για να αποθηκεύσουμε το άρθρο στη βάση δεδομένων Firestore
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [name]);

    // Έλεγχος αν τα δεδομένα έχουν φορτωθεί
    if (!articles || Object.keys(articles).length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <MetaTags title={articles.title} image={articles.img01} ></MetaTags>
            <Navigation />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3>{articles.title}</h3>
                        <hr className="bg-dark"></hr>
                    </div>
                    <p className="lead">{articles.sub}</p>

                    <hr className="bg-dark"></hr>
                    <div className="col-md-6 credits-box">
                        <img className="img-fluid w-100" src={articles.img01} />
                        <p className="lead"><span dangerouslySetInnerHTML={{ __html: articles.details }}></span> </p>

                        <p className="lead"><span dangerouslySetInnerHTML={{ __html: articles.Socials }}></span> </p>
                    </div>
                    <div className="col-md-6">
                        <div dangerouslySetInnerHTML={{ __html: articles.content }}></div>
                        <SocialBar />
                        <PageWithComments />
                        <SaveBTN />
                    </div>
                    <ReadMore />
                </div>
            </div>
        </>
    );
}

export default DefaultArticle;
