const RSS = require('rss');
const axios = require('axios');
const functions = require('firebase-functions');

// Function to read the contents of the JSON files
async function readJSONFileFromURL(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error reading file from URL ${url}:`, error.message);
        return null;
    }
}

// Function to fetch articles list from the URL
async function fetchArticlesList(url) {
    try {
        const response = await axios.get(url);
        return response.data.split('\n').filter(Boolean);
    } catch (error) {
        console.error('Error fetching articles list:', error.message);
        return [];
    }
}

exports.generateRSS = functions.https.onRequest(async (req, res) => {
    const ARTICLES_URL = 'https://heavy-local.com/articles/articles.txt';
    fetchArticlesList(ARTICLES_URL)
        .then(async articlesList => {
            // Create a new RSS feed
            const feed = new RSS({
                title: 'Heavy Local Articles',
                description: 'Latest articles from Heavy Local',
                feed_url: 'https://heavy-local.com/rss',
                site_url: 'https://heavy-local.com',
                pubDate: new Date(),
            });

            // Process each article
            for (const article of articlesList) {
                const articleData = readJSONFileFromURL(`https://heavy-local.com/articles/${article}.json`);
                if (articleData) {
                    const articleUrl = `https://heavy-local.com/article/${article}`;
                    feed.item({
                        title: articleData.title,
                        description: articleData.content,
                        url: articleUrl,
                        guid: articleUrl,
                        date: new Date(articleData.date),
                    });
                }
            }

            // Generate the RSS feed XML
            const rssFeedXML = feed.xml();

            // Write the RSS feed XML to a file
            res.set('Content-Type', 'text/xml');
            res.status(200).send(rssFeedXML);
            console.log('RSS feed generated successfully!');
        })
        .catch(error => {
            res.status(500).send('Error fetching articles list:', error.message);
        });
});