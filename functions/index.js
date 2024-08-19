const functions = require("firebase-functions");

const {webApp} = require("./utils/articleShowAndRSS");
const {disableUserFunction, setCustomClaimsFunction, logoutAllDevicesFunction, beforeSignInFunction,
    updateUsernameFunction
} = require("./utils/handleUsers");
const {database, sendNotification, bucket} = require("./utils/utils");
const {DeleteArticle, handleNewArticleFunction} = require("./utils/handleArticles");
const {toggleCloudflareSecurityLevelFunction} = require("./utils/cloudflare");
const {getMeetingInfoFunction, createRoomFunction} = require("./utils/meetings");
const {handlePublishFunction} = require("./utils/handlePublish");
exports.webApi = functions
    .runWith({
        enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
    })
    .https.onRequest(webApp);
exports.disableUser = disableUserFunction;
exports.setCustomClaim = setCustomClaimsFunction;
exports.logoutAllDevices = logoutAllDevicesFunction;
exports.sendPushoverNotification = functions.https.onCall(sendNotification);
exports.handleDeleteArticle = DeleteArticle;
exports.toggleCloudflareSecurityLevel =functions.https.onCall(toggleCloudflareSecurityLevelFunction);
exports.beforeSignIn=beforeSignInFunction;
exports.createRoom = createRoomFunction;
exports.getMeetingInfo = getMeetingInfoFunction;
exports.updateUsername = updateUsernameFunction;
exports.handleNewArticle = handleNewArticleFunction;
exports.handlePublish = handlePublishFunction;


exports.saveDeviceToken = functions.https.onCall(async (data, context) => {
    try {
        const {token} = data;

        if (!token) {
            throw new functions.https.HttpsError('invalid-argument', 'Token must be provided');
        }

        // Check if the token already exists in the database
        const snapshot = await database.ref('deviceTokens').orderByChild('token').equalTo(token).once('value');
        if (snapshot.exists()) {
            console.log('Device token already exists.');
            return {message: 'Device token already exists'};
        }

        // Save the token under the user's UID in the database
        await database.ref('deviceTokens').push({token});

        return {message: 'Device token saved successfully'};
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error saving device token', error.message);
    }
});

exports.lowFilesAlert = functions.pubsub.schedule('0 12 * * *')
    .timeZone('America/New_York')
    .onRun(async (context) => {
        // Define the bucket and folder
        const folderPath = 'upload_from_authors/';

        try {
            // Get the list of files in the specified folder
            const [files] = await bucket.getFiles({ prefix: folderPath });

            // Count the number of files
            const fileCount = files.length;

            console.log(`Number of files in '${folderPath}': ${fileCount}`);

            // Check if there are fewer than 3 files
            if (fileCount < 3) {
                // Define notification details
                const title = 'Low File Count Alert';
                const message = `There are only ${fileCount} articles left to be published. We need more.`;
                const url = 'https://pulse-of-the-underground.com/upload/admin'; // Replace with your URL
                const urlTitle = 'Check it out';

                // Send the notification
                await sendNotification({ title, message, url, urlTitle });
                console.log('Notification sent successfully.');
            } else {
                console.log('Sufficient number of files present. No notification sent.');
            }

        } catch (error) {
            console.error('Error checking files or sending notification:', error);
        }
    });
