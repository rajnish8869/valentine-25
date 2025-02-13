import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, X } from "lucide-react";
import "./LoveLetter.css";

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => setIsOpen(!isOpen);

  return (
    <div className="love-letter-section">
      <h2>💌 My Love Letter to You</h2>

      <motion.button
        className="read-more-button"
        onClick={toggleLetter}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={20} /> : <BookOpen size={20} />}
        {isOpen ? " Close Letter" : " Read More"}
      </motion.button>

      <motion.div
        className={`letter-content ${isOpen ? "open" : ""}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <p className="handwritten-text">
          My Love,
          <br />
          From the moment we met, you have been the light of my life. Every day
          with you feels like a beautiful love story, and I cherish every
          moment. I love you more than words can express.
          <br />
          ❤️ Forever Yours.
        </p>
      </motion.div>
    </div>
  );
};

export default LoveLetter;
