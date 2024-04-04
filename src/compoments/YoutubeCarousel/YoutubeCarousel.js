import React, { useState, useEffect } from "react";

const YoutubeCarousel = ({ apiKey, channelID, maxResults }) => {
  const [videos, setVideos] = useState();

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=${maxResults}&order=viewCount&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          setVideos(data.items);
        }
      })
      .catch(error => console.error('ERROR FETCHING VIDEOS', error));
  }, [apiKey, channelID, maxResults]);

  return (
    <>
      <div id="youtubeCarousel" className="carousel slide " data-ride="carousel">
        <div className="carousel-inner">
          {videos && videos.map((video, index) => (
            <div key={video.id.videoId} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={video.snippet.thumbnails.medium.url} className="d-block w-100" alt={video.snippet.title} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{video.snippet.title}</h5>
                <p><a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Watch on YouTube</a></p>
              </div>
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#youtubeCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#youtubeCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
}

export default YoutubeCarousel;
