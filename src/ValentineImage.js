import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import valentine1 from "./Asset/1 (1).png";
import valentine2 from "./Asset/1 (2).png";
import valentine3 from "./Asset/1 (3).png";
import valentine4 from "./Asset/1 (4).png";
import valentine5 from "./Asset/1 (5).png";
import "./ValentineImage.css";

const valentineImages = [
  valentine1,
  valentine2,
  valentine3,
  valentine4,
  valentine5,
];

const ValentineImage = () => {
  const [currentImage, setCurrentImage] = useState(valentineImages[0]);
  const [isShrinking, setIsShrinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShrinking(true); // Start shrinking

      setTimeout(() => {
        // Change image when fully shrunk
        setCurrentImage((prevImage) => {
          const currentIndex = valentineImages.indexOf(prevImage);
          return valentineImages[(currentIndex + 1) % valentineImages.length];
        });

        setIsShrinking(false); // Start expanding
      }, 1000);
    }, 8000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Tilt
      options={{
        max: 35, // 3D tilt effect
        scale: 1.1, // Slight scale effect
        speed: 300,
        glare: true,
        "max-glare": 0.3,
      }}
    >
      <motion.div
        key={currentImage}
        initial={{ scale: 0 }} // Start from 0 size
        animate={{ scale: isShrinking ? 0 : 1 }} // Shrink then grow
        transition={{ duration: 1 }}
        className="valentine-image-container"
      >
        <motion.img
          src={currentImage}
          alt="Valentine"
          className="valentine-image"
          animate={{
            scale: [1, 1.05, 1], // Heartbeat effect
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </Tilt>
  );
};

export default ValentineImage;
