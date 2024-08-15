import React, { useRef, useEffect } from 'react';

const LocalVideo = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />;
};

export default LocalVideo;
