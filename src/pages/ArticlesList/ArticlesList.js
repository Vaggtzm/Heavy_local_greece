import React, {useEffect, useRef, useState} from 'react';
import { onValue, ref } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { auth, database, storage } from "../../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, useParams} from "react-router-dom";
import { Accordion, Nav, Spinner } from 'react-bootstrap';

const ArticlesList = () => {
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState("Collabs and Sponsorships");
    const [loggedIn, setLoggedIn] = useState(false);
    const [author, setAuthor] = useState({});

    const imgRef = useRef(null);

    const { authorCode } = useParams();

    //const  = "gbK4OvgKbyYDfYCfIjboOqjA9Yv1";

    const nice_titles = {
        "early_releases": "Early Bird Articles",
        "articles": "All Articles",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let articlesRef;
                if (!authorCode) {
                    articlesRef = ref(database, 'articlesList');
                } else {
                    articlesRef = ref(database, `authors/${authorCode}`);
                }

                onValue(articlesRef, async (snapshot) => {
                    let data = snapshot.val();
                    if (!authorCode) {
                        const articlesWithImages = await fetchArticlesWithImages(data);
                        setArticles(articlesWithImages);
                    } else {
                        const articlesWithImages = await fetchArticlesWithImages(data.writtenArticles);
                        setArticles(articlesWithImages);
                        let userImage = storageRef(storage, `/profile_images/${authorCode}_600x600`);
                        data.photoURL = await getDownloadURL(userImage);
                        setAuthor(data);
                    }
                    setLoading(false);
                });

            } catch (error) {
                console.error("Error fetching articles:", error);
                setLoading(false);
            }
        };

        auth.onAuthStateChanged((user) => {
            fetchData();
            if (!user) {
                setLoggedIn(false);
                setActiveKey("Collabs and Sponsorships");
            } else {
                setLoggedIn(true);
                setActiveKey("early_releases");
            }
        });

    }, [authorCode]);

    const getBorderSize = () => {
        if(!imgRef.current){return 0.3;}
        const width = imgRef.current.clientWidth;
        const height = imgRef.current.clientHeight;
        console.log("height", height)
        return (imgRef.current.clientWidth>100)?Math.min(width, height)*0.06:Math.min(width, height)*0.1;
    }

    const fetchArticlesWithImages = async (data) => {
        const updatedData = {};

        for (const category in data) {
            const categoryData = data[category];
            updatedData[category] = {};

            for (const subCategory in categoryData) {
                updatedData[category][subCategory] = await Promise.all(
                    ((!authorCode)?categoryData[subCategory]:Object.keys(categoryData[subCategory])).map(async (articleKey) => {
                        try {
                            const articleUrl = await getDownloadURL(
                                storageRef(storage, `${category}/${articleKey}.json`)
                            );

                            const response = await fetch(articleUrl);
                            if (!response.ok) {
                                throw new Error(`Failed to fetch article ${articleKey}`);
                            }

                            const article = await response.json();
                            article.link = articleKey;
                            return article;
                        } catch (error) {
                            console.error("Error fetching article:", error);
                            return null;
                        }
                    })
                );
            }
        }

        return updatedData;
    };

    const renderArticles = (category, articles) => {
        const renderedTranslationGroups = new Set();
        return Object.values(articles).flat().map((article, index) => {
            if (!article) return null;

            const translationGroup = (article.translations) ? Object.values(article.translations).sort().join('-') : "";

            if (renderedTranslationGroups.has(translationGroup)) {
                return null;
            }

            renderedTranslationGroups.add(translationGroup);

            return (
                <div className="col-auto" key={index}>
                    <div className="card mb-4">
                        <div className="card-header">
                            {article.img01 && (
                                <img
                                    src={article.img01}
                                    alt={article.title}
                                    className="card-img-top mb-2"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                        <div className="card-body">
                            {article.title}
                            <div className="card-text">
                                <NavLink to={`/article${(category === 'early_releases') ? '/early' : ''}/${article.link}`} className="btn btn-danger">Read More</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="container mt-5 mb-5 overflow-hidden" style={{ marginBottom: "11.4vh" }}>
            {loading ? (
                <Spinner style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto'
                }} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <div>
                    {(authorCode)&& (<div className="d-flex justify-content-center mb-5">
                        <div className="row w-100">
                            <div className="col-4 d-flex justify-content-center">
                                <div className="w-75 mx-auto">
                                    <img
                                        ref={imgRef}
                                        className="img-fluid rounded-5"
                                        style={{
                                            border: `${getBorderSize()}px solid grey`,
                                        }}
                                        src={author.photoURL}
                                        alt={author.displayName}
                                    />
                                </div>
                            </div>
                            <div className="col-8">
                                {author.displayName &&
                                    <h4 className="card-title fw-bolder text-center text-light">{author.displayName}</h4>}
                                <hr className="bg-white text-white"/>
                                <div className="card-text text-light">
                                    {author.bio}
                                </div>
                            </div>
                        </div>
                    </div>)}

                    {(articles['early_releases']||articles['articles']) &&<div className="row bg-dark p-3">
                        <div className="col-md-3">
                            <Nav variant="pills" className="flex-column sticky-top" activeKey={activeKey}
                                 onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                                {loggedIn &&articles['early_releases'] && (
                                    <Nav.Item>
                                        <Nav.Link eventKey="early_releases">{nice_titles['early_releases']}</Nav.Link>
                                    </Nav.Item>
                                )}
                                {Object.keys(articles['articles'] || {}).map((subCategory, subIndex) => (
                                    <Nav.Item key={subIndex}>
                                        <Nav.Link eventKey={subCategory}>{subCategory.replace('_', ' ')}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                        <div className="col-md-9">
                            <Accordion className="bg-dark" activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                                {loggedIn && articles['early_releases'] && (
                                    <Accordion.Item className="bg-dark" eventKey="early_releases">
                                        <Accordion.Header
                                            className="bg-dark">{nice_titles['early_releases']}</Accordion.Header>
                                        <Accordion.Body className="row">
                                            {renderArticles('early_releases', articles['early_releases'] || {})}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )}
                                {Object.keys(articles['articles'] || {}).map((subCategory, subIndex) => (
                                    <Accordion.Item className="bg-dark" eventKey={subCategory} key={subIndex}>
                                        <Accordion.Header>{subCategory.replace('_', ' ')}</Accordion.Header>
                                        <Accordion.Body className="row">
                                            {renderArticles('articles', articles['articles'][subCategory] || {})}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default ArticlesList;
