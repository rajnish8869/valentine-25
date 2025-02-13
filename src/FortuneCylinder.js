import React, { useState } from "react";
import "./FortuneCylinder.css";

const questions = [
  "What’s your dream date? 💑",
  "What do you love most about me? 💕",
  "What’s your favorite memory with me? 🥰",
  "Would you rather cuddle or kiss? 😘",
  "How would you describe love in one word? ❤️",
  "If we could travel anywhere, where would we go? ✈️",
  "What’s one thing that always makes you smile? 😊",
  "What song reminds you of us? 🎶",
  "What’s your favorite thing we do together? 💞",
  "If we had a theme song, what would it be? 🎵",
  "What’s a small thing I do that you love? 💖",
  "What’s your favorite way to spend a lazy day with me? 🛋️",
];

const spinSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4385");

const FortuneCylinder = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(
    "Spin to reveal a question! 💫"
  );
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    setSpinning(true);
    spinSound.play();

    const newRotation = rotation + 360 * 2 + Math.floor(Math.random() * 360); // Random extra rotation
    setRotation(newRotation);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setSelectedQuestion(questions[randomIndex]);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="fortune-cylinder-container">
      <h2>🎡 Love Fortune 💭</h2>
      <div className="cylinder-wrapper">
        <div
          className={`fortune-cylinder ${spinning ? "rolling" : ""}`}
          style={{ transform: `rotateX(${rotation}deg)` }}
        >
          {questions.map((q, index) => (
            <div key={index} className="cylinder-face">
              {q}
            </div>
          ))}
        </div>
      </div>
      <div className="selected-question">{selectedQuestion}</div>
      <button onClick={spin} disabled={spinning}>
        {spinning ? "💫 Rolling..." : "🎰 Spin Now"}
      </button>
    </div>
  );
};

export default FortuneCylinder;
