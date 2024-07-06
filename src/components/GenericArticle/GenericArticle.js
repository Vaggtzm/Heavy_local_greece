import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {auth, config, database, storage} from "../../firebase";
import {getDownloadURL, getMetadata, ref, updateMetadata} from "firebase/storage";
import {onValue, ref as databaseRef, remove, update} from "firebase/database";
import SocialBar from "../ShareBtns/SocialMediaBar";
import PageWithComments from "../Comments/comment";
import ReadMore from "../ReadMore/ReadMore";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {Helmet} from "react-helmet";
import AuthorOfArticle from "./AuthorOfArticle";
import NavLink from "../LanguageWrapper/NavLink";

const DefaultArticle = (props) => {
    const [isEarlyAccess] = useState(props.earlyAccess);
    const {name} = useParams();
    const [articles, setArticles] = useState({});
    const [enableSaving, setEnableSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [translations, setTranslations] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [loading, setLoading] = useState(true);

    const [shouldStoreMetadata, setShouldStoreMetadata] = useState(false);
    const [imageStorageRef, setImageStorageRef] = useState(null);

    const fetchSavedStatus = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(
                database,
                `users/${currentUser.uid}/savedArticles`
            );
            console.log(`users/${currentUser.uid}/savedArticles`);
            onValue(savedArticlesRef, (snapshot) => {
                const savedArticles = snapshot.val() || {};
                console.log(savedArticles)
                setIsSaved(Object.keys(savedArticles).includes(name));
            });
        }
    };

    useEffect(() => {
        const fetchRemoteConfig = async () => {
            await fetchAndActivate(config);
            const serverLanguages = getValue(config, "languages").asString();
            setAvailableLanguages(JSON.parse(serverLanguages));
        };

        Promise.all([fetchRemoteConfig(), fetchData()]).then(r => {});

        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setEnableSaving(true);
                fetchSavedStatus().then(r => {});
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, [name]);

    const checkTranslations = async (data) => {
        const translations = {};

        for (const translation of Object.keys(data.translations)) {
            const translationExists = await checkIfTranslationExists(
                data.translations[translation]
            );
            if (translationExists) {
                translations[translation] = data.translations[translation];
            }
        }
        return translations;
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const articleRef = isEarlyAccess
                ? ref(storage, `early_releases/${name}.json`)
                : ref(storage, `articles/${name}.json`);

            const articleSnapshot = await getDownloadURL(articleRef);

            const fetchArticle = fetch(articleSnapshot).then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch article data");
                }
                return response.json();
            });

            const articleData = await fetchArticle;

            // Start fetching image URL and translations concurrently
            const fetchImageUrl = getFirebaseStorageUrl(articleData.img01);
            const fetchTranslations = articleData.translations && Object.keys(articleData.translations).length > 0
                ? checkTranslations(articleData)
                : Promise.resolve({});

            const [imageUrl, translationsResult] = await Promise.all([fetchImageUrl, fetchTranslations]);

            setTranslations(translationsResult);

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


    function changeAnalysis(fileName, analysis_true, analysis_false, change_analysis) {
        // Find the position of the last dot, which indicates the start of the extension
        const dotIndex = fileName.lastIndexOf('.');

        // If there's no dot, return the filename with the suffix appended
        if (dotIndex === -1) {
            return `${fileName}_${change_analysis ? analysis_true : analysis_false}`;
        }

        // Extract the name and extension parts
        const name = fileName.substring(0, dotIndex);
        const extension = fileName.substring(dotIndex);

        // Construct the new filename
        return `${name}_${change_analysis ? analysis_true : analysis_false}${extension}`;
    }

    const isAlmostRectangle = async (storageRef) => {
        try {
            const metadata = await getMetadata(storageRef);
            const width = parseInt(metadata.customMetadata.width, 10);
            const height = parseInt(metadata.customMetadata.height, 10);

            // Define the tolerance for "almost rectangular" (e.g., within 10% difference)
            const tolerance = 0.5;
            const aspectRatio = width / height;
            const result = Math.abs(aspectRatio - 1) <= tolerance

            return {result: result, areMetadataFound: true};
        } catch (e) {
            return {result: false, areMetadataFound: false};
        }
    };

    const getFirebaseStorageUrl = async (imageUrl) => {
        const fileName = imageUrl.split("/").pop();
        const shouldResize = await isAlmostRectangle(ref(storage, `images/${fileName}`));

        const storageRef = ref(storage, `images/${changeAnalysis(fileName, "800x800", "800x600", shouldResize.result)}`);
        setShouldStoreMetadata(!shouldResize.areMetadataFound)
        setImageStorageRef(storageRef);
        try {
            return await getDownloadURL(storageRef);
        } catch (e) {
            console.log(e);
        }
    };

    const toggleSaveArticle = useCallback(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(
                database,
                `users/${currentUser.uid}/savedArticles/${name}`
            );
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
        return <p>Loading...</p>;
    }

    return (
        <>
            <Helmet>
                <title>{articles.title}</title>
            </Helmet>
            <div className="container">
                <div className="row text-white">
                    <div className="col-md-12 d-flex justify-content-evenly">
                        <h3>{articles.title}</h3>
                        <hr className="bg-dark"/>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6 mb-3 mb-md-0 d-flex align-items-center">
                            <AuthorOfArticle authorCode={articles.sub}/>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center">
                            <AuthorOfArticle authorCode={articles.translatedBy}/>
                        </div>
                    </div>

                    <hr className={"mt-2 bg-dark"}/>
                    <div className="col-md-6 credits-box">
                        {articles.img01 && <img
                            className="img-fluid w-100"
                            src={articles.img01}
                            alt={articles.title}
                            onLoad={async (image) => {
                                if (shouldStoreMetadata) {
                                    const metadata = {
                                        customMetadata: {
                                            width: image.target.width,
                                            height: image.target.height
                                        }
                                    };
                                    await updateMetadata(imageStorageRef, metadata);
                                }
                            }}
                        />}
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
                                        to={`/article/${translations[translation].replace(".json", "")}`}
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
                    <div className="col-md-6">
                        <div style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{__html: articles.content}}></div>
                        <SocialBar/>
                        <PageWithComments/>
                    </div>
                    <ReadMore/>
                </div>
            </div>
        </>
    );
};

export default DefaultArticle;
