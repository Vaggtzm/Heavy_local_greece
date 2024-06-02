import React, {useCallback, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {auth, config, database, storage} from "../../firebase";
import {getDownloadURL, getMetadata, ref, uploadBytes, updateMetadata} from "firebase/storage";
import {onValue, ref as databaseRef, ref as dbRef, remove, update} from "firebase/database";
import SocialBar from "../ShareBtns/SocialMediaBar";
import PageWithComments from "../Comments/comment";
import ReadMore from "../ReadMore/ReadMore";
import AppNav from "./../AppNav/AppNav";
import {fetchAndActivate, getValue} from "firebase/remote-config";

const DefaultArticle = (props) => {
  const [isEarlyAccess] = useState(props.earlyAccess);
  const { name } = useParams();
  const [articles, setArticles] = useState({});
  const [enableSaving, setEnableSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [translations, setTranslations] = useState({});
  const [availableLanguages, setAvailableLanguages] = useState({});
  const [loading, setLoading] = useState(true);

  const [author, setAuthor] = useState({});

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

    fetchRemoteConfig();
    fetchData();

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setEnableSaving(true);
        fetchSavedStatus();
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

      const usersRef = dbRef(database, `authors/${data.sub}`);
      if(usersRef) {
        onValue(usersRef, async (snapshot) => {
          if (snapshot.exists()) {
            const usersData = snapshot.val();
            let userImage = ref(storage, `/profile_images/${data.sub}_600x600`);
            usersData.photoURL = await getDownloadURL(userImage);
            usersData.wantToShow = true;
            console.log(usersData);

            setAuthor(usersData);
          } else {
            setAuthor({
              displayName: data.sub
            })
          }
        });
        data.img01 = await getFirebaseStorageUrl(data.img01);
      }

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

  function changeAnalysis(fileName, analysis_true, analysis_false, change_analysis) {
    // Find the position of the last dot, which indicates the start of the extension
    const dotIndex = fileName.lastIndexOf('.');

    // If there's no dot, return the filename with the suffix appended
    if (dotIndex === -1) {
      return `${fileName}_${change_analysis?analysis_true:analysis_false}`;
    }

    // Extract the name and extension parts
    const name = fileName.substring(0, dotIndex);
    const extension = fileName.substring(dotIndex);

    // Construct the new filename
    return `${name}_${change_analysis?analysis_true:analysis_false}${extension}`;
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
    }catch(e){
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
        <AppNav />
        <div className="container">
          <div className="row text-white">
            <div className="col-md-12 d-flex justify-content-evenly">
              <h3>{articles.title}</h3>
              <hr className="bg-dark"/>
            </div>
            <div className={"col-12"}>
            <div className="w-100 d-flex align-items-center">
              {(author.wantToShow&&author.photoURL)&& (<div className="image-container ms-1" style={{width:"80px", height: "80px"}}>
                <img
                    src={author.photoURL}
                    alt={author.displayName}
                />
              </div>)}
              {/* Add margin to the left of the text */}
              <p className="lead ms-2 text-white text-center">{author.displayName}</p>
            </div>
            </div>
            <hr className={(author.wantToShow?"mt-2 ":"")+"bg-dark"}/>
            <div className="col-md-6 credits-box">
              {articles.img01&&<img
                  className="img-fluid w-100"
                  src={articles.img01}
                  alt={articles.title}
                  onLoad={async (image)=>{
                    if(shouldStoreMetadata){
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
              <p className="lead">
                <span dangerouslySetInnerHTML={{__html: articles.Socials}}></span>
              </p>

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
              <div dangerouslySetInnerHTML={{__html: articles.content}}></div>
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
