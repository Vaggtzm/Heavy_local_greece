
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const RSS = require('rss');

const path = require ('path');
const fs = require('fs');

const serviceAccount = require('./heavy-local-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://heavy-local-12bc4-default-rtdb.firebaseio.com'
});






/*------------------------------------------------------------------------------------------------------------------------------------------------------
ARTICLE HANDLING
------------------------------------------------------------------------------------------------------------------------------------------------------*/



const bucket = admin.storage().bucket('heavy-local-12bc4.appspot.com');
const database = admin.database();

app.get('/feed', async (req, res) => {
    const feed = new RSS({
        title: 'Heavy Local Greece',
        description: 'An active news website for underground metal bands',
        feed_url: 'https://heavy-local.com/feed',
        site_url: 'https://heavy-local.com',
        image_url: 'https://heavy-local.com/favicon.png',
        managingEditor: 'heavylocalgreece@gmail.com (Heavy Local Greece)',
        webMaster: 'heavylocalgreece@gmail.com (Heavy Local Greece)',
        pubDate: new Date().toUTCString()
    });

    try {
        let files = [];
        let nextPageToken = undefined;

        do {
            const [result] = await bucket.getFiles({
                prefix: 'articles/',
                maxResults: 1000,
                pageToken: nextPageToken
            });

            files = files.concat(result);

            nextPageToken = result.nextPageToken;
        } while (nextPageToken);

        const promises = files.map(async file => {
            const [metadata] = await file.getMetadata();

            if (!metadata.contentType.startsWith('application/json')) {
                return; // Skip non-JSON files
            }

            const articleData = await file.download();
            const article = JSON.parse(articleData.toString());

            let parts_of_date = article.date.split("/");

            const item = {
                title: article.title,
                description: article.content.replace("/assets","https://heavy-local.com/assets"),
                url: `https://heavy-local.com/article/${file.name.split('/').pop().replace('.json', '')}`,
                author: article.sub,
                date: new Date(+parts_of_date[2], parts_of_date[1] - 1, +parts_of_date[0]),
                enclosure: { url: article.img01 }
            };

            feed.item(item);
        });

        await Promise.all(promises);

        const xml = feed.xml({ indent: true });
        res.set('Content-Type', 'application/rss+xml');
        res.send(xml);
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        res.status(500).send('Error generating RSS feed');
    }
});


app.get('/article/:article', async (req, res) => {
    const filepath = path.resolve(__dirname, "index.html");
    const name = req.params.article;
    console.log("Hello, file requested is: "+JSON.stringify(req.params));

    try {
        // Retrieve file from Firebase Storage
        const fileRef = bucket.file(`articles/${name}.json`);
        const [fileExists] = await fileRef.exists();

        if (!fileExists) {
            throw new Error(`File not found: articles/${name}.json`);
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
        console.error('Error fetching article:', error);
        res.status(500).send('Error fetching article');
    }
});

app.get('/assets/*', async (req, res) => {
    const imagePath = req.params[0];
    const filePath = "images/" + imagePath;
    try {
    const file = await bucket.file(filePath).download();
    const [metadata] = await bucket.file(filePath).getMetadata();

    if (metadata && metadata.contentType) {
        res.contentType(metadata.contentType); // Set content type based on file's contentType
    } else {
        res.contentType('application/octet-stream'); // Fallback content type for unknown file types
    }

    res.send(file[0]);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(404).send('File not found');
    }
});

exports.webApi = functions.runWith({
    enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
}).https.onRequest(app);



/*------------------------------------------------------------------------------------------------------------------------------------------------------
NOTIFICATION HANDLING
------------------------------------------------------------------------------------------------------------------------------------------------------*/

exports.sendNotification = functions.storage.object().onFinalize(async (object) => {
    try {
        // Check if the uploaded file is under the 'articles' directory
        const filePath = object.name; // Full path of the uploaded file in Firebase Storage
        if (!filePath.startsWith('articles/')) {
            console.log('Uploaded file is not in the "articles" directory. Skipping...');
            return null;
        }

        // Extract the articleId from the file path
        const articleId = filePath.split('/')[1];

        // Prepare the notification payload with a link
        const payload = {
            notification: {
                title: 'New Article Uploaded!',
                body: 'Go to Heavy Local to read our new article',
                image: 'https://heavy-local.com/favicon.png'
            },
            data: {
                articleId: articleId,
                url: `https://heavy-local.com/article/${articleId.replace(/\.json$/, '')}`,
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
                console.error('Error sending notification to token:', token, error);
                // If sending fails due to an error, delete the token from Realtime Database
                const tokenRef = database.ref(`deviceTokens/${token}`);
                deleteTokensPromises.push(tokenRef.remove());
            }
        }

        // Wait for all delete operations to complete
        await Promise.all(deleteTokensPromises);

        console.log('Notifications sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
});

// Function to fetch device tokens (registration tokens)
async function getDeviceTokens() {
    try {
        const tokensSnapshot = await database.ref('deviceTokens').once('value');
        const tokens = [];

        tokensSnapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            if (userData && userData.token) {
                tokens.push(userData.token);
            }
        });

        console.log('All device tokens:', tokens);
        return tokens;
    } catch (error) {
        console.error('Error retrieving device tokens:', error);
        return [];
    }
}

exports.saveDeviceToken = functions.runWith({
    enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
}).https.onRequest(async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Missing device token.' });
    }

    try {
        // Check if the device token already exists in the database
        const snapshot = await database.ref('deviceTokens').orderByChild('token').equalTo(token).once('value');
        if (snapshot.exists()) {
            return res.status(200).json({ message: 'Device token already exists.' });
        }

        // Save the device token to Firebase Realtime Database
        await database.ref('deviceTokens').push({
            token,
        });

        return res.status(200).json({ message: 'Device token saved successfully.' });
    } catch (error) {
        console.error('Error saving device token:', error);
        return res.status(500).json({ error: 'Failed to save device token.' });
    }
});
