import {functions} from "../../../firebase";


import {connectFunctionsEmulator, httpsCallable} from "firebase/functions";

// connectFunctionsEmulator(functions, 'localhost', 8443);
const fetchFilesFunction = httpsCallable(functions, 'fetchFiles');

export async function fetchFiles(setFiles, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading){
    try {
        const pending = fetchFilesFunction({ maxResults:100, folder: 'upload_from_authors', pageToken: null }).then((uploadedFilesResult)=>{
            handleResult(uploadedFilesResult, setFiles, setError, true);
        })

        const uploaded = fetchFilesFunction({ maxResults:20, folder: 'articles', pageToken: null}).then(async (publishedFilesResult)=>{
            setLoading(true);
            let nextPageToken = handleResult(publishedFilesResult, setAlreadyPublishedArticles, setAlreadyPublishedError, true);
            while(nextPageToken){
                publishedFilesResult = await fetchFilesFunction({ maxResults:20, folder: 'articles', pageToken: nextPageToken});
                handleResult(publishedFilesResult, setAlreadyPublishedArticles, setAlreadyPublishedError, false);
            }
            setLoading(false);
        });


        const early = fetchFilesFunction({ maxResults:100, folder: 'early_releases', pageToken: null}).then((earlyReleasedFilesResult)=>{
            handleResult(earlyReleasedFilesResult, setEarlyReleasedArticles, setEarlyReleasesError, true);
        });
        await Promise.all([
            pending, uploaded, early
        ]);
    } catch (e) {
        setError(e.message);
    }
}



const handleResult = (result, setData, setError, initialize) => {
    const { articles, nextPageToken } = result.data;
    const errors = articles.filter(article => article.error).map(article => article.error);

    if (errors.length > 0) {
        setError(errors.join('\n'));
    } else {
        setError(null);
    }

    // When initialize is true, set data directly
    if (initialize) {
        setData(articles.filter(article => !article.error));
    } else {
        // When initialize is false, append to the previous data
        setData(prevData => [
            ...prevData,
            ...articles.filter(article => !article.error)
        ]);
    }

    return nextPageToken;
};

