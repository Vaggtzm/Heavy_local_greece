import React, {useEffect, useRef, useState} from 'react';
import {get, limitToLast, orderByChild, query, ref} from 'firebase/database';
import {getDownloadURL, ref as storageRef} from 'firebase/storage';
import {auth, database, storage} from '../../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, useParams} from 'react-router-dom';
import {Form, Spinner} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import Slider from 'react-slick';
import {AccordionComponent} from "./AccordionComponent";

const ArticlesList = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState({});
    const [borderSize, setBorderSize] = useState(6);
    const imgRef = useRef(null);
    const { authorCode } = useParams();
    const [galleryItems, setGalleryItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [batchSize, setBatchSize] = useState(20);
    const [allArticles, setAllArticles] = useState([]); // To store all articles for pagination

    useEffect(() => {
        const fetchData = async (loggedIn) => {
            try {
                let articlesRef;
                if (!authorCode) {
                    articlesRef = ref(database, 'articlesList');
                    articlesRef = query(articlesRef, orderByChild('date'), limitToLast(batchSize));
                } else {
                    articlesRef = ref(database, `authors/${authorCode}`);
                }

                get(articlesRef).then(async (snapshot) => {
                    if(!snapshot.exists()&&!!authorCode){
                        articlesRef = ref(database, `users/${authorCode}`);
                        snapshot = await get(articlesRef);
                    }
                    let data = snapshot.val();

                    console.warn(data);
                    let articles;
                    if(!authorCode){
                        articles = data
                    }else{
                        articles = data.writtenArticles;
                        fetchImagesFromGallery();
                        let userImageRef = storageRef(storage, `/profile_images/${authorCode}_600x600`);
                        try {
                            data.photoURL = await getDownloadURL(userImageRef);
                        }catch (e) {
                            data.photoURL = "";
                        }
                        setAuthor(data);
                    }

                    if(loggedIn&&articles["early_releases"]) {
                        const allEarly = articles["early_releases"];
                        let mergedEarlyReleases = {};
                        Object.values(allEarly).forEach((category) => {
                            mergedEarlyReleases = {...mergedEarlyReleases, ...category};
                        });
                        articles["articles"]["earlyReleases"] = mergedEarlyReleases;
                    }
                    console.log("articles",articles);
                    console.log("articles",articles);
                    setAllArticles(articles);
                    setArticles(articles);
                    setLoading(false);
                });
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        auth.onAuthStateChanged((user) => {
            fetchData(!!user).then();
        });
    }, [authorCode, batchSize]);

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
        return imgRef.current.clientWidth > 100 ? computerValue : mobileValue;
    };

    const updateBorderSize = () => {
        setBorderSize(getBorderSize());
    };

    useEffect(() => {
        window.addEventListener('resize', updateBorderSize);
        return () => window.removeEventListener('resize', updateBorderSize);
    }, []);

    const fetchImagesFromGallery = () => {
        const galleryRef = ref(database, '/gallery/uploaded');

        get(galleryRef).then((snapshot) => {
            let data = snapshot.val();
            if (data) {
                console.log(data);
                const dataPromises = Object.values(data).filter((d) => {
                    const userid = d.title;
                    return userid === authorCode;
                });
                Promise.all(dataPromises)
                    .then((resolvedData) => {
                        console.log(resolvedData);
                        setGalleryItems(resolvedData);
                    })
                    .catch((error) => {
                        console.error('Error resolving data promises:', error);
                    });
            }
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
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    };

    const handleSearch = (searchQuery) => {
        // Perform search logic here based on searchQuery
        // Filter articles based on search query in title or content

        const filteredArticles = { articles: {} };

        // Ensure allArticles is defined
        if (!allArticles.articles) return;

        // Iterate over each sub-category in articles
        // Iterate over each sub-category in articles
        Object.keys(allArticles.articles).forEach((subCategory) => {
            const subCategoryArticles = allArticles.articles[subCategory];

            const filteredSubCategoryArticles = Object.keys(subCategoryArticles)
                .filter(articleLink => {
                    const article = subCategoryArticles[articleLink];
                    return (article && article.title && article.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (article && article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()));
                })
                .reduce((result, articleLink) => {
                    result[articleLink] = subCategoryArticles[articleLink];
                    return result;
                }, {});

            // If there are matching articles, add them to the filtered result
            if (Object.keys(filteredSubCategoryArticles).length > 0) {
                filteredArticles.articles[subCategory] = filteredSubCategoryArticles;
            }
        });
        console.log(filteredArticles);
        console.log(allArticles);
        setArticles(filteredArticles);
    };

    return (
        <div className="container mt-5 mb-5 overflow-hidden" style={{ marginBottom: '11.4vh' }}>
            {author.displayName && (
                <Helmet>
                    <title>{author.displayName} - Pulse of the Underground</title>
                </Helmet>
            )}
            {loading ? (
                <Spinner
                    style={{
                        width: '100px',
                        height: '100px',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin: 'auto',
                    }}
                    animation="border"
                    role="status"
                >
                    <span className="visually-hidden">{t('loadingMessage')}</span>
                </Spinner>
            ) : (
                <div>
                    {authorCode && (
                        <div className="mb-5">
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
                                        <h1 className="card-title fw-bolder text-center text-light h1">
                                            {author.displayName}
                                        </h1>
                                    )}
                                    <hr className="bg-white text-white"/>
                                    <div className="card-text text-light">{author.bio}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {galleryItems.length > 0 && (
                        <div className={'mb-5'}>
                            <h2 className={'text-white mb-2 text-center'}>{t('galleryTitle')}</h2>
                            <div className="container">
                                <Slider {...settings}>
                                    {galleryItems.map((image, index) =>
                                        image ? (
                                            <NavLink
                                                to={`${image.image}?fullScale=true`}
                                                key={index}
                                                className="nav-link bg-dark carousel-item"
                                            >
                                                <img
                                                    className="img-thumbnail"
                                                    src={'https://pulse-of-the-underground.com' + image.image}
                                                    alt={`slide${index}`}
                                                    style={{
                                                        maxHeight: '300px',
                                                        objectFit: 'cover',
                                                    }} // Adjust height as needed
                                                />
                                            </NavLink>
                                        ) : null
                                    )}
                                </Slider>
                            </div>
                        </div>
                    )}

                    <div className="d-flex justify-content-center mb-5 h-100 p-4">
                        {(!authorCode)?<Form.Control
                            type="text"
                            className={"bg-dark text-white w-75 rounded-3 h-100 p-3"}
                            placeholder="Search articles"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                handleSearch(e.target.value);
                            }}
                        />:<Form.Control // TODO: Αυτό πείραξε
                            type="text"
                            className={"bg-dark text-white w-75 rounded-3 h-100 p-3"}
                            placeholder="Search articles"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                handleSearch(e.target.value);
                            }}
                        />}
                    </div>

                    {articles&&<AccordionComponent articles={articles["articles"]}/>}
                </div>
            )}
        </div>
    );
};

export default ArticlesList;
