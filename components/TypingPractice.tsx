import { RotateCwIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood? Peter Piper picked a peck of pickled peppers.",
  "The cat in the hat came back. She sells seashells by the seashore. Peter Piper picked a peck of pickled peppers.",
];

const TypingPractice = () => {
  const [currentParagraph, setCurrentParagraph] = useState(
    generateRandomParagraph()
  );
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef(null);

  function generateRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
  }

  function handleInputChange(event: any) {
    const { value } = event.target;
    setTypedText(value);

    if (value === currentParagraph) {
      setTypedText("");
      setCurrentParagraph(generateRandomParagraph());
    }
  }

  function restartGame() {
    setCurrentParagraph(generateRandomParagraph());
    setTypedText("");
  }

  return (
    <div className="flex flex-col items-center gap-7 ">
      <div className="p-4 mb-4 text-lg">
        {" "}
        {/* Increase font size for the paragraphs */}
        <div className="flex mb-4 items-center gap-5">
          <h1>60/wpm</h1>
          <h1>90%</h1>
        </div>
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
