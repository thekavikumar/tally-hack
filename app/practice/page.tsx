"use client";
import TypingPractice from "@/components/TypingPractice";
import { useUserStore } from "@/lib/user";
import { Clock, Globe, Quote } from "lucide-react";
import React from "react";

function page() {
  const { username } = useUserStore();

  return (
    <div className="flex items-center justify-between flex-col mt-12">
      <div className="flex items-center max-w-4xl mx-auto bg-foreground/10 p-2 px-5 rounded-md gap-2 text-foreground/20">
        <div className="flex items-center gap-4">
          <button className="bg-transparent hover:text-foreground transition-all duration-150">
            @ punctuation
          </button>
          <button className="bg-transparent hover:text-foreground transition-all duration-150">
            # numbers
          </button>
        </div>
        <div className="h-6 rounded-md bg-black w-1 mr-3 ml-3"></div>
        <div className="flex items-center gap-4">
          <button className="bg-transparent text-foreground hover:text-foreground transition-all duration-150 flex items-center gap-2">
            <Clock size={14} />
            time
          </button>
          <button className="bg-transparent hover:text-foreground transition-all duration-150 flex items-center gap-2">
            A words
          </button>
          <button className="bg-transparent hover:text-foreground transition-all duration-150 flex items-center gap-2">
            <Quote size={14} />
            quote
          </button>
        </div>
        <div className="h-6 rounded-md bg-black mr-3 ml-3 w-1"></div>
        <div className="flex items-center gap-4">
          <button className="bg-transparent text-foreground hover:text-foreground transition-all duration-150">
            15
          </button>
          <button className="bg-transparent hover:text-foreground transition-all duration-150">
            30
          </button>
          <button className="bg-transparent hover:text-foreground transition-all duration-150">
            60
          </button>
          <button className="bg-transparent hover:text-foreground transition-all duration-150">
            120
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 mt-24 max-w-6xl">
        <div className="">
          <button className="flex font-medium items-center gap-1 bg-transparent text-foreground/20 hover:text-foreground transition-all duration-150">
            <Globe size={16} />
            english
          </button>
        </div>
        <div className="">
          {/* Create a words sequence and a cursor and allow user to type and cursor should move as he types */}
          <TypingPractice />
        </div>
      </div>
    </div>
  );
}

export default page;
