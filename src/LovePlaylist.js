import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./LovePlaylist.css";

const LovePlaylist = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYouTube, setIsYouTube] = useState(true);
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => setApiReady(true);

    return () => {
      delete window.onYouTubeIframeAPIReady;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      const youtubePlayerDiv = document.getElementById("youtube-player");
      if (youtubePlayerDiv) {
        youtubePlayerDiv.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!apiReady || playerRef.current || !isYouTube) return;

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "315",
      width: "100%",
      playerVars: {
        listType: "playlist",
        list: "PLrYp8bKgjPBmRNHtGTiuCQ6yVJYxvS2xt",
        controls: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
        showinfo: 0,
        disablekb: 1,
        playsinline: 1,
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          hideYouTubeUI(); // Hide UI elements after loading
        },
        onStateChange: (event) => {
          hideYouTubeUI(); // Hide UI elements on any state change
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  }, [apiReady, isYouTube]);

  const hideYouTubeUI = () => {
    setTimeout(() => {
      const iframe = document.querySelector("#youtube-player iframe");
      if (iframe) {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
          const style = document.createElement("style");
          style.innerHTML = `
            .ytp-chrome-top,
            .ytp-show-cards-title,
            .ytp-pause-overlay,
            .ytp-gradient-top {
              display: none !important;
            }
          `;
          iframeDocument.head.appendChild(style);
        }
      }
    }, 1000); // Delay to ensure iframe is loaded
  };

  const toggleOverlay = (show) => {
    const overlay = document.querySelector(".youtube-overlay");
    if (overlay) {
      overlay.style.display = show ? "block" : "none";
    }
  };

  const togglePlayPause = () => {
    if (isYouTube) {
      if (!playerRef.current) return;
      if (isPlaying) {
        playerRef.current.pauseVideo();
        toggleOverlay(true);
      } else {
        playerRef.current.playVideo();
        toggleOverlay(false);
      }
    } else {
      if (!audioRef.current) return;
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextVideo = () => {
    if (playerRef.current) {
      playerRef.current.nextVideo();
    }
  };

  const prevVideo = () => {
    if (playerRef.current) {
      playerRef.current.previousVideo();
    }
  };

  return (
    <div className="love-playlist">
      <h2>🎶 Our Love Playlist 💖</h2>

      <motion.button
        className="toggle-platform-button"
        onClick={() => {
          if (isYouTube && playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
          }
          setIsYouTube(!isYouTube);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RefreshCw size={20} />{" "}
        {isYouTube ? "Switch to Spotify" : "Switch to YouTube"}
      </motion.button>

      <div className="playlist-container" style={{ position: "relative" }}>
        {isYouTube ? (
          <>
            <div id="youtube-player"></div>
            <div className="youtube-overlay"></div> {/* Invisible Overlay */}
          </>
        ) : (
          <iframe
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSlwBojgQEcN"
            width="100%"
            height="380"
            frameBorder="0"
            allow="encrypted-media"
            title="Love Playlist"
          ></iframe>
        )}
      </div>

      {isYouTube && (
        <div className="button-container">
          <motion.button
            className="prev-next-button"
            onClick={prevVideo}
            style={{ paddingLeft: "8px" }}
          >
            <ChevronLeft size={24} className="icon" />
            <span className="text"> Previous</span>
          </motion.button>

          <motion.button
            className="play-music-button"
            onClick={togglePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!playerRef.current}
          >
            {isPlaying ? (
              <Pause size={24} className="icon" />
            ) : (
              <Play size={24} className="icon" />
            )}
            <span className="text">
              {isPlaying ? " Pause Music" : " Play & Feel the Love"}
            </span>
          </motion.button>

          <motion.button
            className="prev-next-button"
            onClick={nextVideo}
            style={{ paddingRight: "8px" }}
          >
            <span className="text">Next </span>
            <ChevronRight size={24} className="icon" />
          </motion.button>
        </div>
      )}

      {!isYouTube && (
        <audio ref={audioRef} loop>
          <source src="/romantic-song.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default LovePlaylist;
