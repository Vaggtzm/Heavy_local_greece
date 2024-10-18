import { auth, database, functions, storage } from "../../../firebase";
import { deleteObject, getDownloadURL, getMetadata, ref } from "firebase/storage";
import { get, onValue, ref as databaseRef } from "firebase/database";
import { httpsCallable } from "firebase/functions";
import { getIdTokenResult, signOut } from "firebase/auth";

// Set custom claims for a user
export const setClaims = async (id, isEmail, claim) => {
    const adminFunction = httpsCallable(functions, 'setCustomClaim');
    try {
        return await adminFunction({ id, isEmail, claim });
    } catch (e) {
        throw e;
    }
};

// Set author claim
export const setAuthor = async (id, isEmail, isAuthor) => {
    const claim = { admin: isAuthor };
    try {
        return await setClaims(id, isEmail, claim);
    } catch (e) {
        throw e;
    }
};

// Disable a user
export const disableUser = async (id, isEmail, disabled) => {
    const adminFunction = httpsCallable(functions, 'disableUser');
    try {
        return await adminFunction({ id, isEmail, disabled });
    } catch (e) {
        throw e;
    }
};

import { database, databaseRef, onValue } from 'firebase/database'; // Make sure to import onValue

// Fetch all files and their articles from Firebase
const fetchAllFiles = (setArticlesByCategory, setLoading) => {
    const articlesRef = databaseRef(database, 'articlesList');

    // Start listening for updates to the articlesList reference
    const unsubscribe = onValue(articlesRef, async (snapshot) => {
        setLoading(true); // Start loading

        try {
            if (!snapshot.exists()) {
                setArticlesByCategory({}); // Clear articles if none exist
                setLoading(false);
                return;
            }

            const data = snapshot.val();
            const folders = Object.keys(data);

            const fetchFolderPromises = folders.map(async (folder) => {
                const folderRef = databaseRef(database, `articlesList/${folder}`);
                const folderSnapshot = await get(folderRef);

                if (folderSnapshot.exists()) {
                    const articlesByCategory = [];
                    const categoryData = folderSnapshot.val();

                    Object.keys(categoryData).forEach(articleKey => {
                        const articleCategory = categoryData[articleKey];
                        Object.keys(articleCategory).forEach((articleTitle) => {
                            const temp = articleCategory[articleTitle];
                            temp.name = articleTitle;
                            temp.category = articleKey || 'uncategorized';
                            temp.folder = folder;
                            articlesByCategory.push(temp);
                        });
                    });

                    return { [folder]: articlesByCategory };
                }
                return null;
            });

            const foldersData = await Promise.all(fetchFolderPromises);
            const articles = foldersData.reduce((acc, folderData) => {
                if (folderData) {
                    return { ...acc, ...folderData };
                }
                return acc;
            }, {});

            setArticlesByCategory(articles);
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false); // Stop loading after processing
        }
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
};


// Fetch files function
export async function fetchFiles(setFiles, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading) {
    return fetchAllFiles(setFiles, setLoading);
}

// Get Firebase Storage URL with optional resizing
export const getFirebaseStorageUrlFull = async (fileName, shouldBeFull) => {
    try {
        if (shouldBeFull) {
            return await getDownloadURL(ref(storage, fileName));
        } else {
            const metadata = await getMetadata(ref(storage, fileName)).catch(() => null);
            if (metadata) {
                const shouldResize = await isAlmostRectangle(ref(storage, fileName));
                const imageRef = ref(storage, changeAnalysis(fileName, "800x800", "800x600", shouldResize.result));
                return await getDownloadURL(imageRef);
            } else {
                return await getDownloadURL(ref(storage, fileName));
            }
        }
    } catch (error) {
        console.error('Error fetching image URL:', error);
        throw error;
    }
};

// Get file reference from URL
export function getRef(imageUrl, isFolderIncluded) {
    const imagePath = imageUrl.split("/");
    const fileName = imagePath.pop();
    const folder = isFolderIncluded ? imagePath.join("/") : "images";
    return `${folder}/${fileName}`;
}

// Get Firebase Storage URL from path with optional resizing
export const getFirebaseStorageUrlFromPath = async (imageUrl, isFolderIncluded) => {
    const shouldResize = await isAlmostRectangle(ref(storage, imageUrl));
    const fileName = getRef(imageUrl, isFolderIncluded);
    const storageRef = ref(storage, changeAnalysis(fileName, "800x800", "800x600", shouldResize.result));

    try {
        return await getDownloadURL(storageRef);
    } catch (e) {
        return await getDownloadURL(ref(storage, fileName));
    }
}

// Get Firebase Storage URL with metadata storage
export const getFirebaseStorageUrl = async (imageUrl, setShouldStoreMetadata, setImageStorageRef) => {
    const fileName = getRef(imageUrl, false);
    const shouldResize = await isAlmostRectangle(ref(storage, fileName));
    const storageRef = ref(storage, `${changeAnalysis(fileName, "800x800", "800x600", shouldResize.result)}`);
    if (setShouldStoreMetadata) {
        setShouldStoreMetadata(!shouldResize.areMetadataFound);
    }
    if (setImageStorageRef) {
        setImageStorageRef(storageRef);
    }
    try {
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.error(e);
    }
};

// Delete image and related files
export function deleteImage(imageName) {
    return Promise.all(getAllImageNames(imageName).map(async (imageName) => {
        const storageRef = ref(storage, imageName);

        try {
            await deleteObject(storageRef);
            console.log(`Image ${imageName} deleted successfully from storage.`);
        } catch (e) {
            console.error(`Error deleting image ${imageName}:`, e);
        }
    }));
}

// Get all image names with different resolutions
export function getAllImageNames(imageName) {
    const dotIndex = imageName.lastIndexOf('.');
    const extensions = ["600x300", "600x600", "800x400", "800x600", "800x800"];
    const name = dotIndex === -1 ? imageName : imageName.substring(0, dotIndex);
    const imageExtension = dotIndex === -1 ? '' : imageName.substring(dotIndex);
    return extensions.map((extension) => `${name}_${extension}${imageExtension}`);
}

// Change analysis based on dimensions
function changeAnalysis(fileName, analysis_true, analysis_false, change_analysis) {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1) {
        return `${fileName}_${change_analysis ? analysis_true : analysis_false}`;
    }
    const name = fileName.substring(0, dotIndex);
    const extension = fileName.substring(dotIndex);
    return `${name}_${change_analysis ? analysis_true : analysis_false}${extension}`;
}

