import React, { useState, useEffect } from "react";
import './Youtube.css';
import { getYoutubeVideos } from "../../firebase";

const Youtube = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getYoutubeVideos();
                setVideos(response.data.items);
            } catch (error) {
                console.error('Error Fetching Videos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-white text-center">YouTube Channel Videos</h1>
            <div className="row">
                {videos.map((video) =>  {
                    console.log(video.snippet.thumbnails);
                    return(
                        <div className="col-md-4 col-12 mb-3" key={video.id.videoId}>
                            <div className="card p-2 w-100 bg-dark text-white border-0 shadow-lg">
                                <img className="card-img-top w-100 " src={video.snippet.thumbnails.high.url}
                                     alt="Thumbnail"/>
                                <div className="card-body">
                                <h5 className="card-title">{video.snippet.title}</h5>
                                <p className="card-text">{video.snippet.description}</p>
                                <a rel="noreferrer" href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                   className="btn btn-primary mt-auto" target="_blank" rel="noopener noreferrer">Watch Video</a>
                            </div>
                            </div>
                        </div>)}
                )}
            </div>
        </div>
    );
};

export default Youtube;
