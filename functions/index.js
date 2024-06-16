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
    const feed = new RSS({
        title: "Pulse Of The Underground",
        description: "An active news website for underground metal bands",
        feed_url: "https://pulse-of-the-underground.com/feed",
        site_url: "https://pulse-of-the-underground.com/",
        image_url: "https://pulse-of-the-underground.com/assets/PulseOfTheUnderground.jpg",
        managingEditor: "admin@pulse-of-the-undergroung.com (Pulse Of The Underground)",
        webMaster: "admin@pulse-of-the-undergroung.com (Pulse Of The Underground)",
        pubDate: new Date().toUTCString(),
    });

    try {
        let files = [];
        let nextPageToken = undefined;

        do {
            const [result] = await bucket.getFiles({
                prefix: "articles/",
                maxResults: 1000,
                pageToken: nextPageToken,
            });

            files = files.concat(result);

            nextPageToken = result.nextPageToken;
        } while (nextPageToken);

        const promises = files.map(async (file) => {
            const [metadata] = await file.getMetadata();

            if (!metadata.contentType.startsWith("application/json")) {
                return; // Skip non-JSON files
            }

            const articleData = await file.download();
            const article = JSON.parse(articleData.toString());

            let parts_of_date = article.date.split("/");

            const item = {
                title: article.title,
                description: article.content.replace(
                    "/assets",
                    "https://pulse-of-the-underground.com/assets"
                ),
                url: `https://pulse-of-the-underground.com/article/${file.name
                    .split("/")
                    .pop()
                    .replace(".json", "")}`,
                author: article.sub,
                date: new Date(
                    +parts_of_date[2],
                    parts_of_date[1] - 1,
                    +parts_of_date[0]
                ),
                enclosure: {url: article.img01},
            };

            feed.item(item);
        });

        await Promise.all(promises);

        const xml = feed.xml({indent: true});
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
        htmlData = htmlData.replace(/_TITLE_/g, jsonData.title);
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

app.get("/author/*",async (req, res)=>{
    const authorCode = req.params[0];
    let author = await database.ref(`/authors/${authorCode}`).get();
    if(!author.exists()){
        return res.status(404).send("Author not found");
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
        htmlData = htmlData.replace(/_TITLE_/g, author.displayName.replaceAll("'",'"'));
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

        const { width, height } = metadata.metadata;
        const aspectRatio = width / height;
        const tolerance = 0.5;

        if(fullScale!=="true") {
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
Article Upload Hndling
------------------------------------------------------------------------------------------------------------------------------------------------------*/

const categories = {
    "Top News":5,
    "General News":1,
    "Interviews":5,
    "Collabs and Sponsorships":2,
    "Latest Reviews(ENG)":3,
    "Latest Reviews(GRE)":3,
    "Legends":1
};

const handleArticleCategories = async (object) => {
    const filePath = object.name;
    const directory = path.dirname(filePath).split('/').join('_');

    // Only proceed if the uploaded file is a JSON file
    if (path.extname(filePath) !== '.json') {
        return null;
    }

    const [files] = await bucket.getFiles({ prefix: path.dirname(filePath) });
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
                articles[category] = [];
            }
            articles[category].push(newArticle);
        });

        // Collect all articles with their metadata
        allArticles.push({
            filename: newArticle,
            date: content.date ? new Date(content.date.split('/').reverse().join('-')) : new Date(),
            categories
        });

        // Update author's written articles
        let ref;
        if (content.translatedBy === undefined) {
            ref = database.ref(`/authors/${content.sub}/writtenArticles/${directory}/${categories[0]}`);
        } else {
            ref = database.ref(`/authors/${content.translatedBy}/writtenArticles/${directory}/${categories[0]}`);
        }
        await ref.child(newArticle).set(true);
    }

    // Save articles in `articlesList` as lists of filenames
    const articlesList = {};
    for (const category in articles) {
        articlesList[category] = articles[category];
    }

    // Save `articlesList` in Firebase
    await admin.database().ref(`/articlesList/${directory}`).set(articlesList);

    // Prepare to store latest articles for each category
    const latestArticlesByCategory = {};

    // Group all articles by category
    const articlesByCategory = {};
    allArticles.forEach(article => {
        article.categories.forEach(category => {
            if (!articlesByCategory[category]) {
                articlesByCategory[category] = [];
            }
            articlesByCategory[category].push(article);
        });
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
            const latestArticleFilenames = latestArticles.map(article => article.filename);

            // Store the list of latest article filenames for the category
            latestArticlesByCategory[category] = latestArticleFilenames;
        } else {
            // Handle case where no articles found for the latest date
            console.warn(`No latest article found for category '${category}'`);
            // You might want to set a default or handle this case accordingly
        }
    }

    // Save `latestArticlesByCategory` in Firebase under `articlesListLatestTest`
    await admin.database().ref(`/articlesListLatest/${directory}`).set(latestArticlesByCategory);

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


exports.handleNewArticle = functions.storage
    .object()
    .onFinalize(async (object)=>{
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

exports.saveDeviceToken = functions
    .runWith({
        enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
    })
    .https.onRequest(async (req, res) => {
        const {token} = req.body;

        if (!token) {
            return res.status(400).json({error: "Missing device token."});
        }

        try {
            // Check if the device token already exists in the database
            const snapshot = await database
                .ref("deviceTokens")
                .orderByChild("token")
                .equalTo(token)
                .once("value");
            if (snapshot.exists()) {
                return res
                    .status(200)
                    .json({message: "Device token already exists."});
            }

            // Save the device token to Firebase Realtime Database
            await database.ref("deviceTokens").push({
                token,
            });

            return res
                .status(200)
                .json({message: "Device token saved successfully."});
        } catch (error) {
            console.error("Error saving device token:", error);
            return res.status(500).json({error: "Failed to save device token."});
        }
    });



exports.deleteUserFromAuthors = functions.auth.user().onDelete((user) => {
    const userId = user.uid;

    return admin.database().ref(`/authors/${userId}`).remove();
});
