import React, {useEffect, useState} from "react";
import {getDownloadURL, listAll, ref} from 'firebase/storage';
import {storage} from "../../firebase";
import FetchedArticles from './FetchedArticles';
import "bootstrap/dist/css/bootstrap.min.css";
import "./../home.css";
import {useTranslation} from 'react-i18next';

const Articles = () => {
    const { t } = useTranslation();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const listFiles = async () => {
            const storageRef = ref(storage, "articles/");
            try {
                const result = await listAll(storageRef);
                const files = await Promise.all(result.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return { name: item.name, url };
                }));

                setArticles(files);
                console.log(files);
            } catch (error) {
                console.error("Error listing files:", error);
            }
        };

        listFiles();
    }, []);

    return (
        <>
            <div className="container">
                <h1>{t('savedArticles')}</h1>
                <div className="row">
                    {articles ? (
                        articles.map((article) => (
                            <div className="col-md-4 mb-4" key={article.name}>
                                <FetchedArticles article={article} />
                            </div>
                        ))
                    ) : (
                        <p>{t('loadingMessage')}</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Articles;
