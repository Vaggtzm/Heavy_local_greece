/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const {bucket, runtimeOpts} = require("./utils");
const {spawn} = require("child_process");
const stream = require("stream");

const functions = require("firebase-functions");
const path = require("path");
const {database} = require("./utils");
const DeleteArticle = functions.runWith(runtimeOpts).storage
    .object().onDelete(async (object) => {

        const filePath = object.name;
        // Exit early if the file is not a JSON file
        if (path.extname(filePath) !== '.json') {
            return null;
        }
        const directory = path.dirname(filePath);
        const articleName = path.basename(filePath, '.json');

        // Retrieve existing articles from Firebase
        const articlesListSnapshot = await database.ref(`/articlesList/${directory}`).once('value');
        const existingArticlesList = articlesListSnapshot.val() || {};

        let articleCategory = null;
        let author = null;
        let translator = null;
        let updatedArticlesList = {...existingArticlesList};

        // Remove the deleted article from articles list
        for (const category in updatedArticlesList) {
            if (updatedArticlesList[category][articleName]) {
                articleCategory = category;
                author = updatedArticlesList[category][articleName].author;
                translator = updatedArticlesList[category][articleName].translations
                    ? updatedArticlesList[category][articleName].translations.translatedBy
                    : null;
                delete updatedArticlesList[category][articleName];
                break;
            }
        }

        // Update the articles list in Firebase
        await database.ref(`/articlesList/${directory}`).set(updatedArticlesList);

        // Update the latest articles list if necessary
        if (articleCategory) {
            const articlesByCategorySnapshot = await database.ref(`/articlesListLatest/${directory}`).once('value');
            const articlesByCategory = articlesByCategorySnapshot.val() || {};

            if (articlesByCategory[articleCategory]) {
                articlesByCategory[articleCategory] = articlesByCategory[articleCategory].filter(article => article !== articleName);
                await database.ref(`/articlesListLatest/${directory}`).set(articlesByCategory);
            }
        }

        // Update author's written articles
        if (author) {
            await removeAuthorArticle(directory, articleCategory, author, articleName);
        }

        // Update translator's written articles if applicable
        if (translator) {
            await removeAuthorArticle(directory, articleCategory, translator, articleName);
        }

        console.log(`Article ${articleName} deleted and database updated successfully.`);
        return null;
    })

const removeAuthorArticle = async (directory, category, author, articleName) => {
    const authorRef = database.ref(`/authors/${author}/writtenArticles/${directory}/${category}`);
    const authorArticlesSnapshot = await authorRef.once('value');
    const authorArticles = authorArticlesSnapshot.val() || {};

    if (authorArticles[articleName]) {
        delete authorArticles[articleName];
        await authorRef.set(authorArticles);
    }
};

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

const sendNotofication = async (object) => {

    try {
        // Check if the uploaded file is under the 'articles' directory
        const filePath = object.name; // Full path of the uploaded file in Firebase Storage
        if (!filePath.startsWith("articles/")) {
            /**console.log(
             'Uploaded file is not in the "articles" directory. Skipping...'
             );**/
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
                //console.error("Error sending notification to token:", token, error);
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

const handleArticleCategories = async (object) => {
    const filePath = object.name;
    const directory = path.dirname(filePath);

    // Only proceed if the uploaded file is a JSON file
    if (path.extname(filePath) !== '.json') {
        return null;
    }
    const directories = ['articles', 'early_releases', 'upload_from_authors'];
    const relevantDirectories = directories.filter(dir => directory.includes(dir));

    // Check if any relevant directory exists in the directory path
    if (relevantDirectories.length === 0) {
        console.log('The file is not in a relevant directory.');
        return null; // Exit the function if the directory is not relevant
    }

    await handle_single_file(object);
};

/*const categories = {
    "Top News": 5,
    "General News": 1,
    "Interviews": 5,
    "Collabs and Sponsorships": 2,
    "Latest Reviews(ENG)": 3,
    "Latest Reviews(GRE)": 3,
    "Legends": 1
};*/

const handle_single_file = async (file) => {
    const filePath = file.name;
    const directory = path.dirname(filePath); // Folder where the file is saved
    const fileContents = await bucket.file(filePath).download();
    const content = JSON.parse(fileContents[0].toString());
    console.log(content);

    const newArticle = path.basename(file.name, '.json'); // File name without .json extension
    const category = content.category || 'undefined';

    const articles = {}; // Initialize articles object
    if (!articles[category]) {
        articles[category] = {};
    }

    // Organizing article content
    articles[category][newArticle] = {
        "date": content.date.split('/').reverse().join('-'),
        "title": content.title,
        "image": content.img01,
        "translations": content.translations ? filterUndefinedValues(content.translations) : {},
        "lang": content.lang || "",
        "isReady": !!content.isReady,
        "sponsor": content.sponsor || "",
        "author": content.sub,
        "authorApproved": content.authorApproved || false,
        "translatedBy": content.translatedBy || ""
    };

    const allArticles = [{
        filename: newArticle,
        date: content.date ? new Date(content.date.split('/').reverse().join('-')) : new Date(),
        category: category,
        "lang": content.lang || "",
        "articleData": articles[category][newArticle]  // Store the entire article data here
    }];

    // Reference for uploading the article data based on whether it's written or translated
    let ref;
    if (content.translatedBy === undefined) {
        ref = database.ref(`/authors/${content.sub}/writtenArticles/${newArticle}`);
    } else {
        ref = database.ref(`/authors/${content.translatedBy}/writtenArticles/${newArticle}`);
    }

    try {
        // Upload current file's content to /articleList/{folder}/{category}/{filename without .json}
        await ref.child(sanitizeKey(newArticle)).set(articles[category][newArticle]);
        await database.ref(`/articleList/${directory}/${category}/${newArticle}`).set(articles[category][newArticle]);
    } catch (e) {
        console.log(e);
    }

    // Get existing articles in the directory from the database
    const articlesListSnapshot = await database.ref(`/articlesList/${directory}`).once('value');
    const existingArticlesList = articlesListSnapshot.val() || {};

    // Update the articles list
    const updatedArticlesList = { ...existingArticlesList };
    if (!updatedArticlesList[category]) {
        updatedArticlesList[category] = {};
    }
    updatedArticlesList[category] = { ...updatedArticlesList[category], ...articles[category] };

    // Save the updated articles list to /articlesList/{folder}
    await database.ref(`/articlesList/${directory}`).set(updatedArticlesList);

    // Get today's date and the date seven days ago
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Filter articles that belong to the current category, are from the last 7 days, and are not translated
    const categoryArticles = allArticles.filter(article =>
        article.category === category &&
        article.date >= sevenDaysAgo &&
        article.date <= today &&
        !article.translatedBy
    );

    // Prepare the latest articles data to be uploaded
    const latestArticlesByCategory = {
        [category]: categoryArticles.reduce((acc, article) => {
            acc[article.filename] = article.articleData;
            return acc;
        }, {})
    };

    // Upload the latest articles (from last 7 days) to /articlesListLatest/{folder}/{category}
    await database.ref(`/articlesListLatest/${directory}/${category}`).set(latestArticlesByCategory);

    console.log('Article organized and stored in the database successfully.');
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

const handleNewArticleFunction = functions.runWith(runtimeOpts).storage
    .object()
    .onFinalize(async (object) => {
        await Promise.all([sendNotofication(object), getImageDimensions(object), handleArticleCategories(object)])
    });

module.exports = {
    DeleteArticle, handleNewArticleFunction
}