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
const {database} = require("./utils");
const createRoomFunction = functions.https.onRequest(async (req, res) => {
    const newRoomId = "test"
    const roomRef = database.ref(`/rooms/${newRoomId}`);
    try {
        await roomRef.set({
            createdAt: new Date(),
            ...req.body
        });
        return res.json({ roomId: newRoomId });
    } catch (error) {
        return res.status(500).send('Error creating room');
    }
});


const getMeetingInfoFunction = functions.https.onRequest(async (req, res) => {
    const meetingId = req.query.meetingId;

    if (!meetingId) {
        return res.status(400).send('Meeting ID is required');
    }

    const meetingRef = admin.database().ref(`/meetings/${meetingId}`);
    try {
        const snapshot = await meetingRef.once('value');
        const meetingInfo = snapshot.val();

        if (meetingInfo) {
            res.status(200).json(meetingInfo);
        } else {
            res.status(404).send('Meeting not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving meeting info');
    }
});

module.exports={createRoomFunction,getMeetingInfoFunction}