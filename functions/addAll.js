const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceAccount = require('./heavy-local-admin.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // Use your service account key
    storageBucket: 'heavy-local-12bc4.appspot.com', // Replace with your Firebase Storage bucket name
    databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
});

// Initialize Google Cloud Storage with credentials
const storage = new Storage({
    projectId: serviceAccount.project_id,
    credentials: serviceAccount
});
const bucket = storage.bucket(admin.app().options.storageBucket);
const database = admin.database();

const sanitizeKey = (key) => key.replace(/[^a-zA-Z0-9]/g, '_');

// Helper function to filter undefined values in translations
const filterUndefinedValues = (translations) => {
    return Object.fromEntries(Object.entries(translations).filter(([_, v]) => v !== undefined));
};

// Function to process all files in the articles directory
const processAllFilesInArticlesDirectory = async () => {
    const [files] = await bucket.getFiles({ prefix: 'articles/' }); // List all files in the 'articles' directory

    for (const file of files) {
        const filePath = file.name;
        const directory = path.dirname(filePath);
        const fileName = path.basename(filePath);

        // Only process JSON files
        if (!fileName.endsWith('.json')) {
            console.log(`Skipping non-JSON file: ${filePath}`);
            continue;
        }

        try {
            const fileContents = await file.download();
            const content = JSON.parse(fileContents[0].toString());
            console.log(`Processing file: ${filePath}`);

            const newArticle = path.basename(fileName, '.json');
            const category = content.category || 'undefined';

            const articles = {};
            if (!articles[category]) {
                articles[category] = {};
            }

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
                "articleData": articles[category][newArticle]
            }];

            let ref;
            if (content.translatedBy === undefined) {
                ref = database.ref(`/authors/${content.sub}/writtenArticles/${newArticle}`);
            } else {
                ref = database.ref(`/authors/${content.translatedBy}/writtenArticles/${newArticle}`);
            }

            // Upload current file to /articleList/{folder}/{category}/{filename without .json}
            await ref.child(sanitizeKey(newArticle)).set(articles[category][newArticle]);
            await database.ref(`/articleList/${directory}/${category}/${newArticle}`).set(articles[category][newArticle]);

            // Retrieve existing articles list for the directory
            const articlesListSnapshot = await database.ref(`/articlesList/${directory}`).once('value');
            const existingArticlesList = articlesListSnapshot.val() || {};

            const updatedArticlesList = { ...existingArticlesList };
            if (!updatedArticlesList[category]) {
                updatedArticlesList[category] = {};
            }
            updatedArticlesList[category] = { ...updatedArticlesList[category], ...articles[category] };

            // Update /articlesList
            await database.ref(`/articlesList/${directory}`).set(updatedArticlesList);

            // Find articles within the last 7 days
            const today = new Date();
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);

            const categoryArticles = allArticles.filter(article =>
                article.category === category &&
                article.date <= sevenDaysAgo &&
                !article.translatedBy
            );

            // Store the latest articles in /articlesListLatest
            const latestArticlesByCategory = {
                [category]: categoryArticles.reduce((acc, article) => {
                    acc[article.filename] = article.articleData;
                    return acc;
                }, {})
            };

            await database.ref(`/articlesListLatest/${directory}`).set(latestArticlesByCategory);

            console.log(`Article from file ${filePath} processed and stored successfully.`);
        } catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
        }
    }
};

// Run the process
processAllFilesInArticlesDirectory().then(() => {
    console.log('All files in articles directory processed.');
}).catch((error) => {
    console.error('Error processing files:', error);
});
