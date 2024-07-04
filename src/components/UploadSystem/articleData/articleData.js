import {getDownloadURL, listAll, ref} from "firebase/storage";
import {functions, storage} from "../../../firebase";


import pLimit from 'p-limit';
import axios from "axios";
import {connectFunctionsEmulator, httpsCallable} from "firebase/functions";

connectFunctionsEmulator(functions, 'localhost', 8443);
const fetchFilesFunction = httpsCallable(functions, 'fetchFiles');

export async function fetchFiles(setFiles, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError){
    try {
        const pending = fetchFilesFunction({ folder: 'upload_from_authors' }).then((uploadedFilesResult)=>{
            handleResult(uploadedFilesResult, setFiles, setError);
        })
        const uploaded = fetchFilesFunction({ folder: 'articles'}).then((publishedFilesResult)=>{
            handleResult(publishedFilesResult, setAlreadyPublishedArticles, setAlreadyPublishedError);
        });
        const early = fetchFilesFunction({ folder: 'early_releases'}).then((earlyReleasedFilesResult)=>{
            handleResult(earlyReleasedFilesResult, setEarlyReleasedArticles, setEarlyReleasesError);
        })


        await Promise.all([
            pending, uploaded, early
        ]);


    } catch (e) {
        console.log(e);
    }
}


const fetchArticlesCategory = async (folder, setError, concarrency) => {
    try {
        let publishedListRef = ref(storage, folder);
        let {items: publishedItems} = await listAll(publishedListRef);

        const limit = pLimit(concarrency); // Set concurrency limit to 10 (adjust based on your needs)

        const articlePromises = publishedItems.map((item) => limit(async () => {
            let response;
            let downloadUrl
            try{
                downloadUrl = await getDownloadURL(item);
                response = await axios.get(downloadUrl);
            }catch(e){
                console.log("error fetching file: "+e)
                return undefined;
            }
            try {
                const fileContent = await response.data;

                return { name: item.name, downloadUrl, fileContent };
            } catch (error) {
                const errorMessage = `Error fetching file ${item.name}: ${error.message}`;
                setError(errorMessage);
                console.log(error);
                console.log(response)
                return null; // Return null for items with errors to filter them out later
            }
        }));

        const results = await Promise.allSettled(articlePromises);

        return results
            .filter(result => result.status === 'fulfilled' && result.value !== null)
            .map(result => result.value);
    } catch (error) {
        const errorMessage = `Error fetching files: ${error.message}`;
        setError(errorMessage);
        console.log(error);
    }
};



export const handleResult= (result, setData, setError) => {
    const { articles } = result.data;
    console.log("articles",articles);
    const errors = articles.filter(article => article.error).map(article => article.error);
    if (errors.length > 0) {
        setError(errors.join('\n'));
    } else {
        setError(null);
    }
    setData(articles.filter(article => !article.error));
};

export default fetchArticlesCategory;
