import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavLink from "../../LanguageWrapper/NavLink";
import Sponshorbanner from "./NewsCompoments/SponshorBanner";
import "./TopNews.css";
import { database } from "../../../firebase";
import { get, ref } from "firebase/database";
import ReviewsBanner from "./NewsCompoments/ReviewsBanner";
import { Spinner } from 'react-bootstrap';

const TopNews = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);  // New loading state

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Fetch the latest articles directly from the 'articlesListLatest'
                const categoriesSnapshot = await get(ref(database, '/articlesListLatest/articles'));
                const categoriesData = categoriesSnapshot.val();

                // Prepare the categories list, including 'All'
                const categoriesList = ['All', ...Object.keys(categoriesData)];
                setCategories(categoriesList);

                // Aggregate articles across all categories
                const allArticles = [];

                for (const category of categoriesList) {
                    if (category === 'All') continue;

                    const articlesInCategory = categoriesData[category];

                    for (const articleKey in articlesInCategory) {
                        const article = articlesInCategory[articleKey];

                        // Add the article to the aggregated list
                        allArticles.push({
                            ...article,
                            category: category,
                            link: articleKey
                        });
                    }
                }

                // Update the state with the aggregated articles
                setArticles(allArticles);
                setLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching articles:", error);
                setLoading(false);  // Set loading to false even if there's an error
            }
        };

        fetchArticles();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    return (
        <div className="top-news-wrapper mt-5 container rounded-3">
            <ReviewsBanner/>
            <hr className="bg-white"/>

            <div className="top-news-header d-flex justify-content-between align-items-center mb-4">
                <h1 className="top-news-title">{t('Latest Articles')}</h1>
                <NavLink to="/articles-page" className="btn explore-btn">
                    Explore More
                </NavLink>
            </div>

            <div className="top-news-category-menu d-flex flex-wrap mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-button btn ${selectedCategory === category ? 'btn-primary text-white' : 'btn-outline-light'}`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {t(category)}
                    </button>
                ))}
            </div>

            <div className="top-news-articles">
                {loading ? (
                    <div className="d-flex justify-content-center my-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : filteredArticles.length > 0 ? (
                    <div className="row justify-content-center">
                        {filteredArticles.map((article, index) => (
                            <div
                                key={index}
                                className={`top-news-article-card p-2 pb-3 col-md-5 col-sm-6`}
                            >
                                <div className="top-news-card bg-dark text-white shadow-lg">
                                    <img
                                        src={article.image}
                                        className={"top-news-card-img img-fluid card-img"}
                                        alt={article.title}
                                    />
                                    <div className="top-news-card-body">
                                        <h5 className="top-news-card-title">{article.title}</h5>
                                    </div>
                                    <div className="top-news-card-footer d-flex justify-content-center pb-3">
                                        <NavLink className="btn read-more-btn" to={`/article/${article.link}`}>
                                            Read More
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-articles-text text-center">No articles available</p>
                )}
            </div>
            <Sponshorbanner />
        </div>
    );
};

export default TopNews;
