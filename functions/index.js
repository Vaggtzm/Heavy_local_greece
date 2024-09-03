const functions = require("firebase-functions");

const {webApp, getImageDimensionsBuffer, changeAnalysis} = require("./utils/articleShowAndRSS");
const {disableUserFunction, setCustomClaimsFunction, logoutAllDevicesFunction, beforeSignInFunction,
    updateUsernameFunction, sendNotification
} = require("./utils/handleUsers");
const {database, bucket} = require("./utils/utils");
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


const axios = require('axios');

exports.getYoutubeVideos = functions.https.onCall(async (data, context) => {
    const ApiKey = functions.config().youtube.api;
    const ChannelID = 'UCH6ADxBFyVUsiazyICRz2sQ';

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                key: ApiKey,
                channelId: ChannelID,
                part: 'snippet,id',
                order: 'date',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw new functions.https.HttpsError('internal', 'Unable to fetch YouTube videos.');
    }
});
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();
const path = require("path");
const fs = require("fs");

const createRecording = async (filePath)=>{
    // Check if this is a new article upload
    if (!filePath.endsWith('.json')) {
        return null;
    }

    console.log("Recording running 2");

    const articleId = path.basename(filePath, '.json');
    const tempFilePath = path.join('/tmp', `${articleId}.mp3`);
    const destination = `recordings/${articleId}.mp3`;

    try {
        // Get the article content
        const file = bucket.file(filePath);
        const [content] = await file.download();

        const articleData = JSON.parse(content.toString());
        file.setMetadata({
            shouldUpdateRecording:false
        }).then()

        const text = articleData.content.replace(/<\/?[^>]+(>|$)/g, ""); // Assuming the article content is stored under `content`
        console.log("Recording running 3");
        const ssmlText = text.split(' ').map((word, index) => {
            return `<mark name="word${index}"/>${word}`;
        }).join(' ');

        const ssml = `<speak>${ssmlText}</speak>`;

        const languageMapping = {
            en: 'en-US', // English
            el: 'el-GR', // Greek
            it: 'it-IT', // Italian
            // Add other language codes and their corresponding TTS format here
        };


        // Create TTS request
        const request = {
            input: { ssml },
            voice: { languageCode: languageMapping[articleData.lang], ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Generate speech
        const [response] = await client.synthesizeSpeech(request);

        // Write audio content to a temporary file
        fs.writeFileSync(tempFilePath, response.audioContent, 'binary');

        // Upload the recording to the /recordings/ directory
        await bucket.upload(tempFilePath, {
            destination: destination
        });

        // Cleanup temporary file
        fs.unlinkSync(tempFilePath);

        console.log(`Recording created and uploaded: ${destination}`);
        return null;
    } catch (error) {
        console.error('Error generating recording:', error);
        throw new functions.https.HttpsError('internal', 'Failed to generate TTS recording');
    }
}


exports.generateRecordingOnUpload = functions.storage.object().onFinalize(async (object) => {
    const filePath = object.name;
    const articleId = path.basename(filePath, '.json');
    const file = bucket.file(filePath);
    const destination = `recordings/${articleId}.mp3`;
    if(fs.existsSync(destination)&&!!file.metadata.shouldUpdateRecording){
        return null;
    }
    await createRecording(filePath);
});

exports.generateRecording = functions.https.onCall(async (data, context) => {
    const { filePath } = data;

    if (!filePath) {
        return { error: 'Missing filePath or articleId' };
    }

    const articleId = path.basename(filePath, '.json');
    const destination = `recordings/${articleId}.mp3`;
    if(fs.existsSync(destination)&&!context.auth&&!context.auth.token.admin){
        return null;
    }

    try {
        await createRecording(filePath);
        return { message: 'Recording created successfully' };
    } catch (error) {
        console.error('Error generating recording:', error);
        return { error: 'Failed to generate recording' };
    }
});