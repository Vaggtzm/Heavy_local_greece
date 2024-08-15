import { useEffect, useRef, useState } from 'react';
import {httpsCallable} from "firebase/functions";
import {functions} from "../../firebase";

export const useWebRTC = (roomId) => {
    const pc = useRef(null);
    const localStream = useRef(null);
    const remoteStreams = useRef({});
    const [remoteStreamObjects, setRemoteStreamObjects] = useState([]);

    useEffect(() => {
        const setupWebRTC = async () => {
            pc.current = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.cloudflare.com:3478' }],
                bundlePolicy: 'max-bundle',
            });

            localStream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            localStream.current.getTracks().forEach((track) => {
                pc.current.addTrack(track, localStream.current);
            });

            pc.current.ontrack = (event) => {
                const streamId = event.streams[0].id;
                if (!remoteStreams.current[streamId]) {
                    remoteStreams.current[streamId] = event.streams[0];
                    setRemoteStreamObjects((prev) => [...prev, event.streams[0]]);
                }
            };

            const createSession = httpsCallable(functions, 'createSession');

            try {
                const offerSDP = await pc.current.createOffer();
                await pc.current.setLocalDescription(offerSDP);

                const sessionData = await createSession({
                    offerSDP: pc.current.localDescription.sdp,
                });

                await pc.current.setRemoteDescription(
                    new RTCSessionDescription(sessionData.data.sessionDescription)
                );
            } catch (error) {
                console.error('Error creating session:', error.message);
            }
        };

        setupWebRTC();

        return () => {
            pc.current.close();
        };
    }, [roomId]);

    return { localStream: localStream.current, remoteStreams: remoteStreamObjects };
};
