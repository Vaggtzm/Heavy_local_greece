const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('./heavy-local-admin.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'heavy-local-12bc4.appspot.com',
    databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
});

const database = admin.database();

const sanitizeKey = (key) => key.replace(/[^a-zA-Z0-9]/g, '_');

// Helper function to calculate the date 7 days ago
const getSevenDaysAgo = () => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return today;
};

// Function to process articles in articlesList and store the last 7 days in articlesListLatest
const updateLatestArticles = async () => {
    try {
        const articlesListSnapshot = await database.ref(`/articlesList`).once('value');
        const articlesList = articlesListSnapshot.val() || {};

        const sevenDaysAgo = getSevenDaysAgo();
        const latestArticles = {};

        // Iterate over each directory in articlesList
        Object.entries(articlesList).forEach(([directory, categories]) => {
            latestArticles[directory] = latestArticles[directory] || {};

            // Iterate over each category
            Object.entries(categories).forEach(([category, articles]) => {
                const recentArticles = {};

                // Filter articles within the last 7 days
                Object.entries(articles).forEach(([filename, articleData]) => {
                    const articleDate = new Date(articleData.date); // Assuming format is YYYY-MM-DD
                    if (articleDate >= sevenDaysAgo) {
                        recentArticles[filename] = articleData;
                    }
                });

                // If recent articles found for the category, add them to latestArticles
                if (Object.keys(recentArticles).length > 0) {
                    latestArticles[directory][category] = recentArticles;
                }
            });
        });

        // Store latest articles in /articlesListLatest
        await database.ref(`/articlesListLatest`).set(latestArticles);

        console.log("Updated articlesListLatest with the last 7 days of articles.");
    } catch (error) {
        console.error("Error updating articlesListLatest:", error);
    }
};
console.log("Running")
// Run the function
updateLatestArticles().then(() => {
    console.log('articlesListLatest updated successfully.');
}).catch((error) => {
    console.error('Error updating articlesListLatest:', error);
});
