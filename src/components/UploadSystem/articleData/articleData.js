import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "../../../firebase";


import pLimit from 'p-limit';
import axios from "axios";


const fetchArticlesCategory = async (folder, setEarlyReleasesError, setAlreadyPublishedError, setError, concarrency) => {
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
                if (folder === 'early_releases') {
                    setEarlyReleasesError(errorMessage);
                } else if (folder === 'articles') {
                    setAlreadyPublishedError(errorMessage);
                } else {
                    setError(errorMessage);
                }
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
        if (folder === 'early_releases') {
            setEarlyReleasesError(errorMessage);
        } else if (folder === 'articles') {
            setAlreadyPublishedError(errorMessage);
        } else {
            setError(errorMessage);
        }
        console.log(error);
    }
};

export default fetchArticlesCategory;
