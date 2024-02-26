import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Printing = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_KEY}`, {
      transports: ["websocket"],
      autoConnect: false,
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    socket.on("userInput", (data) => {
      setData(data);
      console.log("Data from server:", data);
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendData = () => {
    const socket = io(`${import.meta.env.VITE_API_KEY}`);
    socket.emit("userInput", inputValue);
    setInputValue(""); // Clear input field after sending data
  };

  return (
    <div className="grid grid-cols-4 gap-y-6">
      <Card>
        <CardBody className="flex flex-col gap-3">
          <Typography variant="h6">WebSocket Connection</Typography>
          <Input
            label="Send Message"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter message to send"
          />
          <Button className="w-32" onClick={handleSendData}>
            Send Data
          </Button>
          <p>Received Data: {JSON.stringify(data)}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Printing;
