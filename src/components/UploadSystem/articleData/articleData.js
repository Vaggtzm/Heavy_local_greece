import {functions} from "../../../firebase";


import {httpsCallable} from "firebase/functions";
const fetchFilesFunction = httpsCallable(functions, 'fetchFiles');

const fetchAllFiles = async (setAlreadyPublishedArticles, setAlreadyPublishedError, setLoading,pageToken) => {
    try {
        const result = await fetchFilesFunction({ maxResults: 20, folder: 'articles', pageToken: pageToken });
        const nextPageToken = handleResult(result, setAlreadyPublishedArticles, setAlreadyPublishedError, pageToken === null);
        console.log(nextPageToken);
        if (!nextPageToken||nextPageToken.pageToken===pageToken) {
            // No more pages to fetch, set loading to false
            setLoading(false);
        } else {
            // Recursively fetch the next page of files
            await fetchAllFiles(setAlreadyPublishedArticles, setAlreadyPublishedError, setLoading, nextPageToken.pageToken);
        }
    } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
        throw new functions.https.HttpsError('unknown', 'Failed to fetch files');
    }
};

export async function fetchFiles(setFiles, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading){
    try {
        const pending = fetchFilesFunction({ maxResults:100, folder: 'upload_from_authors', pageToken: null }).then((uploadedFilesResult)=>{
            handleResult(uploadedFilesResult, setFiles, setError, true);
        })

        fetchAllFiles(setAlreadyPublishedArticles, setAlreadyPublishedError, setLoading, null)


        const early = fetchFilesFunction({ maxResults:100, folder: 'early_releases', pageToken: null}).then((earlyReleasedFilesResult)=>{
            handleResult(earlyReleasedFilesResult, setEarlyReleasedArticles, setEarlyReleasesError, true);
        });
        await Promise.all([
            pending, early
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

