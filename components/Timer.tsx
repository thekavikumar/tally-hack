import { time } from "console";
import React, { useEffect } from "react";

interface Props {
  startCounting: boolean;
  correctWords: number;
  timeElapsed: number;
  setTimeElapsed: any;
}

const Time: React.FC<Props> = ({
  startCounting,
  correctWords,
  timeElapsed,
  setTimeElapsed,
}) => {
  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        if (timeElapsed !== 0) {
          setTimeElapsed((oldSpeed: any) => oldSpeed - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCounting]);

  const minutes = (30 - timeElapsed) / 60;
  const WPM = correctWords / minutes;

  return (
    <div>
      <span>Time: {timeElapsed}</span>
      <br></br>
      <span>WPM: {(WPM | 0).toFixed(2)}</span>
    </div>
  );
};

export default Time;
