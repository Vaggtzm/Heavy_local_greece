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
const functions = require("firebase-functions");
const {bucket} = require("./utils");
const handlePublishFunction = functions.https.onCall(async (data, context) => {
    const { to_normal_release, fileName, isEarlyReleasedArticles } = data;

    try {
        const result = await publishArticle(to_normal_release, fileName, isEarlyReleasedArticles);
        return { success: true, message: 'File published successfully!', result };
    } catch (error) {
        console.error('Error publishing file:', error);
        throw new functions.https.HttpsError('internal', 'Error publishing file', error.message);
    }
});

// Core logic that can be reused elsewhere
async function publishArticle(to_normal_release, fileName, isEarlyReleasedArticles) {
    let originalfolder = "upload_from_authors";
    let folder = "early_releases";

    if (to_normal_release) {
        folder = "articles";
    }
    if (isEarlyReleasedArticles) {
        folder = "articles";
        originalfolder = "early_releases";
    }

    const destinationFileRef = bucket.file(`${folder}/${fileName}.json`);
    const originalFileRef = bucket.file(`${originalfolder}/${fileName}.json`);

    // Check if the original file exists
    const [exists] = await originalFileRef.exists();
    if (!exists) {
        throw new Error(`Original file does not exist at ${originalfolder}/${fileName}.json`);
    }

    // Fetch file content from the original location
    const [fileContent] = await originalFileRef.download();
    const content = JSON.parse(fileContent.toString());

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    if (!content.translatedBy) {
        content.written_date = content.date;
        content.date = new Date().toLocaleDateString('en-GB', options);
    }
    // Upload updated file content to the destination
    await destinationFileRef.save(JSON.stringify(content));
    // Delete original file after successful upload
    await originalFileRef.delete();
    return { fileName, folder };
}

module.exports = {
    handlePublishFunction
}