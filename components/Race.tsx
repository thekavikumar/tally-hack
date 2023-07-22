import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
    percentage: number;
  }

const Race : React.FC<Props> = ({
    percentage
}) => {
    const mainDiv = {
       width: "100%",
    };
    return (
       <div style = {mainDiv}>
          <ProgressBar 
          completed = {percentage * 100} 
          bgColor = "red" 
          animateOnRender = {true} 
          isLabelVisible = {false} 
          alignmentOption = {"center"}/>
       </div>
    );
 }

export default Race;
