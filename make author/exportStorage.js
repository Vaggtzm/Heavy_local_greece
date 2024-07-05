// ./functions/exportStorage.js
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./heavy-local-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
  storageBucket: "heavy-local-12bc4.appspot.com",
});

const bucket = admin.storage().bucket();
const localDir = path.join(__dirname, 'storageExport1/');

const exportStorage = async () => {
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir);
    }

    const [files] = await bucket.getFiles();

    for (const file of files) {
      const destPath = path.join(localDir, file.name);
      const destDir = path.dirname(destPath);

      // Ensure the directory exists before downloading the file
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Check if the file name ends with a slash, indicating a directory
      if (file.name.endsWith('/')) {
        console.log(`Skipped directory ${file.name}`);
        continue;
      }

      await file.download({ destination: destPath });
      console.log(`Downloaded ${file.name} to ${destPath}`);
    }

    console.log('Storage export successful');
  } catch (error) {
    console.error('Error exporting storage:', error);
  }
};

exportStorage();
