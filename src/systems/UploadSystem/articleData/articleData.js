import {database, functions, storage} from "../../../firebase";


import {deleteObject, getDownloadURL, getMetadata, ref} from "firebase/storage";
import {get, onValue, ref as databaseRef} from "firebase/database";
import {httpsCallable} from "firebase/functions";

export const setClaims = async (id, isEmail, claim)=> {
    const adminFunction = httpsCallable(functions, 'setCustomClaim');
    try {
        return await adminFunction({id: id, isEmail: isEmail, claim: claim})
    }catch (e) {
        throw e;
    }
}

export const setAuthor = async (id, isEmail, isAuthor)=>{
    const claim = {admin: isAuthor};
    try {
        return await setClaims(id, isEmail, claim);
    }catch (e) {
        throw e;
    }
}

// disableUser

export const disableUser = async (id, isEmail, disabled)=> {
    const adminFunction = httpsCallable(functions, 'disableUser');
    try {
        return await adminFunction({id: id, isEmail: isEmail, disabled:disabled})
    }catch (e) {
        throw e;
    }
}


const fetchAllFiles = (setArticlesByCategory, setLoading, pageToken) => {
    const articlesRef = databaseRef(database, 'articlesList');
    return onValue(articlesRef, async (snapshot)=> {
        try {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const folders = Object.keys(data);
                const articles = {};

                // Fetch articles for each folder
                for (const folder of folders) {
                    const folderRef = databaseRef(database, `articlesList/${folder}`);
                    const folderSnapshot = await get(folderRef);

                    if (folderSnapshot.exists()) {
                        const articlesByCategory = [];
                        const categoryData = folderSnapshot.val();

                        // Iterate over articles in the category
                        Object.keys(categoryData).forEach(articleKey => {
                            const articleCategory = categoryData[articleKey];
                            Object.keys(articleCategory).forEach((articleTitle) => {
                                const temp = articleCategory[articleTitle];

                                temp.name = articleTitle;
                                temp.category = articleKey || 'uncategorized';
                                temp.folder = folder;

                                articlesByCategory.push(temp);
                            })
                        });
                        articles[folder] = articlesByCategory;
                    }
                }
                setArticlesByCategory(articles);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching files:', error);
            setLoading(false);
        }
    });
};

export async function fetchFiles(setFiles, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading){
    return fetchAllFiles(setFiles, setAlreadyPublishedError, setLoading, null)
}



export const getFirebaseStorageUrlFull = async (fileName, shouldBeFull) => {

    if(shouldBeFull){
        return await getDownloadURL(ref(storage, fileName));
    }else{
        let shouldResize = await isAlmostRectangle(ref(storage, fileName));
        const imageRef = ref(storage, changeAnalysis(fileName, "800x800", "800x600", shouldResize.result));
        try{
            await getMetadata(imageRef);
            return await getDownloadURL(imageRef);
        }catch (e) {
            return await getDownloadURL(ref(storage, fileName));
        }
    }
}

export function getRef(imageUrl, isFolderIncluded){
    const imagePath = imageUrl.split("/");
    const fileName = imagePath.pop();
    const folder = isFolderIncluded?imagePath.join("/"):"images";

    return `${folder}/${fileName}`;
}

export const getFirebaseStorageUrlFromPath=async (imageUrl, isFolderIncluded)=>{
    const shouldResize = await isAlmostRectangle(ref(storage, imageUrl));
    const fileName = getRef(imageUrl, isFolderIncluded);
    const storageRef = ref(storage, changeAnalysis(fileName, "800x800", "800x600", shouldResize.result));

    try {
        return await getDownloadURL(storageRef);
    } catch (e) {
        return await getDownloadURL(ref(storage, fileName));
    }
}

export const getFirebaseStorageUrl = async (imageUrl, setShouldStoreMetadata, setImageStorageRef) => {
    const fileName = getRef(imageUrl, false);
    const shouldResize = await isAlmostRectangle(ref(storage, fileName));
    const storageRef = ref(storage, `${changeAnalysis(fileName, "800x800", "800x600", shouldResize.result)}`);
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

export function deleteImage(imageName){
    return Promise.all(getAllImageNames(imageName).map(async (imageName)=> {
        const storageRef = ref(storage, imageName);

        try {
            deleteObject(storageRef).then().catch(console.log);
            console.log(`Image ${imageName} deleted successfully from storage.`);
        } catch (e) {
            console.error(`Error deleting image ${imageName}:`, e);
        }
    }));
}

export function getAllImageNames(imageName){
    const dotIndex = imageName.lastIndexOf('.');
    const extensions = ["600x300", "600x600", "800x400", "800x600", "800x800"];
    if (dotIndex === -1) {
        return extensions.map((extension)=>`${imageName}_${extension}`);
    }
    const name = imageName.substring(0, dotIndex);
    const imageExtension = imageName.substring(dotIndex);
    return extensions.map((extension)=>`${name}_${extension}${imageExtension}`);
}

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



export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
};