import React, {useEffect, useRef, useState} from 'react';
import { onValue, ref } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { auth, database, storage } from "../../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, useParams} from "react-router-dom";
import { Accordion, Nav, Spinner } from 'react-bootstrap';
import {Helmet} from "react-helmet";

const ArticlesList = () => {
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState("Collabs and Sponsorships");
    const [loggedIn, setLoggedIn] = useState(false);
    const [author, setAuthor] = useState({});

    const [borderSize, setBorderSize] = useState(6);

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

        window.addEventListener('resize', updateBorderSize);

    }, [authorCode]);

    const getBorderSize = () => {
        if(!imgRef.current||imgRef.current.clientWidth===0||imgRef.current.clientHeight===0){return 6;}
        const width = imgRef.current.clientWidth;
        const height = imgRef.current.clientHeight;
        console.log("height", height)
        let computerPercentage = 0.06;
        let mobilePercentage = 0.03;
        if(author.dimentions){
            console.log("author.dimentions", author.dimentions)
            computerPercentage = computerPercentage*author.dimentions.computer;
            mobilePercentage = mobilePercentage*author.dimentions.mobile;
        }
        const computerValue = Math.min(width, height)*computerPercentage;
        const mobileValue = Math.min(width, height)*mobilePercentage;
        return (imgRef.current.clientWidth>100)?computerValue:mobileValue;
    }

    const updateBorderSize = () => {
        setBorderSize(getBorderSize());
    }

    useEffect(updateBorderSize, [imgRef.current, author]);

    const fetchArticlesWithImages = async (data) => {
        const updatedData = {};

        console.log(data);

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
            {author.displayName&&(<Helmet>
                <title>{author.displayName} - Pulse of the Underground</title>
            </Helmet>)}
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
                    {(authorCode)&& (<div className="mb-5">
                            <div className="row flex-column flex-md-row">
                                <div className="col-md-4 col-12 mb-5">
                                    <div className="w-75 mx-auto">
                                        <img
                                            ref={imgRef}
                                            className="img-fluid rounded-5"
                                            style={{
                                                border: `${borderSize}px solid ${author.color ? author.color : 'grey'}`,
                                            }}
                                            src={author.photoURL}
                                            alt={author.displayName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-12">
                                    {author.displayName && (
                                        <h1 className="card-title fw-bolder text-center text-light h1">{author.displayName}</h1>
                                    )}
                                    <hr className="bg-white text-white"/>
                                    <div className="card-text text-light">
                                        {author.bio}
                                    </div>
                                </div>
                            </div>
                        </div>
                            )}

                    {(articles['early_releases']||articles['articles']) &&<div className="row bg-dark p-3">
                        <div className="col-md-3 d-none d-md-block">
                            <Nav variant="pills" className="flex-column sticky-top" activeKey={activeKey}
                                 onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                                {loggedIn && articles['early_releases'] && (
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
