
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

const path = require ('path');
const fs = require('fs');

admin.initializeApp();





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

app.use("/", express.static(path.join(__dirname, 'build')));


// Define a route that simulates the incoming request to your Cloud Function
//app.get('/rss-feed', generateRSS);
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
 // console.log(`Server is running on port ${PORT}`);
//});

//exports.generateRSS = functions.https.onRequest(generateRSS);




app.get( async(req ,res)=>{
    const filepath = path.resolve(__dirname ,"./build" , "index.html")
    const name = req.params.name;
    try{
        let data = await fs.readFile(filepath ,"utf-8")
        .replace((/__TITLE__/g ,"Heavy local magazine" ))
        .replace((/__THUMB__/g, "https://heavy-local.com/assets/HeavyLocalLogo.jpg"));
    }
    catch(error){
        console.log("ERROR ");
    }
});


exports.webApi = functions.runWith({
    enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
}).https.onRequest(app);