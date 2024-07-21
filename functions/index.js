const functions = require("firebase-functions");
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const RSS = require("rss");

const path = require("path");
const fs = require("fs");
const {spawn} = require('child_process');
const stream = require('stream');

const serviceAccount = require("./heavy-local-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
ARTICLE HANDLING
------------------------------------------------------------------------------------------------------------------------------------------------------*/

const bucket = admin.storage().bucket("heavy-local-12bc4.appspot.com");
const database = admin.database();



app.get("/feed", async (req, res) => {
    const category = req.query.category || null;
    let latestArticleDate = null;

    try {
        const authorsRef = database.ref('authors');
        const authorSnapshot = await authorsRef.once('value');
        const authors = authorSnapshot.val();

        const usersRef = database.ref('users');
        const userSnapshot = await usersRef.once('value');
        const users = userSnapshot.val();

        const allAuthors = {...authors, ...users};


        const articlesRef = database.ref('articlesList/articles');
        const snapshot = await articlesRef.once('value');
        const articles = snapshot.val();
        let articlesArray = [];

        if (category && articles[category]) {
            articlesArray = Object.entries(articles[category]).map(([key, value]) => ({ key, ...value }));
        } else {
            for (const [cat, articlesInCategory] of Object.entries(articles)) {
                articlesArray = articlesArray.concat(
                    Object.entries(articlesInCategory).map(([key, value]) => ({ category: cat, key, ...value }))
                );
            }
        }



        // Sort articles by date, newest to oldest
        articlesArray.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (articlesArray.length > 0) {
            latestArticleDate = new Date(articlesArray[0].date);
            console.log(latestArticleDate)
        }else{
            console.log("Something went wrong")
        }

        const feed = new RSS({
            title: "Pulse Of The Underground",
            description: "An active news website for underground metal bands",
            feed_url: "https://pulse-of-the-underground.com/feed",
            site_url: "https://pulse-of-the-underground.com/",
            image_url: "https://pulse-of-the-underground.com/assets/PulseOfTheUnderground.jpg",
            managingEditor: "admin@pulse-of-the-undergroung.com (Pulse Of The Underground)",
            webMaster: "admin@pulse-of-the-undergroung.com (Pulse Of The Underground)",
            pubDate: latestArticleDate ? latestArticleDate.toUTCString() : new Date().toUTCString(),
        });

        articlesArray.forEach(article => {
            console.log(article)
            const item = {
                title: article.title,
                description: article.content ? article.content.replace(
                    "/assets",
                    "https://pulse-of-the-underground.com/assets"
                ) : '',
                url: `https://pulse-of-the-underground.com/article/${article.key.replaceAll(".json", "")}`,
                author: Object.keys(allAuthors).includes(article.author) ? allAuthors[article.author].displayName : 'Unknown',
                date: new Date(article.date),
                enclosure: { url: article.image },
            };
            feed.item(item);
        });

        const xml = feed.xml({ indent: true });
        res.set("Content-Type", "application/rss+xml");
        res.send(xml);
    } catch (error) {
        console.error("Error generating RSS feed:", error);
        res.status(500).send("Error generating RSS feed");
    }
});

const getArticle = async (req, res, folder) => {
    const filepath = path.resolve(__dirname, "index.html");
    const name = req.params.article;
    console.log("Hello, file requested is: " + JSON.stringify(req.params));

    try {
        // Retrieve file from Firebase Storage
        const fileRef = bucket.file(`${folder}/${name}.json`);
        const [fileExists] = await fileRef.exists();

        if (!fileExists) {
            throw new Error(`File not found: ${folder}/${name}.json`);
        }

        // Download file contents
        const fileData = await fileRef.download();
        const jsonData = JSON.parse(fileData.toString());
        //jsonData.img01 = await getFirebaseStorageUrl(jsonData.img01);
        // Read and replace placeholders in the HTML template
        let htmlData = fs.readFileSync(filepath, "utf-8");
        htmlData = htmlData.replace(/_TITLE_/g, jsonData.title.replaceAll("'", "&apos;"));
        htmlData = htmlData.replace(/_THUMB_/g, jsonData.img01);

        res.send(htmlData);
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).send("Error fetching article");
    }
};

