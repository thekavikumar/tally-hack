"use client";
import { RotateCwIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { DialogDemo } from "@/components/Dialog";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";

const socket = io("http://localhost:3001");

function WPM(value: string, sentence: string) {
  const words = sentence.split(" "); // Split by one or more spaces
  const values = value.split(" ");
  let numberOfWords = 0;
  let wrongWords = [];
  let correctWords = [];
  for (let i = 0; i < values.length; i++) {
    if (words[i] === values[i]) {
      correctWords.push(words[i]);
    } else {
      wrongWords.push(words[i]);
    }
    numberOfWords += 1;
  }
  let accuracy = (correctWords.length / values.length) * 100;
  const correct = correctWords.length;
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
  const [gameOver, setGameOver] = useState<boolean>(false); // [TODO
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef(null);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [startCounting, setStartCounting] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [finished, isFinished] = useState<boolean>(false);
  const [roomName, setRoomName] = useState("");
  const [inRoom, setInRoom] = useState(false);

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
  function handleJoinRoom() {
    if (roomName) {
      socket.emit("joinRoom", roomName);

      socket.on("userJoined", (userId: any) => {
        console.log("User joined:", userId);
      });

      socket.on("roomNotFound", () => {
        console.log("Room not found.");
      });
    }
  }

  function handleCreateRoom() {
    if (roomName) {
      socket.emit("createRoom", roomName);

      socket.on("roomCreated", (roomName: any) => {
        console.log("Room created:", roomName);
      });

      socket.on("roomAlreadyExists", () => {
        console.log("Room already exists.");
      });
    }
  }

  function handleInputChange(event: any) {
    const { value } = event.target;
    setTypedText(value);
    setStartCounting(true);
    const [accuracy, correctWords] = WPM(value, currentParagraph);
    setAccuracy(accuracy);
    setCorrect(correctWords);

    if (value === currentParagraph) {
      if (timeElapsed > 0) {
        generateRandomParagraph();
      } else {
        handleGameOver();
      }
    }

    const newPosition = (typedText.length / currentParagraph.length) * 100;
    socket.emit("updateCarPosition", roomName, newPosition);
  }

  useEffect(() => {
    socket.on("userJoined", (userId: any) => {
      // Handle when a new user joins the room
      setUsernames((prevUsernames) => [...prevUsernames, userId]);
    });

    socket.on("userLeft", (userId: any) => {
      // Handle when a user leaves the room
      setUsernames((prevUsernames) =>
        prevUsernames.filter((username) => username !== userId)
      );
    });
    // Listen for car position updates from other players in the room
    socket.on("carPositionUpdated", (playerId: any, newPosition: any) => {
      // Update the car position of the player with playerId
      // You can use this data to update the car position on the UI
      console.log(`Player ${playerId} moved to position: ${newPosition}`);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleGameOver() {
    setGameOver(true);
    setStartCounting(false);
  }

  function restartGame() {
    setCurrentParagraph(generateRandomParagraph());
    setTimeElapsed(30);
    setTypedText("");
    setStartCounting(false);
    setAccuracy(0);
    setCorrect(0);
    setGameOver(false);
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto items-center gap-7 ">
      <Button onClick={handleCreateRoom}>Create Room</Button>
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
        <span className="">Accuracy : {accuracy}% </span>
        <span>Time Remaining: {timeElapsed}s</span>
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className=" border bg-foreground/5 rounded-md w-full text-green-400 border-gray-400 focus:border-green-400 p-3 font-medium focus:ring-2 focus:ring-green-400 focus:outline-none mt-5"
          autoFocus
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