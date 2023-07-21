import { RotateCwIcon } from "lucide-react";
import React, { useState, useRef } from "react";

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
    <div className="flex flex-col items-center gap-7 p-4">
      <div className="border border-gray-400 p-4 mb-4 text-lg">
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
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className="border-b-2 font-medium border-blue-600 focus:outline-none focus:border-blue-800 mt-2"
          autoFocus
        />
      </div>
      <button
        onClick={restartGame}
        className="flex items-center gap-1 bg-transparent text-foreground/20 hover:text-foreground transition-all duration-150"
      >
        <RotateCwIcon size={16} />
      </button>
    </div>
  );
};

export default TypingPractice;
