import Letter from "./Letter";
import Timer from "./Timer";
import React, { useEffect, useState } from "react";

interface Props {
    text: string;
    active: boolean;
}  

const WPM: React.FC<Props> = ({text, active}) => {
    if (active) {
    // words states
    const [userInput, setUserInput] = useState<string>();
    const [words, setWords] = useState<string[]>([]);
    const [letters, setLetters] = useState<string>();
    const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);
    const [incorrectWords, setIncorrectWords] = useState<number>(0);
  
    // timer states
    const [startCounting, setStartCounting] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);

    //result
    const[result,setResult] = useState<any>();

    const getWords = async () => {
      const data = text.trim();
      const newList = data.split(" ");
      setWords(newList);
    };
  
    const minutes = timeElapsed / 60;
    const WPM = correctWords / minutes;
  
    const checkInput = (value: string) => {
      if (activeWordIndex === words.length) {
        return;
      }
  
      setStartCounting(true);
  
      if (value.endsWith(" ")) {
        if (activeWordIndex === words.length - 1) {
          setStartCounting(false);
  
          // setting storage
          const fixedResults = {
            WPM: WPM.toFixed(2),
            timeElapsed: timeElapsed,
          };
          const newResult = [...result, fixedResults];
          setResult(newResult);
        } else {
          setUserInput("");
        }
        setActiveWordIndex(activeWordIndex + 1);
  
        const word = words[activeWordIndex];
        let i = 0;
        while (i < word.length) {
            if (word.charAt(i) === value[i]){
                <Letter text = {value[i]}, active = {}, correct = {1} incorrect = {0} />
                setLetters(value[i])
            }
            i++;
          }
        if (word === words[activeWordIndex]) {
          setCorrectWords(correctWords + 1);
        } else {
          setIncorrectWords(setIncorrectWords + 1);
        }
      } else {
        setUserInput(value);
      }
    };
  
    const restartGame = () => {
      getWords();
      setUserInput("");
      setActiveWordIndex(0);
      setTimeElapsed(0);
      setCorrectWords(0);
      setIncorrectWords(0);
      setStartCounting(false);
    };
  }
    return;
}

export default WPM;