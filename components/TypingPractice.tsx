import { RotateCwIcon, Timer } from "lucide-react";
import React, { useState, useRef } from "react";
import Time from "../components/Timer"
import { initScriptLoader } from "next/script";
import { coerce } from "zod";
import { time } from "console";


function WPM(value : string, sentence : string){
  const words = sentence.split(" ")
  let numberOfWords = 0;
  let wrongWords = [];
  let correctWords = [];
  const values = value.split(" ");
  for (let i = 0; i < values.length; i++){
    if (words[i] === values[i]){
      correctWords.push(words[i]);
    }
    else{
      wrongWords.push(words[i]);
    }
    numberOfWords += 1;
  }
  let accuracy = (correctWords.length / values.length) * 100;
  const correct = correctWords.length
  return [Number(accuracy.toFixed(2)), correct];
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
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef(null);
  const [startCounting, setStartCounting] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [finished, isFinished] = useState<boolean>(false);
  const [result, setResult] = useState<any>([timeElapsed, accuracy, correct/(timeElapsed/60)]);

  function generateRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
  }

  function handleInputChange(event: any) {
    const { value } = event.target;
    setTypedText(value);
    setStartCounting(true);
    const x = WPM(typedText, currentParagraph);
    setAccuracy(x[0])
    setCorrect(x[1])
    if (value === currentParagraph || timeElapsed === 0) {
      setResult([timeElapsed, accuracy, correct/(timeElapsed/60)])
      console.log(result);
      restartGame();
    }
  }

  function restartGame() {
    setCurrentParagraph(generateRandomParagraph());
    setTimeElapsed(30);
    setTypedText("");
    setStartCounting(false);
    setAccuracy(0);
    setCorrect(0);
  }

  return (
    <div className="flex flex-col items-center gap-7 ">
      <div className="p-4 mb-4 text-lg">
        {" "}
        {/* Increase font size for the paragraphs */}
        {currentParagraph.split(". ").map((sentence, index) => (
          <p key={index} className="font-medium text-3xl">
            {sentence.split("").map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={
                  index === typedText.split(". ").length - 1 &&
                  letterIndex < typedText.split(". ")[index].length
                    ? letter === typedText.split(". ")[index][letterIndex]
                      ? "text-green-600"
                      : "text-red-600"
                    : ""
                }
              >
                {letter}
              </span>
            ))}
            {index < currentParagraph.split(". ").length - 1 && <span>. </span>}
          </p>
        ))}
        <span className="">Accuracy : {accuracy}</span>
        <Time
        startCounting = {startCounting}
        correctWords = {correct}
        timeElapsed = {timeElapsed}
        setTimeElapsed = {setTimeElapsed} />
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className=" border bg-foreground/5 rounded-md w-full text-green-400 border-gray-400 focus:border-green-400 p-3 font-medium focus:ring-2 focus:ring-green-400 focus:outline-none mt-5"
          autoFocus
        />
      </div>
      <button
        onClick={restartGame}
        className="flex items-center gap-1 bg-transparent text-foreground/20 hover:text-foreground transition-all duration-150"
      >
        <RotateCwIcon size={16} />
        Restart
      </button>
    </div>
  );
};

export default TypingPractice;
