import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {auth, config, database, storage} from "../../firebase";
import {getDownloadURL, ref, updateMetadata} from "firebase/storage";
import {onValue, ref as databaseRef, remove, update} from "firebase/database";
import SocialBar from "../ShareBtns/SocialMediaBar";
import ReadMore from "../ReadMore/ReadMore";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {Helmet} from "react-helmet";
import AuthorOfArticle from "./AuthorOfArticle";
import NavLink from "../LanguageWrapper/NavLink";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import LanguageModal from "./LanguageModal";

import {getFirebaseStorageUrl} from "../UploadSystem/articleData/articleData";
import CommentSystem from "./Comments/CommentSystem";

const DefaultArticle = (props) => {
    const isEarlyAccess = props.earlyAccess;
    const {name} = useParams();
    const [articles, setArticles] = useState({});
    const [enableSaving, setEnableSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [translations, setTranslations] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [loading, setLoading] = useState(true);

    const [shouldStoreMetadata, setShouldStoreMetadata] = useState(false);
    const [imageStorageRef, setImageStorageRef] = useState(null);

    const {t, i18n} = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const fetchSavedStatus = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles`);
            console.log(`users/${currentUser.uid}/savedArticles`);
            onValue(savedArticlesRef, (snapshot) => {
                const savedArticles = snapshot.val() || {};
                console.log(savedArticles)
                setIsSaved(Object.keys(savedArticles).includes(name));
            });
        }
    };

    useEffect(() => {
        const currentLang = i18n.language;

        // Ensure both articleData.lang and currentLang are defined before checking the condition
        if (articles.lang && currentLang && articles.lang !== currentLang && Object.keys(articles.translations).includes(currentLang)) {
            setShowModal(true);
        }
    }, [articles, i18n.language]);

    useEffect(() => {
        const fetchRemoteConfig = async () => {
            await fetchAndActivate(config);
            const serverLanguages = getValue(config, "languages").asString();
            setAvailableLanguages(JSON.parse(serverLanguages));
        };

        Promise.all([fetchRemoteConfig(), fetchData()]).then();

        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setEnableSaving(true);
                fetchSavedStatus().then();
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, [name]);

    const checkTranslations = async (data) => {
        const translations = {};

        for (const translation of Object.keys(data.translations)) {
            const translationExists = await checkIfTranslationExists(data.translations[translation]);
            if (translationExists) {
                translations[translation] = data.translations[translation];
            }
        }
        return translations;
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const articleRef = ref(storage, `${isEarlyAccess ? "early_releases" : "articles"}/${name}.json`);

            const articleSnapshot = await getDownloadURL(articleRef);

            const fetchArticle = fetch(articleSnapshot).then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch article data");
                }
                return response.json();
            });

            const articleData = await fetchArticle;

            // Start fetching image URL and translations concurrently
            const fetchImageUrl = getFirebaseStorageUrl(articleData.img01, setShouldStoreMetadata, setImageStorageRef);
            const fetchTranslations = articleData.translations && Object.keys(articleData.translations).length > 0 ? checkTranslations(articleData) : Promise.resolve({});

            const [imageUrl, translationsResult] = await Promise.all([fetchImageUrl, fetchTranslations]);

            setTranslations(translationsResult);
            const currentLang = i18n.language;

            console.log("article lang: ", articleData.lang, "current lang: ", currentLang);

            // Add the fetched image URL to the article data
            articleData.img01 = imageUrl;

            console.log(articleData);
            setArticles(articleData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    };


    const toggleSaveArticle = useCallback(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles/${name}`);
            if (isSaved) {
                remove(savedArticlesRef).then();
                setIsSaved(false);
            } else {
                update(savedArticlesRef, {isEarlyAccess}).then();
                setIsSaved(true);
            }
        }
    }, [isSaved, name]);

    const checkIfTranslationExists = async (translationFile) => {
        const folder = isEarlyAccess ? "early_releases" : "articles";
        const filePath = `${folder}/${translationFile}`;
        const fileRef = ref(storage, filePath);

        try {
            await getDownloadURL(fileRef);
            return true;
        } catch (error) {
            return false;
        }
    };

    if (loading) {
        return (<Spinner style={{
            width: '100px', height: '100px', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'
        }} animation="border" role="status">
            <span className="visually-hidden">{t('loadingMessage')}</span>
        </Spinner>);
    }

    return (<>
        <LanguageModal languages={availableLanguages} articleLanguage={articles.lang} siteLanguage={i18n.language}
                       show={showModal} handleClose={handleCloseModal}
                       targetLink={(translations[i18n.language]) ? `/article${isEarlyAccess ? "/early" : ""}/${translations[i18n.language].replace(".json", "")}` : ""}/>
        <Helmet>
            <title>{articles.title}</title>
        </Helmet>
        <div className="container text-white">
            <div className={"row"}>
                <div className={"col-12 col-md-2"}>
                    <span className={"badge bg-light text-dark"}>
                            {articles.date}
                    </span>
                </div>
                <div className={"col-12 col-md-10"}>
                    <h3>{articles.title}</h3>
                </div>
                <div className="col-10 col-md-5 mb-3 mb-md-0 d-flex align-items-center">
                    <AuthorOfArticle authorCode={articles.sub}/>
                </div>

                <div className="col-10 col-md-5 d-flex align-items-center">
                    <AuthorOfArticle authorCode={articles.translatedBy}/>
                </div>
            </div>


            <hr className={"mt-2 bg-dark"}/>
            <div className="row d-flex">
                <div className="col-md-6 col-12 sticky-md-top">
                    <div className="sticky-md-top">
                        {articles.img01 && (
                            <img
                                className="img-fluid w-100"
                                src={articles.img01}
                                alt={articles.title}
                                onLoad={async (image) => {
                                    if (shouldStoreMetadata) {
                                        const metadata = {
                                            customMetadata: {
                                                width: image.target.width,
                                                height: image.target.height,
                                            },
                                        };
                                        await updateMetadata(imageStorageRef, metadata);
                                    }
                                }}
                            />
                        )}
                        <p className="lead">
                            <span dangerouslySetInnerHTML={{__html: articles.details}}></span>
                        </p>
                        <div className="lead">
                            {articles.socials ? (
                                <div className="lead">
                                    {articles.socials.facebook && (
                                        <a href={articles.socials.facebook}>
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                    )}
                                    {articles.socials.instagram && (
                                        <a href={articles.socials.instagram}>
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                    )}
                                    {articles.socials.spotify && (
                                        <a href={articles.socials.spotify}>
                                            <i className="bi bi-spotify"></i>
                                        </a>
                                    )}
                                    {articles.socials.youtube && (
                                        <a href={articles.socials.youtube}>
                                            <i className="bi bi-youtube"></i>
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <span dangerouslySetInnerHTML={{__html: articles.Socials}}></span>
                            )}
                        </div>

                        {translations && Object.keys(translations).length > 0 && (
                            <>
                                <hr className="bg-dark"/>
                                <h5>Translations</h5>
                                {Object.keys(translations).map((translation) => (
                                    <NavLink
                                        className="btn btn-dark"
                                        to={`/article${isEarlyAccess ? "/early" : ""}/${translations[translation].replace(".json", "")}`}
                                        key={translation}
                                    >
                                        {availableLanguages[translation]}
                                    </NavLink>
                                ))}
                            </>
                        )}

                        <hr className="bg-dark"/>
                        {enableSaving && (
                            <span
                                className="btn btn-danger w-25 rounded-4"
                                onClick={toggleSaveArticle}
                                style={{cursor: "pointer"}}
                            >
                    {isSaved ? (
                        <i className="fas fa-heart" style={{color: "red"}}></i>
                    ) : (
                        <i className="far fa-heart"></i>
                    )}
                </span>
                        )}
                        <a
                            href="https://buymeacoffee.com/tzimasvagg7"
                            className="btn btn-danger 25 m-2 rounded-4"
                        >
                            Say Thanks
                        </a>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div
                        style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}
                        dangerouslySetInnerHTML={{__html: articles.content}}
                    ></div>
                    <SocialBar/>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <CommentSystem articleName={name}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReadMore category={articles.category} isEarlyAccess={isEarlyAccess}/>
        </div>
    </>);
};

export default DefaultArticle;