// Check if the image is "almost rectangular"
const isAlmostRectangle = async (storageRef) => {
    try {
        const metadata = await getMetadata(storageRef);
        const width = parseInt(metadata.customMetadata.width, 10);
        const height = parseInt(metadata.customMetadata.height, 10);

        const tolerance = 0.5;
        const aspectRatio = width / height;
        const result = Math.abs(aspectRatio - 1) <= tolerance;

        return { result, areMetadataFound: true };
    } catch (e) {
        return { result: false, areMetadataFound: false };
    }
};

// Get image dimensions from a file
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

// Handle author test and navigation
export function handleAuthorTest(user, setCurrentUser, navigate) {
    if (user) {
        getIdTokenResult(user).then((idTokenResult) => {
            if (idTokenResult.claims && idTokenResult.claims.admin) {
                console.log("The user is an admin");
            } else {
                signOut(auth).then(() => {
                    console.log("Trying to login again");
                    navigate('/upload/login');
                });
            }
        });

        setCurrentUser(user);
    } else {
        setCurrentUser(null);
        navigate('/upload/login');
    }
}

// List of categories
export const categories = [
    "Top News",
    "General News",
    "Interviews",
    "Collabs and Sponsorships",
    "Latest Reviews(ENG)",
    "Latest Reviews(GRE)",
    "Latest Reviews(IT)",
    "Legends"
];

// Set user IDs based on emails
export const setUids = async (userList, leaderList, setAdminUids, setLeadersUids) => {
    const authorsRef = databaseRef(database, 'authors');
    const authorsSnapshot = await get(authorsRef);
    const authorsData = authorsSnapshot.val();

    const findUids = (list) => list.map(email => {
        for (const uid in authorsData) {
            if (authorsData[uid].email === email) {
                return uid;
            }
        }
        return null;
    });

    setAdminUids(findUids(userList).filter(uid => uid !== null));
    setLeadersUids(findUids(leaderList).filter(uid => uid !== null));
};
