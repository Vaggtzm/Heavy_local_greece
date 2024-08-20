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

/*------------------------------------------------------------------------------------------------------------------------------------------------------
ARTICLE HANDLING
------------------------------------------------------------------------------------------------------------------------------------------------------*/
const {bucket, database} =require("./utils");

const express = require("express");
const app = express();
const RSS = require("rss");
const fs = require("fs");
const path = require("path");


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
            articlesArray = Object.entries(articles[category]).map(([key, value]) => ({key, ...value}));
        } else {
            for (const [cat, articlesInCategory] of Object.entries(articles)) {
                articlesArray = articlesArray.concat(
                    Object.entries(articlesInCategory).map(([key, value]) => ({category: cat, key, ...value}))
                );
            }
        }


        // Sort articles by date, newest to oldest
        articlesArray.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (articlesArray.length > 0) {
            latestArticleDate = new Date(articlesArray[0].date);
            console.log(latestArticleDate)
        } else {
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
                enclosure: {url: article.image},
                categories: [category]
            };
            feed.item(item);
        });

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
    console.log(`Checking /authors/${authorCode}`);
    let author = await database.ref(`/authors/${authorCode}`).get();
    if (!author.exists()) {
        console.warn(`Not found in /authors, checking /users/${authorCode}`);
        author = await database.ref(`/users/${authorCode}`).get();
        if (!author.exists()) {
            console.warn(`Not found in /users either`);
            return res.status(404).send("Author not found");
        }
    }
    console.warn(`Found author: ${author.val().displayName}`);

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
        htmlData = htmlData.replace(/_TITLE_/g, author.displayName ? author.displayName.replaceAll("'", '"') : "Pulse Of The Underground");
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

module.exports= {webApp: app, getImageDimensionsBuffer, changeAnalysis}