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

const serviceAccount = require("../heavy-local-admin.json");

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const axios = require("axios");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
});


const bucket = admin.storage().bucket("heavy-local-12bc4.appspot.com");
const database = admin.database();
const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
};

const sendNotification = async (data, context) => {
    const { uid, title, message, url, urlTitle } = data;
    const apiKey = functions.config().pushover.key;

    const user = await getUser(uid, false);
    const databaseTable = user.customClaims.admin ? "authors" : "users";

    if (!uid || !title || !message) {
        return { success: false, message: "Missing required parameters." };
    }

    try {
        // Fetch the user data from the Realtime Database
        const userRef = database.ref(`/${databaseTable}/${uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();

        if (!userData) {
            return { success: false, message: "User not found." };
        }

        // Prepare the Pushover notification payload
        const pushoverPayload = {
            token: apiKey, // Token for the Pushover application
            user: userData.pushoverApiKey || "",    // User's Pushover user key
            message: message,
            title: title,
            url: url || "",                  // Optional URL
            url_title: urlTitle || ""         // Optional URL title
        };

        const notificationUserRef = database.ref(`/${databaseTable}/${uid}/notifications`);

        notificationUserRef.push({ ...pushoverPayload, sentOn: new Date().toISOString() });

        // Check if the user has a Pushover API key
        if (!userData.pushoverApiKey) {
            return { success: false, message: "User does not have a Pushover API key." };
        }

        // Send the notification via Pushover
        const response = await axios.post("https://api.pushover.net/1/messages.json", pushoverPayload);

        if (response.status === 200) {
            return { success: true, message: "Notification sent successfully." };
        } else {
            return { success: false, message: "Failed to send notification." };
        }
    } catch (error) {
        console.error("Error sending Pushover notification:", error);
        return { success: false, message: "Error sending notification: " + error.message };
    }
}

module.exports = {
    bucket,
    database,
    runtimeOpts,
    sendNotification
};