function changeAnalysis(
    fileName,
    analysis_true,
    analysis_false,
    change_analysis
) {
    // Find the position of the last dot, which indicates the start of the extension
    const dotIndex = fileName.lastIndexOf(".");

    // If there's no dot, return the filename with the suffix appended
    if (dotIndex === -1) {

        return `${fileName}_${
            change_analysis ? analysis_true : analysis_false
        }`;
    }

    // Extract the name and extension parts
    const name = fileName.substring(0, dotIndex);
    const extension = fileName.substring(dotIndex);

    console.log(
        `${name}_${change_analysis ? analysis_true : analysis_false}${extension}`
    );

    // Construct the new filename
    return `${name}_${
        change_analysis ? analysis_true : analysis_false
    }${extension}`;
}

app.get("/article/:article", (req, res) => {
    getArticle(req, res, "articles").then();
});

app.get("/article/early/:article", (req, res) => {
    getArticle(req, res, "early_releases").then();
});

app.get("/author/*", async (req, res) => {
    const authorCode = req.params[0];
    let author = await database.ref(`/authors/${authorCode}`).get();
    if (!author.exists()) {
        author = await database.ref(`/users/${authorCode}`).get();
        if (!author.exists()) {
            return res.status(404).send("Author not found");
        }
    }

    author = author.val();
    const filepath = path.resolve(__dirname, "index.html");


    const updatedFile = bucket.file("profile_images/" + authorCode + "_600x600");

    // Generate a signed URL for the updated file
    const expirationDate = new Date('2025-03-01');  // March 1st, 2025
    const [url] = await updatedFile.getSignedUrl({
        action: 'read',
        expires: expirationDate,
    });

    try {
        // Read and replace placeholders in the HTML template
        let htmlData = fs.readFileSync(filepath, "utf-8");
        htmlData = htmlData.replace(/_TITLE_/g, author.displayName.replaceAll("'", '"'));
        htmlData = htmlData.replace(/_THUMB_/g, url);

        res.send(htmlData);
    } catch (error) {
        console.error("Error fetching author:", error);
        res.status(500).send("Error fetching author");
    }
})


// Express route to handle image requests
app.get("/assets/*", async (req, res) => {
    const imagePath = req.params[0];
    const fullScale = req.query.fullScale;
    let filePath = "images/" + imagePath;
    const file = bucket.file(filePath);

    try {
        // Check and update metadata if not already set
        const [metadata] = await file.getMetadata();
        if (!metadata.metadata.width) {
            const [fileBuffer] = await file.download(); // Download the image file to a buffer
            const dimensions = await getImageDimensionsBuffer(fileBuffer);
            const newMetadata = {
                metadata: {
                    width: dimensions.width.toString(),
                    height: dimensions.height.toString(),
                },
            };
            await file.setMetadata(newMetadata);
            metadata.metadata = newMetadata.metadata;
        }

        const {width, height} = metadata.metadata;
        const aspectRatio = width / height;
        const tolerance = 0.5;

        if (fullScale !== "true") {
            filePath = changeAnalysis(
                filePath,
                "800x800",
                "800x600",
                Math.abs(aspectRatio - 1) <= tolerance
            );
        }

        // Fetch the updated file path
        const updatedFile = bucket.file(filePath);

        // Generate a signed URL for the updated file
        const [url] = await updatedFile.getSignedUrl({
            action: 'read',
            expires: '03-01-2025',  // Set an appropriate expiration date
        });

        // Redirect to the signed URL
        res.redirect(url);
    } catch (error) {
        console.log("Error fetching file:", error);
        res.status(404).send("File not found");
    }
});

exports.webApi = functions
    .runWith({
        enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
    })
    .https.onRequest(app);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Article Upload Handling
------------------------------------------------------------------------------------------------------------------------------------------------------*/

const categories = {
    "Top News": 5,
    "General News": 1,
    "Interviews": 5,
    "Collabs and Sponsorships": 2,
    "Latest Reviews(ENG)": 3,
    "Latest Reviews(GRE)": 3,
    "Legends": 1
};

const handleArticleCategories = async (object) => {
    const filePath = object.name;
    const directory = path.dirname(filePath);
    // Only proceed if the uploaded file is a JSON file
    if (path.extname(filePath) !== '.json') {
        return null;
    }
    const directories = ['articles', 'early_releases', 'upload_from_authors'];
    await Promise.all(directories.map(async (dir) => {
        return handle_single_dir(dir)
    }));
}

