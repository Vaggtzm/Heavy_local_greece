import React, {useEffect, useRef, useState} from 'react';
import {onValue, ref} from 'firebase/database';
import {getDownloadURL, ref as storageRef} from 'firebase/storage';
import {auth, database, storage} from "../../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, useParams} from "react-router-dom";
import {Accordion, Nav, Spinner} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {useTranslation} from 'react-i18next';
import Slider from "react-slick";

const ArticlesList = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState("Collabs and Sponsorships");
    const [loggedIn, setLoggedIn] = useState(false);
    const [author, setAuthor] = useState({});
    const [borderSize, setBorderSize] = useState(6);
    const imgRef = useRef(null);
    const { authorCode } = useParams();
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let articlesRef;
                if (!authorCode) {
                    articlesRef = ref(database, 'articlesList');
                } else {
                    articlesRef = ref(database, `authors/${authorCode}`);
                }

                onValue(articlesRef, (snapshot) => {
                    let data = snapshot.val();
                    if (!authorCode) {
                        fetchArticlesWithImages(data).then((articlesWithImages)=>{
                            setArticles(articlesWithImages);
                            setLoading(false);
                        })
                    } else {
                        fetchImagesFromGallery();

                        fetchArticlesWithImages(data.writtenArticles).then((articlesWithImages)=>{
                            setArticles(articlesWithImages);
                            setLoading(false);
                        })
                        let userImage = storageRef(storage, `/profile_images/${authorCode}_600x600`);
                        getDownloadURL(userImage).then((userImage)=>{
                            data.photoURL = userImage;
                            setAuthor(data);
                        })
                    }

                });

            } catch (error) {
                console.error("Error fetching articles:", error);
                setLoading(false);
            }
        };

        auth.onAuthStateChanged((user) => {
            fetchData().then();
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
        if (!imgRef.current || imgRef.current.clientWidth === 0 || imgRef.current.clientHeight === 0) {
            return 6;
        }
        const width = imgRef.current.clientWidth;
        const height = imgRef.current.clientHeight;
        let computerPercentage = 0.06;
        let mobilePercentage = 0.03;
        if (author.dimentions) {
            computerPercentage = computerPercentage * author.dimentions.computer;
            mobilePercentage = mobilePercentage * author.dimentions.mobile;
        }
        const computerValue = Math.min(width, height) * computerPercentage;
        const mobileValue = Math.min(width, height) * mobilePercentage;
        return (imgRef.current.clientWidth > 100) ? computerValue : mobileValue;
    };

    const updateBorderSize = () => {
        setBorderSize(getBorderSize());
    };

    window.addEventListener('resize', updateBorderSize);

    const fetchArticlesWithImages = async (data) => {
        console.log("Starting fetch");
        const updatedData = {};

        const categories = Object.keys(data);
        const fetchCategoryData = categories.map(async (category) => {
            console.log("category", category);
            const categoryData = data[category];
            const subCategories = Object.keys(categoryData);

            const fetchSubCategoryData = subCategories.map(async (subCategory) => {
                const articles = !authorCode
                    ? categoryData[subCategory]
                    : Object.keys(categoryData[subCategory]);

                const fetchArticles = articles.map(async (articleKey) => {
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
                });

                const articlesWithImages = await Promise.all(fetchArticles);
                return { subCategory, articlesWithImages };
            });

            const subCategoryData = await Promise.all(fetchSubCategoryData);
            updatedData[category] = subCategoryData.reduce((acc, { subCategory, articlesWithImages }) => {
                acc[subCategory] = articlesWithImages;
                return acc;
            }, {});
        });

        await Promise.all(fetchCategoryData);

        return updatedData;
    };

    const fetchImagesFromGallery = ()=>{
        const galleryRef = ref(database, '/gallery/uploaded');

        onValue(galleryRef, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                console.log(data);
                const dataPromises  = data.filter((d) => {
                    const userid = d.title;
                    return userid === authorCode;
                });
                Promise.all(dataPromises).then((resolvedData) => {
                    console.log(resolvedData);
                    setGalleryItems(resolvedData);
                }).catch((error) => {
                    console.error("Error resolving data promises:", error);
                });
            }
        });
    }

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
                                <NavLink to={`/article${(category === 'early_releases') ? '/early' : ''}/${article.link}`} className="btn btn-danger">{t('readMore')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="container mt-5 mb-5 overflow-hidden" style={{ marginBottom: "11.4vh" }}>
            {author.displayName && (<Helmet>
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
                    <span className="visually-hidden">{t('loadingMessage')}</span>
                </Spinner>
            ) : (
                <div>
                    {(authorCode) && (<div className="mb-5">
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

                    {(galleryItems.length>0)&& (<div className={"mb-5"}><h2 className={"text-white mb-2 text-center"}>{t("galleryTitle")}</h2><div className="container">
                            <Slider {...settings}>
                                {galleryItems.map((image, index) => (
                                    (image)&&<NavLink to={`${image.image}?fullScale=true`} key={index} className="nav-link bg-dark carousel-item">
                                        <img
                                            className="img-thumbnail"
                                            src={"https://pulse-of-the-underground.com" + image.image}
                                            alt={`slide${index}`}
                                            style={{maxHeight: "300px", objectFit: "cover"}} // Adjust height as needed
                                        />
                                    </NavLink>
                                ))}
                            </Slider>
                        </div></div>
                    )}

                    {(articles['early_releases'] || articles['articles']) && <div className="row bg-dark p-3">
                        <div className="col-md-3 d-none d-md-block">
                            <Nav variant="pills" className="flex-column sticky-top" activeKey={activeKey}
                                 onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                                {loggedIn && articles['early_releases'] && (
                                    <Nav.Item>
                                        <Nav.Link eventKey="early_releases">{t('earlyReleases')}</Nav.Link>
                                    </Nav.Item>
                                )}
                                {Object.keys(articles['articles'] || {}).map((subCategory, subIndex) => (
                                    <Nav.Item key={subIndex}>
                                        <Nav.Link eventKey={subCategory}>{t(`${subCategory}`)}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                        <div className="col-md-9">
                            <Accordion className="bg-dark" activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                                {loggedIn && articles['early_releases'] && (
                                    <Accordion.Item className="bg-dark" eventKey="early_releases">
                                        <Accordion.Header
                                            className="bg-dark">{t('earlyReleases')}</Accordion.Header>
                                        <Accordion.Body className="row">
                                            {renderArticles('early_releases', articles['early_releases'] || {})}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )}
                                {Object.keys(articles['articles'] || {}).map((subCategory, subIndex) => (
                                    <Accordion.Item className="bg-dark" eventKey={subCategory} key={subIndex}>
                                        <Accordion.Header>{t(`${subCategory}`)}</Accordion.Header>
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
