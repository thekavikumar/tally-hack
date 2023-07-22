"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

function page() {
  const [text, setText] = React.useState("");
  const [roomName, setRoomName] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [userId, setUserId] = useState(""); // New state variable for storing user ID
  const [userList, setUserList] = useState([]); // New state variable for storing the user list

  function handlePost() {
    socket.emit("createRoom", "your-room-name");
    console.log("create room");
  }

  useEffect(() => {
    // Listen for "roomCreated" event and handle the received room ID
    socket.on("roomCreated", (roomName) => {
      console.log(`Room created: ${roomName}`);
      setRoomName(roomName);
      setRoomCreated(true);
    });

    socket.on("userList", (users) => {
      setUserList(users);
    });
    socket.on("userId", (id) => {
      setUserId(id);
    });

    socket.on("roomAlreadyExists", () => {
      console.log("Room already exists.");
      // Handle room already exists event if needed
    });

    socket.on("roomJoined", (roomName) => {
      console.log(`Joined room: ${roomName}`);
      setRoomName(roomName);
      setRoomCreated(true);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("roomAlreadyExists");
    };
  }, []);
  return (
    <div className="flex flex-col max-w-5xl mx-auto items-center gap-7 ">
      {!roomCreated && (
        <>
          <Button
            onClick={() => {
              socket.emit("createRoom", "your-room-name");
              console.log("create room");
            }}
          >
            Create Room
          </Button>
          <Button
            onClick={() => {
              socket.emit("joinRoom", "your-room-name");
              console.log("join room");
            }}
          >
            Join Room
          </Button>
        </>
      )}
      {roomCreated && (
        <>
          <p>Room ID: {roomName}</p>
          <p>User ID: {userId}</p>
          <p>Users in Room: {userList.join(", ")}</p>
        </>
      )}
    </div>
  );
}

export default page;
