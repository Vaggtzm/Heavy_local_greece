
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const RSS = require('rss');

const path = require ('path');
const fs = require('fs');

admin.initializeApp();

const bucket = admin.storage().bucket();

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
        const fileRef = admin.storage().bucket().file(`articles/${name}.json`);
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