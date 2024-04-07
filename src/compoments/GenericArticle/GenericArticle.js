import React, { useEffect, useState } from "react";
import Navigation from "./../Navigation/Navigation";
import ReadMore from "./../ReadMore/ReadMore";
import { useParams } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import PageWithComments from "../Comments/comment";
import MetaTags from "../MetaTags/Meta";
const DefaultArticle = () => {
    const { name } = useParams();
    const [articles, setArticles] = useState([]);

    // Συνάρτηση για αποθήκευση του άρθρου στο Firestore
    const saveArticleToFirestore = async (articleData) => {
        try {
            const docRef = await addDoc(collection(db, "Articles"), articleData);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/articles/' + name + '.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setArticles(data);
                console.log(data);
                saveArticleToFirestore(data); // Καλούμε τη συνάρτηση για να αποθηκεύσουμε το άρθρο στη βάση δεδομένων Firestore
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
                        <PageWithComments />

                    </div>
                    <ReadMore />
                </div>
            </div>
        </>
    );
}

export default DefaultArticle;
