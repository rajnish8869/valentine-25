import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./HeartCursor.css";

const HeartCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="heart-cursor"
      animate={{ x: cursorPosition.x, y: cursorPosition.y }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      ❤️
    </motion.div>
  );
};

export default HeartCursor;
