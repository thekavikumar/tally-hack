import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
    value : string;
    word : string;
  }

const Race : React.FC<Props> = ({
    value,
    word,
}) => {
    const mainDiv = {
       width: "100%",
    };
    return (
       <div style = {mainDiv}>
          <ProgressBar 
          completed = {(value.length/word.length) * 100} 
          bgColor = "red" 
          animateOnRender = {true} 
          isLabelVisible = {false} 
          alignmentOption = {"center"}/>
       </div>
    );
 }

 export default Race