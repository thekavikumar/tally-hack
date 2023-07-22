import { RotateCwIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { DialogDemo } from "./Dialog";
import Race from "./Race";
import { type } from "os";

function WPM(value: string, sentence: string, correct: number) {
  const words = sentence.split(""); // Split by one or more spaces
  const values = value.trim().split("");
  let numberOfWords = 0;
  let wrongWords = [];
  let correctWords = [];
  let w = 0;
  for (let i = 0; i < values.length; i++) {
    if (words[i] === values[i]) {
      correctWords.push(words[i]);
    } else {
      wrongWords.push(words[i]);
    }
    if (words[i] === " ") {
      w += 1;
    }
    numberOfWords += 1;
  }
  let accuracy =
    ((correct + correctWords.length - wrongWords.length) /
      (values.length + correct)) *
    100;
  return [Number(accuracy.toFixed(2)), w, values.length];
}

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood? Peter Piper picked a peck of pickled peppers.",
  "The cat in the hat came back. She sells seashells by the seashore. Peter Piper picked a peck of pickled peppers.",
];

const TypingPractice = () => {
  const [currentParagraph, setCurrentParagraph] = useState(
    generateRandomParagraph()
  );
  const [timeElapsed, setTimeElapsed] = useState<number>(30);
  const [gameOver, setGameOver] = useState<boolean>(false); // [TODO
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef(null);
  const [startCounting, setStartCounting] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [value, setValue] = useState<Number>(0);
  const [cor, setCor] = useState<number>(correct);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startCounting && timeElapsed > 0) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeElapsed === 0) {
      handleGameOver();
    }

    return () => {
      clearInterval(interval);
    };
  }, [startCounting, timeElapsed]);

  function generateRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
  }

  function handleInputChange(event: any) {
    const { value } = event.target;
    setTypedText(value);
    setStartCounting(true);
    const [accuracy, correctWords, v] = WPM(typedText, currentParagraph, cor);
    setAccuracy(accuracy);
    setCorrect(correctWords);
    setValue(v);
    if (typedText.length === currentParagraph.length) {
      setCor(correct);
      if (timeElapsed > 0) {
        setCurrentParagraph(generateRandomParagraph());
        setTypedText("");
      } else {
        handleGameOver();
      }
    }
  }

  function handleGameOver() {
    setGameOver(true);
    setStartCounting(false);
  }

  function restartGame() {
    setCor(0);
    setCurrentParagraph(generateRandomParagraph());
    setTimeElapsed(30);
    setTypedText("");
    setStartCounting(false);
    setAccuracy(0);
    setCorrect(0);
    setGameOver(false);
  }

  return (
    <div className="flex flex-col items-center gap-7 ">
      <div className="p-4 mb-4 text-lg">
        {/* <Race value={typedText} word={currentParagraph} />{" "} */}
        {/* Increase font size for the paragraphs */}
        <p className="font-medium text-3xl">
          {currentParagraph.split("").map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={
                letterIndex < typedText.split("").length
                  ? letter === typedText.split("")[letterIndex]
                    ? "text-green-600"
                    : "text-red-600"
                  : ""
              }
            >
              {letter}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-3 mt-4">
          <span className="">Accuracy : {accuracy}% </span>
          <span>Time Remaining: {timeElapsed}s </span>
          <span>
            WPM: {Number((correct / ((30 - timeElapsed) / 60)).toFixed(2)) || 0}
          </span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className=" border bg-foreground/5 rounded-md w-full text-green-400 border-gray-400 focus:border-green-400 p-3 font-medium focus:ring-2 focus:ring-green-400 focus:outline-none mt-5"
          autoFocus
          placeholder="Start typing..."
          disabled={gameOver}
        />
      </div>
      <button
        onClick={restartGame}
        className="flex items-center gap-1 bg-transparent text-foreground/20 hover:text-foreground transition-all duration-150"
      >
        <RotateCwIcon size={16} />
        Restart
      </button>
      {gameOver && (
        <div>
          <p className="m-3 text-center">Game Over!</p>
          <DialogDemo
            accuracy={accuracy}
            time={timeElapsed}
            wpm={Number((correct / (30 / 60)).toFixed(2))}
          />
        </div>
      )}
    </div>
  );
};

export default TypingPractice;
