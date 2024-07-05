// ./functions/exportDatabase.js
const fs = require('fs');

const admin = require("firebase-admin");
const serviceAccount = require("./heavy-local-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
});

const bucket = admin.storage().bucket("heavy-local-12bc4.appspot.com");
const db = admin.database();

const exportDatabase = async () => {
  try {
    const ref = db.ref('/');
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    fs.writeFileSync('databaseExport.json', JSON.stringify(data, null, 2));
    console.log('Database export successful');
  } catch (error) {
    console.error('Error exporting database:', error);
  }
};

exportDatabase();
