import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "../../../firebase";

const fetchArticlesCategory = async (folder, setEarlyReleasesError, setAlreadyPublishedError, setError) => {
    try {
        let publishedListRef = ref(storage, folder);
        let {items: publishedItems} = await listAll(publishedListRef);

        return await Promise.all(
            publishedItems.map(async (item) => {
                const downloadUrl = await getDownloadURL(item);
                let fileContent = await fetch(downloadUrl);

                try {
                    fileContent = await fileContent.json();
                } catch (error) {
                    if (folder === 'early_releases') {
                        setEarlyReleasesError('Error fetching files: file: ' + item.name + " : " + error);
                    } else if (folder === 'articles') {
                        setAlreadyPublishedError('Error fetching files: file: ' + item.name + " : " + error);
                    } else {
                        setError('Error fetching files: ' + error.message);
                    }
                    console.log(error);
                    console.log(item);
                }

                return {name: item.name, downloadUrl, fileContent};
            })
        );
    } catch (error) {
        if (folder === 'early_releases') {
            setEarlyReleasesError('Error fetching files: file: ' + error);
        } else if (folder === 'articles') {
            setAlreadyPublishedError('Error fetching files: file: ' + error);
        } else {
            setError('Error fetching files: file: ' + error);
        }
        console.log(error);
    }
};

export default fetchArticlesCategory;