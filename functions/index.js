const RSS = require('rss');
const axios = require('axios');
const functions = require('firebase-functions');
const express = require('express');
const app = express()

const moment = require('moment');


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

//const  generateRSS = async (req, res) => {
  //  const ARTICLES_URL = 'https://heavy-local.com/articles/articles.txt';
    //fetchArticlesList(ARTICLES_URL)
      //  .then(async articlesList => {
        //    // Create a new RSS feed
          //  const feed = new RSS({
            //    title: 'Heavy Local Articles',
              //  description: 'Latest articles from Heavy Local',
                //feed_url: 'https://heavy-local.com/rss',
                //site_url: 'https://heavy-local.com',
               // pubDate: new Date(),
            //});

            // Process each article
            //for (const article of articlesList) {
              //  const articleData = await readJSONFileFromURL(`https://heavy-local.com/articles/${article}.json`);
                //if (articleData) {
                  //  const articleUrl = `https://heavy-local.com/article/${article}`;
                    //feed.item({
                      //  title: articleData.title,
                        //description: articleData.content,
                        //url: articleUrl,
                       // date: moment(articleData.date, "DD/MM/YYYY").format("ddd, DD MMM YYYY HH:mm:ss ZZ"),
                    //});
                    //console.log(articleData)
                //}
            //}

            // Generate the RSS feed XML
            //const rssFeedXML = feed.xml({indent: true});

            // Write the RSS feed XML to a file
            //res.set('Content-Type', 'text/xml');
            //res.status(200).send(rssFeedXML);
            //console.log('RSS feed generated successfully!');
        //})
        //.catch(error => {
          //  res.status(500).send('Error fetching articles list:', error.message);
        //});
//}
app.get('/article/:name', async(req ,res)=>{
    const filepath = path.resolve(__dirname ,"./build" , "index.html")
    const name = req.params.name;
    try{
        const response = await fetch('https://heavy-local.com/articles' + name + '.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const Article = await response.json();


        
        let data = await fs.readFile(filepath ,"utf-8");
        data= data 
        .replace((/__TITLE__/g , Article.title))
        .replace((/__THUMB__/g,Article.img01));
    }
    catch(error){
        console.log("ERROR " , error);
    }
});


// Define a route that simulates the incoming request to your Cloud Function
//app.get('/rss-feed', generateRSS);
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
 // console.log(`Server is running on port ${PORT}`);
//});

//exports.generateRSS = functions.https.onRequest(generateRSS);



const path = require ('path');
const fs = require('fs');




app.get( async(req ,res)=>{
    const filepath = path.resolve(__dirname ,"./build" , "index.html")
    const name = req.params.name;
    try{

        let data = await fs.readFile(filepath ,"utf-8");
        data= data 
        .replace((/__TITLE__/g ,"Heavy local magazine" ))
        .replace((/__THUMB__/g, "https://heavy-local.com/assets/HeavyLocalLogo.jpg"));
    }
    catch(error){
        console.log("ERROR ");
    }
});


exports.webApi = functions.https.onRequest(app);