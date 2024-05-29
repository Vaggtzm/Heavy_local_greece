import React, { useState, useEffect } from 'react';
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import {ref as dbRef, update, get, onValue} from "firebase/database";
import {auth, database, storage} from "../../firebase";

const RecommendationSystem = () => {
    const [favoriteCategories, setFavoriteCategories] = useState([]);

    const fetchCategories = async (userId) => {
        const userSavedArticlesRef = dbRef(database, `users/${userId}/savedArticles`);
        onValue(userSavedArticlesRef, async (snapshot) => {
            const savedArticlesData = snapshot.val();
            if (savedArticlesData) {
                const savedArticlesList = Object.keys(savedArticlesData).map((key) => {
                    console.log(key)
                    return ({
                        name: key,
                        isEarlyAccess: savedArticlesData[key].isEarlyAccess
                    })});
                await fetchCategoriesFromArticles(savedArticlesList);
            } else {
                setFavoriteCategories([]);
            }
        });
    };

    const fetchCategoriesFromArticles = async (savedArticlesList) => {
        console.log(savedArticlesList)
        const categories = [];
        for (const article of savedArticlesList) {
            let articleData;
            // Read the JSON object from the corresponding folder in Firebase Storage
            if (article.isEarlyAccess) {
                articleData = await fetchArticleData('early_releases', article.name);
            } else {
                articleData = await fetchArticleData('articles', article.name);
            }
            console.log("Helo"+articleData)
            // Extract categories from the article data
            if (articleData && articleData.category) {
                categories.push(articleData.category);
            }
        }
        // Set the retrieved categories as the user's favorite categories
        setFavoriteCategories(categories);
    };

    const fetchArticleData = async (folder, articleName) => {
        const articleRef = storageRef(storage, `${folder}/${articleName}.json`);
        try {
            const url = await getDownloadURL(articleRef);
            const response = await fetch(url);
            const articleData = await response.json();
            return articleData;
        } catch (error) {
            console.error('Error fetching article data:', error);
            return null;
        }
    };

    useEffect(() => {


        auth.onAuthStateChanged((user) => {
            if (user) {
                fetchCategories(user.uid);
            }
        });
    }, []);

    return (
        <div>
            <h2>Favorite Categories</h2>
            <ul>
                {favoriteCategories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationSystem;
