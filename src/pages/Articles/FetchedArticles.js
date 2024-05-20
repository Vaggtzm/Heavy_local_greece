import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import {NavLink} from "react-router-dom";

const FetchedArticles = (props) => {
    const [article, setArticle] = useState({});

    const getFirebaseStorageUrl = async (imageUrl) => {
        if (!imageUrl) return '';
        const fileName = imageUrl.split("/").pop();
        const storageRef = ref(storage, `images/${fileName}`);
        return await getDownloadURL(storageRef);
    };

    const fetchData = async (link) => {
        try {
            const articleSnapshot = await getDownloadURL(ref(storage, `articles/${link}`));
            const response = await fetch(articleSnapshot);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            data.img01 = await getFirebaseStorageUrl(data.img01); // Access the fetched data here
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData(props.article.name).then((tempData) => {
            setArticle(tempData);
        });
    }, [props.article.name]);
    return(
        <>
            {article && (
            <div className="card h-100 w-100 bg-white">
            <img className=" img-fluid" src={article.img01} />
            <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
              <p className="card-text">This article is saved</p>
              <NavLink className="btn btn-danger" to={`/article/${props.article.name.split(/\.(?=[^\.]+$)/)[0]}`}>Read More</NavLink>
            </div>

            </div>
          )}
        </>
        
    )
}

export default FetchedArticles; 


