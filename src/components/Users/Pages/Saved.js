import React, { useState, useEffect } from "react";
import { database } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import AppNavigation from "../../AppNav/AppNav";
import { auth } from "../../../firebase";
import { useParams } from "react-router-dom";

const SavedArticles = () => {
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setCurrentUser(user);
          const dataRef = ref(database, `users/${user.uid}/savedArticles/`);
          onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            setData(fetchedData);
            console.log(fetchedData ,"data")
          });
        }
      });
    };
    fetchData();
  }, []);

  return (
    <>
   <AppNavigation />
    <div className="container">
      <h1>Saved Articles</h1>
      <hr className="bg-dark" />
      <div className="row">
        {data ? (
          Object.entries(data).map(([key, isSaved]) => (
            <div className="col-md-4 mb-4" key={key}>
              <div className="card">
                {isSaved ? (
                  
                  <div className="card-body">
                    <h5 className="card-title">{key}</h5>
                    <p className="card-text">This article is saved</p>
                  </div>
                ) : (
                  <div className="card-body">
                    <h5 className="card-title">{key}</h5>
                    <p className="card-text">This article is not saved</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </>
  );
};

export default SavedArticles;
