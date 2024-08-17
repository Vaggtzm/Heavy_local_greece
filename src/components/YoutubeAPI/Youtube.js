import React, {useState, useEffect} from "react";
import axios from "axios";
import './Youtube.css';

const Youtube = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const ApiKey = 'AIzaSyD9qgA2uTEAwnF3btTBz8M088EXk9D0XiQ';
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
        fetchData().then();
    }, []); // Empty dependency array to run the effect only once
    return (
        <div className={"container mt-5"}>
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
                                <a rel={"noreferrer"} href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                   className="btn btn-primary" target="_blank">Watch Video</a>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}

export default Youtube;
