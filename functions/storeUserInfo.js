// storeUserInfo.js
const admin = require("firebase-admin");
const db = require("./firebaseAdmin");

async function storeUserInfo(uid) {
  try {
    // Get user information
    const userRecord = await admin.auth().getUser(uid);

    // Extract the necessary information
    const userInfo = {
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL
    };

    // Store the user information under "authors" node
    await db.ref(`authors/${uid}`).set(userInfo);

    console.log(`User information for UID ${uid} stored successfully.`);
  } catch (error) {
    console.error("Error storing user information:", error);
  }
}

// Example usage: replace with actual UID
storeUserInfo("some-uid");