import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";
import Image_1 from "./Images/image-01.jpg";
import Image_2 from "./Images/image-02.jpg";
import Image_3 from "./Images/image-03.jpg";
import Image_4 from "./Images/image-04.jpg";
import Image_5 from "./Images/image-05.jpg";
import Image_6 from "./Images/image-06.jpg";
import Image_7 from "./Images/image-07.jpg";
import Image_8 from "./Images/image-08.jpg";
import Image_9 from "./Images/image-09.jpg";
import Image_10 from "./Images/image-10.jpg";
import Image_11 from "./Images/image-01.jpg";
import Image_12 from "./Images/image-02.jpg";
import Image_13 from "./Images/image-03.jpg";
import Image_14 from "./Images/image-04.jpg";
import Image_15 from "./Images/image-05.jpg";
import Image_16 from "./Images/image-06.jpg";
import Image_17 from "./Images/image-07.jpg";
import Image_18 from "./Images/image-08.jpg";
import Image_19 from "./Images/image-09.jpg";
import Image_20 from "./Images/image-10.jpg";

const images = [
  { src: Image_1, alt: "Memory 1" },
  { src: Image_2, alt: "Memory 2" },
  { src: Image_3, alt: "Memory 3" },
  { src: Image_4, alt: "Memory 4" },
  { src: Image_5, alt: "Memory 5" },
  { src: Image_6, alt: "Memory 6" },
  { src: Image_7, alt: "Memory 7" },
  { src: Image_8, alt: "Memory 8" },
  { src: Image_9, alt: "Memory 9" },
  { src: Image_10, alt: "Memory 10" },
  { src: Image_11, alt: "Memory 11" },
  { src: Image_12, alt: "Memory 12" },
  { src: Image_13, alt: "Memory 13" },
  { src: Image_14, alt: "Memory 14" },
  { src: Image_15, alt: "Memory 15" },
  { src: Image_16, alt: "Memory 16" },
  { src: Image_17, alt: "Memory 17" },
  { src: Image_18, alt: "Memory 18" },
  { src: Image_19, alt: "Memory 19" },
  { src: Image_20, alt: "Memory 20" },
];

const ValentineGallery = ({ showGallery }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClose = () => {
    // Delay to ensure exit animation completes
    setTimeout(() => setSelectedIndex(null), 300);
  };

  const handleSwipe = (direction) => {
    setSelectedIndex((prevIndex) => {
      if (prevIndex === null) return null;
      let newIndex;
      if (direction === "left" || direction === "up") {
        newIndex = (prevIndex + 1) % images.length;
      } else {
        newIndex = (prevIndex - 1 + images.length) % images.length;
      }
      return newIndex;
    });
  };

  return (
    <div id="showGallery">
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="valentine-gallery"
          >
            <h2>Our Beautiful Memories 💖</h2>

            {/* Heart Shape Container */}
            <div className="heart-gallery">
              {images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  className={`gallery-photo heart-photo heart-photo-${
                    index + 1
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}

              {/* Center Image */}
              <motion.img
                src={images[2].src}
                alt="Center Memory"
                className="gallery-photo heart-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedIndex(2)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom & Swipe Feature */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key={selectedIndex}
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={handleClose} // Ensures overlay removal
          >
            <motion.div
              className="zoomed-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // Prevent overlay close on image click
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex].src}
                className="zoomed-image"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 50) handleSwipe("right");
                  else if (info.offset.x < -50) handleSwipe("left");
                  else if (info.offset.y > 50) handleSwipe("down");
                  else if (info.offset.y < -50) handleSwipe("up");
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineGallery;
