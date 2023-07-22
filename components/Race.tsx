import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
  value: string;
  word: string;
}

const Race: React.FC<Props> = ({ value, word }) => {
  const mainDiv = {
    width: "100%",
  };
  return (
    <div style={mainDiv}>
      <ProgressBar
        className="mb-4"
        completed={(value.length / word.length) * 100}
        bgColor="red"
        height="10px"
        animateOnRender={true}
        isLabelVisible={false}
        alignmentOption={"center"}
      />
    </div>
  );
};

export default Race;
