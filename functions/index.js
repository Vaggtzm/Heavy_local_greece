const functions = require("firebase-functions");
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const RSS = require("rss");

const path = require("path");
const fs = require("fs");
const Jimp = require('jimp');
const os = require('os');
const { mkdirp } = require('mkdirp')

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
    title: "Heavy Local Greece",
    description: "An active news website for underground metal bands",
    feed_url: "https://heavy-local.com/feed",
    site_url: "https://heavy-local.com",
    image_url: "https://heavy-local.com/favicon.png",
    managingEditor: "heavylocalgreece@gmail.com (Heavy Local Greece)",
    webMaster: "heavylocalgreece@gmail.com (Heavy Local Greece)",
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
          "https://heavy-local.com/assets"
        ),
        url: `https://heavy-local.com/article/${file.name
          .split("/")
          .pop()
          .replace(".json", "")}`,
        author: article.sub,
        date: new Date(
          +parts_of_date[2],
          parts_of_date[1] - 1,
          +parts_of_date[0]
        ),
        enclosure: { url: article.img01 },
      };

      feed.item(item);
    });

    await Promise.all(promises);

    const xml = feed.xml({ indent: true });
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
    //127.0.0.1:8443/heavy-local-12bc4/us-central1/webApi/assets/Concerts/workInProgress/DSC_0058.JPG

    http: return `${fileName}_${
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

app.get("/article/:article", (req, res, folder) => {
  getArticle(req, res, "articles").then();
});

app.get("/article/early/:article", (req, res, folder) => {
  getArticle(req, res, "early_releases").then();
});
async function updateImageMetadata(filePath) {
    try {
      // Get a reference to the image
      const imageRef = bucket.file(filePath);
  
      // Get the current metadata
      const [metadata] = await imageRef.getMetadata();
  
      // Check if custom metadata already exists (optional)
      if (metadata.customMetadata && metadata.customMetadata.width && metadata.customMetadata.height) {
        console.log('Image already has width and height metadata.');
        return;  // Optional: Exit if metadata already exists
      }
  
      // Download the image to get dimensions
      const imageBuffer = await imageRef.downloadAsBuffer();
  
      // Use Jimp to read image dimensions
      const image = await Jimp.read(imageBuffer);
      const width = image.getWidth();
      const height = image.getHeight();
  
      // Update custom metadata
      const updatedMetadata = {
        customMetadata: {
          width,
          height,
          ...(metadata.customMetadata || {})  // Preserve existing custom metadata
        }
      };
  
      // Update the image metadata
      await imageRef.setMetadata(updatedMetadata);
      console.log(`Image metadata updated successfully for ${filePath}`);
  
    } catch (error) {
      console.error(`Error updating image metadata: ${error}`);
    }
  }

app.get("/assets/*", async (req, res) => {
    res.set('Cache-Control', 'public, max-age=604800');

  const imagePath = req.params[0];
  let filePath = "images/" + imagePath;
  const [metadata] = await bucket.file(filePath).getMetadata();
  if (metadata.customMetadata !== undefined) {
    const { width, height } = metadata.customMetadata;
    const aspectRatio = width / height;
    const tolerance = 0.5;
    filePath = changeAnalysis(
      filePath,
      "800x800",
      "800x600",
      Math.abs(aspectRatio - 1) <= tolerance
    );
  }else{
    updateImageMetadata(filePath);
  }
  //filePath = changeAnalysis(filePath, "800x800", true)

  try {
    const contentType = metadata.contentType;
    // Check if image is almost rectangular
    // Use 800x800 quality for almost rectangular images

    const fileData = await bucket.file(filePath).download();
    //res.contentType(contentType);
    res.send(fileData[0]);
    return;
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(404).send("File not found");
  }
});

exports.webApi = functions
  .runWith({
    enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
  })
  .https.onRequest(app);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
NOTIFICATION HANDLING
------------------------------------------------------------------------------------------------------------------------------------------------------*/

const getImageDimensions = async (object) => {
    // File and directory paths.
    const { name: filePath, contentType } = object;
    console.log(object);
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
  
    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith('image/')) {
      return console.log('This is not an image.');
    }
  
    // Cloud Storage files.
    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(filePath);
  
    // Create the temp directory where the storage file will be downloaded.SS
    await mkdirp(tempLocalDir);
  
    // Download file from bucket.
    await file.download({ destination: tempLocalFile });
    console.log('The file has been downloaded to', tempLocalFile);
  
    // Get Dimensions of the image
    const { stdout } = await execFile(
      'identify',
      ['-format', '%wx%h', tempLocalFile],
      { capture: ['stdout', 'stderr'] }
    );
    const [height, width] = stdout.split('x');
    console.log(`Height:${height} Width:${width}`);
  
    // Update custom metadata with width and height
    const metadata = {
      width: parseInt(width),
      height: parseInt(height),
    };
    await file.setMetadata({ custom: metadata });
  
    // Cleanup
    fs.unlinkSync(tempLocalFile);
    return console.log('Done');
  };


exports.sendNotification = functions.storage
  .object()
  .onFinalize(async (object) => {
    getImageDimensions(object);
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
          body: "Go to Heavy Local to read our new article",
          image: "https://heavy-local.com/favicon.png",
        },
        data: {
          articleId: articleId,
          url: `https://heavy-local.com/article/${articleId.replace(
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
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing device token." });
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
          .json({ message: "Device token already exists." });
      }

      // Save the device token to Firebase Realtime Database
      await database.ref("deviceTokens").push({
        token,
      });

      return res
        .status(200)
        .json({ message: "Device token saved successfully." });
    } catch (error) {
      console.error("Error saving device token:", error);
      return res.status(500).json({ error: "Failed to save device token." });
    }
  });

/**User Handling */

exports.syncUserToAuthors = functions.auth.user().onCreate((user) => {
  const userId = user.uid;
  const email = user.email;
  const displayName = user.displayName || "";
  const photoURL = user.photoURL || "";

  const authorData = {
    email: email,
    displayName: displayName,
    photoURL: photoURL,
  };

  return admin.database().ref(`/authors/${userId}`).set(authorData);
});

exports.deleteUserFromAuthors = functions.auth.user().onDelete((user) => {
  const userId = user.uid;

  return admin.database().ref(`/authors/${userId}`).remove();
});
