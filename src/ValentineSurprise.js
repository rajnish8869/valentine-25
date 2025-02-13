import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import LovePlaylist from "./LovePlaylist";
import LoveLetter from "./LoveLetter";
import HeartCursor from "./HeartCursor";
import ValentineImage from "./ValentineImage";
import FortuneCylinder from "./FortuneCylinder";
import ValentineGallery from "./ValentineGallery";
import LoveQuiz from "./LoveQuiz";

import "./Valentine.css";
// const valentineImages = [valentine1, valentine2, valentine3];

const Button = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    className="valentine-button"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {children}
  </motion.button>
);

export default function ValentineSurprise() {
  const [showMessage, setShowMessage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [cursorHearts, setCursorHearts] = useState([]);
  const [theme, setTheme] = useState("day");
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Math.random(),
          left: Math.random() * 100 + "%",
          size: Math.random() * 20 + 10, // Random size (10px - 30px)
          xMovement: (Math.random() - 0.5) * 50, // Slight left/right drifting
          duration: Math.random() * 5 + 3, // Random floating duration (3s - 8s)
        },
      ]);
    }, 300); // More frequent heart generation
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme; // Apply theme globally to HTML
  }, [theme]);

  useEffect(() => {
    if (theme === "night") {
      const newStars = Array.from({ length: 300 }).map(() => ({
        id: Math.random(),
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        size: Math.random() * 3 + 1 + "px",
        animationDelay: Math.random() * 5 + "s",
      }));
      setStars(newStars);
    } else {
      setStars([]);
    }
  }, [theme]);

  const handleMouseMove = (e) => {
    setCursorHearts((prev) => [
      ...prev,
      { id: Math.random(), x: e.pageX, y: e.pageY }, // Use pageX and pageY
    ]);
    setTimeout(() => {
      setCursorHearts((prev) => prev.slice(1));
    }, 500);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };

  const scrollToId = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div
      className={`valentine-container ${theme}`}
      onMouseMove={handleMouseMove}
    >
      <HeartCursor />
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={document.documentElement.scrollHeight}
          numberOfPieces={100}
          recycle={false}
          drawShape={(ctx) => {
            ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctx.bezierCurveTo(20, 25, 20, 62, 20, 62);
            ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctx.bezierCurveTo(110, 102, 130, 80, 130, 62);
            ctx.bezierCurveTo(130, 62, 130, 25, 100, 25);
            ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
            ctx.fillStyle = "red";
            ctx.fill();
          }}
        />
      )}
      {/* Theme Toggle */}
      <motion.div
        className="theme-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
      >
        {theme === "day" ? "🌙 Night Mode" : "☀️ Day Mode"}
      </motion.div>
      {/* Twinkling Stars Animation */}
      {theme === "night" &&
        stars.map(({ id, left, top, size, animationDelay }) => (
          <motion.div
            key={id}
            className="star"
            style={{ left, top, width: size, height: size, animationDelay }}
          />
        ))}
      {/* Cursor Hearts Animation */}
      {cursorHearts.map(({ id, x, y }) => (
        <motion.div
          key={id}
          className="cursor-heart"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
          style={{ left: x, top: y }}
        >
          ❤️
        </motion.div>
      ))}
      {/* Floating Hearts Animation */}
      <div className="floating-hearts">
        {hearts.map(({ id, left, size, xMovement, duration }) => (
          <motion.div
            key={id}
            initial={{ y: window.innerHeight, opacity: 0, x: 0 }}
            animate={{ y: -window.innerHeight, opacity: 1, x: xMovement }}
            transition={{ duration, ease: "linear" }}
            className="heart"
            style={{ left, fontSize: `${size}px` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="valentine-title"
      >
        Happy Valentine's Day, My Love! 💖
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="valentine-message"
      >
        You fill my life with love and happiness. Here’s a special surprise just
        for you! 💖
      </motion.p>
      <div id="LoveLetter">{showLoveLetter && <LoveLetter />}</div>
      {/* Valentine's Image */}
      <ValentineImage />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="valentine-button-container"
      >
        <Button
          onClick={() => {
            setShowMessage(true);
            setShowConfetti(true);
            scrollToId("showMessage");
          }}
        >
          Click for a Surprise 💝
        </Button>
        <Button
          onClick={() => {
            setShowGallery(true);
            scrollToId("showGallery");
          }}
        >
          View Our Memories 📸
        </Button>
        <Button
          onClick={() => {
            setShowLoveLetter(true);
            scrollToId("LoveLetter");
          }}
        >
          Read My Love Letter 💌
        </Button>
        <Button
          onClick={() => {
            setShowQuiz(true);
            scrollToId("showQuiz");
          }}
        >
          Take a Love Quiz 💖
        </Button>
      </motion.div>
      <div id="showMessage">
        {showMessage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="valentine-surprise"
          >
            <p className="love-message">💖 You’re my forever Valentine! 💘</p>
            <p className="love-message">💞 I love you endlessly! 💕</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="special-message"
            >
              You make my world brighter, my heart fuller, and my life complete.
              🌹💑
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="valentine-heart"
            >
              ❤️❤️❤️
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="whisper-message"
            >
              *Whispering* You’re the best thing that ever happened to me! 😘💓
            </motion.p>
          </motion.div>
        )}
      </div>

      <div id="showGallery">
        {showGallery && <ValentineGallery showGallery={showGallery} />}
      </div>
      <div id="showQuiz">{showQuiz && <LoveQuiz />}</div>
      <FortuneCylinder />
      <LovePlaylist />
    </div>
  );
}
