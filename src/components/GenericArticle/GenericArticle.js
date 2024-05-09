import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, storage, database } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, remove, onValue } from "firebase/database";
import SocialBar from "../ShareBtns/SocialMediaBar";
import PageWithComments from "../Comments/comment";
import ReadMore from "../ReadMore/ReadMore";
import { Button } from "react-bootstrap";
import AppNav from "./../AppNav/AppNav";

const DefaultArticle = (props) => {
  const [isEarlyAccess] = useState(props.earlyAccess);
  const { name } = useParams();
  const [articles, setArticles] = useState({});
  const [enableSaving, setEnableSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // State to track if the article is saved by the user

  useEffect(() => {
    fetchData().then(); // Fetch article data when component mounts

    // Check if user is authenticated
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEnableSaving(true); // Enable saving functionality if user is logged in
      }
    });

    // Fetch user's saved articles from Firebase Realtime Database
    const fetchSavedStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const savedArticlesRef = databaseRef(
          database,
          `users/${currentUser.uid}/savedArticles`
        );
        onValue(savedArticlesRef, (snapshot) => {
          const savedArticles = snapshot.val() || {};
          setIsSaved(savedArticles[name]); // Check if current article is in user's saved list
        });
      }
    };

    fetchSavedStatus(); // Fetch saved status when component mounts

    return () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const savedArticlesRef = databaseRef(
          database,
          `users/${currentUser.uid}/savedArticles`
        );
      }
    };
  }, [name]);

  const fetchData = async () => {
    try {
      let articleSnapshot;
      if (isEarlyAccess) {
        articleSnapshot = await getDownloadURL(
          ref(storage, `early_releases/${name}.json`)
        );
      } else {
        articleSnapshot = await getDownloadURL(
          ref(storage, `articles/${name}.json`)
        );
      }

      const response = await fetch(articleSnapshot);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      data.img01 = await getFirebaseStorageUrl(data.img01);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getFirebaseStorageUrl = async (imageUrl) => {
    const fileName = imageUrl.split("/").pop();
    const storageRef = ref(storage, `images/${fileName}`);
    return await getDownloadURL(storageRef);
  };

  const toggleSaveArticle = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles/${name}`);
        if (isSaved) {
            remove(savedArticlesRef); // Remove article from user's saved list
            setIsSaved(false);
        } else {
            push(savedArticlesRef, true); // Add article to user's saved list
            setIsSaved(true);
        }
    }
};

if (!articles || Object.keys(articles).length === 0) {
    return <p>Loading...</p>;
}
if (!articles || Object.keys(articles).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Meta tags component */}
      <AppNav />
      <div className="container">
        <div className="row">
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
              <span
                dangerouslySetInnerHTML={{ __html: articles.details }}
              ></span>
            </p>
            <p className="lead">
              <span
                dangerouslySetInnerHTML={{ __html: articles.Socials }}
              ></span>
            </p>
            {/*TODO: fix styling*/}
            <hr className="bg-dark" />
            {enableSaving && (
              <span
                className="btn btn-danger w-25 rounded-4"
                onClick={() =>
                  toggleSaveArticle(
                    articles.title,
                    articles.img01,
                    articles.url
                  )
                }
                style={{ cursor: "pointer" }}
              >
                save
                {isSaved ? (
                  <i className="fas fa-heart" style={{ color: "red" }}></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </span>
            )}{" "}
            <a
              href="https://buymeacoffee.com/tzimasvagg7"
              className="btn btn-danger 25 m-2  rounded-4"
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
