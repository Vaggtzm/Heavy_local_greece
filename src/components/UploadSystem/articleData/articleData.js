import {functions, storage} from "../../../firebase";


import {httpsCallable} from "firebase/functions";
import {getDownloadURL, getMetadata, ref} from "firebase/storage";
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

export const getFirebaseStorageUrlFull = async (fileName, shouldBeFull) => {

    if(shouldBeFull){
        return await getDownloadURL(ref(storage, fileName));
    }else{
        let shouldResize = await isAlmostRectangle(ref(storage, fileName));
        return await getDownloadURL(ref(storage, changeAnalysis(fileName, "800x800", "800x600", shouldResize.result)));
    }
}

export const getFirebaseStorageUrl = async (imageUrl, setShouldStoreMetadata, setImageStorageRef) => {
    const fileName = imageUrl.split("/").pop();
    const shouldResize = await isAlmostRectangle(ref(storage, `images/${fileName}`));

    const storageRef = ref(storage, `images/${changeAnalysis(fileName, "800x800", "800x600", shouldResize.result)}`);
    if(!!setShouldStoreMetadata) {
        setShouldStoreMetadata(!shouldResize.areMetadataFound)
    }
    if(!!setImageStorageRef) {
        setImageStorageRef(storageRef);
    }
    try {
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.log(e);
    }
};

function changeAnalysis(fileName, analysis_true, analysis_false, change_analysis) {
    // Find the position of the last dot, which indicates the start of the extension
    const dotIndex = fileName.lastIndexOf('.');

    // If there's no dot, return the filename with the suffix appended
    if (dotIndex === -1) {
        return `${fileName}_${change_analysis ? analysis_true : analysis_false}`;
    }

    // Extract the name and extension parts
    const name = fileName.substring(0, dotIndex);
    const extension = fileName.substring(dotIndex);

    // Construct the new filename
    return `${name}_${change_analysis ? analysis_true : analysis_false}${extension}`;
}

const isAlmostRectangle = async (storageRef) => {
    try {
        const metadata = await getMetadata(storageRef);
        const width = parseInt(metadata.customMetadata.width, 10);
        const height = parseInt(metadata.customMetadata.height, 10);

        // Define the tolerance for "almost rectangular" (e.g., within 10% difference)
        const tolerance = 0.5;
        const aspectRatio = width / height;
        const result = Math.abs(aspectRatio - 1) <= tolerance

        return {result: result, areMetadataFound: true};
    } catch (e) {
        return {result: false, areMetadataFound: false};
    }
};
