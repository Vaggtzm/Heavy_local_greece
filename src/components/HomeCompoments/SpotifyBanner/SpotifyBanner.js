import React, { useState, useEffect } from "react";

const SpotifyBanner = () => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const bannerPosition = document.getElementById("spotify-banner").offsetTop;

            if (scrollPosition >= bannerPosition) {
                setShouldLoad(true);
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div id="spotify-banner">
            {shouldLoad && (
                <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/6QrzcuTVOFxrgnQObOyT6q?utm_source=generator"
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="spotify banner"
                ></iframe>
            )}
        </div>
    );
};

export default SpotifyBanner;
