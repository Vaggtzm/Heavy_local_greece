import React, { useRef, useEffect } from 'react';

const RemoteVideo = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return <video ref={videoRef} autoPlay style={{ width: '100%' }} />;
};

export default RemoteVideo;
