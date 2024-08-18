const functions = require("firebase-functions");

const {webApp} = require("./utils/articleShowAndRSS");
const {disableUserFunction, setCustomClaimsFunction, sendNotification, logoutAllDevicesFunction, beforeSignInFunction,
    updateUsernameFunction
} = require("./utils/handleUsers");
const {database} = require("./utils/utils");
const {DeleteArticle, handleNewArticleFunction} = require("./utils/handleArticles");
const {toggleCloudflareSecurityLevelFunction} = require("./utils/cloudflare");
const {getMeetingInfoFunction, createRoomFunction} = require("./utils/meetings");
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
exports.toggleCloudflareSecurityLevel =toggleCloudflareSecurityLevelFunction;
exports.beforeSignIn=beforeSignInFunction;
exports.createRoom = createRoomFunction;
exports.getMeetingInfo = getMeetingInfoFunction;
exports.updateUsername = updateUsernameFunction;
exports.handleNewArticle = handleNewArticleFunction;

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