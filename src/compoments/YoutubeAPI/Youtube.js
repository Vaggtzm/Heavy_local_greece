import React, {useState, useEffect} from "react";
import axios from "axios";
import './Youtube.css';

const Youtube = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const ApiKey = 'AIzaSyB_yibCKiMw14KPhwhsin7VnqHPLnZdE_o';
        const ChannelID = 'UCH6ADxBFyVUsiazyICRz2sQ';
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${ApiKey}&channelId=${ChannelID}&part=snippet,id&order=viewCount&maxResults=3`);
                const filteredVideos = response.data.items.filter(video => !video.contentDetails?.duration.match(/M|H/));
                setVideos(filteredVideos);

            } catch (error) {
                console.error('Error Fetching Videos:', error);
            }

        }
        fetchData();
    }, []); // Empty dependency array to run the effect only once
    return (
        <div>
            <h1 className="mb-4">YouTube Channel Videos</h1>
            <div className="row">
                {videos.map(video => (
                    <div className="col-md-4 mb-3" key={video.id.videoId}>
                        <div className="card p-2 w-100">
                            <img className="card-img-top w-100 " src={video.snippet.thumbnails.default.url}
                                 alt="Thumbnail"/>
                            <div className="card-body">
                                <h5 className="card-title">{video.snippet.title}</h5>
                                <p className="card-text">{video.snippet.description}</p>
                                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                   className="btn btn-primary" target="_blank">Watch Video</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Youtube;
