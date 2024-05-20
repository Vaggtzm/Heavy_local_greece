import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";



const FetchedArticles = (props) =>{
    const [article, setArticle] = useState({});

    const getFirebaseStorageUrl = async (imageUrl) => {
        const fileName = imageUrl.split("/").pop();
        const storageRef = ref(storage, `images/${fileName}`);
        return await getDownloadURL(storageRef);
    };

    const fetchData = async (link) => {

        try {
            let articleSnapshot;
            
                articleSnapshot = await getDownloadURL(
                    ref(storage, `articles/${link}.json`)
                );
            

            const response = await fetch(articleSnapshot);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            data.img01 = await getFirebaseStorageUrl(article.img01);
            return  data
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        console.log(props.article);
        fetchData(props.article.name).then((tempData) => {
            console.log(tempData);
            setArticle(tempData);
        });
    },[])
    return(
        <>
            {article && (
            <div className="card h-100 w-100 bg-white">
            <img className=" img-fluid" src={article.img01} />
            <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
              <p className="card-text">This article is saved</p>
              <a className="btn btn-danger" href={`/article/${props.article.name.split(/\.(?=[^\.]+$)/)[0]}`}>Read More</a>
            </div>

            </div>
          )}
        </>
        
    )
}

export default FetchedArticles; 