const sanitizeKey = (key) => {
    return key
        .replaceAll(".", "/39")
        .replaceAll("#", "/40")
        .replaceAll("$", "/41")
        .replaceAll("/", "/42")
        .replaceAll("[", "/43")
        .replaceAll("]", "/44");
};

const filterUndefinedValues = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (!!value && !!key) {
            acc[key] = value;
        }
        return acc;
    }, {});
};

const handle_single_dir = async (directory) => {

    const [files] = await bucket.getFiles({prefix: directory});
    const articles = {};
    const allArticles = [];

    for (const file of files) {
        if (path.extname(file.name) !== '.json') {
            continue;
        }
        const fileContents = await file.download();
        const content = JSON.parse(fileContents[0].toString('utf8'));

        // Extract the newArticle name from the file name without the .json extension
        const newArticle = path.basename(file.name, '.json');

        // Extract categories (if multiple, split by comma and trim)
        const categories = content.category ? content.category.split(',').map(cat => cat.trim()) : ['undefined'];

        categories.forEach(category => {
            if (!articles[category]) {
                articles[category] = {};
            }
            articles[category][newArticle] = {
                "date": content.date.split('/').reverse().join('-'),
                "title": content.title,
                "image": content.img01,
                "translations": content.translations
                    ? filterUndefinedValues(content.translations)
                    : {},
                "lang": content.lang ? content.lang : "",
                "isReady": !!content.isReady,
                "sponsor": content.sponsor?content.sponsor:"",
                "author": content.sub
            };
        });

        // Collect all articles with their metadata
        allArticles.push({
            filename: newArticle,
            date: content.date ? new Date(content.date.split('/').reverse().join('-')) : new Date(),
            category: categories,
            "lang": content.lang ? content.lang : ""
        });

        // Update author's written articles
        let ref;
        if (content.translatedBy === undefined) {
            ref = database.ref(`/authors/${content.sub}/writtenArticles/${directory}/${categories[0]}`);
        } else {
            ref = database.ref(`/authors/${content.translatedBy}/writtenArticles/${directory}/${categories[0]}`);
        }
        try {
            ref.child(sanitizeKey(newArticle)).set({
                "date": content.date.split('/').reverse().join('-'),
                "title": content.title,
                "image": content.img01,
                "translations": content.translations
                    ? filterUndefinedValues(content.translations)
                    : {},
                "lang": content.lang ? content.lang : "",
                "isReady": !!content.isReady,
                "sponsor": content.sponsor?content.sponsor:""
            }).then(() => {
            }).catch((e) => {
            });
        } catch (e) {
            console.log(e);
        }
    }

    // Save articles in `articlesList` as lists of filenames
    const articlesList = {};
    for (const category in articles) {
        articlesList[category] = articles[category];
    }

    // Save `articlesList` in Firebase
    await database.ref(`/articlesList/${directory}`).set(articlesList);

    // Prepare to store latest articles for each category
    const latestArticlesByCategory = {};

    // Group all articles by category
    const articlesByCategory = {};
    allArticles.forEach(article => {
        if (!article.category) {
            if (!articlesByCategory["undefined"]) {
                articlesByCategory["undefined"] = [];
            }
            articlesByCategory["undefined"].push(article);
        } else {
            article.category.forEach(category => {
                if (!articlesByCategory[category]) {
                    articlesByCategory[category] = [];
                }
                articlesByCategory[category].push(article);
            })
        }
    });

    // Find the latest articles for each category
    for (const category in articlesByCategory) {
        // Sort articles by date in descending order
        articlesByCategory[category].sort((a, b) => b.date - a.date);

        // Get the latest date from the sorted list
        const latestDate = articlesByCategory[category][0].date;

        // Filter for articles with the latest date
        const latestArticles = articlesByCategory[category].filter(article => article.date.getTime() === latestDate.getTime());

        if (latestArticles.length > 0) {
            // Extract filenames of all latest articles in this category
            // Store the list of latest article filenames for the category
            latestArticlesByCategory[category] = latestArticles.map(article => article.filename);
        } else {
            // Handle case where no articles found for the latest date
            console.warn(`No latest article found for category '${category}'`);
            // You might want to set a default or handle this case accordingly
        }
    }

    // Save `latestArticlesByCategory` in Firebase under `articlesListLatestTest`
    await database.ref(`/articlesListLatest/${directory}`).set(latestArticlesByCategory);

    console.log('Articles organized and stored in the database successfully.');
    return null;
};


