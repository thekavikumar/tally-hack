import React, { useEffect } from "react";

interface Props {
  startCounting: boolean;
  correctWords: number;
  timeElapsed: number;
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
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
        setTimeElapsed((oldSpeed) => oldSpeed + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCounting]);

  const minutes = timeElapsed / 60;
  const WPM = correctWords / minutes;

  return (
    <div>
        <span>
          Time: {timeElapsed}
        </span>
        <span>
          WPM: {(WPM | 0).toFixed(2)}
        </span>
    </div>
  );
};

export default Time;