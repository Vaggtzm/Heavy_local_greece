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

const functions = require('firebase-functions');
const { OpenAI } = require('openai');
const {bucket} = require("./utils");

const openai = new OpenAI({
    apiKey: functions.config().openai?functions.config().openai.key:"",
});

// Map the language codes to their full names
const languageMap = {
    "en": "English",
    "el": "Greek",
    "it": "Italian",
    // Add more mappings as needed
};

const checkAndMarkArticleLanguage = async (object) => {
    const filePath = object.name;

    // Only process JSON files
    if (!filePath.endsWith('.json')) {
        return null;
    }
    const file = bucket.file(filePath);

    try {
        // Download the JSON file content
        const [fileContents] = await file.download();
        const content = JSON.parse(fileContents.toString());

        if(Object.keys(content).includes('isLanguageCorrect')){
            return null;
        }

        const articleText = content.content;
        const expectedLanguageCode = content.lang;

        if (!articleText || !expectedLanguageCode) {
            console.log('Article text or expected language not found.');
            return null;
        }

        // Get the full language name from the language code
        const expectedLanguage = languageMap[expectedLanguageCode];

        if (!expectedLanguage) {
            console.log('Language code is not supported.');
            return null;
        }

        // Prepare the prompt for language detection
        const prompt = `The following text is written in "${expectedLanguage}". Does the language of the text match this description?\n\n"${articleText}"\n\nAnswer with "yes" or "no".`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }],
            max_tokens: 50,
        });

        const aiResponse = response.choices[0].message.content.trim().toLowerCase();
        console.log(aiResponse)

        let isLanguageCorrect = false;

        if (aiResponse.includes('yes')) {
            isLanguageCorrect = true;
        } else if (aiResponse.includes('no')) {
            isLanguageCorrect = false;
        }

        // Set the variable within the JSON file
        content.isLanguageCorrect = isLanguageCorrect;

        // Upload the updated JSON file back to the same path
        await file.save(JSON.stringify(content, null, 2));

        console.log(`Language correctness for ${filePath} set to: ${isLanguageCorrect}`);
    } catch (error) {
        console.error('Error processing file:', error);
    }
    return null;
}

// Export the function for deployment
module.exports = {
    checkAndMarkArticleLanguage
};
