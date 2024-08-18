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

const { database } = require("./utils");
const axios = require("axios");
const { updateCloudflareRecords } = require("./cloudflare");

const functions = require("firebase-functions");

async function setDatabase(claim, table, user) {
    console.log(claim, table, user);
    if (claim) {
        let userData = {};
        let originalDoc;

        try {
            originalDoc = database.ref(`/users/${user.uid}`);
            const data = await originalDoc.get();
            userData = data.val();
        } catch (e) {
            console.log("User was not found on the table");
        }

        const userDoc = database.ref(`/${table}/${user.uid}`);
        await userDoc.set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName ? user.displayName : "",
            photoURL: user.photoURL ? user.photoURL : "",
            ...userData
        });

        if (!!originalDoc) {
            await originalDoc.remove();
        }
    } else {
        const userDoc = database.ref("/users/" + user.uid);
        let userData = {};
        let originalDoc;

        try {
            originalDoc = database.ref(`/${table}/${user.uid}`);
            const data = await originalDoc.get();
            userData = data.val();
        } catch (e) {
            console.log("User was not found on the table");
        }

        await userDoc.update({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL ? user.photoURL : "",
            ...userData
        });

        if (!!originalDoc) {
            await originalDoc.remove();
        }
    }
}

const setCustomClaimsFunction = functions.https.onCall(async (data, context) => {
    const { id, isEmail, claim } = data;
    const isAdmin = context.auth && context.auth.token.admin;
    const registeringAsBand = Object.keys(claim).includes("band") && Object.keys(claim).length < 2;
    const isPaul = (await getUser(context.auth.uid, false)).email === "pavlos@orfanidis.net.gr";

    // Check if request is made by an authenticated user with admin privileges
    if (!isAdmin && !registeringAsBand && !isPaul) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called by an authenticated admin.' + JSON.stringify(claim));
    }

    let user;
    try {
        user = await getUser(id, isEmail);
    } catch (e) {
        throw new functions.https.HttpsError('failed-precondition', e.message);
    }

    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid email.');
    }

    try {
        // Get user by email
        // Set custom user claims
        await admin.auth().setCustomUserClaims(user.uid, {
            ...user.customClaims,
            ...claim
        });
        // Write user info to Firestore (or Realtime Database)
        console.log(claim);
        if (Object.keys(claim).includes("admin")) {
            await setDatabase(claim.admin, "authors", user);
        }
        if (Object.keys(claim).includes("band")) {
            await setDatabase(claim.band, "band", user);
        }
        return { message: `Successfully set the role for user ${user.uid}` };
    } catch (error) {
        console.error('Error setting custom claims:', error);
        throw new functions.https.HttpsError('internal', 'Unable to set custom claims or write user data. ' + JSON.stringify(error));
    }
});

// Function to disable a user
const disableUserFunction = functions.https.onCall(async (data, context) => {
    // Check if request is made by an authenticated user with admin privileges
    if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called by an authenticated admin.');
    }

    const { id, isEmail, disabled } = data;

    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid email.');
    }

    try {
        // Get user by email
        const user = await getUser(id, isEmail);

        // Disable user
        await admin.auth().updateUser(user.uid, { disabled: disabled });
        const adminClaims = user.customClaims.admin;

        const userFolder = database.ref(`/${adminClaims ? "authors" : "users"}/${user.uid}`);
        await userFolder.update({
            disabled: disabled
        });
        return { message: `Successfully disabled user ${user.uid}` };
    } catch (error) {
        console.error('Error disabling user:', error);
        throw new functions.https.HttpsError('internal', 'Unable to disable user.');
    }
});

async function getUser(id, isEmail) {
    let user;
    if (isEmail) {
        user = await admin.auth().getUserByEmail(id);
    } else {
        user = await admin.auth().getUser(id);
    }
    return user;
}



const logoutAllDevicesFunction = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;

    if (!uid) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }

    try {
        await admin.auth().revokeRefreshTokens(uid);
        return { message: 'Successfully logged out of all devices.' };
    } catch (error) {
        throw new functions.https.HttpsError('unknown', 'Failed to log out of all devices.', error);
    }
});

const beforeSignInFunction = functions.auth.user().beforeSignIn(async (user, context) => {
    const ipAddress = context.ipAddress;

    if (!functions.config().whatismyip) {
        return null;
    }

    const apiKey = functions.config().whatismyip.key;

    const url = `https://api.whatismyip.com/ip-address-lookup.php?key=${apiKey}&input=${ipAddress}`;
    const response = await axios.get(url);
    const textResponse = response.data;

    // Convert the text response to JSON
    const jsonResponse = textResponse.split('\n').reduce((obj, line) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            obj[key.trim()] = valueParts.join(':').trim();
        }
        return obj;
    }, {});

    const table = (user.customClaims && user.customClaims.admin) ? "authors" : "users";
    const ref = database.ref(`${table}/${user.uid}/ip`);
    ref.push({
        loginAttempt: jsonResponse
    });
});

const updateUsernameFunction = functions.database.ref('/authors/{userId}/username')
    .onUpdate(async (change, context) => {
        const oldUsername = change.before.val();
        const newUsername = change.after.val();
        const userId = context.params.userId;

        if (oldUsername !== newUsername) {
            // Update Cloudflare CNAME and redirect list
            await updateCloudflareRecords(oldUsername, newUsername, userId);

            // Update the database or perform any additional processing
            await database.ref(`/otherData/${userId}`).update({
                username: newUsername
            });
        }
    });

module.exports = {
    setCustomClaimsFunction,
    disableUserFunction,
    getUser,
    logoutAllDevicesFunction,
    beforeSignInFunction,
    updateUsernameFunction
};
