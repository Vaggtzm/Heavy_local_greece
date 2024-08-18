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
const axios = require("axios");
const { database } = require("./utils");

async function updateCloudflareRecords(oldUsername, newUsername, userId) {
    // Your Cloudflare API credentials
    const cloudflare = functions.config().cloudflare;
    const cloudflareZoneId = cloudflare.zone_id;
    const cloudflareApiToken = cloudflare.api_key;

    // Delete the old CNAME record
    const oldRecordId = await getDnsRecordId(oldUsername, cloudflareZoneId, cloudflareApiToken);
    if (oldRecordId) {
        await axios.delete(`https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records/${oldRecordId}`, {
            headers: {
                'Authorization': `Bearer ${cloudflareApiToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    const newRecordId = await getDnsRecordId(newUsername, cloudflareZoneId, cloudflareApiToken);
    if (!newRecordId) {
        // Add the new CNAME record
        await axios.post(`https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`, {
            type: 'CNAME',
            name: `${newUsername}.pulse-of-the-underground.com`,
            content: 'pulse-of-the-underground.com',
            proxied: true
        }, {
            headers: {
                'Authorization': `Bearer ${cloudflareApiToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    // Update the redirect list
    await updateRedirectList(oldUsername, newUsername, userId);
}

async function getDnsRecordId(username, zoneId, apiToken) {
    const response = await axios.get(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
        },
        params: {
            name: `${username}.pulse-of-the-underground.com`,
            type: 'CNAME'
        }
    });

    const records = response.data.result;
    return records.length > 0 ? records[0].id : null;
}

async function updateRedirectList() {
    const redirectListId = '8038d5ea7f384e70a7a48f6b88095ca8';
    const cloudflare = functions.config().cloudflare;
    const cloudflareApiToken = cloudflare.api_key;
    const cloudflareAccountId = "515a4c1253b30f8541443c98c0cb7ee5";

    // Step 1: Read all usernames and user IDs from the Realtime Database
    const usersSnapshot = await database.ref('authors').once('value');
    const usersData = usersSnapshot.val();

    let redirects = [];

    // Step 2: Construct the redirect list from the database data
    Object.keys(usersData).forEach(userId => {
        const username = usersData[userId].username;
        if (!username) {
            return;
        }

        const newRedirect = {
            "redirect": {
                "source_url": `${username}.pulse-of-the-underground.com/`,
                "target_url": `https://pulse-of-the-underground.com/author/${userId}`
            }
        }

        redirects.push(newRedirect);
    })

    console.log(redirects);

    // Step 3: Update the entire list in Cloudflare
    try {
        await axios.put(`https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/rules/lists/${redirectListId}/items`,
            redirects
            , {
                headers: {
                    'Authorization': `Bearer ${cloudflareApiToken}`,
                    'Content-Type': 'application/json'
                }
            });

        console.log('Redirect list successfully updated in Cloudflare.');
    } catch (error) {
        console.error('Error updating redirect list in Cloudflare:', error.response ? error.response.data : error.message);
    }
}

async function toggleCloudflareSecurityLevelFunction(data, context) {
    const cloudflare = functions.config().cloudflare;
    console.log("functions", functions.config())
    console.log("cloudflare", cloudflare);
    const CLOUDFLARE_API_KEY = cloudflare.api_key;
    const ZONE_ID = cloudflare.zone_id;

    // Verify authentication
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    // Validate the input
    if (typeof data.display !== 'boolean') {
        throw new functions.https.HttpsError('invalid-argument', 'The `display` field must be a boolean.');
    }

    const display = data.display; // Boolean: true or false

    try {
        if (display) {
            // Get the current security level
            const response = await axios.get(
                `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/security_level`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CLOUDFLARE_API_KEY}`
                    }
                }
            );
            return { success: true, data: response.data };
        } else {
            // Change the security level based on the action
            const action = data.action; // Boolean: true or false
            if (typeof action !== 'boolean') {
                throw new functions.https.HttpsError('invalid-argument', 'The `action` field must be a boolean.');
            }

            const securityLevel = action ? 'under_attack' : 'high';
            const response = await axios.patch(
                `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/security_level`,
                {
                    value: securityLevel
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CLOUDFLARE_API_KEY}`
                    }
                }
            );
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', 'Error processing request.');
    }
}

module.exports = {
    updateCloudflareRecords,
    toggleCloudflareSecurityLevelFunction
};
