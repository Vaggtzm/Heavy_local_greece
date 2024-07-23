import React, {lazy, Suspense, useCallback, useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {auth, config, database, storage} from "../../firebase";
import {getDownloadURL, ref, updateMetadata} from "firebase/storage";
import {onValue, ref as databaseRef, remove, update} from "firebase/database";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {Helmet} from "react-helmet";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import "./comments.css";

import {getFirebaseStorageUrl} from "../../systems/UploadSystem/articleData/articleData";

const SocialBar = lazy(() => import("../ShareBtns/SocialMediaBar"));
const ReadMore = lazy(() => import("../ReadMore/ReadMore"));
const AuthorOfArticle = lazy(() => import("./AuthorOfArticle"));
const NavLink = lazy(() => import("../LanguageWrapper/NavLink"));
const LanguageModal = lazy(() => import("./LanguageModal"));
const CommentSystem = lazy(() => import("./Comments/CommentSystem"));

const DefaultArticle = (props) => {
    const isEarlyAccess = props.earlyAccess;
    const { name } = useParams();
    const [articles, setArticles] = useState({});
    const [enableSaving, setEnableSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [translations, setTranslations] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [loading, setLoading] = useState(true);
    const [sponsoredImage, setSponsoredImage] = useState(null);

    const [shouldStoreMetadata, setShouldStoreMetadata] = useState(false);
    const [imageStorageRef, setImageStorageRef] = useState(null);

    const { t, i18n } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const { search } = useLocation();
    const commentId = useMemo(() => new URLSearchParams(search).get('commentId'), [search]);

    const fetchSavedStatus = useCallback(async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles`);
            onValue(savedArticlesRef, (snapshot) => {
                const savedArticles = snapshot.val() || {};
                setIsSaved(Object.keys(savedArticles).includes(name));
            });
        }
    }, [name]);

    useEffect(() => {
        const currentLang = i18n.language;
        if (articles.lang && currentLang && articles.lang !== currentLang && Object.keys(articles.translations).includes(currentLang)) {
            setShowModal(true);
        }
    }, [i18n.language, articles.lang, articles.translations]);

    useEffect(() => {
        const fetchRemoteConfig = async () => {
            await fetchAndActivate(config);
            const serverLanguages = getValue(config, "languages").asString();
            setAvailableLanguages(JSON.parse(serverLanguages));
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const articleRef = ref(storage, `${isEarlyAccess ? "early_releases" : "articles"}/${name}.json`);
                const articleSnapshot = await getDownloadURL(articleRef);
                const articleData = await fetch(articleSnapshot).then(response => response.json());

                const [imageUrl, translationsResult, sponsoredImage] = await Promise.all([
                    getFirebaseStorageUrl(articleData.img01, setShouldStoreMetadata, setImageStorageRef),
                    articleData.translations ? checkTranslations(articleData) : Promise.resolve({}),
                    articleData.sponsor ? getDownloadURL(ref(storage, `sponsors/${articleData.sponsor}`)) : Promise.resolve(null),
                ]);

                setTranslations(translationsResult);
                setSponsoredImage(sponsoredImage);
                articleData.img01 = imageUrl;
                setArticles(articleData);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRemoteConfig().then(fetchData);

        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setEnableSaving(true);
                fetchSavedStatus();
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, [name, isEarlyAccess, fetchSavedStatus]);

    const checkTranslations = useCallback(async (data) => {
        const translations = {};
        for (const translation of Object.keys(data.translations)) {
            const translationExists = await checkIfTranslationExists(data.translations[translation]);
            if (translationExists) {
                translations[translation] = data.translations[translation].replace(".json", "");
            }
        }
        return translations;
    }, [isEarlyAccess]);

    const toggleSaveArticle = useCallback(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles/${name}`);
            if (isSaved) {
                remove(savedArticlesRef);
                setIsSaved(false);
            } else {
                update(savedArticlesRef, { isEarlyAccess });
                setIsSaved(true);
            }
        }
    }, [isSaved, name, isEarlyAccess]);

    const checkIfTranslationExists = useCallback(async (translationFile) => {
        translationFile = translationFile.endsWith('.json') ? translationFile : `${translationFile}.json`;
        const folder = isEarlyAccess ? "early_releases" : "articles";
        const filePath = `${folder}/${translationFile}`;
        const fileRef = ref(storage, filePath);

        try {
            await getDownloadURL(fileRef);
            return true;
        } catch (error) {
            return false;
        }
    }, [isEarlyAccess]);

    if (loading) {
        return (
            <Spinner style={{
                width: '100px', height: '100px', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'
            }} animation="border" role="status">
                <span className="visually-hidden">{t('loadingMessage')}</span>
            </Spinner>
        );
    }

    return (
        <>
            <Suspense fallback={<Spinner animation="border" role="status"><span className="visually-hidden">{t('loadingMessage')}</span></Spinner>}>
                <LanguageModal
                    languages={availableLanguages}
                    articleLanguage={articles.lang}
                    siteLanguage={i18n.language}
                    show={showModal}
                    handleClose={handleCloseModal}
                    targetLink={(translations[i18n.language]) ? `/article${isEarlyAccess ? "/early" : ""}/${translations[i18n.language].replace(".json", "")}` : ""}
                />
                <Helmet>
                    <title>{articles.title}</title>
                </Helmet>
                <div className="container text-white">
                    <div className="row">
                        <div className={"col-12 col-md-2"}>
                            <span className={"badge bg-light text-dark"}>{articles.date}</span>
                        </div>
                        <div className={"col-10 col-md-9"}>
                            <h3>{articles.title}</h3>
                        </div>
                        <div className="col-10 col-md-5 mb-3 mb-md-0 d-flex align-items-center">
                            <AuthorOfArticle authorCode={articles.sub} />
                        </div>
                        {articles.translatedBy&&<div className="col-10 col-md-5 d-flex align-items-center">
                            <AuthorOfArticle authorCode={articles.translatedBy}/>
                        </div>}
                    </div>
                    <hr className={"mt-2 bg-dark"} />
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
                                    <span dangerouslySetInnerHTML={{ __html: articles.details }}></span>
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
                                        <span dangerouslySetInnerHTML={{ __html: articles.Socials }}></span>
                                    )}
                                </div>

                                {translations && Object.keys(translations).length > 0 && (
                                    <>
                                        <hr className="bg-dark" />
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

                                <hr className="bg-dark" />
                                {enableSaving && (
                                    <span
                                        className="btn btn-danger w-25 rounded-4"
                                        onClick={toggleSaveArticle}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {isSaved ? (
                                            <i className="fas fa-heart" style={{ color: "red" }}></i>
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
                                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                                dangerouslySetInnerHTML={{ __html: articles.content }}
                            ></div>
                            <SocialBar />
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <CommentSystem commentId={commentId} articleName={name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReadMore category={articles.category} isEarlyAccess={isEarlyAccess} />
                </div>
            </Suspense>
        </>
    );
};

export default DefaultArticle;
