import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const YouTubePlaylist = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load YouTube API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player("youtube-player", {
        height: "315",
        width: "100%",
        playerVars: {
          listType: "playlist",
          list: "PLFgquLnL59alQZxuxtZJHvj9n0fNSUe1q", // Your YouTube playlist ID
        },
        events: {
          onReady: (event) => {
            console.log("YouTube Player Ready");
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="youtube-playlist">
      <h2>🎶 Our Love Playlist 💖</h2>

      {/* YouTube Playlist */}
      <div id="youtube-player"></div>

      {/* Play/Pause Button */}
      <button onClick={togglePlayPause} className="play-music-button">
        {isPlaying ? <Pause size={24} /> : <Play size={24} />} 
        {isPlaying ? " Pause Music" : " Play & Feel the Love"}
      </button>
    </div>
  );
};

export default YouTubePlaylist;
