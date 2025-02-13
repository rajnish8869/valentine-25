import React, { useState } from "react";
import { motion } from "framer-motion";
import "./LoveQuiz.css";

const quizData = [
  {
    question: "What’s my favorite color? 🎨",
    options: ["Blue", "Red", "Black", "Pink"],
    answer: "Black",
  },
  {
    question: "Which food do I love the most? 🍕",
    options: ["Pizza", "Burger", "Pasta", "Ice Cream"],
    answer: "Burger",
  },
  {
    question: "What’s my dream vacation spot? ✈️",
    options: ["Bali", "Paris", "Switzerland", "Maldives"],
    answer: "Maldives",
  },
  {
    question: "What’s my favorite way to relax? 😌",
    options: [
      "Watching movies",
      "Reading books",
      "Listening to music",
      "Going for a walk",
    ],
    answer: "Listening to music",
  },
  {
    question: "How do I usually show love? 💖",
    options: ["Gifts", "Words", "Time together", "Acts of service"],
    answer: "Gifts",
  },
  {
    question: "What’s my biggest pet peeve? 😡",
    options: ["Lying", "Laziness", "Being late", "Chewing loudly"],
    answer: "Lying",
  },
  {
    question: "What was my first impression of you? 😉",
    options: ["So cute!", "Funny", "Smart", "Mysterious"],
    answer: "Mysterious!",
  },
  {
    question: "Which song reminds me of you? 🎶",
    options: [
      "Perfect - Ed Sheeran",
      "You Belong With Me - Taylor Swift",
      "Can't Help Falling in Love - Elvis Presley",
      "All of Me - John Legend",
    ],
    answer: "Perfect - Ed Sheeran",
  },
  {
    question: "What’s my ideal date night? 💕",
    options: ["Candlelight dinner", "Movie night", "Stargazing", "Beach walk"],
    answer: "Candlelight dinner",
  },
  {
    question: "If I could have a superpower, what would it be? 🦸‍♂️",
    options: ["Time travel", "Invisibility", "Reading minds", "Flying"],
    answer: "Time travel",
  },
];

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);

    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div id="showQuiz">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="love-quiz"
      >
        <h2>How Well Do You Know Me? 💕</h2>

        {!showResult ? (
          <div className="quiz-question">
            <h3>{quizData[currentQuestion].question}</h3>
            <div className="quiz-options">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  whileTap={{ scale: 0.9 }}
                  className={`quiz-btn ${
                    selectedAnswer === option
                      ? option === quizData[currentQuestion].answer
                        ? "correct"
                        : "wrong"
                      : ""
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="quiz-result"
          >
            <h3>
              Your Score: {score} / {quizData.length} 💖
            </h3>
            <p>
              {score === quizData.length
                ? "You know me perfectly! ❤️"
                : "Nice try! Let's create more memories together! 💕"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoveQuiz;
