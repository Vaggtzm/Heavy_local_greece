import React, { useState, useEffect, useRef } from "react";
import { storage } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Button, ProgressBar } from "react-bootstrap";
import "./TextToSpeech.css"; // Import custom CSS for player styling

const TextToSpeech = ({ articleName, ttsMarks, setSpokenMarks }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);
    const marksRef = useRef(ttsMarks);

    useEffect(() => {
        const fetchAudioUrl = async () => {
            setLoading(true);
            setError(null);
            try {
                const audioRef = ref(storage, `recordings/${articleName}.mp3`);
                const url = await getDownloadURL(audioRef);
                setAudioUrl(url);
            } catch (error) {
                setError("Recording not found.");
                console.error("Error fetching TTS audio URL:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAudioUrl();
    }, [articleName]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (!isSeeking) {
                    setCurrentTime(audioRef.current.currentTime);
                }
            };
            audioRef.current.onloadedmetadata = () => {
                setDuration(audioRef.current.duration);
            };
        }
    }, [audioUrl]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setIsFinished(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const newSpokenMarks = marksRef.current.filter(mark => {
                const markElement = document.querySelector(`[name="${mark}"]`);
                if (markElement) {
                    const markStartTime = parseFloat(markElement.getAttribute("data-start"));
                    const markEndTime = parseFloat(markElement.getAttribute("data-end"));
                    return currentTime >= markStartTime && currentTime <= markEndTime;
                }
                return false;
            });

            if (newSpokenMarks.length > 0) {
                setSpokenMarks(newSpokenMarks); // Update the spoken marks in the parent component
            }
        }
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 10;
        }
    };

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 10;
        }
    };

    const handleSeekStart = () => {
        setIsSeeking(true);
    };

    const handleSeekEnd = () => {
        setIsSeeking(false);
    };

    const progressPercentage = (currentTime / duration) * 100;

    return (
        <div className="custom-audio-player">
            {loading && <div className="loading-message">Loading...</div>}
            {error && !loading && <div className="badge bg-danger rounded-3">{error}</div>}
            {!loading && !error && (
                <>
                    <audio
                        ref={audioRef}
                        src={audioUrl}
                        onEnded={handleEnded}
                        onTimeUpdate={handleTimeUpdate}
                        onSeeked={handleSeekEnd}
                        onSeeking={handleSeekStart}
                    />
                    <div className="player-controls">
                        <ProgressBar
                            now={progressPercentage}
                            onChange={handleProgressChange}
                            className="progress-bar"
                            striped
                            variant="info"
                        />
                        <div className="controls-row">
                            <Button
                                variant="secondary"
                                onClick={handleBackward}
                                className="player-btn backward-btn"
                            >
                                <i className="bi bi-skip-backward"></i> {/* Using Bootstrap Icons */}
                            </Button>
                            <Button
                                variant={isPlaying ? "danger" : "primary"}
                                onClick={handlePlayPause}
                                className="player-btn play-pause-btn"
                            >
                                {isPlaying ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleForward}
                                className="player-btn forward-btn"
                            >
                                <i className="bi bi-skip-forward"></i> {/* Using Bootstrap Icons */}
                            </Button>
                        </div>
                        <div className="time-controls">
                            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Utility function to format time as MM:SS
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export default TextToSpeech;
