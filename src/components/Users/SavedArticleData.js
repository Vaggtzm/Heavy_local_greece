import React, {useEffect, useState} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../../firebase";



const SavedArticleData = (props) =>{
    const [data, setData] = useState({});

    const getFirebaseStorageUrl = async (imageUrl) => {
        const fileName = imageUrl.split("/").pop();
        const storageRef = ref(storage, `images/${fileName}`);
        return await getDownloadURL(storageRef);
    };

    const fetchData = async (link) => {
        const isEarlyAccess = false;

        try {
            let articleSnapshot;
            if (isEarlyAccess) {
                articleSnapshot = await getDownloadURL(
                    ref(storage, `early_releases/${link}.json`)
                );
            } else {
                articleSnapshot = await getDownloadURL(
                    ref(storage, `articles/${link}.json`)
                );
            }

            const response = await fetch(articleSnapshot);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            data.img01 = await getFirebaseStorageUrl(data.img01);
            return  data
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        console.log(props.article);
        fetchData(props.article).then((tempData) => {
            console.log(tempData);
            setData(tempData);
        });
    },[])
    return(
        <>
            {props.isSaved ? (
            <div className="card h-100 w-100">
            <img className=" img-fluid" src={data.img01} />
            <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
              <p className="card-text">This article is saved</p>
              <a className="btn btn-danger" href={`/article/${props.article}`}>Read More</a>
            </div>

            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title">{props.article}</h5>
              <p className="card-text">This article is not saved</p>
              <a className="btn btn-danger" href={`/article/${props.article}`}>Read More</a>

            </div>
          )}
        </>
        
    )
}

export default SavedArticleData; 