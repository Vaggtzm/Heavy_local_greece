import React from "react";

const SpotifyBanner = () => {
    return (
        <div>
            <iframe style={{borderRadius: "12px"}}
                    src="https://open.spotify.com/embed/playlist/6QrzcuTVOFxrgnQObOyT6q?utm_source=generator"
                    width="100%" height="200" frameBorder="0" allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={"spotify banner"}></iframe>
        </div>
    );
};

export default SpotifyBanner;