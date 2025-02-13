import React, { useEffect, useState } from "react";
import "./HeartBorder.css";

const HeartBorder = () => {
  const heartEmojis = ["💝", "💌", "💞", "💓", "💖", "💗", "❤️", "❣️", "💕"];
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHearts = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = document.documentElement.scrollHeight;
      const spacing = 50; // Space between hearts

      const newHearts = [];

      for (let i = 0; i < Math.floor(screenWidth / spacing); i++) {
        newHearts.push({
          id: `top-${i}`,
          emoji: heartEmojis[i % heartEmojis.length],
          size: Math.random() * 20 + 20, // Random size (20px - 40px)
          angle: Math.random() * 30 - 15, // Random rotation (-15 to +15 degrees)
          position: { top: "0px", left: `${i * spacing}px` },
        });

        newHearts.push({
          id: `bottom-${i}`,
          emoji: heartEmojis[i % heartEmojis.length],
          size: Math.random() * 20 + 20,
          angle: Math.random() * 30 - 15,
          position: { bottom: "0px", left: `${i * spacing}px` },
        });
      }

      for (let i = 0; i < Math.floor(screenHeight / spacing); i++) {
        newHearts.push({
          id: `left-${i}`,
          emoji: heartEmojis[i % heartEmojis.length],
          size: Math.random() * 20 + 20,
          angle: Math.random() * 30 - 15,
          position: { left: "0px", top: `${i * spacing}px` },
        });

        newHearts.push({
          id: `right-${i}`,
          emoji: heartEmojis[i % heartEmojis.length],
          size: Math.random() * 20 + 20,
          angle: Math.random() * 30 - 15,
          position: { right: "0px", top: `${i * spacing}px` },
        });
      }

      setHearts(newHearts);
    };

    generateHearts();
    window.addEventListener("resize", generateHearts);

    return () => window.removeEventListener("resize", generateHearts);
  }, []);

  return (
    <div className="heartBoarder-frame">
      {hearts.map(({ id, emoji, size, angle, position }) => (
        <span
          key={id}
          className="heartBoarder"
          style={{
            fontSize: `${size}px`,
            transform: `rotate(${angle}deg) scale(1)`,
            ...position,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default HeartBorder;
