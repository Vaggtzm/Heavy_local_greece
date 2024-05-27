import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import { auth, storage, database, config } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, remove, onValue } from "firebase/database";
import SocialBar from "../ShareBtns/SocialMediaBar";
import PageWithComments from "../Comments/comment";
import ReadMore from "../ReadMore/ReadMore";
import AppNav from "./../AppNav/AppNav";
import { fetchAndActivate, getValue } from "firebase/remote-config";

const DefaultArticle = (props) => {
  const [isEarlyAccess] = useState(props.earlyAccess);
  const { name } = useParams();
  const [articles, setArticles] = useState({});
  const [enableSaving, setEnableSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [translations, setTranslations] = useState({});
  const [availableLanguages, setAvailableLanguages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemoteConfig = async () => {
      await fetchAndActivate(config);
      const serverLanguages = getValue(config, "languages").asString();
      setAvailableLanguages(JSON.parse(serverLanguages));
    };

    fetchRemoteConfig();
    fetchData();

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setEnableSaving(true);
      }
    });

    const fetchSavedStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const savedArticlesRef = databaseRef(
            database,
            `users/${currentUser.uid}/savedArticles`
        );
        onValue(savedArticlesRef, (snapshot) => {
          const savedArticles = snapshot.val() || {};
          setIsSaved(!!savedArticles[name]);
        });
      }
    };

    fetchSavedStatus();

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
    try {
      const articleRef = isEarlyAccess
          ? ref(storage, `early_releases/${name}.json`)
          : ref(storage, `articles/${name}.json`);
      const articleSnapshot = await getDownloadURL(articleRef);

      const response = await fetch(articleSnapshot);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      data.img01 = await getFirebaseStorageUrl(data.img01);

      if (data.translations && Object.keys(data.translations).length > 0) {
        const translationsResult = await checkTranslations(data);
        setTranslations(translationsResult);
      } else {
        setTranslations({});
      }
      setArticles(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseStorageUrl = async (imageUrl) => {
    const fileName = imageUrl.split("/").pop();
    const storageRef = ref(storage, `images/${fileName}`);
    return await getDownloadURL(storageRef);
  };

  const toggleSaveArticle = useCallback(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const savedArticlesRef = databaseRef(
          database,
          `users/${currentUser.uid}/savedArticles/${name}`
      );
      if (isSaved) {
        remove(savedArticlesRef);
        setIsSaved(false);
      } else {
        push(savedArticlesRef, true);
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
        <AppNav />
        <div className="container">
          <div className="row text-white">
            <div className="col-md-12 d-flex justify-content-evenly">
              <h3>{articles.title}</h3>
              <hr className="bg-dark" />
            </div>
            <p className="lead">{articles.sub}</p>
            <hr className="bg-dark" />
            <div className="col-md-6 credits-box">
              <img
                  className="img-fluid w-100"
                  src={articles.img01}
                  alt={articles.title}
              />
              <p className="lead">
                <span dangerouslySetInnerHTML={{ __html: articles.details }}></span>
              </p>
              <p className="lead">
                <span dangerouslySetInnerHTML={{ __html: articles.Socials }}></span>
              </p>

              {translations && Object.keys(translations).length > 0 && (
                  <>
                    <hr className="bg-dark" />
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
            <div className="col-md-6">
              <div dangerouslySetInnerHTML={{ __html: articles.content }}></div>
              <SocialBar />
              <PageWithComments />
            </div>
            <ReadMore />
          </div>
        </div>
      </>
  );
};

export default DefaultArticle;
