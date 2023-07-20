import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  return (
    <div className="flex items-center justify-between border-b p-3">
      <Link href="/">
        <h1 className="font-bold text-xl hover:text-gray-300 transition-all duration-200">
          Type<span>Wizard</span>
        </h1>
      </Link>
      <div className="flex items-center gap-7 font-medium">
        <Link
          className="hover:text-gray-300 transition-all duration-200"
          href="/"
        >
          Home
        </Link>
        <Link
          className="hover:text-gray-300 transition-all duration-200"
          href="/practice"
        >
          Practice
        </Link>
        <Link
          className="hover:text-gray-300 transition-all duration-200"
          href="/compete"
        >
          Compete
        </Link>
        <Link
          className="hover:text-gray-300 transition-all duration-200"
          href="/stats"
        >
          Stats
        </Link>
        <Link
          className="hover:text-gray-300 transition-all duration-200"
          href="/about"
        >
          About
        </Link>
        <Link
          className="hover:text-gray-300 transition-all duration-200"
          href="/contact"
        >
          Contact
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