const getImageDimensions = async (object) => {
    const {name: filePath, contentType} = object;
    console.log('Processing file:', filePath);

    // Exit if not an image.
    if (!contentType.startsWith('image/')) {
        console.log('Skipping non-image:', filePath);
        return;
    }

    // Cloud Storage files.
    const file = bucket.file(filePath);

    try {
        // Download the image file to a buffer
        const [fileBuffer] = await file.download();
        console.log('The file has been downloaded to a buffer');

        // Get dimensions from the buffer
        const dimensions = await getImageDimensionsBuffer(fileBuffer);
        console.log(`Height:${dimensions.height} Width:${dimensions.width}`);

        // Update custom metadata with width and height
        const metadata = {
            metadata: {
                width: dimensions.width.toString(),
                height: dimensions.height.toString(),
            },
        };
        await file.setMetadata(metadata);
        console.log('Metadata updated successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

const sendNotofication = async (object) => {

    try {
        // Check if the uploaded file is under the 'articles' directory
        const filePath = object.name; // Full path of the uploaded file in Firebase Storage
        if (!filePath.startsWith("articles/")) {
            console.log(
                'Uploaded file is not in the "articles" directory. Skipping...'
            );
            return null;
        }

        // Extract the articleId from the file path
        const articleId = filePath.split("/")[1];

        // Prepare the notification payload with a link
        const payload = {
            notification: {
                title: "New Article Uploaded!",
                body: "Go to Pulse Of The Underground to read our new article",
                image: "https://pulse-of-the-underground.com/assets/PulseOfTheUnderground.jpg",
            },
            data: {
                articleId: articleId,
                url: `https://pulse-of-the-underground.com/article/${articleId.replace(
                    /\.json$/,
                    ""
                )}`,
            },
        };

        // Get registration tokens to send notifications (replace with your implementation)
        const tokens = await getDeviceTokens(); // Implement this function to fetch tokens

        // Send FCM notification to each device token
        const deleteTokensPromises = [];
        for (const token of tokens) {
            const message = {
                token: token,
                notification: payload.notification,
                data: payload.data,
            };
            try {
                await admin.messaging().send(message);
            } catch (error) {
                console.error("Error sending notification to token:", token, error);
                // If sending fails due to an error, delete the token from Realtime Database
                const tokenRef = database.ref(`deviceTokens/${token}`);
                deleteTokensPromises.push(tokenRef.remove());
            }
        }

        // Wait for all delete operations to complete
        await Promise.all(deleteTokensPromises);

        console.log("Notifications sent successfully");
    } catch (error) {
        console.error("Error sending notification:", error);
    }
}

function getImageDimensionsBuffer(buffer) {
    return new Promise((resolve, reject) => {
        const identifyProcess = spawn('identify', ['-format', '%wx%h', '-']);

        // Write buffer to the stdin of the identify process
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(identifyProcess.stdin);

        let decodedStdout = '';

        identifyProcess.stdout.on('data', (chunk) => {
            decodedStdout += chunk.toString();
        });

        identifyProcess.stderr.on('data', (error) => {
            console.error('Error:', error.toString());
            reject(new Error('Failed to identify image dimensions'));
        });

        identifyProcess.on('close', (code) => {
            if (code === 0) {
                const [width, height] = decodedStdout.trim().split('x');
                resolve({width: parseInt(width, 10), height: parseInt(height, 10)});
            } else {
                reject(new Error('identify command failed'));
            }
        });
    });
}

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
}

exports.handleDeleteArticle = functions.runWith(runtimeOpts).storage
    .object().onDelete(async (object) => {
        await Promise.all([handleArticleCategories(object)])
    })


exports.handleNewArticle = functions.runWith(runtimeOpts).storage
    .object()
    .onFinalize(async (object) => {
        await Promise.all([sendNotofication(object), handleArticleCategories(object), getImageDimensions(object)])
    });

// Function to fetch device tokens (registration tokens)
async function getDeviceTokens() {
    try {
        const tokensSnapshot = await database.ref("deviceTokens").once("value");
        const tokens = [];

        tokensSnapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            if (userData && userData.token) {
                tokens.push(userData.token);
            }
        });

        console.log("All device tokens:", tokens);
        return tokens;
    } catch (error) {
        console.error("Error retrieving device tokens:", error);
        return [];
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Handle admin show articles
 */

const fetchArticlesCategory = async (folder, currentPageToken, maxResults) => {
    try {
        const [files, pageToken] = await bucket.getFiles({
            prefix: folder,
            maxResults: maxResults,
            pageToken: currentPageToken
        });

        return {
            articles: await files.reduce(async (accPromise, file) => {
                const acc = await accPromise;

                const nameList = file.name.split("/");
                const fileName = nameList[nameList.length - 1];
                if (!fileName.endsWith(".json")) {
                    return acc;
                }

                try {
                    const [response] = await file.download();
                    const fileContent = JSON.parse(response.toString('utf8'));
                    acc.push({name: fileName, fileContent});
                } catch (error) {
                    console.error(`Error fetching file ${file.name}:`, error);
                }

                return acc;
            }, Promise.resolve([])), nextPageToken: pageToken
        };
    } catch (error) {
        console.error('Error fetching files:', error);
        throw new functions.https.HttpsError('unknown', 'Failed to fetch files');
    }
};

exports.fetchFiles = functions.runWith(runtimeOpts).https.onCall(async (data, context) => {
    try {
        const {folder, maxResults, pageToken} = data;
        const {articles, nextPageToken} = await fetchArticlesCategory(folder, pageToken, maxResults);
        return {articles, nextPageToken};
    } catch (error) {
        console.error('Error in fetchFiles:', error);
        throw new functions.https.HttpsError('unknown', 'Failed to fetch files');
    }
});


const fetchArticlesWithImages = async (authorCode) => {
    console.log("Starting fetch");

    try {
        const articlesRef = database.ref(!authorCode ? 'articlesList' : `authors/${authorCode}`);
        const snapshot = await articlesRef.once('value');
        const data = snapshot.val();

        if (!data) {
            throw new Error("No articles found");
        }

        const updatedData = {};

        const categories = Object.keys(data);
        await Promise.all(categories.map(async (category) => {
            console.log("category", category);
            const categoryData = data[category];
            const subCategories = Object.keys(categoryData);

            await Promise.all(subCategories.map(async (subCategory) => {
                const articles = !authorCode
                    ? categoryData[subCategory]
                    : Object.keys(categoryData[subCategory]);

                const fetchArticles = articles.map(async (articleKey) => {
                    try {
                        const articleUrl = await bucket.file(`${category}/${articleKey}.json`).download();
                        const article = JSON.parse(articleUrl.toString())


                        article.link = articleKey;
                        return article;
                    } catch (error) {
                        console.error("Error fetching article:", error);
                        return null;
                    }
                });

                const articlesWithImages = await Promise.all(fetchArticles);
                updatedData[category] = updatedData[category] || {};
                updatedData[category][subCategory] = articlesWithImages;
            }));
        }));

        return updatedData;
    } catch (error) {
        console.error("Error fetching articles with images:", error);
        throw new Error("Failed to fetch articles with images");
    }
};

exports.fetchArticlesWithImagesFunction = functions.https.onCall(async (data, context) => {
    const {authorCode} = data;

    try {
        const result = await fetchArticlesWithImages(authorCode);
        return result;
    } catch (error) {
        console.error("Error in fetchArticlesWithImagesFunction:", error);
        throw new functions.https.HttpsError('unknown', 'Failed to fetch articles with images');
    }
});


exports.fetchImagesFromGalleryFunction = functions.https.onCall(async (data, context) => {
    const {authorCode} = data;

    try {
        const galleryRef = database.ref('/gallery/uploaded');
        const snapshot = await galleryRef.once('value');
        const data = snapshot.val();

        if (!data) {
            return null;
        }

        return data.filter(d => d.title === authorCode);
    } catch (error) {
        console.error("Error fetching images from gallery:", error);
        throw new functions.https.HttpsError('unknown', 'Failed to fetch images from gallery');
    }
});


exports.saveDeviceToken = functions.https.onCall(async (data, context) => {
    try {
        const {token} = data;

        if (!token) {
            throw new functions.https.HttpsError('invalid-argument', 'Token must be provided');
        }

        // Check if the token already exists in the database
        const snapshot = await database.ref('deviceTokens').orderByChild('token').equalTo(token).once('value');
        if (snapshot.exists()) {
            console.log('Device token already exists.');
            return {message: 'Device token already exists'};
        }

        // Save the token under the user's UID in the database
        await database.ref('deviceTokens').push({token});

        return {message: 'Device token saved successfully'};
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error saving device token', error.message);
    }
});


async function getUser(id, isEmail) {
    let user;
    if (isEmail) {
        user = await admin.auth().getUserByEmail(id);
    } else {
        user = await admin.auth().getUser(id)
    }
    return user;
}

async function setDatabase(claim, table, user){
    console.log(claim, table, user);
    if (claim) {
        let userData={}
        let originalDoc;

        try {
            originalDoc = database.ref(`/users/${user.uid}`)
            const data = await originalDoc.get()
            userData = data.val();
        }catch (e) {
            console.log("User was not found on the table")
        }


        const userDoc = database.ref(`/${table}/${user.uid}`) // Use Firestore
        await userDoc.set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL?user.photoURL:"",
            ...userData
        });
        if(!!originalDoc) {
            await originalDoc.remove();
        }
    } else {
        const userDoc = database.ref("/users/" + user.uid) // Use Firestore
        let userData={}
        let originalDoc;

        try {
            originalDoc = database.ref(`/${table}/${user.uid}`)
            const data = await originalDoc.get()
            userData = data.val();
        }catch (e) {
            console.log("User was not found on the table")
        }

        await userDoc.update({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL?user.photoURL:"",
            ...userData
        });
        if(!!originalDoc) {
            await originalDoc.remove();
        }
    }
}


