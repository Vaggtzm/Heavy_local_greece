import React, {useEffect, useState} from "react";
import NavLink from "../LanguageWrapper/NavLink";
import {useTranslation} from "react-i18next";
import {limitToLast, onValue, orderByChild, query, ref} from "firebase/database";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {database, storage} from "../../firebase";

const ReadMore = ({category, isEarlyAccess}) => {
    const { t } = useTranslation();
    const [latestArticlesOnCategory, setLatestArticlesOnCategory] = useState([]);

    const cleanUpHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html.trim();

        // Function to recursively process nodes
        const processNode = (node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // Remove empty <p> tags and <p> tags with only <br> or whitespace
                if (node.tagName.toLowerCase() === 'p') {
                    // Remove trailing <br> tags inside <p> tags
                    let lastChild = node.lastChild;
                    while (lastChild && lastChild.nodeType === Node.ELEMENT_NODE && lastChild.tagName.toLowerCase() === 'br') {
                        node.removeChild(lastChild);
                        lastChild = node.lastChild;
                    }

                    // Remove <p> tags if they are empty after removing <br> tags
                    if (node.innerHTML.trim() === '') {
                        node.parentNode.removeChild(node);
                    }
                }

                // Recursively process child nodes
                node.childNodes.forEach(child => processNode(child));
            }
        };

        // Start processing from the root div
        div.childNodes.forEach(child => processNode(child));

        // Return cleaned HTML content
        div.querySelectorAll("*:empty").forEach((x)=>{x.remove()})
        return div.innerHTML;
    };

    const truncateHTML = (html, wordLimit) => {
        const div = document.createElement('div');
        div.innerHTML = html;

        let wordCount = 0;
        const nodeStack = [];
        const result = [];

        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.trim().split(/\s+/);
                for (let i = 0; i < words.length; i++) {
                    if (wordCount >= wordLimit) break;
                    result.push(words[i]);
                    wordCount++;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                nodeStack.push(node);
                result.push(`<${node.tagName.toLowerCase()}${[...node.attributes].map(attr => ` ${attr.name}="${attr.value}"`).join('')}>`);
                node.childNodes.forEach(child => processNode(child));
                nodeStack.pop();
                result.push(`</${node.tagName.toLowerCase()}>`);
            }
        };

        div.childNodes.forEach(node => processNode(node));

        // Remove any unclosed tags
        while (nodeStack.length) {
            const node = nodeStack.pop();
            result.push(`</${node.tagName.toLowerCase()}>`);
        }

        // Join result and remove extra spaces
        let finalResult = result.join(' ').replace(/\s+/g, ' ').trim();

        // Remove empty <p> tags and <p> tags with only <br> or whitespace
        finalResult = finalResult.replace(/<p[^>]*>(\s|<br\s*\/?>)*<\/p>/g, '');

        // Remove ending <br> tags within <p> and other tags
        finalResult = finalResult.replace(/(<br\s*\/?>\s*)+<\/p>/g, '</p>');

        // Remove any standalone ending <br> tags
        finalResult = finalResult.replace(/<br\s*\/?>\s*$/, '');

        return cleanUpHTML(finalResult);
    };

    const setListener = (category, isEarlyAccess) => {
        const latestCategoryRef = ref(database, `articlesList/${isEarlyAccess?"early_releases":"articles"}/${category}`);
        const latestArticlesQuery = query(latestCategoryRef, orderByChild('date'), limitToLast(3));
        return onValue(latestArticlesQuery, async (snapshot) => {
            setLatestArticlesOnCategory([]);
            const data = Object.keys(snapshot.val());
            if(data){
                const folder = isEarlyAccess?"early_releases":"articles";
                const articlesPromises = data.map(async (article)=>{
                    const articleStorageRef = storageRef(storage, `${folder}/${article}.json`);
                    const article_data_url = await getDownloadURL(articleStorageRef);
                    const article_data_string = await fetch(article_data_url);

                    const main_article = await article_data_string.json();
                    main_article.content = truncateHTML(main_article.content, 20);
                    const early_releases = (isEarlyAccess)?"/early":""
                    main_article.link = `/article${early_releases}/${article}`
                    return main_article;
                });

                const articles = await Promise.all(articlesPromises);

                setLatestArticlesOnCategory((previousData)=> {
                    const newData = [...previousData, ...articles]
                    console.log(newData);
                    return newData
                });
            }
        })
    }

    useEffect(()=>{
        console.log(category);
        const unsubscribe = [];

        unsubscribe.push(setListener(category, false));
        if(isEarlyAccess){
            unsubscribe.push(setListener(category, true));
        }

        return ()=>{
            unsubscribe.forEach((unsub)=>unsub());
        }
    },[])

    return (
        <>
            <div className="container">
                <h4>Pulse Of The Undeground</h4>
                <div className="row mt-4 mb-5 text-center">
                    {latestArticlesOnCategory.map((article)=>{
                        return(<div className="col-md-4 mb-4">
                        <div className="card h-100 w-100 bg-dark text-white">
                            <img className="card-img-top shadow-lg img-fluid" src={article.img01}
                                 alt={article.title}></img>
                            <div className={"card-header"}>
                                <h3 className="card-title fw-bold">{article.title} </h3>
                            </div>
                            <div className="card-body">

                                <p className="card-text lead" dangerouslySetInnerHTML={{__html: article.content}}>
                                </p>
                                <NavLink to={article.link}
                                         className="btn btn-primary">{t('readMore')}</NavLink>
                            </div>
                        </div>
                    </div>)})}


                </div>
            </div>
        </>
    )
}
export default ReadMore;