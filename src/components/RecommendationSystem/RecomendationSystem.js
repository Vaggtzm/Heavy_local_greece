import React, {useEffect, useState} from 'react';
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {onValue, ref as dbRef} from "firebase/database";
import {auth, database, storage} from "../../firebase";
import NavLink from "../LanguageWrapper/NavLink";
import {useTranslation} from 'react-i18next';

const RecommendationSystem = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState([]);

    const fetchCategories = (userId) => {
        return new Promise((resolve) => {
            const userSavedArticlesRef = dbRef(database, `users/${userId}/savedArticles`);
            onValue(userSavedArticlesRef, async (snapshot) => {
                const savedArticlesData = snapshot.val();
                if (savedArticlesData) {
                    const savedArticlesList = Object.keys(savedArticlesData).map((key) => {
                        return ({
                            name: key,
                            isEarlyAccess: savedArticlesData[key].isEarlyAccess
                        })
                    });

                    const categories = [];
                    for (const article of savedArticlesList) {
                        let articleData;
                        if (article.isEarlyAccess) {
                            articleData = await fetchArticleData('early_releases', article.name);
                        } else {
                            articleData = await fetchArticleData('articles', article.name);
                        }
                        if (articleData && articleData.category) {
                            categories.push(articleData.category);
                        }
                    }
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
            return await response.json();
        } catch (error) {
            console.error(`${t('errorFetchingArticle')} ${error}`);
            return null;
        }
    };

    const readAllArticles = async (categories) => {
        try {
            const allArticles = [];

            for (const category of categories) {
                const categoryRef = dbRef(database, `articles/${category}`);
                onValue(categoryRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const categoryData = snapshot.val();

                        Object.entries(categoryData).forEach(([articleName, articleData]) => {
                            const isPublished = articleData.isPublished;
                            if (!isPublished) return;

                            const isEarlyAccess = articleData.isEarlyAccess;
                            const folder = isEarlyAccess ? 'early_releases' : 'articles';
                            const articleRef = storageRef(storage, `${folder}/${articleName}.json`);

                            getDownloadURL(articleRef)
                                .then((downloadUrl) => fetch(downloadUrl))
                                .then((response) => response.json())
                                .then((responseJSON) => {
                                    responseJSON.link = `/article/${articleName}`;

                                    if (!allArticles.find((article) => article.name === articleName)) {
                                        allArticles.push(responseJSON);
                                        setArticles(allArticles);
                                    }
                                })
                                .catch((error) => console.error('Error fetching article:', error));
                        });
                    } else {
                        console.log(t('noDataAvailable'));
                    }
                });
            }

            return allArticles;
        } catch (error) {
            console.error('Error reading articles:', error);
            return [];
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                fetchCategories(user.uid).then((categories) => {
                    readAllArticles(categories).then();
                })
            }
        });
    }, []);

    return (
        <div>
            <h2>{t('favoriteCategories')}</h2>
            {articles.map((article, index) => (
                <div className="card bg-white" key={index}>
                    {article.img01 && <img className="img-fluid" src={article.img01} alt={article.title} />}
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <NavLink className="btn btn-danger" to={article.link}>{t('readMore')}</NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecommendationSystem;
