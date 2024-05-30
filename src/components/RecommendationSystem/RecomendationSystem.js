import React, { useState, useEffect } from 'react';
import {ref as storageRef, getDownloadURL, listAll} from "firebase/storage";
import {ref as dbRef, onValue} from "firebase/database";
import {auth, database, storage} from "../../firebase";
import {NavLink} from "react-router-dom";

const RecommendationSystem = () => {
    const [favoriteCategories, setFavoriteCategories] = useState([]);
    const [articles, setArticles]=useState([]);

    const fetchCategories = (userId) => {
        return new Promise((resolve, reject) => {
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



                    const categories = [];
                    for (const article of savedArticlesList) {
                        let articleData;
                        // Read the JSON object from the corresponding folder in Firebase Storage
                        if (article.isEarlyAccess) {
                            articleData = await fetchArticleData('early_releases', article.name);
                        } else {
                            articleData = await fetchArticleData('articles', article.name);
                        }
                        // Extract categories from the article data
                        if (articleData && articleData.category) {
                            categories.push(articleData.category);
                        }
                    }
                    // Set the retrieved categories as the user's favorite categories
                    resolve(categories);
                } else {
                    resolve([]);
                }
            });
        })
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


    const readAllArticles = async () => {
        try {
            const articles = [];

            // Read articles from 'articles' folder
            const articlesFolderRef = storageRef(storage, 'articles');
            const articlesList = await listAll(articlesFolderRef);
            const articlePromises = articlesList.items.map(async (item) => {
                const downloadUrl = await getDownloadURL(item);
                const response = await fetch(downloadUrl);
                const responseJSON = await response.json();
                responseJSON.link = `/article/${item.name.replace(".json", "")}`
                return responseJSON;
            });
            const articlesData = await Promise.all(articlePromises);
            articles.push(...articlesData);

            // Read articles from 'early_releases' folder
            const earlyReleasesFolderRef = storageRef(storage, 'early_releases');
            const earlyReleasesList = await listAll(earlyReleasesFolderRef);
            const earlyReleasesPromises = earlyReleasesList.items.map(async (item) => {
                const downloadUrl = await getDownloadURL(item);
                const response = await fetch(downloadUrl);
                const responseJSON = await response.json();
                responseJSON.link = `/article/early/${item.name.replace(".json", "")}`
                return responseJSON;
            });
            const earlyReleasesData = await Promise.all(earlyReleasesPromises);
            articles.push(...earlyReleasesData);

            return articles;
        } catch (error) {
            console.error('Error reading articles:', error);
            return [];
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const fetchCategoriesPromise = fetchCategories(user.uid);
                const readAllArticlesPromise = readAllArticles();

                Promise.all([fetchCategoriesPromise, readAllArticlesPromise])
                    .then(([categories, articles]) => {
                        // Filter articles based on categories
                        const filteredArticles = articles.filter(article => categories.includes(article.category));
                        setArticles(filteredArticles);
                        console.log(filteredArticles);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    }, []);

    return (
        <div>
            <h2>Favorite Categories</h2>
                {articles.map((article, index) => (
                    <div className="card bg-white">
                        <img className=" img-fluid" src={article.img01}/>
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <NavLink className="btn btn-danger"
                                     to={article.link}>Read More</NavLink>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RecommendationSystem;