exports.setCustomClaim = functions.https.onCall(async (data, context) => {
    const {id, isEmail, claim} = data;
    const isAdmin = context.auth && context.auth.token.admin
    const registeringAsBand=Object.keys(claim).includes("band")&&Object.keys(claim).length<2
    const isPaul = (await getUser(context.auth.uid, false)).email==="pavlos@orfanidis.net.gr";
    // Check if request is made by an authenticated user with admin privileges
    if (!isAdmin&&!registeringAsBand&&!isPaul) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called by an authenticated admin.'+JSON.stringify(claim));
    }
    let user;
    try {
        user = await getUser(id, isEmail);
    } catch (e) {
        throw new functions.https.HttpsError('failed-precondition', e.message);
    }

    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid email.');
    }

    try {
        // Get user by email
        // Set custom user claims
        await admin.auth().setCustomUserClaims(user.uid, {
            ...user.customClaims,
            ...claim
        });
        // Write user info to Firestore (or Realtime Database)
        console.log(claim);
        if(Object.keys(claim).includes("admin")) {
            await setDatabase(claim.admin, "authors", user);
        }
        if(Object.keys(claim).includes("band")) {
            await setDatabase(claim.band, "band", user);
        }
        return {message: `Successfully set the role for user ${user.uid}`};
    } catch (error) {
        console.error('Error setting custom claims:', error);
        throw new functions.https.HttpsError('internal', 'Unable to set custom claims or write user data.');
    }
});


// Function to disable a user
exports.disableUser = functions.https.onCall(async (data, context) => {
    // Check if request is made by an authenticated user with admin privileges
    if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called by an authenticated admin.');
    }

    const {id, isEmail, disabled} = data;

    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid email.');
    }

    try {
        // Get user by email
        const user = await getUser(id, isEmail);

        // Disable user
        await admin.auth().updateUser(user.uid, {disabled: disabled});
        const adminClaims = user.customClaims.admin;

        const userFolder = database.ref(`/${adminClaims ? "authors" : "users"}/${user.uid}`)
        await userFolder.update({
            disabled: disabled
        })
        return {message: `Successfully disabled user ${user.uid}`};
    } catch (error) {
        console.error('Error disabling user:', error);
        throw new functions.https.HttpsError('internal', 'Unable to disable user.');
    }
});


const axios = require('axios');


exports.getDnsLoc = functions.https.onCall(async (data, context) => {
    return "37 58 38.396 N 23 42 38.719 E 0.00m 3m 5m 5m\n" +
        "39 39 36.345 N 20 50 56.432 E 5.00m 30m 5m 5m";
});